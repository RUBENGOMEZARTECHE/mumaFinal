// Island React — Calculadora de ahorro por hectárea
// Solo necesita useState para el slider reactivo
import { useState } from "react";

const COSTE_PESTICIDA_POR_HA = 250;
const PORCENTAJE_AHORRO = 0.7;
const INSECTOS_POR_MURCIELAGO_NOCHE = 1200;
const MURCIELAGOS_POR_HA = 3;
const KG_PESTICIDA_EQUIV = 0.0007;

export default function CalculadoraRefugios() {
  const [hectareas, setHectareas] = useState(1);

  const ahorroDinero = Math.round(hectareas * COSTE_PESTICIDA_POR_HA * PORCENTAJE_AHORRO);
  const refugiosNecesarios = Math.ceil(hectareas * 1.5);
  const murcielagosActivos = Math.round(hectareas * MURCIELAGOS_POR_HA);
  const insectosPorNoche = (murcielagosActivos * INSECTOS_POR_MURCIELAGO_NOCHE).toLocaleString("es-ES");
  const pesticidaEvitado = (murcielagosActivos * KG_PESTICIDA_EQUIV * 365).toFixed(1);

  return (
    <div className="bg-fondo-superficie rounded-3xl border border-purple-400/40 shadow-[0_0_60px_rgba(192,132,252,0.08)] overflow-hidden">
      {/* Cabecera */}
      <div className="px-8 pt-8 pb-4">
        <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-1">
          Calculadora de ahorro
        </p>
        <p className="text-texto-secundario text-sm">
          Mueve el slider y ve cuánto ahorras al año
        </p>
      </div>

      {/* Slider */}
      <div className="px-8 py-6 border-t border-white/5">
        <div className="flex justify-between mb-3 items-end">
          <label
            htmlFor="slider-hectareas"
            className="text-xs font-bold text-texto-secundario uppercase tracking-widest"
          >
            Superficie de cultivo
          </label>
          <span className="text-marca-principal font-mono text-3xl font-black">
            {hectareas} <span className="text-lg">Ha</span>
          </span>
        </div>
        <input
          id="slider-hectareas"
          type="range"
          min="1"
          max="100"
          value={hectareas}
          onChange={(e) => setHectareas(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-marca-principal"
        />
        <div className="flex justify-between text-xs text-texto-secundario/50 mt-1">
          <span>1 Ha</span>
          <span>100 Ha</span>
        </div>
      </div>

      {/* Ahorro principal */}
      <div className="mx-8 mb-4 p-6 bg-gradient-to-br from-marca-principal/15 to-marca-principal/5 rounded-2xl border border-marca-principal/25 text-center">
        <p className="text-xs font-bold text-marca-principal uppercase tracking-widest mb-2">
          Ahorro estimado al año
        </p>
        <p className="text-6xl font-black text-marca-principal leading-none mb-1">
          {ahorroDinero.toLocaleString()} €
        </p>
        <p className="text-xs text-texto-secundario">
          frente a tratamientos químicos convencionales
        </p>
      </div>

      {/* Stats secundarios */}
      <div className="grid grid-cols-2 gap-3 px-8 pb-4">
        <div className="p-4 bg-black/20 rounded-2xl text-center">
          <p className="text-2xl font-black text-texto-titulo">{refugiosNecesarios}</p>
          <p className="text-xs text-texto-secundario uppercase tracking-wider mt-1">
            Refugios necesarios
          </p>
        </div>
        <div className="p-4 bg-black/20 rounded-2xl text-center">
          <p className="text-2xl font-black text-texto-titulo">0 €</p>
          <p className="text-xs text-texto-secundario uppercase tracking-wider mt-1">
            Coste operativo
          </p>
        </div>
      </div>

      {/* Stats científicos */}
      <div className="grid grid-cols-2 gap-3 px-8 pb-8">
        <div className="p-4 bg-marca-principal/5 rounded-2xl text-center border border-marca-principal/10">
          <p className="text-xl font-black text-white">{insectosPorNoche}</p>
          <p className="text-[10px] sm:text-xs text-texto-secundario uppercase tracking-wider mt-1">
            Insectos eliminados / noche
          </p>
        </div>
        <div className="p-4 bg-marca-principal/5 rounded-2xl text-center border border-marca-principal/10">
          <p className="text-xl font-black text-white">{pesticidaEvitado} kg</p>
          <p className="text-[10px] sm:text-xs text-texto-secundario uppercase tracking-wider mt-1">
            Tóxicos evitados / año
          </p>
        </div>
      </div>

      {/* CTA dentro de la calculadora */}
      <div className="px-8 pb-8 -mt-2">
        <a
          href="#contacto"
          className="block w-full text-center py-4 bg-marca-principal text-black font-bold rounded-xl hover:bg-marca-principal-hover transition-all duration-200 no-underline text-sm"
        >
          Quiero ahorrar {ahorroDinero.toLocaleString()} € al año →
        </a>
      </div>
    </div>
  );
}
