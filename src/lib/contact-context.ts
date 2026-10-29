export const contactSectors = ["ristoranti", "parrucchieri-saloni", "ambulanti", "altre-attivita", "generico"] as const;
export type ContactSector = typeof contactSectors[number];
export type SectorSlug = Exclude<ContactSector, "generico">;
export const DEFAULT_CONTACT_SUBJECT = "Richiesta di informazioni dal sito";
export const RENTAL_CONTACT_SUBJECT = "Noleggio registratore di cassa";
export const RENTAL_PATH = "/noleggio-registratori-di-cassa";
export const SALES_CONTACT_SUBJECT = "Acquisto o sostituzione registratore di cassa";
export const SALES_PATH = "/vendita-registratori-di-cassa";
export type ContactContext = {
  sector: ContactSector;
  form_location: "sector_page" | "contact_page" | "rental_page" | "sales_page";
};

export const defaultContactContext: ContactContext = { sector: "generico", form_location: "contact_page" };
export const rentalContactContext: ContactContext = { sector: "generico", form_location: "rental_page" };
export const salesContactContext: ContactContext = { sector: "generico", form_location: "sales_page" };

export function requiresContactPhone(context: ContactContext): boolean {
  return context.form_location === "rental_page"
    || (context.form_location === "sector_page" && context.sector !== "parrucchieri-saloni");
}

export function parseContactContext(value: unknown): ContactContext | null {
  if (value === undefined) return { ...defaultContactContext };
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (!contactSectors.some((sector) => sector === data.sector)) return null;
  if (data.form_location !== "sector_page" && data.form_location !== "contact_page" && data.form_location !== "rental_page" && data.form_location !== "sales_page") return null;
  if ((data.form_location === "sector_page") === (data.sector === "generico")) return null;
  return { sector: data.sector as ContactSector, form_location: data.form_location };
}

export function contactContextForPath(pathname: string): ContactContext {
  if (pathname === RENTAL_PATH || pathname === `${RENTAL_PATH}/`) return { ...rentalContactContext };
  if (pathname === SALES_PATH || pathname === `${SALES_PATH}/`) return { ...salesContactContext };
  const slug = /^\/soluzioni\/([^/]+)\/?$/.exec(pathname)?.[1];
  return parseContactContext({ sector: slug, form_location: "sector_page" }) ?? { ...defaultContactContext };
}
