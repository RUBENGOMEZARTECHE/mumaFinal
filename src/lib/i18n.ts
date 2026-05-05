export const SUPPORTED_LOCALES = ['es', 'en', 'de'] as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'es'

export const OG_LOCALES: Record<SupportedLocale, string> = {
  es: 'es_ES',
  en: 'en_GB',
  de: 'de_DE',
}

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
}

export const isSupportedLocale = (locale: unknown): locale is SupportedLocale =>
  typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as SupportedLocale)

export function getPathWithoutLocale(pathname: string): string {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.replace(`/${locale}`, '') || '/'
  }

  return pathname || '/'
}

export function getLocaleFromUrl(url: URL): SupportedLocale {
  const queryLocale = url.searchParams.get('lang')
  if (isSupportedLocale(queryLocale)) return queryLocale

  const firstSegment = url.pathname.split('/').filter(Boolean)[0]
  if (isSupportedLocale(firstSegment)) return firstSegment

  return DEFAULT_LOCALE
}

export function getLocalizedUrl(pathname: string, locale: SupportedLocale, currentSearch = ''): string {
  const params = new URLSearchParams(currentSearch)
  params.set('lang', locale)
  const query = params.toString()
  return `${getPathWithoutLocale(pathname)}${query ? `?${query}` : ''}`
}

export function getAbsoluteLocalizedUrl(site: URL | string | undefined, pathname: string, locale: SupportedLocale): string {
  const base = site ?? 'https://mumabatcompany.com'
  return new URL(getLocalizedUrl(pathname, locale), base).href
}

type SeoEntry = {
  title: string
  description: string
}

type SeoDictionary = Record<SupportedLocale, SeoEntry>

