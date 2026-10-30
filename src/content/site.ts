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
    whatsapp: "+393516888890",
    whatsappDisplay: "+39 351 688 8890",
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
      "Ti affianchiamo nella scelta delle soluzioni più adatte per il punto cassa e l’ufficio, con installazione e assistenza tecnica personalizzata.",
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
    image: sector.image,
    imageAlt: sector.imageAlt,
    href: sectorHref(sector.slug),
  })),

  /* ── I nostri marchi ────────────────────────────────── */
  brands: [
    { name: "RCH", description: "Soluzioni per il punto cassa", logo: "/images/brands/rch.svg" },
    { name: "Epson", description: "Stampanti telematiche", logo: "/images/brands/epson.svg" },
    { name: "Cashmatic", description: "Cassetti automatici", logo: "/images/brands/cashmatic.svg" },
    { name: "Canon", description: "Stampanti multifunzione", logo: "/images/brands/canon.svg" },
  ],

  /* ── Certificazioni ─────────────────────────────────── */
  certifications: {
    title: "Qualità e certificazioni",
    text: "Come laboratorio abilitato, Mifro è certificata ISO 9001 / UNI EN ISO 9001:2008 per le verificazioni periodiche dei misuratori fiscali multimarca.",
    badge: "ISO 9001",
  },

  /* ── CTA finale ─────────────────────────────────────── */
  ctaFinal: {
    title: "Parliamo della tua attività",
    description:
      "Raccontaci di cosa hai bisogno. Ti ricontattiamo subito per parlarne insieme.",
    cta: { label: "Contattaci", href: "/contatti" },
  },

  support: {
    territory: "Assistenza in Trentino, con sede a Pergine Valsugana.",
    methods: "Interventi sul posto e da remoto, in base al problema e alla configurazione.",
    requestNote: "Indicaci il modello, cosa succede e il comune in cui lavori. I nostri tecnici ti ricontattano per capire quale intervento serve.",
    hoursNote: "Puoi contattare la sede negli orari indicati. Modalità e copertura dell’assistenza dipendono dagli accordi di servizio.",
  },
  privacyRevisedAt: "2026-10-30",

  contactPanel: {
    steps: [
      "Lasci i tuoi contatti e ci racconti cosa ti serve",
      "Ti richiamiamo subito per capire le tue esigenze",
      "Troviamo insieme la soluzione per la tua attività",
    ],
  },

  /* ── Percorso delle richieste dai settori ───────────── */
  contactJourney: {
    title: "Dalla prima richiesta, sempre al tuo fianco",
    description: "Lascia i tuoi recapiti nel modulo e raccontaci la tua attività. Ti accompagniamo nella scelta e nell’utilizzo della soluzione.",
    cta: "Richiedi un ricontatto",
    steps: [
      {
        title: "Lasciaci i tuoi recapiti",
        description: "Compila il modulo e raccontaci come lavori oggi e cosa vorresti migliorare nella tua attività.",
      },
      {
        title: "Ti richiamiamo",
        description: "Ascoltiamo le tue esigenze per capire come lavori e quale soluzione può aiutarti.",
        badge: "Ti richiamiamo subito.",
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
        description: "Se hai dubbi o bisogno di supporto, puoi contare sulla nostra assistenza. Il rapporto con Mifro continua anche dopo l’avvio.",
      },
    ],
  },

  /* ── Prodotti e assistenza ──────────────────────────── */
  productsAndSupport: {
    intro: "Pagamenti, strumenti per l’ufficio, NAS e sistemi di backup, con assistenza tecnica e un unico riferimento sul territorio.",
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
        title: "Attrezzature per l’ufficio",
        description: "PC, stampanti, dispositivi multifunzione, antivirus Bitdefender e materiali di consumo.",
        details: "PC per il lavoro di ogni giorno, stampanti, dispositivi multifunzione e antivirus Bitdefender: ti aiutiamo a scegliere in base a quello che devi fare e a quanto stampi. Forniamo anche materiali di consumo, così puoi rivolgerti a noi sia per l’attrezzatura sia per le necessità quotidiane dell’ufficio.",
        icon: "Printer" as const,
        image: "/images/stampanti.jpg",
        imageAlt: "Postazione da ufficio con computer e stampante",
        imageFit: "cover" as const,
      },
      {
        id: "nas-backup",
        title: "NAS e sistemi di backup",
        description: "Archiviazione condivisa e copie di sicurezza per i dati della tua attività.",
        details: "Ti aiutiamo a scegliere e configurare un NAS per raccogliere i file dell’ufficio e condividerli tra le postazioni di lavoro. Al NAS affianchiamo sistemi di backup per conservare copie di sicurezza dei dati e poterli ripristinare in caso di guasti o cancellazioni accidentali. Definiamo la soluzione in base alla quantità di dati, agli accessi e alle esigenze della tua attività.",
        icon: "HardDrive" as const,
        image: "/images/nas-backup.svg",
        imageAlt: "Illustrazione di un NAS con due dischi e un simbolo di backup",
        imageFit: "contain" as const,
      },
      {
        id: "riparazioni",
        title: "Assistenza e riparazioni",
        description: "Supporto su casse e software, diagnosi e riparazioni di PC e stampanti.",
        details: "La cassa dà problemi o il gestionale si blocca? Ci occupiamo di assistenza su registratori di cassa e gestionali, oltre che della diagnosi e della riparazione di PC e stampanti.",
        icon: "Wrench" as const,
        image: "/images/assistenza-riparazioni-uomo.jpg",
        imageAlt: "Mani di un tecnico durante la sostituzione di un SSD in un computer portatile",
        imageFit: "cover" as const,
      },
    ],
    sectorsIntro: {
      title: "Hai un’attività?",
      description: "Organizza il lavoro e gestisci incassi e pagamenti con il supporto di tecnici esperti. Scegli il tuo settore e scopri le soluzioni per la tua attività.",
    },
  },

  /* ── Chi siamo ──────────────────────────────────────── */
  about: {
    highlights: [
      { value: "Dal 1990", text: "In Trentino" },
      { value: "Oltre 1.000 clienti", text: "Negozi, imprese commerciali e artigiane" },
      { value: "Assistenza diretta", text: "Sul posto e da remoto" },
    ],
    localPresence: {
      title: "Casse e POS, con tecnici al tuo fianco",
      image: "/images/vetrina-mifro.jpg",
      imageAlt: "La vetrina e l’ingresso della sede Mifro",
      intro:
        "Scontrini, pagamenti e adempimenti richiedono competenza. Dal 1990 ti aiutiamo a scegliere e utilizzare gli strumenti giusti, con tecnici specializzati al tuo fianco anche dopo l’installazione.",
      support:
        "Per strumenti fiscali, gestionali e POS hai un riferimento diretto a Pergine Valsugana. Ti aiutiamo a risolvere i dubbi e interveniamo sul posto o da remoto.",
    },
    intro:
      "Dal 1990 affianchiamo le imprese trentine nella scelta, nell’installazione e nella gestione delle tecnologie per il punto vendita e l’ufficio.",
    story:
      "Mifro nasce nel 1990 in Trentino con l’obiettivo di offrire soluzioni informatiche affidabili alle attività commerciali del territorio. In oltre trent’anni di attività, abbiamo accompagnato centinaia di aziende nella transizione tecnologica, mantenendo un approccio diretto e personale che ci distingue ancora oggi.",
    approach:
      "Il nostro metodo parte dall’ascolto: comprendiamo le esigenze specifiche di ogni cliente per proporre soluzioni concrete, senza complicazioni inutili. Dalla consulenza alla fornitura, dall’installazione all’assistenza continuativa, siamo il riferimento unico per tutta la filiera tecnologica del punto vendita.",
    team: [
      {
        name: "Claudio",
        role: "Titolare",
        bio: "Fondatore di Mifro, guida l’azienda con oltre trent’anni di esperienza nel settore delle tecnologie per il punto vendita.",
      },
      {
        name: "Fabio",
        role: "Tecnico – Sistemi di cassa",
        bio: "Specializzato nei registratori telematici e nei sistemi per il punto vendita. Si occupa di installazione, configurazione e assistenza tecnica sul posto e da remoto.",
      },
      {
        name: "Alessandro",
        role: "Tecnico – Software gestionale",
        bio: "Esperto di software gestionali per la ristorazione e il commercio al dettaglio. Conosce a fondo anche i sistemi di cassa e segue i clienti nell’utilizzo dell’intera soluzione.",
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
          "Ogni proposta è studiata sulle reali esigenze dell’attività del cliente.",
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
      "Hai bisogno di informazioni o assistenza? Lasciaci un messaggio e ti ricontattiamo subito.",
    formTitle: "Scrivici: ti ricontattiamo subito",
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
      description: "POS, PC e stampanti per l’ufficio, NAS e sistemi di backup, assistenza su casse e software e riparazioni. Contatta i tecnici Mifro in Trentino.",
    },
    chiSiamo: {
      title: "Chi siamo: al fianco delle imprese in Trentino",
      description:
        "Dal 1990 Mifro affianca le imprese trentine con soluzioni IT per il punto vendita e l’ufficio. Scopri la nostra storia, i valori e l’approccio.",
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
    piva: "P. IVA 01301350227",
    credits: "Mifro S.a.s. – Tutti i diritti riservati.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
