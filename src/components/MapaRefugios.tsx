import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para el icono lila de MUMA
const mumaIcon = L.divIcon({
  className: 'custom-muma-pin',
  html: `<div style="background-color: #a855f7; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 12px #a855f7;"></div>`,
  iconSize: [14, 14],
});

export default function MapaRefugios() {
  const position: [number, number] = [36.7213, -4.4214]; // Málaga HQ

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