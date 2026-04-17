// Página — Donar
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Leaf, Copy, Check, Landmark, Smartphone } from 'lucide-react'

// ─── Variantes de animación reutilizables ───────────────────────────────────
const varianteSeccion = {
  oculto: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const varianteTarjeta = {
  oculto: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const, delay: i * 0.08 },
  }),
}

// ─── Datos de impacto ────────────────────────────────────────────────────────
const nivelesImpacto = [
  { cantidad: '5€',   descripcion: 'Cubre el material de una salida nocturna de monitorización' },
  { cantidad: '10€',  descripcion: 'Financia la instalación de 1 refugio artesanal para murciélagos' },
  { cantidad: '25€',  descripcion: 'Patrocina el seguimiento científico de una colonia durante un mes' },
  { cantidad: '50€',  descripcion: 'Financia una Bat Night educativa para un grupo escolar' },
  { cantidad: '100€', descripcion: 'Cubre el equipamiento de detección de ultrasonidos para un evento' },
]

// ─── Componente auxiliar: botón copiar con feedback visual ───────────────────
function BotonCopiar({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false)

  const copiar = () => {
    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
    <button
      onClick={copiar}
      aria-label={copiado ? 'Copiado' : `Copiar ${texto}`}
      className="flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border border-marca-principal/40 text-marca-principal text-xs font-bold hover:bg-marca-principal/10 active:scale-95 transition-all"
    >
      {copiado ? <Check size={14} /> : <Copy size={14} />}
      {copiado ? '¡Copiado!' : 'Copiar'}
    </button>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function DonarPage() {
  return (
    <>
      <main className="min-h-screen bg-fondo-base text-white">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden">

          {/* Glow decorativo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,255,157,0.07) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">

            {/* Etiqueta */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-6"
            >
              Conservación · Investigación · Educación
            </motion.p>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6"
            >
              Apoya la conservación de los murciélagos
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Tu contribución financia proyectos de investigación científica, instalación de refugios y programas de educación ambiental en España.
            </motion.p>
          </div>
        </section>

        {/* ── SECCIÓN DE IMPACTO ────────────────────────────────────────────── */}
        <motion.section
          variants={varianteSeccion}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 pb-24"
        >
          {/* Encabezado */}
          <div className="text-center mb-12">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              ¿A qué destinamos tu donación?
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3">
              Destino de las donaciones
            </h2>
          </div>

          {/* Tarjetas de impacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {nivelesImpacto.map(({ cantidad, descripcion }, i) => (
              <motion.div
                key={cantidad}
                custom={i}
                variants={varianteTarjeta}
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-7 hover:bg-white/[0.08] hover:border-marca-principal/30 transition-all group"
              >
                {/* Cantidad */}
                <p className="text-4xl font-bold text-marca-principal mb-3">
                  {cantidad}
                </p>
                {/* Descripción */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── SECCIÓN DE PAGO ───────────────────────────────────────────────── */}
        <motion.section
          variants={varianteSeccion}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 pb-24"
        >
          {/* Encabezado */}
          <div className="text-center mb-12">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Métodos de pago
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-3">
              Métodos de donación
            </h2>
          </div>

          {/* Tarjetas lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Tarjeta Bizum */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 hover:border-marca-principal/30 transition-all">
              {/* Icono + título */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-marca-principal/10 border border-marca-principal/30 flex items-center justify-center">
                  <Smartphone size={18} className="text-marca-principal" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pago inmediato</p>
                  <h3 className="text-lg font-black">Bizum</h3>
                </div>
              </div>

              {/* Número */}
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Número</p>
              <p className="text-2xl font-black text-white font-mono tracking-wide">612 345 678</p>
              <BotonCopiar texto="612345678" />
            </div>

            {/* Tarjeta Transferencia */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 hover:border-marca-principal/30 transition-all">
              {/* Icono + título */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-marca-principal/10 border border-marca-principal/30 flex items-center justify-center">
                  <Landmark size={18} className="text-marca-principal" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Transferencia bancaria</p>
                  <h3 className="text-lg font-black">IBAN</h3>
                </div>
              </div>

              {/* IBAN */}
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Número de cuenta</p>
              <p className="text-base font-black text-white font-mono tracking-wide break-all">
                ES12 3456 7890 1234 5678 9012
              </p>
              <BotonCopiar texto="ES12345678901234567890 12" />

              {/* Titular */}
              <div className="mt-5">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Titular</p>
                <p className="text-sm font-bold text-white">MUMA BAT COMPANY SL</p>
              </div>
            </div>

          </div>

          {/* Nota informativa */}
          <p className="text-center text-xs text-gray-600 mt-6 italic">
            Todas las donaciones son voluntarias. Para obtener un certificado de donación, escríbenos a{' '}
            <a href="mailto:info@murcielagosmalaga.com" className="text-marca-principal hover:underline">
              info@murcielagosmalaga.com
            </a>
          </p>
        </motion.section>

        {/* ── MENSAJE FINAL ─────────────────────────────────────────────────── */}
        <motion.section
          variants={varianteSeccion}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-6 pb-32 text-center"
        >
          {/* Glow decorativo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,255,157,0.05) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 bg-white/5 border border-marca-principal/20 rounded-[2.5rem] p-10 md:p-14">
            {/* Icono */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-marca-principal/10 border border-marca-principal/30 mb-8">
              <Leaf size={24} className="text-marca-principal" />
            </div>

            {/* Texto */}
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              Los murciélagos son indicadores clave del estado de los ecosistemas. Cada colonia protegida contribuye al equilibrio ecológico y al control natural de plagas. Su conservación es una inversión en biodiversidad con impacto directo sobre la agricultura, la salud pública y el medio ambiente.
            </p>

            {/* Firma */}
            <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-semibold">
              — Equipo MUMA BAT COMPANY
            </p>
          </div>
        </motion.section>

      </main>
    </>
  )
}
