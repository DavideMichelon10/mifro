import { sectors, sectorHref } from "./sectors";
import { articles } from "./articles";

/* ──────────────────────────────────────────────────────────────
   MIFRO – Contenuti centralizzati del sito
   Modifica questo file per aggiornare TUTTI i testi, i link,
   gli orari e le informazioni di contatto.
   ────────────────────────────────────────────────────────────── */

export const siteConfig = {
  /* ── Brand ─────────────────────────────────────────── */
  name: "Mifro S.a.s.",
  shortName: "Mifro",
  url: "https://www.mifro.it",
  claim: "Dedicatevi totalmente al vostro lavoro… al resto ci pensiamo noi!",
  foundedYear: 1990,
  logo: "/images/logo-mifro.svg",

  /* ── Contatti ───────────────────────────────────────── */
  contact: {
    address: "Via Giuseppe Verdi 13",
    city: "Pergine Valsugana",
    province: "TN",
    cap: "38057",
    region: "Trentino-Alto Adige",
    country: "IT",
    fullAddress: "Via Giuseppe Verdi 13, 38057 Pergine Valsugana (TN)",
    phone: "+39 0461 512777",
    fax: "+39 0461 539340",
    email: "mifro@mifro.it",
    whatsapp: "+390461512777",
    facebook: "https://www.facebook.com/mifrosas",
    googleMapsQuery:
      "Mifro+S.a.s.+Via+Giuseppe+Verdi+13+Pergine+Valsugana+TN",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.5!2d11.2386!3d46.0654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47781e5b0a0a0a0b%3A0x0!2sVia%20Giuseppe%20Verdi%2C%2013%2C%2038057%20Pergine%20Valsugana%20TN!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit",
  },

  /* ── Orari ──────────────────────────────────────────── */
  hours: [
    { days: "Lunedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Martedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Mercoledì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Giovedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Venerdì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Sabato", time: "Chiuso" },
    { days: "Domenica", time: "Chiuso" },
  ],
  hoursShort: "Lun–Ven 08:00–12:00 / 14:30–18:30",

  /* ── Navigazione ────────────────────────────────────── */
  nav: [
    { label: "Per la tua attività", href: "/#settori" },
    { label: "Prodotti e assistenza", href: "/prodotti-assistenza" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" },
  ],

  /* ── Hero ────────────────────────────────────────────── */
  hero: {
    title: "Registratori di cassa e sistemi POS in Trentino",
    subtitle:
      "Ti affianchiamo nella scelta delle soluzioni più adatte al tuo punto cassa e al tuo ufficio, con installazione e assistenza tecnica.",
    tagline: "Al fianco delle imprese dal 1990",
    cta1: { label: "Contattaci", href: "/contatti" },
    cta2: { label: "Soluzioni per la tua attività", href: "/#settori" },
    image: "/images/hero.jpg",
  },

  /* ── Settori della home ─────────────────────────────── */
  sectors: [
    {
      title: "Food",
      description: "Bar, pizzerie e ristoranti",
      icon: "ChefHat",
      links: sectors.filter((sector) => sector.slug === "bar" || sector.slug === "ristoranti").map((sector) => ({
        label: sector.label,
        href: sectorHref(sector.slug),
      })),
    },
    ...sectors.filter((sector) => sector.slug !== "bar" && sector.slug !== "ristoranti").map((sector) => ({
      title: sector.label,
      description: sector.summary,
      icon: sector.icon,
      href: sectorHref(sector.slug),
    })),
  ] as {
    title: string;
    description: string;
    icon: import("@/components/Icons").IconName;
    href?: string;
    links?: { label: string; href: string }[];
  }[],

  /* ── I nostri marchi ────────────────────────────────── */
  brands: [
    { name: "RCH", description: "Soluzioni per il punto cassa", logo: "/images/brands/rch.svg" },
    { name: "Epson", description: "Stampanti telematiche", logo: "/images/brands/epson.svg" },
    { name: "Cashmatic", description: "Cassetti automatici", logo: "/images/brands/cashmatic.svg" },
    { name: "Canon", description: "Stampanti multifunzioni", logo: "/images/brands/canon.svg" },
  ],

  /* ── Certificazioni ─────────────────────────────────── */
  certifications: {
    title: "Qualità e certificazioni",
    text: "Mifro è certificata ISO 9001 / UNI EN ISO 9001:2008 per le verificazioni periodiche dei Misuratori Fiscali multimarca, in quanto laboratorio abilitato.",
    badge: "ISO 9001",
  },

  /* ── CTA finale ─────────────────────────────────────── */
  ctaFinal: {
    title: "Parliamo del tuo punto cassa",
    description:
      "Raccontaci di cosa hai bisogno. Ti ricontattiamo per parlarne insieme.",
    cta: { label: "Contattaci", href: "/contatti" },
  },

  support: {
    territory: "Assistenza in Trentino, con sede a Pergine Valsugana.",
    methods: "Interventi sul posto e da remoto, in base al problema e alla configurazione.",
    requestNote: "Indicaci il modello, cosa succede e il comune in cui lavori. I nostri tecnici ti ricontattano per capire quale intervento serve.",
    hoursNote: "Gli orari indicati sono quelli di contatto della sede. Modalità e copertura dell’assistenza dipendono dagli accordi di servizio.",
  },
  privacyRevisedAt: "2026-10-24",

  /* ── Percorso delle richieste dai settori ───────────── */
  contactJourney: {
    title: "Dalla prima richiesta, sempre al tuo fianco.",
    description: "Lascia i tuoi recapiti nel modulo e raccontaci la tua attività. Ti accompagniamo nella scelta e nell’utilizzo della soluzione.",
    cta: "Richiedi un ricontatto",
    steps: [
      {
        title: "Lasciaci i tuoi recapiti",
        description: "Compila il modulo e raccontaci come lavori oggi e cosa vorresti migliorare nella tua attività.",
      },
      {
        title: "Ti richiama Claudio",
        description: "Ti contatta Claudio, il titolare di Mifro, che fa questo lavoro da oltre 30 anni. Ascolta le tue esigenze per capire come lavori e quale soluzione può aiutarti.",
        badge: "Claudio ti richiama entro un massimo di 2 giorni lavorativi.",
      },
      {
        title: "Tocca con mano in negozio",
        description: "Se vuoi, vieni a trovarci a Pergine Valsugana: puoi vedere e provare le soluzioni prima di scegliere.",
      },
      {
        title: "Ricevi il tuo preventivo",
        description: "Ti proponiamo una configurazione adatta alla tua attività, con un preventivo che chiarisce prodotti, software e servizi.",
      },
      {
        title: "Installazione e formazione",
        description: "Quando decidi di procedere, un tecnico specializzato si occupa dell’installazione e ti insegna a usare la soluzione nel tuo lavoro di ogni giorno.",
      },
      {
        title: "Ci siamo anche dopo",
        description: "Per ogni dubbio futuro puoi contare sulla nostra assistenza. Il rapporto con Mifro continua anche dopo l’avvio.",
      },
    ],
  },

  /* ── Prodotti e assistenza ──────────────────────────── */
  productsAndSupport: {
    intro: "Pagamenti, strumenti per l’ufficio e assistenza tecnica, con un unico riferimento sul territorio.",
    blocks: [
      {
        id: "pagamenti",
        title: "POS e pagamenti",
        description: "Terminali e soluzioni di pagamento da abbinare al punto cassa.",
        details: "Ti aiutiamo a scegliere il terminale per accettare pagamenti con carte e smartphone, in base a come lavori al banco o in mobilità. Se hai già una cassa, partiamo dalla configurazione che utilizzi per valutare le soluzioni di pagamento da abbinare.",
        icon: "CreditCard" as const,
        image: "/images/pagamento.jpg",
        imageAlt: "Pagamento contactless con smartphone su un sistema RCH",
        imageFit: "contain" as const,
      },
      {
        id: "hardware-ufficio",
        title: "Tecnologia per l’ufficio",
        description: "PC, stampanti, multifunzioni e materiali di consumo, con supporto nella scelta.",
        details: "Un PC per il lavoro di ogni giorno, una stampante o una multifunzione: ti aiutiamo a scegliere in base a quello che devi fare e a quanto stampi. Forniamo anche materiali di consumo, così puoi rivolgerti a noi sia per l’attrezzatura sia per le necessità quotidiane dell’ufficio.",
        icon: "Printer" as const,
        image: "/images/stampanti.jpg",
        imageAlt: "Postazione da ufficio con computer e stampante",
        imageFit: "cover" as const,
      },
      {
        id: "riparazioni",
        title: "Assistenza e riparazioni",
        description: "Supporto su casse e software, diagnosi e riparazioni di PC e stampanti.",
        details: "La cassa dà problemi o il gestionale si blocca? Ci occupiamo di assistenza su registratori di cassa e gestionali, oltre a diagnosi e riparazioni di PC e stampanti.",
        icon: "Wrench" as const,
        image: "/images/assistenza-riparazioni-uomo.jpg",
        imageAlt: "Mani di un tecnico durante la sostituzione di un SSD in un computer portatile",
        imageFit: "cover" as const,
      },
    ],
    sectorsIntro: {
      title: "Hai un’attività?",
      description: "Cerchi una cassa o un gestionale? Scegli il tuo settore e scopri le soluzioni per il tuo lavoro di ogni giorno.",
    },
  },

  /* ── Chi siamo ──────────────────────────────────────── */
  about: {
    highlights: [
      { value: "Dal 1990", text: "In Trentino" },
      { value: "Oltre 1.000 clienti", text: "Negozi, locali e imprese" },
      { value: "Assistenza diretta", text: "Sul posto e da remoto" },
    ],
    localPresence: {
      title: "I tuoi tecnici, sul territorio.",
      image: "/images/vetrina-mifro.jpg",
      imageAlt: "La vetrina e l’ingresso della sede Mifro",
      intro:
        "Dal 1990 affianchiamo negozi, bar, ristoranti e imprese in Trentino con registratori di cassa, sistemi POS e soluzioni informatiche per il punto vendita e l’ufficio.",
      support:
        "Ti seguiamo dalla scelta dei prodotti all’installazione e alla configurazione, con un rapporto diretto con i nostri tecnici. Quando serve assistenza, interveniamo sul posto o da remoto, anche su PC, stampanti e software.",
    },
    intro:
      "Dal 1990 affianchiamo le imprese trentine nella scelta, installazione e gestione delle tecnologie per il punto vendita e l'ufficio.",
    story:
      "Mifro nasce nel 1990 in Trentino con l'obiettivo di offrire soluzioni informatiche affidabili alle attività commerciali del territorio. In oltre trent'anni di attività, abbiamo accompagnato centinaia di aziende nella transizione tecnologica, mantenendo un approccio diretto e personale che ci distingue ancora oggi.",
    approach:
      "Il nostro metodo parte dall'ascolto: comprendiamo le esigenze specifiche di ogni cliente per proporre soluzioni concrete, senza complicazioni inutili. Dalla consulenza alla fornitura, dall'installazione all'assistenza continuativa, siamo il riferimento unico per tutta la filiera tecnologica del punto vendita.",
    team: [
      {
        name: "Claudio",
        role: "Titolare",
        bio: "Fondatore di Mifro, guida l'azienda con oltre trent'anni di esperienza nel settore delle tecnologie per il punto vendita.",
      },
      {
        name: "Fabio",
        role: "Tecnico – Sistemi di cassa",
        bio: "Specializzato su registratori di cassa telematici RT e sistemi punto vendita. Gestisce installazioni, configurazioni e assistenza tecnica on-site e da remoto.",
      },
      {
        name: "Alessandro",
        role: "Tecnico – Software gestionale",
        bio: "Esperto di software gestionali per la ristorazione e il retail. Conosce a fondo anche i sistemi di cassa e segue i clienti a 360° sull'intera soluzione.",
      },
      {
        name: "Fabrizio",
        role: "Tecnico – Gestionali e web",
        bio: "Esperto nella creazione di software gestionali e siti WordPress. Segue anche l’installazione e la gestione dei prodotti RCH.",
      },
    ],
    values: [
      {
        title: "Esperienza trentennale",
        description:
          "Oltre 30 anni al servizio delle imprese trentine, con competenza e continuità.",
      },
      {
        title: "Assistenza diretta",
        description:
          "Tecnici in Trentino per valutare il problema e concordare l’intervento sul posto o da remoto.",
      },
      {
        title: "Soluzioni su misura",
        description:
          "Ogni proposta è studiata sulle reali esigenze dell'attività del cliente.",
      },
      {
        title: "Partner affidabili",
        description:
          "Collaboriamo con i migliori marchi del settore per garantire qualità e aggiornamento.",
      },
    ],
  },

  /* ── Contatti (pagina) ──────────────────────────────── */
  contactPage: {
    title: "Contattaci",
    description:
      "Hai bisogno di informazioni o assistenza? Lasciaci un messaggio e ti ricontatteremo.",
    formTitle: "Scrivici, ti ricontattiamo noi.",
    replyNote: "Il gestore del sito inoltra la richiesta a Mifro, che ti ricontatterà all’indirizzo email indicato.",
    formFields: {
      name: "Nome e cognome",
      email: "Email",
      phone: "Numero di telefono",
      subject: "Oggetto",
      message: "Messaggio",
      submit: "Invia messaggio",
    },
  },

  /* ── News ───────────────────────────────────────────── */
  news: articles,

  /* ── SEO ────────────────────────────────────────────── */
  seo: {
    home: {
      title:
        "Registratori di cassa in Trentino | Mifro",
      description:
        "Registratori di cassa telematici RT, sistemi POS, installazione e assistenza per negozi, bar e ristoranti in Trentino. Mifro, dal 1990.",
    },
    prodottiAssistenza: {
      title: "Prodotti e assistenza tecnica in Trentino",
      description: "POS e pagamenti, PC e stampanti per l’ufficio, assistenza su casse e software e riparazioni. Contatta i tecnici Mifro in Trentino.",
    },
    chiSiamo: {
      title: "Chi siamo: al fianco delle imprese in Trentino",
      description:
        "Dal 1990 Mifro affianca le imprese trentine con soluzioni IT per il punto vendita e l'ufficio. Scopri la nostra storia, i valori e l'approccio.",
    },
    contatti: {
      title: "Contatti e assistenza in Trentino",
      description:
        "Contatta Mifro per registratori di cassa, sistemi POS e assistenza tecnica in Trentino.",
    },
  },

  /* ── Footer ─────────────────────────────────────────── */
  footer: {
    description:
      "Soluzioni di cassa, software e assistenza IT per le imprese in Trentino. Al tuo fianco dal 1990.",
    quickLinks: [
      { label: "Per la tua attività", href: "/#settori" },
      { label: "Prodotti e assistenza", href: "/prodotti-assistenza" },
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Guida RT–POS", href: "/news/guida-ade-collegamento-rt-pos" },
      { label: "Contatti", href: "/contatti" },
    ],
    piva: "P.IVA 01301350227",
    credits: "Mifro S.a.s. – Tutti i diritti riservati.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
