// Calculadora de impacto ambiental — lógica: hectáreas → insectos controlados y pesticidas evitados
import { useState } from 'react'
import { motion } from 'framer-motion'

// Constantes de cálculo basadas en datos científicos publicados
const INSECTOS_POR_MURCIELAGO_POR_NOCHE = 1200
const MURCIÉLAGOS_POR_HECTAREA = 3
const KG_PESTICIDA_EQUIVALENTE_POR_MURCIELAGO = 0.0007

export default function Calculadora() {
  const [hectareas, setHectareas] = useState(10)

  // Cálculos derivados del valor de entrada
  const murciélagos = Math.round(hectareas * MURCIÉLAGOS_POR_HECTAREA)
  const insectosPorNoche = (murciélagos * INSECTOS_POR_MURCIELAGO_POR_NOCHE).toLocaleString('es-ES')
  const pesticidaEvitado = (murciélagos * KG_PESTICIDA_EQUIVALENTE_POR_MURCIELAGO * 365).toFixed(1)

  return (
    <section
      id="calculadora"
      className="bg-fondo-secundario py-20 px-6"
      aria-label="Calculadora de impacto ambiental"
    >
      <div className="max-w-3xl mx-auto">

        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">
            Herramienta de estimación
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">
            Calcula el impacto de una red de refugios
          </h2>
          <p className="text-texto-secundario max-w-xl mx-auto">
            Introduce la superficie que quieres cubrir y obtén una estimación
            del control natural de plagas que proporcionaría una red de refugios para murciélagos.
          </p>
        </motion.div>

        {/* Panel de la calculadora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-fondo-superficie rounded-2xl p-8 border border-white/5"
        >

          {/* Control deslizante */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-3">
              <label htmlFor="superficie" className="text-sm font-medium text-texto-principal">
                Superficie a cubrir
              </label>
              <span className="text-2xl font-bold text-marca-principal">
                {hectareas} ha
              </span>
            </div>
            <input
              id="superficie"
              type="range"
              min={1}npx supabase link --project-ref vggehfsudaizbmbhjvvj
              npx supabase db dump -f supabase\schema.sql
              max={500}
              value={hectareas}
              onChange={(e) => setHectareas(Number(e.target.value))}
              className="w-full h-1.5 rounded-full cursor-pointer accent-marca-principal"
              aria-label={`Superficie: ${hectareas} hectáreas`}
            />
            <div className="flex justify-between text-xs text-texto-secundario mt-1.5">
              <span>1 ha</span>
              <span>500 ha</span>
            </div>
          </div>

          {/* Resultados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Murciélagos estimados */}
            <div className="bg-fondo-elevado rounded-xl p-5 text-center border border-white/5">
              <p className="text-3xl font-bold text-texto-titulo">{murciélagos}</p>
              <p className="text-xs text-texto-secundario mt-1.5 leading-snug">
                murciélagos estimados en la red
              </p>
            </div>

            {/* Insectos controlados */}
            <div className="bg-fondo-elevado rounded-xl p-5 text-center border border-marca-principal/15">
              <p className="text-3xl font-bold text-marca-principal">{insectosPorNoche}</p>
              <p className="text-xs text-texto-secundario mt-1.5 leading-snug">
                insectos controlados cada noche
              </p>
            </div>

            {/* Pesticida evitado */}
            <div className="bg-fondo-elevado rounded-xl p-5 text-center border border-white/5">
              <p className="text-3xl font-bold text-texto-titulo">{pesticidaEvitado} kg</p>
              <p className="text-xs text-texto-secundario mt-1.5 leading-snug">
                de pesticida evitado al año
              </p>
            </div>
          </div>

          {/* Nota metodológica */}
          <p className="text-xs text-texto-secundario mt-6 text-center leading-relaxed">
            Estimación orientativa basada en promedios de consumo por especie (Eptesicus serotinus,
            Pipistrellus sp.). Los datos reales dependen de la especie, hábitat y disponibilidad de presas.
          </p>

        </motion.div>
      </div>
    </section>
  )
}
