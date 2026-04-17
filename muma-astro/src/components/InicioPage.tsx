import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import FormularioMuma from "./formularioContacto";

// --- COMPONENTES INTERNOS (BLOQUES) ---

const Hero = () => {
  const backgroundImage = "/images/dentro-cueva.webp";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* --- CONTENEDOR DE FONDO --- */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Trabajo de campo MUMA"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505] z-10" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] z-20" />
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 text-center">
        {/* TAG */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1.5 mb-8 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold uppercase tracking-[0.3em]"
        >
          Ciencia &middot; Tecnología &middot; Conservación
        </motion.span>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8"
        >
          Una empresa. Cinco servicios.{" "}
          <span className="text-[#10b981]">Murciélagos como solución real.</span>
        </motion.h1>

        {/* P */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-light"
        >
          Trabajamos con{" "}
          <span className="text-white font-medium">
            ayuntamientos, museos, centros educativos y administraciones
          </span>{" "}
          que quieren integrar los murciélagos como herramienta de{" "}
          <span className="text-white font-medium">
            conservación, control de plagas, divulgación o experiencia inmersiva.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="/servicios/realidad-virtual"
            className="group flex items-center gap-3 px-10 py-5 bg-marca-principal text-texto-sobre-accion font-bold rounded-2xl hover:bg-marca-principal-hover hover:scale-105 transition-all shadow-[0_0_30px_rgba(31,225,167,0.3)] no-underline"
          >
            Ver la Batcave Experience{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/contacto"
            className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all no-underline backdrop-blur-sm"
          >
            Contacto
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 z-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#10b981] to-transparent" />
      </div>
    </section>
  );
};

const Diferenciacion = () => {
  const items = [
    {
      title: "Ciencia de campo",
      desc: "Más de una década estudiando colonias, grabando ultrasonidos y construyendo el único archivo bioacústico privado de quirópteros ibéricos. El conocimiento no es decoración es la base de cada servicio.",
      bg: "/images/colonia_murcielago01.webp",
      link: "/nosotros",
      cta: "Conocer el equipo",
    },
    {
      title: "Tecnología que tiene fondo",
      desc: "La Batcave Experience no es una recreación es una cueva real digitalizada en 3D. Lista para instalar en museos, centros comerciales o espacios naturales sin obra ni infraestructura adicional.",
      bg: "/images/chica-realidad-virtual.webp",
      link: "/servicios/realidad-virtual",
      cta: "Ver la Batcave Experience",
    },
    {
      title: "Comunidad e impacto real",
      desc: "Más de 700 personas en eventos MUMA durante 2025. Bat Nights, talleres científicos y actividades con ayuntamientos, reservas naturales y centros educativos. La conservación ocurre cuando la gente entiende.",
      bg: "/images/1batnights.webp",
      link: "/servicios/bat-night",
      cta: "Ver próximas Bat Nights",
    },
  ];

  return (
    <section className="py-32 bg-[#050505] px-6 relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#10b981]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-[#10b981] text-xs font-bold tracking-[0.4em] uppercase mb-6">
            Por qué MUMA es diferente
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            No hacemos marketing ambiental. <br />
            <span className="text-zinc-500">
              Hacemos trabajo de campo.
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-purple-500 transition-all duration-500 flex flex-col justify-end min-h-[480px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={item.bg}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                {/* Gradiente más agresivo: cubre 70% de la tarjeta desde abajo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/10" />
              </div>

              <div className="relative z-10 p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                  {item.title}
                </h3>
                <p className="text-zinc-200 leading-relaxed font-medium text-[15px] mb-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                  {item.desc}
                </p>
                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-marca-principal text-texto-sobre-accion text-sm font-bold rounded-xl hover:bg-marca-principal-hover transition-all duration-200 no-underline self-start"
                >
                  {item.cta} <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Segmentacion = () => {
  const perfiles = [
    {
      tipo: "Museos y centros culturales",
      desc: "Instala la Batcave Experience en tu espacio. Sin obra, sin infraestructura. Montamos, operamos y recogemos.",
      etiqueta: "Realidad Virtual",
      link: "/servicios/realidad-virtual",
      img: "/images/museos.webp",
      cta: "Ver la experiencia",
    },
    {
      tipo: "Ayuntamientos y espacios naturales",
      desc: "Bat Nights para tu municipio o reserva. Eventos nocturnos con ultrasonidos y VR para conectar al público con la naturaleza.",
      etiqueta: "Bat Nights",
      link: "/servicios/bat-night",
      img: "/images/ayuntamientos.webp",
      cta: "Ver Bat Nights",
    },
    {
      tipo: "Agricultores y fincas",
      desc: "Una colonia de murciélagos elimina hasta 3.000 insectos por noche. Instalamos refugios certificados como alternativa real a los pesticidas.",
      etiqueta: "Refugios",
      link: "/servicios/refugios",
      img: "/images/agricultores.webp",
      cta: "Ver refugios",
    },
    {
      tipo: "Instituciones y administraciones",
      desc: "Informes bioacústicos, consultoría jurídico-ambiental y formación técnica con respaldo SECEMU y marco EUROBATS.",
      etiqueta: "Consultoría",
      link: "/servicios/formacion",
      img: "/images/instituciones.webp",
      cta: "Ver consultoría",
    },
  ];

  return (
    <section className="py-24 bg-[#050505] px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            ¿Con quién trabajamos?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-xl">
            Encuentra lo que <br />
            <span className="text-[#10b981]">es para ti.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {perfiles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <a
                href={p.link}
                className="group relative flex flex-col h-full p-8 rounded-2xl border border-white/8 shadow-lg hover:border-purple-400 transition-all duration-300 no-underline overflow-hidden"
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 z-0">
                  <img src={p.img} alt={p.tipo} className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[10px] font-bold tracking-widest text-[#1fe1a7] uppercase mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                    {p.etiqueta}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1fe1a7] transition-colors" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                    {p.tipo}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                    {p.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-marca-principal text-texto-sobre-accion text-sm font-bold rounded-xl self-start group-hover:bg-marca-principal-hover transition-colors duration-200">
                    {p.cta} <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Servicios = () => {
  const servicios = [
    {
      title: "Realidad Virtual",
      desc: "La Batcave Experience: una cueva de murciélagos en tu espacio. Lista para instalar, sin obra.",
      link: "/servicios/realidad-virtual",
      img: "/images/chica-realidad-virtual.webp",
    },
    {
      title: "Bat Nights",
      desc: "Eventos nocturnos con ultrasonidos y VR. Más de 200 personas por edición en 2025.",
      link: "/servicios/bat-night",
      img: "/images/1batnights.webp",
    },
    {
      title: "Refugios",
      desc: "Refugios artesanales para colonias de murciélagos. Control biológico de plagas sin pesticidas.",
      link: "/servicios/refugios",
      img: "/images/refugio_doble.webp",
    },
    {
      title: "Consultoría",
      desc: "Asesoramiento científico con respaldo SECEMU y proyecto europeo ST3ER.",
      link: "/servicios/formacion",
      img: "/images/Eventos-cientificos-Plaza-Mayor5-300x300.webp",
    },
  ];

  return (
    <section className="py-24 bg-[#080808] px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
          Nuestras líneas de <span className="text-[#10b981]">acción</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((s, i) => (
            <a
              key={i}
              href={s.link}
              className="group relative rounded-3xl border border-white/8 shadow-lg hover:border-purple-400 transition-all duration-500 no-underline overflow-hidden flex flex-col justify-end"
              style={{ height: 280 }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 z-0">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="relative z-10 p-6">
                <h4 className="text-xl font-bold text-white group-hover:text-marca-principal transition-colors mb-1">
                  {s.title}
                </h4>
                <p className="text-gray-300 text-sm leading-snug">
                  {s.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProximosEventos = () => {
  const eventosEstaticos = [
    { dia: "24", mes: "ABR", lugar: "Guaro", provincia: "Málaga", img: "/images/Proyecto-Batnight-Guaro.webp" },
    { dia: "22", mes: "MAY", lugar: "Almargen", provincia: "Málaga", img: "/images/Bat-Nigt-Malaga2.webp" },
    { dia: "5", mes: "JUN", lugar: "Pizarra", provincia: "Málaga", img: "/images/Bat-Nigt-Malaga3.webp" },
  ];

  const [eventos, setEventos] = useState(eventosEstaticos);

  useEffect(() => {
    supabase
      .from('eventos_batnight')
      .select('id, nombre, fecha_evento, municipio')
      .eq('publicado', true)
      .limit(3)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          // Mapeamos a la estructura requerida usando las imágenes estáticas ciclo a ciclo
          const mapped = data.map((d, index) => {
            const date = new Date(d.fecha_evento);
            const diaFormateado = isNaN(date.getTime()) ? "??" : date.getDate().toString();
            // Truco rápido para sacar el mes corto en es-ES (abr, may, jun)
            const mesFormateado = isNaN(date.getTime()) 
                ? "MES" 
                : date.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
            
            return {
              dia: diaFormateado,
              mes: mesFormateado.replace('.', ''),
              lugar: d.municipio || d.nombre,
              provincia: d.municipio ? d.nombre : "España",
              img: eventosEstaticos[index % eventosEstaticos.length].img,
            };
          });
          setEventos(mapped);
        }
      });
  }, []);

  return (
    <section className="py-24 bg-[#050505] px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Próximas Bat Nights — 2025
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Eventos con fecha confirmada.
            </h2>
          </div>
          <a href="/servicios/bat-night" className="text-sm font-bold text-[#10b981] hover:underline no-underline shrink-0">
            Ver todos los eventos →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {eventos.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400 transition-all duration-500"
              style={{ height: 420 }}
            >
              {/* Imagen de fondo */}
              <img
                src={e.img}
                alt={e.lugar}
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Fecha en esquina superior */}
              <div className="absolute top-6 left-6 z-10 text-center bg-[#10b981] rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-black font-black text-3xl leading-none">{e.dia}</p>
                <p className="text-black font-bold text-sm tracking-widest uppercase">{e.mes}</p>
              </div>

              {/* Contenido inferior */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
                <p className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-2">Plazas limitadas</p>
                <h3 className="text-white font-black text-3xl mb-1">{e.lugar}</h3>
                <p className="text-gray-400 text-sm mb-6">{e.provincia}</p>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-marca-principal text-texto-sobre-accion text-sm font-bold rounded-xl hover:bg-marca-principal-hover hover:scale-105 active:scale-95 transition-all duration-200 no-underline group-hover:shadow-[0_0_20px_rgba(31,225,167,0.4)]"
                >
                  Reservar plaza →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};


const Credibilidad = () => (
  <section className="bg-white py-14 border-y border-gray-100 overflow-hidden">

    {/* Label */}
    <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase text-center mb-10">
      Respaldados por instituciones científicas y europeas
    </p>

    {/* Logo único centrado */}
    <div className="flex justify-center">
      <img
        src="/images/Murcielagos-Malaga-ST3ER-Proyect-2-1024x266.webp"
        alt="Proyecto ST3ER — FEDER"
        className="h-24 object-contain"
      />
    </div>

    {/* 3 frases de credibilidad */}
    <div className="max-w-5xl mx-auto px-6 mt-12 flex flex-col md:flex-row gap-8 text-center border-t border-gray-100 pt-10">
      {[
        { titulo: "Archivo único", texto: "Único archivo bioacústico privado de quirópteros ibéricos. No existe equivalente generado por una empresa privada en España." },
        { titulo: "Proyecto europeo completado", texto: "ST3ER finalizado en 3 países  España, Portugal y Eslovenia. Producto comercial activo, no prototipo." },
        { titulo: "Más de 700 personas en 2025", texto: "Experiencias VR reales en museos, reservas naturales y espacios culturales. Feedback directo de campo." },
      ].map((item, i) => (
        <div key={i} className="flex-1 px-4">
          <p className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-3">{item.titulo}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{item.texto}</p>
        </div>
      ))}
    </div>

  </section>
);

const Vision = () => (
  <section className="py-24 bg-[#050505] px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
          Un archivo que{" "}
          <span className="text-[#10b981]">no existe en ningún otro sitio.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          Durante años de trabajo de campo, MUMA ha construido el único archivo bioacústico privado de quirópteros ibéricos: grabaciones reales, mapas de distribución y datos de colonias en tres países europeos.
        </p>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Ese conocimiento es la base de cada servicio que ofrecemos. No somos un centro de interpretación somos el equipo que lo documentó.
        </p>
        <a
          href="/nosotros"
          className="inline-flex items-center gap-2 text-[#10b981] font-bold hover:underline no-underline"
        >
          Conocer el equipo <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4">
        {[
          { img: "/images/Murcielagos-Malaga-ST3ER-Proyect-2-1024x266.webp", alt: "Proyecto ST3ER" },
          { img: "/images/Logo_SECEMU.webp", alt: "SECEMU" },
          { img: "/images/EUROBATS_logo.webp", alt: "EUROBATS" },
          { img: "/images/europa.webp", alt: "Unión Europea — FEDER" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-acento-tecnologico-hover border border-white/10 shadow-md flex items-center justify-center" style={{ minHeight: 110 }}>
            <img src={item.img} alt={item.alt} className="max-h-14 max-w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTAFinal = () => (
  <section className="py-24 px-6">
    <div className="max-w-4xl mx-auto p-12 rounded-[2rem] bg-gradient-to-br from-[#10b981] to-[#059669] text-center shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
        La Batcave Experience está lista. ¿Hablamos?
      </h2>
      <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
        Sin obra, sin infraestructura. Montamos, operamos y recogemos. Tu espacio acoge la experiencia.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contacto"
          className="px-10 py-4 bg-black text-white font-bold rounded-xl hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-200 no-underline"
        >
          Pedir información
        </a>
        <a
          href="/servicios/realidad-virtual"
          className="px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 no-underline"
        >
          Ver la experiencia completa
        </a>
      </div>
    </div>
  </section>
);

const Captacion = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden border-t border-white/5">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bat-night-eslovenia.webp"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        <p className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Batcave Experience — Lista de espera
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Sé el primero en saber <br />
          cuándo está disponible.
        </h2>
        <p className="text-white/70 mb-10 max-w-md mx-auto">
          Más de 700 personas ya la han probado en eventos. Cuando abramos acceso directo, avisamos primero a esta lista.
        </p>

        <FormularioMuma 
          tablaBD="consultas_web"
          asuntoCorreo="[Web Inicio] Nueva alta en lista de espera Batcave"
          textoBoton="APUNTARME AHORA"
          mostrarNombre={false}
          mostrarOrganizacion={false}
          mostrarTelefono={false}
          mostrarMensaje={false}
          mostrarSelect={false}
          mostrarFecha={false}
          mostrarParticipantes={false}
          nombreCampoNombre="nombre_contacto"
          camposOcultos={{
            tipo_solicitud: 'batcave_waitlist',
            origen: 'web_inicio'
          }}
        />

        <p className="text-white/50 text-xs mt-6">Sin spam. Solo novedades de la Batcave Experience.</p>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function InicioPage() {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-[#10b981] selection:text-black">
      <Hero />
      <Credibilidad />
      <Diferenciacion />
      <Segmentacion />
      <Servicios />
      <ProximosEventos />
      <Vision />
      <Captacion />
      <CTAFinal />
    </main>
  );
}
