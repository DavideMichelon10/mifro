import type { SectorSlug } from "@/lib/contact-context";
import type { IconName } from "@/components/Icons";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  "Software gestionale": null,
  "WALLE MEC RT Ambulanti": {
    src: "/images/products/walle-mec-rt-ambulanti-senza-bollino.webp",
    alt: "RCH WALLE MEC RT per ambulanti con borsa da trasporto e batteria",
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
  software?: { title: string; description: string; features: string[] };
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
    solutionsIntro: "PC POS Touch Screen e registratore telematico APE3 con POS integrato: scegliamo insieme gli strumenti adatti al tuo locale.",
    solutions: [
      {
        name: "PC POS Touch Screen",
        gallery: [
          { src: "/images/products/pos-touch-screen-1.webp", alt: "Sistema POS touch screen RCH, vista frontale con schermo operatore", width: 800, height: 600 },
          { src: "/images/products/pos-touch-screen-2.webp", alt: "Sistema POS touch screen RCH, vista posteriore con display cliente", width: 800, height: 600 },
          { src: "/images/products/pos-touch-screen-3.webp", alt: "Sistema POS touch screen RCH, vista laterale con display cliente", width: 800, height: 600 },
        ],
        features: ["Ideale per attività con maggiore affluenza", "Maggiore potenza e prestazioni", "Monitor regolabile", "Sistema scalabile con la tua attività", "Possibilità di aggiungere stampanti e palmari", "Gestione dei tavoli"] },
      {
        name: "Registratore telematico APE3 con POS integrato",
        gallery: [
          { src: "/images/products/registratore-telematico-1.webp", alt: "Registratore telematico RCH APE 3, vista laterale", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-2.webp", alt: "Registratore telematico RCH APE 3, schermo operatore", width: 800, height: 600 },
          { src: "/images/products/registratore-telematico-3.webp", alt: "Registratore telematico RCH APE 3, display cliente e stampante", width: 800, height: 600 },
        ],
        features: ["Ideale per piccole attività con poca affluenza", "Struttura compatta per il tuo banco", "POS integrato in un unico sistema", "Possibilità di aggiungere stampanti e palmari", "Semplicità nella gestione quotidiana", "Installazione semplice"],
      },
    ],
    software: {
      title: "Software gestionale",
      description: "Organizza il lavoro del tuo locale, dalla comanda al conto. Ti aiutiamo a scegliere le funzioni adatte alla tua attività, verificando anche la compatibilità con i dispositivi che utilizzi già.",
      features: ["Tavoli, prenotazioni e comande organizzati", "Gestione degli ordini d’asporto", "Incassi e report consultabili da remoto"],
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
    solutionsHeading: "Casse e gestionali per il tuo salone",
    solutionsIntro: "Una cassa per gli incassi o un gestionale per il salone. Il software gestionale è installabile anche sui dispositivi compatibili che possiedi già.",
    solutions: [
      { name: "WALLE MEC RT", features: ["Servizi e prodotti con prezzi pronti", "Scontrini dalla stampante integrata", "Poco spazio sul banco reception"] },
      { name: "Software gestionale", features: ["Agenda organizzata per operatore", "Scorte dei prodotti sotto controllo", "Incassi consultabili da remoto"] },
    ],
    question: "Cosa serve al tuo salone?",
    questionText: "Dicci se cerchi solo la cassa o anche la gestione degli appuntamenti.",
    faq: [
      { question: "Posso installare il software gestionale sui dispositivi che ho già?", answer: "Sì. Il gestionale può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Posso acquistare solo la cassa?", answer: "Sì. Puoi scegliere la sola cassa e continuare a usare la tua agenda." },
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
    solutionsHeading: "Casse portatili per mercati e fiere",
    solutionsIntro: "Tastiera fisica o touch: due casse telematiche per lavorare in mobilità.",
    solutions: [
      { name: "WALLE MEC RT Ambulanti", features: ["Batteria per lavorare senza presa", "Tastiera e stampante integrate", "Coperchio antipioggia e borsa"] },
      { name: "APE J RT", features: ["Batteria e connessione mobile", "Scontrini e invio corrispettivi", "Contactless con RCH Pay SoftPOS"] },
    ],
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
  {
    slug: "negozi-altre-attivita",
    label: "Negozi e altre attività",
    icon: "Store",
    summary: "Soluzioni di cassa e gestionali per la tua attività.",
    title: "Casse e gestionali per negozi e attività in Trentino",
    description: "Soluzioni di cassa e gestionali per negozi e altre attività. Mifro ti affianca nella scelta, nell’installazione e nell’assistenza in Trentino.",
    headline: "Ogni attività ha il suo modo di lavorare. Troviamo la tua soluzione",
    intro: "Dalla cassa essenziale alla gestione di articoli e magazzino, partiamo dalle esigenze della tua attività. Ti seguiamo nella scelta, nell’installazione e nell’assistenza in Trentino.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per la mia attività",
    messagePlaceholder: "Raccontaci di cosa ti occupi, dove lavori e cosa vorresti migliorare nella gestione della tua attività.",
    solutionsHeading: "Una cassa semplice o un gestionale completo",
    solutionsIntro: "Scegliamo insieme la configurazione in base a come lavori. Il software gestionale è installabile anche sui dispositivi compatibili che possiedi già.",
    solutions: [
      { name: "WALLE MEC RT", features: ["Articoli con prezzi già pronti", "Vendite ordinate per reparto", "Stampante integrata nella cassa"] },
      { name: "Software gestionale", features: ["Articoli organizzati per variante", "Giacenze e inventari sotto controllo", "Listini aggiornabili da remoto"] },
    ],
    question: "Raccontaci la tua attività",
    questionText: "Indicaci come lavori e quali strumenti utilizzi. Ti aiutiamo a individuare la soluzione più adatta.",
    faq: [
      { question: "La soluzione si adatta alla mia attività?", answer: "Partiamo dal tuo lavoro quotidiano: cosa vendi, come gestisci gli incassi e quali strumenti utilizzi. Valutiamo insieme la configurazione e le eventuali integrazioni necessarie." },
      { question: "Posso scegliere solo una cassa?", answer: "Sì. Se ti serve una soluzione essenziale per gli incassi, possiamo proporti una cassa senza aggiungere un gestionale." },
      { question: "Posso gestire articoli e magazzino?", answer: "Il software gestionale prevede funzioni per articoli, varianti, giacenze e inventari. Definiamo nella proposta i moduli e la configurazione adatti alle tue esigenze." },
      { question: "Posso utilizzare i dispositivi che ho già?", answer: "Il software gestionale può essere installato su hardware compatibile. Indicaci i modelli e i software che utilizzi: verifichiamo la compatibilità prima della proposta." },
      { question: "Come funzionano installazione e assistenza?", answer: "Mifro segue installazione e configurazione. Nella proposta definiamo affiancamento, assistenza, licenze, eventuali canoni e accessori necessari." },
    ],
  },
];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export const sectorHref = (slug: string) => `/soluzioni/${slug}`;
