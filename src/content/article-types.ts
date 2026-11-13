type ArticleLink = { label: string; href: string };

export const articleCategories = {
  problemi: { label: "Cosa fare se…", description: "Guasti, errori e imprevisti con cassa e POS: cosa fare subito." },
  costi: { label: "Scelta e costi", description: "Quanto costa, cosa confrontare e come scegliere." },
  territorio: { label: "Per mestiere e territorio", description: "Indicazioni per il tuo tipo di attività in Trentino." },
  basi: { label: "Le basi", description: "Come funzionano registratore telematico, scontrini e pagamenti." },
  normativa: { label: "Adempimenti", description: "Obblighi e scadenze spiegati con le fonti ufficiali." },
} as const;

export type ArticleCategory = keyof typeof articleCategories;

/**
 * Blocchi del corpo dell'articolo. Nei campi di testo (`text`, `items`, celle
 * delle tabelle) sono ammessi solo due formati in linea:
 * `**grassetto**` e `[etichetta](https://… oppure /percorso-interno)`.
 */
export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "note"; title?: string; text: string };

export type Article = {
  slug: string;
  title: string;
  /** Data di pubblicazione, formato AAAA-MM-GG. */
  date: string;
  /** Data dell'ultima verifica delle fonti, formato AAAA-MM-GG. */
  revisedAt?: string;
  category: ArticleCategory;
  /** Meta description e testo dell'anteprima nell'indice (140–160 caratteri). */
  description: string;
  /** Risposta diretta alla domanda del titolo, 40–70 parole, mostrata in apertura. */
  answer?: string;
  /** Corpo strutturato. In alternativa, `content` come testo semplice. */
  body?: ArticleBlock[];
  content?: string;
  sources?: { title: string; url: string }[];
  relatedLinks?: ArticleLink[];
  faq?: { question: string; answer: string }[];
  cta?: {
    title: string;
    description: string;
    label?: string;
    href?: string;
    showPhone?: boolean;
  };
} & (
  | { type: "news"; file?: never; fileLabel?: never }
  | { type: "pdf" | "link"; file: string; fileLabel: string }
);
