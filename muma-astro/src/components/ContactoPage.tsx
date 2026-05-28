import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import FormularioMuma from "./formularioContacto";

const varianteSeccion = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const metodos = [
  {
    Icono: Mail,
    titulo: "Email",
    valor: "info@murcielagosmalaga.com",
    href: "mailto:info@murcielagosmalaga.com",
    etiqueta: "Escríbenos",
  },
  {
    Icono: MessageCircle,
    titulo: "WhatsApp",
    valor: "+34 664 213 450",
    href: "https://wa.me/34664213450",
    etiqueta: "Abrir chat",
  },
  {
    Icono: MapPin,
    titulo: "Ubicación",
    valor: "Polo Digital de Málaga",
    href: null,
    etiqueta: null,
  },
];

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-fondo-base text-white">
      {/* Cabecera */}
      <motion.section
        variants={varianteSeccion}
        initial="oculto"
        animate="visible"
        className="pt-44 pb-12 text-center px-6"
      >
        <span className="inline-block text-marca-principal text-sm font-semibold tracking-widest uppercase mb-4">
          Contacto
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
          Hablemos
        </h1>
        <p className="text-white text-lg max-w-xl mx-auto italic font-light">
          Especialistas en bioacústica y soluciones de biodiversidad.
        </p>
      </motion.section>

      {/* Métodos Rápidos */}
      <section className="max-w-3xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {metodos.map(({ Icono, titulo, valor, href, etiqueta }) => (
          <div
            key={titulo}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all"
          >
            <Icono className="text-marca-principal mb-4" size={24} />
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
              {titulo}
            </p>
            <p className="text-sm font-bold text-white mb-3">{valor}</p>
            {href && (
              <a
                href={href}
                className="text-marca-principal text-xs font-bold hover:underline"
              >
                {etiqueta} →
              </a>
            )}
          </div>
        ))}
      </section>

      {/* Banner Calendly */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-fondo-superficie rounded-2xl border border-white/5 hover:border-purple-400 transition-colors duration-300 p-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">
            Agenda una llamada
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-4">
            ¿Prefieres hablar directamente?
          </h2>
          <p className="text-white max-w-lg mx-auto mb-8">
            Reserva una reunión de 30 minutos con el equipo de Muma Bat Company
            y cuéntanos tu proyecto sin compromiso.
          </p>
          <a
            href="https://calendly.com/amoret-sbn/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
          >
            Reservar reunión de 30 minutos →
          </a>
        </div>
      </section>

      {/* Formulario Unificado */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-10">
            Envío de Solicitud Técnica
          </h2>

          <FormularioMuma
            tablaBD="contactos"
            asuntoCorreo="[Web Contacto] Nueva consulta técnica"
            textoBoton="ENVIAR A DIRECCIÓN TÉCNICA"
            // Configuración de campos
            mostrarOrganizacion={false}
            mostrarTelefono={true}
            mostrarMensaje={true}
            mostrarFecha={false}
            mostrarParticipantes={false}
            // Mapeo con la BD
            selectName="motivo" // Coincide con la columna 'motivo' de tu imagen
            selectLabel="Motivo de la consulta"
            // RGPD: En esta tabla la columna se llama 'privacidad',
            // que es el valor por defecto del componente, así que no hace falta prop extra.

            opcionesSelect={[
              { valor: "Refugios", texto: "Refugios para murciélagos" },
              {
                valor: "Realidad Virtual",
                texto: "Realidad Virtual / Museo VR",
              },
              { valor: "Bat Night", texto: "Organizar Bat Night" },
              { valor: "Formación", texto: "Consultoría y Formación" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
