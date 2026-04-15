import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FormularioMuma from './formularioContacto'

const fadeUp = {
  oculto:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const grupos = [
  {
    categoria: 'Consultoría científica',
    desc: 'Informes y asesoramiento con base en investigación de campo real y metodología europea.',
    servicios: [
      { titulo: 'Consultoría bioacústica', desc: 'Auditoría de fauna mediante análisis ultrasónico. Identificamos qué especies están presentes, cómo se distribuyen y qué estado tienen las colonias.', para: 'Administraciones, reservas naturales, promotores', img: '/images/dentro-cueva.webp' },
      { titulo: 'Monitorización de colonias', desc: 'Seguimiento continuo con sensores y grabación bioacústica. Informes periódicos con datos de actividad, especies detectadas y tendencias de población.', para: 'Parques naturales, cuevas turísticas, fincas', img: '/images/monitorizacion.webp' },
      { titulo: 'Consultoría jurídico-ambiental', desc: 'Los murciélagos están protegidos por legislación europea (EUROBATS) y nacional. Asesoramos sobre cumplimiento normativo y gestión legal en proyectos que afecten a sus hábitats.', para: 'Promotoras, administraciones, gestores de cuevas', img: '/images/colonia_murcielago01.webp' },
    ],
  },
  {
    categoria: 'Soluciones para el territorio',
    desc: 'Aplicamos el conocimiento del murciélago como herramienta para resolver problemas reales en campo, ciudad y empresa.',
    servicios: [
      { titulo: 'Agricultura y control biológico', desc: 'Una colonia elimina hasta 3.000 insectos por noche. Asesoramos a fincas para integrar colonias naturales como alternativa real a los pesticidas.', para: 'Viñedos, olivares, fincas hortícolas', img: '/images/agricultura-control-biologico_resultado.webp' },
      { titulo: 'Gestión forestal y restauración ecológica', desc: 'Diseño de microhábitats, refugios y corredores biológicos en masas forestales para recuperar la función del murciélago en el ecosistema.', para: 'Gestores forestales, ayuntamientos, promotoras', img: '/images/agricultores.webp' },
      { titulo: 'Soluciones basadas en la naturaleza (SbN)', desc: 'Metodologías de conservación reconocidas internacionalmente para resolver problemas concretos: plagas, pérdida de biodiversidad, degradación de suelos.', para: 'Administraciones públicas, empresas con compromisos ambientales', img: '/images/instituciones.webp' },
      { titulo: 'Ciudades y entornos urbanos', desc: 'Los murciélagos son indicadores de la salud del ecosistema urbano. Diseñamos estrategias de integración de fauna en espacios verdes, parques y edificios.', para: 'Ayuntamientos, arquitectos, gestores de espacios', img: '/images/ayuntamientos.webp' },
    ],
  },
  {
    categoria: 'Formación y divulgación',
    desc: 'Transferimos el conocimiento científico a personas, equipos e instituciones con metodologías adaptadas a cada audiencia.',
    servicios: [
      { titulo: 'Educación ambiental', desc: 'Talleres, charlas y programas formativos sobre quirópteros para colegios, universidades y técnicos ambientales. Contenidos desarrollados desde investigación de campo real.', para: 'Centros educativos, equipos técnicos, museos', img: '/images/educacion-ambiental.webp' },
      { titulo: 'Serious Games y gamificación', desc: 'Experiencias gamificadas con base científica para reforzar el aprendizaje sobre murciélagos y conservación en aulas, museos y eventos.', para: 'Centros educativos, museos, actividades infantiles', img: '/images/serous-game.webp', acento: true },
      { titulo: 'Innovación y metodología propia', desc: 'Desarrollo de metodologías que combinan trabajo de campo, tecnología inmersiva y archivo bioacústico. La innovación como forma de mirar, no solo como herramienta.', para: 'Centros de investigación, universidades, empresas tecnológicas', img: '/images/innovacion-metodologia-propia.webp', acento: true },
    ],
  },
]

const fondosPorGrupo = ['bg-fondo-base', 'bg-fondo-secundario', 'bg-fondo-base']

export default function FormacionPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-fondo-base pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-semibold tracking-[0.25em] text-marca-principal uppercase mb-5">
            Consultoría &amp; Formación
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6">
            Consultoría ambiental y formación en conservación de murciélagos.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-texto-secundario leading-relaxed max-w-2xl">
            No somos un centro de interpretación. Somos el equipo que lleva años en el territorio grabando colonias, instalando refugios y colaborando con instituciones científicas europeas. Ese conocimiento es lo que ofrecemos a administraciones, agricultores, museos y gestores de espacios naturales.
          </motion.p>
        </div>
      </section>

      {/* GRUPOS */}
      {grupos.map((grupo, gi) => (
        <section key={gi} className={`${fondosPorGrupo[gi]} py-20 px-6`}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="mb-10">
                <p className="text-xs font-bold tracking-[0.25em] text-marca-principal uppercase mb-3">
                  {String(gi + 1).padStart(2, '0')} — {grupo.categoria}
                </p>
                <h2 className="text-2xl font-bold text-texto-titulo mb-2">{grupo.categoria}</h2>
                <p className="text-sm text-texto-secundario max-w-xl">{grupo.desc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {grupo.servicios.map(({ titulo, desc, para, img }, i) => (
                  <div key={i} className="bg-fondo-superficie rounded-2xl border border-white/5 hover:border-purple-400 transition-colors duration-300 flex flex-col overflow-hidden">
                    {img && (
                      <div className="aspect-video overflow-hidden">
                        <img src={img} alt={titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-texto-titulo mb-3 leading-tight">{titulo}</h3>
                      <p className="text-sm text-texto-secundario leading-relaxed mb-4 flex-1">{desc}</p>
                      <p className="text-[10px] font-bold tracking-widest text-marca-principal/60 uppercase mb-5">{para}</p>
                      <a href="#inscripcion" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-marca-principal/40 text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion hover:border-marca-principal transition-all duration-200 no-underline group self-start">
                        Solicitar información
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* AVALES */}
      <section className="bg-fondo-secundario py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-fondo-superficie rounded-2xl border border-white/5 p-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.2em] text-marca-principal uppercase mb-3">Respaldo científico</p>
              <h3 className="text-2xl font-bold text-texto-titulo mb-4 leading-tight">Cada informe está firmado desde el campo, no desde un despacho.</h3>
              <p className="text-texto-secundario text-sm leading-relaxed">Somos miembros activos de SECEMU, alineados con el marco EUROBATS y ex-investigadores del proyecto europeo ST3ER en España, Portugal y Eslovenia. Eso es lo que convierte nuestros informes en documentos con peso real ante administraciones e instituciones.</p>
            </div>
            <div className="flex flex-wrap md:flex-col gap-4 shrink-0 items-center">
              {[
                { src: '/images/Logo_SECEMU.webp', alt: 'SECEMU' },
                { src: '/images/EUROBATS_logo.webp', alt: 'EUROBATS' },
                { src: '/images/Murcielagos-Malaga-ST3ER-Proyect-2-1024x266.webp', alt: 'ST3ER — SMP COSME UE' },
                { src: '/images/europa.webp', alt: 'Fondos FEDER — Unión Europea' },
              ].map((logo) => (
                <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-fondo-base py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h3 className="text-3xl font-bold text-texto-titulo mb-4">¿Tienes un proyecto concreto?</h3>
            <p className="text-texto-secundario mb-8 max-w-lg mx-auto">Cuéntanos el contexto  territorio, especie, problema o normativa  y te decimos si podemos ayudarte y cómo.</p>
            <a href="#inscripcion" className="inline-flex items-center gap-2 px-8 py-4 bg-marca-principal text-texto-sobre-accion font-bold rounded-xl hover:bg-marca-principal-hover transition-colors duration-200 no-underline">
              Hablar con el equipo <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FORMULARIO DE INSCRIPCIÓN TÉCNICA */}
      <section id="inscripcion" className="bg-fondo-secundario py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-[10px] font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">Solicitud de consultoría y formación</p>
            <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6">Inicia tu proyecto con MUMA</h2>
            <p className="text-texto-secundario max-w-xl mx-auto leading-relaxed">
              Dinos en qué área necesitas apoyo técnico y un consultor de nuestro equipo se pondrá en contacto contigo para evaluar la viabilidad.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <FormularioMuma
              tablaBD="consultas_web"
              asuntoCorreo="[Web Formación] Nueva solicitud técnica"
              textoBoton="ENVIAR SOLICITUD TÉCNICA"
              selectName="area_interes"
              selectLabel="¿En qué área necesitas consultoría o formación?"
              opcionesSelect={[
                { valor: 'bioacustica', texto: 'Consultoría Bioacústica' },
                { valor: 'agricultura', texto: 'Agricultura y Control Biológico' },
                { valor: 'formacion', texto: 'Formación y Educación Ambiental' },
                { valor: 'legislacion', texto: 'Asesoría Jurídico-Ambiental' },
                { valor: 'innovacion', texto: 'Innovación y I+D' },
                { valor: 'otro', texto: 'Otro' }
              ]}
              mostrarOrganizacion={true}
              mostrarMensaje={true}
              camposOcultos={{ origen: 'web_formacion', tipo_solicitud: 'formacion_consultoria' }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
