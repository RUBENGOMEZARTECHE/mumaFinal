# CLAUDE.md — MUMA BAT COMPANY

## 🦇 ¿Qué es MUMA?

**MUMA BAT COMPANY** es un proyecto de investigación y comercialización que combina:

- **Ciencia & Conservación:** Investigación sobre murciélagos ibéricos, acústica biológica, soluciones basadas en naturaleza
- **Tecnología & Innovación:** Experiencias de realidad virtual inmersiva (Batcave Experience, MUMA 360)
- **Servicios Comerciales:** Refugios para murciélagos, formación ambiental, divulgación, consultoría
- **Proyecto Europeo:** Participación multinacional (España, Portugal, Eslovenia)

### Pilares Narrativos (MANTENER EN COMUNICACIÓN)

1. **Ciencia + Conservación:** Base investigativa y compromiso ambiental
2. **Tecnología + Innovación:** Herramientas VR como vehículo (no fin en sí mismo)
3. **Comunidad + Impacto:** Conexión entre instituciones, researchers, educadores, público general

---

## 🎯 Estrategia de Marca

### Público Objetivo

- **B2B Institucional:** Museos, ayuntamientos, centros comerciales, zoológicos
- **B2B Académico:** Universidades, proyectos europeos, investigadores
- **B2C Directo:** Público general interesado en naturaleza, experiencias educativas
- **Sectores:** Agricultura sostenible, turismo responsable, educación ambiental

### Diferenciadores Clave

❌ NO somos un negocio de VR genérico
✅ SOMOS expertos en murciélagos ibéricos usando VR como herramienta

❌ NO domesticamos la naturaleza
✅ APRENDEMOS de la naturaleza para colaborar con ella

**Tagline conceptual:** "Ciencia inmersiva para conservación colaborativa"

---

## 🏗️ Arquitectura Técnica

### Stack Principal

```
Frontend: Astro + React + Tailwind CSS
Backend: Supabase (PostgreSQL + Auth + Edge Functions)
VR: Meta Quest (Batcave Experience, MUMA 360)
Herramientas IA: Lovable (prototipos), ChatGPT (contenidos)
```

### Estructura de Carpetas

```
muma-astro/
├── src/
│   ├── components/         # React components (reutilizables)
│   │   ├── LoginForm.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── RealidadVirtualPage.tsx
│   │   ├── MapaRefugios.tsx
│   │   └── [otros componentes por servicio]
│   ├── context/           # React Context (Auth, Lang)
│   │   ├── AuthContext.tsx
│   │   └── LangContext.tsx
│   ├── lib/               # Utilidades (Supabase client, etc)
│   │   ├── supabase.ts
│   │   └── [otros helpers]
│   ├── pages/             # Rutas de Astro
│   │   ├── index.astro    # HOME
│   │   ├── login.astro    # ADMIN LOGIN
│   │   ├── admin/         # PANEL ADMINISTRATIVO
│   │   └── servicios/     # Páginas de servicios
│   └── layouts/           # Layouts Astro
├── public/images/         # Assets estáticos
├── astro.config.mjs       # Config Astro (sitemap, integraciones)
└── package.json
```

### Páginas Principales

| Ruta | Propósito | Audiencia | Status |
|------|----------|-----------|--------|
| `/` | HOME / Punto de entrada | B2B + B2C | ✅ En desarrollo |
| `/login` | Login panel admin | Staff interno | ✅ Funcional |
| `/admin` | Dashboard administrativo | Team MUMA | ✅ Funcional |
| `/servicios/realidad-virtual` | Producto VR | B2B + B2C | ✅ En revisión |
| `/servicios/refugios` | Producto refugios | B2B agricultor | ✅ En desarrollo |
| `/servicios/formacion` | Cursos educativos | B2B académico + B2C | ✅ En desarrollo |
| `/servicios/bat-night` | Eventos Bat Night | B2B eventos | ✅ Conectado a BD |
| `/ciencia-ciudadana` | App móvil avistamientos | B2C público | 🔄 Planeado |
| `/voluntarios` | Reclutamiento voluntarios | B2C + B2B ONGs | ✅ En desarrollo |

