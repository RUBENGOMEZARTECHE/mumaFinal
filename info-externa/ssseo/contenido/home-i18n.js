/**
 * home-i18n.js
 * Objeto SEO multilingue para la HOME de MUMA BAT COMPANY
 * Idiomas: ES (raiz) | EN (/en/) | DE (/de/)
 * Generado: 2026-03-13
 *
 * Silos comerciales principales que canaliza esta home:
 *   1. Museo Virtual / VR  -> /servicios/museo-virtual-vr/
 *   2. Refugios            -> /servicios/cajas-refugio-murcielagos/
 *
 * Uso con react-helmet-async:
 *   import { homeSeoI18n } from "../seo/contenido/home-i18n"
 *   const seo = homeSeoI18n[locale]  // locale: "es" | "en" | "de"
 */

// ------------------------------------
// HREFLANG ALTERNATES (referencia global)
// ------------------------------------
export const homeAlternates = [
  { hreflang: "es-ES",   href: "https://mumabatcompany.com/" },
  { hreflang: "en",      href: "https://mumabatcompany.com/en/" },
  { hreflang: "de-DE",   href: "https://mumabatcompany.com/de/" },
  { hreflang: "x-default", href: "https://mumabatcompany.com/" },
];

// ------------------------------------
// SELECTOR DE IDIOMA
// ------------------------------------
export const languageOptions = [
  {
    locale: "es",
    label: "Español",
    shortLabel: "ES",
    flag: "🇪🇸",
    url: "/",
    isDefault: true,
  },
  {
    locale: "en",
    label: "English",
    shortLabel: "EN",
    flag: "🇬🇧",
    url: "/en/",
    isDefault: false,
  },
  {
    locale: "de",
    label: "Deutsch",
    shortLabel: "DE",
    flag: "🇩🇪",
    url: "/de/",
    isDefault: false,
  },
];

