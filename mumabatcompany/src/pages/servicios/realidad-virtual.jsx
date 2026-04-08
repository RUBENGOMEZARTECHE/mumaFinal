// Página — Realidad Virtual (ecosistema de 5 módulos)
//
// Estructura final según acuerdo de equipo:
//   1. Cabecera general "Realidad Virtual" (dentro-cueva.webp)
//   2. Bloque protagonista: MuMa VR² Cave Experience
//      — grid texto / stack de imágenes
//      — 4 pilares del servicio
//   3. Separador visual + grid 4 módulos complementarios (2×2)
//   4. Franja de logos de alianzas
//   5. CTA de conversión + formulario integrado

import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import Footer from '../../components/footer'
import { useLang } from '../../context/LangContext'
import { realidadVirtualI18n } from '../../data/i18n/realidadVirtualI18n'

/* ═══════════════════════════════════════════════════════════════════════════
   DATOS NO TRADUCIBLES (imágenes, URLs, acentos visuales)
   ═══════════════════════════════════════════════════════════════════════════ */

const PILARES_IMGS = [
  { img: '/images/dentro-cueva.webp' },
  { img: '/images/fotos_batnight/plaza1.webp' },
  { img: '/images/antonio-moret.webp', posicion: '50% 20%' },
  { img: '/images/Proyecto_palazaMayor.webp' },
]

const MODULOS_META = [
  { acento: 'rgba(139,156,244,0.08)', proximamente: true },
  { acento: 'rgba(139,156,244,0.06)', proximamente: true },
  { acento: 'rgba(139,156,244,0.08)', proximamente: true },
  {
    acento: 'rgba(139,156,244,0.06)',
    proximamente: false,
    imagen: '/images/museo-virtual.png',
    href: 'https://www.spatial.io/s/Museo-Virtual-de-Murcielagos-Malaga-6543c01bc7242548905698ae?share=1702051378273231834',
  },
]

const EVENTOS_IMGS = [
  { img: '/images/rv/rv-plaza-mayor_3_11zon.webp' },
  { img: '/images/Bat-Nigt-Malaga-1.webp' },
  { img: '/images/grutas-da-moeda.webp' },
  { img: '/images/-notranjski-muzej-.webp' },
]

const CLIENTES_IMGS = [
  { img: '/images/museos.webp' },
  { img: '/images/ayuntamientos.webp' },
  { img: '/images/campo-golf.jpg' },
  { img: '/images/cuevas-nerja.webp' },
  { img: '/images/educacion-ambiental.webp' },
  { img: '/images/monitorizacion-refugios-voluntarios.webp' },
]

const ALIANZAS = [
  { nombre: 'Junta de Andalucía',          logo: '/images/junta-andalucia.webp' },
  { nombre: 'Fundación Cueva de Nerja',     logo: '/images/cueva de nerja.webp' },
  { nombre: 'Málaga TechPark',              logo: '/images/malaga-tech-park.webp' },
  { nombre: 'BIC Euronova',                 logo: '/images/centro-europeo-empresas.webp' },
  { nombre: 'Fundación Bioparc',            logo: '/images/fundacion biopark.webp' },
  { nombre: 'Polo de Contenidos Digitales', logo: '/images/polo-contenido-digital.webp' },
  { nombre: 'Plaza Mayor',                  logo: '/images/plaza-mayor.webp' },
  { nombre: 'Red de Emprendedores',         logo: '/images/red-emprendedores.webp' },
]

