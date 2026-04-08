// Página — Ciencia Ciudadana
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

import { useLang } from '../context/LangContext'
import { cienciaCiudadanaI18n } from '../data/i18n/cienciaCiudadanaI18n'

export default function CienciaCiudadana() {
  const { locale } = useLang()
  const t = cienciaCiudadanaI18n[locale]

  return (
    <>
      {/* SEO: título, descripción y metadatos Open Graph */}
      <Helmet>
        <html lang={locale} />
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaOgTitle} />
        <meta property="og:description" content={t.metaOgDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murcielagosmalaga.com/ciencia-ciudadana" />
        <link rel="canonical" href="https://murcielagosmalaga.com/ciencia-ciudadana" />
      </Helmet>

      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 bg-fondo-base overflow-hidden">

          {/* Halo de luz difusa centrado en el hero */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Contenido del hero, centrado y con ancho máximo */}
          <div className="relative z-10 max-w-3xl mx-auto">

            {/* Etiqueta pequeña superior */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-5"
            >
              {t.eyebrow}
            </motion.p>

            {/* Título principal del hero */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-8"
            >
              {t.heroTitlePre}{' '}
              <span className="text-marca-principal">{t.heroTitleHighlight}</span>
            </motion.h1>

            {/* Texto largo en prosa — sin tarjetas ni cuadritos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left space-y-5 text-texto-secundario text-base sm:text-lg leading-relaxed mb-10"
            >
              <p>{t.heroP1}</p>
              <p>{t.heroP2}</p>
              <p>{t.heroP3}</p>
              <p>{t.heroP4}</p>
            </motion.div>

            {/* CTA — primario a mailto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex justify-center"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:info@murcielagosmalaga.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  {t.ctaPrimario}
                </a>
                <a
                  href="https://wa.me/34664213450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.ctaSecundario}
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── CÓMO PARTICIPAR ── */}
        <section className="bg-fondo-base px-6 py-24">
          <div className="max-w-3xl mx-auto">

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">
              {t.comoTitle}
            </h2>

            {/* Texto introductorio de la sección */}
            <p className="text-texto-secundario text-base sm:text-lg leading-relaxed mb-16">
              {t.comoIntro}
            </p>

            {/* Bloques de participación — texto largo sin tarjetas */}
            <div className="space-y-16">

              {/* Bloque 1 */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">
                  {t.bloque1Num}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.bloque1Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.bloque1Body}
                </p>
              </div>

              {/* Bloque 2 */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">
                  {t.bloque2Num}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.bloque2Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.bloque2Body}
                </p>
              </div>

              {/* Bloque 3 */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">
                  {t.bloque3Num}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.bloque3Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.bloque3Body}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── POR QUÉ IMPORTA TU PARTICIPACIÓN ── */}
        <section className="bg-fondo-base px-6 py-24">
          <div className="max-w-3xl mx-auto">

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">
              {t.porQueTitle}
            </h2>

            {/* Texto introductorio */}
            <p className="text-texto-secundario text-base sm:text-lg leading-relaxed mb-16">
              {t.porQueIntro}
            </p>

            <div className="space-y-16">

              {/* Bloque mapas */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.mapa1Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.mapa1Body}
                </p>
              </div>

              {/* Bloque seguimiento */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.mapa2Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.mapa2Body}
                </p>
              </div>

              {/* Bloque detección */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">
                  {t.mapa3Title}
                </h3>
                <p className="text-texto-secundario text-base sm:text-lg leading-relaxed">
                  {t.mapa3Body}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── PROYECTOS ACTIVOS ── */}
        <section className="bg-fondo-base px-6 py-24">
          <div className="max-w-5xl mx-auto">

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">
              {t.proyectosTitle}
            </h2>

            {/* Subtítulo */}
            <p className="text-texto-secundario text-base sm:text-lg leading-relaxed mb-12">
              {t.proyectosSubtitle}
            </p>

            {/* Cuadrícula de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {t.proyectos.map((proyecto, i) => (
                <div key={i} className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6">

                  {/* Cabecera con badge activo */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-marca-principal/15 text-marca-principal">
                      {t.badgeActivo}
                    </span>
                  </div>

                  {/* Título del proyecto */}
                  <h3 className="text-lg font-bold text-texto-titulo mb-3">
                    {proyecto.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-texto-secundario text-sm leading-relaxed flex-1 mb-6">
                    {proyecto.descripcion}
                  </p>

                  {/* CTA */}
                  <a
                    href={`mailto:info@murcielagosmalaga.com?subject=${proyecto.emailSubject}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-marca-principal text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion transition-colors duration-200 no-underline"
                  >
                    {t.ctaProyecto}
                  </a>
                </div>
              ))}

            </div>
          </div>
        </section>

      </main>
    </>
  )
}
