import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { siteConfig } from "@/content/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const { contact, footer, hoursShort } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size={32} />
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Link rapidi
            </h3>
            <ul className="mt-3 space-y-2">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contatti
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                {contact.fullAddress}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gray-400" />
                <a href={`tel:${contact.phone}`} className="hover:text-brand-600">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-brand-600">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Orari
            </h3>
            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <span>{hoursShort}</span>
            </div>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-brand-600"
              aria-label="Mifro su Facebook"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          &copy; {year} {footer.credits}
        </div>
      </div>
    </footer>
  );
}
