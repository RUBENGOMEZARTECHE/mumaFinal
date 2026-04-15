# MUMA — Murciélagos Málaga · Contexto de Base de Datos

## Plataforma
- **Backend**: Supabase (PostgreSQL) — proyecto `murcielagos-malaga-db`
- **URL**: `https://vggehfsudaizubmhbjwi.supabase.co`
- **Región**: Central EU (Frankfurt) · Plan Nano
- **Autenticación**: Supabase Auth integrada con la tabla `usuarios` (relación via `auth.users`)
- **Convenciones**: IDs tipo `uuid` con `gen_random_uuid()`, timestamps con `timestamptz`, trigger automático `actualizar_updated_at()` en la mayoría de tablas

---

## Estructura general

La BD tiene **34 tablas** organizadas en 6 módulos funcionales:

1. Usuarios y acceso
2. Ciencia ciudadana (observaciones y refugios)
3. Eventos Bat Night
4. Catálogo / e-commerce
5. Gamificación
6. Web / CMS

---

## MÓDULO 1 — Usuarios y Acceso

### `roles`
Tipos de usuario del sistema. Datos iniciales: 4 roles.
```sql
id uuid PK
nombre varchar(50) UNIQUE NOT NULL
descripcion text
activo boolean DEFAULT true
created_at timestamptz
updated_at timestamptz
```

### `planes_acceso`
Planes de suscripción/acceso. Datos iniciales: 4 planes.
```sql
id uuid PK
nombre varchar(50) UNIQUE NOT NULL
descripcion text
activo boolean DEFAULT true
created_at timestamptz
updated_at timestamptz
```

### `usuarios`
Tabla central de usuarios, extiende Supabase Auth.
```sql
id uuid PK  -- mismo id que auth.users
nombre varchar NOT NULL
apellidos varchar
email varchar UNIQUE NOT NULL
telefono varchar
avatar_url text
bio text
rol_id uuid FK → roles.id
plan_acceso_id uuid FK → planes_acceso.id
xp_total integer DEFAULT 0            -- gamificación
nivel_actual integer DEFAULT 1        -- gamificación
total_observaciones integer DEFAULT 0 -- contador desnormalizado
activo boolean DEFAULT true
email_verificado boolean DEFAULT false
ultima_conexion timestamptz
created_at timestamptz
updated_at timestamptz
-- posibles campos adicionales de perfil
```

---

## MÓDULO 2 — Ciencia Ciudadana

### `especies`
Catálogo de especies de murciélagos. 11 columnas.
```sql
id uuid PK
nombre_cientifico varchar NOT NULL UNIQUE
nombre_comun varchar
familia varchar
descripcion text
estado_conservacion varchar  -- ej: LC, VU, EN (UICN)
imagen_url text
activo boolean DEFAULT true
created_at timestamptz
updated_at timestamptz
```

### `refugios`
Refugios/colonias de murciélagos. 21 columnas. Tabla central del módulo científico.
```sql
id uuid PK
codigo varchar UNIQUE      -- código de referencia
nombre varchar
descripcion text
ubicacion text             -- descripción textual de la ubicación
municipio varchar
provincia varchar
latitud numeric            -- coordenadas GPS
longitud numeric
altitud_metros numeric
tipo_refugio varchar       -- cueva, edificio, árbol, puente...
orientacion varchar        -- N, S, E, O...
material varchar
soporte varchar
aforo_maximo integer       -- estimación máxima de individuos
reservas_actuales integer  -- desnormalizado
estado_operativo_id uuid FK → estados_operativos.id  (presumible)
imagen_url text
publicado boolean DEFAULT false
activo boolean DEFAULT true
created_by uuid FK → usuarios.id
updated_by uuid FK → usuarios.id
created_at timestamptz
updated_at timestamptz
```

### `estados_operativos`
Catálogo de estados operativos. 5 registros.
```sql
id uuid PK
nombre varchar UNIQUE NOT NULL
descripcion text
activo boolean
created_at timestamptz
updated_at timestamptz
```

### `estados_revision`
Estados de una revisión científica. 3 registros: `ocupacion_confirmada`, `sin_actividad`, `actividad_probable`.
```sql
id uuid PK
nombre varchar UNIQUE NOT NULL
descripcion text
```

### `revisiones`
Inspecciones/visitas a refugios. 15 columnas.
```sql
id uuid PK
refugio_id uuid FK → refugios.id
usuario_id uuid FK → usuarios.id        -- revisor
estado_revision_id uuid FK → estados_revision.id
fecha_revision timestamptz NOT NULL
temperatura numeric
humedad numeric
observaciones text
created_by uuid FK → usuarios.id
updated_at timestamptz
created_at timestamptz
-- campos adicionales de contexto de visita
```

