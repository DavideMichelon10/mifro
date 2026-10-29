import { contactContextForPath, defaultContactContext, parseContactContext, type ContactContext } from "@/lib/contact-context";

export const GA_ID = "G-PHX0Y4MJH3";
export const CONSENT_KEY = "mifro-analytics-consent";
export const ADS_CONSENT_KEY = "mifro-ads-measurement-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function track(name: string, parameters: Record<string, string>) {
  try {
    if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;
    window.gtag?.("event", name, { ...parameters, transport_type: "beacon" });
  } catch { /* Measurement must never interrupt a contact action. */ }
}

export function trackContactSubmission(context: ContactContext = defaultContactContext) {
  const safeContext = parseContactContext(context);
  if (safeContext) track("generate_lead", { form_id: "contact", ...safeContext });
}

// Intent only: opening a dialer or WhatsApp does not prove a conversation happened.
export function trackContactClick(channel: "phone" | "whatsapp", pathname: string) {
  if (channel !== "phone" && channel !== "whatsapp") return;
  const { sector, form_location } = contactContextForPath(pathname);
  const page_type = form_location === "rental_page" ? "rental_page"
    : form_location === "sales_page" ? "sales_page"
    : sector !== "generico" ? "sector_page"
    : pathname === "/" ? "home"
    : pathname === "/contatti" ? "contact_page"
    : pathname === "/prodotti-assistenza" ? "support_page" : "other";
  track("contact_click", { channel, sector, page_type });
}
