import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import FormularioMuma from "./formularioContacto";

function MapaDinamico() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [MapaComp, setMapaComp] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import("./MapaRefugios").then((m) => setMapaComp(() => m.default))
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {MapaComp ? <MapaComp /> : (
        <div className="h-full w-full bg-fondo-superficie flex items-center justify-center text-texto-secundario text-xs uppercase tracking-widest animate-pulse">
          Sincronizando 162 refugios...
        </div>
      )}
    </div>
  )
}

const varianteSeccion: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function RefugiosPage() {
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

  // Lógica de coste / ahorro
  const costePesticidaPorHa = 250;
  const porcentajeAhorro = 0.7;
  const ahorroDinero = hectareas * costePesticidaPorHa * porcentajeAhorro;
  const refugiosNecesarios = Math.ceil(hectareas * 1.5);

  // Lógica científica basada en datos reales
  const INSECTOS_POR_MURCIELAGO_POR_NOCHE = 1200;
  const MURCIELAGOS_POR_HECTAREA = 3;
  const KG_PESTICIDA_EQUIVALENTE_POR_MURCIELAGO = 0.0007;

  const murcielagosActivos = Math.round(hectareas * MURCIELAGOS_POR_HECTAREA);
  const insectosPorNoche = (murcielagosActivos * INSECTOS_POR_MURCIELAGO_POR_NOCHE).toLocaleString('es-ES');
  const pesticidaEvitado = (murcielagosActivos * KG_PESTICIDA_EQUIVALENTE_POR_MURCIELAGO * 365).toFixed(1);

  return (
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
          <div className="absolute inset-0 bg-gradient-to-t from-fondo-base via-[#050505]/50 to-[#050505]/20 z-10" />
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
            Los murciélagos consumen miles de insectos nocturnos reemplazando
            pesticidas sintéticos. Ofréceles un hogar con diseño de madera
            técnica prémium.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <a
              href="#catalogo-modelos"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("catalogo-modelos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-5 bg-marca-principal text-black font-bold rounded-2xl hover:bg-marca-principal-hover hover:scale-105 transition-all shadow-[0_0_30px_rgba(31,225,167,0.3)] no-underline"
            >
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
            Un refugio MUMA es una inversión única que trabaja 365 días sin
            coste operativo.
          </p>
          <div className="flex gap-3 shrink-0">
            <a
              href="#contacto"
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
              Un solo murciélago elimina hasta 1.200 insectos por hora. Un
              refugio MUMA instala una colonia activa en tu finca, viñedo o
              espacio urbano sin químicos, sin mantenimiento y con respaldo
              científico de un proyecto europeo de investigación.
            </p>
          </motion.div>

          {/* ── 3 PILARES BATBNB STYLE ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                <img
                  src="/images/batbnb/mosquitos.webp"
                  alt="Reduce mosquitos y plagas"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Reduce Mosquitos y Plagas
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Un solo murciélago puede comer miles de insectos en una noche,
                convirtiéndolos en el sustituto perfecto de los pesticidas
                tóxicos. Ayudan a mantener tu jardín seguro para tu familia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                <img
                  src="/images/batbnb/habitat.webp"
                  alt="Hábitat seguro para murciélagos"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Provee un Hábitat Seguro
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Los murciélagos están amenazados en todo el mundo y necesitan
                ayuda. Nuestros refugios ofrecen un hogar perfecto y
                térmicamente estable para que críen a sus crías a salvo de
                depredadores.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-[0_10px_30px_rgba(31,225,167,0.1)] border border-white/10">
                <img
                  src="/images/batbnb/bat.webp"
                  alt="Aprende a amar al murciélago"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-marca-principal font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Aprende a amar a este animal
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                La idea de que son monstruos sedientos de sangre es un mito. Son
                tímidos, duermen de día y cazan de noche. Trátalos con respeto y
                serán los mejores vecinos de tu ecosistema.
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
                              <li className="flex gap-3"><Check size={16} className="text-marca-principal shrink-0 mt-0.5" /><span>Aislamiento térmico total  sin rendijas ni filtraciones.</span></li>
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
                              <li className="flex gap-3"><span className="text-red-400 shrink-0 mt-0.5">✕</span><span>Rendijas que filtran aire y humedad  el animal las abandona.</span></li>
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
              Las unidades pueden colocarse en una pared exterior de una casa,
              muro alto de finca o un poste en tu patio. Cuando los murciélagos
              locales salgan de la hibernación, encontrarán tu refugio MUMA y lo
              llamarán hogar en poco tiempo.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex flex-col items-center justify-center font-bold text-white shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">
                    Simulación Térmica
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Los espacios interiores imitan su hábitat natural (grietas)
                    mediante madera técnica certificada. La estructura captura
                    el calor del sol directo haciéndola appealing para las
                    hembras lactantes.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex items-center justify-center font-bold text-white shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">
                    Agarre Interior Perfecto
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Entran por un drop de 2 centímetros bajo la plataforma. El
                    interior cuenta con ranurados CNC de precisión que permite
                    que los murciélagos se agarren, escalen y cuelguen con total
                    comodidad y seguridad.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-marca-principal flex items-center justify-center font-bold text-white shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase tracking-widest text-[#2c2b29] mb-2">
                    Inercia Nocturna
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Por la noche, cuando están listos para salir a cenar, usan
                    el espacio bajo el refugio en caída libre para ganar momento
                    e iniciar el vuelo de caza de plagas en tu parcela.
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
      <section
        id="catalogo-modelos"
        className="py-24 px-6 bg-fondo-secundario overflow-hidden"
      >
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
                  className={`relative aspect-square rounded-3xl bg-gradient-to-br ${modelos[indiceActivo].color} to-transparent border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center`}
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
            <div
              className="group relative overflow-hidden rounded-3xl"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box,border-box",
              }}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <img
                  src="/images/agricultura-control-biologico_resultado.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="relative p-8 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
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
            <div
              className="group relative overflow-hidden rounded-3xl"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box,border-box",
              }}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <img
                  src="/images/campo-golf.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="relative p-8 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
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
            <div
              className="group relative overflow-hidden rounded-3xl"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(#0f0f1a,#0f0f1a),linear-gradient(to bottom right,#8b5cf6,transparent)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box,border-box",
              }}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <img
                  src="/images/colonia_murcielago01.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="relative p-8 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
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
              <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
                Control biológico de plagas
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-texto-titulo mb-4 leading-tight">
                Ahorra miles de €<br />
                <span className="text-marca-principal">en pesticidas</span>
              </h2>
              <p className="text-texto-secundario text-lg mb-10 leading-relaxed max-w-md">
                Un murciélago elimina hasta <span className="text-texto-titulo font-semibold">1.200 insectos por hora</span>. Instala una colonia activa y deja de pagar tratamientos químicos recurrentes.
              </p>

              {/* Plagas como badges */}
              <div className="mb-8">
                <p className="text-xs font-bold text-texto-secundario uppercase tracking-widest mb-4">Plagas que controla</p>
                <div className="flex flex-wrap gap-2">
                  {["Mosca del Olivo", "Polilla del Racimo", "Procesionaria", "Mosquito Tigre"].map((plaga) => (
                    <span
                      key={plaga}
                      className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-marca-principal/30 bg-marca-principal/10 text-marca-principal"
                    >
                      {plaga}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stat destacado */}
              <div className="flex items-center gap-4 p-5 bg-fondo-superficie rounded-2xl border border-white/5">
                <div className="text-4xl font-black text-texto-titulo">70%</div>
                <div>
                  <p className="text-texto-titulo font-semibold text-sm">menos gasto en pesticidas</p>
                  <p className="text-texto-secundario text-xs mt-0.5">media en fincas agrícolas con refugios activos</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-fondo-superficie rounded-3xl border border-purple-400/40 shadow-[0_0_60px_rgba(192,132,252,0.08)] overflow-hidden"
            >
              {/* Cabecera */}
              <div className="px-8 pt-8 pb-4">
                <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-1">Calculadora de ahorro</p>
                <p className="text-texto-secundario text-sm">Mueve el slider y ve cuánto ahorras al año</p>
              </div>

              {/* Slider */}
              <div className="px-8 py-6 border-t border-white/5">
                <div className="flex justify-between mb-3 items-end">
                  <label className="text-xs font-bold text-texto-secundario uppercase tracking-widest">
                    Superficie de cultivo
                  </label>
                  <span className="text-marca-principal font-mono text-3xl font-black">
                    {hectareas} <span className="text-lg">Ha</span>
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
                <div className="flex justify-between text-xs text-texto-secundario/50 mt-1">
                  <span>1 Ha</span><span>100 Ha</span>
                </div>
              </div>

              {/* Resultado principal — el ahorro grande */}
              <div className="mx-8 mb-4 p-6 bg-gradient-to-br from-marca-principal/15 to-marca-principal/5 rounded-2xl border border-marca-principal/25 text-center">
                <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-2">Ahorro estimado al año</p>
                <p className="text-6xl font-black text-marca-principal leading-none mb-1">
                  {ahorroDinero.toLocaleString()} €
                </p>
                <p className="text-xs text-texto-secundario">frente a tratamientos químicos convencionales</p>
              </div>

              {/* Stats secundarios */}
              <div className="grid grid-cols-2 gap-3 px-8 pb-4">
                <div className="p-4 bg-black/20 rounded-2xl text-center">
                  <p className="text-2xl font-black text-texto-titulo">{refugiosNecesarios}</p>
                  <p className="text-xs text-texto-secundario uppercase tracking-wider mt-1">Refugios necesarios</p>
                </div>
                <div className="p-4 bg-black/20 rounded-2xl text-center">
                  <p className="text-2xl font-black text-texto-titulo">0 €</p>
                  <p className="text-xs text-texto-secundario uppercase tracking-wider mt-1">Coste operativo</p>
                </div>
              </div>

              {/* Stats científicos (migrados) */}
              <div className="grid grid-cols-2 gap-3 px-8 pb-8">
                <div className="p-4 bg-marca-principal/5 rounded-2xl text-center border border-marca-principal/10">
                  <p className="text-xl font-black text-white">{insectosPorNoche}</p>
                  <p className="text-[10px] sm:text-xs text-texto-secundario uppercase tracking-wider mt-1">Insectos eliminados / noche</p>
                </div>
                <div className="p-4 bg-marca-principal/5 rounded-2xl text-center border border-marca-principal/10">
                  <p className="text-xl font-black text-white">{pesticidaEvitado} kg</p>
                  <p className="text-[10px] sm:text-xs text-texto-secundario uppercase tracking-wider mt-1">Tóxicos evitados / año</p>
                </div>
              </div>

              {/* CTA dentro de la calculadora */}
              <div className="px-8 pb-8 -mt-2">
                <a
                  href="mailto:info@murcielagosmalaga.com?subject=Consulta%20refugios%20MUMA%20-%20{hectareas}%20hectareas"
                  className="block w-full text-center py-4 bg-marca-principal text-black font-bold rounded-xl hover:bg-marca-principal-hover transition-all duration-200 no-underline text-sm"
                >
                  Quiero ahorrar {ahorroDinero.toLocaleString()} € al año →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: CÓMO LO HACEMOS ── */}
      <section className="py-24 px-6 bg-fondo-secundario border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={varianteSeccion}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
              Lo hacemos nosotros
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-4">
              Tú decides. MUMA lo instala.
            </h2>
            <p className="text-texto-secundario text-lg max-w-2xl mx-auto">
              No necesitas saber nada de murciélagos. Nos encargamos de todo: desde elegir la ubicación ideal hasta el seguimiento de la colonia.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-marca-principal/60 via-marca-principal/20 to-transparent hidden md:block" />

            <div className="space-y-10">
              {[
                {
                  paso: "01",
                  titulo: "Consulta gratuita",
                  desc: "Cuéntanos tu situación: tipo de cultivo, superficie, plagas habituales. En 24h te decimos cuántos refugios necesitas y dónde colocarlos.",
                  detalle: "Sin compromiso · Por email o WhatsApp",
                },
                {
                  paso: "02",
                  titulo: "Fabricación y envío",
                  desc: "Fabricamos tu refugio a medida con madera técnica seleccionada. Llega listo para instalar, con instrucciones y soporte directo.",
                  detalle: "Plazo: 7-14 días · Envío a toda España",
                },
                {
                  paso: "03",
                  titulo: "Instalación por nuestro equipo",
                  desc: "Nuestros técnicos se desplazan a tu finca o espacio urbano. Colocamos el refugio en la orientación y altura óptimas para atraer a la primera colonia.",
                  detalle: "Servicio incluido en zonas de Málaga · Resto bajo presupuesto",
                },
                {
                  paso: "04",
                  titulo: "Primera colonia activa",
                  desc: "En 1-3 temporadas el refugio está colonizado. A partir de ahí, los murciélagos trabajan solos. Nosotros hacemos el seguimiento si lo necesitas.",
                  detalle: "Seguimiento opcional · Datos reales de ocupación",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.paso}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  {/* Número */}
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-marca-principal/10 border border-marca-principal/30 flex items-center justify-center z-10">
                    <span className="text-marca-principal font-bold text-lg">{item.paso}</span>
                  </div>
                  {/* Contenido */}
                  <div className="pt-1">
                    <h3 className="text-texto-titulo font-bold text-lg mb-1">{item.titulo}</h3>
                    <p className="text-texto-secundario text-sm leading-relaxed mb-2">{item.desc}</p>
                    <span className="text-xs text-marca-principal/70 font-medium">{item.detalle}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={varianteSeccion}
            className="mt-16 text-center"
          >
            <p className="text-texto-secundario text-sm mb-6">
              La temporada óptima de colonización es <span className="text-texto-titulo font-semibold">marzo–mayo</span>. Cuanto antes instales, antes trabajan.
            </p>
            <a
              href="mailto:info@murcielagosmalaga.com?subject=Quiero%20instalar%20un%20refugio%20MUMA"
              className="inline-flex items-center gap-3 px-10 py-5 bg-marca-principal text-black font-bold rounded-2xl hover:bg-marca-principal-hover hover:scale-105 transition-all shadow-[0_0_40px_rgba(31,225,167,0.25)] no-underline text-base"
            >
              Quiero que MUMA lo instale
            </a>
            <p className="text-xs text-texto-secundario mt-4">Consulta inicial gratuita · Sin compromiso</p>
          </motion.div>
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
            <div className="p-8 bg-gradient-to-br from-violet-500/10 to-transparent rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-violet-400/50 transition-all">
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
            <div className="p-8 bg-gradient-to-br from-violet-500/10 to-transparent rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-violet-400/50 transition-all">
              <h4 className="text-4xl font-extrabold text-texto-titulo mb-2">
                0€
              </h4>
              <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-4">
                Coste Operativo
              </p>
              <p className="text-sm text-texto-secundario leading-relaxed">
                Elimina la dependencia de contratos de fumigación recurrentes y
                tóxicos.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-violet-500/10 to-transparent rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-violet-400/50 transition-all">
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-[10px] text-texto-secundario/40 mt-12 uppercase tracking-[0.2em]"
          >
            * Datos basados en estudios de{" "}
            <a
              href="https://secemu.org/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-marca-principal transition-colors"
            >
              SECEMU
            </a>{" "}
            y{" "}
            <a
              href="https://www.batcon.org/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-marca-principal transition-colors"
            >
              BCI
            </a>
            .
          </motion.p>
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
                className="p-6 bg-gradient-to-br from-violet-500/10 to-transparent rounded-2xl border border-white/5"
              >
                <h4 className="text-texto-titulo font-bold mb-2">{item.q}</h4>
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
            <p className="text-xs font-bold uppercase tracking-widest text-marca-principal mb-3">
              Respaldo científico
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-texto-titulo">
              No somos una tienda. Somos investigadores.
            </h2>
            <p className="text-texto-secundario mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              MUMA nació de la investigación de campo, no del marketing.
              Nuestros refugios están diseñados con datos reales de colonización
              obtenidos en proyectos europeos en España, Portugal y Eslovenia.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                num: "+1.000",
                label: "personas con experiencia directa en 2025",
              },
              {
                num: "3",
                label: "países del proyecto europeo de investigación",
              },
              {
                num: "10+",
                label: "años de estudio de colonias de murciélagos",
              },
              { num: "0€", label: "coste operativo tras la instalación" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-gradient-to-br from-violet-500/10 to-transparent rounded-2xl border border-white/5 text-center"
              >
                <p className="text-3xl font-extrabold text-texto-titulo mb-1">
                  {item.num}
                </p>
                <p className="text-xs text-texto-secundario leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-50">
            <img
              src="/images/EUROBATS_logo.webp"
              alt="EUROBATS"
              className="h-8 grayscale"
            />
            <img
              src="/images/Logo_SECEMU.webp"
              alt="SECEMU"
              className="h-8 grayscale"
            />
            <img
              src="/images/europa.webp"
              alt="Proyecto Europeo"
              className="h-8 grayscale"
            />
            <img
              src="/images/junta-andalucia.webp"
              alt="Junta de Andalucía"
              className="h-8 grayscale"
            />
          </div>
        </div>
      </section>

      {/* ── MAPA DE REFUGIOS ── */}
      <section className="py-24 px-6 bg-fondo-base border-t border-white/5">
        <motion.div
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true }}
          variants={varianteSeccion}
          className="max-w-6xl mx-auto"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
            Red activa
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-4">
            Refugios instalados en tiempo real.
          </h2>
          <p className="text-texto-secundario mb-10 max-w-xl">
            Cada punto es un refugio MUMA activo. Los datos se sincronizan directamente desde nuestra base de datos de campo.
          </p>
          <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-purple-400/20 shadow-[0_0_40px_rgba(192,132,252,0.06)]">
            <MapaDinamico />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-3 h-3 rounded-full bg-marca-principal shadow-[0_0_8px_#1fe1a7]" />
            <p className="text-xs text-texto-secundario">Cada punto es un refugio MUMA activo — datos en tiempo real desde nuestra base de campo</p>
          </div>
        </motion.div>
      </section>

      {/* ── SECCIÓN 7: CONTACTO ── */}
      <section id="contacto" className="bg-fondo-base py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            variants={varianteSeccion}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">
              Sin compromiso · Respuesta en 24h
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-4">
              Cuéntanos tu finca o espacio.
            </h2>
            <p className="text-texto-secundario max-w-xl mx-auto leading-relaxed mb-6">
              Te calculamos cuántos refugios necesitas, qué plagas controlarían y cuánto ahorrarías en pesticidas este año.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <FormularioMuma
              tablaBD="solicitudes_refugios"
              asuntoCorreo="[Web Refugios] Solicitud de propuesta"
              textoBoton="SOLICITAR ESTUDIO DE VIABILIDAD"
              selectName="tipo_espacio"
              selectLabel="¿Qué tipo de espacio gestionas?"
              opcionesSelect={[
                { valor: 'finca_agricola', texto: 'Finca agrícola / Cultivo' },
                { valor: 'parque_publico', texto: 'Parque o jardín público' },
                { valor: 'espacio_privado', texto: 'Propiedad privada / Jardín' },
                { valor: 'campo_golf', texto: 'Campo de Golf / Resort' },
                { valor: 'otro', texto: 'Otro' },
              ]}
              mostrarOrganizacion={true}
              mostrarParticipantes={false}
              mostrarFecha={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
