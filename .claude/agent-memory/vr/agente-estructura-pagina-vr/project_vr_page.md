---
name: Estado actual de la página /servicios/realidad-virtual
description: Estructura real implementada (revisión marzo 2026), versión simplificada post-acuerdo de equipo, problemas detectados y decisiones vigentes
type: project
---

La página existe en `mumabatcompany/src/pages/servicios/realidad-virtual.jsx`.

**Estructura implementada a marzo 2026 — versión simplificada post-acuerdo (orden real en el JSX):**
1. Cabecera general "Realidad Virtual" — Hero con dentro-cueva.webp, H1 + subtítulo "Cinco herramientas digitales para acercar a las personas a una especie que casi nadie ha visto de cerca"
2. Bloque protagonista MuMa VR² Cave Experience — grid 2 columnas (texto + imagen Image_VRglases.webp) + 4 pilares inline en row compacta (Equipamiento, Traslado, Operador, Aval científico) + 2 CTAs (#demo / #demo)
3. Grid 4 módulos complementarios — sección con fondo diferenciado, cabecera de bloque + grid 2×2 con tarjetas. Los 4 módulos (Bats 360, Virtual Bats, MuMa Game, Virtual Museum) tienen badge "Próximamente" y CTAs desactivados
4. Franja de logos — 6 alianzas con imagen real (brightness:2, opacity:0.8)
5. CTA filosófico — franja "Con MuMa, la realidad virtual no sustituye la naturaleza. La protege." sin acción convertidora
6. Formulario — id="demo", cualifica lead: nombre, organización, tipo de espacio (select 6 opciones), participantes, fecha tentativa + email + WhatsApp

**Problemas identificados en revisión de marzo 2026:**

PROBLEMA 1 — CTA filosófico antes del formulario (bloque 5) no convierte. Es un cierre retórico que introduce fricción justo antes del paso clave. El visitante B2B que llegó al final necesita una razón de acción, no una declaración de valores. La frase funciona bien en el Hero de la cabecera general o como microcopy dentro del formulario, no como bloque independiente antes del formulario.

PROBLEMA 2 — Cabecera general demasiado informativa ("Cinco herramientas digitales..."). Introduce los 5 módulos como iguales antes de que el visitante haya visto la jerarquía. El subtítulo debe aludir al ecosistema sin aplanarlo. Alternativa: frase que posicione el conjunto como oferta premium, reservando la estructura de 5 para el cuerpo.

PROBLEMA 3 — Los 4 módulos tienen todos badge "Próximamente" y CTAs inactivos. El bloque existe pero no convierte en nada. Riesgo: el visitante llega a 4 tarjetas sin acción posible y percibe que el ecosistema no está disponible, lo que puede contaminar la percepción del servicio principal.

PROBLEMA 4 — El segundo CTA del bloque protagonista ("Ver modalidades → #demo") envía al formulario, igual que el CTA primario. Dos botones distintos que hacen lo mismo es ruido de decisión. El segundo CTA debería ir a una sección dentro de la misma página (modalidades/paquetes) o eliminarse.

PROBLEMA 5 — Ausencia total de "para quién". La versión anterior tenía un bloque "Qué gana cada tipo de cliente". La versión actual lo eliminó. Si el target es B2B (museos, ayuntamientos, hoteles, centros educativos), el visitante no se identifica en ningún punto del flujo antes del formulario.

**Decisiones tomadas y vigentes (no discutir):**
- No se muestran precios.
- No se usan métricas inventadas.
- CTA objetivo: solicitar demo / propuesta.
- Servicio MVP: instalación itinerante B2B operada por MUMA.
- Sin dispersión con B2C, licencias u otras líneas.
- Bat Cave Experience es el producto estrella destacado (2x visual).
- Logos de alianzas disponibles como imagen (no texto plano).
- Fotos y archivos .webp disponibles para uso visual.
- Los 4 módulos secundarios están marcados como "Próximamente".
- La estructura acordada con el equipo es: VR2 Cave Experience > Bats 360 > Virtual Bats > MuMa Game > Virtual Museum.

**Estructura actual — orden real en el JSX:**
Hero general → Bloque protagonista Cave Experience (grid + pilares) → Grid 4 módulos → Logos → CTA filosófico → Formulario

**Why:** La versión actual es más limpia que la anterior (eliminó 6 bloques redundantes) pero introduce nuevos problemas: el CTA filosófico antes del formulario rompe la conversión, la cabecera nivela los 5 módulos, y la ausencia de "para quién" deja al visitante B2B sin identificarse antes del formulario.

**How to apply:** En futuras revisiones, priorizar que el visitante B2B (1) entienda qué es Cave Experience, (2) se identifique como cliente potencial, (3) llegue al formulario con la menor fricción posible. El CTA filosófico debe reubicarse o convertirse en microcopy. Los módulos secundarios deben comunicar con claridad que son "próximamente" sin contaminar la percepción del servicio principal ya disponible.
