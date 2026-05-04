// Island React — Carrusel interactivo de modelos de refugio
// Solo este componente necesita useState + AnimatePresence
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    color: "from-emerald-400/20",
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

export default function CarruselModelos() {
  const [indice, setIndice] = useState(0);
  const siguiente = () => setIndice((p) => (p + 1) % modelos.length);
  const anterior = () => setIndice((p) => (p - 1 + modelos.length) % modelos.length);
  const modelo = modelos[indice];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Texto + controles */}
      <div className="relative z-10 order-2 lg:order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={indice}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-marca-principal font-bold text-sm mb-2 block uppercase tracking-widest">
              {modelo.subtitulo}
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-texto-titulo mb-6 leading-tight">
              {modelo.titulo}
            </h3>
            <p className="text-texto-secundario text-lg leading-relaxed mb-8">
              {modelo.descripcion}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              {modelo.iconos.map((tag) => (
                <span
                  key={tag}
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
            aria-label="Modelo anterior"
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-texto-titulo transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={siguiente}
            aria-label="Modelo siguiente"
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-texto-titulo transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Imagen */}
      <div className="relative order-1 lg:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={indice}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`relative aspect-square rounded-3xl bg-gradient-to-br ${modelo.color} to-transparent border border-white/10 overflow-hidden shadow-2xl`}
          >
            <img
              src={modelo.imagen}
              alt={modelo.titulo}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
