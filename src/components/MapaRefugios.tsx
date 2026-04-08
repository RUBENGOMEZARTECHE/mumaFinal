import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Refugio {
  id: string;
  nombre: string;
  municipio: string;
  latitud: number;
  longitud: number;
  tipo_refugio: string;
}

export default function MapaRefugios() {
  const [Componentes, setComponentes] = useState<any>(null);
  const [refugios, setRefugios] = useState<Refugio[]>([]);
  const centro: [number, number] = [36.7213, -4.4214];

  // Cargamos refugios desde Supabase
  useEffect(() => {
    supabase
      .from('refugios')
      .select('id, nombre, municipio, latitud, longitud, tipo_refugio')
      .eq('activo', true)
      .then(({ data, error }) => {
        if (error) console.error('Error cargando refugios:', error.message);
        else setRefugios(data || []);
      });
  }, []);

  // Cargamos Leaflet solo en el cliente
  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
      import('leaflet/dist/leaflet.css' as any),
    ]).then(([rl, L]) => {
      const mumaIcon = L.default.divIcon({
        className: 'custom-muma-pin',
        html: `<div style="background-color: #a855f7; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 12px #a855f7;"></div>`,
        iconSize: [14, 14],
      });
      setComponentes({ ...rl, mumaIcon });
    });
  }, []);

  if (!Componentes) return <div style={{ height: '100%', width: '100%', background: '#050505' }} />;

  const { MapContainer, TileLayer, Marker, Popup, mumaIcon } = Componentes;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={centro}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#050505' }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />
        {refugios.map((r) => (
          <Marker key={r.id} position={[r.latitud, r.longitud]} icon={mumaIcon}>
            <Popup>
              <div className="font-sans text-black">
                <strong>{r.nombre}</strong><br />
                {r.municipio} · {r.tipo_refugio}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}