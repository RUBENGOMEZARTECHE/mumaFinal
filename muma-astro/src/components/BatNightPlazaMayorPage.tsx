// Componente — Bat Night Plaza Mayor Málaga
import { motion } from 'framer-motion'
import { Moon, MapPin, CalendarDays, Users, Check, ArrowLeft } from 'lucide-react'
import FormularioMuma from './formularioContacto'

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
}

const destacados = [
  '2 jornadas consecutivas: 25 y 26 de julio de 2025',
  'Entre 200 y 300 participantes en el total del evento',
  'Área de realidad virtual inmersiva integrada en el recinto',
  'Exposición fotográfica sobre murciélagos y biodiversidad urbana',
  'Talleres infantiles de educación ambiental',
  'Evento urbano de gran formato en espacio comercial y cultural',
  'Mayor afluencia de público en un evento MUMA hasta la fecha',
]

const fotos = [
  { src: '/images/plaza1.webp', alt: 'Stand MUMA en Plaza Mayor Málaga' },
  { src: '/images/plaza2.webp', alt: 'Área de realidad virtual durante el evento' },
  { src: '/images/plaza-3.webp', alt: 'Exposición fotográfica sobre murciélagos' },
  { src: '/images/plaza-4.webp', alt: 'Talleres infantiles de educación ambiental' },
  { src: '/images/plaza-5.webp', alt: 'Participantes usando cascos VR' },
  { src: '/images/plaza-6.webp', alt: 'Público en la zona de detección de ultrasonidos' },
]

export default function BatNightPlazaMayorPage() {
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
            Bat Night · Evento urbano de gran formato
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6"
          >
            Bat Night{' '}
            <span className="text-marca-principal">Plaza Mayor</span>
            <br />Málaga
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
          >
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <CalendarDays size={14} className="text-marca-principal" aria-hidden="true" />
              25 y 26 julio 2025
            </span>
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <MapPin size={14} className="text-marca-principal" aria-hidden="true" />
              Málaga capital
            </span>
            <span className="flex items-center gap-1.5 text-sm text-texto-secundario">
              <Users size={14} className="text-marca-principal" aria-hidden="true" />
              200–300 participantes
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="#formulario"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">El mayor evento urbano de MUMA hasta la fecha</h2>
            <div className="space-y-4 text-texto-secundario leading-relaxed">
              <p>
                Los días 25 y 26 de julio de 2025, Plaza Mayor Málaga uno de los centros comerciales y culturales más activos de la provincia acogió la Bat Night urbana de mayor escala realizada por MUMA hasta la fecha. Durante dos jornadas completas, entre <strong className="text-texto-principal">200 y 300 personas</strong> vivieron de primera mano el universo de los murciélagos.
              </p>
              <p>
                El programa fue el más completo de nuestra historia: un <strong className="text-texto-principal">área de realidad virtual inmersiva</strong> donde los participantes podían entrar en una cueva virtual habitada por murciélagos, una <strong className="text-texto-principal">exposición fotográfica</strong> sobre la biodiversidad urbana y el papel ecológico de los quirópteros, y <strong className="text-texto-principal">talleres infantiles</strong> diseñados para que los más pequeños conectaran con la naturaleza de forma lúdica y científica.
              </p>
              <p>
                El formato urbano permitió llegar a un público muy diverso: familias de compras que se convirtieron en participantes espontáneos, grupos escolares que vinieron expresamente al evento, y adultos interesados en biodiversidad y ciencia. La capacidad de MUMA para adaptar su mensaje a audiencias heterogéneas quedó completamente demostrada.
              </p>
              <p>
                Plaza Mayor se consolidó como aliado estratégico de MUMA para futuras ediciones de gran formato en Málaga y otras ciudades del Mediterráneo.
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
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
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
            <h2 className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4">¿Tienes un espacio urbano o centro comercial?</h2>
            <p className="text-texto-secundario leading-relaxed mb-8 max-w-lg mx-auto">
              Podemos llevar el formato Plaza Mayor a tu espacio: centro comercial, plaza, auditorio o recinto ferial. Un evento de impacto para tu comunidad y para la biodiversidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:info@murcielagosmalaga.com?subject=Quiero%20organizar%20una%20Bat%20Night%20similar%20a%20Plaza%20Mayor%20Málaga"
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
      <section id="formulario" className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-5">¿Quieres apuntarte a la próxima edición?</h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
              Escríbenos y te avisamos cuando lancemos nuevas Bat Nights en Plaza Mayor Málaga. Sin compromiso.
            </p>
          </motion.div>

          <div className="bg-fondo-base/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-left">
            <FormularioMuma 
              tablaBD="consultas_web"
              asuntoCorreo="[Web Bat Night Plaza Mayor] Interés en próxima edición"
              textoBoton="AVÍSAME DE PRÓXIMAS EDICIONES"
              mostrarOrganizacion={false}
              mostrarTelefono={true}
              mostrarMensaje={true}
              placeholderMensaje="Cuéntanos si vienes solo, en familia o con algún interés específico..."
              mostrarSelect={false}
              mostrarFecha={false}
              mostrarParticipantes={false}
              nombreCampoNombre="nombre_contacto"
              camposOcultos={{
                tipo_solicitud: 'interes_batnight_evento',
                evento_referencia: 'Málaga - Plaza Mayor',
                origen: 'web_batnight_plazamayor'
              }}
            />
          </div>
        </div>
      </section>

    </main>
  )
}
