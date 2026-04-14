// Página — Voluntarios
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Moon, Home, Microscope, Megaphone,
  Radio, Headset, BookOpen, MapPin,
  Heart, ArrowRight, Send,
} from 'lucide-react'

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const porQueUnirte = [
  {
    Icono: Moon,
    titulo: 'Participa en Bat Nights',
    descripcion: 'Colabora en nuestras noches de avistamiento de murciélagos. Aprende detección acústica, conoce especies y vive la naturaleza nocturna de Málaga junto a un equipo científico.',
    img: '/images/Bat-Nigt-Malaga-1.webp',
  },
  {
    Icono: Home,
    titulo: 'Instala refugios',
    descripcion: 'Ayuda a instalar y mantener refugios monitorizados para colonias de murciélagos. Una acción directa y tangible que mejora el hábitat de especies protegidas.',
    img: '/images/refugio_doble.webp',
  },
  {
    Icono: Microscope,
    titulo: 'Investigación científica',
    descripcion: 'Participa en la recogida de datos de campo, monitorización de colonias y proyectos de ciencia ciudadana junto a biólogos especializados en quirópteros.',
    img: '/images/ciencia.webp',
  },
  {
    Icono: Megaphone,
    titulo: 'Divulgación ambiental',
    descripcion: 'Apoya talleres educativos, eventos y experiencias VR. Comparte conocimiento sobre la importancia de los murciélagos en los ecosistemas mediterráneos.',
    img: '/images/educacion-ambiental.webp',
  },
]

const actividades = [
  {
    Icono: MapPin,
    titulo: 'Monitorización de refugios',
    descripcion: 'Visitas periódicas a refugios instalados para registrar ocupación, especies y estado de las colonias. Datos reales que alimentan nuestra investigación.',
    img: '/images/monitorizacion-refugios-voluntarios.webp',
  },
  {
    Icono: Headset,
    titulo: 'Apoyo en eventos VR',
    descripcion: 'Asistencia técnica y de atención al público en nuestras experiencias de realidad virtual. Guías de la experiencia MuMa BAT CAVE para visitantes y grupos escolares.',
    img: '/images/apoyo-eventos-vr-voluntarios.webp',
  },
  {
    Icono: Radio,
    titulo: 'Detección de ultrasonidos',
    descripcion: 'Uso de detectores acústicos durante salidas nocturnas para identificar especies de murciélagos por su ecolocalización. Formación incluida.',
    img: '/images/deteccion-ultrasonidos-voluntariado.webp',
  },
  {
    Icono: BookOpen,
    titulo: 'Talleres educativos',
    descripcion: 'Colaboración en la impartición de talleres en colegios, institutos y centros cívicos. Transmite el valor ecológico de los murciélagos a nuevas generaciones.',
    img: '/images/educacion-ambiental.webp',
  },
]

const requisitos = [
  'Ninguna formación específica requerida',
  'Solo motivación y compromiso con la naturaleza',
  'Disponibilidad ocasional, adaptable a tu agenda',
  'Mayores de 16 años (menores con autorización)',
]

