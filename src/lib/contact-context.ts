export const contactSectors = ["bar", "ristoranti", "parrucchieri-saloni", "ambulanti", "negozi-altre-attivita", "generico"] as const;
export type ContactSector = typeof contactSectors[number];
export type SectorSlug = Exclude<ContactSector, "generico">;
export const DEFAULT_CONTACT_SUBJECT = "Richiesta di informazioni dal sito";
export type ContactContext = {
  sector: ContactSector;
  form_location: "sector_page" | "contact_page";
};

export const defaultContactContext: ContactContext = { sector: "generico", form_location: "contact_page" };

export function parseContactContext(value: unknown): ContactContext | null {
  if (value === undefined) return { ...defaultContactContext };
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (!contactSectors.some((sector) => sector === data.sector)) return null;
  if (data.form_location !== "sector_page" && data.form_location !== "contact_page") return null;
  if ((data.form_location === "sector_page") === (data.sector === "generico")) return null;
  return { sector: data.sector as ContactSector, form_location: data.form_location };
}

export function contactContextForPath(pathname: string): ContactContext {
  const slug = /^\/soluzioni\/([^/]+)\/?$/.exec(pathname)?.[1];
  return parseContactContext({ sector: slug, form_location: "sector_page" }) ?? { ...defaultContactContext };
}
