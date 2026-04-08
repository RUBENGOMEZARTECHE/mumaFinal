import React, { useEffect, useState } from 'react';

export default function MapaRefugios() {
  const [Componentes, setComponentes] = useState<any>(null);
  const position: [number, number] = [36.7213, -4.4214];

  useEffect(() => {
    // Importamos Leaflet solo en el cliente, nunca en el servidor
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
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#050505' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />
        <Marker position={position} icon={mumaIcon}>
          <Popup>
            <div className="text-black font-sans">
              <strong>MUMA SL</strong><br />
              Punto de control activo.
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}