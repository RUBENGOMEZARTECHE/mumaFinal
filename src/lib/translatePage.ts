import { batNightI18n } from '../i18n/batNightI18n.js'
import { cienciaCiudadanaI18n } from '../i18n/cienciaCiudadanaI18n.js'
import { contactoI18n } from '../i18n/contactoI18n.js'
import { cuevaNerjaI18n } from '../i18n/cuevaNerjaI18n.js'
import { donarI18n } from '../i18n/donarI18n.js'
import { educacionAmbientalI18n } from '../i18n/educacionAmbientalI18n.js'
import { formacionI18n } from '../i18n/formacionI18n.js'
import { fuenteDePiedraI18n } from '../i18n/fuenteDePiedraI18n.js'
import { inicioI18n } from '../i18n/inicioI18n.js'
import { mumaI18n } from '../i18n/mumaI18n.js'
import { navbarI18n } from '../i18n/navbarI18n.js'
import { nosotrosI18n } from '../i18n/nosotrosI18n.js'
import { plazaMayorMalagaI18n } from '../i18n/plazaMayorMalagaI18n.js'
import { portugalGrutasMoedaI18n } from '../i18n/portugalGrutasMoedaI18n.js'
import { realidadVirtualI18n } from '../i18n/realidadVirtualI18n.js'
import { refugiosI18n } from '../i18n/refugiosI18n.js'
import { voluntariosI18n } from '../i18n/voluntariosI18n.js'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale, type SupportedLocale } from './i18n'

type AnyDictionary = Record<string, unknown>

const dictionaries = [
  batNightI18n,
  cienciaCiudadanaI18n,
  contactoI18n,
  cuevaNerjaI18n,
  donarI18n,
  educacionAmbientalI18n,
  formacionI18n,
  fuenteDePiedraI18n,
  inicioI18n,
  mumaI18n,
  navbarI18n,
  nosotrosI18n,
  plazaMayorMalagaI18n,
  portugalGrutasMoedaI18n,
  realidadVirtualI18n,
  refugiosI18n,
  voluntariosI18n,
] as AnyDictionary[]

