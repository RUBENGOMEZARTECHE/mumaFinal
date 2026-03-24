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

/* ═══════════════════════════════════════════════════════════════════════════
   DATOS
   ═══════════════════════════════════════════════════════════════════════════ */

const PILARES = [
  { titulo: 'Contenido de cueva real',        desc: 'Desarrollado desde el conocimiento directo del hábitat subterráneo. No es recreación — es documentación.',        img: '/images/dentro-cueva.webp' },
  { titulo: 'Llegamos con la cueva',          desc: 'Montamos, operamos y recogemos. Tu espacio acoge la experiencia sin obra ni infraestructura adicional.',          img: '/images/fotos_batnight/plaza1.webp' },
  { titulo: 'Divulgador científico incluido', desc: 'Cada sesión la conduce alguien que conoce los murciélagos de verdad. La tecnología tiene fondo.',                 img: '/images/antonio-moret.webp', posicion: '50% 20%' },
  { titulo: 'Aval de proyecto europeo',       desc: 'Investigación respaldada por SECEMU, Fundación Cueva de Nerja y Fondo Europeo de Desarrollo Regional (FEDER).', img: '/images/Proyecto_palazaMayor.webp' },
]

// Acento visual por módulo — muy sutil, diferencia sin romper coherencia
const MODULOS = [
  {

    titulo: 'MuMa Bats 360',
    descripcion:
      'Vídeos inmersivos en 360° grabados en entornos reales de murciélagos. Accesibles desde navegador o gafas VR, sin alterar los hábitats documentados.',
    acento: 'rgba(139,156,244,0.08)',
    proximamente: true,
  },
  {

    titulo: 'MuMa Virtual Bats',
    descripcion:
      'Fichas interactivas de especies con modelos 3D, hábitat, estado de conservación y archivo acústico. Un recurso científico y visual para museos, centros educativos y divulgación.',
    acento: 'rgba(139,156,244,0.06)',
    proximamente: true,
  },
  {

    titulo: 'MuMa Game',
    descripcion:
      'Experiencia gamificada basada en conocimiento científico real. Para reforzar aprendizaje y participación en aulas, eventos y actividades de sensibilización.',
    acento: 'rgba(139,156,244,0.08)',
    proximamente: true,
  },
  {

    titulo: 'Virtual Museum',
    descripcion:
      'Espacio digital para explorar el archivo visual, sonoro y narrativo de MUMA. Una experiencia expositiva online que no necesita paredes.',
    acento: 'rgba(139,156,244,0.06)',
    proximamente: false,
    imagen: '/images/museo-virtual.png',
    href: 'https://www.spatial.io/s/Museo-Virtual-de-Murcielagos-Malaga-6543c01bc7242548905698ae?share=1702051378273231834',
  },
]

const SPECS = [
  { label: 'Hardware',             valor: 'Meta Quest 3 / 3S' },
  { label: 'Duración',             valor: '5, 15 o 30 minutos' },
  { label: 'Idiomas',              valor: 'Español / Inglés' },
  { label: 'Cuevas reales',        valor: 'Nagüeles + Belda (Málaga)' },
  { label: 'Puntos interactivos',  valor: '11 estaciones' },
  { label: 'Tablet virtual',       valor: 'Mapa GPS, especies, fichas' },
]