export default function VoluntariosPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ 
    ...form, 
    [e.target.name]: e.target.value 
  });
};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    const asunto = encodeURIComponent(`Solicitud de voluntariado — ${form.nombre}`)
    const cuerpo = encodeURIComponent(
      `Hola, me gustaría unirme como voluntario/a en MUMA.\n\nNombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`
    )
    window.location.href = `mailto:info@murcielagosmalaga.com?subject=${asunto}&body=${cuerpo}`
  }

  return (
    <>
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
              Únete al equipo
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6"
            >
              Únete como{' '}
              <span className="text-marca-principal">voluntario</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-texto-secundario max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Protege la biodiversidad de Málaga desde el terreno. Con MUMA puedes participar activamente en la conservación de murciélagos, la investigación científica y la divulgación ambiental en la Costa del Sol.
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
                Quiero ser voluntario
              </a>
              <a
                href="#actividades"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
              >
                Ver actividades <ArrowRight size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── POR QUÉ SER VOLUNTARIO ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Razones para sumarte</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">¿Por qué ser voluntario en MUMA?</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">Más que ayudar, aprenderás, vivirás la ciencia en primera persona y formarás parte de un proyecto con impacto real en la biodiversidad malagueña.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {porQueUnirte.map((item, i) => (
                <motion.article
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                  className="bg-fondo-superficie rounded-2xl border border-white/5 hover:border-purple-400 transition-colors duration-300 overflow-hidden flex flex-col"
                >
                  {item.img && (
                    <div className="aspect-video overflow-hidden">
                      <img src={item.img} alt={item.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col grow">
                    <item.Icono size={28} className="text-marca-principal mb-4" aria-hidden="true" />
                    <h3 className="text-base font-bold text-texto-titulo mb-3 leading-snug">{item.titulo}</h3>
                    <p className="text-sm text-texto-secundario leading-relaxed grow">{item.descripcion}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUÉ HACEN LOS VOLUNTARIOS ── */}
        <section id="actividades" className="bg-fondo-base py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">En el día a día</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">¿Qué hacen los voluntarios?</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">Actividades concretas, variadas y con impacto directo en la conservación de los murciélagos en Málaga.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {actividades.map((item, i) => (
                <motion.div
                  key={i}
                  initial="oculto" whileInView="visible" viewport={{ once: true }}
                  variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }}
                  className="bg-fondo-superficie rounded-2xl border border-white/5 hover:border-purple-400 transition-colors duration-300 overflow-hidden flex flex-col"
                >
                  {item.img && (
                    <div className="aspect-video overflow-hidden">
                      <img src={item.img} alt={item.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-7 flex gap-5 items-start">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-marca-principal/10 flex items-center justify-center">
                      <item.Icono size={22} className="text-marca-principal" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-texto-titulo mb-2 leading-snug">{item.titulo}</h3>
                      <p className="text-sm text-texto-secundario leading-relaxed">{item.descripcion}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REQUISITOS ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion} className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Abierto a todos</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Requisitos</h2>
              <p className="text-texto-secundario max-w-xl mx-auto">No necesitas experiencia previa ni formación específica. Solo ganas de aprender y cuidar el entorno natural.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {requisitos.map((req, i) => (
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
              <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Primer paso</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Escríbenos</h2>
              <p className="text-texto-secundario leading-relaxed">Cuéntanos quién eres y qué te motiva a unirte. Te responderemos en menos de 48 horas.</p>
            </motion.div>

            <motion.form
              initial="oculto" whileInView="visible" viewport={{ once: true }} variants={varianteSeccion}
              onSubmit={handleSubmit}
              className="bg-fondo-superficie rounded-2xl p-8 border border-white/5 space-y-5"
              aria-label="Formulario de solicitud de voluntariado"
            >
              <div>
                <label htmlFor="nombre" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs font-semibold text-texto-secundario uppercase tracking-wider mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cuéntanos qué te motiva a ser voluntario y en qué actividades te gustaría participar…"
                  className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder:text-texto-secundario/40 focus:outline-none focus:border-marca-principal/50 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 cursor-pointer"
              >
                <Send size={15} aria-hidden="true" />
                Enviar solicitud
              </button>

              <p className="text-xs text-texto-secundario/50 text-center leading-relaxed">
                Se abrirá tu cliente de correo para enviar el mensaje a{' '}
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
                Quiero ser{' '}
                <span className="text-marca-principal">voluntario</span>
              </h2>
              <p className="text-lg text-texto-secundario leading-relaxed mb-10 max-w-xl mx-auto">
                Cada persona que se une a MUMA contribuye a proteger una especie fundamental para el ecosistema mediterráneo. Tu compromiso marca la diferencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  <Heart size={16} aria-hidden="true" />
                  Apuntarme ahora
                </a>
                <a
                  href="mailto:info@murcielagosmalaga.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
                >
                  Escribir por email
                </a>
              </div>
              <p className="mt-8 text-sm text-texto-secundario/60">
                ¿Prefieres donar?{' '}
                <a href="/donar" className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline">
                  Apoya MUMA económicamente
                </a>
              </p>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}