const commonUiI18n = {
  es: [
    'Solicitud recibida',
    'Nos pondremos en contacto contigo en menos de 48 horas.',
    'Nombre Responsable',
    'Email Corporativo',
    'Tu mejor Email',
    'Teléfono de contacto',
    'Organización / Entidad',
    'Selecciona una opción',
    'Selecciona un rango',
    'Mensaje / Detalles adicionales',
    'Participantes estimados',
    'Fecha deseada',
    'SINCRONIZANDO...',
    'O escríbenos por',
    'Formato de interés',
    '¿Qué servicio te interesa?',
    'Revisa el email del formulario.',
    'El mensaje es demasiado corto.',
    'No se pudo enviar el formulario. Inténtalo de nuevo en unos minutos.',
    'Acepto el tratamiento de mis datos para recibir información comercial y respuesta a esta solicitud.',
    'Escribe aquí tu mensaje...',
    'Ej: 100',
    'Área Especialistas',
    'Panel de Administración',
    'Cerrar sesión',
    'Acceso Privado',
    'Mi Cuenta',
    'Entrar',
    'Usuario',
    'Solicitud de consultoría y formación',
    'Inicia tu proyecto con MUMA',
    'Dinos en qué área necesitas apoyo técnico y un consultor de nuestro equipo se pondrá en contacto contigo para evaluar la viabilidad.',
    '¿En qué área necesitas consultoría o formación?',
    'Consultoría Bioacústica',
    'Agricultura y Control Biológico',
    'Formación y Educación Ambiental',
    'Asesoría Jurídico-Ambiental',
    'Innovación y I+D',
    'Otro',
    'ENVIAR SOLICITUD TÉCNICA',
    'ENVIAR A DIRECCIÓN TÉCNICA',
    'ENVIAR SOLICITUD',
    'ENVIAR INSCRIPCIÓN',
    'SOLICITAR DEMOSTRACIÓN GRATUITA',
    'AVÍSAME DE PRÓXIMAS EDICIONES',
    '¿Tienes un proyecto concreto?',
    'Cuéntanos el contexto  territorio, especie, problema o normativa  y te decimos si podemos ayudarte y cómo.',
    'Hablar con el equipo',
    'Solicitar información',
    'Respaldo científico',
    'Cada informe está firmado desde el campo, no desde un despacho.',
    'Somos miembros activos de SECEMU, alineados con el marco EUROBATS y ex-investigadores del proyecto europeo ST3ER en España, Portugal y Eslovenia. Eso es lo que convierte nuestros informes en documentos con peso real ante administraciones e instituciones.',
    'Nombre Completo',
    'Motivo',
    'Mensaje',
    'Seleccione motivo',
    'Consultoría Técnica',
    'Adquisición de Refugios',
    'Experiencia VR',
    'Organizar Bat Night',
    'Consultoría y Formación',
    'Refugios para murciélagos',
    'Productos educativos',
    'Experiencias',
    'Sobre nosotros',
    'Qué hacemos',
    'MUMA en los medios',
    'Aviso Legal',
    'Política de Privacidad',
    'Política de Cookies',
    'Proyecto de investigación:',
    'Diseño y desarrollo: interfaz MUMA',
    'Hola, me interesa saber más sobre MUMA BAT COMPANY.',
    'Cuéntanos si vienes solo, en familia o con algún interés específico...',
    'Cuéntanos qué te motiva a ser voluntario y en qué actividades te gustaría participar…',
    'Cuéntanos dónde has visto murciélagos o qué te motiva a participar...',
    '¿Qué tipo de espacio representas?',
    'Ayuntamiento o institución pública',
    'Por qué MUMA es diferente',
    'No hacemos marketing ambiental.',
    'Hacemos trabajo de campo.',
    'Ciencia de campo',
    'Más de una década estudiando colonias, grabando ultrasonidos y construyendo el único archivo bioacústico privado de quirópteros ibéricos. El conocimiento no es decoración es la base de cada servicio.',
    'Conocer el equipo',
    'Tecnología que tiene fondo',
    'La Batcave Experience no es una recreación es una cueva real digitalizada en 3D. Lista para instalar en museos, centros comerciales o spaces naturales sin obra ni infraestructura adicional.',
    'Ver la Batcave Experience',
    'Comunidad e impacto real',
    'Más de 700 personas en eventos MUMA durante 2025. Bat Nights, talleres científicos y actividades con ayuntamientos, reservas naturales y centros educativos. La conservación ocurre cuando la gente entiende.',
    'Ver próximas Bat Nights',
  ],
  en: [
    'Request received',
    'We will contact you within 48 hours.',
    'Contact person name',
    'Corporate email',
    'Your best email',
    'Contact phone',
    'Organisation / Entity',
    'Select an option',
    'Select a range',
    'Message / Additional details',
    'Estimated participants',
    'Preferred date',
    'SYNCING...',
    'Or write to us on',
    'Format of interest',
    'Which service are you interested in?',
    'Please check the form email.',
    'The message is too short.',
    'The form could not be sent. Please try again in a few minutes.',
    'I accept the processing of my data to receive commercial information and a response to this request.',
    'Write your message here...',
    'E.g. 100',
    'Specialists Area',
    'Administration Panel',
    'Sign out',
    'Private Access',
    'My Account',
    'Log in',
    'User',
    'Consultancy and training request',
    'Start your project with MUMA',
    'Tell us which area you need technical support in and one of our consultants will contact you to assess feasibility.',
    'Which consultancy or training area do you need?',
    'Bioacoustic Consultancy',
    'Agriculture and Biological Control',
    'Training and Environmental Education',
    'Legal and Environmental Advice',
    'Innovation and R&D',
    'Other',
    'SEND TECHNICAL REQUEST',
    'SEND TO TECHNICAL TEAM',
    'SEND REQUEST',
    'SEND REGISTRATION',
    'REQUEST A FREE DEMO',
    'NOTIFY ME ABOUT UPCOMING EDITIONS',
    'Do you have a specific project?',
    'Tell us the context  territory, species, problem or regulation  and we will tell you whether we can help and how.',
    'Talk to the team',
    'Request information',
    'Scientific backing',
    'Every report is signed from the field, not from a desk.',
    'We are active members of SECEMU, aligned with the EUROBATS framework and former researchers of the European ST3ER project in Spain, Portugal and Slovenia. That is what turns our reports into documents with real weight before administrations and institutions.',
    'Full Name',
    'Reason',
    'Message',
    'Select reason',
    'Technical Consultancy',
    'Bat Box Acquisition',
    'VR Experience',
    'Organise a Bat Night',
    'Consultancy and Training',
    'Bat shelters',
    'Educational products',
    'Experiences',
    'About us',
    'What we do',
    'MUMA in the media',
    'Legal Notice',
    'Privacy Policy',
    'Cookie Policy',
    'Research project:',
    'Design and development: MUMA interface',
    'Hello, I would like to know more about MUMA BAT COMPANY.',
    'Tell us whether you are coming alone, with family or with a specific interest...',
    'Tell us what motivates you to volunteer and which activities you would like to join…',
    'Tell us where you have seen bats or what motivates you to participate...',
    'What type of space do you represent?',
    'Town council or public institution',
    'Why MUMA is different',
    'We do not do environmental marketing.',
    'We do fieldwork.',
    'Field science',
    'More than a decade studying colonies, recording ultrasounds and building the only private bioacoustic archive of Iberian bats. Knowledge is not decoration; it is the foundation of every service.',
    'Meet the team',
    'Technology with substance',
    'The Batcave Experience is not a recreation; it is a real cave digitised in 3D. Ready to install in museums, shopping centres or natural spaces without construction work or additional infrastructure.',
    'View the Batcave Experience',
    'Community and real impact',
    'More than 700 people at MUMA events during 2025. Bat Nights, scientific workshops and activities with town councils, nature reserves and schools. Conservation happens when people understand.',
    'See upcoming Bat Nights',
  ],
  de: [
    'Anfrage erhalten',
    'Wir werden Sie innerhalb von 48 Stunden kontaktieren.',
    'Name der Kontaktperson',
    'Geschäftliche E-Mail',
    'Ihre beste E-Mail',
    'Telefonnummer',
    'Organisation / Einrichtung',
    'Option auswählen',
    'Bereich auswählen',
    'Nachricht / zusätzliche Angaben',
    'Geschätzte Teilnehmerzahl',
    'Gewünschtes Datum',
    'WIRD SYNCHRONISIERT...',
    'Oder schreiben Sie uns über',
    'Gewünschtes Format',
    'Für welchen Service interessieren Sie sich?',
    'Bitte überprüfen Sie die E-Mail-Adresse im Formular.',
    'Die Nachricht ist zu kurz.',
    'Das Formular konnte nicht gesendet werden. Bitte versuchen Sie es in einigen Minuten erneut.',
    'Ich akzeptiere die Verarbeitung meiner Daten, um kommerzielle Informationen und eine Antwort auf diese Anfrage zu erhalten.',
    'Schreiben Sie Ihre Nachricht hier...',
    'z. B. 100',
    'Fachbereich',
    'Administrationsbereich',
    'Abmelden',
    'Privater Zugang',
    'Mein Konto',
    'Einloggen',
    'Benutzer',
    'Anfrage zu Beratung und Ausbildung',
    'Starten Sie Ihr Projekt mit MUMA',
    'Sagen Sie uns, in welchem Bereich Sie technische Unterstützung benötigen, und ein Berater aus unserem Team wird sich mit Ihnen in Verbindung setzen, um die Machbarkeit zu bewerten.',
    'In welchem Bereich benötigen Sie Beratung oder Ausbildung?',
    'Bioakustische Beratung',
    'Landwirtschaft und biologische Schädlingskontrolle',
    'Ausbildung und Umweltbildung',
    'Rechts- und Umweltberatung',
    'Innovation und F&E',
    'Andere',
    'TECHNISCHE ANFRAGE SENDEN',
    'AN TECHNIKTEAM SENDEN',
    'ANFRAGE SENDEN',
    'ANMELDUNG SENDEN',
    'KOSTENLOSE DEMO ANFRAGEN',
    'BENACHRICHTIGEN SIE MICH ÜBER NÄCHSTE TERMINE',
    'Haben Sie ein konkretes Projekt?',
    'Erzählen Sie uns den Kontext  Gebiet, Art, Problem oder Vorschrift  und wir sagen Ihnen, ob und wie wir helfen können.',
    'Mit dem Team sprechen',
    'Informationen anfordern',
    'Wissenschaftliche Unterstützung',
    'Jeder Bericht wird aus dem Feld heraus unterzeichnet, nicht vom Schreibtisch aus.',
    'Wir sind aktive Mitglieder von SECEMU, am EUROBATS-Rahmen ausgerichtet und ehemalige Forschende des europäischen ST3ER-Projekts in Spanien, Portugal und Slowenien. Dadurch werden unsere Berichte zu Dokumenten mit echtem Gewicht gegenüber Verwaltungen und Institutionen.',
    'Vollständiger Name',
    'Grund',
    'Nachricht',
    'Grund auswählen',
    'Technische Beratung',
    'Fledermauskästen erwerben',
    'VR-Erlebnis',
    'Bat Night organisieren',
    'Beratung und Ausbildung',
    'Fledermauskästen',
    'Bildungsprodukte',
    'Erlebnisse',
    'Über uns',
    'Was wir tun',
    'MUMA in den Medien',
    'Impressum',
    'Datenschutzerklärung',
    'Cookie-Richtlinie',
    'Forschungsprojekt:',
    'Design und Entwicklung: MUMA-Oberfläche',
    'Hallo, ich möchte mehr über MUMA BAT COMPANY erfahren.',
    'Sagen Sie uns, ob Sie allein, mit der Familie oder mit einem bestimmten Interesse kommen...',
    'Erzählen Sie uns, was Sie motiviert, freiwillig mitzumachen, und an welchen Aktivitäten Sie teilnehmen möchten…',
    'Erzählen Sie uns, wo Sie Fledermäuse gesehen haben oder was Sie zur Teilnahme motiviert...',
    'Welche Art von Raum vertreten Sie?',
    'Rathaus oder öffentliche Einrichtung',
    'Warum MUMA anders ist',
    'Wir machen kein Umweltmarketing.',
    'Wir leisten Feldarbeit.',
    'Feldwissenschaft',
    'Mehr als ein Jahrzehnt der Untersuchung von Kolonien, der Aufzeichnung von Ultraschallrufen und des Aufbaus des einzigen privaten bioakustischen Archivs iberischer Fledermäuse. Wissen ist keine Dekoration, sondern die Grundlage jedes Dienstes.',
    'Das Team kennenlernen',
    'Technologie mit Substanz',
    'Die Batcave Experience ist keine Nachbildung, sondern eine echte, in 3D digitalisierte Höhle. Bereit für Museen, Einkaufszentren oder Naturräume, ohne Bauarbeiten oder zusätzliche Infrastruktur.',
    'Batcave Experience ansehen',
    'Gemeinschaft und echte Wirkung',
    'Mehr als 700 Menschen bei MUMA-Veranstaltungen im Jahr 2025. Bat Nights, wissenschaftliche Workshops und Aktivitäten mit Gemeinden, Naturschutzgebieten und Bildungseinrichtungen. Naturschutz geschieht, wenn Menschen verstehen.',
    'Nächste Bat Nights ansehen',
  ],
} satisfies Record<SupportedLocale, string[]>

