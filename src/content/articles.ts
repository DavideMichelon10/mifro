type ArticleLink = { label: string; href: string };

export type Article = {
  slug: string;
  title: string;
  date: string;
  revisedAt?: string;
  description: string;
  content: string;
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

export const articles: Article[] = [
    {
      slug: "guida-ade-collegamento-rt-pos",
      title: "Guida operativa AdE per il collegamento logico RT–POS",
      date: "2026-02-27",
      revisedAt: "2026-10-24",
      sources: [
        { title: "AdE: FAQ sul collegamento POS–RT (25 marzo 2026)", url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503" },
        { title: "AdE: scadenzario della prima comunicazione (20 aprile 2026)", url: "https://www1.agenziaentrate.gov.it/servizi/scadenzario/main.php?chi=3982&come=549&cosa=11494&entroil=20-04-2026&op=4&vista=0" },
        { title: "AdE: guida operativa, edizione febbraio 2026", url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/guidaoperativa_pos-rt" },
      ],
      description:
        "L’Agenzia delle Entrate ha pubblicato la guida operativa per il collegamento logico tra registratore telematico e POS: che cos’è, chi deve effettuarlo e quali scadenze rispettare.",
      content:
        "Il collegamento RT–POS associa gli strumenti di pagamento elettronico agli strumenti usati per certificare i corrispettivi. Si effettua sul portale Fatture e Corrispettivi dell’Agenzia delle Entrate: non richiede un cavo tra POS e cassa né, per questo adempimento, la sostituzione del registratore.\n\nLa procedura è disponibile dal 5 marzo 2026. Per i POS già in uso nel gennaio 2026, la prima scadenza era il 20 aprile 2026. Per nuove attivazioni successive a gennaio o per variazioni, la FAQ 12 dell’Agenzia indica il periodo dal sesto giorno del secondo mese successivo fino all’ultimo giorno lavorativo dello stesso mese.\n\nPrima di accedere, prepara la matricola del registratore telematico, gli identificativi del POS e l’indirizzo dell’unità locale. Il collegamento può essere gestito dall’esercente o da un intermediario con la delega prevista; chi usa Documento Commerciale on line deve operare direttamente.\n\nPer esclusioni, attività miste e casi specifici consulta le FAQ ufficiali aggiornate e verifica la tua situazione con l’intermediario fiscale. Il PDF scaricabile qui sotto è la guida di febbraio 2026: per le scadenze, consulta le informazioni aggiornate riportate sopra e le fonti ufficiali collegate.",
      type: "pdf",
      file: "/docs/guida-ade-collegamento-rt-pos.pdf",
      fileLabel: "Scarica la guida AdE (febbraio 2026)",
      relatedLinks: [{ label: "POS e pagamenti: le soluzioni Mifro", href: "/prodotti-assistenza#pagamenti" }],
      cta: {
        title: "Un dubbio sulla tua cassa o sul POS?",
        description: "Indicaci i modelli che utilizzi e il comune della tua attività. Ti aiutiamo a capire quale supporto tecnico serve.",
        showPhone: true,
      },
      faq: [
        {
          question: "In cosa consiste il collegamento RT–POS?",
          answer:
            "Non si tratta di un collegamento fisico tramite cavi, ma di un collegamento logico: una comunicazione all’Agenzia delle Entrate da aggiornare in caso di variazioni tramite il portale \"Fatture e Corrispettivi\", in cui si associa ciascun POS (fisico o virtuale) al proprio registratore telematico.",
        },
        {
          question: "Chi è obbligato al collegamento?",
          answer:
            "Riguarda chi certifica con RT o Documento Commerciale on line i corrispettivi incassati con strumenti di pagamento elettronico. In caso di attività miste, lo stesso POS usato anche per operazioni certificate va collegato: consulta le FAQ AdE per le esclusioni.",
        },
        {
          question: "Entro quando va effettuato il collegamento?",
          answer:
            "La prima scadenza, per i POS in uso a gennaio 2026, era il 20 aprile 2026. Per successive attivazioni o variazioni, la FAQ 12 AdE indica un periodo che va dal sesto giorno del secondo mese successivo all’ultimo giorno lavorativo dello stesso mese.",
        },
        {
          question: "Dove si effettua il collegamento?",
          answer:
            "Tramite la funzionalità \"Gestione collegamenti\" nel portale \"Fatture e Corrispettivi\" dell’Agenzia delle Entrate, oppure tramite la procedura web \"Documento Commerciale on line\" per chi la utilizza.",
        },
        {
          question: "Cosa succede se ho più POS o più RT?",
          answer:
            "Sono possibili collegamenti multipli. Per i POS fisici gli RT devono essere utilizzati allo stesso indirizzo; per quelli virtuali sono ammesse unità locali diverse. I dettagli sono nella FAQ 18 AdE.",
        },
        {
          question: "Mifro può aiutarmi con il collegamento RT–POS?",
          answer:
            "Possiamo aiutarti a identificare la cassa e la configurazione in uso. L’adempimento sul portale compete all’esercente o all’intermediario abilitato: contattaci per chiarire quale supporto tecnico ti serve.",
        },
      ],
    },
  ];
