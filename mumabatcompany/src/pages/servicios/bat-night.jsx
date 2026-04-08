// Página de servicio — Bat Nights
import Footer from '../../components/footer'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { useLang } from '../../context/LangContext'
import { batNightI18n } from '../../data/i18n/batNightI18n'

const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Bat Nights — Experiencias nocturnas de conservación",
  "provider": {
    "@type": "Organization",
    "name": "MUMA BAT COMPANY",
    "url": "https://mumabatcompany.com"
  },
  "description": "Actividades nocturnas guiadas con detección de ultrasonidos, realidad virtual y educación ambiental sobre murciélagos. Para ayuntamientos, museos, reservas naturales y espacios culturales.",
  "areaServed": "ES",
  "serviceType": "Bat Night"
})

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export default function BatNight() {
  const { locale } = useLang()
  const t = batNightI18n[locale]

  return (
    <>
      <Helmet>
        <html lang={locale} />
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaOgTitle} />
        <meta property="og:description" content={t.metaOgDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mumabatcompany.com/servicios/bat-night" />
        <link rel="canonical" href="https://mumabatcompany.com/servicios/bat-night" />
        <script type="application/ld+json">{schemaOrg}</script>
      </Helmet>

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 bg-fondo-base overflow-hidden">
          {/* Fondo radial doble para profundidad */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.09) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.05) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Etiqueta superior */}
            <div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-marca-principal/30 bg-marca-principal/5 mb-7"
            >
              <span className="text-xs font-semibold tracking-widest text-marca-principal uppercase">
                {t.eyebrow}
              </span>
            </div>

            {/* Título principal */}
            <h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-texto-titulo mb-5"
            >
              {t.heroTitle1}<br />
              <span className="text-marca-principal">{t.heroTitle2}</span>
            </h1>

            {/* Frase clave */}
            <p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-semibold tracking-wide text-marca-principal/70 uppercase mb-5"
            >
              {t.heroSlogan}
            </p>

            {/* Subtítulo */}
            <p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-texto-secundario max-w-2xl mx-auto leading-relaxed mb-12"
            >
              {t.heroSubtitle}
            </p>

            {/* Stats */}
            <div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 mb-12"
            >
              {t.stats.map(({ valor, etiqueta }, i) => (
                <div key={i} className="bg-fondo-base px-5 py-6 flex flex-col items-center gap-2">
                  <span className="text-3xl font-bold text-texto-titulo leading-none">{valor}</span>
                  <span className="text-xs text-texto-secundario/70 leading-snug text-center whitespace-pre-line">{etiqueta}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                {t.ctaOrganizar}
              </a>
              <a
                href="#bat-nights-realizadas"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
              >
                {t.ctaVerEdiciones} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ── BAT NIGHTS REALIZADAS ── */}
        <section id="bat-nights-realizadas" className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.realizadasLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.realizadasTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">{t.realizadasSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.casosBatNight.map((caso, i) => (
                <article
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                  className="bg-fondo-superficie rounded-2xl p-7 border border-white/5 hover:border-marca-principal/25 transition-colors duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold text-marca-principal/70 text-right leading-snug">{caso.participantes}</span>
                  </div>
                  <h3 className="text-base font-bold text-texto-titulo mb-1 leading-snug">{caso.titulo}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    <p className="text-xs text-marca-principal/70 flex items-center gap-1">
                    </p>
                    <p className="text-xs text-texto-secundario/60 flex items-center gap-1">
                    </p>
                  </div>
                  <p className="text-sm text-texto-secundario leading-relaxed mb-5 flex-grow">{caso.descripcion}</p>
                  <ul className="space-y-1.5 mb-5">
                    {caso.destacados.map((punto, j) => (
                      <li key={j} className="flex gap-2 items-start text-xs text-texto-secundario/80">
                        {punto}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={caso.slug}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-marca-principal hover:opacity-75 transition-opacity duration-200 no-underline mt-auto"
                  >
                    {t.verDetalle} <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TURISMO SOSTENIBLE Y CONSERVACIÓN ── */}
        <section className="bg-fondo-base py-24 px-6">
          <div className="max-w-4xl mx-auto">

            {/* Cabecera */}
            <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.turismoLabel}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-texto-titulo leading-tight mb-5">
                {t.turismoTitle1}<br />
                <span className="text-marca-principal">{t.turismoTitle2}</span>
              </h2>
            </div>

            {/* Bloques alternados texto + imagen */}
            <div className="space-y-16 mb-16">

              {/* Fila 1 */}
              <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                  {t.turismoP1}
                </p>
                <img src="/images/1batnights.webp" alt={t.turismoAlt1} className="w-full h-72 object-cover rounded-2xl" />
              </div>

              {/* Fila 2 */}
              <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img src="/images/murcielago.webp" alt={t.turismoAlt2} className="w-full h-72 object-cover rounded-2xl order-last md:order-first" />
                <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                  {t.turismoP2}
                </p>
              </div>

              {/* Fila 3 */}
              <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                  {t.turismoP3}
                </p>
                <img src="/images/Image_VRglases.webp" alt={t.turismoAlt3} className="w-full h-72 object-cover rounded-2xl" />
              </div>

              {/* Fila 4 */}
              <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img src="/images/bat-night-eslovenia.webp" alt={t.turismoAlt4} className="w-full h-72 object-cover rounded-2xl" />
                <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                  {t.turismoP4}
                </p>
              </div>

            </div>

            {/* 3 bloques temáticos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {t.bloquesTurismo.map(({ titulo, texto }, i) => (
                <div
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                  className="bg-fondo-superficie rounded-2xl p-7 border border-white/5 hover:border-marca-principal/25 transition-colors duration-300"
                >
                  <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{titulo}</h3>
                  <p className="text-sm text-texto-secundario leading-relaxed">{texto}</p>
                </div>
              ))}
            </div>

            {/* Cita destacada */}
            <blockquote
              initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}
              className="relative rounded-2xl card-lila bg-fondo-superficie px-8 py-10 text-center overflow-hidden"
            >
              {/* Acento visual */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(31,225,167,0.06) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="block text-marca-principal text-4xl font-serif leading-none mb-4 select-none" aria-hidden="true">"</span>
                <p className="text-xl sm:text-2xl font-normal text-texto-titulo leading-snug mb-4">
                  {t.citaTexto}
                </p>
                <p className="text-sm text-texto-secundario max-w-lg mx-auto leading-relaxed">
                  {t.citaSubtexto}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-marca-principal/30 bg-marca-principal/5">
                  <span className="text-xs font-semibold tracking-widest text-marca-principal uppercase">{t.citaFirma}</span>
                </div>
              </div>
            </blockquote>

          </div>
        </section>

        {/* ── FORMATOS ── */}
        <section className="bg-fondo-base py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.formatosLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.formatosTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">{t.formatosSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.formatosBatNight.map((formato, i) => (
                <article
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                  className="bg-fondo-superficie rounded-2xl p-6 border border-white/5 hover:border-marca-principal/25 transition-colors duration-300 flex flex-col"
                >
                  <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{formato.titulo}</h3>
                  <p className="text-sm text-texto-secundario leading-relaxed flex-grow">{formato.descripcion}</p>
                  <p className="mt-4 text-xs text-marca-principal/70 leading-relaxed">{formato.publico}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRÓXIMAS BAT NIGHTS ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.proximasLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-5">{t.proximasTitle}</h2>
              <p className="text-texto-secundario max-w-xl mx-auto leading-relaxed">
                {t.proximasSubtitle}
              </p>
            </div>
            <div
              initial="oculto" whileInView="visible" viewport={{ once: true }}
              variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
              className="bg-fondo-superficie rounded-2xl p-8 border border-marca-principal/20 text-center"
            >
              <h3 className="text-xl font-bold text-texto-titulo mb-3">{t.proximasBoxTitle}</h3>
              <p className="text-sm text-texto-secundario leading-relaxed mb-6 max-w-lg mx-auto">
                {t.proximasBoxSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  {t.proximasCta1}
                </a>
                <a
                  href="https://wa.me/34664213450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-base hover:border-white/25 transition-all duration-200 no-underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.proximasCta2}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA / CONTACTO ── */}
        <section id="contacto" className="bg-fondo-base py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}>
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-4">{t.ctaFinalLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-5">{t.ctaFinalTitle}</h2>
              <p className="text-texto-secundario leading-relaxed mb-8">
                {t.ctaFinalSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:info@murcielagosmalaga.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  {t.ctaEmail}
                </a>
                <a
                  href="https://wa.me/34664213450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.ctaWhatsapp}
                </a>
              </div>
              <p className="mt-8 text-sm text-texto-secundario/60">
                {t.ctaOtrosServicios}{' '}
                <Link to="/#servicios" className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline">
                  {t.ctaOtrosServiciosLink}
                </Link>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
