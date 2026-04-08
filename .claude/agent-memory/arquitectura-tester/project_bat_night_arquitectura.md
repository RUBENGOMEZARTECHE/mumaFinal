---
name: Analisis arquitectura Bat Night servicio vs eventos
description: Diagnostico completo sobre la separacion /servicios/bat-night vs /eventos/bat-night/X, con recomendacion de unificar bajo /servicios/bat-night/X
type: project
---

Analisis realizado 2026-03-16 sobre la estructura URL de Bat Night.

**Problema detectado:** Las subpaginas de casos de Bat Night se sirven bajo `/eventos/bat-night/X` pero los ficheros JSX viven en `src/pages/servicios/bat-night/`. El namespace `/eventos/` esta huerfano (no tiene indice ni otros contenidos).

**Decision recomendada:** OPCION A -- Mover todas las rutas a `/servicios/bat-night/X`. Eliminar el namespace `/eventos/`.

**Razon:**
- Solo hay 4 casos y todos son de Bat Night
- `/eventos/` no tiene indice ni otros contenidos
- Las subpaginas son "casos de exito del servicio", no "eventos" independientes
- La estructura de ficheros ya esta bajo `/servicios/bat-night/`
- Mejor herencia de autoridad SEO

**Cambios requeridos en codigo:**
1. App.jsx: cambiar 4 rutas de `/eventos/bat-night/X` a `/servicios/bat-night/X`
2. bat-night.jsx: actualizar slugs en array casosBatNight (lineas 35, 45, 53, 62)
3. Subpaginas: actualizar canonical y og:url
4. Si hay URLs indexadas: crear redirects 301

**Dudas pendientes:**
- URLs de /eventos/ indexadas en Google?
- Otros tipos de eventos previstos?
- Cuantos casos nuevos se preveen a 12 meses?

**Why:** La separacion actual confunde SEO, UX y mantenimiento. Un cliente B2B que llega a `/eventos/bat-night/cueva-nerja` piensa que es un evento pasado, no un caso de exito de un servicio contratable.

**How to apply:** Priorizar el cambio de rutas en App.jsx como FASE 1 inmediata. No crear namespace /eventos/ salvo que se demuestre necesidad real con otros tipos de eventos.