### `revision_especie`
Detalle de especies detectadas en una revisión. 8 columnas.
```sql
id uuid PK
revision_id uuid FK → revisiones.id
especie_id uuid FK → especies.id
cantidad_estimada integer
notas text
created_at timestamptz
updated_at timestamptz
```

### `tipos_evidencia`
Catálogo de tipos de evidencia. 4 registros: `observacion_directa`, `ultrasonido`, `guano`, `rastros`.
```sql
id uuid PK
nombre varchar UNIQUE NOT NULL
descripcion text
```

### `observaciones`
Observaciones de campo registradas por usuarios. Tabla principal de ciencia ciudadana. 15 columnas.
```sql
id uuid PK
refugio_id uuid FK → refugios.id
revision_id uuid FK → revisiones.id    -- opcional, si forma parte de una revisión formal
usuario_id uuid FK → usuarios.id
especie_id uuid FK → especies.id
titulo varchar NOT NULL
descripcion text
fecha_observacion timestamptz NOT NULL
activo boolean DEFAULT true
latitud numeric(9,6)                   -- coordenadas GPS de la observación
longitud numeric(9,6)
created_by uuid FK → usuarios.id
updated_by uuid FK → usuarios.id
created_at timestamptz
updated_at timestamptz
```
**Índices**: `idx_observaciones_especie_id`, `idx_observaciones_latitud`, `idx_observaciones_longitud`

### `archivos_evidencia`
Archivos adjuntos (fotos, audio de ultrasonidos, etc.) a observaciones o revisiones.
```sql
id uuid PK
revision_id uuid FK → revisiones.id         -- nullable
observacion_id uuid FK → observaciones.id   -- nullable
revision_especie_id uuid FK → revision_especie.id  -- nullable
usuario_id uuid FK → usuarios.id
tipo_archivo varchar NOT NULL              -- imagen, audio, video, documento
nombre_original varchar NOT NULL
ruta_archivo text NOT NULL
mime_type varchar
tamano_bytes bigint
fecha_captura timestamptz
descripcion text
activo boolean DEFAULT true
created_at timestamptz
updated_at timestamptz
```

### `validaciones`
Validaciones científicas de revisiones (peer-review interno).
```sql
id uuid PK
revision_id uuid FK → revisiones.id
usuario_id uuid FK → usuarios.id    -- validador
-- campos de validación, comentarios, estado
created_at timestamptz
updated_at timestamptz
```

### `auditoria_cambios`
Log de auditoría de cambios en la BD.
```sql
id uuid PK
usuario_id uuid FK → usuarios.id
-- tabla_afectada, operacion, datos_anteriores, datos_nuevos...
created_at timestamptz
updated_at timestamptz
```

---

## MÓDULO 3 — Eventos Bat Night

### `tipos_evento`
Catálogo de tipos de evento. 4 registros: `batnight`, `revision_refugio`, `mantenimiento`, `divulgacion`.
```sql
id uuid PK
nombre varchar UNIQUE NOT NULL
descripcion text
activo boolean
created_at timestamptz
updated_at timestamptz
```

### `eventos_batnight`
Eventos de salidas nocturnas de observación de murciélagos. 17 columnas.
```sql
id uuid PK
nombre varchar NOT NULL
descripcion text
fecha_evento date NOT NULL
hora_evento time NOT NULL
ubicacion text
municipio varchar
plazas_totales integer        -- aforo total
aforo_maximo integer
reservas_actuales integer     -- contador desnormalizado
estado_operativo_id ...       -- referencia a estado del evento
imagen_url text
publicado boolean DEFAULT false
activo boolean DEFAULT true
created_by uuid FK → usuarios.id
updated_by uuid FK → usuarios.id
created_at timestamptz
updated_at timestamptz
```

### `eventos_refugio`
Relación entre eventos y los refugios que se visitan. 13 columnas.
```sql
id uuid PK
evento_batnight_id uuid FK → eventos_batnight.id
tipo_evento_id uuid FK → tipos_evento.id
-- orden, notas, duración...
created_at timestamptz
updated_at timestamptz
```

