import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// -------------------------------------------------------------------
// TIPOS
// -------------------------------------------------------------------
// Definimos la forma exacta de los datos que guardamos del usuario.
// Esto viene de la Edge Function (que a su vez viene de la tabla
// "usuarios" + "roles" de Supabase — la misma BD que usan los de DAM).

interface UserData {
  id: string
  email: string
  nombre: string
  apellidos: string
  rol_id: string | null  // UUID del rol en la tabla "roles"
}

interface AuthContextType {
  user: UserData | null  // null = no logueado
  loading: boolean       // true mientras verificamos el token al cargar
  signOut: () => void    // función para cerrar sesión
}

// -------------------------------------------------------------------
// CONTEXTO
// -------------------------------------------------------------------
// createContext crea el "contenedor global". Por defecto es undefined
// porque no tiene sentido usarlo fuera de un AuthProvider.

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// -------------------------------------------------------------------
// PROVIDER
// -------------------------------------------------------------------
// El Provider es el componente que ENVUELVE a otros y les da acceso
// al contexto. Es como un "padre" que comparte información.
//
// Patrón idéntico a LangContext.tsx (que ya tienes en tu proyecto).

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const buildUserFromSession = async (sessionUser: { id: string; email?: string | null }) => {
    const { data: usuarioData } = await supabase
      .from('usuarios')
      .select('id, nombre, apellidos, correo, rol_id')
      .eq('id', sessionUser.id)
      .maybeSingle()

    return {
      id: sessionUser.id,
      email: usuarioData?.correo ?? sessionUser.email ?? '',
      nombre: usuarioData?.nombre ?? '',
      apellidos: usuarioData?.apellidos ?? '',
      rol_id: usuarioData?.rol_id ?? null,
    }
  }

  // useEffect se ejecuta UNA VEZ al cargar el componente.
  // Verificamos la sesión usando supabase.auth.getSession(), que valida
  // la firma del JWT y la expiración. Esto es más seguro que decodificar
  // el JWT manualmente, ya que Supabase verifica la firma criptográfica.
  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (session && !error) {
          // Sesión válida: construimos el perfil desde Supabase/Auth, no desde localStorage.
          setUser(await buildUserFromSession(session.user))
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Función para cerrar sesión
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.replace('/login')
  }

  // Renderiza el Provider envolviendo a los children
  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// -------------------------------------------------------------------
// HOOK PERSONALIZADO
// -------------------------------------------------------------------
// useAuth() es un atajo para acceder al contexto desde cualquier
// componente. En vez de escribir useContext(AuthContext) cada vez,
// escribes useAuth() — más limpio y con protección de errores.
//
// Uso:
//   const { user, loading, signOut } = useAuth()

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
