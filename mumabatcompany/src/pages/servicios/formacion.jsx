import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useLang } from "../../context/LangContext";
import { formacionI18n } from "../../data/i18n/formacionI18n";

const fadeUp = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Fondos alternos por sección — igual que nosotros.jsx
const fondosPorGrupo = [
  "bg-fondo-base",
  "bg-fondo-secundario",
  "bg-fondo-base",
];

export default function FormacionConsultoria() {
  const { locale } = useLang();
  const t = formacionI18n[locale] || formacionI18n.es;

  return (
    <>
      <Helmet>
        <title>{t.helmetTitle}</title>
        <meta name="description" content={t.helmetDesc} />
        <meta property="og:title" content={t.helmetOgTitle} />
        <meta property="og:description" content={t.helmetOgDesc} />
        <link
          rel="canonical"
          href="https://mumabatcompany.com/servicios/formacion"
        />
      </Helmet>
      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative bg-fondo-base pt-40 pb-24 px-6 overflow-hidden">
          {/* Halo verde — mismo patrón que nosotros.jsx */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] text-marca-principal uppercase mb-5"
            >
              {t.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-6"
            >
              {t.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-texto-secundario leading-relaxed max-w-2xl"
            >
              {t.heroDesc}
            </motion.p>
          </div>
        </section>

        {/* ── GRUPOS DE SERVICIOS — fondos alternos ── */}
        {t.grupos.map((grupo, gi) => (
          <section key={gi} className={`${fondosPorGrupo[gi]} py-20 px-6`}>
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {/* Cabecera del grupo */}
                <div className="mb-10">
                  <p className="text-xs font-bold tracking-[0.25em] text-marca-principal uppercase mb-3">
                    {String(gi + 1).padStart(2, "0")} — {grupo.categoria}
                  </p>
                  <h2 className="text-2xl font-bold text-texto-titulo mb-2">
                    {grupo.categoria}
                  </h2>
                  <p className="text-sm text-texto-secundario max-w-xl">
                    {grupo.desc}
                  </p>
                </div>

                {/* Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {grupo.servicios.map(
                    ({ titulo, desc, para, img }, i) => (
                      <div
                        key={i}
                        className="bg-fondo-superficie rounded-2xl card-lila hover:opacity-90 transition-all duration-300 flex flex-col overflow-hidden"
                      >
                        {img && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={img}
                              alt={titulo}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-7 flex flex-col flex-1">
                          <h3 className="text-base font-bold text-texto-titulo mb-3 leading-tight">
                            {titulo}
                          </h3>
                          <p className="text-sm text-texto-secundario leading-relaxed mb-4 flex-1">
                            {desc}
                          </p>
                          <p className="text-[10px] font-bold tracking-widest text-marca-principal/60 uppercase mb-5">
                            {para}
                          </p>
                          <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-marca-principal/40 text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion hover:border-marca-principal transition-all duration-200 no-underline group self-start"
                          >
                            {t.cardCta}
                            <ArrowRight
                              size={13}
                              className="group-hover:translate-x-0.5 transition-transform duration-200"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* ── AVALES ── */}
        <section className="bg-fondo-secundario py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-fondo-superficie rounded-2xl card-lila p-10 flex flex-col md:flex-row gap-10 items-center"
            >
              <div className="flex-1">
                <p className="text-xs font-bold tracking-[0.2em] text-marca-principal uppercase mb-3">
                  {t.avalesEyebrow}
                </p>
                <h3 className="text-2xl font-bold text-texto-titulo mb-4 leading-tight">
                  {t.avalesTitle}
                </h3>
                <p className="text-texto-secundario text-sm leading-relaxed">
                  {t.avalesDesc}
                </p>
              </div>
              <div className="flex flex-wrap md:flex-col gap-4 shrink-0 items-center">
                <img
                  src="/images/Logo_SECEMU.webp"
                  alt="SECEMU"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
                <img
                  src="/images/EUROBATS_logo.webp"
                  alt="EUROBATS"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
                <img
                  src="/images/Murcielagos-Malaga-ST3ER-Proyect-2-1024x266.webp"
                  alt="ST3ER — SMP COSME UE"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
                <img
                  src="/images/europa.webp"
                  alt="Fondos FEDER — Unión Europea"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-fondo-base py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-texto-titulo mb-4">
                {t.ctaTitle}
              </h3>
              <p className="text-texto-secundario mb-8 max-w-lg mx-auto">
                {t.ctaDesc}
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-marca-principal text-texto-sobre-accion font-bold rounded-xl hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
              >
                {t.ctaBtn} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
