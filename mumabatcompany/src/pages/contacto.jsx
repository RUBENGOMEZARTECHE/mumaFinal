import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useLang } from '../context/LangContext'
import { contactoI18n } from '../data/i18n/contactoI18n'

// Configuración de Supabase (Usa tus variables de entorno .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

// Iconos y datos estáticos de contacto — los títulos/etiquetas vienen del i18n
const metodosIconos = [
  { Icono: Mail,          valor: 'info@murcielagosmalaga.com', href: 'mailto:info@murcielagosmalaga.com' },
  { Icono: Phone,         valor: '+34 664 213 450',            href: 'tel:+34664213450'                  },
  { Icono: MessageCircle, valor: '+34 664 213 450',            href: 'https://wa.me/34664213450'         },
  { Icono: MapPin,        valor: 'Polo Digital de Málaga',     href: null                                },
]

export default function Contacto() {
  const { locale } = useLang()
  const t = contactoI18n[locale] || contactoI18n.es

  const [enviando, setEnviando] = useState(false)
  const [enviadoExito, setEnviadoExito] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    motivo: '',
    momento: '',
    asunto: '',
    mensaje: '',
    privacidad: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  // Lógica de envío a Supabase
  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)

    try {
      const { error } = await supabase
        .from('contactos')
        .insert([
          {
            nombre: form.nombre,
            email: form.email,
            telefono: form.telefono,
            motivo: form.motivo,
            momento: form.momento,
            asunto: form.asunto,
            mensaje: form.mensaje
          }
        ])

      if (error) throw error

      setEnviadoExito(true)
      // Resetear formulario tras 5 segundos
      setTimeout(() => {
        setEnviadoExito(false)
        setForm({ nombre: '', email: '', telefono: '', motivo: '', momento: '', asunto: '', mensaje: '', privacidad: false })
      }, 5000)

    } catch (error) {
      console.error('Error enviando a Supabase:', error.message)
      alert(t.errorMensaje)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contacto — MUMA BAT COMPANY</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-fondo-base text-white">

        {/* Cabecera */}
        <motion.section variants={varianteSeccion} initial="oculto" animate="visible" className="pt-44 pb-12 text-center px-6">
          <span className="inline-block text-marca-principal text-sm font-semibold tracking-widest uppercase mb-4">{t.supertitulo}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">{t.titulo}</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto italic font-light">
            {t.subtitulo}
          </p>
        </motion.section>

        {/* Métodos Rápidos */}
        <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {metodosIconos.map(({ Icono, valor, href }, i) => {
            const metodo = t.metodos[i]
            return (
              <div key={metodo.titulo} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all">
                <Icono className="text-marca-principal mb-4" size={24} />
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{metodo.titulo}</p>
                <p className="text-sm font-bold text-white mb-3">{valor}</p>
                {href && metodo.etiqueta && (
                  <a href={href} className="text-marca-principal text-xs font-bold hover:underline">{metodo.etiqueta} →</a>
                )}
              </div>
            )
          })}
        </section>

        {/* Formulario con Integración */}
        <section className="max-w-4xl mx-auto px-6 pb-32">
          <div className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

            <AnimatePresence>
              {enviadoExito ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 bg-[#0c0c0c] flex flex-col items-center justify-center text-center p-8"
                >
                  <CheckCircle2 size={64} className="text-marca-principal mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-white">{t.exitoTitulo}</h3>
                  <p className="text-gray-400">{t.exitoDescripcion}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <h2 className="text-2xl font-bold mb-10">{t.formularioTitulo}</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t.labelNombre}</label>
                <input name="nombre" required value={form.nombre} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t.labelEmail}</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t.labelTelefono}</label>
                <input name="telefono" required value={form.telefono} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t.labelMotivo}</label>
                <select name="motivo" required value={form.motivo} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none appearance-none transition-all">
                  <option value="">{t.selectPlaceholder}</option>
                  <option value="Consultoría">{t.opcionConsultoria}</option>
                  <option value="Refugios">{t.opcionRefugios}</option>
                  <option value="VR">{t.opcionVR}</option>
                  <option value="BatNight">{t.opcionBatNight}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t.labelMensaje}</label>
                <textarea name="mensaje" rows="5" required value={form.mensaje} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-marca-principal outline-none resize-none transition-all" placeholder={t.placeholderMensaje}></textarea>
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <input type="checkbox" name="privacidad" required checked={form.privacidad} onChange={handleChange} className="accent-marca-principal w-4 h-4" />
                <span className="text-xs text-gray-500 italic">{t.checkboxPrivacidad}</span>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="md:col-span-2 bg-marca-principal text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 disabled:opacity-50"
              >
                {enviando ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {enviando ? t.botonProcesando : t.botonEnviar}
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
