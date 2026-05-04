import React, { useEffect, useState } from 'react';

interface Refugio {
  id: string
  codigo: string
  nombre: string
  municipio: string
  provincia: string
  latitud: number
  longitud: number
  tipo_refugio: string | null
  orientacion: string | null
  material: string | null
  soporte: string | null
  altitud_metros: number | null
  fecha_instalacion: string | null
  observaciones: string | null
  activo: boolean
}

interface MapaAdminProps {
  refugios: Refugio[];
  onSelect: (r: Refugio) => void;
}

export default function MapaAdmin({ refugios, onSelect }: MapaAdminProps) {
  const [Componentes, setComponentes] = useState<any>(null);
  const centro: [number, number] = [36.7213, -4.4214];

  // Cargamos Leaflet solo en el cliente
  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet')
    ]).then(([rl, L]) => {
      const leafletLib = L.default || L;
      
      // Función para crear chinchetas SVG profesionales
      const createPin = (color: string) => leafletLib.divIcon({
        className: 'custom-chincheta',
        html: `<svg viewBox="0 0 384 512" style="width:28px; height:40px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.5));">
          <path fill="${color}" stroke="#ffffff" stroke-width="15" d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.4 0z"/>
          <circle cx="192" cy="192" r="70" fill="#ffffff" />
        </svg>`,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
        popupAnchor: [0, -40]
      });

      const mumaIcon = createPin('#1fe1a7');
      const mumaIconInactivo = createPin('#ef4444');

      setComponentes({ ...rl, mumaIcon, mumaIconInactivo });
    });
  }, []);

  if (!Componentes) return <div style={{ height: '100%', width: '100%', background: '#e5e5e5' }} />;

  const { MapContainer, TileLayer, Marker, Popup, mumaIcon, mumaIconInactivo } = Componentes;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={centro}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#e5e5e5', borderRadius: '0 0 12px 12px' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
        />
        {refugios.filter(r => r.latitud && r.longitud).map((r) => (
          <Marker 
            key={r.id} 
            position={[r.latitud, r.longitud]} 
            icon={r.activo ? mumaIcon : mumaIconInactivo}
            eventHandlers={{
              click: () => onSelect(r),
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
                <strong style={{ color: '#1fe1a7', fontSize: '12px' }}>{r.codigo}</strong><br />
                <strong style={{ fontSize: '14px' }}>{r.nombre}</strong><br />
                <span style={{ fontSize: '12px', color: '#666' }}>{r.municipio}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
