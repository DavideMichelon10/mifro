import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const { contact, footer, hoursShort } = siteConfig;
  const year = new Date().getFullYear();
  const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-sm text-sm leading-5 text-gray-600 underline-offset-4 transition-colors hover:text-brand-600 hover:underline";
  const headingClass = "text-xs font-semibold uppercase tracking-[0.14em] text-brand-900";

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="site-container pt-8 sm:pt-10">
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1fr_1.3fr_0.8fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex max-w-sm items-center justify-between gap-4">
              <Link href="/" aria-label="Mifro — Torna alla home" className="inline-flex min-h-11 items-center rounded-sm"><Logo size={30} /></Link>
              <div className="flex gap-1">
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-xs leading-4 text-brand-700 transition-colors hover:bg-brand-100"
                  aria-label="Contattaci su WhatsApp"
                  title="WhatsApp"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-xs leading-4 text-brand-700 transition-colors hover:bg-brand-100"
                  aria-label="Mifro su Facebook"
                  title="Facebook"
                >
                  <Facebook aria-hidden="true" className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
              {footer.description}
            </p>
          </div>

          <section aria-labelledby="footer-contact-title" className="min-w-0">
            <h2 id="footer-contact-title" className={headingClass}>Contatti e orari</h2>
            <address className="mt-3 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${contact.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} items-start py-1`}
                aria-label={`Apri su Google Maps: ${contact.fullAddress}`}
              >
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{contact.address}<br />{contact.cap} {contact.city} ({contact.province})</span>
              </a>
              <div className="flex flex-wrap gap-x-5">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={`${linkClass} font-medium`}>
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-600" />{contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-600" />{contact.email}
                </a>
              </div>
            </address>
            <div className="mt-3 flex items-start gap-2 border-t border-gray-200 pt-3 text-sm leading-relaxed text-gray-600">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p>{hoursShort}</p>
            </div>
          </section>

          <nav aria-labelledby="footer-navigation-title">
            <h2 id="footer-navigation-title" className={headingClass}>Esplora il sito</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${linkClass} lg:min-h-9`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-1 border-t border-gray-200 pb-20 pt-4 text-xs leading-relaxed text-gray-500 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pb-5">
          <p>&copy; {year} {footer.credits}</p>
          <div className="flex flex-wrap items-center gap-x-5">
            <p>{footer.piva}</p>
            <Link href="/privacy" className="inline-flex min-h-11 items-center rounded-sm text-gray-600 underline-offset-4 hover:text-brand-600 hover:underline">Privacy e cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
