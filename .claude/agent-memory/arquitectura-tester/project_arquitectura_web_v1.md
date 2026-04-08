---
name: Analisis arquitectura web v1
description: Diagnostico completo de la estructura de navegacion y sitemap de MuMa Bat Company, con propuesta optimizada y cambios prioritarios
type: project
---

Analisis realizado 2026-03-16 sobre la estructura de navegacion actual de murcielagosmalaga.com.

**Problemas criticos detectados:**
- /contacto no existe (sin conversion posible)
- 4 rutas fantasma en navbar (/nosotros, /contacto, /donar, /ciencia-ciudadana)
- "Donar" y "Unirse" en navbar posicionan como ONG, no empresa comercial
- "Tienda" sin tienda real (sin pasarela de pago)
- Bat Night sub-paginas mezclan servicio con portfolio bajo /servicios/
- No existe hub /servicios ni /proyectos

**Propuesta de navbar:**
- Superior: [ES|EN] [Contacto]
- Principal: Inicio | Servicios (dropdown) | Proyectos | MuMa | Contacto
- Servicios dropdown: RV, Bat Night, Refugios, Formacion

**Sitemap propuesto:**
- / (home)
- /servicios (hub)
- /servicios/realidad-virtual
- /servicios/bat-night
- /servicios/refugios
- /servicios/formacion
- /proyectos (hub con casos reales)
- /nosotros
- /contacto
- Footer: /voluntarios, /privacidad, /aviso-legal

**Why:** La web actual tiene buena base de URLs pero la navegacion esta rota, mezcla modelos ONG/comercial y no tiene embudo de conversion funcional.

**How to apply:** Usar este analisis como referencia para cualquier trabajo de arquitectura, rutas o navegacion en el proyecto. Priorizar FASE 1 (contacto, eliminar rutas rotas, limpiar navbar).
