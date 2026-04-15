import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// -------------------------------------------------------------------
// LoginForm — Formulario de inicio de sesión
// -------------------------------------------------------------------
// Este componente envía email+contraseña a la Supabase Edge Function
// (que replica la lógica del AuthService.php de DAM).
//
// La Edge Function verifica:
//   1. ¿Existe el usuario? (SELECT FROM usuarios WHERE email=?)
//   2. ¿Está activo? (activo=true)
//   3. ¿La contraseña coincide? (bcrypt.compare)
//   4. Si todo OK → devuelve JWT + datos del usuario
//
// El frontend guarda todo en localStorage y redirige a /admin.

// La URL de Supabase viene de las variables de entorno (.env)
// Es la misma que usas en src/lib/supabase.ts
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL

export default function LoginForm() {
  // Estado del formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // --- EXPLICACIÓN PROFE: EL GUARDIÁN DE PUERTA INVERSO ---
  // El useEffect se ejecuta automáticamente nada más cargar la página.
  // Si el usuario ya está conectado (hay sesión válida en Supabase),
  // no tiene sentido mostrarle el formulario de login, ¡es de mala educación!
  // Así que le mandamos inmediatamente a su panel de administración.
  //
  // Usamos supabase.auth.getSession() en lugar de leer directamente localStorage,
  // esto es más seguro porque Supabase valida la sesión correctamente.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Usamos replace en vez de href para no dejar rastro en el botón "Atrás"
        window.location.replace('/admin')
      }
    })
  }, [])

  const MAX_ATTEMPTS = 5  // Máximo intentos antes de bloquear

  // -------------------------------------------------------------------
  // handleLogin — Se ejecuta al enviar el formulario
  // -------------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()  // Evita que el navegador recargue la página
    setLoading(true)
    setError('')

    try {
      // PASO 1: Verificar credenciales con Supabase Auth
      // Supabase comprueba que el email y contraseña son correctos.
      // Si son incorrectos, devuelve un error y paramos aquí.
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError('Credenciales incorrectas o usuario no encontrado.')
        setAttempts(prev => prev + 1)
        return
      }

      if (!data.session) {
        throw new Error('Error al generar el pase de seguridad.')
      }

      // PASO 2: Buscar datos del usuario en la tabla "usuarios"
      // Supabase Auth solo guarda email y contraseña. El nombre, apellidos
      // y rol están en la tabla "usuarios" que comparte con la app de DAM.
      // Por eso hacemos esta segunda consulta usando el email como clave.
      //
      // Nota: la columna se llama "correo" (no "email") — confirmado en Supabase.
      const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('id, nombre, apellidos, correo, rol_id')
        .eq('correo', email)
        .single()

      // PASO 3: Combinar datos de Auth + tabla usuarios y guardar
      // Mezclamos el token de Auth con los datos de perfil de la tabla.
      const userToSave = {
        id: data.user.id,
        email: data.user.email,
        nombre: usuarioData?.nombre || '',
        apellidos: usuarioData?.apellidos || '',
        rol_id: usuarioData?.rol_id || null,
      }

      localStorage.setItem('access_token', data.session.access_token)
      localStorage.setItem('user', JSON.stringify(userToSave))
      window.location.replace('/admin')

    } catch (err: any) {
      setError('Error de conexión. ¿Está la Edge Function desplegada?')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------
  // Diseño consistente con la web: fondo oscuro #050505, acento verde #1fe1a7
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#121212',
        border: '1px solid rgba(255,255,255,0.13)',
        borderTop: '4px solid #1fe1a7',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(31, 225, 167, 0.04)',
        borderRadius: '16px',
        padding: '40px 32px',
        position: 'relative',
      }}>
        {/* Decoración de alta seguridad */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '1px', background: 'linear-gradient(90deg, transparent, #1fe1a7, transparent)' }} />
        
        {/* Logo / Título con Copywriting Elevado */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(31, 225, 167, 0.1)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto',
            color: '#1fe1a7'
          }}>
            {/* Icono de escudo de máxima seguridad */}
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase'
          }}>
            Hub de Especialistas MUMA
          </h1>
          <p style={{
            color: '#1fe1a7',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
            margin: 0,
          }}>
            Solo Personal Homologado
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          {/* Campo Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#a1a1aa',
              fontSize: '13px',
              marginBottom: '6px',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Campo Contraseña */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#a1a1aa',
              fontSize: '13px',
              marginBottom: '6px',
            }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#ef4444',
              fontSize: '13px',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          {/* Botón Login */}
          <button
            type="submit"
            disabled={loading || attempts >= MAX_ATTEMPTS}
            style={{
              width: '100%',
              padding: '12px',
              background: attempts >= MAX_ATTEMPTS ? '#374151' : '#1fe1a7',
              color: attempts >= MAX_ATTEMPTS ? '#9ca3af' : '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading || attempts >= MAX_ATTEMPTS ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
            }}
          >
            {attempts >= MAX_ATTEMPTS
              ? 'Demasiados intentos. Espera 5 minutos.'
              : loading
                ? 'Verificando credenciales...'
                : 'Entrar'
            }
          </button>
        </form>

        {/* Footer Corporativo */}
        <p style={{
          textAlign: 'center',
          color: '#c084fc',
          fontSize: '11px',
          marginTop: '28px',
          lineHeight: '1.6'
        }}>
          Conexión encriptada. <br/> 
          Acceso exclusivo para miembros y operativos homologados.
        </p>
      </div>
    </div>
  )
}
