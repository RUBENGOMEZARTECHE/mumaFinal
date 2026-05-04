// Island React — Mapa dinámico de refugios (Leaflet + Supabase)
// Necesita React por: dynamic import de Leaflet (evitar SSR), useEffect
import { useState, useEffect, useRef } from "react";

export default function MapaDinamicoIsland() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [MapaComp, setMapaComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("./MapaRefugios").then((m) => setMapaComp(() => m.default));
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {MapaComp ? (
        <MapaComp />
      ) : (
        <div className="h-full w-full bg-fondo-superficie flex items-center justify-center text-texto-secundario text-xs uppercase tracking-widest animate-pulse">
          Sincronizando 162 refugios...
        </div>
      )}
    </div>
  );
}
