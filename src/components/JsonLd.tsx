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

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.path, siteConfig.url).href,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  path,
  title,
  description,
  published,
  revised,
  section,
  faq,
}: {
  path: string;
  title: string;
  description: string;
  published: string;
  revised: string;
  section: string;
  faq?: readonly { question: string; answer: string }[];
}) {
  const url = new URL(path, siteConfig.url).href;
  const organization = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo-mifro.png` },
  };
  const graph: unknown[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      inLanguage: "it-IT",
      articleSection: section,
      datePublished: published,
      dateModified: revised,
      mainEntityOfPage: url,
      image: `${siteConfig.url}/images/og/generale`,
      author: organization,
      publisher: organization,
    },
  ];
  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return <JsonLdScript data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
