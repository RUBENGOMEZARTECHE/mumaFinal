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

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FormularioMuma from './formularioContacto'

/* ═══════════════════════════════════════════════════════════════════════════
   DATOS
   ═══════════════════════════════════════════════════════════════════════════ */

const PILARES = [
  { titulo: 'Accesible e Inmersiva', desc: 'Una experiencia accesible para todos los públicos que permite explorar cuevas reales sin desplazamientos ni riesgos, desde colegios hasta ferias científicas.', img: '/images/dentro-cueva.webp' },
  { titulo: 'Escaneo 3D y Conservación', desc: 'Unimos escaneo 3D, realidad virtual y conservación ambiental para mostrar entornos naturales con alto valor ecológico, sin impactarlos ni alterar la biodiversidad.', img: '/images/VR-Malaga1920.png' },
  { titulo: 'Conexión y Emoción', desc: 'Fomentamos la conexión con la naturaleza a través de tecnología, con narrativas orientadas a despertar interés por la protección del ecosistema subterráneo.', img: '/images/antonio-moret.webp', posicion: '50% 20%' },
  { titulo: 'Herramienta de Divulgación', desc: 'Diseñado para espacios de divulgación y turismo responsable. MuMa VR lleva el conocimiento a congresos, museos, empresas, AMPAs o campañas públicas.', img: '/images/Proyecto_palazaMayor.webp' },
]

// Acento visual por módulo — muy sutil, diferencia sin romper coherencia
const MODULOS = [
  {
    titulo: 'MuMa Bats 360',
    descripcion: 'Vídeos inmersivos en 360° grabados en entornos reales de murciélagos. Accesibles desde navegador o gafas VR, sin alterar los hábitats documentados.',
    acento: 'rgba(139,156,244,0.08)',
    proximamente: true,
  },
  {

    titulo: 'MuMa Virtual Bats',
    descripcion: 'Fichas interactivas de especies con modelos 3D, hábitat, estado de conservación y archivo acústico. Un recurso científico y visual para museos, centros educativos y divulgación.',
    acento: 'rgba(139,156,244,0.06)',
    proximamente: true,
  },
  {

    titulo: 'MuMa Game',
    descripcion: 'Experiencia gamificada basada en conocimiento científico real. Para reforzar aprendizaje y participación en aulas, eventos y actividades de sensibilización.',
    acento: 'rgba(139,156,244,0.08)',
    proximamente: true,
  },
]

const SPECS = [
  { label: 'Hardware', valor: 'Meta Quest 3 / 3S' },
  { label: 'Duración', valor: '5, 15 o 30 minutos' },
  { label: 'Idiomas', valor: 'Español / Inglés' },
  { label: 'Cuevas reales', valor: 'Nagüeles + Belda (Málaga)' },
  { label: 'Puntos interactivos', valor: '11 estaciones' },
  { label: 'Tablet virtual', valor: 'Mapa GPS, especies, fichas' },
]

const EVENTOS = [
  {
    lugar: 'Plaza Mayor Málaga',
    pais: 'España',
    fecha: 'Julio 2025',
    asistentes: '200–300',
    destacado: 'Zona VR, exposición sobre murciélagos, talleres infantiles y charlas divulgativas.',
    img: '/images/plaza-6.webp',
  },
  {
    lugar: 'Cueva de Nerja',
    pais: 'España',
    fecha: 'Septiembre 2025',
    asistentes: '50+',
    destacado: 'Instalación de refugios e inicio de colaboración científica con futuras investigaciones programadas.',
    img: '/images/cueva-nerja.webp',
  },
  {
    lugar: 'Grutas da Moeda',
    pais: 'Portugal',
    fecha: '14 sept 2025',
    asistentes: '200+',
    destacado: 'Instalación de refugio e interés formal en licenciar la experiencia VR.',
    img: '/images/grutas-da-moeda.webp',
  },
  {
    lugar: 'Notranjski Museum',
    pais: 'Eslovenia',
    fecha: '5–6 sept 2025',
    asistentes: '100+',
    destacado: 'Paseo nocturno con detectores de ultrasonido, actividades educativas y experiencia VR.',
    img: '/images/-notranjski-muzej-.webp',
  },
]

