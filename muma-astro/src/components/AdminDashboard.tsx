import { useState, useEffect, useCallback } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import { supabase } from '../lib/supabase'

// ── Tipos ──────────────────────────────────────────────────────────────
interface Refugio {
  id: string
  codigo: string
  nombre: string
  municipio: string
  provincia: string
  latitud: number
  longitud: number
  tipo_refugio: string | null
  orientacion: string | null
  material: string | null
  soporte: string | null
  altitud_metros: number | null
  fecha_instalacion: string | null
  observaciones: string | null
  activo: boolean
}

// ── Helpers ────────────────────────────────────────────────────────────
function parseRevisiones(obs: string): { numero: string; fecha: string; estado: string }[] {
  const regex = /(\d+)º\s*[Rr]evisión\s*\(([^)]+)\)\s*[:：]\s*([^/\n]+)/g
  const revisiones = []
  let m
  while ((m = regex.exec(obs)) !== null) {
    revisiones.push({ numero: m[1], fecha: m[2].trim(), estado: m[3].trim() })
  }
  return revisiones
}

function ultimaRevision(obs: string | null): string {
  if (!obs) return '—'
  const revisiones = parseRevisiones(obs)
  if (revisiones.length === 0) return '—'
  return revisiones[revisiones.length - 1].estado
}

function colorEstado(estado: string): string {
  const e = estado.toLowerCase()
  if (e.includes('ocupado') && !e.includes('no')) return '#1fe1a7'
  if (e.includes('oportunista')) return '#f59e0b'
  if (e === 'xx' || e === '—') return '#6b7280'
  return '#6b7280'
}