const FINANCIACION_LOGOS = [
  { src: '/images/europa.webp',                  alt: 'Unión Europea — Fondo Europeo de Desarrollo Regional' },
  { src: '/images/polo-contenido-digital.webp',  alt: 'Polo de Contenidos Digitales de Málaga' },
  { src: '/images/Camara-malaga-150x150.webp',   alt: 'Cámara de Comercio de Málaga' },
  { src: '/images/centro-europeo-empresas.webp', alt: 'Centro Europeo de Empresas e Innovación' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTES DE ANIMACIÓN
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  oculto:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const fadeIn = {
  oculto:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTES
   ═══════════════════════════════════════════════════════════════════════════ */

// Campo de formulario reutilizable
function Campo({ id, name, label, type = 'text', placeholder, required = false, autoComplete }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200"
      />
    </div>
  )
}

// Card de módulo secundario
function CardModulo({ titulo, descripcion, acento, proximamente, imagen, href, index, labelProximamente, labelEntrar }) {
  return (
    <motion.article
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        oculto:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08 } },
      }}
      className="relative rounded-2xl p-6 border border-acento-tecnologico-borde hover:border-acento-tecnologico/40 transition-colors duration-300 flex flex-col overflow-hidden"
      style={{ background: `linear-gradient(135deg, #16212d 0%, #16212d 55%, ${acento} 100%)` }}
    >
      {/* Imagen de fondo opcional */}
      {imagen && (
        <>
          <img src={imagen} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-linear-to-t from-fondo-superficie/95 via-fondo-superficie/30 to-transparent" aria-hidden="true" />
        </>
      )}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="text-base font-bold text-texto-titulo leading-tight">{titulo}</h3>
          {proximamente && (
            <span className="text-[9px] font-bold tracking-widest text-acento-tecnologico/80 uppercase bg-acento-tecnologico-suave border border-acento-tecnologico-borde px-2.5 py-1 rounded-lg shrink-0">
              {labelProximamente}
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-texto-secundario leading-relaxed flex-1">
          {descripcion}
        </p>

        {/* Botón enlace opcional */}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-acento-tecnologico text-acento-tecnologico hover:bg-acento-tecnologico hover:text-white transition-all duration-200 no-underline w-full"
          >
            {labelEntrar} <ArrowRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RealidadVirtual() {
  const [enviado, setEnviado] = useState(false)
  const { locale } = useLang()
  const t = realidadVirtualI18n[locale] || realidadVirtualI18n.es

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const nombre        = data.get('nombre') || ''
    const email         = data.get('email') || ''
    const organizacion  = data.get('organizacion') || ''
    const tipoEspacio   = data.get('tipo_espacio') || ''
    const participantes = data.get('participantes') || ''
    const fecha         = data.get('fecha') || ''

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Organización: ${organizacion}`,
      `Tipo de espacio: ${tipoEspacio}`,
      `Participantes estimados: ${participantes}`,
      `Fecha tentativa: ${fecha}`,
    ].join('\n')

    const subject = encodeURIComponent(`[Web VR] Solicitud demostración — ${nombre}`)
    const body    = encodeURIComponent(cuerpo)

    window.location.href = `mailto:info@murcielagosmalaga.com?subject=${subject}&body=${body}`
    setEnviado(true)
    form.reset()
  }

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.pageDesc} />
        <meta property="og:title" content={t.ogTitle} />
        <meta property="og:description" content={t.ogDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murcielagosmalaga.com/servicios/realidad-virtual" />
        <meta property="og:image" content="https://murcielagosmalaga.com/images/Image_VRglases.webp" />
        <link rel="canonical" href="https://murcielagosmalaga.com/servicios/realidad-virtual" />
      </Helmet>

      <main>

        {/* ══════════════════════════════════════════════════════════════════
            1. CABECERA GENERAL — Realidad Virtual
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center text-center overflow-hidden bg-[#050505]"
          style={{ minHeight: '88vh' }}
          aria-label="Cabecera Realidad Virtual"
        >
          {/* Dot grid sutil */}
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#a855f7_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" aria-hidden="true" />
          {/* Halo lila central */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(168,85,247,0.18) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Halo verde inferior izq */}
          <div
            className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 py-32 lg:py-40">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-5"
            >
              {t.cabeceraPill}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-bold leading-[1.08] tracking-tight text-texto-titulo mb-6"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
            >
              {t.cabeceraH1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg text-texto-secundario leading-relaxed max-w-xl mx-auto mb-10"
            >
              {t.cabeceraP}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                {t.cabeceraBtn1} <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/20 text-texto-principal hover:bg-white/5 hover:border-white/30 transition-all duration-200 no-underline"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t.cabeceraBtn2}
              </a>
            </motion.div>
          </div>

          {/* Degradado inferior de fusión */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #0b1117 100%)' }}
            aria-hidden="true"
          />
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            2. BLOQUE PROTAGONISTA — MuMa VR² Cave Experience
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-fondo-base"
          aria-labelledby="cave-experience-titulo"
        >
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">

            {/* Encabezado de sección sobre el grid */}
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <p className="text-[10px] font-bold tracking-[0.22em] text-marca-principal uppercase mb-3">
                {t.protagonistaPill}
              </p>
              <h2
                id="cave-experience-titulo"
                className="font-bold leading-[1.1] tracking-tight text-texto-titulo"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
              >
                {t.protagonistaH2}
              </h2>
            </motion.div>

            {/* Grid principal: texto ↔ stack de imágenes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

              {/* ── Texto ── */}
              <motion.div
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
              >
                <p
                  className="font-bold leading-[1.12] tracking-tight text-texto-titulo mb-6"
                  style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.15rem)' }}
                >
                  {t.protagonistaSubh.split('cueva de murciélagos').length > 1 ? (
                    <>
                      Lleva una{' '}
                      <span className="text-marca-principal">cueva de murciélagos</span>
                      {' '}a tu espacio.
                    </>
                  ) : (
                    t.protagonistaSubh
                  )}
                </p>
                <p className="text-texto-secundario leading-relaxed mb-4">
                  {t.protagonistaP1}
                </p>
                <p className="text-texto-secundario leading-relaxed mb-8">
                  {t.protagonistaP2}
                </p>

                {/* Citas de posicionamiento */}
                <blockquote className="border-l-2 border-marca-principal pl-5 mb-8">
                  <p className="text-texto-principal italic leading-relaxed text-sm">
                    {t.protagonistaQuote}
                  </p>
                  <cite className="text-xs text-texto-secundario/60 not-italic mt-1 block">
                    {t.protagonistaCite}
                  </cite>
                </blockquote>

                {/* Avales — logos de respaldo */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-texto-secundario/50 uppercase mb-3">{t.protagonistaAvalesLabel}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center">
                      <img src="/images/Logo_SECEMU.webp" alt="SECEMU" className="h-7 w-auto object-contain" />
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center">
                      <img src="/images/EUROBATS_logo.webp" alt="EUROBATS" className="h-7 w-auto object-contain" />
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center">
                      <img src="/images/europa.webp" alt="Unión Europea FEDER" className="h-7 w-auto object-contain" />
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#demo"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                  >
                    {t.protagonistaBtn1}
                  </a>
                  <a
                    href="mailto:info@murcielagosmalaga.com"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/20 text-texto-principal hover:bg-white/8 hover:border-white/35 transition-all duration-200 no-underline"
                  >
                    {t.protagonistaBtn2} <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              {/* ── Stack de imágenes ── */}
              <div className="flex flex-col gap-3 lg:gap-4">
                {/* Imagen principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl overflow-hidden aspect-4/3 bg-fondo-superficie border border-white/5"
                >
                  <img
                    src="/images/chica-realidad-virtual.webp"
                    alt={t.protagonistaImg1Alt}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 25%', filter: 'brightness(1.05) contrast(1.08) saturate(1.1)' }}
                    loading="eager"
                  />
                </motion.div>

                {/* Imagen secundaria de apoyo */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.14 }}
                  className="relative rounded-xl overflow-hidden aspect-4/3 bg-fondo-superficie border border-white/5"
                >
                  <img
                    src="/images/niña-feliz-realidad-virtual.webp"
                    alt={t.protagonistaImg2Alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{ objectPosition: '50% 20%', filter: 'brightness(1.15) contrast(1.05) saturate(1.15)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(11,17,23,0.15) 0%, transparent 60%)' }}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>

            {/* ── 4 pilares del servicio — fila compacta ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {t.pilares.map(({ titulo, desc }, i) => (
                <motion.div
                  key={titulo}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    oculto:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                  }}
                  className="relative rounded-xl overflow-hidden border border-white/5 flex flex-col"
                >
                  {/* Imagen superior */}
                  <div className="relative h-40 shrink-0">
                    <img
                      src={PILARES_IMGS[i].img}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: PILARES_IMGS[i].posicion || 'center' }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-fondo-superficie/70 via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  {/* Texto inferior */}
                  <div className="p-4 bg-fondo-superficie flex-1">
                    <p className="text-sm font-bold text-texto-titulo mb-1">{titulo}</p>
                    <p className="text-xs text-texto-secundario leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Ficha técnica ── */}
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="mt-12"
            >
              <p className="text-[10px] font-bold tracking-[0.22em] text-marca-principal uppercase mb-6">
                {t.fichaTecnicaLabel}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {t.specs.map(({ label, valor }) => (
                  <div key={label} className="bg-fondo-superficie border border-white/5 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-texto-secundario/50 uppercase mb-1">{label}</p>
                    <p className="text-sm font-semibold text-texto-titulo">{valor}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Franja de financiación europea */}
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
              className="mt-16 rounded-2xl bg-white/5 border border-white/10 px-8 py-10"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-marca-principal uppercase mb-8 text-center">
                {t.financiacionLabel}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {FINANCIACION_LOGOS.map((logo, i) => (
                  <div key={i} className="bg-white rounded-xl px-5 py-3 flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-12 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-texto-secundario/50 mt-8 max-w-xl mx-auto leading-relaxed">
                {t.financiacionP}
              </p>
            </motion.div>

          </div>

          {/* Separador visual hacia el ecosistema — lila como transición al mundo VR digital */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent 0%, rgba(192,132,252,0.3) 30%, rgba(192,132,252,0.3) 70%, transparent 100%)' }}
            aria-hidden="true"
          />
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            2b. A QUIÉN VA DIRIGIDO
            ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-fondo-secundario py-20 px-6 border-t border-white/5" aria-labelledby="clientes-titulo">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-4">
                {t.clientesPill}
              </p>
              <h2
                id="clientes-titulo"
                className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug"
              >
                {t.clientesH2}
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
                {t.clientesP}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.clientes.map(({ tipo, desc }, i) => (
                <motion.div
                  key={tipo}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    oculto:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                  }}
                  className="bg-fondo-superficie rounded-2xl overflow-hidden border border-white/5 hover:border-marca-principal/20 transition-colors duration-300"
                >
                  {/* Imagen superior */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={CLIENTES_IMGS[i].img}
                      alt={tipo}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-fondo-superficie/80 to-transparent" />
                  </div>
                  {/* Contenido */}
                  <div className="p-5">
                    <p className="text-sm font-bold text-texto-titulo mb-2">{tipo}</p>
                    <p className="text-xs text-texto-secundario leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mt-10"
            >
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                {t.clientesBtn} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            3. ECOSISTEMA — Grid de 4 módulos complementarios (2×2)
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative py-20 px-6 overflow-hidden"
          aria-labelledby="ecosistema-titulo"
        >
          {/* Fondo diferenciado */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #101923 0%, #0f1d28 40%, #101923 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 35% at 50% 20%, rgba(192,132,252,0.07) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto">

            {/* Cabecera de sección */}
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-4">
                {t.ecosistemaPill}
              </p>
              <h2
                id="ecosistema-titulo"
                className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-5 leading-snug"
              >
                {t.ecosistemaH2a}{' '}
                <span className="text-texto-titulo">{t.ecosistemaH2b}</span>
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
                {t.ecosistemaP}
              </p>
            </motion.div>

            {/* Grid 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.modulos.map((modulo, i) => (
                <CardModulo
                  key={modulo.titulo}
                  titulo={modulo.titulo}
                  descripcion={modulo.descripcion}
                  acento={MODULOS_META[i].acento}
                  proximamente={MODULOS_META[i].proximamente}
                  imagen={MODULOS_META[i].imagen}
                  href={MODULOS_META[i].href}
                  index={i}
                  labelProximamente={t.moduloProximamente}
                  labelEntrar={t.moduloEntrar}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            3b. EVENTOS REALIZADOS
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="bg-fondo-base py-20 px-6 border-t border-white/5"
          aria-labelledby="eventos-titulo"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="mb-12"
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-3">
                {t.eventosPill}
              </p>
              <h2
                id="eventos-titulo"
                className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug"
              >
                {t.eventosH2}
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-xl">
                {t.eventosP}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.eventos.map(({ lugar, pais, fecha, asistentes, destacado }, i) => (
                <motion.div
                  key={lugar}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    oculto:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                  }}
                  className="relative rounded-2xl overflow-hidden border border-white/5 min-h-50 flex flex-col justify-end"
                >
                  {/* Imagen de fondo */}
                  <img
                    src={EVENTOS_IMGS[i].img}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay muy sutil — solo para legibilidad */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(11,17,23,0.82) 0%, rgba(11,17,23,0.35) 60%, rgba(11,17,23,0.15) 100%)' }}
                    aria-hidden="true"
                  />
                  {/* Contenido */}
                  <div className="relative z-10 p-6">
                    <div className="flex items-end justify-between gap-3 mb-3">
                      <div>
                        <p className="font-bold text-white text-base">{lugar}</p>
                        <p className="text-xs text-white/60">{pais} · {fecha}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl font-bold text-marca-principal">{asistentes}</p>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{t.eventosAsistentes}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/75 leading-relaxed border-t border-white/10 pt-3">{destacado}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            4. FRANJA DE LOGOS DE ALIANZAS — carrusel horizontal infinito
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="bg-fondo-base py-16 border-t border-white/5 overflow-hidden"
          aria-label="Alianzas y avaladores de MUMA"
        >
          {/* Keyframe inyectado en el JSX — sin dependencia de archivo CSS externo */}
          <style>{`
            @keyframes scroll-logos {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          {/* Título de sección */}
          <motion.p
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-[10px] font-bold tracking-[0.2em] text-texto-secundario/60 uppercase text-center mb-12 px-6"
          >
            {t.alianzasLabel}
          </motion.p>

          {/* Contenedor exterior: máscara lateral + interacción ratón */}
          <div
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              cursor: 'grab',
            }}
            onMouseEnter={(e) => {
              const track = e.currentTarget.querySelector('[data-carousel-track]')
              if (track) track.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              const track = e.currentTarget.querySelector('[data-carousel-track]')
              if (track) {
                setTimeout(() => {
                  if (track) track.style.animationPlayState = 'running'
                }, 1500)
              }
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.cursor = 'grabbing'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.cursor = 'grab'
            }}
          >
            {/* Track animado: contiene los logos × 2 para el loop sin salto */}
            <div
              data-carousel-track
              style={{
                display: 'flex',
                alignItems: 'center',
                width: 'max-content',
                animation: 'scroll-logos 45s linear infinite',
                paddingTop: '1.5rem',
                paddingBottom: '1.5rem',
              }}
            >
              {[...ALIANZAS, ...ALIANZAS].map((alianza, i) => (
                <img
                  key={`${alianza.nombre}-${i}`}
                  src={alianza.logo}
                  alt={alianza.nombre}
                  title={alianza.nombre}
                  className="h-16 w-auto max-w-40 object-contain mx-14 opacity-80 hover:opacity-100 transition-opacity duration-200"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            5. CTA DE CONVERSIÓN + FORMULARIO
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="demo"
          className="relative py-24 px-6 overflow-hidden"
          aria-labelledby="cta-titulo"
        >
          {/* Fondo */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #1b2836 0%, #101923 50%, #0b1117 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(31,225,167,0.04) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">

            {/* Cabecera del CTA */}
            <motion.div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="text-[10px] font-bold tracking-[0.22em] text-marca-principal uppercase mb-4">
                {t.ctaPill}
              </p>
              <h2
                id="cta-titulo"
                className="font-bold leading-tight tracking-tight text-texto-titulo mb-4"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {t.ctaH2}
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-md mx-auto mb-8">
                {t.ctaP}
              </p>
              {/* Garantías breves */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs text-texto-secundario/70">
                {t.ctaGarantias.map((item) => (
                  <span key={item} className="flex items-center justify-center gap-1.5">
                    <CheckCircle size={12} className="text-marca-principal shrink-0" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Formulario */}
            {enviado ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-fondo-superficie rounded-2xl p-10 border border-marca-principal/20 text-center"
              >
                <CheckCircle size={40} className="text-marca-principal mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-texto-titulo mb-2">{t.formSuccessH3}</h3>
                <p className="text-texto-secundario text-sm leading-relaxed">
                  {t.formSuccessP}
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{
                  oculto:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
                }}
                onSubmit={handleSubmit}
                className="bg-fondo-superficie rounded-2xl p-8 border border-white/5 space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Campo
                    id="nombre" name="nombre" label={t.formNombre}
                    placeholder={t.formNombrePlaceholder} required autoComplete="name"
                  />
                  <Campo
                    id="email" name="email" type="email" label={t.formEmail}
                    placeholder={t.formEmailPlaceholder} required autoComplete="email"
                  />
                </div>
                <Campo
                  id="organizacion" name="organizacion" label={t.formOrg}
                  placeholder={t.formOrgPlaceholder} required
                />

                {/* Select — tipo de espacio */}
                <div>
                  <label
                    htmlFor="tipo-espacio"
                    className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5"
                  >
                    {t.formTipoEspacio}
                  </label>
                  <select
                    id="tipo-espacio" name="tipo_espacio" required
                    defaultValue=""
                    className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-marca-principal/50 transition-colors duration-200 appearance-none"
                  >
                    <option value="" disabled>{t.formTipoPlaceholder}</option>
                    {t.formTipoOpciones.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Campo
                    id="participantes" name="participantes" label={t.formParticipantes}
                    placeholder={t.formParticipantesPlaceholder}
                  />
                  <Campo
                    id="fecha" name="fecha" label={t.formFecha}
                    placeholder={t.formFechaPlaceholder}
                  />
                </div>

                <input
                  type="hidden" name="_subject"
                  value="Solicitud demostración VR — MuMa VR² Cave Experience"
                />

                <div className="flex items-center gap-3">
                  <input type="checkbox" name="privacidad" required className="accent-marca-principal w-4 h-4 shrink-0" />
                  <span className="text-xs text-texto-secundario/60 italic">{t.formPrivacidad}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-marca-principal text-texto-sobre-accion font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-marca-principal-hover transition-all active:scale-95"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                  {t.formSubmit}
                </button>

                <p className="text-xs text-center text-texto-secundario/50">
                  {t.formContactoOr}{' '}
                  <a
                    href="mailto:info@murcielagosmalaga.com"
                    className="text-marca-principal hover:opacity-80 transition-opacity no-underline"
                  >
                    info@murcielagosmalaga.com
                  </a>
                  {' '}{t.formContactoPor}{' '}
                  <a
                    href="https://wa.me/34664213450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-marca-principal hover:opacity-80 transition-opacity no-underline"
                  >
                    {t.formContactoWhatsApp}
                  </a>
                </p>
              </motion.form>
            )}

            {/* Link de salida */}
            <motion.p
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="text-center text-sm text-texto-secundario/60 mt-8"
            >
              {t.ctaSalidaP}{' '}
              <Link
                to="/#servicios"
                className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline"
              >
                {t.ctaSalidaLink}
              </Link>
            </motion.p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
