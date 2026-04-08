---
name: backend-architecture-complete
description: Full backend architecture definition - PHP REST API, MySQL schema, JWT auth, file upload, validation workflow
type: project
---

Complete backend architecture defined on 2026-03-16:

- Stack: PHP 8.1+ structured (no framework), MySQL, JWT (firebase/php-jwt)
- Pattern: Front Controller + Router + Controllers + Services + Models
- Auth: JWT access tokens (1h) + refresh tokens (30d) in DB
- Roles: cientifico, revisor, admin (N:M via usuario_rol)
- File storage: Local disk under storage/evidencias/ with hashed filenames, served via authenticated endpoint
- Validation workflow: borrador -> pendiente -> en_revision -> aprobada/rechazada/requiere_cambios
- Validation history tracked in separate validacion_cientifica table
- Audit log separate from scientific validation (auditoria_log table with JSON diffs)
- Idempotent revision creation via uuid_movil field for offline mobile support
- All endpoints designed for both mobile app and web panel consumption

**Why:** Platform needs to support field scientists uploading bat monitoring data with scientific validation, evidence storage, and admin panel.

**How to apply:** This is the canonical architecture reference. All future backend implementation should follow this structure, these table definitions, and these endpoint patterns.