### `entradas_reservas`
Reservas de entradas para eventos. Permite registro de usuarios registrados o invitados.
```sql
id uuid PK
evento_batnight_id uuid FK → eventos_batnight.id ON UPDATE CASCADE ON DELETE CASCADE
usuario_id uuid FK → usuarios.id ON UPDATE CASCADE ON DELETE SET NULL   -- nullable
nombre_invitado varchar(150)     -- para invitados sin cuenta
email_invitado varchar(255)      -- para invitados sin cuenta
codigo_qr_hash varchar(255) UNIQUE NOT NULL
estado_reserva varchar(20) DEFAULT 'confirmada'
  CHECK (estado_reserva IN ('confirmada', 'cancelada', 'asistio'))
fecha_reserva timestamptz DEFAULT now()
created_at timestamptz
updated_at timestamptz
-- CHECK: usuario_id IS NOT NULL OR email_invitado IS NOT NULL
```
**Índices**: por `evento_batnight_id`, por `usuario_id`, por `estado_reserva`

### `participantes`
Datos de participantes en eventos (personas físicas).
```sql
id uuid PK
nombre varchar NOT NULL
apellidos varchar
correo varchar
telefono varchar
observaciones text
created_at timestamptz
updated_at timestamptz
```

### `evento_participante`
Tabla puente entre eventos y participantes.
```sql
id uuid PK
evento_batnight_id uuid FK → eventos_batnight.id
participante_id uuid FK → participantes.id
fecha_inscripcion timestamptz
asistencia_confirmada boolean
observaciones text
created_at timestamptz
updated_at timestamptz
```

---

## MÓDULO 4 — Catálogo / E-commerce

### `productos_servicios`
Catálogo de productos y servicios ofrecidos por MUMA.
```sql
id uuid PK
nombre varchar NOT NULL
descripcion_larga text
precio_referencia numeric
categorias varchar        -- podría ser array o comma-separated
imagen_principal text
publicado boolean DEFAULT false
orden integer             -- orden de visualización
created_at timestamptz
updated_at timestamptz
```

### `solicitudes_catalogo`
Solicitudes/peticiones de productos o servicios por parte de usuarios.
```sql
id uuid PK
usuario_id uuid FK → usuarios.id
producto_servicio_id uuid FK → productos_servicios.id
nombre_contacto varchar NOT NULL
email_contacto varchar NOT NULL
telefono_contacto varchar
datos_contacto_estra jsonb   -- datos adicionales flexibles
estado_solicitud varchar     -- pendiente, en_proceso, resuelta...
mensaje text
created_at timestamptz
updated_at timestamptz
```

---

## MÓDULO 5 — Gamificación

### `logros`
Logros/badges que pueden ganar los usuarios. 4 registros iniciales.
```sql
id uuid PK
nombre varchar NOT NULL UNIQUE
descripcion text
icono_url text
xp_recompensa integer    -- XP que otorga el logro
activo boolean DEFAULT true
created_at timestamptz
updated_at timestamptz
```

### `usuario_logro`
Tabla puente usuario ↔ logros. Registra cuándo se desbloqueó cada logro.
```sql
id uuid PK
usuario_id uuid FK → usuarios.id
logro_id uuid FK → logros.id
fecha_desbloqueo timestamptz DEFAULT now()
observaciones text
created_at timestamptz
updated_at timestamptz
```

---

## MÓDULO 6 — Web / CMS

### `contenido_web`
Bloques de contenido para la web pública.
```sql
id uuid PK
-- seccion, titulo, subtitulo, cuerpo, imagen_url, orden, activo...
created_at timestamptz
updated_at timestamptz
```

### `seo_paginas`
Metadatos SEO por página.
```sql
id uuid PK
-- pagina, titulo_seo, descripcion_seo, og_image, keywords...
created_at timestamptz
updated_at timestamptz
```

### `consultas_web`
Leads y consultas recibidas a través de la web. 16 columnas.
```sql
id uuid PK
-- nombre, email, telefono, mensaje, asunto, origen, estado, leido...
created_at timestamptz
updated_at timestamptz
```

### `preguntas_frecuentes`
FAQ de la web.
```sql
id uuid PK
-- pregunta, respuesta, orden, categoria, activo...
created_at timestamptz
updated_at timestamptz
```

### `testimonios`
Testimonios de usuarios/entidades. Vinculados a `entidades`.
```sql
id uuid PK
entidad_id uuid FK → entidades.id
-- autor, cargo, texto, imagen, activo, orden...
created_at timestamptz
updated_at timestamptz
```

### `entidades`
Organizaciones o empresas colaboradoras.
```sql
id uuid PK
-- nombre, tipo, descripcion, logo_url, web_url, activo...
created_at timestamptz
updated_at timestamptz
```

### `proyectos_web`
Proyectos mostrados en la web pública. 14 columnas.
```sql
id uuid PK
-- titulo, descripcion, imagen, url, estado, fechas, activo...
created_at timestamptz
updated_at timestamptz
```

### `servicios`
Servicios ofrecidos por la organización. 13 columnas.
```sql
id uuid PK
-- nombre, descripcion, icono, precio, activo, orden...
created_at timestamptz
updated_at timestamptz
```