function getLocaleFromBrowser(): SupportedLocale {
  const queryLocale = new URLSearchParams(window.location.search).get('lang')
  if (isSupportedLocale(queryLocale)) return queryLocale

  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
  if (isSupportedLocale(firstSegment)) return firstSegment

  const storedLocale = window.localStorage.getItem('muma-locale')
  if (isSupportedLocale(storedLocale)) return storedLocale

  return DEFAULT_LOCALE
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function flattenStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === 'string') {
    const normalized = normalizeText(value)
    if (normalized) output.push(normalized)
    return output
  }

  if (Array.isArray(value)) {
    value.forEach((item) => flattenStrings(item, output))
    return output
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => flattenStrings(item, output))
  }

  return output
}

function addTranslation(map: Map<string, string>, source: string | undefined, target: string | undefined) {
  if (!source || !target || source === target) return

  const normalizedSource = normalizeText(source)
  const normalizedTarget = normalizeText(target)
  if (!normalizedSource || !normalizedTarget || normalizedSource === normalizedTarget) return

  if (!map.has(normalizedSource)) map.set(normalizedSource, normalizedTarget)
}

function buildTranslationMap(locale: SupportedLocale): Map<string, string> {
  const map = new Map<string, string>()

  dictionaries.forEach((dictionary) => {
    const targetStrings = flattenStrings(dictionary[locale])

    SUPPORTED_LOCALES.forEach((sourceLocale) => {
      if (sourceLocale === locale) return

      const sourceStrings = flattenStrings(dictionary[sourceLocale])
      sourceStrings.forEach((source, index) => addTranslation(map, source, targetStrings[index]))
    })
  })

  SUPPORTED_LOCALES.forEach((sourceLocale) => {
    if (sourceLocale === locale) return

    commonUiI18n[sourceLocale].forEach((source, index) => addTranslation(map, source, commonUiI18n[locale][index]))
  })

  return map
}

