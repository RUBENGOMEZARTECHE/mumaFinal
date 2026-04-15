import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Sub-componente interno para los inputs
function Campo({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}: any) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-marca-principal/50 transition-colors"
      />
    </div>
  );
}

// Interfaz TypeScript para las propiedades dinámicas
interface OpcionSelect {
  valor: string;
  texto: string;
}

interface FormularioMumaProps {
  tablaBD: string;
  asuntoCorreo: string;
  textoBoton: string;
  selectName: string;
  selectLabel: string;
  opcionesSelect: OpcionSelect[];
  mostrarOrganizacion?: boolean;
  mostrarParticipantes?: boolean;
  mostrarFecha?: boolean;
  mostrarSelect?: boolean;
}

export default function FormularioMuma({
  tablaBD,
  asuntoCorreo,
  textoBoton,
  selectName,
  selectLabel,
  opcionesSelect,
  mostrarOrganizacion = true,
  mostrarParticipantes = true,
  mostrarFecha = true,
  mostrarSelect = true
}: FormularioMumaProps) {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const nombre = (data.get("nombre") as string) || "";
    const email = (data.get("email") as string) || "";
    const organizacion = (data.get("organizacion") as string) || "";
    const segmento = (data.get("segmento") as string) || "";
    const valorSelect = (data.get(selectName) as string) || "";
    const participantesRaw = data.get("participantes") as string;
    const fechaRaw = data.get("fecha") as string;
    const rgpdRaw = data.get("rgpd");
    // Objeto dinámico: inyecta el nombre de la columna select dinámicamente
    const datosBD: any = {
      nombre: nombre,
      email: email,
      organizacion: organizacion,
      segmento: segmento,
      acepta_rgpd: rgpdRaw === "on" ? true : false,
      estado: "nuevo",
    };

    datosBD[selectName] = valorSelect;
    if (tablaBD !== "solicitudes_refugios") {
      if (fechaRaw) {
        datosBD.fecha_evento = fechaRaw;
      }

      if (participantesRaw) {
        datosBD.participantes_estimados = parseInt(participantesRaw);
      }
    }

    try {
      // Usamos la tabla dinámica que nos pasan por prop
      const { error: dbError } = await supabase.from(tablaBD).insert([datosBD]);
      if (dbError) throw dbError;

      const cuerpo = [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Organización: ${organizacion}`,
        `${selectLabel}: ${valorSelect}`,
        `Participantes estimados: ${participantesRaw}`,
        `Fecha seleccionada: ${fechaRaw}`,
      ].join("\n");

      const subject = encodeURIComponent(`${asuntoCorreo} — ${nombre}`);
      const body = encodeURIComponent(cuerpo);

      window.location.href = `mailto:info@murcielagosmalaga.com?subject=${subject}&body=${body}`;

      setEnviado(true);
      form.reset();
    } catch (err: any) {
      console.error("Error MUMA:", err);
      setError(
        "Error de conexión. Inténtalo de nuevo o contáctanos por WhatsApp.",
      );
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-fondo-superficie rounded-2xl p-10 border border-marca-principal/20 text-center shadow-2xl"
      >
        <CheckCircle
          size={40}
          className="text-marca-principal mx-auto mb-4"
          aria-hidden="true"
        />
        <h3 className="text-xl font-bold text-texto-titulo mb-2">
          Solicitud recibida
        </h3>
        <p className="text-texto-secundario text-sm">
          Nos pondremos en contacto contigo en menos de 48 horas.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        oculto: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.1 },
        },
      }}
      onSubmit={handleSubmit}
      className="bg-fondo-superficie rounded-2xl p-8 border border-white/5 space-y-5 text-left shadow-xl"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Campo id="nombre" name="nombre" label="Nombre Responsable" required />
        <Campo
          id="email"
          name="email"
          type="email"
          label="Email Corporativo"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="segmento" className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5">Perfil</label>
          <select id="segmento" name="segmento" required defaultValue="" className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-marca-principal/50 transition-colors appearance-none">
            <option value="" disabled>¿Quién eres?</option>
            <option value="Empresa/Institución">Empresa / Inst. Pública</option>
            <option value="Agricultor">Agricultor</option>
            <option value="Particular">Particular / Estudiante</option>
          </select>
        </div>
        <Campo
          id="organizacion"
          name="organizacion"
          label="Organización"
          required
        />
      </div>

      <div>
        <label
          htmlFor={selectName}
          className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5"
        >
          {selectLabel}
        </label>
        <select
          id={selectName}
          name={selectName}
          required
          defaultValue=""
          className="w-full bg-fondo-base border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-marca-principal/50 transition-colors appearance-none"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {opcionesSelect.map((opcion, i) => (
            <option key={i} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Campo
          id="participantes"
          name="participantes"
          label="Participantes estimados"
          placeholder="Ej: 100"
        />
        <Campo
          id="fecha"
          name="fecha"
          type="date"
          label="Fecha deseada"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="privacidad"
          required
          className="accent-marca-principal w-4 h-4 shrink-0"
        />
        <span className="text-xs text-texto-secundario/60 italic">
          Acepto el tratamiento de datos para fines de consultoría ambiental.
        </span>
      </div>

      {error && (
        <p className="text-red-500 text-[10px] text-center font-bold uppercase">
          {error}
        </p>
      )}

      <button
        disabled={cargando}
        type="submit"
        className="w-full bg-marca-principal text-texto-sobre-accion font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-marca-principal-hover transition-all active:scale-95 disabled:opacity-50"
      >
        <ArrowRight size={18} aria-hidden="true" />
        {cargando ? "SINCRONIZANDO..." : textoBoton}
      </button>

      <p className="text-xs text-center text-texto-secundario/50 mt-4">
        O escríbenos por{" "}
        <a
          href="https://wa.me/34664213450"
          target="_blank"
          rel="noopener noreferrer"
          className="text-marca-principal hover:opacity-80 transition-opacity no-underline"
        >
          WhatsApp
        </a>
      </p>
    </motion.form>
  );
}
