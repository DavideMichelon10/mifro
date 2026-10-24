import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Script from "next/script";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import ContactClickTracking from "@/components/ContactClickTracking";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { OrganizationJsonLd } from "@/components/JsonLd";

const inter = localFont({ src: "./fonts/inter-latin-variable.woff2", weight: "100 900", style: "normal", display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  ...createPageMetadata({ ...siteConfig.seo.home, path: "/" }),
  title: { default: siteConfig.seo.home.title, template: `%s | ${siteConfig.shortName}` },
  metadataBase: new URL(siteConfig.url),
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
      <body className="bg-white font-sans text-gray-900 antialiased">
        <OrganizationJsonLd />
        {children}
        <AnalyticsConsent />
        <ContactClickTracking />
        <Script id="chatwoot-widget" strategy="afterInteractive">
          {`
            window.chatwootSettings = {
              position: "right",
              locale: "it",
              type: "standard",
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