const CLIENTES = [
  { tipo: 'Centros Comerciales y de Visitantes', desc: 'Espacios de alta afluencia que buscan experiencias únicas para conectar al público con ecosistemas reales sin alejarlos de la ciudad.', img: '/images/museos.webp' },
  { tipo: 'Instituciones y Museos', desc: 'Administraciones públicas y museos de ciencia natural orientados a la divulgación inmersiva y la concienciación.', img: '/images/ayuntamientos.webp' },
  { tipo: 'Lujo, Golf y Campings', desc: 'Campos de Golf, Hoteles y Campings que añaden un valor Premium en educación ambiental y modernización 3D.', img: '/images/campo-golf.jpg' },
  { tipo: 'Espacios Naturales Abiertos', desc: 'Parques naturales que necesitan mostrar hábitats frágiles sin incrementar la presión humana.', img: '/images/cuevas-nerja.webp' },
  { tipo: 'Centros Educativos y AMPAs', desc: 'Inyectar conocimiento directo en colegios e institutos aportando tecnología y ciencia de forma muy atractiva.', img: '/images/educacion-ambiental.webp' },
  { tipo: 'ONGs y Asociaciones', desc: 'Entidades orientadas a la protección de la naturaleza con voluntad de hacer activismo respaldado tecnológicamente.', img: '/images/rerfugios-tintados.webp' },
]