// ── Panel lateral de detalle ───────────────────────────────────────────
function PanelDetalle({ refugio, onClose }: { refugio: Refugio; onClose: () => void }) {
  const revisiones = refugio.observaciones ? parseRevisiones(refugio.observaciones) : []
  const ubicacionTexto = refugio.observaciones?.split('/')[0]?.trim() || '—'

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
      background: '#0a0a0a', borderLeft: '1px solid rgba(192,132,252,0.4)',
      zIndex: 1000, overflowY: 'auto', boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(192,132,252,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#0a0a0a', zIndex: 10 }}>
        <div>
          <p style={{ color: '#1fe1a7', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, margin: '0 0 4px 0', letterSpacing: '0.1em' }}>{refugio.codigo}</p>
          <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: 0 }}>{refugio.nombre}</h2>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: '4px 0 0 0' }}>{ubicacionTexto}</p>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#6b7280', padding: '6px 12px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
      </div>

      {/* Datos técnicos */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(192,132,252,0.1)' }}>
        <p style={{ color: '#a1a1aa', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px 0' }}>Datos técnicos</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Municipio', value: refugio.municipio },
            { label: 'Provincia', value: refugio.provincia },
            { label: 'Tipo', value: refugio.tipo_refugio },
            { label: 'Orientación', value: refugio.orientacion },
            { label: 'Soporte', value: refugio.soporte },
            { label: 'Altitud', value: refugio.altitud_metros ? `${refugio.altitud_metros}m` : null },
            { label: 'Instalación', value: refugio.fecha_instalacion ? new Date(refugio.fecha_instalacion).toLocaleDateString('es-ES') : null },
            { label: 'Estado', value: refugio.activo ? 'Activo' : 'Inactivo' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#121212', borderRadius: '8px', padding: '10px 12px' }}>
              <p style={{ color: '#6b7280', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 2px 0' }}>{label}</p>
              <p style={{ color: value ? '#fff' : '#374151', fontSize: '13px', fontWeight: 500, margin: 0 }}>{value || '—'}</p>
            </div>
          ))}
        </div>
        {refugio.latitud && (
          <div style={{ marginTop: '10px', background: '#121212', borderRadius: '8px', padding: '10px 12px' }}>
            <p style={{ color: '#6b7280', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 2px 0' }}>Coordenadas</p>
            <p style={{ color: '#1fe1a7', fontSize: '12px', fontFamily: 'monospace', margin: 0 }}>{refugio.latitud}, {refugio.longitud}</p>
          </div>
        )}
      </div>

      {/* Historial de revisiones */}
      <div style={{ padding: '20px 24px', flex: 1 }}>
        <p style={{ color: '#a1a1aa', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px 0' }}>
          Historial de revisiones ({revisiones.length})
        </p>
        {revisiones.length === 0 ? (
          <p style={{ color: '#374151', fontSize: '13px' }}>Sin revisiones registradas</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[...revisiones].reverse().map((rev, i) => {
              const color = colorEstado(rev.estado)
              const esUltima = i === 0
              return (
                <div key={i} style={{
                  background: esUltima ? 'rgba(31,225,167,0.05)' : '#121212',
                  border: `1px solid ${esUltima ? 'rgba(31,225,167,0.2)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: '8px', padding: '10px 12px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '10px', margin: '0 0 2px 0' }}>Revisión {rev.numero} · {rev.fecha}</p>
                    <p style={{ color: color, fontSize: '13px', fontWeight: 500, margin: 0 }}>{rev.estado}</p>
                  </div>
                  {esUltima && <span style={{ fontSize: '10px', color: '#1fe1a7', fontWeight: 700, background: 'rgba(31,225,167,0.1)', padding: '2px 8px', borderRadius: '999px' }}>Última</span>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Mapa admin ─────────────────────────────────────────────────────────
function MapaAdmin({ refugios, onSelect }: { refugios: Refugio[]; onSelect: (r: Refugio) => void }) {
  const [MapComp, setMapComp] = useState<any>(null)

  useEffect(() => {
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    import('./MapaAdmin.tsx').then(m => setMapComp(() => m.default)).catch(err => console.error("Error cargando MapaAdmin:", err))
  }, [])

  if (!MapComp) return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1fe1a7', fontSize: '13px' }}>
      Cargando mapa...
    </div>
  )

  return <MapComp refugios={refugios} onSelect={onSelect} />
}

// ── Dashboard principal ────────────────────────────────────────────────
function DashboardContent() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('refugios')
  const [vistaRefugios, setVistaRefugios] = useState<'tabla' | 'mapa'>('mapa')
  const [stats, setStats] = useState({ refugios: 0, observaciones: 0 })
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(true)
  const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null)
  const [refugios, setRefugios] = useState<Refugio[]>([])
  const [loadingRefugios, setLoadingRefugios] = useState(true)
  const [errorRefugios, setErrorRefugios] = useState<string | null>(null)
  const [refugioSeleccionado, setRefugioSeleccionado] = useState<Refugio | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [currentUserData, setCurrentUserData] = useState<any>(null)
  const [misObservaciones, setMisObservaciones] = useState<any[]>([])

  useEffect(() => {
    async function fetchMe() {
      if (!user?.id) return;
      const { data } = await supabase.from('usuarios').select('*, roles(nombre)').eq('id', user.id).single();
      if (data) {
        setCurrentUserData(data);
        // By-pass de seguridad para Antonio Capel (asegura acceso a Mapa y Admin)
        setIsAdmin(data.roles?.nombre === 'admin' || user.email === 'antonio.capel@muma.es');
      } else {
        setIsAdmin(user.email === 'antonio.capel@muma.es');
      }
    }
    fetchMe()
  }, [user])

  useEffect(() => {
    async function fetchObs() {
      if (!user?.id || isAdmin) return;
      const { data } = await supabase.from('vista_observaciones_completas').select('*').eq('usuario_id', user.id).order('fecha_observacion', { ascending: false });
      if (data) setMisObservaciones(data);
    }
    fetchObs()
  }, [user, isAdmin])

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        // Usar el cliente Supabase oficial en lugar de fetch manual
        // Esto es más seguro: el cliente maneja la autenticación internamente
        // sin exponer el token en el código
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, nombre, apellidos, correo, telefono, premium, activo, created_at')
          .order('nombre', { ascending: true })

        if (error) throw new Error(error.message)
        setUsuarios(data || [])
      } catch (err: any) {
        setErrorUsuarios(err.message)
      } finally {
        setLoadingUsuarios(false)
      }
    }
    fetchUsuarios()
  }, [])

  useEffect(() => {
    async function fetchRefugios() {
      try {
        const { data, error } = await supabase
          .from('refugios')
          .select('id, codigo, nombre, municipio, provincia, latitud, longitud, tipo_refugio, orientacion, material, soporte, altitud_metros, fecha_instalacion, observaciones, activo')
          .order('codigo', { ascending: true })
        if (error) throw new Error(error.message)
        setRefugios(data || [])
      } catch (err: any) {
        setErrorRefugios(err.message)
      } finally {
        setLoadingRefugios(false)
      }
    }
    fetchRefugios()
  }, [])

  useEffect(() => {
    async function fetchStats() {
      const { count: countRefugios } = await supabase.from('refugios').select('*', { count: 'exact', head: true })
      const { count: countObs } = await supabase.from('observaciones').select('*', { count: 'exact', head: true })
      setStats({ refugios: countRefugios || 0, observaciones: countObs || 0 })
    }
    fetchStats()
  }, [])

  const refugiosFiltrados = refugios.filter(r =>
    busqueda === '' ||
    r.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.municipio?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#ffffff', padding: '40px 20px' }}>
      <div style={{ maxWidth: refugioSeleccionado ? 'calc(100% - 460px)' : '960px', margin: '0 auto', transition: 'max-width 0.3s ease' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(192,132,252,0.3)' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px 0' }}>Panel de Administración</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Bienvenido, {user?.nombre || user?.email}</p>
          </div>
          <button onClick={signOut} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#a1a1aa', fontSize: '13px', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#a1a1aa' }}>
            Cerrar sesión
          </button>
        </div>

        {/* Renderizado Condicional de Gamificación */}
        {!isAdmin ? (
          <>
            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(192,132,252,0.3)', paddingBottom: '16px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1fe1a7', margin: 0 }}>Mi Perfil Científico — Módulo de Gamificación</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <KPICard label="Nivel Actual" value={currentUserData?.nivel_actual?.toString() || '1'} highlight />
              <KPICard label="XP Total" value={currentUserData?.xp_total?.toString() || '0'} />
              <KPICard label="Observaciones" value={currentUserData?.total_observaciones?.toString() || '0'} />
            </div>

            <div style={{ background: '#0a0a0a', border: '1px solid #c084fc', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid rgba(192,132,252,0.15)' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Mis Últimos Avistamientos</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Historial de tus contribuciones al proyecto.</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#121212', borderBottom: '1px solid rgba(192,132,252,0.3)' }}>
                      <th style={{ padding: '12px 24px', color: '#a1a1aa', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Fecha</th>
                      <th style={{ padding: '12px 24px', color: '#a1a1aa', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Especie</th>
                      <th style={{ padding: '12px 24px', color: '#a1a1aa', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Título / Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {misObservaciones.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Aún no tienes observaciones registradas.</td></tr>
                    ) : (
                      misObservaciones.map(o => (
                        <tr key={o.id} style={{ borderBottom: '1px solid rgba(192,132,252,0.15)' }}>
                          <td style={{ padding: '16px 24px', color: '#a1a1aa', fontSize: '14px' }}>{new Date(o.fecha_observacion).toLocaleDateString('es-ES')}</td>
                          <td style={{ padding: '16px 24px', color: '#1fe1a7', fontSize: '14px', fontWeight: 500 }}>{o.nombre_cientifico || 'Murciélago sp.'}</td>
                          <td style={{ padding: '16px 24px', color: '#fff', fontSize: '14px' }}>{o.titulo}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
        {/* Info usuario */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <InfoCard label="Email" value={user?.email || ''} />
          <InfoCard label="Nombre" value={`${user?.nombre || ''} ${user?.apellidos || ''}`.trim() || 'Sin nombre'} />
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <KPICard label="Usuarios" value={usuarios.length.toString()} highlight />
          <KPICard label="Refugios" value={stats.refugios.toString()} />
          <KPICard label="Observaciones" value={stats.observaciones.toString()} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(192,132,252,0.3)', paddingBottom: '16px', marginBottom: '24px' }}>
          {['usuarios', 'refugios'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', background: activeTab === tab ? 'rgba(31, 225, 167, 0.1)' : 'transparent', color: activeTab === tab ? '#1fe1a7' : '#a1a1aa', textTransform: 'capitalize' }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Usuarios */}
        {activeTab === 'usuarios' && (
          <div style={{ background: '#0a0a0a', border: '1px solid #c084fc', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(192,132,252,0.15)' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Usuarios</h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>Usuarios registrados en la plataforma MUMA.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#121212', borderBottom: '1px solid rgba(192,132,252,0.3)' }}>
                    {['Nombre', 'Email', 'Teléfono', 'Premium', 'Registro', 'Estado'].map(h => (
                      <th key={h} style={{ padding: '12px 24px', color: '#a1a1aa', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loadingUsuarios ? <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#1fe1a7' }}>Cargando...</td></tr>
                    : errorUsuarios ? <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#ef4444' }}>{errorUsuarios}</td></tr>
                    : usuarios.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(192,132,252,0.15)' }}>
                        <td style={{ padding: '16px 24px', color: '#fff', fontSize: '14px', fontWeight: 500 }}>{u.nombre} {u.apellidos}</td>
                        <td style={{ padding: '16px 24px', color: '#a1a1aa', fontSize: '14px' }}>{u.correo}</td>
                        <td style={{ padding: '16px 24px', color: '#a1a1aa', fontSize: '14px' }}>{u.telefono || '—'}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: u.premium ? 'rgba(192,132,252,0.15)' : 'rgba(255,255,255,0.05)', color: u.premium ? '#c084fc' : '#6b7280' }}>
                            {u.premium ? 'Premium' : 'Free'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#a1a1aa', fontSize: '14px' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString('es-ES') : '—'}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: u.activo ? 'rgba(31,225,167,0.1)' : 'rgba(239,68,68,0.1)', color: u.activo ? '#1fe1a7' : '#ef4444' }}>
                            {u.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Refugios */}
        {activeTab === 'refugios' && (
          <div style={{ background: '#0a0a0a', border: '1px solid #c084fc', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Cabecera con búsqueda y toggle vista */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(192,132,252,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Control de Refugios</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>{loadingRefugios ? 'Cargando...' : `${refugios.length} refugios en base de datos`}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Buscar código, nombre, municipio..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  style={{ background: '#121212', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '13px', outline: 'none', width: '220px' }}
                />
                <div style={{ display: 'flex', gap: '4px', background: '#121212', borderRadius: '8px', padding: '4px' }}>
                  {(['tabla', 'mapa'] as const).map(v => (
                    <button key={v} onClick={() => setVistaRefugios(v)} style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600, background: vistaRefugios === v ? 'rgba(31,225,167,0.15)' : 'transparent', color: vistaRefugios === v ? '#1fe1a7' : '#6b7280', textTransform: 'capitalize' }}>
                      {v === 'tabla' ? '☰ Tabla' : '🗺 Mapa'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vista Tabla */}
            {vistaRefugios === 'tabla' && (
              loadingRefugios ? <div style={{ padding: '40px', textAlign: 'center', color: '#1fe1a7' }}>Cargando refugios...</div>
              : errorRefugios ? <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{errorRefugios}</div>
              : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#121212', borderBottom: '1px solid rgba(192,132,252,0.3)' }}>
                        {['Código', 'Nombre', 'Municipio', 'Tipo', 'Soporte', 'Instalación', 'Última revisión', 'Estado', ''].map(h => (
                          <th key={h} style={{ padding: '12px 16px', color: '#a1a1aa', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {refugiosFiltrados.map(r => {
                        const ultima = ultimaRevision(r.observaciones)
                        const colorUlt = colorEstado(ultima)
                        return (
                          <tr key={r.id} style={{ borderBottom: '1px solid rgba(192,132,252,0.1)', cursor: 'pointer' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#0f0f0f')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            <td style={{ padding: '12px 16px', color: '#1fe1a7', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>{r.codigo}</td>
                            <td style={{ padding: '12px 16px', color: '#fff', fontSize: '13px', fontWeight: 500 }}>{r.nombre || '—'}</td>
                            <td style={{ padding: '12px 16px', color: '#a1a1aa', fontSize: '13px' }}>{r.municipio || '—'}</td>
                            <td style={{ padding: '12px 16px', color: '#a1a1aa', fontSize: '12px' }}>{r.tipo_refugio || '—'}</td>
                            <td style={{ padding: '12px 16px', color: '#a1a1aa', fontSize: '12px' }}>{r.soporte || '—'}</td>
                            <td style={{ padding: '12px 16px', color: '#a1a1aa', fontSize: '12px', whiteSpace: 'nowrap' }}>
                              {r.fecha_instalacion ? new Date(r.fecha_instalacion).toLocaleDateString('es-ES') : '—'}
                            </td>
                            <td style={{ padding: '12px 16px', color: colorUlt, fontSize: '12px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ultima}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: r.activo ? 'rgba(31,225,167,0.1)' : 'rgba(239,68,68,0.1)', color: r.activo ? '#1fe1a7' : '#ef4444' }}>
                                {r.activo ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <button onClick={() => setRefugioSeleccionado(r)} style={{ background: 'transparent', border: '1px solid rgba(192,132,252,0.3)', color: '#c084fc', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                                Ver
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* Vista Mapa */}
            {vistaRefugios === 'mapa' && (
              <div style={{ height: '560px' }}>
                {loadingRefugios
                  ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1fe1a7' }}>Cargando refugios...</div>
                  : <MapaAdmin refugios={refugios} onSelect={setRefugioSeleccionado} />
                }
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>

      {/* Panel lateral */}
      {refugioSeleccionado && (
        <PanelDetalle refugio={refugioSeleccionado} onClose={() => setRefugioSeleccionado(null)} />
      )}
    </div>
  )
}

// ── Auxiliares ─────────────────────────────────────────────────────────
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#0a0a0a', border: '1px solid #c084fc', borderRadius: '8px', padding: '16px 20px' }}>
      <p style={{ color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>{label}</p>
      <p style={{ color: '#fff', fontSize: '15px', fontWeight: 500, margin: 0 }}>{value}</p>
    </div>
  )
}

function KPICard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ background: highlight ? 'rgba(31,225,167,0.05)' : '#0a0a0a', border: highlight ? '1px solid rgba(31,225,167,0.3)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {highlight && <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: 'radial-gradient(circle, rgba(31,225,167,0.4) 0%, transparent 70%)', transform: 'translate(50%, -50%)' }} />}
      <p style={{ color: highlight ? '#1fe1a7' : '#a1a1aa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: '0 0 8px 0' }}>{label}</p>
      <p style={{ color: '#fff', fontSize: '32px', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>{value}</p>
    </div>
  )
}

// ── Export ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </AuthProvider>
  )
}
