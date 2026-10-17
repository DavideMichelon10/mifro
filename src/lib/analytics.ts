export const GA_ID = "G-PHX0Y4MJH3";
export const CONSENT_KEY = "mifro-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactSubmission() {
  try {
    if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;
    window.gtag?.("event", "generate_lead", { form_id: "contact", transport_type: "beacon" });
  } catch { /* Tracking must never interrupt a successful submission. */ }
}
