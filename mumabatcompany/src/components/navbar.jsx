import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { navbarI18n } from "../data/i18n/navbarI18n";

const idiomas = [
  { locale: "es", flag: "/flags/es.svg", label: "Español" },
  { locale: "en", flag: "/flags/gb.svg", label: "English" },
  { locale: "de", flag: "/flags/de.svg", label: "Deutsch" },
];

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

function DropdownMenu({
  nombre,
  label,
  opciones,
  esActivo,
  onToggle,
  onCerrar,
  esDestacado,
}) {
  return (
    <div className="relative">
      <button
        onClick={() => onToggle(nombre)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
          esDestacado
            ? "bg-marca-principal text-black hover:bg-marca-principal-hover"
            : esActivo
              ? "bg-marca-principal/10 border border-marca-principal text-marca-principal"
              : "border border-white/10 text-texto-secundario hover:text-texto-titulo hover:border-white/30"
        }`}
      >
        {label}
        <ChevronIcon open={esActivo} />
      </button>

      {esActivo && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-fondo-secundario border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {opciones.map((opcion) => (
            <Link
              key={opcion.label}
              to={opcion.to}
              onClick={onCerrar}
              className="block px-4 py-3 text-sm text-texto-secundario hover:text-texto-titulo hover:bg-white/5 transition-colors no-underline"
            >
              {opcion.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const { locale, setLocale } = useLang();
  const location = useLocation();
  const tn = navbarI18n[locale];
  const navLinks = tn.links;
  const unirseOpciones = tn.unirse.opciones;
  const tiendaOpciones = tn.tienda.opciones;
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuAbierto(false);
    setDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) =>
    setDropdown((prev) => (prev === name ? null : name));
  const cerrarDropdown = () => setDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fondo-base/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between border-b border-white/5">
        <Link
          to="/"
          className="flex items-center gap-3 text-texto-titulo font-bold tracking-tight no-underline group"
        >
          {/* EL LOGO: Sustituimos el <a> por <img> */}
          <img
            src="/images/MUMA LOGO VECTOR-05_resultado.webp"
            alt="MUMA Bat Company Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />

          {/* TEXTO DE MARCA */}
          <div className="flex items-center gap-1.5">
            <span className="text-xl leading-none">MUMA</span>
            <span className="text-marca-principal text-xl leading-none">
              BAT COMPANY
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
          <div className="flex items-center gap-1">
            {idiomas.map((idioma) => (
              <button
                key={idioma.locale}
                onClick={() => setLocale(idioma.locale)}
                className={`px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer flex items-center ${
                  locale === idioma.locale
                    ? "ring-2 ring-marca-principal/70 scale-110"
                    : "opacity-50 hover:opacity-90 hover:bg-white/5"
                }`}
              >
                <img
                  src={idioma.flag}
                  alt={idioma.label}
                  width="24"
                  height="18"
                  className="rounded-sm"
                />
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-white/10" />
          <DropdownMenu
            nombre="unirse"
            label={tn.unirse.label}
            opciones={unirseOpciones}
            esActivo={dropdown === "unirse"}
            onToggle={toggleDropdown}
            onCerrar={cerrarDropdown}
          />
          <Link
            to="/donar"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-marca-principal/30 text-texto-titulo bg-marca-principal/5 hover:bg-marca-principal/20 hover:border-marca-principal/60 no-underline shadow-sm"
          >
            {tn.donar}
          </Link>
          <DropdownMenu
            nombre="tienda"
            label={tn.tienda.label}
            opciones={tiendaOpciones}
            esActivo={dropdown === "tienda"}
            onToggle={toggleDropdown}
            onCerrar={cerrarDropdown}
            esDestacado={true}
          />
        </div>

        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
        >
          <span
            className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div className="hidden md:block">
        <nav className="max-w-7xl mx-auto px-12 py-4 flex items-center justify-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 no-underline ${
                location.pathname === link.to
                  ? "text-marca-principal bg-marca-principal/10"
                  : "text-texto-secundario hover:text-texto-titulo hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuAbierto && (
        <div className="md:hidden bg-fondo-secundario border-t border-white/5 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <p className="text-xs text-texto-secundario/50 uppercase tracking-wider">{tn.unirse.heading}</p>
            {unirseOpciones.map((op) => (
              <Link key={op.to} to={op.to} className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline">
                {op.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <p className="text-xs text-texto-secundario/50 uppercase tracking-wider">{tn.tienda.heading}</p>
            {tiendaOpciones.map((op) => (
              <Link key={op.to} to={op.to} className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline">
                {op.label}
              </Link>
            ))}
          </div>

          <Link
            to="/donar"
            className="mt-1 text-center px-4 py-2 rounded-lg text-sm font-semibold border border-marca-principal/30 text-texto-titulo bg-marca-principal/5 hover:bg-marca-principal/20 no-underline"
          >
            {tn.donar}
          </Link>

          <div className="border-t border-white/10 pt-4 flex items-center gap-2">
            {idiomas.map((idioma) => (
              <button
                key={idioma.locale}
                onClick={() => setLocale(idioma.locale)}
                className={`px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer flex items-center ${
                  locale === idioma.locale
                    ? "ring-2 ring-marca-principal/70 scale-110"
                    : "opacity-50 hover:opacity-90 hover:bg-white/5"
                }`}
              >
                <img src={idioma.flag} alt={idioma.label} width="24" height="18" className="rounded-sm" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
