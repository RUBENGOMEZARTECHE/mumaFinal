// Componente — Bat Night Cueva de Nerja
import { motion } from 'framer-motion'
import { Moon, MapPin, CalendarDays, Users, Check, Camera, ArrowLeft } from 'lucide-react'

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
}

const destacados = [
  'Instalación de refugios monitorizados en el entorno de la cueva',
  'Colaboración con la Fundación Cueva de Nerja',
  'Colaboración con el Parador de Turismo de Nerja',
  'Tres ediciones en un mismo año (septiembre, agosto y octubre 2025)',
  'Integración única de ecoturismo y conservación activa',
  '+50 participantes en la primera edición',
  'Seguimiento científico de las colonias de murciélagos instaladas',
]

const fotos = [
  { src: '/images/fotos_batnight/nerja-1.webp', alt: 'Cueva de Nerja durante la Bat Night' },
  { src: '/images/fotos_batnight/nerja-2.webp', alt: 'Interior de la Cueva de Nerja' },
  { src: '/images/fotos_batnight/nerja-3.webp', alt: 'Actividad de detección de ultrasonidos' },
  { src: '/images/fotos_batnight/nerja-4.webp', alt: 'Instalación de refugios monitorizados' },
  { src: '/images/fotos_batnight/nerja-5.webp', alt: 'Colaboración con Fundación Cueva de Nerja' },
  { src: '/images/fotos_batnight/nerja-6.webp', alt: 'Parador de Turismo de Nerja' },
]

export default function BatNightNerjaPage() {
  return (
    <main>

      {/* ── BACK LINK ── */}
      <div className="bg-fondo-base pt-24 pb-0 px-6">
        <div className="max-w-6xl mx-auto">
          <a
            href="/servicios/bat-night"
            className="inline-flex items-center gap-2 text-xs text-texto-secundario hover:text-marca-principal transition-colors duration-200 no-underline"
          >
            <ArrowLeft size={13} aria-hidden="true" /> Volver a Bat Nights
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-16 bg-fondo-base overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-5"
          >
            Bat Night · Tres ediciones en 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6"
          >
            Bat Night{' '}
            <span className="text-marca-principal">Cueva de Nerja</span>
            <br />y Parador de Turismo
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
          >
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <CalendarDays size={14} className="text-marca-principal" aria-hidden="true" />
              26 sept · Ag. · Oct. 2025
            </span>
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <MapPin size={14} className="text-marca-principal" aria-hidden="true" />
              Nerja, Málaga
            </span>
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <Users size={14} className="text-marca-principal" aria-hidden="true" />
              +50 participantes
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="mailto:info@murcielagosmalaga.com?subject=Quiero%20apuntarme%20a%20la%20próxima%20Bat%20Night"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
            >
              Quiero apuntarme a la próxima Bat Night
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── DESCRIPCIÓN ── */}
      <section className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}>
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">El evento</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">Un enclave con historia y futuro</h2>
            <div className="space-y-4 text-texto-secundario leading-relaxed">
              <p>
                La Cueva de Nerja, Patrimonio de la Humanidad y uno de los monumentos naturales más visitados de Andalucía, acogió la primera Bat Night de MUMA en colaboración con la <strong className="text-texto-principal">Fundación Cueva de Nerja</strong> y el <strong className="text-texto-principal">Parador de Turismo de Nerja</strong> el 26 de septiembre de 2025.
              </p>
              <p>
                La singularidad de este evento radicó en su enfoque de <strong className="text-texto-principal">conservación activa</strong>: durante la jornada se instalaron refugios monitorizados en el entorno de la cueva, permitiendo a los participantes no solo observar murciélagos en tiempo real, sino contribuir directamente a su protección. Los refugios quedaron instalados de forma permanente como parte del programa de biodiversidad de la Fundación.
              </p>
              <p>
                El éxito de la primera edición —con más de 50 participantes entre científicos, turistas y residentes locales— fue tan contundente que la Fundación solicitó nuevas ediciones. MUMA regresó a Nerja en <strong className="text-texto-principal">agosto y octubre de 2025</strong>, consolidando esta colaboración como una de las más fructíferas del año.
              </p>
              <p>
                Este modelo —que combina experiencia de público, instalación de infraestructura y seguimiento científico— es el ejemplo más completo de lo que MUMA entiende por ecoturismo de impacto real.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="bg-fondo-base py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Imágenes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Galería del evento</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fotos.map((foto, i) => (
              <motion.div
                key={i}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } } }}
                className="rounded-2xl overflow-hidden aspect-video"
              >
                {foto.src ? (
                  <img src={foto.src} alt={foto.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-fondo-superficie border border-white/5 flex flex-col items-center justify-center gap-3 p-6">
                    <Camera size={28} className="text-marca-principal/40" aria-hidden="true" />
                    <p className="text-xs text-texto-secundario/50 text-center leading-snug">Foto próximamente</p>
                    <p className="text-xs text-texto-secundario/30 text-center leading-snug italic">{foto.alt}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTACADOS ── */}
      <section className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="mb-12">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Logros</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Puntos destacados</h2>
            <p className="text-texto-secundario max-w-xl leading-relaxed">Lo que hicimos posible en esta edición.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destacados.map((punto, i) => (
              <motion.div
                key={i}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.07 } } }}
                className="flex items-start gap-3 bg-fondo-superficie rounded-xl p-4 border border-white/5"
              >
                <Check size={16} className="text-marca-principal mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-sm text-texto-secundario leading-relaxed">{punto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ORGANIZAR ── */}
      <section className="bg-fondo-base py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}
            className="bg-fondo-superficie rounded-2xl p-10 border border-marca-principal/20 text-center"
          >
            <Moon size={40} className="text-marca-principal mx-auto mb-5" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4">¿Tienes un espacio natural o cultural con potencial?</h2>
            <p className="text-texto-secundario leading-relaxed mb-8 max-w-lg mx-auto">
              Podemos diseñar una Bat Night similar para tu cueva, reserva, parador o espacio patrimonial. Cuéntanos el contexto y preparamos una propuesta en menos de 48 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:info@murcielagosmalaga.com?subject=Quiero%20organizar%20una%20Bat%20Night%20similar%20a%20Cueva%20de%20Nerja"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                Solicitar propuesta por email
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-secundario hover:border-white/25 transition-all duration-200 no-underline"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── APUNTARSE CTA ── */}
      <section className="bg-fondo-secundario py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}>
            <h2 className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-5">¿No quieres perderte la próxima edición?</h2>
            <p className="text-texto-secundario leading-relaxed mb-8">
              Escríbenos y te avisamos cuando lancemos nuevas Bat Nights. Sin compromiso.
            </p>
            <a
              href="mailto:info@murcielagosmalaga.com?subject=Quiero%20apuntarme%20a%20la%20próxima%20Bat%20Night"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline shadow-lg shadow-marca-principal/20"
            >
              <Moon size={18} aria-hidden="true" />
              Quiero apuntarme a la próxima Bat Night
            </a>
            <p className="mt-6 text-xs text-texto-secundario/50">
              Al hacer clic se abrirá tu cliente de correo con el asunto predefinido.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
