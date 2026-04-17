import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

// Sub-componente interno: ESTÉTICA SOFT GLASS (Menos oscuro, más ligero)
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
        className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5 ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        // Fondo muy sutil, borde ligeramente más blanco, resplandor al hacer focus
        className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder-texto-secundario/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 shadow-sm"
      />
    </div>
  );
}

interface OpcionSelect {
  valor: string;
  texto: string;
}

export interface FormularioMumaProps {
  tablaBD: string;
  asuntoCorreo: string;
  textoBoton: string;
  // Select principal (tipo de espacio / formato)
  selectName?: string;
  selectLabel?: string;
  opcionesSelect?: OpcionSelect[];
  mostrarSelect?: boolean;
  // Select secundario (servicio de interés)
  mostrarSelect2?: boolean;
  selectName2?: string;
  selectLabel2?: string;
  opcionesSelect2?: OpcionSelect[];
  // Participantes: si se pasan opciones, se renderiza como select guiado
  mostrarParticipantes?: boolean;
  opcionesParticipantes?: OpcionSelect[];
  // Resto de campos
  mostrarOrganizacion?: boolean;
  mostrarFecha?: boolean;
  mostrarMensaje?: boolean;
  mostrarTelefono?: boolean;
  mostrarNombre?: boolean;
  placeholderMensaje?: string;
  nombreCampoNombre?: string;
  nombreCampoEmail?: string;
  nombreCampoTelefono?: string;
  nombreCampoMensaje?: string;
  camposOcultos?: Record<string, any>;
  // RGPD configurable por contexto
  textoRGPD?: string;
}

