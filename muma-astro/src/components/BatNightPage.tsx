// Componente — Bat Nights (página principal)
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import FormularioMuma from './formularioContacto'

interface EventoBatNight {
  id: string
  nombre: string
  fecha_evento: string
  municipio: string
  descripcion: string | null
  aforo_maximo: number | null
  reservas_actuales: number | null
}

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
}

const casosBatNight = [
  {
    titulo: 'Bat Night Portugal — Grutas da Moeda',
    fecha: '14 septiembre 2025',
    participantes: '+200 visitantes',
    ubicacion: 'Fátima, Portugal',
    descripcion: 'Evento en formato open-stand de 10:00 a 18:00 h en las Grutas da Moeda. Colaboración con el investigador Danilo Guimarães. Actividades de detección de ultrasonidos y divulgación científica sobre quirópteros ibéricos.',
    destacados: ['Formato open-stand 10:00–18:00 h', 'Colaboración científica con Danilo Guimarães', '+200 visitantes en un solo día', 'Primer evento internacional de MUMA'],
    slug: '/servicios/bat-night/portugal-grutas-moeda',
  },
  {
    titulo: 'Bat Night Cueva de Nerja y Parador de Turismo',
    fecha: '26 septiembre 2025 · Nuevas ediciones agosto y octubre 2025',
    participantes: '+50 participantes',
    ubicacion: 'Nerja, Málaga',
    descripcion: 'Experiencia nocturna en colaboración con la Fundación Cueva de Nerja y el Parador de Turismo de Nerja. Se instalaron refugios monitorizados en el entorno. El éxito de la primera edición derivó en nuevas convocatorias en agosto y octubre de 2025.',
    destacados: ['Instalación de refugios monitorizados', 'Colaboración con Fundación Cueva de Nerja', 'Tres ediciones en 2025', 'Integración ecoturismo + conservación'],
    slug: '/servicios/bat-night/cueva-nerja',
  },
  {
    titulo: 'Bat Night Plaza Mayor Málaga',
    fecha: '25 y 26 julio 2025',
    participantes: '200–300 participantes',
    ubicacion: 'Málaga capital',
    descripcion: 'Evento urbano de dos jornadas en Plaza Mayor Málaga. Programa completo con área de realidad virtual, exposición fotográfica sobre murciélagos y talleres infantiles. Una de las experiencias con mayor afluencia de público organizadas por MUMA.',
    destacados: ['Área de realidad virtual inmersiva', 'Exposición fotográfica', 'Talleres infantiles', '2 jornadas · 200–300 participantes'],
    slug: '/servicios/bat-night/plaza-mayor-malaga',
  },
  {
    titulo: 'Bat Night Laguna de Fuente de Piedra',
    fecha: 'Reserva Natural Protegida',
    participantes: 'Público familiar y escolar',
    ubicacion: 'Fuente de Piedra, Málaga',
    descripcion: 'Actividad en una de las reservas naturales más emblemáticas de Andalucía. Programa de educación ambiental sobre el papel de los murciélagos en ecosistemas de humedal, combinado con experiencia VR en entorno natural.',
    destacados: ['Reserva natural protegida', 'Educación ambiental + VR', 'Público familiar y escolar', 'Ecosistema de humedal'],
    slug: '/servicios/bat-night/fuente-de-piedra',
  },
]

