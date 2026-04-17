# Arquitectura Técnica: Cómo funciona la autenticación compartida

## Resumen ejecutivo

Tu backend PHP (`AuthService.php` + `Usuario.php`) va a ser **replicado exactamente igual en una Supabase Edge Function**, pero en TypeScript/Deno.

No es una migración, es una **replicación**: mismo algoritmo, mismo flujo, diferente lenguaje.

---

## Comparación: Código actual PHP de DAM vs. Edge Function nueva

Este es el código REAL que los de DAM tienen en `backend/src/Services/AuthService.php` y `backend/src/Models/Usuario.php`. La Edge Function será una copia exacta en TypeScript.

### PHP AuthService.login() → Edge Function auth-login

#### Código ACTUAL PHP (archivo: `backend/src/Services/AuthService.php`, línea 32-75):
```php
// Archivo: backend/src/Services/AuthService.php
// Líneas 32-75

public function login(string $email, string $password): array
{
    // Paso 1: Busca usuario por email (usa Usuario::findByEmail)
    $user = $this->usuario->findByEmail($email);

    // Paso 2: Si no existe → error 401
    if ($user === null) {
        Response::error('Credenciales incorrectas', 401);
    }

    // Paso 3: Si no está activo → error 403
    if (!$user['activo']) {
        Response::error('Usuario desactivado. Contacta con el administrador.', 403);
    }

    // Paso 4: Verifica contraseña con password_verify (bcrypt)
    // Este es el algoritmo clave que replicamos en la Edge Function
    if (!password_verify($password, $user['password_hash'])) {
        Response::error('Credenciales incorrectas', 401);
    }

    // Paso 5: Obtiene los roles del usuario
    // Query: SELECT r.nombre FROM roles r 
    //        INNER JOIN usuario_rol ur ON ur.rol_id = r.id
    //        WHERE ur.usuario_id = ?
    $roles = $this->usuario->getRoles($user['id']);

    // Paso 6: Genera JWT firmado con HS256
    // El token contiene: id, email, roles, iat (issued at), exp (expiration)
    $accessToken  = JWT::encode($user['id'], [
        'email' => $user['email'],
        'roles' => $roles,
    ]);
    
    // Paso 7: También genera refresh token (para no pedir contraseña cada hora)
    $refreshToken = JWT::generateRefreshToken();

    // Paso 8: Almacena el refresh token hasheado en la BD (para logout)
    $config = $GLOBALS['config']['jwt'];
    $this->usuario->storeRefreshToken($user['id'], $refreshToken, $config['refresh_ttl']);

    // Paso 9: Devuelve al cliente
    return [
        'access_token'  => $accessToken,
        'refresh_token' => $refreshToken,
        'token_type'    => 'Bearer',
        'expires_in'    => $config['access_ttl'],  // ej: 3600 segundos (1 hora)
        'user' => [
            'id'        => $user['id'],
            'email'     => $user['email'],
            'nombre'    => $user['nombre'],
            'apellidos' => $user['apellidos'],
            'roles'     => $roles,
        ],
    ];
}
```

### Métodos helper que usa AuthService: Usuario.php

Antes de ver la Edge Function, estos son los métodos de `Usuario.php` que AuthService.login() utiliza:

```php
// Archivo: backend/src/Models/Usuario.php
// Línea 43-54: Buscar usuario por email

public function findByEmail(string $email): ?array
{
    $stmt = $this->db->prepare(
        'SELECT id, email, nombre, apellidos, password_hash, activo, deleted_at, created_at, updated_at
         FROM usuarios
         WHERE email = ? AND deleted_at IS NULL
         LIMIT 1'
    );
    $stmt->execute([$email]);
    $row = $stmt->fetch();
    return $row ?: null;
}

// Línea 61-71: Obtener roles del usuario

public function getRoles(string $userId): array
{
    $stmt = $this->db->prepare(
        'SELECT r.nombre
         FROM roles r
         INNER JOIN usuario_rol ur ON ur.rol_id = r.id
         WHERE ur.usuario_id = ?'
    );
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN);  // ej: ['admin', 'cientifico']
}

// Línea 76-93: Crear nuevo usuario (con bcrypt automático)

public function create(array $data): string
{
    $id = Database::uuid();

    $stmt = $this->db->prepare(
        'INSERT INTO usuarios (id, email, nombre, apellidos, password_hash, activo, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())'
    );
    $stmt->execute([
        $id,
        $data['email'],
        $data['nombre'],
        $data['apellidos'] ?? null,
        // 👇 Esto es lo clave: password_hash usa bcrypt con cost=12
        password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]),
    ]);

    return $id;
}
```