function replaceKnownFragments(value: string, map: Map<string, string>): string {
  let translated = value

  const entries = Array.from(map.entries())
    .filter(([source, target]) => {
      if (source.length < 8) return false
      if (!translated.includes(source)) return false

      // Evita expansiones infinitas como Contact -> Contacto -> Contactoo...
      // Si el destino contiene el origen, una sustitución parcial podría volver a coincidir
      // en la siguiente pasada del MutationObserver.
      if (target.includes(source)) return false

      return true
    })
    .sort((a, b) => b[0].length - a[0].length)

  entries.forEach(([source, target]) => {
    translated = translated.split(source).join(target)
  })

  return translated
}

function translateTextKeepingWhitespace(original: string, map: Map<string, string>): string {
  const normalized = normalizeText(original)
  const translated = map.get(normalized) ?? replaceKnownFragments(normalized, map)
  if (!translated) return original
  if (translated === normalized) return original

  const prefix = original.match(/^\s*/)?.[0] ?? ''
  const suffix = original.match(/\s*$/)?.[0] ?? ''
  return `${prefix}${translated}${suffix}`
}

function translateAttributes(root: ParentNode, map: Map<string, string>) {
  const attributes = ['alt', 'title', 'aria-label', 'placeholder']

  root.querySelectorAll<HTMLElement>('*').forEach((element) => {
    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute)
      if (!value) return

      const translated = translateTextKeepingWhitespace(value, map)
      if (translated !== value) element.setAttribute(attribute, translated)
    })
  })
}

