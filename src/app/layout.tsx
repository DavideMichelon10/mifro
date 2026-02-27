import type { Metadata } from "next";
import Script from "next/script";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.name,
    title: siteConfig.seo.home.title,
    description: siteConfig.seo.home.description,
    // og:image – aggiungere immagine 1200×630 e decommentare:
    // images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.home.title,
    description: siteConfig.seo.home.description,
  },
  icons: {
    icon: [
      { url: "/favicon16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PHX0Y4MJH3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PHX0Y4MJH3');
          `}
        </Script>
      </head>
      <body className="bg-white font-sans text-gray-900 antialiased">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
