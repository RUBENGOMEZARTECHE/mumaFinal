import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL as string,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
  )
}

const varianteSeccion = {
  oculto:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const metodos = [
  { Icono: Mail,          titulo: 'Email',      valor: 'info@murcielagosmalaga.com', href: 'mailto:info@murcielagosmalaga.com',  etiqueta: 'Escríbenos' },
  { Icono: Phone,         titulo: 'Teléfono',   valor: '+34 664 213 450',            href: 'tel:+34664213450',                   etiqueta: 'Llamar'     },
  { Icono: MessageCircle, titulo: 'WhatsApp',   valor: '+34 664 213 450',            href: 'https://wa.me/34664213450',          etiqueta: 'Abrir chat' },
  { Icono: MapPin,        titulo: 'Ubicación',  valor: 'Polo Digital de Málaga',     href: null,                                 etiqueta: null         },
]

export default function ContactoPage() {
  const [enviando,      setEnviando]      = useState(false)
  const [enviadoExito,  setEnviadoExito]  = useState(false)
  const [form,          setForm]          = useState({
    nombre: '', email: '', telefono: '', motivo: '', momento: '', asunto: '', mensaje: '', privacidad: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const payload = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        motivo: form.motivo,
        mensaje: form.mensaje,
      }

      // 1. Enviar a Make.com (siempre, funciona sin Supabase)
      await fetch('https://hook.eu1.make.com/aetayt9749mswvwcurq4kj4e3gndsqnl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      // 2. Guardar en Supabase
      try {
        const { supabase } = await import('../lib/supabase')
        const { error: errorSupabase } = await supabase.from('consultas_web').insert([{
          nombre: form.nombre,
          nombre_contacto: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          tipo_solicitud: form.motivo || null,
          acepta_rgpd: form.privacidad,
          estado: 'nuevo',
          origen: 'web_contacto',
        }])
        if (errorSupabase) console.error('Error Supabase:', errorSupabase.message)
        else console.log('Guardado en Supabase correctamente.')
      } catch (e: any) {
        console.error('Error inesperado de Supabase:', e)
      }

      setEnviadoExito(true)
      setTimeout(() => {
        setEnviadoExito(false)
        setForm({ nombre: '', email: '', telefono: '', motivo: '', momento: '', asunto: '', mensaje: '', privacidad: false })
      }, 5000)
    } catch (err: any) {
      console.error('Error:', err.message)
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-fondo-base text-white">
      {/* Cabecera */}
      <motion.section variants={varianteSeccion} initial="oculto" animate="visible" className="pt-44 pb-12 text-center px-6">
        <span className="inline-block text-marca-principal text-sm font-semibold tracking-widest uppercase mb-4">Contacto</span>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">Hablemos</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto italic font-light">
          Especialistas en bioacústica y soluciones de biodiversidad.
        </p>
      </motion.section>

      {/* Métodos Rápidos */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {metodos.map(({ Icono, titulo, valor, href, etiqueta }) => (
          <div key={titulo} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all">
            <Icono className="text-marca-principal mb-4" size={24} />
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{titulo}</p>
            <p className="text-sm font-bold text-white mb-3">{valor}</p>
            {href && <a href={href} className="text-marca-principal text-xs font-bold hover:underline">{etiqueta} →</a>}
          </div>
        ))}
      </section>

      {/* Formulario */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence>
            {enviadoExito && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 bg-[#0c0c0c] flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 size={64} className="text-marca-principal mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-white">¡Mensaje Recibido!</h3>
                <p className="text-gray-400">Hemos guardado tu solicitud en nuestra base de datos técnica. Dirección Técnica contactará contigo en menos de 24h.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-2xl font-bold mb-10">Envío de Solicitud Técnica</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Nombre Completo</label>
              <input name="nombre" required value={form.nombre} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Corporativo</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Teléfono</label>
              <input name="telefono" required value={form.telefono} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Motivo</label>
              <select name="motivo" required value={form.motivo} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none appearance-none transition-all">
                <option value="">Seleccione motivo</option>
                <option value="charlas_educativas">Consultoría / Charlas Educativas</option>
                <option value="refugios_b2b">Adquisición de Refugios</option>
                <option value="experiencia_vr">Experiencia VR</option>
                <option value="duda_general">Organizar Bat Night / Duda General</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Mensaje</label>
              <textarea name="mensaje" rows={5} required value={form.mensaje} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none resize-none transition-all" placeholder="Describa su proyecto o duda técnica..."></textarea>
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" name="privacidad" required checked={form.privacidad as boolean} onChange={handleChange} className="accent-marca-principal w-4 h-4" />
              <span className="text-xs text-gray-500 italic">Acepto el tratamiento de datos para fines de consultoría ambiental.</span>
            </div>
            <button
              type="submit"
              disabled={enviando}
              className="md:col-span-2 bg-marca-principal text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 disabled:opacity-50"
            >
              {enviando ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              {enviando ? 'PROCESANDO...' : 'ENVIAR A DIRECCIÓN TÉCNICA'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
