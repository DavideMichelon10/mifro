import { siteConfig } from "@/content/site";

export function OrganizationJsonLd() {
  const days: Record<string, string> = {
    Lunedì: "Monday",
    Martedì: "Tuesday",
    Mercoledì: "Wednesday",
    Giovedì: "Thursday",
    Venerdì: "Friday",
    Sabato: "Saturday",
    Domenica: "Sunday",
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-mifro.png`,
    image: `${siteConfig.url}/images/logo-mifro.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    foundingDate: String(siteConfig.foundedYear),
    description: siteConfig.seo.home.description,
    sameAs: [siteConfig.contact.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      postalCode: siteConfig.contact.cap,
      addressRegion: siteConfig.contact.province,
      addressCountry: siteConfig.contact.country,
    },
    areaServed: [
      { "@type": "City", name: "Pergine Valsugana" },
      { "@type": "City", name: "Trento" },
      { "@type": "AdministrativeArea", name: "Trentino" },
    ],
    openingHoursSpecification: siteConfig.hours.flatMap((entry) => {
      const dayOfWeek = days[entry.days];
      if (!dayOfWeek || entry.time === "Chiuso") return [];

      return entry.time.split(" / ").map((period) => {
        const [opens, closes] = period.split("–").map((time) => time.trim());
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek,
          opens,
          closes,
        };
      });
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