// ------------------------------------
// OBJETO PRINCIPAL: homeSeoI18n
// ------------------------------------
export const homeSeoI18n = {

  // ==========================================
  // ES — Español (raiz /)
  // ==========================================
  es: {

    locale: "es",
    languageLabel: "Español",
    countryFlag: "🇪🇸",

    slug: "/",
    url: "https://mumabatcompany.com/",
    type: "home",
    cluster: "brand",
    searchIntent: "informacional-comercial + branded",

    primaryKeyword: "MUMA BAT COMPANY",
    secondaryKeywords: [
      "museo virtual murciélagos",
      "visita virtual murciélagos",
      "cajas refugio murciélagos empresa",
      "servicios con murciélagos instituciones",
      "educacion ambiental murciélagos",
      "control biologico plagas murciélagos",
      "empresa murciélagos España",
      "soluciones biodiversidad murciélagos",
    ],

    h1: "Servicios con murciélagos para instituciones, museos y ayuntamientos",
    metaTitle: "MUMA BAT COMPANY | Servicios con murciélagos",
    metaDescription: "Museo virtual, refugios para murciélagos, educacion ambiental y consultoria. Para ayuntamientos, museos y centros educativos en España.",

    canonical: "https://mumabatcompany.com/",
    hreflang: [
      { lang: "es-ES",   url: "https://mumabatcompany.com/" },
      { lang: "en",      url: "https://mumabatcompany.com/en/" },
      { lang: "de-DE",   url: "https://mumabatcompany.com/de/" },
      { lang: "x-default", url: "https://mumabatcompany.com/" },
    ],

    heroEyebrow: "Ciencia · Tecnología · Conservación",
    heroTitle: "Servicios con murciélagos para instituciones, museos y ayuntamientos",
    heroDescription: "Diseñamos y ejecutamos proyectos de museo virtual, refugios para murciélagos, educacion ambiental y consultoria tecnica. Para administraciones publicas, museos, centros educativos y empresas que necesitan soluciones reales basadas en la naturaleza.",

    primaryCta: {
      label: "Ver servicios",
      href: "#servicios",
      type: "anchor",
    },
    secondaryCta: {
      label: "Contactar por WhatsApp",
      href: "https://wa.me/34XXXXXXXXX",
      type: "external",
      note: "Sustituir XXXXXXXXX por el numero real antes de publicar",
    },

    trustBlockTitle: "Respaldados por",
    trustBlockItems: [
      { name: "SECEMU", description: "Sociedad Española para la Conservacion y Estudio de los Murcielagos" },
      { name: "EUROBATS", description: "Agreement on the Conservation of Populations of European Bats" },
      { name: "REV", description: "Red de Expertos en Vida Silvestre" },
      { name: "La Brujula", description: "Camara de Comercio de Malaga — financiado FEDER" },
    ],

    sections: [
      {
        id: "propuesta-valor",
        h2: "Que hacemos y para quien",
        intro: "MUMA BAT COMPANY es una empresa especializada en servicios con murciélagos. Diseñamos proyectos de conservacion activa, control biologico de plagas, educacion ambiental, experiencias de museo virtual y consultoria tecnica.",
        body: "No somos una ONG ni una empresa de eventos genericos. Somos especialistas con metodologia, datos y resultados documentados que trabajamos con instituciones, administraciones y empresas que necesitan soluciones reales.",
      },
      {
        id: "servicios-clave",
        h2: "Servicios",
        eyebrow: "Lo que puedes contratar",
        intro: "Soluciones concretas para instituciones, ayuntamientos, museos, centros educativos y entidades publicas o privadas.",
        items: [
          {
            id: "museo-virtual-vr",
            title: "Museo Virtual y Realidad Virtual",
            tag: "Inmersivo",
            description: "Exposiciones digitales e inmersivas sobre murciélagos. Para museos, centros de interpretacion y espacios educativos. Visita virtual de cuevas sin alterar el habitat.",
            cta: { label: "Ver servicio", href: "/servicios/museo-virtual-vr/" },
          },
          {
            id: "cajas-refugio",
            title: "Cajas refugio para murciélagos",
            tag: "Infraestructura",
            description: "Diseno, fabricacion e instalacion de cajas refugio para murciélagos. Solucion basada en la naturaleza para control de plagas y restauracion de poblaciones.",
            cta: { label: "Ver servicio", href: "/servicios/cajas-refugio-murcielagos/" },
          },
          {
            id: "bat-night",
            title: "Bat Night",
            tag: "Experiencias",
            description: "Actividades nocturnas guiadas con deteccion de ultrasonidos. Para ayuntamientos, festivales y centros de naturaleza.",
            cta: { label: "Ver servicio", href: "/servicios/bat-night/" },
          },
          {
            id: "educacion-ambiental",
            title: "Educacion ambiental",
            tag: "Formacion",
            description: "Talleres y rutas guiadas para colegios, museos, AMPAs y centros de visitantes. Divulgacion cientifica con participacion activa.",
            cta: { label: "Ver servicio", href: "/servicios/educacion-ambiental/" },
          },
          {
            id: "consultoria",
            title: "Consultoria ambiental",
            tag: "Consultoria",
            description: "Bioacustica, monitoreo de biodiversidad y soluciones basadas en la naturaleza. Rigor tecnico y documentacion verificable.",
            cta: { label: "Ver servicio", href: "/servicios/consultoria/" },
          },
        ],
      },
      {
        id: "por-que-muma",
        h2: "Por que MUMA BAT COMPANY",
        eyebrow: "Criterio de trabajo",
        intro: "No somos una ONG ni una empresa de eventos. Somos especialistas con metodologia, datos y resultados.",
        pillars: [
          {
            title: "Impacto real y medible",
            text: "Cada proyecto genera datos verificables. Diseñamos intervenciones con resultados cuantificables en biodiversidad, control de plagas y documentacion tecnica para memorias ambientales.",
          },
          {
            title: "Tecnologia aplicada",
            text: "Deteccion de ultrasonidos, realidad virtual, modelos 3D y monitoreo acustico. Herramientas de alto nivel al servicio de la conservacion, no al reves.",
          },
          {
            title: "Rigor cientifico y avales reales",
            text: "Miembros de SECEMU, EUROBATS y REV. Proyectos respaldados por metodologia contrastada y colaboraciones con gestores de espacios naturales e instituciones publicas.",
          },
        ],
        cta: { label: "Conoce al equipo", href: "/sobre-nosotros/" },
      },
      {
        id: "contacto",
        h2: "Cuentanos tu proyecto",
        eyebrow: "Empieza una conversacion",
        intro: "Te respondemos en menos de 24 horas. Si prefieres, escribenos por WhatsApp directamente.",
        ctaByPersona: [
          { persona: "museo", label: "Solicitar demo del museo virtual", href: "/contacto/?interes=museo-virtual" },
          { persona: "ayuntamiento", label: "Descargar dosier de servicios", href: "/contacto/?interes=dosier" },
          { persona: "educacion", label: "Consultar programa educativo", href: "/contacto/?interes=educacion-ambiental" },
        ],
        ctaDefault: { label: "Enviar consulta", href: "/contacto/" },
        ctaWhatsApp: { label: "Escribir por WhatsApp", href: "https://wa.me/34XXXXXXXXX" },
      },
    ],

    faq: [
      {
        question: "¿El museo virtual funciona sin equipos de realidad virtual propios?",
        answer: "Si. Ofrecemos tanto la experiencia con visores VR como versiones accesibles desde navegador o pantalla grande. Adaptamos el formato al espacio y equipamiento disponibles en cada museo o centro.",
      },
      {
        question: "¿Las cajas refugio para murciélagos sirven para reducir mosquitos?",
        answer: "Si. Una colonia bien establecida puede reducir de forma significativa las poblaciones de mosquito tigre y otros insectos plagas. El efecto es gradual y depende del entorno. Incluimos seguimiento tecnico para maximizar la eficacia.",
      },
      {
        question: "¿Trabajais con ayuntamientos y administraciones publicas?",
        answer: "Si. Tenemos experiencia con administraciones publicas en proyectos de biodiversidad urbana, control de plagas ecologico, educacion ambiental y experiencias de divulgacion cientifica. Emitimos documentacion tecnica apta para licitaciones y memorias ambientales.",
      },
      {
        question: "¿Que documentacion generais en cada proyecto?",
        answer: "Cada proyecto incluye informe tecnico con metodologia, resultados y datos verificables. Los proyectos de refugios incluyen geoereferenciacion, registro de ocupacion y especies detectadas. Util para memorias ambientales, informes de sostenibilidad y justificaciones de financiacion publica.",
      },
    ],

    internalLinks: [
      {
        id: "silo-museo-virtual",
        label: "Museo Virtual y Realidad Virtual",
        href: "/servicios/museo-virtual-vr/",
        priority: "primary",
        context: "Silo comercial principal — museos y centros de visitantes",
      },
      {
        id: "silo-refugios",
        label: "Cajas refugio para murciélagos",
        href: "/servicios/cajas-refugio-murcielagos/",
        priority: "primary",
        context: "Silo comercial principal — ayuntamientos, agricultores, hoteles",
      },
      {
        id: "contacto",
        label: "Contacto",
        href: "/contacto/",
        priority: "conversion",
        context: "CTA de conversion global",
      },
      {
        id: "sobre-nosotros",
        label: "Sobre nosotros",
        href: "/sobre-nosotros/",
        priority: "trust",
        context: "Desde bloque de credibilidad Por que MUMA",
      },
    ],

    schemaSuggested: [
      {
        type: "Organization",
        notes: "name, url, logo, description, areaServed:ES, memberOf:[SECEMU,EUROBATS,REV]",
      },
      {
        type: "WebSite",
        notes: "name, url — sin potentialAction hasta tener buscador interno",
      },
    ],

  },

  // ==========================================
  // EN — English (/en/)
  // ==========================================
  en: {

    locale: "en",
    languageLabel: "English",
    countryFlag: "🇬🇧",

    slug: "/en/",
    url: "https://mumabatcompany.com/en/",
    type: "home",
    cluster: "brand",
    searchIntent: "informational-commercial + branded",

    // NOTE: EN keywords use real SERP terminology for the UK/international market.
    // "bat boxes" outperforms "bat refuges" in English search volume.
    // "virtual museum" + "virtual tour" are the dominant terms in museum discovery.
    primaryKeyword: "MUMA BAT COMPANY",
    secondaryKeywords: [
      "virtual museum bats",
      "virtual bat tour",
      "bat boxes installation",
      "bat conservation services Europe",
      "bat boxes for pest control",
      "environmental education bats",
      "bat conservation company Spain",
      "nature-based solutions bats",
    ],

    h1: "Bat conservation services for museums, councils and institutions",
    metaTitle: "MUMA BAT COMPANY | Bat Conservation Services",
    metaDescription: "Virtual museum, bat boxes, environmental education and ecological consultancy. Serving museums, local authorities and educational centres across Europe.",

    canonical: "https://mumabatcompany.com/en/",
    hreflang: [
      { lang: "es-ES",   url: "https://mumabatcompany.com/" },
      { lang: "en",      url: "https://mumabatcompany.com/en/" },
      { lang: "de-DE",   url: "https://mumabatcompany.com/de/" },
      { lang: "x-default", url: "https://mumabatcompany.com/" },
    ],

    heroEyebrow: "Science · Technology · Conservation",
    heroTitle: "Bat conservation services for museums, councils and institutions",
    heroDescription: "We design and deliver virtual museum experiences, bat box installations, environmental education programmes and technical consultancy. For public authorities, museums, educational centres and organisations seeking real, nature-based solutions.",

    primaryCta: {
      label: "View services",
      href: "#services",
      type: "anchor",
    },
    secondaryCta: {
      label: "Contact via WhatsApp",
      href: "https://wa.me/34XXXXXXXXX",
      type: "external",
      note: "Replace XXXXXXXXX with real number before publishing",
    },

    trustBlockTitle: "Endorsed by",
    trustBlockItems: [
      { name: "SECEMU", description: "Spanish Society for the Conservation and Study of Bats" },
      { name: "EUROBATS", description: "Agreement on the Conservation of Populations of European Bats" },
      { name: "REV", description: "Spanish Wildlife Experts Network" },
      { name: "La Brujula", description: "Malaga Chamber of Commerce — FEDER funded" },
    ],

    sections: [
      {
        id: "value-proposition",
        h2: "What we do and who we work with",
        intro: "MUMA BAT COMPANY is a specialist in bat-based services. We design and deliver projects in active conservation, biological pest control, environmental education, virtual museum experiences and technical consultancy.",
        body: "We are not an NGO or a generic events company. We are specialists with methodology, data and documented results, working with institutions, local authorities and organisations that need real solutions.",
      },
      {
        id: "key-services",
        h2: "Services",
        eyebrow: "What you can commission",
        intro: "Concrete solutions for institutions, local councils, museums, educational centres and public or private organisations.",
        items: [
          {
            id: "virtual-museum-vr",
            title: "Virtual Museum and Virtual Reality",
            tag: "Immersive",
            description: "Immersive digital exhibitions about bats. For museums, visitor centres and educational spaces. Virtual cave tour without disturbing the habitat.",
            cta: { label: "View service", href: "/en/services/virtual-museum-vr/" },
          },
          {
            id: "bat-boxes",
            title: "Bat boxes",
            tag: "Infrastructure",
            description: "Design, manufacture and installation of bat boxes. A nature-based solution for pest control and bat population restoration.",
            cta: { label: "View service", href: "/en/services/bat-boxes/" },
          },
          {
            id: "bat-night",
            title: "Bat Night",
            tag: "Experiences",
            description: "Guided night-time activities with ultrasound detection. For local authorities, festivals and nature centres.",
            cta: { label: "View service", href: "/en/services/bat-night/" },
          },
          {
            id: "environmental-education",
            title: "Environmental education",
            tag: "Education",
            description: "Workshops and guided routes for schools, museums and visitor centres. Scientific outreach with active participation.",
            cta: { label: "View service", href: "/en/services/environmental-education/" },
          },
          {
            id: "consultancy",
            title: "Environmental consultancy",
            tag: "Consultancy",
            description: "Bioacoustics, biodiversity monitoring and nature-based solutions. Technical rigour and verifiable documentation.",
            cta: { label: "View service", href: "/en/services/consultancy/" },
          },
        ],
      },
      {
        id: "why-muma",
        h2: "Why MUMA BAT COMPANY",
        eyebrow: "Our approach",
        intro: "We are not an NGO or an events company. We are specialists with methodology, data and results.",
        pillars: [
          {
            title: "Real, measurable impact",
            text: "Every project generates verifiable data. We design interventions with quantifiable results in biodiversity, pest control and technical documentation for environmental reports.",
          },
          {
            title: "Applied technology",
            text: "Ultrasound detection, virtual reality, 3D modelling and acoustic monitoring. High-level tools in the service of conservation, not the other way round.",
          },
          {
            title: "Scientific rigour and real endorsements",
            text: "Members of SECEMU, EUROBATS and REV. Projects backed by peer-reviewed methodology and collaborations with natural space managers and public institutions.",
          },
        ],
        cta: { label: "Meet the team", href: "/en/about/" },
      },
      {
        id: "contact",
        h2: "Tell us about your project",
        eyebrow: "Start a conversation",
        intro: "We respond within 24 hours. You can also reach us directly via WhatsApp.",
        ctaByPersona: [
          { persona: "museum", label: "Request a virtual museum demo", href: "/en/contact/?interest=virtual-museum" },
          { persona: "council", label: "Download our services dossier", href: "/en/contact/?interest=dossier" },
          { persona: "education", label: "Ask about our education programme", href: "/en/contact/?interest=education" },
        ],
        ctaDefault: { label: "Send enquiry", href: "/en/contact/" },
        ctaWhatsApp: { label: "Message us on WhatsApp", href: "https://wa.me/34XXXXXXXXX" },
      },
    ],

    faq: [
      {
        question: "Does the virtual museum work without VR headsets?",
        answer: "Yes. We offer both headset-based immersive experiences and browser-accessible versions for large screens. We adapt the format to the available space and equipment at each museum or centre.",
      },
      {
        question: "Can bat boxes really help reduce mosquito problems?",
        answer: "Yes. A well-established colony can significantly reduce tiger mosquito and other pest insect populations. The effect builds over time and depends on the local environment. We include technical monitoring to maximise effectiveness.",
      },
      {
        question: "Do you work with local councils and public authorities?",
        answer: "Yes. We have experience with public administrations on urban biodiversity projects, ecological pest control, environmental education and scientific outreach. We issue technical documentation suitable for procurement processes and environmental reports.",
      },
      {
        question: "What documentation do you provide for each project?",
        answer: "Every project includes a technical report with methodology, results and verifiable data. Bat box projects include georeferencing, occupancy records and species detected — suitable for sustainability reports and public funding justification.",
      },
    ],

    internalLinks: [
      {
        id: "silo-virtual-museum",
        label: "Virtual Museum and Virtual Reality",
        href: "/en/services/virtual-museum-vr/",
        priority: "primary",
        context: "Primary commercial silo — museums and visitor centres",
      },
      {
        id: "silo-bat-boxes",
        label: "Bat boxes",
        href: "/en/services/bat-boxes/",
        priority: "primary",
        context: "Primary commercial silo — councils, farmers, hotels",
      },
      {
        id: "contact",
        label: "Contact",
        href: "/en/contact/",
        priority: "conversion",
        context: "Global conversion CTA",
      },
      {
        id: "about",
        label: "About us",
        href: "/en/about/",
        priority: "trust",
        context: "From Why MUMA credibility block",
      },
    ],

    schemaSuggested: [
      {
        type: "Organization",
        notes: "name, url, logo, description, areaServed:ES+EU, memberOf:[SECEMU,EUROBATS,REV]",
      },
      {
        type: "WebSite",
        notes: "name, url — EN version",
      },
    ],

  },

  // ==========================================
  // DE — Deutsch (/de/)
  // NOTE: DE keywords use real SERP terminology for DACH market.
  // "Fledermauskästen" beats "Fledermausboxen" in DE search volume.
  // "virtuelles Museum" + "virtueller Rundgang" are the museum discovery terms.
  // "biologische Schädlingsbekämpfung" is the established pest control term in DE.
  // ==========================================
  de: {

    locale: "de",
    languageLabel: "Deutsch",
    countryFlag: "🇩🇪",

    slug: "/de/",
    url: "https://mumabatcompany.com/de/",
    type: "home",
    cluster: "brand",
    searchIntent: "informational-kommerziell + branded",

    primaryKeyword: "MUMA BAT COMPANY",
    secondaryKeywords: [
      "virtuelles Museum Fledermäuse",
      "virtueller Rundgang Fledermäuse",
      "Fledermauskästen kaufen",
      "Fledermauskästen Installation",
      "biologische Schädlingsbekämpfung Fledermäuse",
      "Fledermaus Naturschutz Unternehmen",
      "Umweltbildung Fledermäuse",
      "naturbasierte Lösungen Fledermäuse",
    ],

    h1: "Fledermaus-Naturschutzleistungen für Museen, Kommunen und Bildungseinrichtungen",
    metaTitle: "MUMA BAT COMPANY | Fledermaus-Naturschutz",
    metaDescription: "Virtuelles Museum, Fledermauskästen, Umweltbildung und ökologische Beratung. Für Museen, Kommunen und Bildungseinrichtungen in Europa.",

    canonical: "https://mumabatcompany.com/de/",
    hreflang: [
      { lang: "es-ES",   url: "https://mumabatcompany.com/" },
      { lang: "en",      url: "https://mumabatcompany.com/en/" },
      { lang: "de-DE",   url: "https://mumabatcompany.com/de/" },
      { lang: "x-default", url: "https://mumabatcompany.com/" },
    ],

    heroEyebrow: "Wissenschaft · Technologie · Naturschutz",
    heroTitle: "Fledermaus-Naturschutzleistungen für Museen, Kommunen und Bildungseinrichtungen",
    heroDescription: "Wir entwickeln und realisieren virtuelle Museumsangebote, Fledermauskästen-Installationen, Umweltbildungsprogramme und technische Beratung. Für Kommunen, Museen, Bildungseinrichtungen und Unternehmen, die echte, naturbasierte Lösungen suchen.",

    primaryCta: {
      label: "Leistungen ansehen",
      href: "#leistungen",
      type: "anchor",
    },
    secondaryCta: {
      label: "Per WhatsApp kontaktieren",
      href: "https://wa.me/34XXXXXXXXX",
      type: "external",
      note: "XXXXXXXXX vor der Veroeffentlichung durch echte Nummer ersetzen",
    },

    trustBlockTitle: "Anerkannt durch",
    trustBlockItems: [
      { name: "SECEMU", description: "Spanische Gesellschaft zum Schutz und zur Erforschung von Fledermäusen" },
      { name: "EUROBATS", description: "Abkommen zur Erhaltung der europäischen Fledermäuspopulationen" },
      { name: "REV", description: "Spanisches Expertennetzwerk für Wildtiere" },
      { name: "La Brujula", description: "Handelskammer Málaga — EFRE-gefördert" },
    ],

    sections: [
      {
        id: "leistungsversprechen",
        h2: "Was wir tun und für wen",
        intro: "MUMA BAT COMPANY ist ein auf Fledermäuse spezialisiertes Unternehmen. Wir entwickeln Projekte in aktivem Naturschutz, biologischer Schädlingsbekämpfung, Umweltbildung, virtuellen Museumserlebnissen und technischer Beratung.",
        body: "Wir sind keine NGO und kein allgemeines Eventunternehmen. Wir sind Spezialisten mit Methodik, Daten und dokumentierten Ergebnissen, die mit Institutionen, Behörden und Organisationen zusammenarbeiten, die echte Lösungen benötigen.",
      },
      {
        id: "hauptleistungen",
        h2: "Leistungen",
        eyebrow: "Was Sie beauftragen können",
        intro: "Konkrete Lösungen für Institutionen, Kommunen, Museen, Bildungseinrichtungen und öffentliche oder private Organisationen.",
        items: [
          {
            id: "virtuelles-museum-vr",
            title: "Virtuelles Museum und Virtual Reality",
            tag: "Immersiv",
            description: "Digitale Ausstellungen über Fledermäuse. Für Museen, Besucherzentren und Bildungsräume. Virtueller Rundgang durch Höhlen ohne Störung des Lebensraums.",
            cta: { label: "Leistung ansehen", href: "/de/leistungen/virtuelles-museum-vr/" },
          },
          {
            id: "fledermauskästen",
            title: "Fledermauskästen",
            tag: "Infrastruktur",
            description: "Entwicklung, Herstellung und Installation von Fledermauskästen. Eine naturbasierte Lösung zur Schädlingsbekämpfung und Wiederherstellung der Fledermauspopulation.",
            cta: { label: "Leistung ansehen", href: "/de/leistungen/fledermauskästen/" },
          },
          {
            id: "bat-night",
            title: "Bat Night",
            tag: "Erlebnisse",
            description: "Geführte Nachtaktivitäten mit Ultraschalldetektion. Für Kommunen, Festivals und Naturzentren.",
            cta: { label: "Leistung ansehen", href: "/de/leistungen/bat-night/" },
          },
          {
            id: "umweltbildung",
            title: "Umweltbildung",
            tag: "Bildung",
            description: "Workshops und geführte Routen für Schulen, Museen und Besucherzentren. Wissenschaftsvermittlung mit aktiver Beteiligung.",
            cta: { label: "Leistung ansehen", href: "/de/leistungen/umweltbildung/" },
          },
          {
            id: "beratung",
            title: "Umweltberatung",
            tag: "Beratung",
            description: "Bioakustik, Biodiversitätsmonitoring und naturbasierte Lösungen. Technische Strenge und überprüfbare Dokumentation.",
            cta: { label: "Leistung ansehen", href: "/de/leistungen/umweltberatung/" },
          },
        ],
      },
      {
        id: "warum-muma",
        h2: "Warum MUMA BAT COMPANY",
        eyebrow: "Unser Ansatz",
        intro: "Wir sind keine NGO und kein Eventunternehmen. Wir sind Spezialisten mit Methodik, Daten und Ergebnissen.",
        pillars: [
          {
            title: "Echter, messbarer Einfluss",
            text: "Jedes Projekt generiert überprüfbare Daten. Wir entwickeln Interventionen mit quantifizierbaren Ergebnissen in Biodiversität, Schädlingsbekämpfung und technischer Dokumentation für Umweltberichte.",
          },
          {
            title: "Angewandte Technologie",
            text: "Ultraschallerkennung, virtuelle Realität, 3D-Modellierung und akustisches Monitoring. Hochwertige Werkzeuge im Dienst des Naturschutzes, nicht umgekehrt.",
          },
          {
            title: "Wissenschaftliche Strenge und echte Empfehlungen",
            text: "Mitglieder von SECEMU, EUROBATS und REV. Projekte gestützt auf peer-reviewed Methodik und Kooperationen mit Naturschutzgebietsverwaltern und öffentlichen Einrichtungen.",
          },
        ],
        cta: { label: "Das Team kennenlernen", href: "/de/ueber-uns/" },
      },
      {
        id: "kontakt",
        h2: "Erzählen Sie uns von Ihrem Projekt",
        eyebrow: "Gespräch beginnen",
        intro: "Wir antworten innerhalb von 24 Stunden. Sie können uns auch direkt per WhatsApp erreichen.",
        ctaByPersona: [
          { persona: "museum", label: "Demo des virtuellen Museums anfordern", href: "/de/kontakt/?interesse=virtuelles-museum" },
          { persona: "kommune", label: "Leistungsdossier herunterladen", href: "/de/kontakt/?interesse=dossier" },
          { persona: "bildung", label: "Bildungsprogramm anfragen", href: "/de/kontakt/?interesse=umweltbildung" },
        ],
        ctaDefault: { label: "Anfrage senden", href: "/de/kontakt/" },
        ctaWhatsApp: { label: "Per WhatsApp schreiben", href: "https://wa.me/34XXXXXXXXX" },
      },
    ],

    faq: [
      {
        question: "Funktioniert das virtuelle Museum ohne eigene VR-Brillen?",
        answer: "Ja. Wir bieten sowohl VR-Brillen-Erlebnisse als auch browserbasierte Versionen für Großbildschirme an. Wir passen das Format an den verfügbaren Raum und die Ausrüstung jedes Museums oder Zentrums an.",
      },
      {
        question: "Helfen Fledermauskästen wirklich bei der Mückenbekämpfung?",
        answer: "Ja. Eine gut etablierte Kolonie kann die Populationen von Tigermücken und anderen Schädlingsinsekten erheblich reduzieren. Der Effekt baut sich im Laufe der Zeit auf und hängt von der lokalen Umgebung ab. Wir bieten technisches Monitoring zur Maximierung der Effektivität.",
      },
      {
        question: "Arbeiten Sie mit Kommunen und Behörden zusammen?",
        answer: "Ja. Wir haben Erfahrung mit öffentlichen Verwaltungen bei Projekten zur städtischen Biodiversität, ökologischen Schädlingsbekämpfung, Umweltbildung und wissenschaftlicher Öffentlichkeitsarbeit. Wir stellen technische Dokumentation aus, die für Ausschreibungen und Umweltberichte geeignet ist.",
      },
      {
        question: "Welche Dokumentation stellen Sie für jedes Projekt bereit?",
        answer: "Jedes Projekt umfasst einen technischen Bericht mit Methodik, Ergebnissen und überprüfbaren Daten. Fledermauskästen-Projekte beinhalten Georeferenzierung, Belegungsaufzeichnungen und nachgewiesene Arten — geeignet für Nachhaltigkeitsberichte und öffentliche Förderanträge.",
      },
    ],

    internalLinks: [
      {
        id: "silo-virtuelles-museum",
        label: "Virtuelles Museum und Virtual Reality",
        href: "/de/leistungen/virtuelles-museum-vr/",
        priority: "primary",
        context: "Hauptkommerzieller Silo — Museen und Besucherzentren",
      },
      {
        id: "silo-fledermauskaesten",
        label: "Fledermauskästen",
        href: "/de/leistungen/fledermauskästen/",
        priority: "primary",
        context: "Hauptkommerzieller Silo — Kommunen, Landwirte, Hotels",
      },
      {
        id: "kontakt",
        label: "Kontakt",
        href: "/de/kontakt/",
        priority: "conversion",
        context: "Globaler Konversions-CTA",
      },
      {
        id: "ueber-uns",
        label: "Über uns",
        href: "/de/ueber-uns/",
        priority: "trust",
        context: "Aus dem Glaubwürdigkeitsblock Warum MUMA",
      },
    ],

    schemaSuggested: [
      {
        type: "Organization",
        notes: "name, url, logo, description, areaServed:ES+EU+DACH, memberOf:[SECEMU,EUROBATS,REV]",
      },
      {
        type: "WebSite",
        notes: "name, url — DE version",
      },
    ],

  },

};

