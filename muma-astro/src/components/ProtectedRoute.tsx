import { useAuth } from '../context/AuthContext'

// -------------------------------------------------------------------
// ProtectedRoute — Componente guardián
// -------------------------------------------------------------------
// Envuelve contenido que solo debe verse si el usuario está logueado.
//
// Uso en AdminDashboard.tsx:
//   <ProtectedRoute>
//     <h1>Panel Admin</h1>
//     <p>Solo visible si estás logueado</p>
//   </ProtectedRoute>
//
// Flujo:
//   1. loading=true  → Muestra "Verificando sesión..."
//   2. user=null     → Redirige a /login (window.location.replace)
//   3. user existe   → Renderiza {children}
//
// ¿Por qué window.location.replace y no window.location.href?
//   replace() NO añade la página actual al historial del navegador.
//   Si usaras href, el usuario podría pulsar "Atrás" y volvería a /admin
//   (que le redirigiría otra vez a /login) — un bucle infinito molesto.

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  // Paso 1: Aún estamos verificando si hay token en localStorage
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        color: '#6b7280',
        fontSize: '14px',
        fontFamily: 'monospace',
      }}>
        Verificando sesión...
      </div>
    )
  }

  // Paso 2: No hay usuario → redirigir a /login
  if (!user) {
    window.location.replace('/login')
    return null  // No renderizamos nada mientras redirige
  }

  // Paso 3: Usuario logueado → mostrar el contenido protegido
  return <>{children}</>
}
