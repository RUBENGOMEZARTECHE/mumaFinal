// Página — Ciencia Ciudadana
import { motion } from 'framer-motion' // animaciones de entrada
import FormularioMuma from './formularioContacto'

export default function CienciaCiudadanaPage() {
  return (
    <>
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 bg-fondo-base overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/fondociudadano.webp"
              alt="Ciencia ciudadana fondo"
              aria-hidden="true"
              className="w-full h-full object-cover opacity-30"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-fondo-base/60" aria-hidden="true" />

          {/* Halo de luz difusa centrado en el hero */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(31,225,167,0.07) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Contenido del hero, centrado y con ancho máximo */}
          <div className="relative z-10 max-w-3xl mx-auto">

            {/* Etiqueta pequeña superior */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-5"
            >
              Ciencia Ciudadana
            </motion.p>

            {/* Título principal del hero */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-texto-titulo mb-8"
            >
              Tú también puedes{' '}
              <span className="text-marca-principal">proteger a los murciélagos</span>
            </motion.h1>

            {/* Texto largo en prosa — sin tarjetas ni cuadritos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left space-y-5 text-white text-base sm:text-lg leading-relaxed mb-10"
            >
              {/* Párrafo 1: contexto sobre los murciélagos */}
              <p>
                Los murciélagos son los grandes incomprendidos del ecosistema. Son los únicos mamíferos capaces de volar,
                llevan más de 50 millones de años en la Tierra y han sobrevivido a cinco extinciones masivas. Y sin embargo,
                hoy sus poblaciones están en declive en toda Europa. En España, especies como el murciélago ratonero forestal
                o la barbastela están desapareciendo silenciosamente de nuestros bosques y ciudades, en gran parte porque
                nadie las está mirando.
              </p>

              {/* Párrafo 2: qué cambia la ciencia ciudadana */}
              <p>
                La ciencia ciudadana cambia eso. Cuando una persona instala un detector de ultrasonidos en su jardín,
                cuando un agricultor reporta una colonia en su finca o cuando una familia participa en una salida nocturna
                de monitorización, está generando datos científicos reales que los investigadores no podrían obtener de
                otra forma.
              </p>

              {/* Párrafo 3: red de MUMA en Málaga */}
              <p>
                MUMA coordina una red de ciencia ciudadana en la Costa del Sol y la provincia de Málaga para monitorizar
                poblaciones de murciélagos, detectar nuevas colonias, estudiar sus rutas de vuelo y documentar el impacto
                de los refugios instalados.
              </p>


            </motion.div>

            {/* CTA — primario a mailto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex justify-center"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#inscripcion"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-marca-principal text-texto-sobre-accion hover:bg-marca-principal-hover transition-colors duration-200 no-underline"
                >
                  Quiero participar
                </a>
                <a
                  href="https://wa.me/34668540690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-white/15 text-texto-principal hover:bg-fondo-superficie hover:border-white/25 transition-all duration-200 no-underline"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-estado-exito" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── CÓMO PARTICIPAR ── */}
        <section className="bg-fondo-base px-6 py-24"> {/* sección con fondo oscuro y padding generoso */}
          <div className="max-w-3xl mx-auto"> {/* contenedor centrado igual que el hero */}

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">
              ¿Cómo puedes participar?
            </h2>

            {/* Texto introductorio de la sección */}
            <p className="text-white text-base sm:text-lg leading-relaxed mb-16">
              La ciencia ciudadana no requiere formación científica previa. Requiere observación, compromiso y ganas de
              contribuir a algo que va más allá de uno mismo. Estas son las tres formas principales en las que puedes
              sumarte a la red de monitorización de MUMA en Málaga.
            </p>

            {/* Bloques de participación — texto largo sin tarjetas */}
            <div className="space-y-16">

              {/* Bloque 01 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">01</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">Instala un detector de ultrasonidos</h3>
                  <p className="text-white text-base leading-relaxed">Los murciélagos cazan mediante ultrasonidos, frecuencias que el oído humano no puede percibir. Instalar un detector en tu jardín o terraza genera grabaciones reales que revelan qué especies frecuentan tu zona y cómo cambia su actividad a lo largo del año. MUMA te orienta sobre qué detector usar y cómo enviarnos los datos.</p>
                </div>
                <img src="/images/ciencia1.webp" alt="Detector de ultrasonidos para murciélagos" className="w-full h-72 object-cover rounded-2xl" />
              </div>

              {/* Bloque 02 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <img src="/images/ciencia2.webp" alt="Avistamiento de murciélagos" className="w-full h-72 object-cover rounded-2xl order-last md:order-first" />
                <div>
                  <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">02</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">Reporta avistamientos en tu zona</h3>
                  <p className="text-white text-base leading-relaxed">Si has visto murciélagos en el alero de un edificio, en una cueva o en cualquier espacio natural, ese avistamiento tiene valor científico. Con una foto, una fecha y una ubicación aproximada nos ayudas a construir el mapa real de distribución de especies en Málaga. No necesitas identificar la especie.</p>
                </div>
              </div>

              {/* Bloque 03 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-marca-principal uppercase mb-3">03</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-texto-titulo mb-4">Participa en salidas nocturnas de monitorización</h3>
                  <p className="text-white text-base leading-relaxed">Varias veces al año organizamos salidas nocturnas en espacios naturales de la Costa del Sol. Los participantes aprenden a manejar detectores de ultrasonidos, identificar especies y registrar datos de campo. Son actividades abiertas a cualquier persona, sin requisitos previos.</p>
                </div>
                <img src="/images/ciencia3.webp" alt="Salida nocturna de monitorización de murciélagos" className="w-full h-72 object-cover rounded-2xl" />
              </div>

            </div>
          </div> {/* fin contenedor centrado */}
        </section>

        {/* ── POR QUÉ IMPORTA TU PARTICIPACIÓN ── */}
        <section className="bg-fondo-base px-6 py-24"> {/* misma estética que la sección anterior */}
          <div className="max-w-3xl mx-auto"> {/* contenedor centrado con ancho máximo */}

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-6">
              ¿Por qué importa tu participación?
            </h2>

            <p className="text-white text-base leading-relaxed mb-10">Tus observaciones tienen un impacto científico real. Así es como contribuyen a la conservación.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-fondo-superficie rounded-2xl p-6 border border-white/5 hover:border-purple-400 transition-colors duration-300">
                <h3 className="text-base font-bold text-texto-titulo mb-3">Mapas de distribución de especies</h3>
                <p className="text-sm text-white leading-relaxed">Cada avistamiento se convierte en un punto en el mapa. Con suficientes datos podemos trazar la distribución real de cada especie en la provincia y planificar mejor los refugios y las políticas de conservación.</p>
              </div>
              <div className="bg-fondo-superficie rounded-2xl p-6 border border-white/5 hover:border-purple-400 transition-colors duration-300">
                <h3 className="text-base font-bold text-texto-titulo mb-3">Seguimiento de poblaciones</h3>
                <p className="text-sm text-white leading-relaxed">Saber si hay más o menos murciélagos que el año pasado solo es posible con observaciones repetidas en el tiempo. Los voluntarios son los únicos que pueden proporcionar esa continuidad año tras año.</p>
              </div>
              <div className="bg-fondo-superficie rounded-2xl p-6 border border-white/5 hover:border-purple-400 transition-colors duration-300">
                <h3 className="text-base font-bold text-texto-titulo mb-3">Detección de nuevas colonias</h3>
                <p className="text-sm text-white leading-relaxed">Algunas de las colonias más importantes de Málaga han sido descubiertas gracias a avisos de ciudadanos. Cada nueva colonia detectada es una oportunidad para actuar antes de que sea destruida por obras o desconocimiento.</p>
              </div>
            </div>
          </div> {/* fin contenedor centrado */}
        </section>

        {/* ── PROYECTOS ACTIVOS ── */}
        <section className="bg-fondo-base px-6 py-24"> {/* sección de proyectos activos */}
          <div className="max-w-5xl mx-auto"> {/* contenedor más ancho para la cuadrícula de tarjetas */}

            {/* Título principal de la sección */}
            <h2 className="text-3xl sm:text-4xl font-bold text-texto-titulo mb-4">
              Proyectos activos
            </h2>

            {/* Subtítulo que invita a la acción */}
            <p className="text-white text-base sm:text-lg leading-relaxed mb-12">
              Únete a uno de nuestros proyectos en marcha y empieza a generar datos científicos reales desde hoy.
            </p>

            {/* Cuadrícula de 4 tarjetas — 1 columna en móvil, 2 en tablet/escritorio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* ── TARJETA 1: Red de refugios Costa del Sol ── */}
              <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6"> {/* fondo semitransparente oscuro con borde sutil */}

                <div className="relative h-40 overflow-hidden rounded-xl mb-4">
                  <img src="/images/activo1.webp" alt="Red de refugios Costa del Sol" className="w-full h-full object-cover" />
                </div>

                {/* Cabecera de la tarjeta: etiqueta de estado + título */}
                <div className="flex items-center gap-3 mb-3"> {/* alineación horizontal de badge y título */}
                  {/* Etiqueta "Activo" en verde */}
                  <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-marca-principal/15 text-marca-principal">
                    Activo
                  </span>
                </div>

                {/* Título del proyecto */}
                <h3 className="text-lg font-bold text-texto-titulo mb-3">
                  Red de refugios Costa del Sol
                </h3>

                {/* Descripción corta del proyecto */}
                <p className="text-white text-sm leading-relaxed flex-1 mb-6">
                  Seguimiento periódico de refugios instalados en hoteles, campos de golf y fincas agrícolas.
                  Aprende a registrar ocupación y enviar datos científicos reales.
                </p>

                {/* Botón "Quiero participar" con asunto de correo predefinido */}
                <a
                  href="#inscripcion"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-marca-principal text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion transition-colors duration-200 no-underline"
                >
                  Quiero participar
                </a>
              </div>

              {/* ── TARJETA 2: Monitorización Laguna de Fuente de Piedra ── */}
              <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6"> {/* mismo estilo que tarjeta 1 */}

                <div className="relative h-40 overflow-hidden rounded-xl mb-4">
                  <img src="/images/activo2.webp" alt="Monitorización Laguna de Fuente de Piedra" className="w-full h-full object-cover" />
                </div>

                {/* Cabecera con etiqueta de estado */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Etiqueta "Activo" en verde */}
                  <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-marca-principal/15 text-marca-principal">
                    Activo
                  </span>
                </div>

                {/* Título del proyecto */}
                <h3 className="text-lg font-bold text-texto-titulo mb-3">
                  Monitorización Laguna de Fuente de Piedra
                </h3>

                {/* Descripción corta del proyecto */}
                <p className="text-white text-sm leading-relaxed flex-1 mb-6">
                  Salidas nocturnas de campo en la reserva natural para documentar especies de murciélagos
                  asociadas a humedales con detectores de ultrasonidos.
                </p>

                {/* Botón "Quiero participar" con asunto de correo predefinido */}
                <a
                  href="#inscripcion"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-marca-principal text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion transition-colors duration-200 no-underline"
                >
                  Quiero participar
                </a>
              </div>

              {/* ── TARJETA 3: Atlas de colonias urbanas Málaga ── */}
              <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6"> {/* mismo estilo que tarjetas anteriores */}

                <div className="relative h-40 overflow-hidden rounded-xl mb-4">
                  <img src="/images/activo3.webp" alt="Atlas de colonias urbanas Málaga" className="w-full h-full object-cover" />
                </div>

                {/* Cabecera con etiqueta de estado */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Etiqueta "Activo" en verde */}
                  <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-marca-principal/15 text-marca-principal">
                    Activo
                  </span>
                </div>

                {/* Título del proyecto */}
                <h3 className="text-lg font-bold text-texto-titulo mb-3">
                  Atlas de colonias urbanas Málaga
                </h3>

                {/* Descripción corta del proyecto */}
                <p className="text-white text-sm leading-relaxed flex-1 mb-6">
                  Reporta avistamientos de murciélagos en la ciudad. Cada dato contribuye al primer mapa oficial
                  de colonias urbanas de Málaga capital.
                </p>

                {/* Botón "Quiero participar" con asunto de correo predefinido */}
                <a
                  href="#inscripcion"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-marca-principal text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion transition-colors duration-200 no-underline"
                >
                  Quiero participar
                </a>
              </div>

              {/* ── TARJETA 4: Seguimiento post-Bat Night Cueva de Nerja ── */}
              <div className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6"> {/* mismo estilo que tarjetas anteriores */}

                <div className="relative h-40 overflow-hidden rounded-xl mb-4">
                  <img src="/images/activo4.webp" alt="Seguimiento post-Bat Night Cueva de Nerja" className="w-full h-full object-cover" />
                </div>

                {/* Cabecera con etiqueta de estado */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Etiqueta "Activo" en verde */}
                  <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-marca-principal/15 text-marca-principal">
                    Activo
                  </span>
                </div>

                {/* Título del proyecto */}
                <h3 className="text-lg font-bold text-texto-titulo mb-3">
                  Seguimiento post-Bat Night Cueva de Nerja
                </h3>

                {/* Descripción corta del proyecto */}
                <p className="text-white text-sm leading-relaxed flex-1 mb-6">
                  Monitorización de los refugios instalados tras la primera Bat Night en Nerja. Seguimiento de
                  poblaciones y documentación de cambios en el entorno.
                </p>

                {/* Botón "Quiero participar" con asunto de correo predefinido */}
                <a
                  href="#inscripcion"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-marca-principal text-marca-principal hover:bg-marca-principal hover:text-texto-sobre-accion transition-colors duration-200 no-underline"
                >
                  Quiero participar
                </a>
              </div>

            </div> {/* fin cuadrícula de tarjetas */}
          </div> {/* fin contenedor centrado */}
        </section>

        {/* FORMULARIO DE INSCRIPCIÓN A PROYECTOS */}
        <section id="inscripcion" className="bg-fondo-secundario py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">Únete a la red MUMA</p>
              <h2 className="text-3xl md:text-5xl font-bold text-texto-titulo mb-6">Formulario de Participación</h2>
              <p className="text-white max-w-xl mx-auto leading-relaxed">
                Selecciona el proyecto en el que deseas colaborar y cuéntanos un poco sobre tu zona o intereses. Nos pondremos en contacto contigo para darte los detalles técnicos.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <FormularioMuma
                tablaBD="consultas_web"
                asuntoCorreo="[Web Ciencia Ciudadana] Nueva inscripción a proyecto"
                textoBoton="ENVIAR INSCRIPCIÓN"
                selectName="proyecto_interes"
                selectLabel="¿En qué proyecto quieres participar?"
                opcionesSelect={[
                  { valor: 'refugios_costa', texto: 'Red de refugios Costa del Sol' },
                  { valor: 'fuente_piedra', texto: 'Monitorización Laguna de Fuente de Piedra' },
                  { valor: 'atlas_urbanas', texto: 'Atlas de colonias urbanas Málaga' },
                  { valor: 'seguimiento_nerja', texto: 'Seguimiento post-Bat Night Cueva de Nerja' },
                  { valor: 'otros_avistamientos', texto: 'Reportar avistamientos / Otros' }
                ]}
                mostrarOrganizacion={true}
                mostrarTelefono={true}
                mostrarMensaje={true}
                placeholderMensaje="Cuéntanos dónde has visto murciélagos o qué te motiva a participar..."
                camposOcultos={{ origen: 'web_ciencia_ciudadana', tipo_solicitud: 'ciencia_ciudadana' }}
              />
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
