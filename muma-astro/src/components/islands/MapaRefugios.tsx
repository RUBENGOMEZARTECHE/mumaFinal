import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { supabase } from "../../lib/supabase";

// Diseño del Pin Corporativo MUMA
const customIcon = L.divIcon({
  className: "custom-muma-pin",
  html: `<div style="background-color: #1fe1a7; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 12px #1fe1a7;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface Refugio {
  id: string | number;
  nombre: string;
  codigo: string;
  latitud: any;
  longitud: any;
  municipio: string;
}

export default function MapaRefugios() {
  const [refugios, setRefugios] = useState<Refugio[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full h-full relative" style={{ background: "#050505" }}>
      
      {/* Capa de carga flotante (Evita desmontar el MapContainer) */}
      {loading && (
        <div className="absolute inset-0 bg-[#050505] z-[9999] flex items-center justify-center text-zinc-500 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
          Sincronizando MUMA_DATA...
        </div>
      )}

      <MapContainer
        center={[36.7213, -4.4214]}
        zoom={10}
        minZoom={2}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | MUMA SL"
          noWrap={true}
        />

        {refugios
          // Filtramos posiciones válidas para curarnos en salud si hay nulos en la BD
          .filter((r) => r.latitud && r.longitud)
          .map((r) => (
            <Marker
              key={r.id}
              position={[Number(r.latitud), Number(r.longitud)]}
              icon={customIcon}
            >
              <Popup>
                <div className="font-sans text-black p-1">
                  <strong className="text-emerald-500">{r.nombre}</strong>
                  <br />
                  <span className="text-[10px] text-gray-400 font-bold tracking-wider">
                    {r.codigo} {r.municipio ? `— ${r.municipio}` : ""}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}