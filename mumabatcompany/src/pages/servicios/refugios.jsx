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
      imagen: "/images/refugio_simple.png",
    },
    {
      titulo: "Modelo Finca Agrícola",
      subtitulo: "Alta Capacidad de Control",
      descripcion:
        "Refugio de gran formato diseñado para maximizar la colonización en cultivos. Ventilación reforzada y aislamiento térmico superior para insolación intensa.",
      iconos: ["Gran Formato", "Aislamiento Pro", "Agrícola"],
      color: "from-marca-principal/20",
      imagen: "/images/refugio_doble.png",
    },
    {
      titulo: "Estación Smart IoT",
      subtitulo: "Monitorización Científica",
      descripcion:
        "Equipado con sensores infrarrojos de ocupación y telemetría de temperatura/humedad. Envía datos en tiempo real para estudios de biodiversidad.",
      iconos: ["Sensores 4.0", "Telemetría", "Resistente"],
      color: "from-blue-500/20",
      imagen: "/images/refugio_simple.png", // Cambiar por imagen real si existe
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

      <main className="min-h-screen bg-fondo-base pt-24">
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
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6 leading-tight">
                Ingeniería para la vida: <br />
                <span className="text-marca-principal">
                  ¿Qué es un refugio MUMA?
                </span>
              </h2>
              <p className="text-texto-secundario text-lg leading-relaxed">
                Nuestras estaciones son piezas únicas fabricadas en Málaga que
                combinan artesanía e impresión 3D. Diseñadas bajo estándares
                científicos para ofrecer un espacio bioclimático real que
                garantiza la protección frente a la humedad donde otras cajas
                comerciales fallan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5">
                <h4 className="text-texto-titulo font-bold mb-3">
                  Materiales Nobles
                </h4>
                <p className="text-sm text-texto-secundario italic">
                  Madera técnica e impresión 3D con materiales biodegradables y
                  compostables.
                </p>
              </div>
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5">
                <h4 className="text-texto-titulo font-bold mb-3">
                  Diseño Bioclimático
                </h4>
                <p className="text-sm text-texto-secundario italic">
                  2 cámaras grandes con superficies rayadas para facilitar el
                  agarre y la elección térmica.
                </p>
              </div>
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5">
                <h4 className="text-texto-titulo font-bold mb-3">
                  Ensamblaje Robusto
                </h4>
                <p className="text-sm text-texto-secundario italic">
                  Uniones mediante tornillos de alta calidad, resistente a las
                  inclemencias del tiempo.
                </p>
              </div>
            </div>

            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={varianteSeccion}
              className="bg-fondo-superficie rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-10 lg:p-14 bg-marca-principal/5">
                  <h3 className="text-2xl font-bold text-marca-principal mb-6 flex items-center gap-2">
                    <Check size={24} /> El Estándar MUMA
                  </h3>
                  <ul className="space-y-4 text-texto-principal text-sm">
                    <li className="flex gap-2">
                      <Check size={16} className="text-marca-principal" /> Sin
                      rendijas: Aislamiento térmico total.
                    </li>
                    <li className="flex gap-2">
                      <Check size={16} className="text-marca-principal" /> Sin
                      peligros: Sin clavos ni siliconas tóxicas.
                    </li>
                    <li className="flex gap-2">
                      <Check size={16} className="text-marca-principal" />{" "}
                      Durabilidad: No se dobla ni se agrieta al sol.
                    </li>
                    <li className="flex gap-2">
                      <Check size={16} className="text-marca-principal" />{" "}
                      Seguimiento: Georeferenciados y numerados.
                    </li>
                  </ul>
                </div>
                <div className="p-10 lg:p-14 border-l border-white/5 bg-black/20">
                  <h3 className="text-2xl font-bold text-red-500/80 mb-6">
                    Cajas Comerciales
                  </h3>
                  <ul className="space-y-4 text-texto-secundario text-sm opacity-70">
                    <li>• Rendijas que filtran aire y humedad.</li>
                    <li>• Clavos y siliconas que dañan al animal.</li>
                    <li>• Madera de baja calidad que se deforma.</li>
                    <li>• Sin ventilación ni superficies de aterrizaje.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECCIÓN 2: CARRUSEL DE MODELOS ── */}
        <section className="py-24 px-6 bg-fondo-secundario overflow-hidden">
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
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    <div
                      className="absolute bottom-6 right-6 text-white/40 hidden"
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
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 group hover:border-marca-principal/30 transition-all">
                <h4 className="text-xl font-bold text-texto-titulo mb-3">
                  Acceso a Mercados Premium
                </h4>
                <p className="text-sm text-texto-secundario leading-relaxed">
                  Facilita certificaciones ecológicas y de "Residuo Cero",
                  permitiendo vender cosechas a precios superiores.
                </p>
              </div>
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 group hover:border-marca-principal/30 transition-all">
                <h4 className="text-xl font-bold text-texto-titulo mb-3">
                  Menos Horas de Maquinaria
                </h4>
                <p className="text-sm text-texto-secundario leading-relaxed">
                  Reduce pases de tractor, ahorrando combustible y evitando la
                  compactación excesiva del suelo.
                </p>
              </div>
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 group hover:border-marca-principal/30 transition-all">
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
                <div className="p-6 bg-fondo-superficie rounded-2xl border border-white/5">
                  <h4 className="text-texto-titulo font-bold mb-4">
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
                className="bg-fondo-superficie p-8 rounded-3xl border border-marca-principal/20 shadow-2xl"
              >
                <h3 className="text-xl font-bold text-texto-titulo mb-8">
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
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-marca-principal/30 transition-all">
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
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-marca-principal/30 transition-all">
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
              <div className="p-8 bg-fondo-superficie rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-marca-principal/30 transition-all">
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
                  className="p-6 bg-fondo-superficie rounded-2xl border border-white/5"
                >
                  <h4 className="text-texto-titulo font-bold mb-2 flex items-center gap-3">
                    <span className="text-marca-principal font-mono text-sm">
                      0{i + 1}.
                    </span>
                    {item.q}
                  </h4>
                  <p className="text-sm text-texto-secundario leading-relaxed pl-8">
                    {item.a}
                  </p>
                </div>
              ))}
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
              Siguiente paso
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-8">
              ¿Tienes un espacio en mente?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@murcielagosmalaga.com"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold bg-marca-principal text-black transition-transform hover:scale-105 no-underline"
              >
                Escribir por email
              </a>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold border border-white/10 text-texto-principal hover:bg-fondo-superficie transition-all no-underline"
              >
                WhatsApp Corporativo
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