// ============================================================
// NOTA DE IMPLEMENTACION EN REACT
// ============================================================
//
// 1. DEPENDENCIAS NECESARIAS
//    npm install react-helmet-async react-router-dom
//    (react-router-dom ya esta instalado en el proyecto)
//
// 2. ENVOLVER App.jsx CON HelmetProvider
//
//    // src/App.jsx
//    import { HelmetProvider } from "react-helmet-async"
//    import { BrowserRouter, Routes, Route } from "react-router-dom"
//
//    export default function App() {
//      return (
//        <HelmetProvider>
//          <BrowserRouter>
//            <Navbar />
//            <Routes>
//              <Route path="/"    element={<Inicio locale="es" />} />
//              <Route path="/en/" element={<Inicio locale="en" />} />
//              <Route path="/de/" element={<Inicio locale="de" />} />
//            </Routes>
//          </BrowserRouter>
//        </HelmetProvider>
//      )
//    }
//
// 3. COMPONENTE HeadHome.jsx
//
//    // src/components/seo/HeadHome.jsx
//    import { Helmet } from "react-helmet-async"
//    import { homeSeoI18n, homeAlternates } from "../../seo/contenido/home-i18n"
//
//    export default function HeadHome({ locale = "es" }) {
//      const seo = homeSeoI18n[locale]
//      const schema = {
//        "@context": "https://schema.org",
//        "@graph": [
//          {
//            "@type": "Organization",
//            "name": "MUMA BAT COMPANY",
//            "url": "https://mumabatcompany.com",
//            "description": seo.metaDescription,
//            "areaServed": "ES",
//            "memberOf": [
//              { "@type": "Organization", "name": "SECEMU" },
//              { "@type": "Organization", "name": "EUROBATS" },
//              { "@type": "Organization", "name": "REV" }
//            ]
//          },
//          { "@type": "WebSite", "name": "MUMA BAT COMPANY", "url": "https://mumabatcompany.com" }
//        ]
//      }
//
//      return (
//        <Helmet>
//          <html lang={locale} />
//          <title>{seo.metaTitle}</title>
//          <meta name="description" content={seo.metaDescription} />
//          <link rel="canonical" href={seo.canonical} />
//          {seo.hreflang.map(alt => (
//            <link key={alt.lang} rel="alternate" hreflang={alt.lang} href={alt.url} />
//          ))}
//          <script type="application/ld+json">{JSON.stringify(schema)}</script>
//        </Helmet>
//      )
//    }
//
// 4. SELECTOR DE IDIOMA
//
//    // src/components/LanguageSelector.jsx
//    import { useNavigate, useLocation } from "react-router-dom"
//    import { languageOptions } from "../../seo/contenido/home-i18n"
//
//    export default function LanguageSelector({ currentLocale }) {
//      const navigate = useNavigate()
//      return (
//        <div role="navigation" aria-label="Language selector">
//          {languageOptions.map(opt => (
//            <button
//              key={opt.locale}
//              onClick={() => navigate(opt.url)}
//              aria-current={opt.locale === currentLocale ? "true" : undefined}
//              aria-label={opt.label}
//            >
//              <span aria-hidden="true">{opt.flag}</span>
//              <span>{opt.shortLabel}</span>
//            </button>
//          ))}
//        </div>
//      )
//    }
//
// 5. USO EN inicio.jsx
//
//    export default function Inicio({ locale = "es" }) {
//      const seo = homeSeoI18n[locale]
//      return (
//        <main>
//          <HeadHome locale={locale} />
//          <Hero data={seo} />
//          <SeccionServicios data={seo.sections[1]} />
//          <SeccionPorQueMuma data={seo.sections[2]} />
//          <SeccionContacto data={seo.sections[3]} />
//        </main>
//      )
//    }
//
// 6. NOTA SOBRE index.html
//    El atributo lang del <html> debe gestionarse desde Helmet (<html lang={locale} />)
//    ya que es una SPA. El lang="es" hardcodeado en index.html quedara sobreescrito
//    por react-helmet-async en tiempo de ejecucion.
//    Para SSR o prerendering, actualizar el lang del index.html por ruta.
//
// 7. PENDIENTES ANTES DE PUBLICAR
//    - Sustituir XXXXXXXXX en todos los href de WhatsApp por el numero real
//    - Confirmar URL del dominio definitivo en todos los campos url/canonical/href
//    - Añadir logo.png real en /public/ y actualizar la URL en el schema
//    - Verificar slugs de las landings EN y DE con el equipo antes de crear las rutas
//    - Los slugs DE con umlauts (Fledermauskästen) pueden causar problemas en algunas
//      configuraciones de servidor — valorar usar fledermauskästen o fledermauskästen
//      con URL encoding o bien slug alternativo sin umlaut: fledermauskaesten
//
