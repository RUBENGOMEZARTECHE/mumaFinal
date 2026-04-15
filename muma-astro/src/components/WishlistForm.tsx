import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  tablaBD: string
  modulo: string
}

export default function WishlistForm({ tablaBD, modulo }: Props) {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState<'idle' | 'cargando' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEstado('cargando')

    const { error } = await supabase.from(tablaBD).insert([{ email, modulo }])

    if (error) {
      console.error('WishlistForm error:', error.message)
      setEstado('error')
    } else {
      setEstado('ok')
    }
  }

  if (estado === 'ok') {
    return (
      <p className="text-xs text-marca-principal font-semibold tracking-wide">
        Apuntado. Te avisamos cuando esté listo.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-1">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-texto-principal placeholder-texto-secundario/40 focus:outline-none focus:border-white/30 transition-colors"
      />
      <button
        type="submit"
        disabled={estado === 'cargando'}
        className="px-4 py-2 bg-marca-principal text-texto-sobre-accion text-xs font-bold rounded-lg hover:bg-marca-principal-hover transition-colors disabled:opacity-50 shrink-0"
      >
        {estado === 'cargando' ? '...' : 'Avisar'}
      </button>
      {estado === 'error' && (
        <p className="text-red-400 text-[10px] absolute mt-10">Error. Inténtalo de nuevo.</p>
      )}
    </form>
  )
}
