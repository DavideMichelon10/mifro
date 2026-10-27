import type { SectorSlug } from "@/lib/contact-context";
import type { IconName } from "@/components/Icons";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const paymentPosGallery: ProductImage[] = [
  { src: "/images/products/pos-rch-dx8000.webp", alt: "POS Android RCH Pay DX8000 su sfondo bianco", width: 600, height: 600 },
  { src: "/images/products/pos-rch-d35.webp", alt: "POS Display RCH Pay D35 su sfondo bianco", width: 600, height: 600 },
  { src: "/images/products/pos-rch-lane3000.webp", alt: "PIN Pad RCH Pay Lane 3000 su sfondo bianco", width: 600, height: 600 },
];

export const productImages = {
  "WALLE MEC RT": {
    src: "/images/products/walle-mec-rt-senza-bollino.webp",
    alt: "Registratore di cassa RCH WALLE MEC RT con tastiera fisica",
    width: 600,
    height: 600,
  },
  "PC POS Touch Screen": {
    src: "/images/products/pos-touch-screen-1.webp",
    alt: "Sistema POS touch screen RCH, vista frontale con schermo operatore",
    width: 800,
    height: 600,
  },
  "Registratore telematico APE3 con POS integrato": {
    src: "/images/products/registratore-telematico-1.webp",
    alt: "Registratore di cassa telematico RCH APE 3, vista laterale",
    width: 800,
    height: 600,
  },
  "WALLE 8T": {
    src: "/images/products/walle-8t-senza-bollino.webp",
    alt: "Registratore telematico RCH WALLE 8T con schermo touch e stampante integrata",
    width: 600,
    height: 600,
  },
  "PRINT! 3.0 RT Full Payments con tastiera": {
    src: "/images/products/print-3-full-payments-senza-bollino.webp",
    alt: "Stampante fiscale RCH PRINT! 3.0 RT Full Payments con terminale POS D35",
    width: 600,
    height: 600,
  },
  "Software gestionale": null,
  "POS per pagamenti": paymentPosGallery[0],
  "Cassetti automatici Cashmatic": {
    src: "/images/products/cashmatic-selfpay-860.webp",
    alt: "Cassetto automatico Cashmatic SelfPay 860 per banconote e monete",
    width: 800,
    height: 800,
  },
  "WALLE MEC RT Ambulanti": {
    src: "/images/products/walle-mec-ambulanti-solo-cassa.webp",
    alt: "Registratore di cassa RCH WALLE MEC RT per ambulanti su sfondo bianco",
    width: 600,
    height: 600,
  },
  "APE J RT": {
    src: "/images/products/ape-j-rt-stampa.webp",
    alt: "Registratore telematico portatile RCH APE J RT con display touch e stampante integrata",
    width: 800,
    height: 600,
  },
} satisfies Record<string, ProductImage | null>;

export type Solution = {
  name: keyof typeof productImages;
  gallery?: ProductImage[];
  features: string[];
};