**Lo importante:** Vuestro `password_hash($password, PASSWORD_BCRYPT, ['cost' => 12])` genera hashes como:
```
$2y$12$NHjUZpVLjBwJnVZ8SJqxmeGvfuHhKj2m5QqQ7GqpVzU2n4y1K4pzq
```

Ese formato de hash es lo que la Edge Function deberá verificar con `bcrypt.compare()`.

---

#### Edge Function equivalente (TypeScript/Deno):

```typescript
// Archivo: supabase/functions/auth-login/index.ts
// Esta es una copia fiel del AuthService.php pero en TypeScript

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as jwt from "https://deno.land/x/djwt@v2.8/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const jwtSecret = Deno.env.get("JWT_SECRET") || "your-secret-key";

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

serve(async (req: Request) => {
    // Solo permitimos POST
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const { email, password } = await req.json();

        // PASO 1: Busca usuario por email (equivalente a Usuario::findByEmail())
        const { data: user, error: userError } = await supabaseAdmin
            .from('usuarios')
            .select('id, email, nombre, apellidos, password_hash, activo')
            .eq('email', email)
            .is('deleted_at', null)
            .single();

        // PASO 2: Si no existe → error 401
        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: 'Credenciales incorrectas' }),
                { status: 401 }
            );
        }

        // PASO 3: Si no está activo → error 403
        if (!user.activo) {
            return new Response(
                JSON.stringify({ error: 'Usuario desactivado. Contacta con el administrador.' }),
                { status: 403 }
            );
        }

        // PASO 4: Verifica contraseña con bcrypt
        // 👇 Este es el paso clave: password_verify() en PHP ↔ bcrypt.compare() en Deno
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: 'Credenciales incorrectas' }),
                { status: 401 }
            );
        }

        // PASO 5: Obtiene los roles del usuario (equivalente a Usuario::getRoles())
        const { data: rolesData } = await supabaseAdmin
            .from('usuario_rol')
            .select('roles(nombre)')
            .eq('usuario_id', user.id);

        const roles = rolesData?.map((r: any) => r.roles.nombre) || [];

        // PASO 6: Genera JWT firmado (equivalente a JWT::encode())
        const payload = {
            id: user.id,
            email: user.email,
            roles: roles,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
        };

        const accessToken = await jwt.create(
            { alg: "HS256", typ: "JWT" },
            payload,
            jwtSecret
        );

        // PASO 7: Devuelve al cliente (igual que AuthService)
        return new Response(
            JSON.stringify({
                access_token: accessToken,
                token_type: 'Bearer',
                expires_in: 3600,
                user: {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                    apellidos: user.apellidos,
                    roles: roles,
                },
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error('Auth error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
});
```

**Nota sobre diferencias:**
- `password_verify()` en PHP ↔ `bcrypt.compare()` en TypeScript ✅ (mismo algoritmo)
- `JWT::encode()` en PHP ↔ `jwt.create()` en Deno ✅ (mismo formato JWT)
- Ambos usan la tabla `usuarios` ✅
- Ambos obtienen roles de `usuario_rol` ✅

---

## Flujos paralelos: App móvil (DAM) + Web (Álvaro)

### App Móvil (DAM backend)
```
POST /api/auth/login
  ↓
AuthService.login()
  ↓
Usuario::findByEmail() ← MySQL local
  ↓
password_verify()
  ↓
Usuario::getRoles() ← MySQL local
  ↓
JWT::encode()
  ↓
Response: { access_token, refresh_token, user }
```

### Web (Astro + Edge Function)
```
POST /functions/v1/auth-login
  ↓
Edge Function auth-login
  ↓
supabaseAdmin.from('usuarios').select() ← Supabase (PostgreSQL)
  ↓
bcrypt.compare()
  ↓
supabaseAdmin.from('usuario_rol').select() ← Supabase
  ↓
jwt.sign()
  ↓
Response: { access_token, user }
```

---

## Tabla: Mapeado entre sistemas