const EVENTOS = [
  {
    lugar: 'Plaza Mayor Málaga',
    pais: 'España',
    fecha: 'Julio 2025',
    asistentes: '200–300',
    destacado: 'Zona VR, exposición sobre murciélagos, talleres infantiles y charlas divulgativas.',
    img: '/images/plaza1.webp',
  },
  {
    lugar: 'Cueva de Nerja',
    pais: 'España',
    fecha: 'Septiembre 2025',
    asistentes: '50+',
    destacado: 'Instalación de refugios e inicio de colaboración científica con futuras investigaciones programadas.',
    img: '/images/Bat-Nigt-Malaga-1.webp',
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
  { tipo: 'Museos y Centros de Visitantes',             desc: 'Espacios culturales y científicos que buscan experiencias innovadoras para sus visitantes.',              img: '/images/museos.webp' },
  { tipo: 'Administraciones e Instituciones Públicas',  desc: 'Ayuntamientos, diputaciones y organismos que impulsan la divulgación ambiental.',                         img: '/images/ayuntamientos.webp' },
  { tipo: 'Hoteles, Campings y Campos de Golf',         desc: 'Espacios de ocio que quieren ofrecer una actividad diferenciadora y sostenible.',                          img: '/images/campo-golf.jpg' },
  { tipo: 'Espacios Naturales y Reservas',              desc: 'Parques naturales y reservas que necesitan acercar su biodiversidad sin impacto.',                         img: '/images/cuevas-nerja.webp' },
  { tipo: 'Centros Educativos y AMIPAs',                desc: 'Colegios, institutos y asociaciones de padres que buscan educación ambiental activa.',                     img: '/images/educacion-ambiental.webp' },
  { tipo: 'ONGs y Asociaciones de Conservación',        desc: 'Entidades que trabajan por la protección de la naturaleza y necesitan herramientas de sensibilización.',   img: '/images/monitorizacion-refugios-voluntarios.webp' },
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
function CardModulo({ titulo, descripcion, acento, proximamente, imagen, href, index }) {
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
            className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-acento-tecnologico text-acento-tecnologico hover:bg-acento-tecnologico hover:text-white transition-all duration-200 no-underline w-full"
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

export default function RealidadVirtual() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const nombre       = data.get('nombre') || ''
    const email        = data.get('email') || ''
    const organizacion = data.get('organizacion') || ''
    const tipoEspacio  = data.get('tipo_espacio') || ''
    const participantes = data.get('participantes') || ''
    const fecha        = data.get('fecha') || ''

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
        <title>
          Realidad Virtual — Experiencias inmersivas sobre murciélagos | MUMA BAT COMPANY
        </title>
        <meta
          name="description"
          content="Tecnología inmersiva al servicio de los murciélagos. MuMa VR² Cave Experience y cuatro herramientas digitales para museos, ayuntamientos, hoteles y centros educativos."
        />
        <meta property="og:title" content="Realidad Virtual | MUMA BAT COMPANY" />
        <meta
          property="og:description"
          content="Cinco herramientas digitales para acercar a las personas a una especie que casi nadie ha visto de cerca."
        />
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
          className="relative flex items-center justify-center text-center overflow-hidden"
          style={{ minHeight: '62vh' }}
          aria-label="Cabecera Realidad Virtual"
        >
          <img
            src="/images/VR-Malaga.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(11,17,23,0.82) 0%, rgba(11,17,23,0.65) 50%, rgba(11,17,23,0.94) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Halo VR — lila atmosférico */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(192,132,252,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 py-32 lg:py-40">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[10px] font-bold tracking-[0.25em] text-marca-principal uppercase mb-5"
            >
              Realidad Virtual · MUMA BAT COMPANY
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-bold leading-[1.08] tracking-tight text-texto-titulo mb-6"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
            >
              Tecnología inmersiva al servicio de los murciélagos.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg text-texto-secundario leading-relaxed max-w-xl mx-auto mb-10"
            >
              Cinco herramientas digitales para acercar a las personas
              a una especie que casi nadie ha visto de cerca.
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
                Pedir demostración <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/20 text-texto-principal hover:bg-white/5 hover:border-white/30 transition-all duration-200 no-underline"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
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
                Investigación aplicada · Experiencia llave en mano
              </p>
              <h2
                id="cave-experience-titulo"
                className="font-bold leading-[1.1] tracking-tight text-texto-titulo"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
              >
                MuMa VR² Cave Experience
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
                  {' '}a tu espacio.
                </p>
                <p className="text-texto-secundario leading-relaxed mb-4">
                  Visitarlas en persona sería inviable: el acceso humano daña los hábitats donde nacen. MUMA lleva la cueva a tu espacio para que tu público viva lo que de otro modo destruiría.
                </p>
                <p className="text-texto-secundario leading-relaxed mb-8">
                  Con gafas de realidad virtual, el visitante entra en una cueva habitada por murciélagos y comprende su papel en el ecosistema. Sin pisar la cueva. Sin alterar nada. Con el rigor de quien lleva años documentando ese mundo.
                </p>

                {/* Citas de posicionamiento */}
                <blockquote className="border-l-2 border-marca-principal pl-5 mb-8">
                  <p className="text-texto-principal italic leading-relaxed text-sm">
                    "Llevamos la cueva a las personas, no las personas a la cueva."
                  </p>
                  <cite className="text-xs text-texto-secundario/60 not-italic mt-1 block">
                    MUMA BAT COMPANY
                  </cite>
                </blockquote>

                {/* Avales — logos de respaldo */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-texto-secundario/50 uppercase mb-3">Avalado por</p>
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
                    Pedir demostración en tu espacio
                  </a>
                  <a
                    href="mailto:info@murcielagosmalaga.com"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/20 text-texto-principal hover:bg-white/8 hover:border-white/35 transition-all duration-200 no-underline"
                  >
                    Escribir al equipo <ArrowRight size={15} aria-hidden="true" />
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
                  className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-fondo-superficie border border-white/5"
                >
                  <img
                    src="/images/chica-realidad-virtual.webp"
                    alt="Persona experimentando MuMa VR² Cave Experience con gafas de realidad virtual"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(11,17,23,0.4) 0%, transparent 50%)' }}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Imagen secundaria de apoyo */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.14 }}
                  className="relative rounded-xl overflow-hidden aspect-[16/8] bg-fondo-superficie border border-white/5"
                >
                  <img
                    src="/images/niña-feliz-realidad-virtual.webp"
                    alt="Murciélagos Málaga — experiencia de realidad virtual en entorno natural"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    style={{ filter: 'brightness(1.15) contrast(1.05) saturate(1.1)' }}
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
              {PILARES.map(({ titulo, desc, img, posicion = 'center' }, i) => (
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
                    <img src={img} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ objectPosition: posicion }} />
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
                Ficha técnica
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SPECS.map(({ label, valor }) => (
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
                Proyecto financiado por
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { src: '/images/europa.webp', alt: 'Unión Europea — Fondo Europeo de Desarrollo Regional' },
                  { src: '/images/polo-contenido-digital.webp', alt: 'Polo de Contenidos Digitales de Málaga' },
                  { src: '/images/Camara-malaga-150x150.webp', alt: 'Cámara de Comercio de Málaga' },
                  { src: '/images/centro-europeo-empresas.webp', alt: 'Centro Europeo de Empresas e Innovación' },
                ].map((logo, i) => (
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
                Llevamos la experiencia a tu espacio
              </p>
              <h2
                id="clientes-titulo"
                className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4 leading-snug"
              >
                ¿A quién va dirigido?
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
                MuMa VR² Cave Experience se adapta a cualquier espacio que quiera acercar la naturaleza a su público de forma responsable.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLIENTES.map(({ tipo, desc, img }, i) => (
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
                      src={img}
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
                Consulta disponibilidad para tu espacio <ArrowRight size={15} aria-hidden="true" />
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
                <span className="text-texto-titulo">Estos cuatro módulos la amplían.</span>
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-xl mx-auto">
                Contenido interactivo, educativo y gamificado que extiende
                el impacto de MuMa más allá del evento.
              </p>
            </motion.div>

            {/* Grid 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MODULOS.map((modulo, i) => (
                <CardModulo key={modulo.titulo} {...modulo} index={i} />
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
                    oculto:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } },
                  }}
                  className="relative rounded-2xl overflow-hidden border border-white/5 min-h-50 flex flex-col justify-end"
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
                        <p className="font-bold text-white text-base">{lugar}</p>
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
                Con MuMa, la realidad virtual no sustituye la naturaleza
              </p>
              <h2
                id="cta-titulo"
                className="font-bold leading-tight tracking-tight text-texto-titulo mb-4"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                La protege.
              </h2>
              <p className="text-texto-secundario leading-relaxed max-w-md mx-auto mb-8">
                Cada experiencia impulsa investigación, divulgación
                y acciones de conservación. Pide una demostración en tu espacio.
              </p>
              {/* Garantías breves */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs text-texto-secundario/70">
                {[
                  'Sin compromiso de contratación',
                  'MUMA lleva todo el equipo',
                  'Respuesta en 48 h',
                ].map((item) => (
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
                <h3 className="text-xl font-bold text-texto-titulo mb-2">Solicitud recibida</h3>
                <p className="text-texto-secundario text-sm leading-relaxed">
                  Nos pondremos en contacto contigo en menos de 48 horas
                  para coordinar la demostración.
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
                    id="nombre" name="nombre" label="Nombre"
                    placeholder="Tu nombre" required autoComplete="name"
                  />
                  <Campo
                    id="email" name="email" type="email" label="Correo electrónico"
                    placeholder="tu@email.com" required autoComplete="email"
                  />
                </div>
                <Campo
                  id="organizacion" name="organizacion" label="Organización"
                  placeholder="Museo, ayuntamiento, hotel…" required
                />

                {/* Select — tipo de espacio */}
                <div>
                  <label
                    htmlFor="tipo-espacio"
                    className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5"
                  >
                    Tipo de espacio
                  </label>
                  <select
                    id="tipo-espacio" name="tipo_espacio" required
                    defaultValue=""
                    className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-marca-principal/50 transition-colors duration-200 appearance-none"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="museo">Museo o centro de interpretación</option>
                    <option value="ayuntamiento">Ayuntamiento o diputación</option>
                    <option value="hotel">Hotel o espacio turístico</option>
                    <option value="educativo">Centro educativo</option>
                    <option value="evento">Evento o feria</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Campo
                    id="participantes" name="participantes" label="Participantes estimados"
                    placeholder="Ej: 100–200 personas"
                  />
                  <Campo
                    id="fecha" name="fecha" label="Fecha tentativa"
                    placeholder="Ej: junio 2026"
                  />
                </div>

                <input
                  type="hidden" name="_subject"
                  value="Solicitud demostración VR — MuMa VR² Cave Experience"
                />

                <div className="flex items-center gap-3">
                  <input type="checkbox" name="privacidad" required className="accent-marca-principal w-4 h-4 shrink-0" />
                  <span className="text-xs text-texto-secundario/60 italic">Acepto el tratamiento de datos para fines de consultoría ambiental.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-marca-principal text-texto-sobre-accion font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-marca-principal-hover transition-all active:scale-95"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                  ENVIAR A DIRECCIÓN TÉCNICA
                </button>

                <p className="text-xs text-center text-texto-secundario/50">
                  O escríbenos a{' '}
                  <a
                    href="mailto:info@murcielagosmalaga.com"
                    className="text-marca-principal hover:opacity-80 transition-opacity no-underline"
                  >
                    info@murcielagosmalaga.com
                  </a>
                  {' '}o por{' '}
                  <a
                    href="https://wa.me/34664213450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-marca-principal hover:opacity-80 transition-opacity no-underline"
                  >
                    WhatsApp
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
              ¿Buscas otro servicio?{' '}
              <Link
                to="/#servicios"
                className="text-marca-principal hover:opacity-80 transition-opacity duration-200 no-underline"
              >
                Ver todos los servicios
              </Link>
            </motion.p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
