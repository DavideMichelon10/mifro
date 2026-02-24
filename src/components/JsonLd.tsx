import { siteConfig } from "@/content/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo500x500.png`,
    image: `${siteConfig.url}/images/logo500x500.png`,
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
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Trentino",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:30",
        closes: "18:30",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
