import React, { useState, useEffect } from "react";
// ⚠️ IMPORTANTE: Ajusta la ruta de importación de Supabase según tu proyecto
import { supabase } from "../lib/supabase"; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refugioAEditar: any | null;
  onSuccess: () => void; // Función para recargar la tabla tras guardar
}

export default function ModalFormularioRefugio({ isOpen, onClose, refugioAEditar, onSuccess }: ModalProps) {
  // Estados del formulario (Controlados)
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [tipoRefugio, setTipoRefugio] = useState("");
  const [soporte, setSoporte] = useState("");
  const [fechaInstalacion, setFechaInstalacion] = useState("");
  const [activo, setActivo] = useState(true);

  // Estados de la interfaz
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EFECTO: Rellenar o vaciar el formulario cuando se abre el modal
  useEffect(() => {
    if (refugioAEditar) {
      setCodigo(refugioAEditar.codigo || "");
      setNombre(refugioAEditar.nombre || "");
      setMunicipio(refugioAEditar.municipio || "");
      setTipoRefugio(refugioAEditar.tipo_refugio || "");
      setSoporte(refugioAEditar.soporte || "");
      setFechaInstalacion(refugioAEditar.fecha_instalacion ? refugioAEditar.fecha_instalacion.split("T")[0] : "");
      setActivo(refugioAEditar.activo !== false); // Por defecto true a menos que sea explícitamente false
    } else {
      // Limpiar todo si es "Nuevo Refugio"
      setCodigo(""); setNombre(""); setMunicipio("");
      setTipoRefugio(""); setSoporte(""); setFechaInstalacion("");
      setActivo(true);
    }
    setError(null);
  }, [refugioAEditar, isOpen]);

  if (!isOpen) return null;

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const datosGuardar = {
      codigo, nombre, municipio, tipo_refugio: tipoRefugio, soporte,
      fecha_instalacion: fechaInstalacion || null, activo
    };

    try {
      if (refugioAEditar?.id) {
        // MODO EDICIÓN
        const { error: errUpdate } = await supabase
          .from("refugios")
          .update(datosGuardar)
          .eq("id", refugioAEditar.id);
        if (errUpdate) throw errUpdate;
      } else {
        // MODO CREACIÓN
        const { error: errInsert } = await supabase
          .from("refugios")
          .insert([datosGuardar]);
        if (errInsert) throw errInsert;
      }

      onSuccess(); // Recargamos la tabla
      onClose();   // Cerramos el modal
    } catch (err: any) {
      console.error("Error en BD:", err);
      setError(err.message || "Error de conexión con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl shadow-purple-500/10 overflow-hidden">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h3 className="text-white font-bold text-lg">
            {refugioAEditar ? "Editar Refugio" : "Nuevo Refugio"}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-xl leading-none">&times;</button>
        </div>

        {/* Formulario */}
        <form onSubmit={manejarEnvio} className="p-5 flex flex-col gap-4">
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Código *</label>
              <input required type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none" placeholder="Ej: MUR-01" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none" placeholder="Nombre descriptivo" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Tipo de Refugio</label>
              <input type="text" value={tipoRefugio} onChange={(e) => setTipoRefugio(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none" placeholder="Ej: Caja nido" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Soporte</label>
              <input type="text" value={soporte} onChange={(e) => setSoporte(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none" placeholder="Ej: Árbol" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Municipio</label>
              <input type="text" value={municipio} onChange={(e) => setMunicipio(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none" placeholder="Ej: Málaga" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Fecha Instalación</label>
              <input type="date" value={fechaInstalacion} onChange={(e) => setFechaInstalacion(e.target.value)} className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-purple-500 outline-none style-color-scheme-dark" style={{ colorScheme: "dark" }} />
            </div>
          </div>

          <label className="flex items-center gap-3 mt-2 cursor-pointer">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="w-4 h-4 accent-purple-500 cursor-pointer" />
            <span className="text-sm font-semibold text-zinc-300">Refugio Activo (Visible en mapa)</span>
          </label>

          {/* Botonera */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50">
              {loading ? "Guardando..." : (refugioAEditar ? "Guardar Cambios" : "Crear Refugio")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}