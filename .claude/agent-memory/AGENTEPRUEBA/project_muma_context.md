---
name: muma_bat_company_project_context
description: Contexto completo del proyecto MUMA BAT COMPANY — stack, estado actual, lo que falta construir
type: project
---

Proyecto web para MUMA BAT COMPANY, empresa especializada en servicios con murciélagos (museo virtual, refugios, educación ambiental, consultoría, Bat Night).

**Stack actual:**
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + react-router-dom v7 + framer-motion + react-helmet-async
- No hay backend. Solo frontend estático.
- No hay base de datos, ni API, ni servidor.

**Estructura de archivos (solo frontend):**
- `src/App.jsx` — raíz con rutas (solo tiene `/`)
- `src/pages/inicio.jsx` — home completa
- `src/components/hero.jsx`, `navbar.jsx`, `calculadora.jsx`
- `src/context/LangContext.jsx` — i18n en cliente (es/en/de) via useState
- `src/data/heroI18n.js` — textos del hero por idioma
- `seo/contenido/home.md` — plan SEO de la home
- `seo/contenido/home-i18n.js` — objeto SEO multilingue (no conectado al código aún)
- `seo/contenido/01-refugios.md` — plan SEO landing de refugios

**Lo que FALTA construir (backend y páginas):**
- No existe ningún backend. El formulario de contacto hace `setEnviado(true)` pero NO envía datos a ningún sitio.
- No hay rutas para páginas de servicio: `/servicios/bat-night`, `/servicios/refugios`, `/servicios/educacion-ambiental`, `/servicios/consultoria`, `/servicios/museo-virtual-vr`
- No hay rutas multilingue: `/en/`, `/de/`
- No hay página `/sobre-nosotros`, `/proyectos`, `/contacto`
- No hay mapa real (Leaflet cargado pero sin datos, solo placeholder)
- No hay logo real ni favicon personalizado
- No hay robots.txt ni sitemap.xml
- No hay manejo de error 404
- El número de WhatsApp es placeholder: `wa.me/34600000000` (en heroI18n.js) y `wa.me/34XXXXXXXXX` (en home-i18n.js)
- El objeto `home-i18n.js` en `/seo/contenido/` no está importado ni conectado al código React

**Why:** El proyecto está en fase de construcción inicial — solo la home está semi-terminada.
**How to apply:** Al sugerir trabajo nuevo, tener en cuenta que toda infraestructura de rutas, backend y páginas internas está pendiente de crear desde cero.
