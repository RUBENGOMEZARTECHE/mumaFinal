// Página MUMA — sección ¿Qué hacemos? con 6 bloques de texto e imagen alternados
import { Camera } from 'lucide-react'

// Datos de los 6 bloques: id, título, texto y flag de inversión de columnas
const bloques = [
  {
    id: 'realidad-virtual', // identificador único del bloque
    titulo: 'Realidad Virtual para proteger la naturaleza', // título del bloque
    texto: 'Los murciélagos viven en cuevas y espacios naturales que no pueden recibir visitas masivas sin sufrir daños irreversibles. El turismo convencional fragmenta hábitats, genera contaminación lumínica y presiona sobre espacios protegidos. MUMA resuelve este problema llevando la cueva a las personas en lugar de llevar a las personas a la cueva. Han escaneado en 3D cuevas reales, grabado ultrasonidos auténticos de especies ibéricas y construido un entorno virtual donde el usuario explora, aprende y siente sin generar ningún impacto ecológico. La MuMa Bat Cave Experience VR ya ha sido vivida por más de 700 personas en 2025 en entornos tan distintos como una cueva en Portugal, un centro comercial en Málaga y una reserva natural protegida. Museos, hoteles, centros educativos y ayuntamientos pueden contratar esta experiencia como licencia B2B de forma recurrente.', // texto sin negritas, mínimo 5-6 líneas
    invertido: false, // false = texto izquierda, imagen derecha
  },
  {
    id: 'educacion-ambiental', // identificador único del bloque
    titulo: 'Educación ambiental que conecta emocionalmente', // título del bloque
    texto: 'La educación ambiental tradicional informa, pero raramente transforma. MUMA parte de una convicción diferente: la experiencia directa cambia comportamientos donde el discurso no llega. Por eso combinan detectores de ultrasonidos en tiempo real, talleres participativos, dinámicas de grupo y realidad virtual en una misma sesión. El visitante escucha al murciélago en vuelo, lo observa en su hábitat natural a través de las gafas VR y comprende de primera mano por qué su desaparición afecta directamente a nuestra alimentación, nuestra salud y nuestra economía. Las actividades se adaptan al nivel educativo de cada grupo y pueden integrarse en el currículo escolar o en proyectos municipales de sostenibilidad. Centros educativos, AMPAs, museos de ciencia natural, institutos y ayuntamientos de toda la Costa del Sol ya han pasado por estas experiencias.', // texto sin negritas, mínimo 5-6 líneas
    invertido: true, // true = imagen izquierda, texto derecha
  },
  {
    id: 'refugios', // identificador único del bloque
    titulo: 'Refugios artesanales: la solución más ecológica contra las plagas', // título del bloque
    texto: 'Un solo murciélago pequeño puede eliminar entre 1.000 y 3.000 insectos por noche. Eso significa que una colonia de 50 individuos puede eliminar hasta 150.000 mosquitos en una sola noche, sin pesticidas, sin costes recurrentes y sin efectos secundarios sobre el ecosistema. MUMA fabrica sus propios refugios de forma artesanal en Málaga usando madera de alta calidad resistente a la humedad y los rayos UV, técnicas de impresión 3D y materiales biodegradables y compostables. Cada refugio tiene diseño de doble cámara con superficies interiores rayadas para que los murciélagos se sujeten con comodidad, y se georreferencia y numera para permitir un seguimiento científico personalizado a lo largo del tiempo. Los refugios comerciales de bajo coste no ofrecen ventilación adecuada, usan clavos que pueden herir a los animales y se deterioran en pocos meses. Los de MUMA están diseñados para durar décadas y generar un impacto real y medible en la reducción de plagas.', // texto sin negritas, mínimo 5-6 líneas
    invertido: false, // false = texto izquierda, imagen derecha
  },
  {
    id: 'consultoria', // identificador único del bloque
    titulo: 'Consultoría medioambiental y bioacústica avanzada', // título del bloque
    texto: 'La monitorización de fauna nocturna requiere tecnología especializada y conocimiento científico profundo. MUMA ofrece consultoría medioambiental basada en bioacústica: el análisis de los ultrasonidos que emiten los murciélagos para detectar su presencia, identificar especies y evaluar el estado de las poblaciones en un territorio concreto. Este servicio es esencial para estudios de impacto ambiental, proyectos de restauración ecológica y cumplimiento de normativa medioambiental. Han trabajado con la Junta de Andalucía, la Diputación Provincial de Málaga, la Fundación Cueva de Nerja, Selwo Aventura, el Parque Tecnológico de Málaga y SECEMU, entre otros. Su equipo combina formación técnica en gestión forestal y medio natural con años de trabajo de campo en ecosistemas urbanos, agroforestales y de alta montaña.', // texto sin negritas, mínimo 5-6 líneas
    invertido: true, // true = imagen izquierda, texto derecha
  },
  {
    id: 'bat-nights', // identificador único del bloque
    titulo: 'Bat Nights: cuando la ciencia se convierte en experiencia', // título del bloque
    texto: 'Las Bat Nights son la demostración más tangible de que conservación y divulgación pueden ir de la mano sin renunciar al rigor científico. Son eventos nocturnos que combinan detección de ultrasonidos en tiempo real, la experiencia VR MuMa Bat Cave Experience, charlas científicas, exposiciones fotográficas y talleres educativos. Se han celebrado ya en cuatro escenarios completamente distintos: las Grutas da Moeda en Portugal con más de 200 visitantes en un solo día, la Cueva de Nerja donde el éxito del evento llevó directamente a la instalación de refugios monitorizados en el entorno, Plaza Mayor Málaga donde demostraron que el modelo funciona en entornos urbanos comerciales con 200 a 300 participantes en dos días, y la Laguna de Fuente de Piedra, reserva natural protegida, donde se combinó interpretación ambiental in situ con realidad virtual para familias y escolares. El formato es escalable, adaptable a cualquier espacio y replicable internacionalmente.', // texto sin negritas, mínimo 5-6 líneas
    invertido: false, // false = texto izquierda, imagen derecha
  },
  {
    id: 'control-plagas', // identificador único del bloque
    titulo: 'Control biológico de plagas basado en la naturaleza', // título del bloque
    texto: 'El uso de pesticidas en España genera un coste económico y ambiental enorme. Se estima que los murciélagos evitan gastos de entre 1 y 10 millones de euros anuales solo en España gracias a su actividad como controladores naturales de insectos. MUMA instala redes de refugios monitorizados en campos de golf, hoteles y resorts, fincas agrícolas, campings y municipios para crear ecosistemas donde los murciélagos controlan de forma natural las poblaciones de mosquito tigre, mosca del olivo, polilla del racimo, procesionaria del pino y mosquito verde de la vid. Además del murciélago, trabajan con otras especies de fauna auxiliar como cernícalos, mochuelos, mariposas y salamanquesas. Es una solución 100% ecológica, con impacto económico medible, aval científico institucional y seguimiento técnico incluido en cada instalación.', // texto sin negritas, mínimo 5-6 líneas
    invertido: true, // true = imagen izquierda, texto derecha
  },
]