// Preelaborato commerciale: verifiche e fonti in docs/revisione-pagine-settori.md.
export type Sector = {
  slug: SectorSlug;
  label: string;
  icon: IconName;
  summary: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  cta: string;
  subject: string;
  messagePlaceholder: string;
  solutionsHeading: string;
  solutionsIntro: string;
  solutions: Solution[];
  software?: { title: string; description: string; features: string[]; gallery: ProductImage[]; cta?: string };
  question: string;
  questionText: string;
  faq: { question: string; answer: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "ristoranti",
    label: "Food",
    icon: "ChefHat",
    summary: "Bar, pizzerie e ristoranti",
    title: "Casse e gestionali per bar e ristoranti in Trentino",
    description: "Soluzioni RCH per bar, pizzerie e ristoranti: cassa, tavoli e comande. Con Mifro scegli la configurazione e il supporto tecnico adatti al tuo locale.",
    headline: "Dalla comanda al conto, tutto sotto controllo",
    intro: "Casse e gestionali RCH per bar, pizzerie e ristoranti in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per il mio locale",
    messagePlaceholder: "Dove si trova il locale? Come gestisci oggi le comande?",
    solutionsHeading: "Soluzioni per la tua attività",
    solutionsIntro: "PC POS Touch Screen, registratore telematico APE3, POS per pagamenti e cassetti automatici Cashmatic: scegliamo insieme gli strumenti adatti al tuo locale.",
    solutions: [
      {
        name: "PC POS Touch Screen",
        gallery: [
          { src: "/images/products/pos-touch-screen-1.webp", alt: "Sistema POS touch screen RCH, vista frontale con schermo operatore", width: 800, height: 600 },
          { src: "/images/products/pos-touch-screen-2.webp", alt: "Sistema POS touch screen RCH, vista posteriore con display cliente", width: 800, height: 600 },
          { src: "/images/products/pos-touch-screen-3.webp", alt: "Sistema POS touch screen RCH, vista laterale con display cliente", width: 800, height: 600 },
        ],
        features: ["Ideale per attività con maggiore affluenza", "Maggiore potenza e prestazioni", "Monitor regolabile", "Sistema scalabile con la tua attività", "Possibilità di aggiungere stampanti e palmari", "Gestione dei tavoli", "Installazione a cura di un tecnico specializzato", "Assistenza dopo l’installazione, per ogni dubbio o necessità"] },
      {
        name: "Registratore telematico APE3 con POS integrato",
        gallery: [
          { src: "/images/products/registratore-telematico-1.webp", alt: "Registratore telematico RCH APE 3, vista laterale", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-2.webp", alt: "Registratore telematico RCH APE 3, schermo operatore", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-3.webp", alt: "Registratore telematico RCH APE 3, display cliente e stampante", width: 800, height: 600 },
        ],
        features: ["Ideale per piccole attività con poca affluenza", "Struttura compatta per il tuo banco", "POS integrato in un unico sistema", "Possibilità di aggiungere stampanti e palmari", "Semplicità nella gestione quotidiana", "Installazione a cura di un tecnico specializzato", "Assistenza dopo l’installazione, per ogni dubbio o necessità"],
      },
      {
        name: "POS per pagamenti",
        gallery: paymentPosGallery,
        features: [
          "Integrazione completa con i sistemi RCH",
          "Sicurezza nelle transazioni",
          "Affidabilità nei pagamenti di ogni giorno",
          "Mifro autorizzata a intervenire sia sulla cassa sia sul POS",
          "Installazione a cura di un tecnico specializzato",
          "Assistenza dopo l’installazione, per ogni dubbio o necessità",
        ],
      },
      {
        name: "Cassetti automatici Cashmatic",
        features: [
          "SelfPay 860: incasso automatico di banconote e monete",
          "Fino a 8 pagamenti al minuto",
          "Erogazione automatica e precisa del resto",
          "Rilevamento del denaro falso",
          "Meno contatto con il contante per gli operatori",
          "Controllo delle operazioni anche da remoto",
          "Installazione a cura di un tecnico specializzato",
          "Assistenza dopo l’installazione, per ogni dubbio o necessità",
        ],
      },
    ],
    software: {
      gallery: [
        { src: "/images/products/gestionale-tavoli.webp", alt: "Software gestionale RCH: mappa e gestione dei tavoli", width: 1920, height: 1080 },
        { src: "/images/products/gestionale-vendite.webp", alt: "Software gestionale RCH: interfaccia per le operazioni di vendita", width: 1920, height: 1080 },
        { src: "/images/products/gestionale-listini.webp", alt: "Software gestionale RCH: configurazione dei listini in cloud", width: 1920, height: 1080 },
        { src: "/images/products/gestionale-magazzino.webp", alt: "Software gestionale RCH: gestione del magazzino e delle giacenze", width: 1920, height: 1080 },
        { src: "/images/products/gestionale-dispositivi.webp", alt: "Software gestionale RCH utilizzabile su diversi dispositivi", width: 1920, height: 1080 },
      ],
      title: "Software gestionale in cloud",
      description: "Organizza il lavoro del tuo locale, dalla comanda al conto. Ti aiutiamo a scegliere le funzioni adatte alla tua attività, verificando anche la compatibilità con i dispositivi che utilizzi già.",
      features: ["Tavoli, prenotazioni e comande organizzati", "Kitchen display per visualizzare e gestire le comande in cucina", "Gestione degli ordini d’asporto", "Accesso tramite app per consultare dati, incassi e report anche da remoto"],
    },
    question: "Parliamo del tuo locale",
    questionText: "Raccontaci come gestisci gli ordini e cosa vuoi migliorare.",
    faq: [
      { question: "Posso installare il software gestionale sui dispositivi che ho già?", answer: "Sì. Il gestionale può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Come scelgo tra cassa, sistema POS e software gestionale?", answer: "Partiamo da come lavori: servizio ai tavoli, asporto, postazioni e controllo da remoto. Confrontiamo funzioni e moduli, verificando anche i dispositivi che possiedi già. Il software gestionale è installabile su hardware esistente compatibile; la proposta specifica la configurazione adatta al tuo locale." },
      { question: "Cosa serve per le comande in cucina?", answer: "Stampanti o schermi compatibili con la configurazione scelta, anche già presenti nel locale. Verifichiamo quelli che utilizzi e definiamo i moduli e le eventuali integrazioni necessarie." },
      { question: "Cosa offre il software gestionale in cloud?", answer: "Puoi consultare vendite e report da remoto e gestire più punti cassa. Moduli e canoni dipendono dalla configurazione scelta." },
      { question: "Quali costi devo considerare per il gestionale?", answer: "La proposta distingue licenze, moduli, eventuali canoni, installazione e assistenza. Per il software gestionale partiamo dai dispositivi che possiedi già; nuovo hardware e accessori si valutano solo se necessari." },
    ],
  },
  {
    slug: "parrucchieri-saloni",
    label: "Beauty e benessere",
    icon: "Scissors",
    summary: "Incassi, prodotti e gestione degli appuntamenti.",
    title: "Casse per parrucchieri e saloni in Trentino",
    description: "Registratori di cassa e gestionali RCH per parrucchieri e saloni. Mifro ti aiuta a scegliere tra cassa essenziale e funzioni per organizzare l’attività.",
    headline: "La cassa giusta per il tuo salone",
    intro: "Casse e gestionali RCH per parrucchieri e saloni in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per il mio salone",
    messagePlaceholder: "Dove si trova il salone? Cerchi una cassa o anche un’agenda?",
    solutionsHeading: "Soluzioni per la tua attività",
    solutionsIntro: "Ti aiutiamo a scegliere la cassa più adatta al tuo salone, per gestire incassi e pagamenti con semplicità.",
    solutions: [
      {
        name: "WALLE 8T",
        features: ["Formato compatto per il banco reception", "Schermo touch da 8 pollici", "Stampante integrata per gli scontrini", "Servizi e prodotti organizzati per reparto", "Installazione a cura di un tecnico specializzato", "Assistenza dopo l’installazione, per ogni dubbio o necessità"],
      },
      {
        name: "PRINT! 3.0 RT Full Payments con tastiera",
        features: ["Configurazione con tastiera per le operazioni di cassa", "Collegamento al PC e al gestionale compatibile", "Stampante fiscale abbinata al POS D35", "Pagamenti con carta e contactless", "Installazione a cura di un tecnico specializzato", "Assistenza dopo l’installazione, per ogni dubbio o necessità"],
      },
      {
        name: "Registratore telematico APE3 con POS integrato",
        gallery: [
          { src: "/images/products/registratore-telematico-1.webp", alt: "Registratore telematico RCH APE 3, vista laterale", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-2.webp", alt: "Registratore telematico RCH APE 3, schermo operatore", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-3.webp", alt: "Registratore telematico RCH APE 3, display cliente e stampante", width: 800, height: 600 },
        ],
        features: ["Soluzione compatta per piccoli saloni", "Registratore telematico e POS in un unico sistema", "Gestione semplice degli incassi", "Possibilità di aggiungere periferiche compatibili", "Installazione a cura di un tecnico specializzato", "Assistenza dopo l’installazione, per ogni dubbio o necessità"],
      },
      {
        name: "POS per pagamenti",
        gallery: paymentPosGallery,
        features: [
          "Integrazione completa con i sistemi RCH",
          "Sicurezza nelle transazioni",
          "Affidabilità nei pagamenti di ogni giorno",
          "Mifro autorizzata a intervenire sia sulla cassa sia sul POS",
          "Installazione a cura di un tecnico specializzato",
          "Assistenza dopo l’installazione, per ogni dubbio o necessità",
        ],
      },
    ],
    software: {
      title: "Software gestionale in cloud",
      description: "Più tempo per i clienti, meno per organizzare il lavoro. Gestisci appuntamenti, prodotti e incassi del salone da un unico posto.",
      gallery: [
        { src: "/images/products/beauty-gestionale-listini.webp", alt: "Software gestionale RCH Beauty: configurazione dei listini in cloud", width: 1920, height: 1080 },
        { src: "/images/products/beauty-gestionale-vendite.webp", alt: "Software gestionale RCH Beauty: gestione di servizi e vendite", width: 1920, height: 1080 },
        { src: "/images/products/beauty-gestionale-dispositivi.webp", alt: "Software gestionale RCH Beauty accessibile da diversi dispositivi", width: 1920, height: 1080 },
      ],
      features: ["Agenda per tutto il team, con disponibilità per ogni operatore", "Creazione di una pagina web: i clienti scelgono operatore e orario e l’agenda si aggiorna da sola", "Listini, prodotti e scorte sempre sotto controllo", "Incassi e report consultabili anche da app"],
    },
    question: "Cosa serve al tuo salone?",
    questionText: "Dicci se cerchi solo la cassa o anche la gestione degli appuntamenti.",
    faq: [
      { question: "Posso installare il software gestionale sui dispositivi che ho già?", answer: "Sì. Il gestionale può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Posso acquistare solo la cassa?", answer: "Sì. Puoi scegliere la sola cassa e continuare a usare la tua agenda." },
      { question: "I clienti possono prenotare online e scegliere l’operatore?", answer: "Sì. Possiamo creare una pagina web dedicata al tuo salone, collegata al gestionale e raggiungibile dal tuo sito. Il cliente sceglie l’operatore e un orario disponibile: la prenotazione viene inserita automaticamente nell’agenda del salone. Puoi configurare più operatori e gestire le disponibilità di ciascuno." },
      { question: "L’agenda è inclusa in tutte le soluzioni?", answer: "No: prenotazioni e operatori richiedono moduli specifici. Li indichiamo nel preventivo, con gli eventuali canoni." },
      { question: "Il sistema si collega al gestionale che uso già?", answer: "Indicaci il nome del software. Verifichiamo la compatibilità prima di proporti un collegamento." },
    ],
  },
  {
    slug: "ambulanti",
    label: "Ambulanti e mercati",
    icon: "Tent",
    summary: "Casse per lavorare tra mercati e fiere.",
    title: "Registratori di cassa per ambulanti in Trentino",
    description: "Casse RCH per ambulanti, mercati e fiere: WALLE MEC RT Ambulanti e APE J RT. Con Mifro scegli cassa, accessori e collegamenti per il tuo banco.",
    headline: "La cassa per chi lavora tra mercati e fiere",
    intro: "Casse RCH per ambulanti e mercati in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per la mia attività ambulante",
    messagePlaceholder: "In quali zone lavori? Hai corrente sul banco?",
    solutionsHeading: "Casse e POS per mercati e fiere",
    solutionsIntro: "Tastiera fisica o touch: due casse telematiche per lavorare in mobilità, con POS per i pagamenti elettronici.",
    solutions: [
      { name: "WALLE MEC RT Ambulanti", features: ["Batteria per lavorare senza presa", "Tastiera e stampante integrate", "Coperchio antipioggia e borsa"] },
      { name: "APE J RT", features: ["Batteria e connessione mobile", "Scontrini e invio corrispettivi", "Contactless con RCH Pay SoftPOS"] },
      {
        name: "POS per pagamenti",
        gallery: paymentPosGallery,
        features: [
          "Integrazione completa con i sistemi RCH",
          "Sicurezza nelle transazioni",
          "Affidabilità nei pagamenti di ogni giorno",
          "Mifro autorizzata a intervenire sia sulla cassa sia sul POS",
          "Installazione a cura di un tecnico specializzato",
          "Assistenza dopo l’installazione, per ogni dubbio o necessità",
        ],
      },
    ],
    software: {
      title: "RCH Smart Order 3.0",
      description: "Menù digitale e ordini da smartphone per chi propone cibo e bevande tra mercati, fiere ed eventi. Smart Order si integra con il gestionale di cassa RCH: Mifro verifica la compatibilità dei dispositivi e ti segue nella configurazione.",
      cta: "Richiedi informazioni su Smart Order",
      features: ["Menù consultabile tramite QR code, senza scaricare app", "Ordini da smartphone e ritiro da asporto", "Prodotti e varianti personalizzabili", "Preferenze alimentari e allergeni nel menù digitale", "Possibilità di abilitare i pagamenti online"],
      gallery: [
        { src: "/images/products/smart-order-menu.webp", alt: "RCH Smart Order: consultazione del menù digitale da smartphone", width: 940, height: 940 },
        { src: "/images/products/smart-order-asporto.webp", alt: "RCH Smart Order: gestione degli ordini da asporto e consegna", width: 940, height: 940 },
        { src: "/images/products/smart-order-preferenze.webp", alt: "RCH Smart Order: preferenze alimentari nel menù digitale", width: 940, height: 940 },
        { src: "/images/products/smart-order-prodotti.webp", alt: "RCH Smart Order: personalizzazione dei prodotti e delle varianti", width: 940, height: 940 },
        { src: "/images/products/smart-order-pagamenti.webp", alt: "RCH Smart Order: pagamento online degli ordini", width: 940, height: 940 },
      ],
    },
    question: "Dove lavori e come alimenti il banco?",
    questionText: "Indicaci i mercati che frequenti e se hai corrente sul banco.",
    faq: [
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Quanto dura la batteria?", answer: "Dipende dall’uso e dai collegamenti. Valutiamo autonomia, ricarica e dotazione in base alla tua giornata al mercato." },
      { question: "APE J RT invia i corrispettivi?", answer: "Sì: è un registratore telematico con stampante integrata. Dopo l’attivazione, trasmette i corrispettivi tramite Wi-Fi o rete mobile." },
      { question: "Come collego la cassa al mercato?", answer: "APE J RT usa Wi-Fi o SIM dati. Per WALLE MEC RT Ambulanti definiamo il collegamento e gli accessori adatti al tuo banco." },
      { question: "Posso accettare pagamenti elettronici?", answer: "Con APE J RT puoi attivare RCH Pay SoftPOS per il contactless. Per WALLE MEC RT Ambulanti abbiniamo un POS. Servizi e costi sono indicati nel preventivo." },
    ],
  },

];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export const sectorHref = (slug: string) => `/soluzioni/${slug}`;
