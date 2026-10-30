import type { Solution } from "@/content/sectors";

// Modelli e immagini già presenti nel catalogo del sito. Le caratteristiche
// riprendono src/content/sectors.ts e docs/revisione-pagine-settori.md.
// Prezzi, disponibilità, dotazioni e servizi si definiscono nella proposta.
const salesProducts: Solution[] = [
  {
    name: "WALLE MEC RT",
    features: [
      "Tastiera fisica per le operazioni al banco",
      "Stampante integrata per gli scontrini",
      "Gestione di reparti e articoli a prezzo memorizzato",
    ],
  },
  {
    name: "WALLE 8T",
    features: [
      "Cassa touch compatta per il banco",
      "Stampante integrata per gli scontrini",
      "Prodotti e servizi organizzati per reparto",
    ],
  },
  {
    name: "APE J RT",
    features: [
      "Registratore portatile per chi lavora in mobilità",
      "Display touch e stampante integrata",
      "Collegamento tramite Wi-Fi o rete mobile",
    ],
  },
];

export const salesContent = {
  seo: {
    title: "Vendita registratori di cassa in Trentino",
    description: "Acquista o sostituisci il registratore di cassa con Mifro a Pergine Valsugana. Scelta, installazione, formazione e assistenza: richiedi un preventivo.",
  },
  hero: {
    eyebrow: "Vendita registratori di cassa · Mifro",
    title: "Registratori di cassa per la tua attività",
    subtitle: "Ti aiutiamo a scegliere il registratore adatto al tuo lavoro, con installazione, formazione e assistenza anche dopo l’avvio.",
    cta: "Richiedi un preventivo",
    imageCaption: "RCH WALLE MEC RT, uno dei modelli proposti da Mifro. Scegliamo la configurazione in base alla tua attività.",
  },
  needs: {
    eyebrow: "Prima cassa o sostituzione",
    title: "Partiamo da quello che ti serve oggi",
    items: [
      {
        title: "Stai aprendo un’attività?",
        text: "Raccontaci cosa vendi, come lavori e quanto spazio hai al banco. Ti aiutiamo a scegliere il registratore e gli eventuali accessori per iniziare.",
      },
      {
        title: "Vuoi sostituire la tua cassa?",
        text: "Indicaci il modello che usi e cosa vorresti cambiare. Valutiamo la nuova soluzione e la compatibilità con gli strumenti già presenti, concordando il passaggio.",
      },
    ],
  },
  products: {
    eyebrow: "Alcuni modelli del nostro catalogo",
    title: "Casse per il banco e per chi lavora in mobilità",
    items: salesProducts,
  },
  support: {
    eyebrow: "Dalla scelta al lavoro di ogni giorno",
    title: "Una cassa adatta al tuo lavoro, con il supporto di Mifro",
    intro: "Per un negozio, un salone, un locale o un banco al mercato le esigenze cambiano. Valutiamo spazi, prodotti e servizi, pagamenti e strumenti che utilizzi già.",
    items: [
      {
        title: "Installazione e configurazione",
        text: "Prepariamo il registratore per la tua attività e definiamo le impostazioni e gli eventuali collegamenti con dispositivi compatibili.",
      },
      {
        title: "Formazione pratica",
        text: "Ti accompagniamo nell’uso della cassa e delle funzioni che servono a te e a chi lavora con te, con affiancamento anche di persona nelle zone servite.",
      },
      {
        title: "Assistenza dopo l’avvio",
        text: "Restiamo raggiungibili per dubbi e problemi tecnici. Valutiamo il supporto da remoto o sul posto nelle zone servite, secondo gli accordi di assistenza.",
      },
    ],
  },
  steps: {
    title: "Come ti seguiamo",
    items: [
      {
        title: "Ti richiamiamo",
        text: "Compila il modulo: ti richiamiamo subito per capire cosa serve alla tua attività, dalla prima cassa alla sostituzione.",
      },
      {
        title: "Scegli con una proposta chiara",
        text: "Se vuoi, puoi vedere e provare le soluzioni a Pergine Valsugana. Poi ricevi un preventivo con prodotti e servizi specificati.",
      },
      {
        title: "Parti con il nostro supporto",
        text: "Concordiamo installazione e formazione pratica. Anche dopo l’avvio puoi rivolgerti a Mifro per l’assistenza.",
      },
    ],
  },
  people: {
    eyebrow: "Persone e presenza sul territorio",
    title: "Un riferimento a Pergine Valsugana, anche dopo l’acquisto",
    intro: "Mifro affianca le attività in Trentino dal 1990. Parli con persone che conoscono i sistemi di cassa e ti seguono nella scelta e nell’utilizzo.",
    support: "Puoi contattarci anche dopo l’avvio. Ci trovi nella sede di Pergine Valsugana; per gli interventi presso la tua attività verifichiamo la zona e concordiamo le modalità del servizio.",
    link: "Conosci le persone di Mifro",
  },
  faq: [
    {
      question: "Posso chiedere un preventivo se non so quale cassa scegliere?",
      answer: "Sì. Indicaci il tipo di attività, il comune e come lavori al banco o in mobilità. Ti aiutiamo a individuare il modello e la configurazione adatti.",
    },
    {
      question: "Mi aiutate a sostituire il registratore che uso già?",
      answer: "Sì. Partiamo dal modello e dagli strumenti già presenti, valutiamo cosa puoi continuare a utilizzare e definiamo le attività necessarie al passaggio. La compatibilità viene verificata prima della proposta.",
    },
    {
      question: "Quanto costa acquistare un registratore di cassa?",
      answer: "Il prezzo dipende dal modello, dalla configurazione e dai servizi richiesti. Prepariamo un preventivo di acquisto che distingue prodotti, accessori, eventuali software e servizi.",
    },
    {
      question: "Installazione e formazione sono comprese nell’acquisto?",
      answer: "Mifro offre installazione, configurazione e formazione pratica. Attività, modalità e costi vengono concordati e indicati nella proposta, senza considerarli automaticamente inclusi nel prezzo della cassa.",
    },
    {
      question: "Posso contare su Mifro anche dopo l’avvio?",
      answer: "Sì. Puoi rivolgerti a Mifro per dubbi e assistenza tecnica, anche di persona nelle zone servite. Modalità e costi del supporto dipendono dagli accordi di servizio; gli interventi si concordano in base al problema.",
    },
    {
      question: "La mia attività è in una zona servita?",
      answer: "Mifro ha sede a Pergine Valsugana e opera in Trentino. Indicaci il comune nel messaggio: verifichiamo la possibilità di seguirti anche presso la tua attività.",
    },
  ],
  form: {
    eyebrow: "La tua proposta di acquisto",
    titlePanel: "Richiedi un preventivo",
    intro: "Prima cassa o sostituzione? Raccontaci cosa ti serve e dove si trova la tua attività.",
    messagePlaceholder: "Es. Ho un negozio a… Cerco la mia prima cassa / vorrei sostituire il modello… Ho bisogno di…",
    submitLabel: "Richiedi un preventivo",
  },
} as const;
