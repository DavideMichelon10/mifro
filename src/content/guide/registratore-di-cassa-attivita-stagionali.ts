import type { Article } from "../article-types";

export const article: Article = {
  slug: "registratore-di-cassa-attivita-stagionali",
  title: "Registratore di cassa stagionale: chiusura e riapertura",
  date: "2026-11-13",
  revisedAt: "2026-11-13",
  category: "territorio",
  type: "news",
  description:
    "Rifugio, malga, chiosco o bar sulle piste: cosa fare con il registratore telematico a fine stagione, nei mesi di chiusura e prima di riaprire.",
  answer:
    "Nei periodi di chiusura non devi fare alcuna registrazione sul registratore telematico: alla prima trasmissione dopo la riapertura l’apparecchio comunica da solo i giorni di fermo, a importo zero. Se la chiusura supera i 12 giorni puoi informare prima l’Agenzia delle Entrate impostando lo stato «fuori servizio» con il codice 608 (periodo di inattività). Prima di riaprire è prudente controllare verificazione periodica, aggiornamenti, connessione e POS.",
  body: [
    { type: "h2", text: "Cosa succede al registratore telematico quando l’attività resta chiusa per mesi?" },
    {
      type: "p",
      text: "Nei giorni di chiusura non devi registrare nulla. La guida dell’Agenzia delle Entrate lo dice in modo esplicito: nei periodi di chiusura l’esercente non deve effettuare alcuna registrazione sul registratore telematico (RT), che comunica le giornate di chiusura al momento della prima trasmissione dei corrispettivi dopo la riapertura.",
    },
    {
      type: "p",
      text: "Le specifiche tecniche dei registratori (versione 11.2, paragrafo 2.7) citano proprio l’**attività stagionale** tra i casi previsti, insieme a ferie e chiusura settimanale: alla prima trasmissione utile l’apparecchio invia un unico file con tutti i giorni di interruzione **a importo zero**. Se quindi alla riapertura vedi partire un invio che copre i mesi di fermo, è il comportamento previsto.",
    },
    { type: "h2", text: "Devo comunicare la chiusura stagionale all’Agenzia delle Entrate?" },
    {
      type: "p",
      text: "Puoi farlo: l’Agenzia la presenta come una possibilità. Quando l’interruzione supera i **12 giorni** (la guida fa proprio l’esempio di ferie lunghe e chiusura stagionale), oppure non sai quanto durerà, puoi informare prima l’Agenzia impostando il registratore nello stato **«fuori servizio» con il codice 608** («magazzino/periodo di inattività»), così da comunicare l’inizio del periodo di inattività.",
    },
    {
      type: "p",
      text: "Le specifiche tecniche prevedono che il registratore possa inviare questo evento e che i cambi di stato si possano comunicare anche dal sito dell’Agenzia delle Entrate, da parte dell’esercente o di un suo delegato. I documenti dell’Agenzia non descrivono i passaggi uno per uno: chiedi al tuo tecnico come si fa sul tuo modello. Non serve una riattivazione: il registratore torna «in servizio» da solo alla prima trasmissione utile. Se hai dubbi sull’opportunità di fare la comunicazione nel tuo caso, senti il commercialista.",
    },
    {
      type: "table",
      caption: "Chiusura breve e chiusura stagionale a confronto (fonte: guida e specifiche tecniche dell’Agenzia delle Entrate)",
      head: ["Situazione", "Cosa fai tu", "Cosa fa il registratore"],
      rows: [
        ["Riposo settimanale, ferie fino a 12 giorni", "Nessuna registrazione", "Alla prima trasmissione dopo la riapertura comunica i giorni di chiusura a zero"],
        ["Chiusura oltre 12 giorni o di durata incerta", "Puoi impostare «fuori servizio», codice 608", "Torna «in servizio» alla prima trasmissione utile"],
        ["Guasto dell’apparecchio", "Chiami un tecnico abilitato e segui la procedura per i guasti", "Non è una chiusura stagionale: regole diverse"],
      ],
    },
    {
      type: "note",
      title: "Chiusura stagionale e guasto non sono la stessa cosa",
      text: "Lo stato «fuori servizio» si usa anche per i guasti, ma con un codice diverso (607, malfunzionamento) e con altre regole. Se la cassa è rotta leggi [cosa fare se il registratore di cassa è guasto](/news/registratore-di-cassa-guasto-cosa-fare).",
    },
    { type: "h2", text: "Cosa fare con la cassa l’ultimo giorno di stagione?" },
    {
      type: "p",
      text: "Chiudi la giornata, controlla che l’invio sia arrivato e solo dopo spegni. I primi due punti dell’elenco derivano dalle regole dell’Agenzia; gli altri sono consigli pratici di prudenza, non obblighi.",
    },
    {
      type: "ol",
      items: [
        "**Fai l’ultima chiusura giornaliera** con la connessione attiva e lascia il registratore collegato finché non ha completato la trasmissione.",
        "**Verifica l’ultimo invio.** Il QR code applicato sul registratore porta a una pagina dell’Agenzia con lo stato dell’apparecchio, la data dell’ultima trasmissione e i dati dell’ultima verificazione periodica.",
        "**Comunica il periodo di inattività** (fuori servizio, codice 608) se hai deciso di farlo.",
        "**Annota la scadenza della verificazione periodica**: se cade nei mesi di chiusura, conviene prenotarla per tempo in vista della riapertura.",
        "**Spegni e scollega** registratore e POS da corrente e rete, se il locale resta vuoto: è una precauzione contro sbalzi di tensione e temporali.",
        "**Tienili al riparo da gelo e umidità.** Se la struttura non è riscaldata, valuta di portare altrove registratore, POS e rotoli. Per temperature di conservazione, batteria e carta segui il manuale del tuo modello e le indicazioni di chi ti fornisce i rotoli.",
      ],
    },
    { type: "h2", text: "Cosa controllare prima di riaprire?" },
    {
      type: "p",
      text: "Il nostro consiglio è accendere la cassa qualche giorno prima dell’apertura, non la mattina stessa: se serve un tecnico, hai il tempo di organizzare l’intervento. Anche questo elenco è fatto di consigli pratici, tranne ciò che riguarda la verificazione periodica.",
    },
    {
      type: "ol",
      items: [
        "**Lascia che l’apparecchio torni a temperatura ambiente** se arriva da un locale freddo, poi accendilo; se è un modello portatile, metti in carica la batteria. In caso di dubbio segui il manuale.",
        "**Controlla che data e ora siano corrette.** Se non lo sono, chiedi al tecnico come procedere sul tuo modello.",
        "**Chiedi se ci sono aggiornamenti** del software del registratore usciti mentre eri chiuso.",
        "**Controlla la verificazione periodica.** È biennale e la esegue il personale di un laboratorio abilitato. Secondo le specifiche tecniche il registratore avvisa a partire da 30 giorni prima della scadenza; superata la data, stampa in chiusura giornaliera la dicitura «Registratore Telematico privo di VP».",
        "**Fai una prova completa** insieme al tecnico o seguendo le sue indicazioni: connessione, chiusura giornaliera e controllo che l’invio sia andato a buon fine.",
        "**Controlla POS e connessione**: se usi una SIM dati verifica che sia attiva, e fai una transazione di prova secondo le indicazioni di chi ti ha fornito il terminale.",
        "**Controlla listino, reparti e aliquote IVA** se hai cambiato prezzi o prodotti, e fai scorta di rotoli.",
      ],
    },
    { type: "h2", text: "In rifugio o in malga la linea va e viene: come trasmetto i corrispettivi?" },
    {
      type: "p",
      text: "Per battere gli scontrini la connessione non serve: serve per trasmettere. L’Agenzia delle Entrate chiarisce che il registratore può memorizzare ed emettere i documenti commerciali anche senza rete, e che la connessione va attivata al momento della chiusura di cassa.",
    },
    {
      type: "p",
      text: "Se alla chiusura di cassa ci sono problemi di connessione, la guida dell’Agenzia indica **12 giorni di tempo** per trasmettere i corrispettivi. Le strade sono due: ricollegare il registratore a internet, oppure copiare su una memoria esterna (per esempio una chiavetta USB) il file dei corrispettivi sigillato dal registratore e caricarlo dal portale «Fatture e Corrispettivi». Le specifiche tecniche indicano per questo la voce **«Procedure di Emergenza > Assenza di rete»** e ricordano che la funzione ha valenza solo emergenziale: va usata esclusivamente in caso di effettiva necessità.",
    },
    {
      type: "p",
      text: "In pratica, per un rifugio o una malga: la chiusura giornaliera va fatta comunque, perché le specifiche tecniche la prevedono entro le ore 24 del giorno di apertura. Poi organizzati per ricollegare il registratore, o caricare il file, entro i 12 giorni. Come estrarre il file dipende dal modello: chiedilo al tecnico prima che serva. Tra le [soluzioni per ambulanti](/soluzioni/ambulanti) trovi anche registratori portatili con batteria e connessione mobile. Per i casi di linea assente in generale c’è la guida [internet o corrente assenti: la cassa funziona?](/news/internet-o-corrente-assenti-cassa-funziona).",
    },
    { type: "h2", text: "Generatore, fotovoltaico o batteria: cosa rischia la cassa?" },
    {
      type: "p",
      text: "Sul lato fiscale le specifiche tecniche prevedono due cose: i dati di dettaglio e di riepilogo delle operazioni sono registrati in memorie permanenti e inalterabili, e una batteria tampone mantiene i dati della memoria di lavoro quando manca l’alimentazione esterna.",
    },
    {
      type: "p",
      text: "Sul lato pratico non esiste una regola valida per tutti. Se la corrente arriva da un generatore o da un impianto non collegato alla rete elettrica, chiedi a chi ti ha fornito la cassa e all’elettricista se per il tuo modello conviene una protezione, per esempio un gruppo di continuità (UPS), e come comportarti all’accensione e allo spegnimento dell’impianto. È un consiglio di prudenza, non un obbligo.",
    },
    { type: "h2", text: "Cambio POS tra una stagione e l’altra: cosa devo aggiornare?" },
    {
      type: "p",
      text: "Se restituisci il terminale a fine stagione e ne attivi uno nuovo, devi aggiornare il collegamento POS–RT sul portale «Fatture e Corrispettivi». Le FAQ dell’Agenzia elencano i casi in cui l’aggiornamento è necessario: tra questi l’attivazione di un nuovo POS, quella di un nuovo registratore e la dismissione di un POS o di un registratore. Le FAQ non trattano in modo specifico le attività stagionali: per ogni altro caso senti il commercialista.",
    },
    {
      type: "p",
      text: "Secondo le FAQ, quando restituisci un POS già collegato elimini il collegamento indicando la data da cui non lo usi più; poi puoi segnalare la restituzione con la funzione «POS non collegati». Variazioni e nuove attivazioni si registrano tra il sesto giorno e l’ultimo giorno lavorativo del secondo mese successivo: applicando la regola, un terminale attivato a dicembre va collegato tra il 6 febbraio e l’ultimo giorno lavorativo di febbraio. Per un POS fisico ti servono il Terminal ID e i dati dell’operatore finanziario: li trovi nella documentazione contrattuale o chiedendo all’assistenza dell’operatore. I dettagli sono nella [guida al collegamento POS–RT](/news/guida-ade-collegamento-rt-pos).",
    },
    { type: "h2", text: "Per pochi mesi l’anno conviene il noleggio?" },
    {
      type: "p",
      text: "Può essere un’opzione da valutare se lavori una sola stagione o se è il primo anno e non sai ancora come andrà. Tieni presente che anche un registratore a noleggio deve essere attivato, cioè associato alla tua partita IVA, e che attivazione e disattivazione sono eseguite dal personale di laboratori abilitati dall’Agenzia delle Entrate. Chiedi sempre cosa comprende il canone, cosa succede nei mesi di fermo e come avviene la restituzione.",
    },
    {
      type: "p",
      text: "Mifro, con sede a Pergine Valsugana, propone [registratori di cassa a noleggio](/noleggio-registratori-di-cassa): nella richiesta indica che attività hai, il comune e il periodo per cui ti serve la cassa. Modello, durata, canone e servizi vengono specificati nel preventivo. Per il confronto completo leggi [noleggio o acquisto del registratore di cassa](/news/noleggio-o-acquisto-registratore-di-cassa).",
    },
  ],
  sources: [
    {
      title: "Agenzia delle Entrate: guida «Memorizzazione elettronica e trasmissione telematica dei corrispettivi» (aggiornamento marzo 2025)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/memorizzazione_elettronica_e_trasmissione_telematica_corrispettivi_marzo25",
    },
    {
      title: "Agenzia delle Entrate: specifiche tecniche dei registratori telematici, versione 11.2, pubblicate il 4 marzo 2026 e aggiornate il 21 aprile 2026 (par. 2.1, 2.4, 2.5, 2.6, 2.7, 2.8.1, 2.11)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2+agg.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21",
    },
    {
      title: "Agenzia delle Entrate: provvedimento del 28 ottobre 2016, testo coordinato (punti 1.6, 1.7 e 3.1)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/296529/Provvedimento+28102016_Testo+Coordinato_20240424.pdf/841f98a8-6c02-9324-cc40-a13738266e88",
    },
    {
      title: "Agenzia delle Entrate: FAQ sul collegamento POS–RT, aggiornate al 25 marzo 2026 (n. 12, 14, 17 e 23)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503",
    },
  ],
  faq: [
    {
      question: "Devo accendere il registratore ogni tanto durante i mesi di chiusura?",
      answer:
        "L’Agenzia delle Entrate non lo richiede: nei periodi di chiusura l’esercente non deve fare alcuna registrazione sul registratore telematico, e i giorni di fermo vengono comunicati in automatico, a importo zero, con la prima trasmissione dopo la riapertura. Per la cura dell’apparecchio durante il fermo, per esempio la batteria, segui il manuale del tuo modello.",
    },
    {
      question: "Ho spento la cassa senza fare l’ultima chiusura giornaliera: cosa succede?",
      answer:
        "Secondo le specifiche tecniche dell’Agenzia delle Entrate, alla prima riaccensione il registratore esegue obbligatoriamente come prima operazione la chiusura della giornata rimasta aperta, con la data di quel giorno. Ricorda però che i corrispettivi vanno trasmessi entro 12 giorni dall’operazione: se la dimenticanza precede un lungo fermo, senti subito il commercialista. Meglio chiudere sempre prima di spegnere.",
    },
    {
      question: "La verificazione periodica scade mentre l’attività è chiusa: come mi regolo?",
      answer:
        "La verificazione periodica del registratore telematico è biennale e la esegue il personale di un laboratorio abilitato. I documenti dell’Agenzia delle Entrate che abbiamo consultato non prevedono una regola specifica per la scadenza durante una chiusura stagionale: il nostro consiglio è prenotare l’intervento per tempo, prima della riapertura, e chiedere conferma al laboratorio. Il registratore avvisa a partire da 30 giorni prima della scadenza.",
    },
    {
      question: "Come controllo se l’ultimo invio dei corrispettivi è arrivato?",
      answer:
        "Inquadra con il telefono il QR code applicato sul registratore: porta a una pagina dell’Agenzia delle Entrate che mostra lo stato dell’apparecchio, la data dell’ultima trasmissione e i dati dell’ultima verificazione periodica. Le informazioni sulla verificazione periodica si possono consultare anche nel portale Fatture e Corrispettivi.",
    },
    {
      question: "Con pochi scontrini a stagione posso usare la procedura web gratuita al posto del registratore?",
      answer:
        "Sì, l’Agenzia delle Entrate mette a disposizione gratis la procedura «Documento commerciale online» e la indica come più adatta a chi fa poche operazioni. Richiede però una connessione attiva nel momento in cui emetti ogni documento, mentre il registratore può emettere i documenti anche senza rete. Dove la linea non è garantita è un limite da considerare.",
    },
    {
      question: "Posso chiedere assistenza a Mifro prima della riapertura stagionale?",
      answer:
        "Sì, puoi contattarci. Mifro ha sede a Pergine Valsugana e offre assistenza in Trentino, con interventi sul posto e da remoto in base al problema e alla configurazione. Indicaci il modello della cassa, il comune in cui lavori e la data di riapertura: i nostri tecnici ti ricontattano per capire quale intervento serve. Modalità e copertura dell’assistenza dipendono dagli accordi di servizio.",
    },
  ],
  cta: {
    title: "Riapri tra poco o stai chiudendo la stagione?",
    description:
      "Indicaci il modello della cassa, il comune in cui lavori e le date di apertura. I nostri tecnici ti ricontattano per capire quale intervento serve.",
    showPhone: true,
  },
};
