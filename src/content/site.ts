import { sectors, sectorHref } from "./sectors";

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
    whatsapp: "+393298632684",
    facebook: "https://www.facebook.com/mifrosas",
    googleMapsQuery:
      "Mifro+S.a.s.+Via+Giuseppe+Verdi+13+Pergine+Valsugana+TN",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.5!2d11.2386!3d46.0654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47781e5b0a0a0a0b%3A0x0!2sVia%20Giuseppe%20Verdi%2C%2013%2C%2038057%20Pergine%20Valsugana%20TN!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit",
  },

  /* ── Orari ──────────────────────────────────────────── */
  hours: [
    { days: "Lunedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Martedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Mercoledì", time: "08:00 – 12:00" },
    { days: "Giovedì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Venerdì", time: "08:00 – 12:00 / 14:30 – 18:30" },
    { days: "Sabato", time: "Chiuso" },
    { days: "Domenica", time: "Chiuso" },
  ],
  hoursShort: "Lun–Ven 08:00–12:00 / 14:30–18:30 (Mer solo mattina)",

  /* ── Navigazione ────────────────────────────────────── */
  nav: [
    { label: "Per la tua attività", href: "/#settori" },
    { label: "Prodotti e assistenza", href: "/prodotti-assistenza" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" },
  ],

  /* ── Hero ────────────────────────────────────────────── */
  hero: {
    title: "Registratori di cassa e sistemi POS a Pergine Valsugana e Trento",
    subtitle:
      "Registratori di cassa telematici RT, POS, hardware e software per il punto vendita e l'ufficio.",
    tagline: "Al fianco delle imprese dal 1990",
    cta1: { label: "Contattaci", href: "/contatti" },
    cta2: { label: "Soluzioni per la tua attività", href: "/#settori" },
    image: "/images/hero.jpg",
  },

  /* ── Settori della home ─────────────────────────────── */
  sectors: sectors.map((sector) => ({
    title: sector.label,
    description: sector.summary,
    icon: sector.icon,
    href: sectorHref(sector.slug),
  })),

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
        details: "La cassa dà problemi, il PC è lento o la stampante non funziona? Ci occupiamo di assistenza su casse e software, diagnosi e riparazioni di PC e stampanti. Scrivici quale dispositivo utilizzi e cosa succede: ti ricontattiamo per capire come aiutarti.",
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
      { value: "Dal 1990", text: "A Pergine Valsugana" },
      { value: "Oltre 1.000 clienti", text: "Negozi, locali e imprese" },
      { value: "Assistenza diretta", text: "Sul posto e da remoto" },
    ],
    localPresence: {
      title: "I tuoi tecnici, sul territorio.",
      image: "/images/vetrina-mifro.jpg",
      imageAlt: "La vetrina e l’ingresso della sede Mifro a Pergine Valsugana",
      intro:
        "Mifro è a Pergine Valsugana dal 1990. Affianchiamo negozi, bar, ristoranti e imprese del Trentino con registratori di cassa, sistemi POS e soluzioni informatiche per il punto vendita e l’ufficio.",
      support:
        "Ti seguiamo dalla scelta dei prodotti all’installazione e alla configurazione, con un rapporto diretto con i nostri tecnici. Quando serve assistenza, interveniamo sul posto o da remoto, anche su PC, stampanti e software.",
    },
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
      "Hai bisogno di informazioni o assistenza? Lasciaci un messaggio e ti ricontatteremo.",
    formTitle: "Scrivici, ti ricontattiamo noi.",
    replyNote: "Ti ricontatteremo all’indirizzo email indicato.",
    formFields: {
      name: "Nome e cognome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      submit: "Invia messaggio",
    },
  },

  /* ── News ───────────────────────────────────────────── */
  news: [
    {
      slug: "guida-ade-collegamento-rt-pos",
      title: "Guida operativa AdE per il collegamento logico RT - POS",
      date: "2026-02-27",
      description:
        "L'Agenzia delle Entrate ha pubblicato la guida operativa per il collegamento logico tra Registratore Telematico e POS: cos'è, chi è obbligato e le scadenze da rispettare.",
      content:
        "A partire dal 2026 è previsto l'obbligo del collegamento tra gli strumenti mediante i quali il negoziante memorizza i corrispettivi (Registratore Telematico o procedura web \"Documento Commerciale on line\") e gli strumenti mediante i quali accetta il pagamento elettronico (POS fisici e virtuali).\n\nIl collegamento non è fisico (cavi o simili), ma di tipo logico: consiste in una comunicazione all'Agenzia delle Entrate attraverso un'apposita funzionalità sul portale web \"Fatture e Corrispettivi\".\n\nLa nuova funzionalità espone l'elenco dei POS di cui l'esercente risulta titolare, sulla base delle informazioni trasmesse dagli operatori finanziari. L'esercente deve quindi associare ciascun POS al proprio RT, indicando anche l'indirizzo dell'unità locale.\n\nLa prima comunicazione dei collegamenti dovrà essere effettuata a partire dai primi giorni di marzo 2026, relativamente ai POS attivi nel mese di gennaio 2026. Gli esercenti avranno 45 giorni di tempo dalla messa a disposizione della procedura.\n\nPer i POS attivati nei mesi successivi a gennaio 2026, il collegamento dovrà essere registrato tra il sesto e l'ultimo giorno del secondo mese successivo a quello di attivazione del POS.\n\nScarica la guida completa dell'Agenzia delle Entrate per tutti i dettagli, gli esempi pratici e le istruzioni operative.",
      type: "pdf" as "pdf" | "link" | "news",
      file: "/docs/guida-ade-collegamento-rt-pos.pdf",
      faq: [
        {
          question: "In cosa consiste il collegamento RT - POS?",
          answer:
            "Non si tratta di un collegamento fisico tramite cavi, ma di un collegamento logico: una comunicazione una tantum all'Agenzia delle Entrate tramite il portale \"Fatture e Corrispettivi\", in cui si associa ciascun POS (fisico o virtuale) al proprio Registratore Telematico.",
        },
        {
          question: "Chi è obbligato al collegamento?",
          answer:
            "Tutti gli esercenti che utilizzano un Registratore Telematico (RT) o la procedura web \"Documento Commerciale on line\" e accettano pagamenti elettronici tramite POS. Sono esclusi i distributori automatici (vending machine), le cessioni di carburante e le operazioni di ricarica veicoli elettrici.",
        },
        {
          question: "Entro quando va effettuato il collegamento?",
          answer:
            "La prima comunicazione va effettuata a partire dai primi giorni di marzo 2026, relativamente ai POS attivi a gennaio 2026, entro 45 giorni dalla messa a disposizione della procedura. Per i POS attivati successivamente, il collegamento va registrato tra il 6° e l'ultimo giorno del secondo mese successivo all'attivazione.",
        },
        {
          question: "Dove si effettua il collegamento?",
          answer:
            "Tramite la funzionalità \"Gestione collegamenti\" nel portale \"Fatture e Corrispettivi\" dell'Agenzia delle Entrate, oppure tramite la procedura web \"Documento Commerciale on line\" per chi la utilizza.",
        },
        {
          question: "Cosa succede se ho più POS o più RT?",
          answer:
            "Il collegamento può essere multiplo: un singolo POS può essere collegato a più RT e, viceversa, più POS possono essere collegati a un singolo RT. Per ogni collegamento va indicato anche l'indirizzo dell'unità locale.",
        },
        {
          question: "Mifro può aiutarmi con il collegamento RT - POS?",
          answer:
            "Certamente. Il nostro team tecnico può assisterti nella configurazione del collegamento logico tra RT e POS, verificando i dati necessari e guidandoti nell'utilizzo del portale \"Fatture e Corrispettivi\". Contattaci per maggiori informazioni.",
        },
      ],
    },
  ],

  /* ── SEO ────────────────────────────────────────────── */
  seo: {
    home: {
      title:
        "Registratori di cassa a Pergine e Trento | Mifro",
      description:
        "Registratori di cassa telematici RT, sistemi POS, installazione e assistenza per negozi, bar e ristoranti a Pergine Valsugana, Trento e in Trentino. Mifro, dal 1990.",
    },
    prodottiAssistenza: {
      title: "Prodotti e assistenza tecnica a Trento",
      description: "POS e pagamenti, PC e stampanti per l’ufficio, assistenza su casse e software e riparazioni. Contatta i tecnici Mifro a Pergine Valsugana.",
    },
    chiSiamo: {
      title: "Chi siamo a Pergine Valsugana",
      description:
        "Dal 1990 Mifro affianca le imprese trentine con soluzioni IT per il punto vendita e l'ufficio. Scopri la nostra storia, i valori e l'approccio.",
    },
    contatti: {
      title: "Contatti a Pergine Valsugana",
      description:
        "Contatta Mifro a Pergine Valsugana per registratori di cassa, sistemi POS e assistenza tecnica a Trento e in Trentino.",
    },
  },

  /* ── Footer ─────────────────────────────────────────── */
  footer: {
    description:
      "Soluzioni di cassa, software e assistenza IT per le imprese trentine. Dal 1990 a Pergine Valsugana.",
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