const ALIANZAS = [
  { nombre: 'Fundación Cueva de Nerja', logo: '/images/cueva-nerja/logo-cueva-de-nerja-150x150.jpg' },
  { nombre: 'ST3ER', logo: '/images/st3er.webp' },
  { nombre: 'BIC Euronova', logo: '/images/centro-europeo-empresas.webp' },
  { nombre: 'Málaga TechPark', logo: '/images/malaga-tech-park.webp' },
  { nombre: 'Cámara de Comercio Málaga', logo: '/images/Camara-malaga-150x150.webp' },
  { nombre: 'La Brújula XR', logo: '/images/polo-contenido-digital.webp' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTES DE ANIMACIÓN
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const fadeIn = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTES
   ═══════════════════════════════════════════════════════════════════════════ */



// Card de módulo secundario
function CardModulo({ titulo, descripcion, acento, proximamente, imagen, href, index }: {
  titulo: string
  descripcion: string
  acento: string
  proximamente: boolean
  imagen?: string
  href?: string
  index: number
}) {
  return (
    <motion.article
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        oculto: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08 } },
      }}
      className="relative rounded-2xl p-6 transition-colors duration-300 flex flex-col overflow-hidden border border-white/5 hover:border-purple-400"
      style={{ background: `linear-gradient(135deg, #16212d 0%, #16212d 55%, ${acento} 100%)` }}
    >
      {/* Imagen de fondo opcional */}
      {imagen && (
        <>
          <img src={imagen} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-fondo-superficie/95 via-fondo-superficie/30 to-transparent" aria-hidden="true" />
        </>
      )}

      {/* Contenido */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Cabecera */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="text-base font-bold text-marca-principal leading-tight">{titulo}</h3>
          {proximamente && (
            <span className="text-[9px] font-bold tracking-widest text-marca-principal uppercase bg-acento-tecnologico-suave px-2.5 py-1 rounded-lg shrink-0" style={{ border: '1px solid rgba(192,132,252,0.6)' }}>
              Próximamente
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
            className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-marca-principal hover:opacity-80 transition-all duration-200 no-underline w-full"
            style={{ border: '1px solid rgba(192,132,252,0.6)' }}
          >
            Entrar al museo virtual <ArrowRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RealidadVirtualPage() {

  return (
    <main>

      {/* ══════════════════════════════════════════════════════════════════
          1. CABECERA GENERAL — Realidad Virtual (Hero Cinematic/Tech)
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '65vh' }}
        aria-label="Cabecera Realidad Virtual"
      >
        {/* Imagen de fondo con animación "Cinematic slow zoom" */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/fondovirtual.webp"
            alt="Realidad Virtual en Cuevas de Málaga para educación ambiental y museos - MuMa Bat Company"
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30" style={{ objectPosition: '50% 20%' }}
            loading="eager"
          />
        </div>

        {/* Overlay base oscuro */}
        <div
          className="absolute inset-0 bg-fondo-base/70"
          aria-hidden="true"
        />

        {/* Grid tecnológico superpuesto sutilmente */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          aria-hidden="true"
        />

        {/* Halo VR — brillos de luz atmosférica */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, rgba(100,50,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(50,150,255,0.06) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 lg:py-40">
          {/* Badge interactivo superior */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-marca-principal/40 bg-marca-principal/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-marca-principal animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-marca-principal uppercase">
              MUMA BAT COMPANY VR
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            <span className="text-white block">Realidad Virtual en Cuevas</span>
            <span className="text-white block mt-1 pb-2">
              con MuMa VR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-texto-secundario/90 leading-relaxed max-w-2xl mx-auto mb-10 font-medium"
          >
            MuMa VR transforma la innovación tecnológica en una{' '}
            <span className="text-white font-medium">experiencia de educación ambiental inmersiva</span>{' '}
            y sin impacto ecológico. Con el proyecto <span className="text-white">MuMa Bat Cave Experience VR</span>{' '}
            unimos realidad virtual 3D, ciencia y conservación para acercar la biodiversidad
            subterránea a museos, colegios, congresos o AMPAs en toda España.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#demo"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(var(--color-marca-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-marca-rgb),0.5)] w-full sm:w-auto"
            >
              {/* Brillo dinámico en el botón */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              Pedir demostración interactiva <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/34664213450"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito group-hover:scale-110 transition-transform" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Contactar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Degradado curvo inferior para fusión con la siguiente sección */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0b1117 100%)',
          }}
        >
          {/* Decoración visual en la parte inferior simulando tecnología */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[40%] max-w-md h-[30px] rounded-full blur-2xl bg-purple-400/20"></div>
        </div>
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
              Investigación aplicada · Experiencia llave en mano
            </p>
            <h2
              id="cave-experience-titulo"
              className="font-bold leading-[1.1] tracking-tight text-texto-titulo"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
            >
              MuMa Bat Cave Experience VR
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
                Lleva una{' '}
                <span className="text-marca-principal">cueva de murciélagos</span>
                {' '}a tu colegio, museo o evento corporativo.
              </p>
              <p className="text-texto-secundario leading-relaxed mb-4">
                Con el proyecto <strong className="text-white">MuMa Bat Cave Experience VR</strong> unimos realidad virtual, ciencia y conservación para abrir una nueva forma de explorar el mundo subterráneo. Escaneamos cuevas de alto valor ecológico —como la <strong className="text-white">Cueva de Nerja</strong>— para crear experiencias inmersivas sin poner en riesgo su frágil equilibrio.
              </p>
              <p className="text-texto-secundario leading-relaxed mb-6">
                Los visitantes pueden «entrar» en cuevas remotas, inaccesibles o protegidas, aprender sobre su biodiversidad y comprender su importancia ecológica. Ya sea en un museo, un colegio o una feria, respondemos en menos de 48 horas con una propuesta a medida. Sin pisar la cueva. Sin alterar nada.
              </p>

              {/* Cita de posicionamiento elevada visualmente */}
              <blockquote className="border-l-[3px] border-marca-principal pl-6 my-8 py-4 bg-gradient-to-r from-marca-principal/10 to-transparent rounded-r-2xl">
                <p className="text-texto-principal italic leading-relaxed text-base sm:text-lg font-medium">
                  "Llevamos la cueva a las personas, no las personas a la cueva."
                </p>
                <cite className="text-[10px] text-marca-principal font-bold tracking-widest uppercase not-italic mt-2 block">
                  MUMA BAT COMPANY

                </cite>
              </blockquote>

              {/* Avales — logos de respaldo garantizados uno al lado del otro */}
              <div className="mb-10">
                <p className="text-[10px] font-bold tracking-[0.2em] text-texto-secundario/50 uppercase mb-4">Avalado por</p>
                <div className="flex flex-row items-center gap-3 overflow-hidden">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center border border-white/10 shadow-sm shrink-0">
                    <img src="/images/Logo_SECEMU.webp" alt="SECEMU" className="h-6 w-auto object-contain opacity-90" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center border border-white/10 shadow-sm shrink-0">
                    <img src="/images/EUROBATS_logo.webp" alt="EUROBATS" className="h-6 w-auto object-contain opacity-90" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center border border-white/10 shadow-sm shrink-1 xl:shrink-0 max-w-full">
                    <img src="/images/europa.webp" alt="Unión Europea FEDER" className="h-6 w-auto object-contain opacity-90" />
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-all duration-300 shadow-[0_0_20px_rgba(192,132,252,0.2)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] no-underline w-full sm:w-auto text-center"
                >
                  Pedir demostración en tu espacio
                </a>
                <a
                  href="mailto:info@murcielagosmalaga.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 backdrop-blur-sm no-underline w-full sm:w-auto text-center"
                >
                  Escribir al equipo <ArrowRight size={15} aria-hidden="true" className="opacity-70" />
                </a>
              </div>
            </motion.div>

            {/* ── Reproductor de Vídeo MuMa VR ── */}
            <div className="flex flex-col gap-3 lg:gap-4 w-full relative h-fit sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-white/10 shadow-[0_30px_60px_rgba(31,225,167,0.15)] group"
              >
                {/* Etiqueta visual */}
                <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  Experiencia VR 360
                </div>

                <video
                  src="/videos/MuMaBAT-VR.mp4"
                  controls
                  playsInline
                  title="Vídeo Demostrativo MuMa Bat Cave Experience VR - Educación Ambiental"
                  aria-label="Reproductor de vídeo demostrativo de Realidad Virtual para explorar cuevas de murciélagos"
                  poster="/images/chica-realidad-virtual.webp"
                  className="w-full h-full object-cover object-center relative z-10"
                />
              </motion.div>
              <p className="text-center text-texto-secundario text-xs mt-2 italic">
                *Activa el sonido para disfrutar de la experiencia inmersiva de bioacústica.
              </p>
            </div>
          </div>

          {/* ── 4 pilares del servicio — fila compacta ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PILARES.map(({ titulo, desc, img, posicion = 'center' }, i) => (
              <motion.div
                key={titulo}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{
                  oculto: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                }}
                className="relative rounded-xl overflow-hidden flex flex-col border border-white/5 hover:border-purple-400 transition-colors duration-300"
              >
                {/* Imagen superior */}
                <div className="relative h-40 shrink-0">
                  <img src={img} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ objectPosition: posicion }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-fondo-superficie/70 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Texto inferior */}
                <div className="p-4 bg-fondo-superficie flex-1">
                  <p className="text-sm font-bold text-marca-principal mb-1">{titulo}</p>
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
              Ficha técnica
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPECS.map(({ label, valor }) => (
                <div key={label} className="bg-fondo-superficie rounded-xl px-4 py-3" style={{ border: '1px solid rgba(192,132,252,0.6)' }}>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-texto-secundario/50 uppercase mb-1">{label}</p>
                  <p className="text-sm font-semibold text-marca-principal">{valor}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Franja de financiación europea */}
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
            className="mt-16 rounded-2xl bg-white/5 px-8 py-10"
          >
            <p className="text-xs font-bold tracking-[0.2em] text-marca-principal uppercase mb-8 text-center">
              Proyecto financiado por
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { src: '/images/europa.webp', alt: 'Unión Europea — Fondo Europeo de Desarrollo Regional' },
                { src: '/images/polo-contenido-digital.webp', alt: 'Polo de Contenidos Digitales de Málaga' },
                { src: '/images/Camara-malaga-150x150.webp', alt: 'Cámara de Comercio de Málaga' },
                { src: '/images/centro-europeo-empresas.webp', alt: 'Centro Europeo de Empresas e Innovación' },
              ].map((logo, i) => (
                <div key={i} className=" rounded-xl px-5 py-3 flex items-center justify-center">
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
              La Batcave Experience es el resultado comercial del proyecto europeo ST3ER (Grant Agreement Nº101121592), financiado por el programa COSME-SMP de la Unión Europea e impulsado por la red La Brújula XR.
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
          2b. FORMULARIO DE CONTACTO — justo después de conocer el servicio
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="demo"
        className="relative py-20 px-6 overflow-hidden bg-fondo-secundario border-t border-white/5"
        aria-labelledby="form-titulo-inline"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] text-marca-principal uppercase mb-4">
              Solicita tu demostración gratuita — sin compromiso
            </p>
            <h2
              id="form-titulo-inline"
              className="font-bold leading-tight tracking-tight text-texto-titulo mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              ¿Cuándo llevamos la cueva a tu espacio?
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-md mx-auto">
              Cuéntanos qué espacio tienes y qué servicio te interesa. Respondemos en menos de 48 h con una propuesta a medida.
            </p>
          </motion.div>

          <FormularioMuma
            tablaBD="solicitudes_vr"
            asuntoCorreo="[Web VR] Solicitud demostración"
            textoBoton="SOLICITAR DEMOSTRACIÓN GRATUITA"
            selectName="tipo_espacio"
            selectLabel="¿Qué tipo de espacio representas?"
            opcionesSelect={[
              { valor: 'museo', texto: 'Museo o centro cultural' },
              { valor: 'educativo', texto: 'Centro educativo (colegio, instituto)' },
              { valor: 'ayuntamiento', texto: 'Ayuntamiento o institución pública' },
              { valor: 'empresa', texto: 'Empresa o espacio corporativo' },
              { valor: 'evento', texto: 'Evento, feria o congreso' },
              { valor: 'otro', texto: 'Otro' },
            ]}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2c. A QUIÉN VA DIRIGIDO
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-fondo-secundario py-20 px-6 border-t border-white/5" aria-labelledby="clientes-titulo">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-4">
              Llevamos la experiencia a tu espacio
            </p>
            <h2
              id="clientes-titulo"
              className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug"
            >
              ¿A quién va dirigido?
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
              MuMa Bat Cave Experience VR se adapta a cualquier espacio, como actividades extraescolares o museos, que quieran acercar la biodiversidad subterránea a su público de forma responsable mediante tecnología inmersiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLIENTES.map(({ tipo, desc, img }, i) => (
              <motion.div
                key={tipo}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{
                  oculto: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                }}
                className="bg-fondo-superficie rounded-2xl overflow-hidden border border-white/5 hover:border-purple-400 transition-colors duration-300"
              >
                {/* Imagen superior */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={img}
                    alt={`Educación ambiental VR para ${tipo} - Murciélagos Málaga`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fondo-superficie/80 to-transparent" />
                </div>
                {/* Contenido */}
                <div className="p-5">
                  <p className="text-sm font-bold text-marca-principal mb-2">{tipo}</p>
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
              Consulta disponibilidad para tu espacio <ArrowRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2d. CTA INTERMEDIO — ¿Quieres vivir una experiencia inmersiva?
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-fondo-base py-16 px-6 border-t border-white/5" aria-labelledby="cta-inmersivo-titulo">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              id="cta-inmersivo-titulo"
              className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-6 leading-snug"
            >
              ¿Quieres vivir una experiencia inmersiva como esta?
            </h2>
            <p className="text-texto-secundario leading-relaxed mb-4 max-w-2xl mx-auto">
              Lleva la experiencia MuMa VR a tu empresa, congreso, aula, feria o espacio cultural. Ofrecemos un innovador recorrido en Realidad Virtual por cuevas reales escaneadas en 3D, combinando tecnología, ciencia y conservación para conectar a las personas con los murciélagos y su hábitat, sin alterar el entorno natural.
            </p>
            <p className="text-texto-secundario leading-relaxed mb-8 max-w-2xl mx-auto">
              Creamos experiencias inmersivas, educativas y divulgativas que inspiran, informan y sensibilizan sobre biodiversidad, sostenibilidad y patrimonio natural.
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
            >
              Contáctanos <ArrowRight size={16} aria-hidden="true" />
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
              El ecosistema digital completo
            </p>
            <h2
              id="ecosistema-titulo"
              className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-5 leading-snug"
            >
              La experiencia presencial es el centro.{' '}
              <span className="text-texto-titulo">Estos módulos digitales la amplían.</span>
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
              Contenido interactivo, educativo y gamificado que extiende
              el impacto de MuMa más allá del evento.
            </p>
          </motion.div>

          {/* Grid 3 módulos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MODULOS.map((modulo, i) => (
              <CardModulo key={modulo.titulo} {...modulo} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3b. MUSEO VIRTUAL — Hero clickeable con preview de la web
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 px-6 bg-fondo-base border-t border-white/5" aria-labelledby="museo-virtual-titulo">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center"
          >
            <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-3">
              Ya disponible · Acceso libre
            </p>
            <h2
              id="museo-virtual-titulo"
              className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-3 leading-snug"
            >
              Museo Virtual de Murciélagos
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
              Explora nuestro museo digital en Spatial.io: modelos 3D de especies, hábitats y bioacústica sin barreras geográficas.
            </p>
          </motion.div>

          <motion.a
            href="https://murcielagosmalaga.com/museo-virtual/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="group block rounded-2xl overflow-hidden border border-purple-400/40 hover:border-purple-400 transition-all duration-300 shadow-[0_0_40px_rgba(192,132,252,0.12)] hover:shadow-[0_0_60px_rgba(192,132,252,0.3)] no-underline"
            aria-label="Ir al Museo Virtual de Murciélagos Málaga"
          >
            {/* Barra de navegador simulada */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2535] border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" aria-hidden="true"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true"></span>
              <div className="flex-1 ml-2 bg-white/5 rounded-md px-3 py-1.5 flex items-center gap-2">
                <span className="text-[11px] text-white/50 font-mono truncate">murcielagosmalaga.com/museo-virtual/</span>
                <ArrowRight size={12} className="text-marca-principal ml-auto shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </div>

            {/* Screenshot con overlay y CTA flotante */}
            <div className="relative aspect-[16/8] overflow-hidden">
              <img
                src="/images/cueva-nerja.webp"
                alt="Cueva de Nerja - Museo Virtual de Murciélagos Málaga"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: 'linear-gradient(to top, rgba(11,17,23,0.80) 0%, rgba(11,17,23,0.30) 55%, rgba(11,17,23,0.10) 100%)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="bg-marca-principal/90 backdrop-blur-sm text-white font-bold text-sm px-7 py-3.5 rounded-xl flex items-center gap-3 shadow-[0_8px_30px_rgba(192,132,252,0.5)] group-hover:scale-110 group-hover:shadow-[0_8px_50px_rgba(192,132,252,0.75)] transition-all duration-300">
                  <ArrowRight size={18} />
                  Explorar el Museo Virtual
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3c. EVENTOS REALIZADOS
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
              Presencia demostrada
            </p>
            <h2
              id="eventos-titulo"
              className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug"
            >
              La experiencia ya ha llegado a cuatro países.
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl">
              Más de 600 personas han vivido MuMa Bat Cave Experience VR en eventos reales.
              Estos son los resultados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EVENTOS.map(({ lugar, pais, fecha, asistentes, destacado, img }, i) => (
              <motion.div
                key={lugar}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{
                  oculto: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                }}
                className="relative rounded-2xl overflow-hidden border border-purple-400/60 min-h-50 flex flex-col justify-end"
              >
                {/* Imagen de fondo */}
                <img
                  src={img}
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
                      <p className="font-bold text-marca-principal text-base">{lugar}</p>
                      <p className="text-xs text-white/60">{pais} · {fecha}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold text-marca-principal">{asistentes}</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">asistentes</p>
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
          3c. PROYECTOS DESTACADOS
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-fondo-secundario py-20 px-6 border-t border-white/5" aria-labelledby="proyectos-titulo">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="oculto" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-4">
              Lo que hacemos
            </p>
            <h2 id="proyectos-titulo" className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug">
              Cuevas 3D con RV y otros proyectos
            </h2>
            <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
              Son ya muchas las empresas, instituciones y centros escolares que impulsan iniciativas de
              conservación, educación ambiental y restauración ecológica con nosotros.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {([
              {
                titulo: 'MuMa VR — Cuevas 3D',
                desc: 'Con MuMa VR ofrecemos una experiencia inmersiva en cuevas 3D, combinando tecnología y patrimonio para explorar el mundo subterráneo como nunca antes.',
                img: '/images/VR-Malaga1920.png',
                href: '#demo',
              },
              {
                titulo: 'Bat Night en Málaga',
                desc: 'Bat Night es una iniciativa de divulgación y conservación que acerca al público al fascinante mundo de los murciélagos.',
                img: '/images/Bat-Nigt-Malaga-1.webp',
                href: '/bat-night',
              },
              {
                titulo: 'Divulgación en Plaza Mayor',
                desc: 'En colaboración con Plaza Mayor Málaga realizamos eventos y actividades educativas para conectar a la comunidad con el conocimiento y la cultura de forma participativa.',
                img: '/images/Proyecto_palazaMayor.webp',
                href: '#demo',
              },
            ] as { titulo: string; desc: string; img: string; href: string }[]).map(({ titulo, desc, img, href }, i) => (
              <motion.div
                key={titulo}
                initial="oculto" whileInView="visible" viewport={{ once: true }}
                variants={{
                  oculto: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1 } },
                }}
                className="bg-fondo-superficie rounded-2xl overflow-hidden border border-white/5 hover:border-purple-400 transition-colors duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={img}
                    alt={titulo}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fondo-superficie/80 to-transparent" aria-hidden="true" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm font-bold text-marca-principal mb-2">{titulo}</p>
                  <p className="text-xs text-texto-secundario leading-relaxed flex-1">{desc}</p>
                  <a
                    href={href}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-marca-principal hover:opacity-80 transition-opacity no-underline"
                  >
                    Más información <ArrowRight size={13} aria-hidden="true" />
                  </a>
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
          Avalan y colaboran con MuMa
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
            const track = e.currentTarget.querySelector('[data-carousel-track]') as HTMLElement | null
            if (track) track.style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            const track = e.currentTarget.querySelector('[data-carousel-track]') as HTMLElement | null
            if (track) {
              setTimeout(() => {
                if (track) track.style.animationPlayState = 'running'
              }, 1500)
            }
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.cursor = 'grabbing'
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.cursor = 'grab'
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

    </main>
  )
}