export default function FormularioMuma({
  tablaBD,
  asuntoCorreo,
  textoBoton,
  // Select principal
  selectName = "tipo_evento",
  selectLabel = "Formato de interés",
  opcionesSelect = [],
  mostrarSelect = true,
  // Select secundario
  mostrarSelect2 = false,
  selectName2 = "servicio_interes",
  selectLabel2 = "¿Qué servicio te interesa?",
  opcionesSelect2 = [],
  // Participantes
  mostrarParticipantes = true,
  opcionesParticipantes,
  // Resto
  mostrarOrganizacion = true,
  mostrarFecha = true,
  mostrarMensaje = false,
  mostrarTelefono = false,
  mostrarNombre = true,
  placeholderMensaje = "Escribe aquí tu mensaje...",
  nombreCampoNombre = "nombre",
  nombreCampoEmail = "email",
  nombreCampoTelefono = "telefono",
  nombreCampoMensaje = "mensaje",
  camposOcultos = {},
  textoRGPD = "Acepto el tratamiento de mis datos para recibir información comercial y respuesta a esta solicitud.",
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
    const telefono = (data.get("telefono") as string) || "";
    const organizacion = (data.get("organizacion") as string) || "";
    const valorSelect = (data.get(selectName) as string) || "";
    const valorSelect2 = (data.get(selectName2) as string) || "";
    const participantesRaw = data.get("participantes") as string;
    const fechaRaw = data.get("fecha") as string;
    const mensaje = (data.get("mensaje") as string) || "";

    const datosBD: any = {
      [nombreCampoNombre]: nombre,
      [nombreCampoEmail]: email,
      acepta_rgpd: !!data.get("rgpd"),
      estado: "nuevo",
      ...camposOcultos,
    };

    if (mostrarOrganizacion) datosBD.organizacion = organizacion;
    if (mostrarTelefono) datosBD[nombreCampoTelefono] = telefono;
    if (mostrarSelect) datosBD[selectName] = valorSelect;
    if (mostrarSelect2 && valorSelect2) datosBD[selectName2] = valorSelect2;
    if (mostrarMensaje) datosBD[nombreCampoMensaje] = mensaje;

    if (tablaBD !== "solicitudes_refugios" && tablaBD !== "consultas_web" && tablaBD !== "contactos") {
      if (mostrarFecha && fechaRaw) datosBD.fecha_evento = fechaRaw;
      if (mostrarParticipantes && participantesRaw) {
        // Si son opciones guiadas se guarda como string, si es número libre se parsea
        datosBD.participantes_estimados = opcionesParticipantes ? participantesRaw : parseInt(participantesRaw);
      }
    }

    try {
      const { error: dbError } = await supabase.from(tablaBD).insert([datosBD]);
      if (dbError) throw dbError;

      const cuerpo = [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        mostrarTelefono ? `Teléfono: ${telefono}` : "",
        mostrarOrganizacion ? `Organización: ${organizacion}` : "",
        mostrarSelect ? `${selectLabel}: ${valorSelect}` : "",
        mostrarParticipantes && participantesRaw ? `Participantes estimados: ${participantesRaw}` : "",
        mostrarFecha && fechaRaw ? `Fecha seleccionada: ${fechaRaw}` : "",
        mostrarMensaje ? `Mensaje: ${mensaje}` : "",
      ].filter(Boolean).join("\n");

      // Datos guardados en Supabase. El mailto: se elimina: abrir el cliente
      // de correo del usuario es disruptivo en B2B y no aporta valor extra.
      // La notificación al equipo debe gestionarse via Supabase Edge Function.
      void cuerpo; // evitar warning de variable no usada

      setEnviado(true);
      form.reset();
    } catch (err: any) {
      console.error("Error MUMA:", err);
      setError("Error de conexión. Inténtalo de nuevo o contáctanos por WhatsApp.");
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
        className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center shadow-xl"
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
      }}
      onSubmit={handleSubmit}
      // Contenedor principal: Mucho más ligero, bordes más blancos, sombra suave
      className="bg-white/5 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-8 space-y-5 text-left w-full relative overflow-hidden"
      noValidate
    >
      {/* Brillo ambiental blanco muy suave para iluminar el formulario desde dentro */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className={`grid grid-cols-1 ${mostrarNombre ? 'sm:grid-cols-2' : ''} gap-5 relative z-10`}>
        {mostrarNombre && (
          <Campo id="nombre" name="nombre" label="Nombre Responsable" required />
        )}
        <Campo id="email" name="email" type="email" label={mostrarNombre ? "Email Corporativo" : "Tu mejor Email"} required />
      </div>

      {mostrarTelefono && (
        <div className="relative z-10">
          <Campo id="telefono" name="telefono" type="tel" label="Teléfono de contacto" required />
        </div>
      )}

      <div className="relative z-10">
        {mostrarOrganizacion && (
          <Campo id="organizacion" name="organizacion" label="Organización / Entidad" required />
        )}
      </div>

      {mostrarSelect && (
        <div className="relative z-10">
          <label
            htmlFor={selectName}
            className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5 ml-1"
          >
            {selectLabel}
          </label>
          <select
            id={selectName}
            name={selectName}
            required
            defaultValue=""
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer shadow-sm"
          >
            <option value="" disabled className="bg-fondo-superficie text-texto-principal">Selecciona una opción</option>
            {opcionesSelect?.map((opcion, i) => (
              <option key={i} value={opcion.valor} className="bg-fondo-superficie text-texto-principal">
                {opcion.texto}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Select secundario — servicio de interés */}
      {mostrarSelect2 && (
        <div className="relative z-10">
          <label
            htmlFor={selectName2}
            className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5 ml-1"
          >
            {selectLabel2}
          </label>
          <select
            id={selectName2}
            name={selectName2}
            required
            defaultValue=""
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer shadow-sm"
          >
            <option value="" disabled className="bg-fondo-superficie text-texto-principal">Selecciona una opción</option>
            {opcionesSelect2?.map((opcion, i) => (
              <option key={i} value={opcion.valor} className="bg-fondo-superficie text-texto-principal">
                {opcion.texto}
              </option>
            ))}
          </select>
        </div>
      )}

      {mostrarMensaje && (
        <div className="relative z-10">
          <label
            htmlFor="mensaje"
            className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5 ml-1"
          >
            Mensaje / Detalles adicionales
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            placeholder={placeholderMensaje}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal placeholder-texto-secundario/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 shadow-sm resize-none"
          />
        </div>
      )}

      {(mostrarParticipantes || mostrarFecha) && (
        <div className={`grid grid-cols-1 ${mostrarParticipantes && mostrarFecha ? 'sm:grid-cols-2' : ''} gap-5 relative z-10`}>
          {mostrarParticipantes && (
            opcionesParticipantes ? (
              /* Participantes guiados: select cuando se pasan opciones */
              <div>
                <label
                  htmlFor="participantes"
                  className="block text-[10px] font-bold text-texto-secundario uppercase tracking-[0.12em] mb-1.5 ml-1"
                >
                  Participantes estimados
                </label>
                <select
                  id="participantes"
                  name="participantes"
                  required
                  defaultValue=""
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-texto-principal focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer shadow-sm"
                >
                  <option value="" disabled className="bg-fondo-superficie text-texto-principal">Selecciona un rango</option>
                  {opcionesParticipantes.map((op, i) => (
                    <option key={i} value={op.valor} className="bg-fondo-superficie text-texto-principal">
                      {op.texto}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* Participantes libre: input numérico clásico */
              <Campo id="participantes" name="participantes" label="Participantes estimados" placeholder="Ej: 100" />
            )
          )}
          {mostrarFecha && (
            <Campo id="fecha" name="fecha" type="date" label="Fecha deseada" required />
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 relative z-10">
        <input
          type="checkbox"
          id="rgpd"
          name="rgpd"
          required
          className="accent-marca-principal w-4 h-4 shrink-0 rounded-sm"
        />
        <label htmlFor="rgpd" className="text-xs text-texto-secundario/80 italic cursor-pointer">
          {textoRGPD}
        </label>
      </div>

      {error && (
        <p className="text-red-400 text-[10px] text-center font-bold uppercase tracking-wider relative z-10">
          {error}
        </p>
      )}

      <button
        disabled={cargando}
        type="submit"
        className="w-full bg-marca-principal text-texto-sobre-accion font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-marca-principal-hover transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2 relative z-10"
      >
        <ArrowRight size={18} aria-hidden="true" />
        {cargando ? "SINCRONIZANDO..." : textoBoton}
      </button>

      <p className="text-xs text-center text-texto-secundario/70 mt-4 relative z-10">
        O escríbenos por{" "}
        <a
          href="https://wa.me/34664213450"
          target="_blank"
          rel="noopener noreferrer"
          className="text-marca-principal hover:underline underline-offset-2 transition-all"
        >
          WhatsApp
        </a>
      </p>
    </motion.form>
  );
}