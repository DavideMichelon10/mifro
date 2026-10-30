import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import ContactSection from "@/components/ContactSection";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/PageIntro";

export const metadata = createPageMetadata({ ...siteConfig.seo.contatti, path: "/contatti" });

export default function ContattiPage() {
  const { contactPage } = siteConfig;

  return (
    <>
      <PageIntro title={contactPage.title} description={contactPage.description} />
      <ContactSection
        title={contactPage.formTitle}
        description={siteConfig.ctaFinal.description}
      >
        <ContactForm />
      </ContactSection>
    </>
  );
}
