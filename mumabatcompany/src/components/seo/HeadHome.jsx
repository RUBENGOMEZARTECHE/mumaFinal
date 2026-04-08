import { Helmet } from "react-helmet-async";

export default function HeadHome() {
  return (
    <Helmet>
      <title>MUMA BAT COMPANY | Servicios con murciélagos para empresas</title>
      <meta
        name="description"
        content="Experiencias inmersivas, refugios, educación ambiental y consultoría basada en la naturaleza. Para ayuntamientos, museos, colegios y empresas."
      />
      <link rel="canonical" href="https://mumabatcompany.com/" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mumabatcompany.com/" />
      <meta property="og:title" content="MUMA BAT COMPANY | Servicios con murciélagos para empresas" />
      <meta
        property="og:description"
        content="Experiencias inmersivas, refugios, educación ambiental y consultoría basada en la naturaleza. Para ayuntamientos, museos, colegios y empresas."
      />

      {/* Schema: Organization */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MUMA BAT COMPANY",
          "url": "https://mumabatcompany.com",
          "description": "Empresa especializada en servicios con murciélagos: conservación activa, control biológico de plagas, educación ambiental, experiencias inmersivas y consultoría técnica.",
          "areaServed": "ES",
          "knowsAbout": ["murciélagos", "bioacústica", "control biológico", "realidad virtual", "educación ambiental"],
          "memberOf": [
            { "@type": "Organization", "name": "SECEMU" },
            { "@type": "Organization", "name": "EUROBATS" }
          ]
        }
      `}</script>

      {/* Schema: WebSite */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MUMA BAT COMPANY",
          "url": "https://mumabatcompany.com"
        }
      `}</script>
    </Helmet>
  );
}
