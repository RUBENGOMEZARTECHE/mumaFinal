import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Box, Laptop, Microscope, Zap,
  Microscope as Science,
} from "lucide-react";

import Footer from "../../components/footer";
import { useLang } from "../../context/LangContext";
import { educacionAmbientalI18n } from "../../data/i18n/educacionAmbientalI18n";

// Los iconos son visuales — no se traducen
const iconosPorUnidad = [
  <Box size={32} />,
  <Laptop size={32} />,
  <Microscope size={32} />,
];

const bordesPorUnidad = [
  { borderClass: "border-marca-principal", textClass: "text-marca-principal" },
  { borderClass: "border-marca-purple",    textClass: "text-marca-purple" },
  { borderClass: "border-blue-500",        textClass: "text-blue-500" },
];

export default function EducacionAmbiental() {
  const { locale } = useLang();
  const t = educacionAmbientalI18n[locale] || educacionAmbientalI18n.es;

  return (
    <>
      <Helmet>
        <title>{t.helmetTitle}</title>
      </Helmet>
      <main className="min-h-screen bg-[#050505] pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <header className="mb-24">
            <span className="text-marca-principal font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
              {t.eyebrow}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
              {t.heroTitle} <br />
              <span className="text-marca-purple">{t.heroTitleHighlight}</span>
            </h1>
          </header>

          <div className="space-y-12">
            {t.unidades.map((u, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* PILAR PRINCIPAL */}
                <div className={`lg:col-span-4 p-10 bg-fondo-superficie border-l-4 ${bordesPorUnidad[idx].borderClass} rounded-r-[3rem] flex flex-col justify-center`}>
                  <div className={`${bordesPorUnidad[idx].textClass} mb-6`}>
                    {iconosPorUnidad[idx]}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{u.titulo}</h2>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-6">{u.subtitulo}</p>
                  <p className="text-sm text-texto-secundario italic font-light leading-relaxed">
                    "{u.problema}"
                  </p>
                </div>

                {/* AVALES TÉCNICOS */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {u.avales.map((aval, i) => (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap size={14} className={`${bordesPorUnidad[idx].textClass} opacity-50 group-hover:opacity-100`} />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{aval.nombre}</h4>
                      </div>
                      <p className="text-xs text-texto-secundario font-light leading-relaxed">
                        {aval.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* CIERRE DE AUTORIDAD */}
          <div className="mt-40 p-16 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-marca-principal to-transparent"></div>
            <Science className="mx-auto text-marca-principal mb-8 opacity-50" size={40} />
            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{t.cierreTitle}</h3>
            <p className="max-w-2xl mx-auto text-texto-secundario font-light mb-12">
              {t.cierreDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="px-12 py-5 bg-marca-principal text-black rounded-full font-black text-xs tracking-widest uppercase hover:bg-marca-principal-hover transition-all no-underline"
              >
                {t.cierreCta1}
              </Link>
              <a
                href="https://wa.me/34664213450"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-white/5 border border-white/15 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/10 transition-all no-underline"
              >
                {t.cierreCta2}
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
