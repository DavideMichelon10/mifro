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
    template: `%s | ${siteConfig.shortName}`,
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
        <Script id="chatwoot-widget" strategy="afterInteractive">
          {`
            window.chatwootSettings = {
              position: "right",
              locale: "it",
              type: "expanded_bubble",
              launcherTitle: "Ciao! Ti serve una mano?"
            };
            (function(d,t) {
              var BASE_URL = "https://app.chatwoot.com";
              var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
              g.src = BASE_URL + "/packs/js/sdk.js";
              g.async = true;
              s.parentNode.insertBefore(g, s);
              g.onload = function() {
                window.chatwootSDK.run({
                  websiteToken: "DShp58PDXva8TizM1Z89LYm1",
                  baseUrl: BASE_URL
                });
              };
            })(document, "script");
          `}
        </Script>
      </body>
    </html>
  );
}
