import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: siteConfig.seo.contatti.title,
  description: siteConfig.seo.contatti.description,
  openGraph: {
    title: siteConfig.seo.contatti.title,
    description: siteConfig.seo.contatti.description,
  },
};

export default function ContattiPage() {
  const { contactPage, contact, hours } = siteConfig;

  return (
    <>
      <Section>
        <SectionHeader
          title={contactPage.title}
          subtitle={contactPage.description}
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <ContactForm />

          {/* Info box */}
          <div className="space-y-6 rounded-xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Informazioni
            </h3>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <span>{contact.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-500" />
                <a href={`tel:${contact.phone}`} className="hover:text-brand-500">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-500" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-brand-500"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 shrink-0 text-brand-500" />
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-500"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Orari */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                <Clock className="mr-1.5 inline h-4 w-4" />
                Orari
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {hours.map((h) => (
                  <li key={h.days} className="flex justify-between">
                    <span className="font-medium text-gray-700">{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
