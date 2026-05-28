import { AuthProvider, useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// -------------------------------------------------------------------
// AdminDashboard — Panel de administración protegido
// -------------------------------------------------------------------
// Este componente SOLO se renderiza si el usuario está logueado.
// La protección la hace ProtectedRoute (que usa AuthContext).
//
// Estructura:
//   <AuthProvider>          ← Provee el contexto de auth
//     <ProtectedRoute>      ← Verifica que haya sesión
//       <DashboardContent>  ← El panel real
//     </ProtectedRoute>
//   </AuthProvider>
//
// ¿Por qué AuthProvider envuelve todo aquí y no en otro sitio?
// Porque en Astro, cada página carga sus componentes de forma
// independiente. No hay un "App.tsx" global como en Create React App.
// Así que cada página que necesite auth debe tener su propio Provider.

// -------------------------------------------------------------------
// DashboardContent — Contenido interno del panel
// -------------------------------------------------------------------
// Separado del export principal para poder usar useAuth() dentro.
// (Los hooks solo funcionan dentro de un Provider)

function DashboardContent() {
  const { user, signOut } = useAuth()
  const [refugios, setRefugios] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarRefugios() {
      const { data, error } = await supabase.from('refugios').select('*')
      if (data && !error) {
        setRefugios(data)
      }
      setCargando(false)
    }
    cargarRefugios()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      color: '#ffffff',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Header del panel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              margin: '0 0 4px 0',
            }}>
              Panel de Administración
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: 0,
            }}>
              Bienvenido, {user?.nombre || user?.email}
            </p>
          </div>

          <button
            onClick={signOut}
            style={{
              padding: '8px 20px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#a1a1aa',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ef4444'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = '#a1a1aa'
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Info del usuario */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          <InfoCard label="Email" value={user?.email || ''} />
          <InfoCard label="Nombre" value={`${user?.nombre || ''} ${user?.apellidos || ''}`} />
          <InfoCard label="Roles" value={user?.roles?.join(', ') || 'Sin rol asignado'} />
        </div>

        {/* NUEVA SECCIÓN DE REFUGIOS */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>
            Listado de Refugios de DAM
          </h2>

          {/* El if/else de pintar: Si estamos cargando, mostramos texto. Si no, pintamos las tarjetas. */}
          {cargando ? (
            <p style={{ color: '#6b7280' }}>Conectando con la base de datos y descargando refugios...</p>
          ) : refugios.length === 0 ? (
            <p style={{ color: '#ef4444' }}>No se ha encontrado ningún refugio registrado.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>

              {/* EXPLICACIÓN PROFE: EL BUCLE MAP */}
              {/* .map() es un bucle que coge la lista entera de refugios, y repite el diseño de abajo por CADA refugio que encuentre. */}
              {refugios.map((refugio) => (
                <div key={refugio.id} style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '24px',
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1fe1a7' }}>
                    {refugio.nombre || 'Refugio sin nombre'}
                  </h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#a1a1aa' }}>
                    Provincia: {refugio.provincia || 'Desconocida'} • Municipio: {refugio.municipio || 'Desconocido'}
                  </p>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px' }}>
                      Aforo max: {refugio.aforo_maximo || 0}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// -------------------------------------------------------------------
// InfoCard — Tarjeta con un dato del usuario
// -------------------------------------------------------------------

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      padding: '16px 20px',
    }}>
      <p style={{
        color: '#6b7280',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '0 0 4px 0',
      }}>
        {label}
      </p>
      <p style={{
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 500,
        margin: 0,
      }}>
        {value}
      </p>
    </div>
  )
}

// -------------------------------------------------------------------
// EXPORT PRINCIPAL
// -------------------------------------------------------------------
// Este es el componente que importa la página Astro (admin/index.astro).
// Envuelve todo en AuthProvider + ProtectedRoute.

export default function AdminDashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </AuthProvider>
  )
}