// Placeholder reutilizable con icono de cámara — sustituir por <img> cuando haya imagen real
function PlaceholderImagen() {
  return (
    // Caja con fondo oscuro, borde sutil, altura fija h-72 y esquinas redondeadas
    <div className="bg-fondo-superficie border border-white/5 rounded-2xl h-72 flex flex-col items-center justify-center gap-3">
      {/* Icono de cámara como indicador de imagen pendiente */}
      <Camera size={36} className="text-marca-principal/30" aria-hidden="true" />
      {/* Texto auxiliar visual */}
      <span className="text-texto-secundario/40 text-xs">Imagen próximamente</span>
    </div>
  )
}

// Bloque individual — alterna texto e imagen según la prop 'invertido'
function BloqueServicio({ bloque }: { bloque: typeof bloques[0] }) {
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
        <PlaceholderImagen />
      </div>
    </div>
  )
}

// Datos de los medios de comunicación: nombre, enlace y descripción para accesibilidad
const medios = [
  {
    nombre: 'La Opinión de Málaga', // nombre del medio tal como aparece en el botón
    href: 'https://www.laopiniondemalaga.es/malaga/2025/07/10/selwo-aventura-murcielagos-malaga-unen-119552762.html', // artículo sobre la alianza entre Selwo Aventura y MUMA
  },
  {
    nombre: 'Málaga Hoy', // nombre del medio tal como aparece en el botón
    href: 'https://www.malagahoy.es/malaga/murcielagos-aliados-mosquitos-virus-nilo-malaga_0_2005367409.html', // artículo sobre murciélagos como aliados contra mosquitos y el virus del Nilo en Málaga
  },
  {
    nombre: 'El Español', // nombre del medio tal como aparece en el botón
    href: 'https://www.elespanol.com/malaga/economia/tecnologia/20231230/cueva-realidad-virtual-hara-entender-hacen-murcielagos/819168532_0.html', // artículo sobre la cueva de realidad virtual de MUMA
  },
  {
    nombre: 'Andalucía Lab', // nombre del medio — enlace provisional a la web de MUMA hasta disponer del artículo específico
    href: 'https://mumabatcompany.com/', // URL provisional: página principal de MUMA
  },
  {
    nombre: 'Hola Andalucía', // nombre del medio — enlace provisional a la web de MUMA hasta disponer del artículo específico
    href: 'https://mumabatcompany.com/', // URL provisional: página principal de MUMA
  },
  {
    nombre: 'Canal Málaga', // nombre del medio tal como aparece en el botón
    href: 'https://www.canalmalaga.es/', // web oficial de Canal Málaga
  },
]