| Concepto | PHP (DAM) | Edge Function (Web) | Base de datos |
|---|---|---|---|
| Tabla usuarios | `usuarios` (MySQL local) | `usuarios` | Supabase PostgreSQL |
| Buscar por email | `Usuario::findByEmail()` | `supabaseAdmin.from('usuarios').eq('email', ...)` | Supabase |
| Verificar password | `password_verify()` de PHP | `bcrypt.compare()` de Deno | Tanto PHP como TypeScript usan bcrypt |
| Obtener roles | `Usuario::getRoles()` | `supabaseAdmin.from('usuario_rol').select()` | Supabase |
| Generar JWT | `JWT::encode()` | `jwt.sign()` | N/A (en memoria) |
| Almacenar token (app) | `usuario.storeRefreshToken()` | N/A | N/A (web no guarda server-side) |
| Cliente recibe | `access_token` + `refresh_token` | `access_token` | N/A |

---

## Diferencias importantes

### ✅ Lo que SÍ es igual
- Algoritmo bcrypt (ambos PASSWORD_BCRYPT)
- Estructura JWT (id, email, roles)
- Validaciones (email, activo, etc.)
- Tabla `usuarios` en Supabase (compartida)

### ❌ Lo que es diferente
| Aspecto | DAM Backend (PHP) | Web (Edge Function) |
|---|---|---|
| Lenguaje | PHP | TypeScript (Deno) |
| Base de datos | MySQL local | Supabase PostgreSQL |
| Refresh tokens | Guarda en DB (`storeRefreshToken`) | No los usa (web es stateless) |
| Sesión | Access + Refresh token | Solo Access token (1h) |
| Logout | `revokeRefreshToken()` en DB | Borra localStorage en cliente |

---

## El detalle del JWT

### JWT que genera DAM (PHP)
```
Header:    { alg: "HS256", typ: "JWT" }
Payload:   { id: "uuid", email: "...", roles: [...], iat: ..., exp: ... }
Signature: HMAC-SHA256(header.payload, JWT_SECRET)
```

### JWT que genera Web (Edge Function)
```
Header:    { alg: "HS256", typ: "JWT" }
Payload:   { id: "uuid", email: "...", roles: [...], iat: ..., exp: ... }
Signature: HMAC-SHA256(header.payload, JWT_SECRET)
```

**Nota:** El `JWT_SECRET` en ambos casos debe ser el MISMO si queremos que uno pueda verificar el JWT del otro. Pero en este caso:
- DAM app hace login en DAM backend → devuelve JWT
- Web hace login en Edge Function → devuelve JWT diferente

No intercambian JWTs, por eso no necesitan compartir el secret.

---

## Flujo de usuario real

### Usuario intenta acceder a /admin en la web sin login
```
1. Hace POST a /functions/v1/auth-login { email, password }
2. Edge Function valida contra tabla `usuarios` (Supabase)
3. Si OK → devuelve access_token
4. Frontend guarda en localStorage
5. ProtectedRoute verifica token
6. Si válido → renderiza /admin
7. Usuario cierra web y vuelve al día siguiente
8. localStorage aún tiene token → acceso inmediato (sin reloguearse)
9. Token caduca en 1 hora → next login
```

### El mismo usuario intenta login desde la app móvil (DAM)
```
1. Hace POST a /api/auth/login { email, password } al backend DAM
2. AuthService.login() valida contra tabla `usuarios` (MySQL local)
3. Si OK → devuelve access_token + refresh_token
4. App móvil guarda en secure storage
5. Refresh token permite renovar sesión sin pedir contraseña
6. Al logout → revoca refresh token en DB
```

**Son flujos independientes:** mismo usuario, diferentes tokens, diferentes servidores.

---

## Checklist de configuración

- [ ] Tabla `usuarios` en Supabase tiene `password_hash` con bcrypt (cost 12)
- [ ] Tabla `usuarios` tiene RLS activado
- [ ] Tabla `usuario_rol` existe y vincula usuarios con roles
- [ ] Tabla `roles` tiene al menos un rol "admin"
- [ ] Edge Function tiene acceso a `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Edge Function importa librerías `bcrypt` y `jwt` (Deno)
- [ ] Frontend guarda token en localStorage
- [ ] Frontend verifica token antes de renderizar /admin
