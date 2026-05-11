// Usamos esm.sh pero fijando tipos para que TS/VSCode pueda resolver declaraciones.
// Esto evita el error: "Cannot find module 'https://esm.sh/...'").
// @deno-types="https://esm.sh/@supabase/supabase-js@2.39.0/dist/module/index.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0?target=deno"

declare const Deno: {
  env: {
    get(key: string): string | undefined
  }
  serve(handler: (req: Request) => Response | Promise<Response>): void
}

// Orígenes permitidos para CORS.
// - En producción: configura ALLOWED_ORIGINS con tu(s) dominio(s).
// - En desarrollo: permitimos localhost/127.0.0.1 para poder probar desde Astro.
//
// Formato esperado (coma-separado):
//   ALLOWED_ORIGINS="https://mumabatcompany.com,https://www.mumabatcompany.com,http://localhost:4321"
const DEFAULT_ALLOWED_ORIGINS = [
  'https://mumabatcompany.com',
  'https://www.mumabatcompany.com',
]

const ALLOWED_ORIGINS = new Set(
  (Deno.env.get('ALLOWED_ORIGINS')?.split(',')
    .map((s) => s.trim())
    .filter(Boolean) ?? DEFAULT_ALLOWED_ORIGINS)
)

function isDevLocalhostOrigin(origin: string): boolean {
  // Permite cualquier puerto local para desarrollo.
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
}
const ALLOWED_TABLES = new Set([
  'contactos',
  'solicitudes_formacion',
  'consultas_web',
  'solicitudes_batnight',
  'solicitudes_refugios',
  'solicitudes_vr',
  'solicitudes_voluntarios',
  'wishlist',
  'voluntarios',
])

const SOLICITUDES_VOLUNTARIOS_ALLOWED_COLUMNS = new Set([
  'nombre',
  'email',
  'telefono',
  'organizacion',
  'tipo_evento',
  'participantes_estimados',
  'fecha_evento',
  'mensaje',
  'acepta_rgpd',
  'estado',
  'notas',
])

const SOLICITUDES_FORMACION_ALLOWED_COLUMNS = new Set([
  'nombre',
  'email',
  'telefono',
  'organizacion',
  'tipo_evento',
  'mensaje',
])

// Columnas conocidas que aceptamos para la tabla `contactos`.
// Importante: esto evita errores de inserción si desde el frontend llegan campos extra
// (p.ej. camposOcultos como `origen` o `tipo_solicitud`) que no existen como columnas.
const CONTACTOS_ALLOWED_COLUMNS = new Set([
  'nombre',
  'email',
  'telefono',
  'motivo',
  'mensaje',
  'privacidad',
  'estado',
  'notas',
  // normalmente `id` y fechas se generan en BD, no deberían venir del cliente
])

const CONTACTOS_ALLOWED_MOTIVOS = new Set([
  'charlas_educativas',
  'refugios_b2b',
  'experiencia_vr',
  'duda_general',
])

function normalizeContactosMotivo(value: unknown): string {
  if (typeof value !== 'string') return 'duda_general'
  const raw = value.trim()

  // Si ya viene un slug válido, lo respetamos
  if (CONTACTOS_ALLOWED_MOTIVOS.has(raw)) return raw

  // Si viene un label “humano” desde el frontend, lo mapeamos a los slugs válidos
  const lower = raw.toLowerCase()
  if (lower.includes('refugio')) return 'refugios_b2b'
  if (lower.includes('vr') || lower.includes('virtual')) return 'experiencia_vr'
  if (lower.includes('bat night') || lower.includes('batnight')) return 'duda_general'
  if (lower.includes('formaci') || lower.includes('consultor') || lower.includes('charla')) return 'charlas_educativas'

  // Por defecto, duda general
  return 'duda_general'
}

function filterColumns(payload: Record<string, unknown>, allowed: Set<string>) {
  const filtered: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(payload)) {
    if (allowed.has(k)) filtered[k] = v
  }
  return filtered
}
const MAX_JSON_BYTES = 20_000

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX = 10

type RateRecord = { count: number; ts: number }
type FormRequestBody = {
  tablaBD?: unknown
  datosBD?: unknown
  website?: unknown
}

const rateLimitMap = new Map<string, RateRecord>()

function buildCorsHeaders(origin: string | null) {
  // Si viene origin y está permitido, lo reflejamos.
  // Si no viene origin (p.ej. server-to-server), devolvemos el primero por defecto.
  const allowOrigin = origin && (ALLOWED_ORIGINS.has(origin) || isDevLocalhostOrigin(origin))
    ? origin
    : Array.from(ALLOWED_ORIGINS)[0] ?? 'https://mumabatcompany.com'

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  }
}

const corsHeaders = {
  // Nota: este objeto se usa solo en preflight. En POST usamos buildCorsHeaders(origin)
  'Access-Control-Allow-Origin': Array.from(ALLOWED_ORIGINS)[0] ?? 'https://mumabatcompany.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin',
} 

const securityHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
}

function jsonResponse(body: Record<string, unknown>, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...securityHeaders,
      ...buildCorsHeaders(origin),
    },
  })
}

function shouldExposeErrorDetail(origin: string | null): boolean {
  // Por seguridad, solo exponemos detalles cuando llamamos desde localhost
  // (entorno de desarrollo). En producción devolvemos un mensaje genérico.
  return !!origin && isDevLocalhostOrigin(origin)
}

