import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { OrganizationJsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.home.title,
    template: `%s – ${siteConfig.shortName}`,
  },
  description: siteConfig.seo.home.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.name,
    title: siteConfig.seo.home.title,
    description: siteConfig.seo.home.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="bg-white font-sans text-gray-900 antialiased">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
