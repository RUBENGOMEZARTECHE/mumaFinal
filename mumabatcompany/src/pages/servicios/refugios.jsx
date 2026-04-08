import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

// Importación de componentes comunes
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Refugios() {
  // --- ESTADOS ---
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [hectareas, setHectareas] = useState(1);

  // --- DATOS CARRUSEL ---
  const modelos = [
    {
      titulo: "Refugio Artesanal Individual",
      subtitulo: "Jardines y Entornos Urbanos",
      descripcion:
        "Diseño compacto de 2 cámaras. Fabricado a mano con madera selecta y detalles en impresión 3D. Ideal para fachadas o árboles en entornos residenciales.",
      iconos: ["Madera Técnica", "Resistente UV", "Artesanal"],
      color: "from-emerald-500/20",
      imagen: "/images/refugios/Refugio-1.webp",
    },
    {
      titulo: "Modelo Finca Agrícola",
      subtitulo: "Alta Capacidad de Control",
      descripcion:
        "Refugio de gran formato diseñado para maximizar la colonización en cultivos. Ventilación reforzada y aislamiento térmico superior para insolación intensa.",
      iconos: ["Gran Formato", "Aislamiento Pro", "Agrícola"],
      color: "from-marca-principal/20",
      imagen: "/images/refugios/Refugio-2.webp",
    },
    {
      titulo: "Estación Smart IoT",
      subtitulo: "Monitorización Científica",
      descripcion:
        "Equipado con sensores infrarrojos de ocupación y telemetría de temperatura/humedad. Envía datos en tiempo real para estudios de biodiversidad.",
      iconos: ["Sensores 4.0", "Telemetría", "Resistente"],
      color: "from-blue-500/20",
      imagen: "/images/refugios/Refugio-3.webp",
    },
  ];

  // --- LÓGICA ---
  const siguiente = () =>
    setIndiceActivo((prev) => (prev + 1) % modelos.length);
  const anterior = () =>
    setIndiceActivo((prev) => (prev - 1 + modelos.length) % modelos.length);

  const costePesticidaPorHa = 250;
  const porcentajeAhorro = 0.7;
  const ahorroDinero = hectareas * costePesticidaPorHa * porcentajeAhorro;
  const refugiosNecesarios = Math.ceil(hectareas * 1.5);

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>Refugios para murciélagos | MUMA BAT COMPANY</title>
        <meta
          name="description"
          content="Infraestructura de conservación y control biológico de plagas con tecnología 3D y madera técnica."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-fondo-base pt-20">
        {/* ── HERO BANNER (Estilo BatBnB) ── */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black border-b border-white/5">
          {/* Fondo de Vídeo */}
          <div className="absolute inset-0 z-0 bg-[#050505]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            >
              <source src="/videos/refugio-rv.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-fondo-base via-[#050505]/50 to-[#050505]/20 z-10" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] z-20 pointer-events-none" />
          </div>

          {/* Contenido Inmersivo */}
          <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-marca-principal/30 bg-marca-principal/10 text-marca-principal text-[10px] font-bold uppercase tracking-[0.3em]"
            >
              Control Biológico Natural
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              Protege el entorno. <br />
              <span className="text-marca-principal">Rescata la fauna.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Los murciélagos consumen miles de insectos nocturnos reemplazando pesticidas sintéticos. Ofréceles un hogar con diseño de madera técnica prémium.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <a href="#catalogo-modelos" onClick={(e) => { e.preventDefault(); document.getElementById('catalogo-modelos')?.scrollIntoView({ behavior: 'smooth' }) }} className="inline-flex items-center gap-2 px-8 py-5 bg-marca-principal text-black font-bold rounded-2xl hover:bg-marca-principal-hover hover:scale-105 transition-all shadow-[0_0_30px_rgba(31,225,167,0.3)] no-underline">
                Explorar Catálogo de Refugios
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── BANNER CTA SUPERIOR ── */}
        <div className="bg-fondo-secundario border-b border-white/5 px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-texto-secundario">
              <span className="text-texto-titulo font-semibold">
                ¿Cuánto te cuesta el pesticida este año?
              </span>{" "}
              Un refugio MUMA es una inversión única que trabaja 365 días sin coste operativo.
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href="mailto:info@murcielagosmalaga.com?subject=Solicitud%20presupuesto%20refugios%20MUMA"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                Pedir presupuesto gratis
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border border-white/15 text-texto-principal hover:bg-fondo-superficie transition-all duration-200 no-underline"
              >
                WhatsApp directo
              </a>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN 1: DEFINICIÓN TÉCNICA ── */}
        <section id="definicion" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varianteSeccion}
              className="mb-16 max-w-4xl"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-marca-principal mb-4">
                Control biológico de plagas
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6 leading-tight">
                Tu finca está pagando pesticidas <br />
                <span className="text-marca-principal">
                  que la naturaleza haría gratis.
                </span>
              </h2>
              <p className="text-texto-secundario text-lg leading-relaxed">
                Un solo murciélago elimina hasta 1.200 insectos por hora. Un refugio MUMA instala una colonia activa en tu finca, viñedo o espacio urbano — sin químicos, sin mantenimiento y con respaldo científico de un proyecto europeo de investigación.
              </p>
            </motion.div>

            {/* ── 3 PILARES BATBNB STYLE ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 px-4 text-center">
              <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                  <img src="/images/batbnb/mosquitos.webp" alt="Reduce mosquitos y plagas" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                  Reduce Mosquitos y Plagas
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Un solo murciélago puede comer miles de insectos en una noche, convirtiéndolos en el sustituto perfecto de los pesticidas tóxicos. Ayudan a mantener tu jardín seguro para tu familia.
                </p>
              </motion.div>

              <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay: 0.1}} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                  <img src="/images/batbnb/habitat.webp" alt="Hábitat seguro para murciélagos" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                  Provee un Hábitat Seguro
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Los murciélagos están amenazados en todo el mundo y necesitan ayuda. Nuestros refugios ofrecen un hogar perfecto y térmicamente estable para que críen a sus crías a salvo de depredadores.
                </p>
              </motion.div>

              <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{delay: 0.2}} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                  <img src="/images/batbnb/bat.webp" alt="Aprende a amar al murciélago" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                  Aprende a amar a este animal
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  La idea de que son monstruos sedientos de sangre es un mito. Son tímidos, duermen de día y cazan de noche. Trátalos con respeto y serán los mejores vecinos de tu ecosistema.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varianteSeccion}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* MUMA */}
              <div className="rounded-3xl border border-marca-principal/20 overflow-hidden bg-marca-principal/5 shadow-2xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/images/refugios/Refugio murciélagos - Render realista_1.webp"
                    alt="Refugio MUMA de calidad"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-marca-principal text-black text-xs font-black px-3 py-1.5 rounded-full tracking-widest uppercase">
                    Estándar MUMA
                  </span>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 text-texto-principal text-sm">
                    <li className="flex gap-3"><Check size={16} className="text-marca-principal shrink-0 mt-0.5" /><span>Aislamiento térmico total — sin rendijas ni filtraciones.</span></li>
                    <li className="flex gap-3"><Check size={16} className="text-marca-principal shrink-0 mt-0.5" /><span>Sin clavos ni siliconas tóxicas que dañen al animal.</span></li>
                    <li className="flex gap-3"><Check size={16} className="text-marca-principal shrink-0 mt-0.5" /><span>Madera técnica certificada: no se dobla ni se agrieta al sol.</span></li>
                    <li className="flex gap-3"><Check size={16} className="text-marca-principal shrink-0 mt-0.5" /><span>Georeferenciados, numerados y con seguimiento científico.</span></li>
                  </ul>
                </div>
              </div>

              {/* Caja comercial mala */}
              <div className="rounded-3xl border border-red-500/20 overflow-hidden bg-red-500/5 shadow-2xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src="/images/batbnb/mala-caja.png"
                    alt="Caja comercial de baja calidad"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 50%', transform: 'scale(0.75)', filter: 'grayscale(50%) contrast(1.05)' }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-widest uppercase">
                    Caja Comercial
                  </span>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 text-texto-secundario text-sm opacity-80">
                    <li className="flex gap-3"><span className="text-red-400 shrink-0 mt-0.5">✕</span><span>Rendijas que filtran aire y humedad — el animal las abandona.</span></li>
                    <li className="flex gap-3"><span className="text-red-400 shrink-0 mt-0.5">✕</span><span>Clavos y siliconas que dañan las membranas del murciélago.</span></li>
                    <li className="flex gap-3"><span className="text-red-400 shrink-0 mt-0.5">✕</span><span>Madera de baja calidad que se deforma en 1-2 veranos.</span></li>
                    <li className="flex gap-3"><span className="text-red-400 shrink-0 mt-0.5">✕</span><span>Sin ventilación ni superficies de agarre interior.</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECCIÓN HOW IT WORKS (Estilo BatBnB) + VIDEO EXPLOTADO ── */}
        <section className="py-24 px-6 bg-white text-black overflow-hidden relative">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-center md:text-left">
                Cómo Funciona
              </h2>
              <p className="text-xl text-gray-600 mb-12 text-center md:text-left font-light leading-relaxed">
                Las unidades pueden colocarse en una pared exterior de una casa, muro alto de finca o un poste en tu patio. Cuando los murciélagos locales salgan de la hibernación, encontrarán tu refugio MUMA y lo llamarán hogar en poco tiempo.
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex flex-col items-center justify-center font-bold text-white shadow-lg">1</div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">Simulación Térmica</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Los espacios interiores imitan su hábitat natural (grietas) mediante madera técnica certificada. La estructura captura el calor del sol directo haciéndola appealing para las hembras lactantes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex items-center justify-center font-bold text-white shadow-lg">2</div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">Agarre Interior Perfecto</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Entran por un drop de 2 centímetros bajo la plataforma. El interior cuenta con ranurados CNC de precisión que permite que los murciélagos se agarren, escalen y cuelguen con total comodidad y seguridad.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex items-center justify-center font-bold text-white shadow-lg">3</div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">Inercia Nocturna</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Por la noche, cuando están listos para salir a cenar, usan el espacio bajo el refugio en caída libre para ganar momento e iniciar el vuelo de caza de plagas en tu parcela.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2 w-full">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] bg-black/5 aspect-[4/5] object-cover border border-gray-100 p-2">
                {/* VIDEO DE VISTA EXPLOTADA PARA SUSTITUIR LOS DIBUJOS ABURRIDOS */}
                <video
                  src="/videos/Refugio - v.Final - Vista explotada_3.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── SECCIÓN 2: CARRUSEL DE MODELOS ── */}
        <section id="catalogo-modelos" className="py-24 px-6 bg-fondo-secundario overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
                Catálogo MUMA
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo">
                Modelos exclusivos
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10 order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={indiceActivo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-marca-principal font-bold text-sm mb-2 block uppercase tracking-widest">
                      {modelos[indiceActivo].subtitulo}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-texto-titulo mb-6 leading-tight">
                      {modelos[indiceActivo].titulo}
                    </h3>
                    <p className="text-texto-secundario text-lg leading-relaxed mb-8">
                      {modelos[indiceActivo].descripcion}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-10">
                      {modelos[indiceActivo].iconos.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-fondo-superficie border border-white/5 text-xs font-bold text-texto-titulo"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-4">
                  <button
                    onClick={anterior}
                    className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-texto-titulo transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={siguiente}
                    className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-texto-titulo transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={indiceActivo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative aspect-square rounded-3xl bg-linear-to-br ${modelos[indiceActivo].color} to-transparent border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center`}
                  >
                    <img
                      src={modelos[indiceActivo].imagen}
                      alt={modelos[indiceActivo].titulo}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 3: VALOR DE MERCADO ── */}
        <section className="py-24 px-6 bg-fondo-base">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6">
                Más allá del ahorro:{" "}
                <span className="text-marca-principal">Valor de Mercado</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-3xl" style={{border:'2px solid transparent',backgroundImage:'linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)',backgroundOrigin:'border-box',backgroundClip:'padding-box,border-box'}}>
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <img src="/images/agricultura-control-biologico_resultado.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative p-8 bg-linear-to-t from-black/80 via-black/50 to-black/20">
                    <h4 className="text-xl font-bold text-texto-titulo mb-3">
                      Acceso a Mercados Premium
                    </h4>
                    <p className="text-sm text-texto-secundario leading-relaxed">
                      Facilita certificaciones ecológicas y de "Residuo Cero",
                      permitiendo vender cosechas a precios superiores.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-3xl" style={{border:'2px solid transparent',backgroundImage:'linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)',backgroundOrigin:'border-box',backgroundClip:'padding-box,border-box'}}>
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <img src="/images/campo-golf.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative p-8 bg-linear-to-t from-black/80 via-black/50 to-black/20">
                    <h4 className="text-xl font-bold text-texto-titulo mb-3">
                      Menos Horas de Maquinaria
                    </h4>
                    <p className="text-sm text-texto-secundario leading-relaxed">
                      Reduce pases de tractor, ahorrando combustible y evitando la
                      compactación excesiva del suelo.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-3xl" style={{border:'2px solid transparent',backgroundImage:'linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)',backgroundOrigin:'border-box',backgroundClip:'padding-box,border-box'}}>
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <img src="/images/colonia_murcielago01.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="relative p-8 bg-linear-to-t from-black/80 via-black/50 to-black/20">
                    <h4 className="text-xl font-bold text-texto-titulo mb-3">
                      Prevención Ininterrumpida
                    </h4>
                    <p className="text-sm text-texto-secundario leading-relaxed">
                      Vigilancia biológica 24/7 que actúa antes de que las plagas
                      depositen sus larvas en el fruto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 4: CALCULADORA ── */}
        <section
          id="agricultura"
          className="py-24 px-6 bg-fondo-secundario border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true }}
                variants={varianteSeccion}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6 text-balance">
                  Ahorra miles de Euros en pesticidas
                </h2>
                <p className="text-texto-secundario text-lg mb-8 leading-relaxed">
                  Sustituye tratamientos químicos recurrentes por una colonia
                  activa de quirópteros.
                </p>
                <div className="p-6 bg-linear-to-br from-violet-500/10 to-transparent rounded-2xl card-lila">
                  <h4 className="text-texto-titulo font-bold mb-4 flex items-center gap-2">
                    Plagas controladas:
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-texto-secundario uppercase tracking-widest font-bold">
                    <li>• Mosca del Olivo</li>
                    <li>• Polilla del Racimo</li>
                    <li>• Procesionaria</li>
                    <li>• Mosquito Tigre</li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-fondo-superficie p-8 rounded-3xl card-lila shadow-2xl"
              >
                <h3 className="text-xl font-bold text-texto-titulo mb-8 flex items-center gap-3">
                  {" "}
                  Calculadora de Ahorro
                </h3>
                <div className="mb-8">
                  <div className="flex justify-between mb-4 items-end">
                    <label className="text-sm font-bold text-texto-secundario uppercase tracking-widest">
                      Superficie
                    </label>
                    <span className="text-marca-principal font-mono text-2xl font-bold">
                      {hectareas} Ha
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={hectareas}
                    onChange={(e) => setHectareas(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-marca-principal"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between p-5 bg-black/20 rounded-2xl">
                    <span className="text-xs text-texto-secundario uppercase font-bold tracking-widest">
                      Ahorro anual
                    </span>
                    <span className="text-xl font-bold text-marca-principal">
                      ~ {ahorroDinero.toLocaleString()} €
                    </span>
                  </div>
                  <div className="flex justify-between p-5 bg-marca-principal/10 rounded-2xl border border-marca-principal/20">
                    <span className="text-xs text-texto-secundario uppercase font-bold tracking-widest">
                      Refugios MUMA
                    </span>
                    <span className="text-xl font-bold text-marca-principal">
                      {refugiosNecesarios}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 5: IMPACTO URBANO ── */}
        <section className="py-24 px-6 bg-fondo-base border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varianteSeccion}
              className="text-center mb-16"
            >
              <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
                Rendimiento Bio-Sostenible
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo">
                Impacto y Productividad Urbana
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-linear-to-br from-violet-500/10 to-transparent rounded-3xl card-lila flex flex-col items-center text-center group hover:opacity-90 transition-all">
                <h4 className="text-4xl font-extrabold text-texto-titulo mb-2">
                  +1.200
                </h4>
                <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-4">
                  Insectos / Hora
                </p>
                <p className="text-sm text-texto-secundario leading-relaxed">
                  Control biológico de mosquitos tigre sin químicos ni consumo
                  energético.
                </p>
              </div>
              <div className="p-8 bg-linear-to-br from-violet-500/10 to-transparent rounded-3xl card-lila flex flex-col items-center text-center group hover:opacity-90 transition-all">
                <h4 className="text-4xl font-extrabold text-texto-titulo mb-2">
                  0€
                </h4>
                <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-4">
                  Coste Operativo
                </p>
                <p className="text-sm text-texto-secundario leading-relaxed">
                  Elimina la dependencia de contratos de fumigación recurrentes
                  y tóxicos.
                </p>
              </div>
              <div className="p-8 bg-linear-to-br from-violet-500/10 to-transparent rounded-3xl card-lila flex flex-col items-center text-center group hover:opacity-90 transition-all">
                <h4 className="text-4xl font-extrabold text-texto-titulo mb-2">
                  100%
                </h4>
                <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-4">
                  Bio-Seguridad
                </p>
                <p className="text-sm text-texto-secundario leading-relaxed">
                  Entornos públicos libres de biocidas. Protección natural para
                  zonas infantiles.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 bg-white rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] shrink-0">Datos avalados por</p>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                <a href="https://secemu.org/" target="_blank" rel="noreferrer">
                  <img src="/images/Logo_SECEMU.webp" alt="SECEMU" className="h-8 object-contain transition-all" />
                </a>
                <a href="https://www.batcon.org/" target="_blank" rel="noreferrer">
                  <img src="/images/EUROBATS_logo.webp" alt="EUROBATS" className="h-8 object-contain transition-all" />
                </a>
                <a href="https://europa.eu/" target="_blank" rel="noreferrer">
                  <img src="/images/europa.webp" alt="Unión Europea" className="h-8 object-contain transition-all" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECCIÓN 6: FAQ ── */}
        <section className="py-24 px-6 bg-fondo-secundario border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varianteSeccion}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-texto-titulo mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-texto-secundario italic">
                Respuestas técnicas para una implementación segura y efectiva.
              </p>
            </motion.div>
            <div className="space-y-4">
              {[
                {
                  q: "¿Existe riesgo sanitario para las personas?",
                  a: "Ninguno. Los murciélagos urbanos huyen del contacto humano. Nuestros refugios garantizan la higiene en entornos públicos.",
                },
                {
                  q: "¿Cuánto tarda en colonizarse un refugio?",
                  a: "Suele ocurrir entre los 3 y 12 meses, dependiendo de la época y el entorno biológico del parque o finca.",
                },
                {
                  q: "¿Requieren limpieza los refugios MUMA?",
                  a: "No. El diseño incluye una ranura de caída libre que permite que el guano caiga de forma natural al suelo, evitando acumulaciones.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-linear-to-br from-violet-500/10 to-transparent rounded-2xl card-lila"
                >
                  <h4 className="text-texto-titulo font-bold mb-2">
                    {item.q}
                  </h4>
                  <p className="text-sm text-texto-secundario leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECCIÓN CREDIBILIDAD ── */}
        <section className="py-16 px-6 bg-fondo-secundario border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-marca-principal mb-3">Respaldo científico</p>
              <h2 className="text-2xl md:text-3xl font-bold text-texto-titulo">No somos una tienda. Somos investigadores.</h2>
              <p className="text-texto-secundario mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                MUMA nació de la investigación de campo, no del marketing. Nuestros refugios están diseñados con datos reales de colonización obtenidos en proyectos europeos en España, Portugal y Eslovenia.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "+1.000", label: "personas con experiencia directa en 2025" },
                { num: "3", label: "países del proyecto europeo de investigación" },
                { num: "10+", label: "años de estudio de colonias de murciélagos" },
                { num: "0€", label: "coste operativo tras la instalación" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-linear-to-br from-violet-500/10 to-transparent rounded-2xl card-lila text-center">
                  <p className="text-3xl font-extrabold text-texto-titulo mb-1">{item.num}</p>
                  <p className="text-xs text-texto-secundario leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-white rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-6">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] shrink-0">Financiado por</p>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                <img src="/images/EUROBATS_logo.webp" alt="EUROBATS" className="h-8 object-contain" />
                <img src="/images/Logo_SECEMU.webp" alt="SECEMU" className="h-8 object-contain" />
                <img src="/images/europa.webp" alt="Proyecto Europeo" className="h-8 object-contain" />
                <img src="/images/junta-andalucia.webp" alt="Junta de Andalucía" className="h-8 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 7: CONTACTO ── */}
        <section
          id="contacto"
          className="bg-fondo-base py-24 px-6 border-t border-white/5 text-center"
        >
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={varianteSeccion}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
              Sin compromiso · Respuesta en 24h
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-4">
              Cuéntanos tu finca o espacio.
            </h2>
            <p className="text-texto-secundario mb-8 max-w-lg mx-auto">
              Te calculamos cuántos refugios necesitas, qué plagas controlarían y cuánto ahorrarías en pesticidas este año.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@murcielagosmalaga.com?subject=Quiero%20saber%20cuánto%20ahorro%20con%20refugios%20MUMA"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold bg-marca-principal text-black transition-transform hover:scale-105 no-underline"
              >
                Quiero mi presupuesto gratis
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold border border-white/10 text-texto-principal hover:bg-fondo-superficie transition-all no-underline"
              >
                WhatsApp directo
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
