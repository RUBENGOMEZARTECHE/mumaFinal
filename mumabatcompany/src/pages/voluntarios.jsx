// Página — Voluntarios
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Moon, Home, Microscope, Megaphone,
  Radio, Headset, BookOpen, MapPin,
  Heart, ArrowRight, Send,
} from 'lucide-react'

import { useLang } from '../context/LangContext'
import { voluntariosI18n } from '../data/i18n/voluntariosI18n'

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// Iconos fijos asociados a los arrays por posición
const iconosPorQue = [Moon, Home, Microscope, Megaphone]
const iconosActividades = [MapPin, Headset, Radio, BookOpen]

export default function Voluntarios() {
  const { locale } = useLang()
  const t = voluntariosI18n[locale]

  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const asunto = encodeURIComponent(`${t.emailAsunto} — ${form.nombre}`)
    const cuerpo = encodeURIComponent(
      `${t.emailCuerpo}${form.nombre}${t.emailCuerpoEmail}${form.email}\n\n${form.mensaje}`
    )
    window.location.href = `mailto:info@murcielagosmalaga.com?subject=${asunto}&body=${cuerpo}`
  }

  return (
    <>
      <Helmet>
        <html lang={locale} />
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaOgTitle} />
        <meta property="og:description" content={t.metaOgDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mumabatcompany.com/voluntarios" />
        <link rel="canonical" href="https://mumabatcompany.com/voluntarios" />
      </Helmet>

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 overflow-hidden">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Bat-Nigt-Malaga2.webp')" }}
            aria-hidden="true"
          />
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(11,17,23,0.72) 0%, rgba(11,17,23,0.55) 50%, rgba(11,17,23,0.80) 100%)' }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-5"
            >
              {t.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6"
            >
              {t.heroTitlePre}{' '}
              <span className="text-marca-principal">{t.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-texto-secundario max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#formulario"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                <Heart size={15} aria-hidden="true" />
                {t.ctaPrimario}
              </a>
              <a
                href="#actividades"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
              >
                {t.ctaSecundario} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── POR QUÉ SER VOLUNTARIO ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.porQueLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.porQueTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">{t.porQueSubtitle}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.porQueUnirte.map((item, i) => {
                const Icono = iconosPorQue[i]
                return (
                  <motion.article
                    key={i}
                    initial="oculto" whileInView="visible" viewport={{ once: true }}
                    variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                    className="bg-fondo-superficie rounded-2xl card-lila hover:opacity-90 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {item.img && (
                      <div className="aspect-video overflow-hidden">
                        <img src={item.img} alt={item.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col grow">
                      <Icono size={28} className="text-marca-principal mb-4" aria-hidden="true" />
                      <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{item.titulo}</h3>
                      <p className="text-sm text-texto-secundario leading-relaxed grow">{item.descripcion}</p>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── QUÉ HACEN LOS VOLUNTARIOS ── */}
        <section id="actividades" className="bg-fondo-base py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.actividadesLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.actividadesTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">{t.actividadesSubtitle}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.actividades.map((item, i) => {
                const Icono = iconosActividades[i]
                return (
                  <motion.div
                    key={i}
                    initial="oculto" whileInView="visible" viewport={{ once: true }}
                    variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                    className="bg-fondo-superficie rounded-2xl card-lila hover:opacity-90 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {item.img && (
                      <div className="aspect-video overflow-hidden">
                        <img src={item.img} alt={item.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-7 flex gap-5 items-start">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-marca-principal/10 flex items-center justify-center">
                        <Icono size={22} className="text-marca-principal" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-texto-titulo mb-2 leading-snug">{item.titulo}</h3>
                        <p className="text-sm text-texto-secundario leading-relaxed">{item.descripcion}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── REQUISITOS ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.requisitosLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.requisitosTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">{t.requisitosSubtitle}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {t.requisitos.map((req, i) => (
                <motion.div
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.07 } } }}
                  className="flex gap-3 items-start bg-fondo-superficie rounded-xl p-5 border border-white/5"
                >
                  <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-marca-principal/15 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-marca-principal block" aria-hidden="true" />
                  </span>
                  <p className="text-sm text-texto-secundario leading-relaxed">{req}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMULARIO ── */}
        <section id="formulario" className="bg-fondo-base py-20 px-6">
          <div className="max-w-xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.formLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.formTitle}</h2>
              <p className="text-texto-secundario leading-relaxed">{t.formSubtitle}</p>
            </motion.div>

            <motion.form
              initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}
              onSubmit={handleSubmit}
              className="bg-fondo-superficie rounded-2xl p-8 border border-white/5 space-y-5"
              aria-label={t.formAria}
            >
              <div>
                <label htmlFor="nombre" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  {t.labelNombre}
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder={t.placeholderNombre}
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  {t.labelEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.placeholderEmail}
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  {t.labelMensaje}
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t.placeholderMensaje}
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 cursor-pointer"
              >
                <Send size={15} aria-hidden="true" />
                {t.btnEnviar}
              </button>

              <p className="text-xs text-texto-secundario/50 text-center leading-relaxed">
                {t.notaEmail}{' '}
                <span className="text-marca-principal/70">info@murcielagosmalaga.com</span>
              </p>
            </motion.form>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-marca-principal/10 border border-marca-principal/20 mb-8">
                <Heart size={32} className="text-marca-principal" aria-hidden="true" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-texto-titulo mb-5 leading-tight">
                {t.ctaFinalTitlePre}{' '}
                <span className="text-marca-principal">{t.ctaFinalHighlight}</span>
              </h2>
              <p className="text-lg text-texto-secundario leading-relaxed mb-10 max-w-xl mx-auto">
                {t.ctaFinalSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  <Heart size={16} aria-hidden="true" />
                  {t.ctaFinalPrimario}
                </a>
                <a
                  href="mailto:info@murcielagosmalaga.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
                >
                  {t.ctaFinalEmail}
                </a>
              </div>
              <p className="mt-8 text-sm text-texto-secundario/60">
                {t.ctaFinalDonar}{' '}
                <Link to="/donar" className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline">
                  {t.ctaFinalDonarLink}
                </Link>
              </p>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}
