import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { createClient } from "@supabase/supabase-js";
import L from "leaflet";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const customIcon = L.divIcon({
  className: 'custom-chincheta',
  html: `<svg viewBox="0 0 384 512" style="width:28px; height:40px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.5));">
    <path fill="#1fe1a7" stroke="#ffffff" stroke-width="15" d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.4 0z"/>
    <circle cx="192" cy="192" r="70" fill="#ffffff" />
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40]
});

export default function MapaRefugios() {
  const [refugios, setRefugios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inyectar CSS de Leaflet dinámicamente si no está ya
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    async function traerRefugios() {
      try {
        const { data, error } = await supabase
          .from("refugios")
          .select("id, nombre, codigo, latitud, longitud, municipio")
          .eq("activo", true);

        if (error) throw error;
        setRefugios(data || []);
      } catch (err: any) {
        console.error("Error MUMA DB:", err.message);
      } finally {
        setLoading(false);
      }
    }
    traerRefugios();
  }, []);

  if (loading)
    return (
      <div className="h-full w-full bg-[#050505] flex items-center justify-center text-zinc-500 text-xs uppercase tracking-widest animate-pulse">
        Sincronizando MUMA_DATA...
      </div>
    );

  return (
    <MapContainer
      center={[36.7213, -4.4214]}
      zoom={10}
      style={{ height: "100%", width: "100%", background: "#e5e5e5" }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri'
      />
      {refugios.map((r) => (
        <Marker
          key={r.id}
          position={[Number(r.latitud), Number(r.longitud)]}
          icon={customIcon}
        >
          <Popup>
            <div className="font-sans text-black p-1">
              <strong className="text-[#1fe1a7]">{r.nombre}</strong>
              <br />
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                {r.codigo}
              </span>
              {r.municipio && (
                <>
                  <br />
                  <span className="text-[10px] text-gray-400">{r.municipio}</span>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
