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
    { label: "Home", href: "/" },
    { label: "Soluzioni", href: "/soluzioni" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" },
  ],

  /* ── Hero ────────────────────────────────────────────── */
  hero: {
    title: "Soluzioni di cassa e IT per il tuo punto vendita in Trentino",
    subtitle:
      "Registratori di cassa telematici RT, software per ristorazione, assistenza tecnica e riparazioni. Da Pergine Valsugana, al fianco delle imprese dal 1990.",
    cta1: { label: "Contattaci", href: "/contatti" },
    cta2: { label: "Scopri le soluzioni", href: "/soluzioni" },
    image: "/images/hero.jpg", // sostituire con immagine reale
  },

  /* ── Cosa facciamo (Home) ───────────────────────────── */
  services: [
    {
      title: "Registratori di cassa RT",
      description:
        "Installazione, configurazione e assistenza per sistemi di cassa omologati.",
      icon: "Monitor" as const,
      image: "/images/registratore_cassa.jpg",
      href: "/soluzioni#registratori-di-cassa",
    },
    {
      title: "Software ristorazione",
      description:
        "Gestione comande, sala e cucina, report e controllo del punto vendita.",
      icon: "UtensilsCrossed" as const,
      image: "/images/ristorazione.png",
      href: "/soluzioni#ristorazione",
    },
    {
      title: "Assistenza tecnica",
      description:
        "Interventi puntuali on-site e da remoto, con contratti su misura.",
      icon: "Wrench" as const,
      image: "/images/assistenza.png",
      href: "/soluzioni#riparazioni",
    },
    {
      title: "Riparazioni PC & stampanti",
      description:
        "Diagnosi e riparazione di PC, stampanti e multifunzioni.",
      icon: "Cpu" as const,
      image: "/images/stampanti.jpg",
      href: "/soluzioni#riparazioni",
    },
  ],

  /* ── Soluzioni per settori (Home) ───────────────────── */
  sectors: [
    {
      title: "Ristorazione",
      description:
        "Sistemi di cassa, gestione comande e software per bar, ristoranti e pizzerie.",
      icon: "ChefHat" as const,
      href: "/soluzioni#ristorazione",
    },
    {
      title: "Retail e negozi",
      description:
        "Registratori telematici RT, bilance elettroniche e soluzioni di pagamento.",
      icon: "Store" as const,
      href: "/soluzioni#registratori-di-cassa",
    },
    {
      title: "Ufficio",
      description:
        "PC, stampanti multifunzione, scanner documentali, reti e infrastruttura IT.",
      icon: "Building2" as const,
      href: "/soluzioni#hardware-ufficio",
    },
  ],

  /* ── Partner RCH ────────────────────────────────────── */
  partner: {
    name: "RCH",
    url: "https://www.rch.it/",
    logo: "/images/rch_logo.svg",
    description:
      "Rivenditore e consulente per soluzioni RCH per il punto cassa: registratori, POS, hardware e software per la gestione del punto vendita.",
  },

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
      "Raccontaci la tua attività: ti proponiamo la soluzione giusta.",
    cta: { label: "Contattaci", href: "/contatti" },
  },

  /* ── Soluzioni (pagina /soluzioni) ──────────────────── */
  solutions: {
    intro:
      "Offriamo soluzioni complete per il punto vendita e l'ufficio: dalla consulenza alla fornitura, dall'installazione all'assistenza continua.",
    blocks: [
      {
        id: "registratori-di-cassa",
        title: "Registratori di cassa telematici RT",
        description:
          "Forniamo e installiamo registratori di cassa telematici e misuratori fiscali omologati RT. Ti accompagniamo nella scelta del modello più adatto, nella configurazione e nell'avvio, con assistenza tecnica continuativa e verificazioni periodiche certificate ISO 9001.",
        icon: "Monitor" as const,
        image: "/images/registratore_cassa.jpg",
        features: [
          "Misuratori fiscali omologati RT",
          "Consulenza per la scelta del modello",
          "Installazione e configurazione",
          "Assistenza e verificazioni periodiche",
        ],
      },
      {
        id: "ristorazione",
        title: "Soluzioni per la ristorazione",
        description:
          "Sistemi e software pensati per bar, ristoranti e pizzerie. Dalla gestione delle comande al collegamento sala-cucina, dalla reportistica al controllo del punto vendita: soluzioni modulari che si adattano alla tua attività.",
        icon: "UtensilsCrossed" as const,
        image: "/images/ristorazione.png",
        features: [
          "Gestione comande digitali",
          "Collegamento sala e cucina",
          "Reportistica e analisi vendite",
          "Soluzioni modulari e scalabili",
        ],
      },
      {
        id: "pagamenti",
        title: "Soluzioni di pagamento",
        description:
          "Integriamo soluzioni di pagamento elettronico nel tuo punto cassa: POS, terminali contactless e sistemi integrati per una gestione fluida e sicura delle transazioni.",
        icon: "CreditCard" as const,
        image: "/images/pagamento.jpg",
        features: [
          "POS e terminali di pagamento",
          "Pagamenti contactless",
          "Integrazione con sistemi di cassa",
          "Assistenza e configurazione",
        ],
      },
      {
        id: "hardware-ufficio",
        title: "Hardware e forniture per ufficio",
        description:
          "PC, notebook, tablet, stampanti multifunzione A4 e A3, scanner documentali e materiali di consumo dei principali marchi. Consulenza prevendita per individuare l'hardware giusto per il tuo ambiente di lavoro, con assistenza post-vendita dedicata.",
        icon: "Printer" as const,
        image: "/images/stampanti.jpg",
        features: [
          "PC, notebook e tablet",
          "Stampanti e multifunzioni A4/A3",
          "Scanner documentali",
          "Materiali di consumo",
        ],
      },
      {
        id: "riparazioni",
        title: "Riparazioni PC e stampanti",
        description:
          "Il nostro laboratorio tecnico esegue diagnosi, manutenzione e riparazioni su PC, stampanti e multifunzioni. Interveniamo in sede o presso il tuo ufficio, con tempestività e competenza.",
        icon: "Wrench" as const,
        image: "/images/assistenza.png",
        features: [
          "Diagnosi hardware e software",
          "Riparazioni PC e notebook",
          "Manutenzione stampanti e multifunzioni",
          "Interventi on-site e on-center",
        ],
      },
    ],
    faq: [
      {
        question: "Fate assistenza da remoto?",
        answer:
          "Sì, offriamo assistenza tecnica da remoto per interventi rapidi su software, configurazioni e problematiche risolvibili senza presenza fisica. Per problemi hardware o interventi più complessi, operiamo on-site.",
      },
      {
        question: "Operate in tutto il Trentino?",
        answer:
          "Sì, la nostra sede è a Pergine Valsugana ma operiamo in tutto il Trentino con interventi on-site e assistenza da remoto.",
      },
      {
        question: "Quanto tempo serve per installare un registratore telematico RT?",
        answer:
          "L'installazione e la configurazione di un registratore telematico RT richiedono generalmente una mezza giornata, inclusa la formazione base per l'utilizzo quotidiano.",
      },
      {
        question: "Gestite manutenzione e verificazioni periodiche?",
        answer:
          "Sì, siamo laboratorio abilitato e certificato ISO 9001 per le verificazioni periodiche dei misuratori fiscali multimarca. Pianifichiamo gli interventi per garantire la conformità normativa.",
      },
      {
        question: "Offrite supporto per ristoranti e pizzerie?",
        answer:
          "Certamente. Forniamo soluzioni complete per la ristorazione: sistemi di cassa, gestione comande digitali, collegamento sala-cucina e reportistica. Ogni soluzione viene personalizzata in base alle esigenze del locale.",
      },
      {
        question: "Quali marchi trattate per stampanti e consumabili?",
        answer:
          "Trattiamo i principali marchi di stampanti, multifunzioni e materiali di consumo. Contattateci per verificare la disponibilità del prodotto o del consumabile di cui avete bisogno.",
      },
    ],
  },

  /* ── Chi siamo ──────────────────────────────────────── */
  about: {
    intro:
      "Dal 1990 affianchiamo le imprese trentine nella scelta, installazione e gestione delle tecnologie per il punto vendita e l'ufficio.",
    story:
      "Mifro nasce nel 1990 a Pergine Valsugana con l'obiettivo di offrire soluzioni informatiche affidabili alle attività commerciali del territorio. In oltre trent'anni di attività, abbiamo accompagnato centinaia di aziende nella transizione tecnologica, mantenendo un approccio diretto e personale che ci distingue ancora oggi.",
    approach:
      "Il nostro metodo parte dall'ascolto: comprendiamo le esigenze specifiche di ogni cliente per proporre soluzioni concrete, senza complicazioni inutili. Dalla consulenza alla fornitura, dall'installazione all'assistenza continuativa, siamo il riferimento unico per tutta la filiera tecnologica del punto vendita.",
    team: [
      {
        name: "Claudio",
        role: "Titolare",
        bio: "Fondatore di Mifro, guida l'azienda con oltre trent'anni di esperienza nel settore delle tecnologie per il punto vendita.",
        image: "/images/team/claudio.svg",
      },
      {
        name: "Fabio",
        role: "Tecnico – Sistemi di cassa",
        bio: "Specializzato su registratori di cassa telematici RT e sistemi punto vendita. Gestisce installazioni, configurazioni e assistenza tecnica on-site e da remoto.",
        image: "/images/team/fabio.svg",
      },
      {
        name: "Alessandro",
        role: "Tecnico – Software gestionale",
        bio: "Esperto di software gestionali per la ristorazione e il retail. Conosce a fondo anche i sistemi di cassa e segue i clienti a 360° sull'intera soluzione.",
        image: "/images/team/alessandro.svg",
      },
    ],
    values: [
      {
        title: "Esperienza trentennale",
        description:
          "Oltre 30 anni al servizio delle imprese trentine, con competenza e continuità.",
      },
      {
        title: "Assistenza rapida",
        description:
          "Interventi tempestivi on-site e da remoto, per ridurre al minimo i tempi di fermo.",
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
      "Hai bisogno di informazioni o assistenza? Compila il modulo e ti risponderemo al più presto.",
    formFields: {
      name: "Nome e cognome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      submit: "Invia messaggio",
    },
  },

  /* ── SEO ────────────────────────────────────────────── */
  seo: {
    home: {
      title:
        "Mifro – Registratori di cassa RT, software e assistenza IT a Pergine Valsugana",
      description:
        "Mifro S.a.s. a Pergine Valsugana: registratori di cassa telematici RT, software per ristorazione, assistenza tecnica, riparazioni PC e stampanti. Dal 1990 in Trentino.",
    },
    soluzioni: {
      title: "Soluzioni per punto vendita e ufficio – Mifro",
      description:
        "Registratori di cassa RT, soluzioni per ristorazione, POS, hardware ufficio e riparazioni: scopri i servizi Mifro per le imprese trentine.",
    },
    chiSiamo: {
      title: "Chi siamo – Mifro S.a.s.",
      description:
        "Dal 1990 Mifro affianca le imprese trentine con soluzioni IT per il punto vendita e l'ufficio. Scopri la nostra storia, i valori e l'approccio.",
    },
    contatti: {
      title: "Contatti – Mifro S.a.s.",
      description:
        "Contatta Mifro a Pergine Valsugana: informazioni o assistenza tecnica per registratori di cassa, software e hardware.",
    },
  },

  /* ── Footer ─────────────────────────────────────────── */
  footer: {
    description:
      "Soluzioni di cassa, software e assistenza IT per le imprese trentine. Dal 1990 a Pergine Valsugana.",
    quickLinks: [
      { label: "Soluzioni", href: "/soluzioni" },
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Contatti", href: "/contatti" },
      { label: "Privacy Policy", href: "#" }, // TODO: aggiungere pagina privacy
    ],
    credits: "Mifro S.a.s. – Tutti i diritti riservati.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