---

## 🔐 Seguridad & Autenticación

### Sistema de Auth

- **Backend:** Supabase Auth (email/password con bcrypt)
- **JWT:** Validación de firma criptográfica delegada a Supabase
- **Sesión:** Controlada a través de `AuthContext.tsx`
- **Datos Adicionales:** Tabla `usuarios` con roles, nombre, apellidos, teléfono

### Flujo de Login

```
Usuario escribe email/contraseña
    ↓
LoginForm → supabase.auth.signInWithPassword()
    ↓
Supabase valida + devuelve JWT
    ↓
LoginForm guarda JWT en localStorage + datos en tabla usuarios
    ↓
AuthContext valida sesión con supabase.auth.getSession()
    ↓
Redirige a /admin si válido, /login si inválido
```

### Protección de Rutas

- `ProtectedRoute.tsx` envuelve contenido que requiere auth
- Redirige automáticamente a `/login` si no hay sesión válida

---

## 📊 Estructura de Datos

### Tablas Principales (Supabase)

```sql
-- USUARIOS (Auth)
usuarios {
  id UUID PK
  correo TEXT UNIQUE
  nombre TEXT
  apellidos TEXT
  rol_id UUID FK → roles
  telefono TEXT
  premium BOOLEAN
  activo BOOLEAN
  created_at TIMESTAMP
}

-- REFUGIOS (Para panel admin + mapa)
refugios {
  id UUID PK
  codigo TEXT UNIQUE
  nombre TEXT
  municipio TEXT
  provincia TEXT
  latitud FLOAT
  longitud FLOAT
  tipo_refugio TEXT
  orientacion TEXT
  material TEXT
  soporte TEXT
  altitud_metros INT
  fecha_instalacion DATE
  observaciones TEXT (incluye historial revisiones)
  activo BOOLEAN
}

-- FORMULARIOS (Contacto, solicitudes, VR)
solicitudes_refugios {
  id UUID PK
  nombre TEXT
  email TEXT
  organizacion TEXT
  acepta_rgpd BOOLEAN
  estado TEXT (nuevo/contactado/completado)
  created_at TIMESTAMP
}

-- EVENTOS (Bat Nights, charlas)
eventos {
  id UUID PK
  nombre TEXT
  lugar TEXT
  pais TEXT
  fecha DATE
  asistentes INT
  descripcion TEXT
  created_at TIMESTAMP
}
```

---

## 🚀 Desarrollo & Deployment

### Scripts Disponibles

```bash
npm run dev      # Inicia dev server (http://localhost:4324)
npm run build    # Compila para producción
npm run preview  # Preview de build producción
```

### Configuración Astro

- **Site:** https://mumabatcompany.com
- **Output:** Static (pre-rendered)
- **Sitemap:** Auto-generada, EXCLUYE `/admin` y `/login`
- **CSS Minify:** Enabled
- **Bundling:** Code splitting por librería (framer, leaflet, supabase)

### Variables de Entorno (.env)

```env
PUBLIC_SUPABASE_URL=https://[proyecto].supabase.co
PUBLIC_SUPABASE_ANON_KEY=[anon-key-publica]
```

⚠️ **Importante:** Estas son keys PÚBLICAS (prefijo `PUBLIC_`). No incluir secrets privados aquí.

---

## 🎨 Diseño & Componentes

### Paleta de Colores