const formatosBatNight = [
  {
    titulo: 'Bat Night estándar',
    descripcion: 'Actividad nocturna guiada con detección de ultrasonidos en tiempo real, charla científica y sesión de preguntas. Ideal para parques naturales, ayuntamientos y centros de naturaleza.',
    publico: 'Espacios naturales · Ayuntamientos · Centros educativos',
  },
  {
    titulo: 'Bat Night con VR',
    descripcion: 'Combinación de actividad al aire libre y experiencia de realidad virtual inmersiva. El participante detecta murciélagos en vivo y luego entra en una cueva virtual. Máximo impacto divulgativo.',
    publico: 'Museos · Ferias científicas · Festivales de naturaleza',
  },
  {
    titulo: 'Bat Night en espacios culturales',
    descripcion: 'Adaptación del formato para plazas, patios de museos o recintos urbanos. Incluye exposición fotográfica, zona infantil y módulo de realidad virtual. Formato ferial de larga duración.',
    publico: 'Museos · Centros comerciales · Eventos municipales',
  },
  {
    titulo: 'Ciclo de Bat Nights',
    descripcion: 'Programa de varias ediciones a lo largo del año, con fechas coordinadas según calendario de quirópteros. Incluye comunicación, materiales y evaluación de impacto.',
    publico: 'Diputaciones · Paradores · Redes de espacios naturales',
  },
]

