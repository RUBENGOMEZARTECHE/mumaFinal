// Página MUMA — sección ¿Qué hacemos? con 6 bloques de texto e imagen alternados
import { Camera } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { mumaI18n } from '../data/i18n/mumaI18n'

// Datos de los medios de comunicación: nombre, enlace y descripción para accesibilidad
const medios = [
  {
    nombre: 'La Opinión de Málaga',
    href: 'https://www.laopiniondemalaga.es/malaga/2025/07/10/selwo-aventura-murcielagos-malaga-unen-119552762.html',
  },
  {
    nombre: 'Málaga Hoy',
    href: 'https://www.malagahoy.es/malaga/murcielagos-aliados-mosquitos-virus-nilo-malaga_0_2005367409.html',
  },
  {
    nombre: 'El Español',
    href: 'https://www.elespanol.com/malaga/economia/tecnologia/20231230/cueva-realidad-virtual-hara-entender-hacen-murcielagos/819168532_0.html',
  },
  {
    nombre: 'Andalucía Lab',
    href: 'https://murcielagosmalaga.com/',
  },
  {
    nombre: 'Hola Andalucía',
    href: 'https://murcielagosmalaga.com/',
  },
  {
    nombre: 'Canal Málaga',
    href: 'https://www.canalmalaga.es/',
  },
]

// Placeholder reutilizable con icono de cámara — sustituir por <img> cuando haya imagen real
function PlaceholderImagen({ textoProximamente }) {
  return (
    // Caja con fondo oscuro, borde sutil, altura fija h-72 y esquinas redondeadas
    <div className="bg-fondo-superficie border border-white/5 rounded-2xl h-72 flex flex-col items-center justify-center gap-3">
      {/* Icono de cámara como indicador de imagen pendiente */}
      <Camera size={36} className="text-marca-principal/30" aria-hidden="true" />
      {/* Texto auxiliar visual */}
      <span className="text-texto-secundario/40 text-xs">{textoProximamente}</span>
    </div>
  )
}

// Bloque individual — alterna texto e imagen según la prop 'invertido'
function BloqueServicio({ bloque, textoProximamente }) {
  return (
    // Grid de 2 columnas en md con gap-12 entre columnas y centrado vertical
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Columna de texto — order-2 en md cuando el bloque está invertido */}
      <div className={bloque.invertido ? 'md:order-2' : 'md:order-1'}>
        {/* Título del bloque — bold, grande, color de título */}
        <h3 className="text-2xl sm:text-3xl font-bold text-texto-titulo mb-5 leading-snug">{bloque.titulo}</h3>
        {/* Párrafo de texto — sin negritas, color secundario, interlineado cómodo */}
        <p className="text-texto-secundario leading-relaxed">{bloque.texto}</p>
      </div>
      {/* Columna de imagen — order-1 en md cuando el bloque está invertido */}
      <div className={bloque.invertido ? 'md:order-1' : 'md:order-2'}>
        {/* Imagen placeholder hasta que haya fotografía real */}
        <PlaceholderImagen textoProximamente={textoProximamente} />
      </div>
    </div>
  )
}

// Componente principal exportado — sección ¿Qué hacemos? completa
export default function Muma() {
  const { locale } = useLang()
  const t = mumaI18n[locale] || mumaI18n.es

  return (
    // Fragmento que agrupa la sección de servicios y la sección de medios
    <>
      {/* Sección con id para ancla, fondo base y padding generoso horizontal y vertical */}
      <section id="que-hacemos" className="bg-fondo-base py-20 px-8 sm:px-12">
        {/* Contenedor centrado con ancho máximo */}
        <div className="max-w-6xl mx-auto">
          {/* Encabezado de sección centrado */}
          <div className="text-center mb-16">
            {/* Supertítulo en mayúsculas con color de marca */}
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.seccionSupertitulo}</p>
            {/* Título principal de sección en bold grande */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.seccionTitulo}</h2>
            {/* Descripción breve de la sección */}
            <p className="text-texto-secundario max-w-xl mx-auto">{t.seccionDescripcion}</p>
          </div>
          {/* Contenedor de bloques con espacio vertical entre cada uno */}
          <div className="space-y-20">
            {/* Iteramos sobre cada bloque y renderizamos BloqueServicio */}
            {t.bloques.map((bloque) => (
              // Cada bloque lleva su id como key única
              <BloqueServicio key={bloque.id} bloque={bloque} textoProximamente={t.imagenProximamente} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de apariciones en medios de comunicación */}
      <section id="medios" className="bg-fondo-superficie py-16 px-8 sm:px-12">
        {/* Contenedor centrado con ancho máximo */}
        <div className="max-w-6xl mx-auto text-center">
          {/* Supertítulo de la sección en mayúsculas con color de marca */}
          <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">{t.mediosSupertitulo}</p>
          {/* Título de la sección en bold grande */}
          <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">{t.mediosTitulo}</h2>
          {/* Descripción breve de la sección */}
          <p className="text-texto-secundario max-w-xl mx-auto mb-10">{t.mediosDescripcion}</p>
          {/* Grid de botones de medios — 2 columnas en móvil, 3 en tablet y escritorio */}
          <div className="flex flex-wrap justify-center gap-4">
            {medios.map((medio) => (
              // Cada botón es un enlace externo que abre en pestaña nueva
              <a
                key={medio.nombre}
                href={medio.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-marca-principal/40 text-texto-secundario rounded-full text-sm font-medium hover:border-marca-principal hover:text-marca-principal transition-colors duration-200"
              >
                {medio.nombre}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
