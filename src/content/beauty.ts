// Funzioni già descritte nell'offerta Beauty di src/content/sectors.ts.
// Riscontri di prodotto: docs/revisione-pagine-settori.md, sezione aggiornamento del 21 ottobre.
// La schermata vendite esistente non mostra nomi o recapiti di clienti.
// Esclusa la schermata listini, che contiene un nome account.
export const beautyContent = {
  seo: {
    title: "Pagina web e agenda online per parrucchieri e saloni",
    description: "Pagina web del salone con prenotazioni online, scelta dell’operatore e agenda per il team. Configurazione, formazione e assistenza Mifro in Trentino.",
  },
  hero: {
    eyebrow: "Mifro · Parrucchieri e saloni",
    title: "Pagina web e agenda online per il tuo salone",
    subtitle: "I clienti prenotano scegliendo operatore e orario. Tu gestisci gli appuntamenti del team, con formazione e assistenza Mifro anche di persona nelle zone servite.",
    cta: "Richiedi una proposta per il tuo salone",
  },
  booking: {
    eyebrow: "Per i tuoi clienti",
    title: "Dal tuo salone all’appuntamento online",
    steps: [
      { title: "Aprono la pagina del salone", text: "Il cliente accede alla pagina dedicata alle prenotazioni della tua attività." },
      { title: "Scelgono operatore e orario", text: "La prenotazione segue le disponibilità che hai impostato per il team." },
      { title: "La prenotazione entra in agenda", text: "L’appuntamento viene inserito automaticamente nell’agenda del salone." },
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
    title: "Ti aiutiamo a partire. E restiamo raggiungibili.",
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
    title: "Se ti servono anche cassa e POS",
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
    intro: "Raccontaci come lavori e cosa ti serve: pagina web, prenotazioni, agenda o gestionale. Ti ricontattiamo per approfondire.",
    subject: "Beauty: pagina web, prenotazioni e agenda per il salone",
    messagePlaceholder: "In quale comune si trova il salone? Quanti operatori lavorano con te? Raccontaci cosa ti serve e quali strumenti usi già.",
    submitLabel: "Invia la richiesta",
  },
};
