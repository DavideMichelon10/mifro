import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import WhatsAppLink from "@/components/WhatsAppLink";

interface ContactSectionProps {
  children: ReactNode;
  title: string;
  description: string;
  eyebrow?: string;
  showDirectContacts?: boolean;
}

export default function ContactSection({
  children,
  title,
  description,
  eyebrow = "Parliamone insieme",
  showDirectContacts = true,
}: ContactSectionProps) {
  const { contact, contactPanel } = siteConfig;

  return (
    <section className="py-12 sm:py-16" aria-labelledby="contact-section-title">
      <div className="site-container">
        <div className="contact-shell">
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">{eyebrow}</p>
              <h2 id="contact-section-title">{title}</h2>
              <p className="contact-description">{description}</p>
              <ol className="contact-steps">
                {contactPanel.steps.map((step, index) => (
                  <li key={step}><span aria-hidden="true">{index + 1}</span>{step}</li>
                ))}
              </ol>
              <div className="contact-direct">
                {showDirectContacts && <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="button button-outline-light"><Phone aria-hidden="true" className="h-4 w-4 shrink-0" />Chiamaci</a>}
                <WhatsAppLink className="button button-outline-light" />
              </div>
            </div>
            <div id="richiedi-proposta" tabIndex={-1} aria-label={siteConfig.contactPage.formTitle} className="form-panel scroll-mt-24">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
