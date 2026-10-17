import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: siteConfig.seo.contatti.title,
  description: siteConfig.seo.contatti.description,
  alternates: { canonical: "/contatti" },
  openGraph: {
    title: siteConfig.seo.contatti.title,
    description: siteConfig.seo.contatti.description,
  },
};

export default function ContattiPage() {
  const { contactPage } = siteConfig;

  return (
    <>
      <Section>
        <SectionHeader
          title={contactPage.title}
          subtitle={contactPage.description}
        />

        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
