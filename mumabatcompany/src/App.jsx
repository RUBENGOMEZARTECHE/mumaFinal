import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "./context/LangContext";

// Componentes Globales
import Navbar from "./components/navbar";
import WhatsAppButton from "./components/WhatsAppButton";

// Páginas Principales
import Inicio from "./pages/inicio";
import Nosotros from "./pages/nosotros";
import Contacto from "./pages/contacto";

// Páginas de Servicios
import RealidadVirtual from "./pages/servicios/realidad-virtual";
import Refugios from "./pages/servicios/refugios";
import EducacionAmbiental from "./pages/servicios/educacion-ambiental";
import FormacionConsultoria from "./pages/servicios/formacion";
import NotFound from "./pages/not-found";

// Sección Bat Night
import BatNight from "./pages/servicios/bat-night";
import BatNightPortugal from "./pages/servicios/bat-night/portugal-grutas-moeda";
import BatNightNerja from "./pages/servicios/bat-night/cueva-nerja";
import BatNightPlazaMayor from "./pages/servicios/bat-night/plaza-mayor-malaga";
import BatNightFuentePiedra from "./pages/servicios/bat-night/fuente-de-piedra";

// Comunidad y Voluntariado
import Voluntarios from "./pages/voluntarios";
import CienciaCiudadana from "./pages/ciencia-ciudadana";
import Donar from './pages/donar';

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        {/* El Navbar se renderiza en todas las páginas */}
        <Navbar />
        <WhatsAppButton />

        <Routes>
          {/* Rutas Generales */}
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Eje de Servicios */}
          <Route path="/servicios/refugios" element={<Refugios />} />
          <Route path="/servicios/realidad-virtual" element={<RealidadVirtual />} />
          <Route path="/servicios/educacion-ambiental" element={<EducacionAmbiental />} />
          <Route path="/servicios/formacion" element={<FormacionConsultoria />} />

          {/* Rutas Específicas de Bat Night */}
          <Route path="/servicios/bat-night" element={<BatNight />} />
          <Route path="/servicios/bat-night/portugal-grutas-moeda" element={<BatNightPortugal />} />
          <Route path="/servicios/bat-night/cueva-nerja" element={<BatNightNerja />} />
          <Route path="/servicios/bat-night/plaza-mayor-malaga" element={<BatNightPlazaMayor />} />
          <Route path="/servicios/bat-night/fuente-de-piedra" element={<BatNightFuentePiedra />} />

          {/* Comunidad */}
          <Route path="/voluntarios" element={<Voluntarios />} />
          <Route path="/ciencia-ciudadana" element={<CienciaCiudadana />} />
          <Route path="/donar" element={<Donar />} />

          {/* 404 — cualquier ruta no definida */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}