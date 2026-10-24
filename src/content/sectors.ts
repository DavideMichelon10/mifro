import type { SectorSlug } from "@/lib/contact-context";
import type { IconName } from "@/components/Icons";

type ProductImage = {
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
  "ATS 2": {
    src: "/images/ristorazione.png",
    alt: "Esempio di postazione RCH con schermo touch e stampante fiscale",
    width: 800,
    height: 600,
  },
  "ATS 3": {
    src: "/images/products/ats-3-device.webp",
    alt: "Software gestionale ATS 3 mostrato su un registratore RCH APE 3 come esempio di utilizzo",
    width: 800,
    height: 600,
  },
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
} satisfies Record<string, ProductImage>;

export type Solution = {
  name: keyof typeof productImages;
  label: string;
  title: string;
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
  question: string;
  questionText: string;
  faq: { question: string; answer: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "bar",
    label: "Bar e caffetterie",
    icon: "Coffee",
    summary: "Casse per il banco e il servizio ai tavoli.",
    title: "Registratori di cassa per bar in Trentino",
    description: "Casse RCH e gestionali per bar e caffetterie. Mifro ti segue nella scelta, nella configurazione e nell’assistenza, con tecnici esperti in Trentino.",
    headline: "La cassa adatta al ritmo del tuo bar.",
    intro: "Casse RCH per bar e caffetterie in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per il mio bar",
    messagePlaceholder: "Dove si trova il bar? Lavori al banco o anche ai tavoli?",
    solutionsHeading: "Cassa essenziale o gestionale per il bar",
    solutionsIntro: "Cassa essenziale o gestionale: partiamo dal servizio che offri. ATS 3 è un software installabile anche sui dispositivi compatibili che possiedi già.",
    solutions: [
      { name: "WALLE MEC RT", label: "Cassa con tastiera", title: "Compatta sul tuo banco", features: ["Articoli con prezzi già pronti", "Stampante integrata nella cassa", "Vendite ordinate per reparto"] },
      { name: "ATS 2", label: "Software A-Touch System", title: "Tavoli e conti in ordine", features: ["Ordini associati ai tavoli", "Conti gestiti dalla cassa", "Prodotti e prezzi a portata di mano"] },
      { name: "ATS 3", label: "Software · RISTO-PRO", title: "Controlla il bar anche da remoto", features: ["Incassi e report da smartphone", "Listini aggiornabili dal cloud", "Più casse, dati sincronizzati"] },
    ],
    question: "Solo banco o anche servizio ai tavoli?",
    questionText: "Indicaci dove lavori e quale cassa utilizzi. Ti aiutiamo a scegliere.",
    faq: [
      { question: "Posso installare ATS 3 sui dispositivi che ho già?", answer: "Sì. ATS 3 è un software: può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Per un piccolo bar serve un gestionale?", answer: "Per il solo banco può bastare una cassa essenziale. Per tavoli, comande e report valutiamo un gestionale." },
      { question: "Posso mantenere alcune periferiche che utilizzo già?", answer: "Indica i dispositivi che usi: ne verifichiamo la compatibilità prima della proposta." },
      { question: "Le funzioni sono tutte incluse?", answer: "Dipendono dalla configurazione. Nel preventivo distinguiamo licenze, moduli, assistenza ed eventuali canoni. Nuovo hardware e accessori si valutano solo se necessari." },
    ],
  },
  {
    slug: "ristoranti",
    label: "Ristoranti e pizzerie",
    icon: "ChefHat",
    summary: "Tavoli, comande e cassa per il tuo locale.",
    title: "Casse e gestionali per ristoranti in Trentino",
    description: "Soluzioni RCH per ristoranti e pizzerie: cassa, tavoli e comande. Con Mifro scegli la configurazione e il supporto tecnico adatti al tuo locale.",
    headline: "Dalla comanda al conto, tutto sotto controllo.",
    intro: "Casse e gestionali RCH per ristoranti e pizzerie in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per il mio ristorante",
    messagePlaceholder: "Dove si trova il locale? Come gestisci oggi le comande?",
    solutionsHeading: "Casse e gestionali per il tuo ristorante",
    solutionsIntro: "Due software gestionali RCH per il tuo locale. ATS 3 può essere installato anche sui dispositivi compatibili già presenti, senza acquistare nuovo hardware.",
    solutions: [
      { name: "ATS 2", label: "Software A-Touch System", title: "Dalla comanda al conto", features: ["Ordini organizzati per tavolo", "Sala e cassa collegate", "Gestione degli ordini d’asporto"] },
      { name: "ATS 3", label: "Software · RISTO-PRO", title: "Sala, cucina e asporto coordinati", features: ["Tavoli e prenotazioni insieme", "Asporto organizzato per orario", "Comande su schermo in cucina"] },
    ],
    question: "Parliamo del tuo ristorante.",
    questionText: "Raccontaci come gestisci gli ordini e cosa vuoi migliorare.",
    faq: [
      { question: "Posso installare ATS 3 sui dispositivi che ho già?", answer: "Sì. ATS 3 è un software: può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
      { question: "Come funzionano installazione e formazione?", answer: "Mifro segue installazione e configurazione. Concordiamo prima dell’avvio le attività e l’affiancamento necessari: contenuti, modalità ed eventuali costi sono da definire nella proposta." },
      { question: "Come scelgo tra ATS 2 e ATS 3?", answer: "Partiamo da come lavori: servizio ai tavoli, asporto, postazioni e controllo da remoto. Confrontiamo funzioni e moduli, verificando anche i dispositivi che possiedi già. ATS 3 è un software installabile su hardware esistente compatibile; la proposta specifica la configurazione adatta al tuo locale." },
      { question: "Cosa serve per le comande in cucina?", answer: "Stampanti o schermi compatibili con la configurazione scelta, anche già presenti nel locale. Verifichiamo quelli che utilizzi e definiamo i moduli e le eventuali integrazioni necessarie." },
      { question: "Cosa offre ATS 3 in cloud?", answer: "Puoi consultare vendite e report da remoto e gestire più punti cassa. Moduli e canoni dipendono dalla configurazione scelta." },
      { question: "Quali costi devo considerare per il gestionale?", answer: "La proposta distingue licenze, moduli, eventuali canoni, installazione e assistenza. Per ATS 3 partiamo dai dispositivi che possiedi già; nuovo hardware e accessori si valutano solo se necessari." },
    ],
  },
  {
    slug: "parrucchieri-saloni",
    label: "Parrucchieri e saloni",
    icon: "Scissors",
    summary: "Incassi, prodotti e gestione degli appuntamenti.",
    title: "Casse per parrucchieri e saloni in Trentino",
    description: "Registratori di cassa e gestionali RCH per parrucchieri e saloni. Mifro ti aiuta a scegliere tra cassa essenziale e funzioni per organizzare l’attività.",
    headline: "La cassa giusta per il tuo salone.",
    intro: "Casse e gestionali RCH per parrucchieri e saloni in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per il mio salone",
    messagePlaceholder: "Dove si trova il salone? Cerchi una cassa o anche un’agenda?",
    solutionsHeading: "Casse e gestionali per il tuo salone",
    solutionsIntro: "Una cassa per gli incassi o un gestionale per il salone. ATS 3 è un software installabile anche sui dispositivi compatibili che possiedi già.",
    solutions: [
      { name: "WALLE MEC RT", label: "Cassa con tastiera", title: "Semplice per gli incassi", features: ["Servizi e prodotti con prezzi pronti", "Scontrini dalla stampante integrata", "Poco spazio sul banco reception"] },
      { name: "ATS 3", label: "Software · Beauty e servizi", title: "Appuntamenti e vendite insieme", features: ["Agenda organizzata per operatore", "Scorte dei prodotti sotto controllo", "Incassi consultabili da remoto"] },
    ],
    question: "Cosa serve al tuo salone?",
    questionText: "Dicci se cerchi solo la cassa o anche la gestione degli appuntamenti.",
    faq: [
      { question: "Posso installare ATS 3 sui dispositivi che ho già?", answer: "Sì. ATS 3 è un software: può essere installato anche sui dispositivi compatibili che utilizzi già, senza acquistare nuovo hardware. Indicaci i modelli presenti nella tua attività: Mifro verifica la compatibilità e segue l’installazione." },
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
    headline: "La cassa per chi lavora tra mercati e fiere.",
    intro: "Casse RCH per ambulanti e mercati in Trentino. Mifro ti segue nella scelta, nella configurazione e nell’assistenza.",
    cta: "Richiedi informazioni",
    subject: "Soluzioni di cassa per la mia attività ambulante",
    messagePlaceholder: "In quali zone lavori? Hai corrente sul banco?",
    solutionsHeading: "Casse portatili per mercati e fiere",
    solutionsIntro: "Tastiera fisica o touch: due casse telematiche per lavorare in mobilità.",
    solutions: [
      { name: "WALLE MEC RT Ambulanti", label: "Cassa portatile con tastiera", title: "La praticità dei tasti, al mercato", features: ["Batteria per lavorare senza presa", "Tastiera e stampante integrate", "Coperchio antipioggia e borsa"] },
      { name: "APE J RT", label: "Registratore telematico touch", title: "Cassa e pagamenti in una mano", features: ["Batteria e connessione mobile", "Scontrini e invio corrispettivi", "Contactless con RCH Pay SoftPOS"] },
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
];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export const sectorHref = (slug: string) => `/soluzioni/${slug}`;