function translateTextNodes(root: ParentNode, map: Map<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      if (!normalizeText(node.textContent ?? '')) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)

  nodes.forEach((node) => {
    const current = node.textContent ?? ''
    const translated = translateTextKeepingWhitespace(current, map)
    if (translated !== current) node.textContent = translated
  })
}

export function translatePage(locale = getLocaleFromBrowser()) {
  const map = buildTranslationMap(locale)
  if (map.size === 0) return

  translateAttributes(document.body, map)
  translateTextNodes(document.body, map)
}

if (typeof window !== 'undefined') {
  let observer: MutationObserver | undefined
  let scheduled = false
  let translating = false

  const run = () => {
    translating = true
    translatePage()
    translating = false
  }

  const scheduleRun = () => {
    if (scheduled || translating) return

    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      run()
    })
  }

  const startObserver = () => {
    if (observer || !document.body) return

    observer = new MutationObserver((mutations) => {
      const hasTranslatableChanges = mutations.some((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) return true
        if (mutation.type === 'characterData') return true
        if (mutation.type === 'attributes') return true
        return false
      })

      if (hasTranslatableChanges) scheduleRun()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['alt', 'title', 'aria-label', 'placeholder', 'value'],
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      run()
      startObserver()
    })
  } else {
    run()
    startObserver()
  }

  window.addEventListener('muma:locale-change', () => {
    window.setTimeout(scheduleRun, 0)
  })
}