import type { MetadataRoute } from "next";
import { sectors, sectorHref } from "@/content/sectors";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const newsPages = siteConfig.news.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: new Date(n.revisedAt ?? n.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/prodotti-assistenza`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/chi-siamo`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/contatti`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...sectors.map((sector) => ({
      url: `${base}${sectorHref(sector.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...newsPages,
  ];
}
