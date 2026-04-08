import { useState, useEffect, useRef } from 'react'
import { LangProvider, useLang } from '../context/LangContext'

const idiomas = [
  { locale: 'es', flag: '/flags/es.svg', label: 'Español' },
  { locale: 'en', flag: '/flags/gb.svg', label: 'English' },
  { locale: 'de', flag: '/flags/de.svg', label: 'Deutsch' },
]

const navLinks = [
  { label: 'Home',              to: '/' },
  { label: 'MUMA',             to: '/nosotros' },
  { label: 'Realidad Virtual', to: '/servicios/realidad-virtual' },
  { label: 'Bat Night',        to: '/servicios/bat-night' },
  { label: 'Refugios',         to: '/servicios/refugios' },
  { label: 'Formación',        to: '/servicios/formacion' },
  { label: 'Contacto',         to: '/contacto' },
]

const unirseOpciones = [
  { label: 'Voluntariado',       to: '/voluntarios' },
  { label: 'Ciencia ciudadana',  to: '/ciencia-ciudadana' },
]

const tiendaOpciones = [
  { label: 'Refugios para murciélagos', to: '/servicios/refugios' },
  { label: 'Productos educativos',      to: '/servicios/formacion' },
  { label: 'Experiencias',              to: '/servicios/bat-night' },
]

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

function DropdownMenu({
  nombre, label, opciones, esActivo, onToggle, onCerrar, esDestacado,
}: {
  nombre: string; label: string; opciones: { label: string; to: string }[];
  esActivo: boolean; onToggle: (n: string) => void; onCerrar: () => void; esDestacado?: boolean;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => onToggle(nombre)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
          esDestacado
            ? 'bg-marca-principal text-black hover:bg-marca-principal-hover'
            : esActivo
              ? 'bg-marca-principal/10 border border-marca-principal text-marca-principal'
              : 'border border-white/10 text-texto-secundario hover:text-texto-titulo hover:border-white/30'
        }`}
      >
        {label}
        <ChevronIcon open={esActivo} />
      </button>
      {esActivo && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-fondo-secundario border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {opciones.map((opcion) => (
            <a
              key={opcion.label}
              href={opcion.to}
              onClick={onCerrar}
              className="block px-4 py-3 text-sm text-texto-secundario hover:text-texto-titulo hover:bg-white/5 transition-colors no-underline"
            >
              {opcion.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function NavbarInner() {
  const [menuAbierto, setMenuAbierto]   = useState(false)
  const [dropdown, setDropdown]         = useState<string | null>(null)
  const { locale, setLocale }           = useLang()
  const dropdownRef                     = useRef<HTMLDivElement>(null)
  const [pathname, setPathname]         = useState('/')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    setMenuAbierto(false)
    setDropdown(null)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (name: string) =>
    setDropdown((prev) => (prev === name ? null : name))
  const cerrarDropdown = () => setDropdown(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fondo-base/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between border-b border-white/5">
        <a href="/" className="flex items-center gap-3 text-texto-titulo font-bold tracking-tight no-underline group">
          <img
            src="/images/MUMA LOGO VECTOR-05_resultado.webp"
            alt="MUMA Bat Company Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-xl leading-none">MUMA</span>
            <span className="text-marca-principal text-xl leading-none">BAT COMPANY</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
          <div className="flex items-center gap-1">
            {idiomas.map((idioma) => (
              <button
                key={idioma.locale}
                onClick={() => setLocale(idioma.locale)}
                className={`px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer flex items-center ${
                  locale === idioma.locale
                    ? 'ring-2 ring-marca-principal/70 scale-110'
                    : 'opacity-50 hover:opacity-90 hover:bg-white/5'
                }`}
              >
                <img src={idioma.flag} alt={idioma.label} width="24" height="18" className="rounded-sm" />
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-white/10" />
          <DropdownMenu
            nombre="unirse" label="Unirse" opciones={unirseOpciones}
            esActivo={dropdown === 'unirse'} onToggle={toggleDropdown} onCerrar={cerrarDropdown}
          />
          <a
            href="/donar"
            className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border border-marca-principal/30 text-texto-titulo bg-marca-principal/5 hover:bg-marca-principal/20 hover:border-marca-principal/60 no-underline shadow-sm"
          >
            Donar
          </a>
          <DropdownMenu
            nombre="tienda" label="Tienda" opciones={tiendaOpciones}
            esActivo={dropdown === 'tienda'} onToggle={toggleDropdown} onCerrar={cerrarDropdown}
            esDestacado={true}
          />
        </div>

        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
        >
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className="hidden md:block">
        <nav className="max-w-7xl mx-auto px-12 py-4 flex items-center justify-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 no-underline ${
                pathname === link.to
                  ? 'text-marca-principal bg-marca-principal/10'
                  : 'text-texto-secundario hover:text-texto-titulo hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {menuAbierto && (
        <div className="md:hidden bg-fondo-secundario border-t border-white/5 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.to} href={link.to} className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline">
              {link.label}
            </a>
          ))}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <p className="text-xs text-texto-secundario/50 uppercase tracking-wider">Unirse</p>
            {unirseOpciones.map((op) => (
              <a key={op.to} href={op.to} className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline">{op.label}</a>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <p className="text-xs text-texto-secundario/50 uppercase tracking-wider">Tienda</p>
            {tiendaOpciones.map((op) => (
              <a key={op.to} href={op.to} className="text-sm font-medium text-texto-secundario hover:text-marca-principal no-underline">{op.label}</a>
            ))}
          </div>
          <a href="/donar" className="mt-1 text-center px-4 py-2 rounded-lg text-sm font-semibold border border-marca-principal/30 text-texto-titulo bg-marca-principal/5 hover:bg-marca-principal/20 no-underline">
            Donar
          </a>
          <div className="border-t border-white/10 pt-4 flex items-center gap-2">
            {idiomas.map((idioma) => (
              <button
                key={idioma.locale}
                onClick={() => setLocale(idioma.locale)}
                className={`px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer flex items-center ${
                  locale === idioma.locale ? 'ring-2 ring-marca-principal/70 scale-110' : 'opacity-50 hover:opacity-90 hover:bg-white/5'
                }`}
              >
                <img src={idioma.flag} alt={idioma.label} width="24" height="18" className="rounded-sm" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default function Navbar() {
  return (
    <LangProvider>
      <NavbarInner />
    </LangProvider>
  )
}