// Componente principal exportado — sección ¿Qué hacemos? completa
export default function MumaPage() {
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
            <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Nuestros servicios</p>
            {/* Título principal de sección en bold grande */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">¿Qué hacemos?</h2>
            {/* Descripción breve de la sección */}
            <p className="text-texto-secundario max-w-xl mx-auto">Tecnología inmersiva, conservación activa y educación científica para proteger la biodiversidad.</p>
          </div>
          {/* Contenedor de bloques con espacio vertical entre cada uno */}
          <div className="space-y-20">
            {/* Iteramos sobre cada bloque y renderizamos BloqueServicio */}
            {bloques.map((bloque) => (
              // Cada bloque lleva su id como key única
              <BloqueServicio key={bloque.id} bloque={bloque} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de apariciones en medios de comunicación */}
      <section id="medios" className="bg-fondo-superficie py-16 px-8 sm:px-12">
        {/* Contenedor centrado con ancho máximo */}
        <div className="max-w-6xl mx-auto text-center">
          {/* Supertítulo de la sección en mayúsculas con color de marca */}
          <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">Prensa</p>
          {/* Título de la sección en bold grande */}
          <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">Nos han contado</h2>
          {/* Descripción breve de la sección */}
          <p className="text-texto-secundario max-w-xl mx-auto mb-10">MUMA en los medios de comunicación.</p>
          {/* Grid de botones de medios — 2 columnas en móvil, 3 en tablet y escritorio */}
          <div className="flex flex-wrap justify-center gap-4">
            {medios.map((medio) => (
              // Cada botón es un enlace externo que abre en pestaña nueva
              <a
                key={medio.nombre} // key única basada en el nombre del medio
                href={medio.href} // URL del artículo o web del medio
                target="_blank" // abre el enlace en una pestaña nueva del navegador
                rel="noopener noreferrer" // seguridad: evita que la página destino acceda a window.opener
                className="px-6 py-3 border border-marca-principal/40 text-texto-secundario rounded-full text-sm font-medium hover:border-marca-principal hover:text-marca-principal transition-colors duration-200"
              >
                {medio.nombre} {/* texto visible del botón */}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