- **Primario:** Verde (#1fe1a7)
- **Secundario:** Morado (#c084fc)
- **Fondo:** Negro oscuro (#050505, #0a0a0a, #121212)
- **Texto:** Blanco (#ffffff), Gris (#a1a1aa, #6b7280)

### Componentes Reutilizables

- `Campo` — Input de formulario (email, text, tel, etc)
- `CardModulo` — Card con animación para servicios
- `KPICard` — Métrica en dashboard
- `MapaAdmin` — Mapa de refugios con Leaflet
- `PanelDetalle` — Panel lateral con detalles de refugio

### Animaciones

- Framer Motion para transiciones
- Scroll triggers con Intersection Observer
- Fade-up, slide-in, stagger effects

---

## 📱 Formularios & Datos

### Principios de Formularios

1. **Selects dinámicos, no escribir:** Usuarios prefieren elegir de opciones que escribir
2. **Un formulario genérico:** Mejor un desplegable con todos los servicios que 5 formularios distintos
3. **Validación RGPDč:** Checkbox de aceptación en todos los formularios
4. **Gestión de estado:** Respuesta en 48 horas

### Servicios Solicitables

- Realidad Virtual
- Refugios
- Formación
- Bat Night
- Volunteering

---

## 🔄 Flujos Principales

### Customer Journey (Perspectiva Mark)

```
AWARENESS → CONSIDERATION → CONVERSION → RETENTION
     ↓              ↓                ↓            ↓
  SEO/Ads      Landing page     Form+Email   Newsletter
  Redes         Información     Contacto     Descuentos
  Eventos       CTA             Venta        Fidelización
```

### Canales por Audiencia

| Audiencia | SEO | Social | Ads | Email | Eventos |
|-----------|-----|--------|-----|-------|---------|
| Público general | ✅ | ✅ (TikTok) | ✅ | ✅ | ✅ |
| Empresas B2B | ⚠️ | ✅ (LinkedIn) | ✅ | ✅ | ✅ |
| Académicos | ⚠️ | ✅ (LinkedIn) | ⚠️ | ✅ | ✅ |

---

## 📝 Guía para Nuevos Desarrolladores

### Antes de empezar

1. Lee las **transcripciones** en `info-externa/transcripciones/` para entender el negocio
2. Revisa el **astro.config.mjs** para entender las integraciones
3. Familiarízate con **AuthContext.tsx** — es el corazón de la app

### Patrones a Seguir

- ✅ Usa `supabase.from().select()` para consultas (NO fetch manual)
- ✅ Delega autenticación a `supabase.auth.getSession()`
- ✅ Envuelve rutas protegidas con `<ProtectedRoute>`
- ✅ Usa Tailwind + CSS custom para estilos
- ✅ Componentes React con `client:load` en Astro cuando sea necesario

### Evita

- ❌ Decodificar JWT manualmente (Supabase lo hace por ti)
- ❌ Almacenar tokens en localStorage sin validar firma
- ❌ Fetch manual a REST API de Supabase (usa el cliente JS)
- ❌ Hardcodear URLs o secrets en el código

---

## 🐛 Fixes de Seguridad Recientes (2026-04-15)

Se corrigieron 4 vulnerabilidades de autenticación:

1. **JWT sin validación de firma** → Delegado a `supabase.auth.getSession()`
2. **Token en localStorage** → Sesión validada por Supabase
3. **Sin validación de formato JWT** → Cliente Supabase lo valida
4. **Fetch manual inseguro** → Migrado a `supabase.from('usuarios')`

Ver: `security_fixes.md` en memory/

---

## 📞 Contacto & Recursos

### Equipo MUMA

- **Antonio:** Lead proyecto, investigación murciélagos
- **Álvaro:** Desarrollo frontend (internship DAW)
- **Mercedes, Santiago:** Otros desarrolladores

### Documentación Externa

- `ARQUITECTURA_TECNICA_AUTH.md` — Detalles de auth
- Reportes SEO en `info-externa/seo/`
- Análisis cliente en `info-externa/`

### Próximos Hitos

- [ ] Lanzar landing page para MUMA 360
- [ ] Conectar all eventos a BD (actualmente algunos en Google Forms)
- [ ] Implementar wishlist para pre-orden Batcave Experience
- [ ] MVP de app móvil para ciencia ciudadana (avistamientos)
- [ ] Migrar a httpOnly cookies (requiere backend BFF)

---

**Última actualización:** 2026-04-15  
**Autores:** Álvaro (Dev), Mark (estrategia), Francisco (mentoría)
