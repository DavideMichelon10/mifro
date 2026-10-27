import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/PageIntro";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = createPageMetadata({ ...siteConfig.seo.contatti, path: "/contatti" });

export default function ContattiPage() {
  const { contactPage, contact, hoursShort } = siteConfig;

  return (
    <>
      <PageIntro title={contactPage.title} description={contactPage.description} />
      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="section-title">Parliamone insieme</h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-link text-lg"><Phone aria-hidden="true" className="h-5 w-5 shrink-0" />{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="text-link flex break-all"><Mail aria-hidden="true" className="h-5 w-5 shrink-0" />{contact.email}</a>
              <p className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{contact.fullAddress}</p>
              <p className="flex items-start gap-3"><Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{hoursShort}</p>
              <p>{siteConfig.support.requestNote}</p>
              <p>{siteConfig.support.hoursNote}</p>
            </div>
          </div>
          <div className="form-panel">
            <h2 className="mb-6 text-xl font-semibold">{contactPage.formTitle}</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
