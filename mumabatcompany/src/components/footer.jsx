// Componente compartido — Footer
import { Link } from 'react-router-dom'

const columnas = [
  { titulo: 'Servicios', enlaces: [{ etiqueta: 'Bat Night', href: '/servicios/bat-night' }, { etiqueta: 'Museo Virtual y VR', href: '/servicios/realidad-virtual' }, { etiqueta: 'Refugios para murciélagos', href: '/servicios/refugios' }, { etiqueta: 'Educación ambiental', href: '/servicios/educacion-ambiental' }, { etiqueta: 'Consultoría', href: '/servicios/formacion' }] },
  { titulo: 'Empresa', enlaces: [{ etiqueta: 'Sobre nosotros', href: '/nosotros' }, { etiqueta: 'Cómo trabajamos', href: '/nosotros' }, { etiqueta: 'Ciencia ciudadana', href: '/ciencia-ciudadana' }, { etiqueta: 'Voluntarios', href: '/voluntarios' }, { etiqueta: 'Contacto', href: '/contacto' }] },
]

export default function Footer() {
  return (
    <footer className="bg-fondo-base border-t border-white/5 pt-16 pb-8 px-8 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-bold text-texto-titulo text-lg">MUMA <span className="text-marca-principal">BAT COMPANY</span></p>
            <p className="text-sm text-texto-secundario mt-3 leading-relaxed">Ciencia, tecnología y naturaleza al servicio de los murciélagos y de las personas.</p>
          </div>
          {columnas.map((columna) => (
            <div key={columna.titulo}>
              <p className="text-xs font-semibold text-texto-titulo uppercase tracking-wider mb-4">{columna.titulo}</p>
              <ul className="space-y-2.5">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.etiqueta}>
                    <Link to={enlace.href} className="text-sm text-texto-secundario hover:text-texto-principal transition-colors duration-200 no-underline">{enlace.etiqueta}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-texto-secundario">© {new Date().getFullYear()} MUMA BAT COMPANY. Todos los derechos reservados.</p>
          <p className="text-xs text-texto-secundario/40">Diseño y desarrollo: interfaz MUMA</p>
        </div>
      </div>
    </footer>
  )
}