function sanitizeString(value: unknown, max = 500): unknown {
  if (typeof value !== 'string') return value
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizePayload(payload: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(payload)) {
    if (!/^[a-zA-Z0-9_]{1,64}$/.test(key)) continue
    if (typeof value === 'string') {
      normalized[key] = sanitizeString(value, key === 'mensaje' ? 2000 : 300)
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      normalized[key] = value
    }
  }
  return normalized
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  if (origin && !(ALLOWED_ORIGINS.has(origin) || isDevLocalhostOrigin(origin))) {
    return jsonResponse({ success: false, message: 'Origen no permitido' }, 403, origin)
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        ...corsHeaders,
        ...buildCorsHeaders(origin),
      },
    })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Método no permitido' }, 405, origin)
  }

  try {
    const contentLength = Number(req.headers.get('content-length') ?? 0)
    if (contentLength > MAX_JSON_BYTES) {
      return jsonResponse({ success: false, message: 'Payload demasiado grande' }, 413, origin)
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const now = Date.now()
    const current = rateLimitMap.get(ip)

    if (!current || now - current.ts > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, ts: now })
    } else {
      current.count += 1
      rateLimitMap.set(ip, current)
      if (current.count > RATE_LIMIT_MAX) {
        return jsonResponse({ success: false, message: 'Demasiadas solicitudes' }, 429, origin)
      }
    }

    const body = await req.json() as FormRequestBody
    const { tablaBD, datosBD, website } = body

    // Honeypot anti-bot: si viene relleno, fingimos éxito sin insertar.
    if (typeof website === 'string' && website.trim().length > 0) {
      return jsonResponse({ success: true, message: 'Solicitud recibida' }, 200, origin)
    }

    if (!tablaBD || typeof tablaBD !== 'string' || !ALLOWED_TABLES.has(tablaBD)) {
      throw new Error('Tabla inválida')
    }

    if (!isPlainObject(datosBD)) {
      throw new Error('Payload inválido')
    }

    const datosNormalizados = normalizePayload(datosBD)

    // Comprobamos el email con una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!datosNormalizados.email || typeof datosNormalizados.email !== 'string' || !emailRegex.test(datosNormalizados.email)) {
      throw new Error('Email inválido, revise de nuevo')
    }

    const rgpdAceptado = Boolean(datosNormalizados.acepta_rgpd ?? datosNormalizados.privacidad ?? datosNormalizados.rgpd)
    if (!rgpdAceptado) {
      throw new Error('El usuario no ha aceptado la política de privacidad')
    }

    if (datosNormalizados.cantidad && (Number(datosNormalizados.cantidad) < 1 || !Number.isInteger(Number(datosNormalizados.cantidad)))) {
      throw new Error('La cantidad debe ser un número entero mayor o igual a 1')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Configuración de servidor incompleta')
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    // Normalización mínima para no romper esquemas de tablas
    // Nota: `rgpd` suele ser solo un campo de validación, pero `acepta_rgpd` SÍ es columna real
    // en varias tablas (p.ej. consultas_web, solicitudes_voluntarios). No lo eliminamos.
    if ('rgpd' in datosNormalizados) delete datosNormalizados.rgpd

    let payloadToInsert = tablaBD === 'contactos'
      ? filterColumns(datosNormalizados, CONTACTOS_ALLOWED_COLUMNS)
      : tablaBD === 'solicitudes_formacion'
        ? filterColumns(datosNormalizados, SOLICITUDES_FORMACION_ALLOWED_COLUMNS)
        : tablaBD === 'solicitudes_voluntarios'
          ? filterColumns(datosNormalizados, SOLICITUDES_VOLUNTARIOS_ALLOWED_COLUMNS)
        : datosNormalizados

    // La tabla `contactos` puede tener constraints NOT NULL (p.ej. `mensaje`).
    // Si el formulario no muestra ese campo, lo rellenamos con cadena vacía.
    if (tablaBD === 'contactos') {
      if (payloadToInsert.mensaje == null) payloadToInsert.mensaje = ''
      if (payloadToInsert.telefono == null) payloadToInsert.telefono = ''
      if (payloadToInsert.estado == null) payloadToInsert.estado = 'nuevo'
      payloadToInsert.motivo = normalizeContactosMotivo(payloadToInsert.motivo)
    }

    // `solicitudes_voluntarios` tiene CHECK constraint de estado.
    // En tu esquema el DEFAULT es 'pendiente' pero el CHECK permite 'nuevo' (no 'pendiente'),
    // así que forzamos un valor compatible si no viene desde el cliente.
    if (tablaBD === 'solicitudes_voluntarios') {
      if (payloadToInsert.estado == null) payloadToInsert.estado = 'nuevo'
    }

    const { error } = await supabaseClient.from(tablaBD).insert([payloadToInsert])

    if (error) {
      console.error('Error Supabase validar-formulario:', error)
      // En el catch ya devolvemos un mensaje genérico al usuario,
      // pero en localhost incluimos `detail` para depurar.
      throw new Error(`Supabase insert error: ${error.message}`)
    }
    return jsonResponse({ success:true, message: "Datos guardados limpios y seguros"}, 200, origin)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : err
    console.error('validar-formulario rejected:', message)
    return jsonResponse({
      success: false,
      message: "No se pudo procesar la solicitud",
      ...(shouldExposeErrorDetail(origin) ? { detail: message } : {}),
    }, 400, origin)
  }
});