export default function BatNightPage() {
  const [eventosDB, setEventosDB] = useState<EventoBatNight[]>([])

  useEffect(() => {
    supabase
      .from('eventos_batnight')
      .select('id, nombre, fecha_evento, municipio, descripcion, aforo_maximo, reservas_actuales')
      .eq('publicado', true)
      .gte('fecha_evento', new Date().toISOString())
      .then(({ data, error }) => {
        if (error) console.error('Error cargando eventos:', error.message)
        else setEventosDB(data || [])
      })
  }, [])

  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 bg-fondo-base overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-marca-principal/30 bg-marca-principal/5 mb-7">
            <span className="text-xs font-semibold tracking-widest text-marca-principal uppercase">
              Experiencias nocturnas · Conservación y ciencia
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-texto-titulo mb-5">
            La naturaleza<br />
            <span className="text-marca-principal">de noche.</span>
          </h1>

          <p className="text-sm font-semibold tracking-wide text-marca-principal/70 uppercase mb-5">
            "Llevamos la cueva a las personas, no las personas a la cueva"
          </p>

          <p className="text-lg sm:text-xl text-texto-secundario max-w-2xl mx-auto leading-relaxed mb-12">
            Eventos nocturnos de conservación y divulgación científica que combinan detección de ultrasonidos en tiempo real, experiencia VR inmersiva, charlas científicas y talleres educativos. Para museos, ayuntamientos, espacios naturales y festivales.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 mb-12">
            {[
              { valor: '+6',   etiqueta: 'Ediciones\nrealizadas' },
              { valor: '2',    etiqueta: 'Países\n(ES · PT)' },
              { valor: '+700', etiqueta: 'Participantes\nen eventos' },
              { valor: '5',    etiqueta: 'Tipos de\nespacio' },
            ].map(({ valor, etiqueta }, i) => (
              <div key={i} className="bg-fondo-base px-5 py-6 flex flex-col items-center gap-2">
                <span className="text-3xl font-bold text-texto-titulo leading-none">{valor}</span>
                <span className="text-xs text-texto-secundario/70 leading-snug text-center whitespace-pre-line">{etiqueta}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
            >
              Organizar una Bat Night
            </a>
            <a
              href="#bat-nights-realizadas"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
            >
              Ver ediciones realizadas <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BAT NIGHTS REALIZADAS ── */}
      <section id="bat-nights-realizadas" className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Trayectoria</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Bat Nights realizadas</h2>
            <p className="text-texto-secundario max-w-xl mx-auto">Más de 700 personas han participado en nuestras Bat Nights en 2025, en entornos tan distintos como una gruta portuguesa, una reserva natural andaluza o una plaza urbana.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Eventos dinámicos desde Supabase */}
            {eventosDB.map((evento, i) => (
              <motion.article
                key={evento.id}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className="bg-fondo-superficie rounded-2xl p-7 border border-white/5 hover:border-marca-principal/40 transition-colors duration-300 flex flex-col"
              >
                <h3 className="text-base font-bold text-texto-titulo mb-1 leading-snug">{evento.nombre}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                  <p className="text-xs text-marca-principal/70 flex items-center gap-1">{evento.fecha_evento}</p>
                  <p className="text-xs text-texto-secundario/60 flex items-center gap-1">{evento.municipio}</p>
                </div>
                {evento.descripcion && (
                  <p className="text-sm text-texto-secundario leading-relaxed flex-grow mb-4">{evento.descripcion}</p>
                )}
                {evento.aforo_maximo !== null && evento.reservas_actuales !== null ? (
                  evento.reservas_actuales >= evento.aforo_maximo ? (
                    <span className="inline-block px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg mt-auto text-center border border-red-500/20">
                      Entradas Agotadas
                    </span>
                  ) : (
                    <a
                      href="#contacto"
                      className="inline-block px-4 py-2 bg-marca-principal/10 hover:bg-marca-principal/20 text-marca-principal text-xs font-bold rounded-lg mt-auto text-center border border-marca-principal/30 transition-colors"
                    >
                      Reservar Plaza ({evento.aforo_maximo - evento.reservas_actuales} disponibles)
                    </a>
                  )
                ) : (
                   <span className="inline-block px-3 py-1.5 bg-white/5 text-gray-400 text-xs font-bold rounded-lg mt-auto text-center border border-white/10">
                     Aforo no definido
                   </span>
                )}
              </motion.article>
            ))}

            {/* Eventos hardcodeados (complementarios) */}
            {casosBatNight.map((caso, i) => (
              <motion.article
                key={`caso-${i}`}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: (eventosDB.length + i) * 0.1 } } }}
                className="bg-fondo-superficie rounded-2xl p-7 border border-white/5 hover:border-purple-400 transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-semibold text-marca-principal/70 text-right leading-snug">{caso.participantes}</span>
                </div>
                <h3 className="text-base font-bold text-texto-titulo mb-1 leading-snug">{caso.titulo}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                  <p className="text-xs text-marca-principal/70 flex items-center gap-1">{caso.fecha}</p>
                  <p className="text-xs text-texto-secundario/60 flex items-center gap-1">{caso.ubicacion}</p>
                </div>
                <p className="text-sm text-texto-secundario leading-relaxed mb-5 flex-grow">{caso.descripcion}</p>
                <ul className="space-y-1.5 mb-5">
                  {caso.destacados.map((punto, j) => (
                    <li key={j} className="flex gap-2 items-start text-xs text-texto-secundario/80">
                      {punto}
                    </li>
                  ))}
                </ul>
                <a
                  href={caso.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-marca-principal hover:opacity-75 transition-opacity duration-200 no-underline mt-auto"
                >
                  Ver detalle del evento <ArrowRight size={12} aria-hidden="true" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TURISMO SOSTENIBLE Y CONSERVACIÓN ── */}
      <section className="bg-fondo-base py-24 px-6">
        <div className="max-w-4xl mx-auto">

          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Turismo sostenible · Impacto real</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-texto-titulo leading-tight mb-5">
              El turismo que<br />
              <span className="text-marca-principal">protege lo que visita</span>
            </h2>
          </motion.div>

          <div className="space-y-16 mb-16">

            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                Una de cada tres especies animales está en declive. El turismo masivo, aunque genera riqueza, es también una de las causas documentadas de pérdida de biodiversidad: fragmentación de hábitats, contaminación lumínica, presión sobre espacios naturales protegidos. La Costa del Sol recibe 14 millones de turistas al año. Con más de 200 hoteles, 80 museos y 700 centros educativos, la región tiene una responsabilidad y una oportunidad sin precedentes para liderar un modelo turístico distinto.
              </p>
              <img src="/images/1batnights.webp" alt="Refugio para murciélagos instalado en árbol" className="w-full h-72 object-cover rounded-2xl" />
            </motion.div>

            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img src="/images/murcielago.webp" alt="Murciélago en vuelo al atardecer" className="w-full h-72 object-cover rounded-2xl order-last md:order-first" />
              <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                Los murciélagos son un ejemplo perfecto de lo que está en juego. Un solo individuo elimina hasta 3.000 mosquitos por noche. Su desaparición no solo rompe el equilibrio ecológico: dispara las poblaciones de insectos plaga, obliga a aumentar el uso de pesticidas y genera costes económicos reales para la agricultura y el turismo rural. Son animales invisibles, mal comprendidos y fundamentales. Las Bat Nights de MUMA están diseñadas para cambiar esa percepción desde la experiencia directa.
              </p>
            </motion.div>

            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                Nuestro modelo parte de una convicción: la educación ambiental más efectiva no es la que informa, sino la que conecta emocionalmente. Por eso combinamos detección de ultrasonidos en tiempo real con realidad virtual inmersiva. El visitante escucha al murciélago en vuelo con el detector. Después, se introduce en una cueva virtual donde entiende su biología, su rol ecológico y las amenazas que enfrenta. Nada de esto requiere molestar a los animales ni invadir su hábitat. Llevamos la cueva a las personas; no las personas a la cueva.
              </p>
              <img src="/images/Image_VRglases.webp" alt="Niña experimentando la realidad virtual de MUMA en una Bat Night" className="w-full h-72 object-cover rounded-2xl" />
            </motion.div>

            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img src="/images/bat-night-eslovenia.webp" alt="Bat Night en el Museo de Eslovenia" className="w-full h-72 object-cover rounded-2xl" />
              <p className="text-base sm:text-lg text-texto-secundario leading-relaxed">
                Los resultados lo confirman. En la Laguna de Fuente de Piedra reserva natural protegida en Málaga combinamos interpretación ambiental in situ con VR para públicos familiares y escolares. En la Cueva de Nerja, el éxito de la primera edición llevó directamente a la instalación de refugios monitorizados en el entorno: conservación activa como consecuencia tangible de la divulgación. En Plaza Mayor demostramos que el modelo funciona también en entornos urbanos comerciales. Y en Portugal validamos el formato en un contexto turístico internacional con más de 200 visitantes en un solo día. MUMA opera desde el Polo Digital de Málaga con el respaldo de alianzas como SECEMU, Fundación Cueva de Nerja, Selwo Aventura y la Junta de Andalucía.
              </p>
            </motion.div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                titulo: 'Impacto ecológico real',
                texto: 'Sin murciélagos, los ecosistemas se desequilibran. El control biológico de plagas que ejercen elimina la necesidad de pesticidas en zonas agrícolas y naturales. Cada Bat Night es también una campaña de sensibilización que contribuye a reducir la presión sobre sus poblaciones.',
              },
              {
                titulo: 'Educación inmersiva sin huella',
                texto: 'La tecnología VR permite llevar la experiencia de una cueva de murciélagos a cualquier espacio urbano o natural sin generar impacto ecológico. El visitante aprende más en 10 minutos de inmersión que en una hora de charla. No se altera el hábitat. No se disturba a los animales.',
              },
              {
                titulo: 'Conservación activa',
                texto: 'Las Bat Nights no terminan cuando se apagan los proyectores. En varios casos han derivado en instalación de refugios monitorizados, acuerdos de seguimiento científico y programas educativos continuados. El evento es el primer paso de un compromiso más amplio con el territorio.',
              },
            ].map(({ titulo, texto }, i) => (
              <motion.div
                key={i}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                className="bg-fondo-superficie rounded-2xl p-7 border border-white/5 hover:border-purple-400 transition-colors duration-300"
              >
                <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{titulo}</h3>
                <p className="text-sm text-texto-secundario leading-relaxed">{texto}</p>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}
            className="relative rounded-2xl border border-marca-principal/20 bg-fondo-superficie px-8 py-10 text-center overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(31,225,167,0.06) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <span className="block text-marca-principal text-4xl font-serif leading-none mb-4 select-none" aria-hidden="true">"</span>
              <p className="text-xl sm:text-2xl font-normal text-texto-titulo leading-snug mb-4">
                La realidad virtual no sustituye la naturaleza,<br className="hidden sm:block" /> la protege.
              </p>
              <p className="text-sm text-texto-secundario max-w-lg mx-auto leading-relaxed">
                Nuestra tecnología existe para que más personas entiendan el valor de lo que existe fuera de las pantallas. Cada experiencia inmersiva es una razón más para conservar el mundo real.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-marca-principal/30 bg-marca-principal/5">
                <span className="text-xs font-semibold tracking-widest text-marca-principal uppercase">MUMA BAT COMPANY · Polo Digital de Málaga</span>
              </div>
            </div>
          </motion.blockquote>

        </div>
      </section>

      {/* ── FORMATOS ── */}
      <section className="bg-fondo-base py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Formatos disponibles</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Diseñamos la Bat Night a tu medida</h2>
            <p className="text-texto-secundario max-w-xl mx-auto">Adaptamos el formato, la duración y el contenido al tipo de espacio, al público y a los objetivos de tu institución.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formatosBatNight.map((formato, i) => (
              <motion.article
                key={i}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                className="bg-fondo-superficie rounded-2xl p-6 border border-white/5 hover:border-purple-400 transition-colors duration-300 flex flex-col"
              >
                <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{formato.titulo}</h3>
                <p className="text-sm text-texto-secundario leading-relaxed flex-grow">{formato.descripcion}</p>
                <p className="mt-4 text-xs text-marca-principal/70 leading-relaxed">{formato.publico}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÓXIMAS BAT NIGHTS ── */}
      <section className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Agenda 2026</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-5">Próximas Bat Nights</h2>
            <p className="text-texto-secundario max-w-xl mx-auto leading-relaxed">
              Estamos ampliando el calendario para 2026. Si representas a un museo, ayuntamiento, espacio natural, hotel o cualquier institución con vocación divulgativa, podemos diseñar una Bat Night para tu entorno.
            </p>
          </motion.div>
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
            className="bg-fondo-superficie rounded-2xl p-8 border border-marca-principal/20 text-center"
          >
            <h3 className="text-xl font-bold text-texto-titulo mb-3">¿Tu institución quiere organizar una?</h3>
            <p className="text-sm text-texto-secundario leading-relaxed mb-6 max-w-lg mx-auto">
              Cuéntanos el espacio, las fechas aproximadas y el tipo de público. Preparamos una propuesta adaptada en menos de 48 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                Solicitar propuesta
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
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA / CONTACTO ── */}
      <section id="contacto" className="bg-fondo-base py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={varianteSeccion}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-4">
              Siguiente paso · Respuesta en 24h
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-5">
              Llevamos la noche a tu espacio
            </h2>
            <p className="text-texto-secundario max-w-xl mx-auto leading-relaxed mb-10">
              Escríbenos con el tipo de espacio, el público previsto y las fechas que tienes en mente. Respondemos en menos de 24 horas con una propuesta a medida.
            </p>
          </motion.div>

          {/* Formulario centralizado MUMA */}
          <div className="max-w-2xl mx-auto">
            <FormularioMuma
              tablaBD="solicitudes_batnight"
              asuntoCorreo="[Web Bat Night] Solicitud de propuesta"
              textoBoton="SOLICITAR BAT NIGHT"
              selectName="tipo_evento"
              selectLabel="Formato de interés"
              opcionesSelect={[
                { valor: 'estandar', texto: 'Bat Night estándar' },
                { valor: 'con_vr', texto: 'Bat Night con VR' },
                { valor: 'espacios_culturales', texto: 'En espacios culturales / urbanos' },
                { valor: 'ciclo', texto: 'Ciclo anual de Bat Nights' },
              ]}
              mostrarOrganizacion={true}
              mostrarParticipantes={true}
              mostrarFecha={true}
            />
          </div>

          <p className="mt-12 text-sm text-texto-secundario/60">
            ¿Buscas otro servicio?{' '}
            <a href="/#servicios" className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline">
              Ver todos los servicios
            </a>
          </p>
        </div>
      </section>

    </main>
  )
}
