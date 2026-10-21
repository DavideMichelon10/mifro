import type { MetadataRoute } from "next";
import { sectors, sectorHref } from "@/content/sectors";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const newsPages = siteConfig.news.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/prodotti-assistenza`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/chi-siamo`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/contatti`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...sectors.map((sector) => ({
      url: `${base}${sectorHref(sector.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...newsPages,
  ];
}
