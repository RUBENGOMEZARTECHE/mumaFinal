# RLS Matrix (pre-producción)

Guía mínima para definir políticas de Row Level Security por tabla.

| Tabla                 | anon                  | authenticated                  | admin                    |
|----------------------|-----------------------|--------------------------------|--------------------------|
| `eventos_batnight`   | `SELECT`              | `SELECT`                       | `CRUD`                   |
| `contactos`          | `INSERT`              | `INSERT`                       | `SELECT`, `UPDATE`       |
| `consultas_web`      | `INSERT`              | `INSERT`                       | `SELECT`, `UPDATE`       |
| `solicitudes_vr`     | `INSERT`              | `INSERT`                       | `SELECT`, `UPDATE`       |
| `solicitudes_refugios` | `INSERT`            | `INSERT`                       | `SELECT`, `UPDATE`       |
| `refugios`           | `SELECT` (si público) | `SELECT` (si público)          | `CRUD`                   |
| `observaciones`      | `-`                   | `SELECT` own, `INSERT` own     | `CRUD`                   |
| `usuarios`           | `-`                   | `SELECT` own, `UPDATE` own     | `SELECT`, `UPDATE` all   |

## Reglas operativas

1. Activar RLS en todas las tablas con datos reales.
2. No crear políticas amplias (`using (true)`) en tablas sensibles.
3. Para formularios públicos: permitir solo `INSERT` a `anon`/`authenticated`.
4. Para panel admin: aplicar acceso por rol desde políticas SQL (no solo frontend).
5. Revisar buckets de Storage con la misma filosofía (mínimo privilegio).

## Checklist rápido antes de deploy

- [ ] RLS activo en tablas críticas.
- [ ] Sin `SELECT` público en `usuarios`, `contactos`, `observaciones`.
- [ ] Operaciones de admin protegidas por rol en políticas.
- [ ] Formularios públicos solo insertan lo necesario.
- [ ] Pruebas manuales con usuario `anon`, usuario normal y usuario admin.