export const pageSeo: Record<string, SeoDictionary> = {
  '/': {
    es: {
      title: 'MUMA BAT COMPANY | Ciencia, Tecnología y Conservación',
      description: 'Empresa especializada en conservación de quirópteros. Batcave Experience, Bat Nights, Refugios y Consultoría bioacústica con respaldo europeo ST3ER.',
    },
    en: {
      title: 'MUMA BAT COMPANY | Science, Technology and Conservation',
      description: 'Company specialised in bat conservation. Batcave Experience, Bat Nights, bat shelters and bioacoustic consultancy backed by the European ST3ER project.',
    },
    de: {
      title: 'MUMA BAT COMPANY | Wissenschaft, Technologie und Naturschutz',
      description: 'Unternehmen für Fledermausschutz. Batcave Experience, Bat Nights, Fledermauskästen und bioakustische Beratung mit Unterstützung des europäischen ST3ER-Projekts.',
    },
  },
  '/nosotros': {
    es: {
      title: 'MUMA BAT COMPANY — Quiénes somos',
      description: 'MUMA BAT COMPANY: empresa especializada en conservación de quirópteros mediante ciencia de campo, tecnología inmersiva y soluciones aplicadas.',
    },
    en: {
      title: 'MUMA BAT COMPANY — About us',
      description: 'MUMA BAT COMPANY: specialists in bat conservation through field science, immersive technology and applied biodiversity solutions.',
    },
    de: {
      title: 'MUMA BAT COMPANY — Über uns',
      description: 'MUMA BAT COMPANY: Spezialisten für Fledermausschutz durch Feldwissenschaft, immersive Technologie und angewandte Biodiversitätslösungen.',
    },
  },
  '/contacto': {
    es: {
      title: 'Contacto — MUMA BAT COMPANY',
      description: 'Contacta con MUMA BAT COMPANY. Especialistas en bioacústica, conservación de quirópteros y soluciones de biodiversidad.',
    },
    en: {
      title: 'Contact — MUMA BAT COMPANY',
      description: 'Contact MUMA BAT COMPANY. Specialists in bioacoustics, bat conservation and biodiversity solutions.',
    },
    de: {
      title: 'Kontakt — MUMA BAT COMPANY',
      description: 'Kontaktieren Sie MUMA BAT COMPANY. Spezialisten für Bioakustik, Fledermausschutz und Biodiversitätslösungen.',
    },
  },
  '/servicios/realidad-virtual': {
    es: {
      title: 'Realidad Virtual para murciélagos | MUMA BAT COMPANY',
      description: 'Batcave Experience y MuMa Bats 360 — experiencias VR inmersivas para eventos, congresos y educación ambiental.',
    },
    en: {
      title: 'Virtual Reality for bat conservation | MUMA BAT COMPANY',
      description: 'Batcave Experience and MuMa Bats 360 — immersive VR experiences for events, conferences and environmental education.',
    },
    de: {
      title: 'Virtual Reality für Fledermausschutz | MUMA BAT COMPANY',
      description: 'Batcave Experience und MuMa Bats 360 — immersive VR-Erlebnisse für Veranstaltungen, Kongresse und Umweltbildung.',
    },
  },
  '/servicios/bat-night': {
    es: {
      title: 'Bat Night | MUMA BAT COMPANY',
      description: 'Eventos nocturnos con ultrasonidos y realidad virtual. Experiencias únicas de avistamiento de murciélagos.',
    },
    en: {
      title: 'Bat Night | MUMA BAT COMPANY',
      description: 'Night-time events with ultrasound detectors and virtual reality. Unique bat watching and science outreach experiences.',
    },
    de: {
      title: 'Bat Night | MUMA BAT COMPANY',
      description: 'Nachtveranstaltungen mit Ultraschalldetektoren und Virtual Reality. Einzigartige Fledermaus- und Wissenschaftserlebnisse.',
    },
  },
  '/servicios/refugios': {
    es: {
      title: 'Refugios para murciélagos | MUMA BAT COMPANY',
      description: 'Infraestructura de conservación y control biológico de plagas con tecnología 3D y madera técnica.',
    },
    en: {
      title: 'Bat shelters | MUMA BAT COMPANY',
      description: 'Conservation infrastructure and biological pest control with 3D technology and technical wood.',
    },
    de: {
      title: 'Fledermauskästen | MUMA BAT COMPANY',
      description: 'Naturschutzinfrastruktur und biologische Schädlingskontrolle mit 3D-Technologie und technischem Holz.',
    },
  },
  '/servicios/formacion': {
    es: {
      title: 'Consultoría ambiental y formación en conservación de murciélagos | MUMA BAT COMPANY',
      description: 'Consultoría medioambiental, bioacústica, control biológico de plagas y formación ambiental.',
    },
    en: {
      title: 'Environmental consultancy and bat conservation training | MUMA BAT COMPANY',
      description: 'Environmental consultancy, bioacoustics, biological pest control and conservation training.',
    },
    de: {
      title: 'Umweltberatung und Ausbildung im Fledermausschutz | MUMA BAT COMPANY',
      description: 'Umweltberatung, Bioakustik, biologische Schädlingskontrolle und Naturschutzausbildung.',
    },
  },
  '/donar': {
    es: {
      title: 'Donar — Apoya la conservación de murciélagos | MUMA BAT COMPANY',
      description: 'Tu donación financia refugios, investigación científica y educación ambiental en Málaga.',
    },
    en: {
      title: 'Donate — Support bat conservation | MUMA BAT COMPANY',
      description: 'Your donation funds shelters, scientific research and environmental education in Málaga.',
    },
    de: {
      title: 'Spenden — Fledermausschutz unterstützen | MUMA BAT COMPANY',
      description: 'Ihre Spende finanziert Fledermauskästen, wissenschaftliche Forschung und Umweltbildung in Málaga.',
    },
  },
  '/voluntarios': {
    es: {
      title: 'Voluntariado | MUMA BAT COMPANY',
      description: 'Únete al equipo de voluntarios de MUMA BAT COMPANY. Participa en Bat Nights, refugios e investigación científica.',
    },
    en: {
      title: 'Volunteering | MUMA BAT COMPANY',
      description: 'Join the MUMA BAT COMPANY volunteer team. Take part in Bat Nights, shelters and scientific research.',
    },
    de: {
      title: 'Freiwilligenarbeit | MUMA BAT COMPANY',
      description: 'Werden Sie Teil des Freiwilligenteams von MUMA BAT COMPANY. Helfen Sie bei Bat Nights, Kästen und Forschung.',
    },
  },
  '/ciencia-ciudadana': {
    es: {
      title: 'Ciencia Ciudadana — MUMA BAT COMPANY',
      description: 'Únete a la red de ciencia ciudadana de MUMA. Monitoriza colonias de murciélagos y genera datos científicos reales.',
    },
    en: {
      title: 'Citizen Science — MUMA BAT COMPANY',
      description: 'Join MUMA’s citizen science network. Monitor bat colonies and generate real scientific data.',
    },
    de: {
      title: 'Bürgerwissenschaft — MUMA BAT COMPANY',
      description: 'Werden Sie Teil des Citizen-Science-Netzwerks von MUMA. Beobachten Sie Fledermauskolonien und erzeugen Sie echte wissenschaftliche Daten.',
    },
  },
}

export function getSeoForPath(pathname: string, locale: SupportedLocale): SeoEntry | undefined {
  return pageSeo[getPathWithoutLocale(pathname)]?.[locale]
}