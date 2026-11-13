// Funzioni già descritte nell'offerta Beauty di src/content/sectors.ts.
// Riscontri di prodotto: docs/revisione-pagine-settori.md, sezione aggiornamento del 21 ottobre.
// La schermata vendite esistente non mostra nomi o recapiti di clienti.
// Esclusa la schermata listini, che contiene un nome account.
export const beautyContent = {
  seo: {
    title: "Cassa e gestionale per parrucchieri e saloni",
    description: "Cassa, gestionale RCH Beauty e moduli per agenda e prenotazioni del salone. Configurazione, compatibilità, formazione e assistenza da definire con Mifro.",
  },
  hero: {
    whatsappMessage: "Buongiorno Mifro, vi contatto dalla pagina cassa e gestionale per saloni. Vorrei informazioni per il mio salone.",
    eyebrow: "Mifro · Parrucchieri e saloni",
    title: "Cassa e gestionale per il tuo salone",
    subtitle: "Mifro, a Pergine Valsugana, ti aiuta a scegliere cassa e gestionale per il tuo salone. Definiamo i moduli per agenda e prenotazioni online e verifichiamo i collegamenti compatibili nella proposta.",
    cta: "Richiedi una proposta per il tuo salone",
  },
  booking: {
    eyebrow: "Per i tuoi clienti",
    title: "Dal tuo salone all’appuntamento online",
    example: {
      customer: "Giulia",
      stylist: "Francesca",
      service: "Taglio e piega",
      day: "Martedì",
      time: "09:30",
      caption: "Esempio illustrativo con nomi di fantasia.",
    },
    steps: [
      { title: "Giulia apre la pagina del salone", text: "Vuole prenotare un taglio con piega e accede alla pagina degli appuntamenti." },
      { title: "Sceglie Francesca e un orario", text: "Tra le disponibilità della sua parrucchiera trova martedì alle 9:30." },
      { title: "Il salone ritrova la prenotazione", text: "L’appuntamento di Giulia entra automaticamente nell’agenda di Francesca." },
    ],
  },
  team: {
    eyebrow: "Per chi lavora in salone",
    title: "Un’agenda per organizzare il lavoro del team",
    intro: "Segui gli appuntamenti del salone e le disponibilità di ciascun operatore nello stesso strumento.",
    features: [
      "Gestisci gli appuntamenti nell’agenda del salone.",
      "Configuri più operatori e le disponibilità di ciascuno.",
      "Ritrovi in agenda le prenotazioni arrivate dalla pagina web.",
    ],
  },
  software: {
    title: "Il gestionale, oltre gli appuntamenti",
    intro: "Con il gestionale RCH Beauty puoi seguire anche servizi, prodotti e incassi. Definiamo insieme i moduli adatti al tuo lavoro e li specifichiamo nella proposta.",
    features: [
      "Listini per servizi e prodotti.",
      "Gestione dei prodotti e controllo delle scorte.",
      "Incassi e report consultabili anche da app.",
    ],
    gallery: [
      {
        src: "/images/products/beauty-gestionale-vendite.webp",
        alt: "Schermata dimostrativa del gestionale RCH Beauty con servizi e prodotti del salone",
        width: 1920,
        height: 1080,
      },
    ],
  },
  support: {
    eyebrow: "Il supporto di Mifro",
    title: "Ti aiutiamo a partire e restiamo raggiungibili",
    intro: "Da Pergine Valsugana affianchiamo le attività del territorio, con persone a cui rivolgerti anche dopo l’avvio.",
    items: [
      { title: "Configurazione per il tuo salone", text: "Partiamo da come lavori, dal numero di operatori e dagli strumenti che usi già per definire e configurare la soluzione." },
      { title: "Formazione pratica", text: "Ti accompagniamo nell’uso dell’agenda e delle funzioni scelte, così tu e il team potete prendere confidenza con il gestionale." },
      { title: "Assistenza dopo l’avvio", text: "Hai un riferimento per dubbi e problemi tecnici, con supporto da remoto e anche di persona nelle zone servite." },
    ],
    peopleTitle: "Persone vicine al tuo salone",
    peopleText: "Nella sede di Pergine Valsugana trovi un riferimento per il gestionale e l’organizzazione del tuo salone. Ti seguiamo anche dopo l’avvio, con formazione e assistenza anche di persona nelle zone servite, secondo le modalità concordate nella proposta.",
  },
  integrations: {
    title: "Cassa e POS per il tuo salone",
    intro: "Valutiamo gli strumenti per gli incassi e i pagamenti insieme al gestionale. Verifichiamo i dispositivi che possiedi già, i collegamenti compatibili e gli eventuali servizi da attivare.",
    posFeatures: [
      "Pagamenti con carta e contactless",
      "Compatibilità con la cassa da verificare",
      "Configurazione e assistenza definite nella proposta",
    ],
  },
  faq: [
    {
      question: "Come funziona la pagina web del mio salone?",
      answer: "È una pagina dedicata alla tua attività, collegata al gestionale e raggiungibile anche dal tuo sito. Il cliente sceglie l’operatore e un orario disponibile; la prenotazione viene inserita automaticamente nell’agenda del salone.",
    },
    {
      question: "Posso gestire più operatori?",
      answer: "Sì. Puoi configurare più operatori e gestire le disponibilità di ciascuno. Nella proposta definiamo la configurazione per il tuo team.",
    },
    {
      question: "Pagina web, agenda e moduli sono sempre inclusi?",
      answer: "Prenotazioni e gestione degli operatori richiedono moduli specifici. La proposta indica le funzioni scelte, le licenze, gli eventuali canoni e le attività di configurazione, formazione e assistenza.",
    },
    {
      question: "Posso utilizzare i dispositivi o il gestionale che ho già?",
      answer: "Il software può essere installato sui dispositivi compatibili, senza dover acquistare nuovo hardware. Indicaci i modelli e il nome dell’eventuale gestionale: Mifro verifica la compatibilità prima di proporti installazioni o collegamenti.",
    },
    {
      question: "Chi mi aiuta dopo l’avvio?",
      answer: "Puoi rivolgerti a Mifro per dubbi e problemi tecnici. Offriamo formazione pratica e assistenza anche di persona nelle zone servite. Indicaci il comune del salone per verificare la copertura; modalità e costi vengono concordati nella proposta.",
    },
  ],
  form: {
    eyebrow: "Parliamo del tuo salone",
    title: "Richiedi una proposta per il tuo salone",
    intro: "Raccontaci come lavori e cosa ti serve: cassa, gestionale, agenda o prenotazioni. Ti ricontattiamo subito per approfondire.",
    subject: "Beauty: cassa, gestionale e agenda per il salone",
    messagePlaceholder: "In quale comune si trova il salone? Quanti operatori lavorano con te? Raccontaci cosa ti serve e quali strumenti usi già.",
    submitLabel: "Richiedi una proposta per il tuo salone",
  },
};
