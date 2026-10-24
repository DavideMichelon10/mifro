import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: "generale" | "ristoranti";
  article?: { published: string; revised: string };
};

export function createPageMetadata({ title, description, path, image = "generale", article }: PageMetadata): Metadata {
  const fullTitle = title.endsWith(` | ${siteConfig.shortName}`) ? title : `${title} | ${siteConfig.shortName}`;
  const url = new URL(path, siteConfig.url).href;
  const socialImage = {
    url: new URL(`/images/og/${image}`, siteConfig.url).href,
    width: 1200,
    height: 630,
    alt: image === "ristoranti" ? "Mifro: casse e gestionali per ristoranti in Trentino" : "Mifro: casse, POS e assistenza in Trentino",
  };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle, description, url, locale: "it_IT", siteName: siteConfig.name,
      images: [socialImage],
      ...(article ? { type: "article", publishedTime: article.published, modifiedTime: article.revised } : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage] },
  };
}