---

## Vistas (Views)

### `vista_observaciones_completas`
```sql
CREATE VIEW vista_observaciones_completas AS
SELECT o.*, u.nombre AS usuario, e.nombre_cientifico
FROM observaciones o
JOIN usuarios u ON o.usuario_id = u.id
JOIN especies e ON o.especie_id = e.id;
```

### `vista_ranking`
```sql
CREATE VIEW vista_ranking AS
SELECT nombre, xp_total, nivel_actual
FROM usuarios
ORDER BY xp_total DESC;
```

---

## Relaciones clave (Foreign Keys) — resumen
```
archivos_evidencia.observacion_id    → observaciones.id
archivos_evidencia.revision_id       → revisiones.id
archivos_evidencia.revision_especie_id → revision_especie.id
archivos_evidencia.usuario_id        → usuarios.id

auditoria_cambios.usuario_id         → usuarios.id

entradas_reservas.evento_batnight_id → eventos_batnight.id
entradas_reservas.usuario_id         → usuarios.id

evento_participante.evento_batnight_id → eventos_batnight.id
evento_participante.participante_id    → participantes.id

eventos_batnight.updated_by          → usuarios.id
eventos_batnight.created_by          → usuarios.id

eventos_refugio.tipo_evento_id       → tipos_evento.id
eventos_refugio.evento_batnight_id   → eventos_batnight.id (presumible)

observaciones.refugio_id             → refugios.id
observaciones.revision_id            → revisiones.id
observaciones.usuario_id             → usuarios.id
observaciones.especie_id             → especies.id

revisiones.refugio_id                → refugios.id
revisiones.usuario_id                → usuarios.id
revisiones.estado_revision_id        → estados_revision.id
revisiones.created_by                → usuarios.id

revision_especie.revision_id         → revisiones.id
revision_especie.especie_id          → especies.id (presumible)

solicitudes_catalogo.usuario_id      → usuarios.id
solicitudes_catalogo.producto_servicio_id → productos_servicios.id

testimonios.entidad_id               → entidades.id

usuario_logro.usuario_id             → usuarios.id
usuario_logro.logro_id               → logros.id

usuarios.plan_acceso_id              → planes_acceso.id
usuarios.rol_id                      → roles.id

validaciones.usuario_id              → usuarios.id
validaciones.revision_id             → revisiones.id
```

---

## Datos de catálogo (valores fijos)

| Tabla | Valores |
|-------|---------|
| `estados_revision` | `ocupacion_confirmada`, `sin_actividad`, `actividad_probable` |
| `tipos_evidencia` | `observacion_directa`, `ultrasonido`, `guano`, `rastros` |
| `tipos_evento` | `batnight`, `revision_refugio`, `mantenimiento`, `divulgacion` |
| `entradas_reservas.estado_reserva` | `confirmada`, `cancelada`, `asistio` |

---

## Convenciones de código

- Todos los IDs son `uuid` generados con `gen_random_uuid()`
- Timestamps siempre con timezone (`timestamptz`)
- El campo `activo boolean` se usa como soft-delete en la mayoría de tablas
- El campo `publicado boolean` controla visibilidad pública en web
- Trigger `actualizar_updated_at()` en todas las tablas con `updated_at`
- Prefijo `idx_` para índices, `trg_` para triggers, `chk_` para constraints check
- Queries en Supabase JS: usar siempre `.eq('activo', true)` al listar registros
- Para datos públicos de la web usar `.eq('publicado', true)`

---

## Queries de ejemplo frecuentes
```javascript
// Observaciones completas con especie y usuario
const { data } = await supabase
  .from('vista_observaciones_completas')
  .select('*')
  .eq('activo', true)
  .order('fecha_observacion', { ascending: false })

// Ranking de usuarios por XP
const { data } = await supabase
  .from('vista_ranking')
  .select('nombre, xp_total, nivel_actual')

// Eventos próximos publicados
const { data } = await supabase
  .from('eventos_batnight')
  .select('*, eventos_refugio(refugios(nombre, municipio))')
  .eq('publicado', true)
  .eq('activo', true)
  .gte('fecha_evento', new Date().toISOString())
  .order('fecha_evento')

// Observaciones de un usuario con especie
const { data } = await supabase
  .from('observaciones')
  .select('*, especies(nombre_cientifico, nombre_comun), refugios(nombre, municipio)')
  .eq('usuario_id', userId)
  .eq('activo', true)

// Refugios activos con conteo de observaciones
const { data } = await supabase
  .from('refugios')
  .select('*, observaciones(count)')
  .eq('activo', true)
```