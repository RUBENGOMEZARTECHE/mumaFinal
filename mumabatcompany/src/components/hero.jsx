// Hero principal — oscuro premium, traducible por idioma
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { heroI18n } from '../data/heroI18n'

const variantes = {
  oculto: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { locale } = useLang()
  const t = heroI18n[locale] || heroI18n.es

  return (
    <section
      className="relative flex flex-col justify-center items-center text-center px-6 pt-56 pb-16 bg-fondo-base overflow-hidden"
      aria-label="Presentacion principal"
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        <motion.p custom={0} initial="oculto" animate="visible" variants={variantes} className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-6">
          {t.eyebrow}
        </motion.p>

        <motion.h1 custom={1} initial="oculto" animate="visible" variants={variantes} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6">
          {t.title.map((linea, i) =>
            i === t.titleHighlight
              ? <span key={i} className="text-marca-principal"> {linea} </span>
              : <span key={i}>{linea}{i < t.title.length - 1 ? ' ' : ''}</span>
          )}
        </motion.h1>

        <motion.p custom={2} initial="oculto" animate="visible" variants={variantes} className="text-lg sm:text-xl text-texto-secundario max-w-2xl mx-auto leading-relaxed mb-10">
          {t.description}
        </motion.p>

        <motion.div custom={3} initial="oculto" animate="visible" variants={variantes} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <a href={t.primaryCta.href} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline">
            {t.primaryCta.label}
          </a>
          <a href={t.secondaryCta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.secondaryCta.label}
          </a>
        </motion.div>

        <motion.div custom={4} initial="oculto" animate="visible" variants={variantes} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-texto-titulo">{stat.valor}</p>
              <p className="text-xs text-texto-secundario mt-0.5">{stat.etiqueta}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
