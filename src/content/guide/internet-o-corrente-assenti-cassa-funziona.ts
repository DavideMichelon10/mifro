import type { Article } from "../article-types";

export const article: Article = {
  slug: "internet-o-corrente-assenti-cassa-funziona",
  title: "Senza internet o corrente la cassa funziona lo stesso?",
  date: "2026-07-22",
  revisedAt: "2026-07-22",
  category: "problemi",
  type: "news",
  description:
    "Salta internet o la corrente: puoi fare gli scontrini? Cosa dice l’Agenzia delle Entrate, i 12 giorni per l’invio dei corrispettivi e come prepararti.",
  answer:
    "Senza internet il registratore telematico continua a emettere gli scontrini: la connessione serve per l’invio dei corrispettivi, che va fatto entro 12 giorni dalla data delle vendite. Senza corrente lavora solo se ha una batteria o un gruppo di continuità. Per il blackout i documenti dell’Agenzia delle Entrate non danno una regola specifica: concorda prima con il commercialista come comportarti.",
  body: [
    { type: "h2", text: "Se salta internet posso fare gli scontrini?" },
    {
      type: "p",
      text: "Sì. Il registratore telematico (la cassa che memorizza gli incassi e li invia all’Agenzia delle Entrate) non ha bisogno di internet per battere lo scontrino. La guida dell’Agenzia lo dice in modo esplicito: puoi memorizzare ed emettere i documenti commerciali, cioè gli scontrini, **anche se l’apparecchio non è connesso in rete**.",
    },
    {
      type: "p",
      text: "La linea serve dopo, per l’invio. Quando fai la chiusura di cassa il registratore prepara da solo il file con gli incassi della giornata, lo sigilla e prova a spedirlo. Se la trasmissione non riesce, le specifiche tecniche prevedono che l’apparecchio ritenti più volte, fino a quando il sistema dell’Agenzia prende in carico il file. Tu intanto continui a emettere gli scontrini.",
    },
    { type: "h2", text: "Entro quanti giorni devo trasmettere i corrispettivi se non c’è linea?" },
    {
      type: "p",
      text: "Hai **12 giorni**. Le specifiche tecniche dell’Agenzia delle Entrate prevedono che la trasmissione avvenga entro 12 giorni dalla data di memorizzazione dei corrispettivi, che coincide con la data di effettuazione delle operazioni. Una linea che manca per una sera o per un fine settimana, quindi, rientra ampiamente nel termine.",
    },
    {
      type: "p",
      text: "Per chi ha problemi di connessione al momento della chiusura di cassa, la guida dell’Agenzia indica due strade:",
    },
    {
      type: "ul",
      items: [
        "**Ricollegare il registratore a internet** e lasciare che completi l’invio.",
        "**Caricare il file a mano.** Copi il file dei corrispettivi sigillato dal registratore su una memoria esterna, per esempio una chiavetta USB, e lo carichi dal portale “Fatture e Corrispettivi”. Le specifiche tecniche (paragrafo 2.8.1) indicano la voce “Procedure di Emergenza > Assenza di rete” nella sezione “Area Gestore ed Esercente” e precisano che la funzione va usata solo in caso di effettiva necessità. Come si estrae il file dipende dal modello: chiedilo al tuo tecnico.",
      ],
    },
    {
      type: "p",
      text: "Se invece la linea funziona e l’invio fallisce lo stesso, il problema è un altro: lo trovi in [Il registratore telematico non trasmette i corrispettivi](/news/registratore-telematico-non-trasmette-corrispettivi).",
    },
    { type: "h2", text: "Cosa non funziona senza internet?" },
    {
      type: "p",
      text: "Lo scontrino esce, ma intorno alla cassa possono fermarsi gli strumenti che hanno bisogno della rete. Quali, dipende da modelli, contratti e da come è fatto il tuo impianto: qui sotto trovi le domande da fare a chi te li ha forniti, prima che serva.",
    },
    {
      type: "ul",
      items: [
        "**POS.** Chiedi a chi te lo ha fornito come si collega il tuo terminale (rete del locale, SIM propria o entrambe) e cosa succede ai pagamenti quando la connessione manca.",
        "**Gestionale in cloud.** Alcuni programmi hanno una modalità offline che tiene in piedi la vendita, altri no: chiedilo al tuo fornitore.",
        "**Comande su palmari e tablet.** Dipende da come è costruito il sistema: fatti spiegare dal fornitore se le comande hanno bisogno di internet o solo della rete interna del locale.",
        "**Documento commerciale online.** È la procedura web gratuita dell’Agenzia, alternativa al registratore telematico. La guida dell’Agenzia avverte che, a differenza del registratore, richiede una connessione di rete attiva nel momento in cui generi il documento. Senza rete non puoi usarla.",
      ],
    },
    { type: "h2", text: "Se manca la corrente la cassa funziona?" },
    {
      type: "p",
      text: "Dipende dal modello. Un registratore alimentato solo dalla presa si spegne. Un registratore con batteria continua a lavorare finché ha carica, e una cassa da banco può restare accesa se è collegata a un gruppo di continuità adeguato.",
    },
    {
      type: "p",
      text: "Sui dati già registrati le specifiche tecniche dell’Agenzia danno due garanzie: i dati di ogni operazione sono scritti in una memoria permanente (il giornale di fondo elettronico) e, in assenza di alimentazione elettrica esterna, una batteria tampone garantisce il mantenimento dei dati contenuti nella memoria di lavoro.",
    },
    {
      type: "p",
      text: "Le stesse specifiche (paragrafo 2.11) prevedono che, se la cassa si spegne senza che sia stata fatta la chiusura giornaliera, alla prima riaccensione esegua come prima operazione la chiusura della giornata rimasta aperta, con la data di quella giornata.",
    },
    {
      type: "p",
      text: "Ricorda che un blackout spegne anche il router e gli altri apparecchi collegati alla presa. Quindi, salvo che tu abbia una riserva, quando manca la corrente manca anche la linea del locale.",
    },
    {
      type: "table",
      caption: "Cosa aspettarti, scenario per scenario",
      head: ["Strumento", "Senza internet", "Senza corrente"],
      rows: [
        ["Registratore telematico alimentato dalla presa", "Emette gli scontrini, invia dopo", "Spento, salvo gruppo di continuità"],
        ["Registratore telematico con batteria", "Emette gli scontrini, invia dopo", "Funziona finché dura la carica"],
        ["POS", "Dipende da modello e collegamento", "Dipende da modello e batteria"],
        ["Gestionale in cloud e comande", "Dipende dal programma", "Dipende dagli apparecchi e dalla rete"],
        ["Documento commerciale online", "Non utilizzabile", "Serve un dispositivo carico e connesso"],
      ],
    },
    { type: "h2", text: "Cosa faccio se la cassa è spenta e non posso emettere lo scontrino?" },
    {
      type: "p",
      text: "Qui serve una premessa onesta: nella guida e nelle specifiche tecniche dell’Agenzia delle Entrate, citate in fondo, non c’è una procedura dedicata alla mancanza di corrente. Quello che i documenti disciplinano è il **mancato o irregolare funzionamento** del registratore.",
    },
    {
      type: "p",
      text: "Per quel caso le specifiche tecniche (paragrafo 2.8.2) richiamano il punto 5 del provvedimento del 28 ottobre 2016: «in caso di mancato o irregolare funzionamento, per qualsiasi motivo, del Registratore Telematico», l’esercente richiede tempestivamente l’intervento di un tecnico abilitato e, fino al ripristino o finché non si dota di un altro registratore in servizio, annota i dati dei corrispettivi delle singole operazioni giornaliere su un apposito registro, che può essere tenuto anche in modalità informatica.",
    },
    {
      type: "p",
      text: "Sempre secondo le specifiche, la funzione del portale per inserire a mano i corrispettivi (“Procedure di Emergenza > Dispositivo Fuori Servizio”) è pensata per i dispositivi con malfunzionamenti e si può usare solo dopo aver comunicato al sistema lo stato di “fuori servizio” del registratore.",
    },
    {
      type: "note",
      title: "Un blackout non è un guasto: chiedi prima al commercialista",
      text: "I documenti che abbiamo consultato non dicono se queste regole valgono anche per una cassa che funziona ma resta spenta per mancanza di corrente. Non possiamo quindi darti una regola certa: chiedi al tuo commercialista, prima che capiti, come documentare gli incassi in quella situazione. Se alla riaccensione la cassa non riparte, segui la guida [Registratore di cassa guasto: cosa fare](/news/registratore-di-cassa-guasto-cosa-fare).",
    },
    { type: "h2", text: "Come mi preparo a un blackout o a una linea che cade?" },
    {
      type: "p",
      text: "Questi sono consigli pratici, non obblighi. Conviene sistemarli in un giorno tranquillo e verificarli con chi ti ha fornito gli apparecchi, perché non tutti i modelli si comportano allo stesso modo.",
    },
    {
      type: "ul",
      items: [
        "**Una connessione di riserva.** Per esempio un router 4G con una SIM dati oppure l’hotspot del telefono. Chiedi al tecnico se il tuo registratore può collegarsi e fai una prova: scoprire durante il servizio che non si aggancia non aiuta.",
        "**Un gruppo di continuità (UPS).** È una batteria che si mette tra la presa e gli apparecchi per tenerli accesi quando manca la corrente. L’autonomia dipende dalla capacità e da quanto ci attacchi: fatti consigliare su quale scegliere e cosa collegarci.",
        "**Un modo per incassare con la carta.** Chiedi al fornitore del POS se il tuo terminale ha batteria e connessione mobile, o se esiste un modello che le ha.",
        "**Una procedura scritta per il personale.** Un foglio vicino alla cassa con le istruzioni concordate con il commercialista, come attivare la connessione di riserva e chi chiamare.",
      ],
    },
    {
      type: "p",
      text: "Chi lavora spesso senza presa, come al mercato o in un chiosco, può partire da un registratore con batteria: trovi due esempi tra le [soluzioni per ambulanti](/soluzioni/ambulanti). Per le attività aperte pochi mesi all’anno c’è una guida dedicata: [Registratore di cassa stagionale: chiusura e riapertura](/news/registratore-di-cassa-attivita-stagionali).",
    },
    {
      type: "p",
      text: "Se sei in Trentino e vuoi valutare cassa e POS adatti a come lavori, [scrivi a Mifro](/contatti) indicando i modelli che usi.",
    },
  ],
  sources: [
    {
      title: "Agenzia delle Entrate: guida «Memorizzazione elettronica e trasmissione telematica dei corrispettivi» (aggiornamento marzo 2025)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/memorizzazione_elettronica_e_trasmissione_telematica_corrispettivi_marzo25",
    },
    {
      title: "Agenzia delle Entrate: specifiche tecniche dei registratori telematici, versione 11.2 (pubblicate il 4 marzo 2026, ultimo aggiornamento 21 aprile 2026)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2+agg.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21?t=1776774168529",
    },
    {
      title: "Agenzia delle Entrate: pagina «Corrispettivi da Registratori telematici», con le specifiche tecniche vigenti",
      url: "https://www.agenziaentrate.gov.it/portale/schede/comunicazioni/fatture-e-corrispettivi/fatture-e-corrispettivi-st/st-invio-corrispettivi-registratori-telematici-temp",
    },
    {
      title: "Normattiva: decreto-legge 18 ottobre 2012, n. 179, articolo 15 (pagamenti elettronici)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179~art15",
    },
  ],
  faq: [
    {
      question: "Se va via la corrente perdo gli scontrini già battuti?",
      answer:
        "Le specifiche tecniche dell’Agenzia delle Entrate prevedono che i dati di ogni operazione siano scritti nella memoria permanente del registratore telematico e che, in assenza di alimentazione elettrica esterna, una batteria tampone garantisca il mantenimento dei dati della memoria di lavoro. Se alla riaccensione qualcosa non torna, chiama il tecnico.",
    },
    {
      question: "Ho fatto la chiusura di cassa senza linea: devo rifarla?",
      answer:
        "No. La guida dell’Agenzia delle Entrate spiega che con la chiusura il registratore predispone e sigilla il file dei corrispettivi e lo trasmette non appena riesce a collegarsi. Se hai problemi di connessione hai 12 giorni per trasmetterlo: ricollegando il registratore a internet oppure caricando il file dal portale Fatture e Corrispettivi.",
    },
    {
      question: "Devo avvisare l’Agenzia delle Entrate se resto senza internet?",
      answer:
        "La guida dell’Agenzia delle Entrate non prevede una comunicazione per i problemi di connessione: indica 12 giorni di tempo per trasmettere i corrispettivi, ricollegando il registratore a internet oppure caricando il file sigillato dal portale Fatture e Corrispettivi, con la procedura di emergenza per l’assenza di rete.",
    },
    {
      question: "Se il POS non funziona per un blackout posso rifiutare la carta?",
      answer:
        "L’articolo 15 del decreto-legge 179 del 2012 stabilisce che l’obbligo di accettare i pagamenti con carta «non trova applicazione nei casi di oggettiva impossibilità tecnica». La norma non elenca quali casi vi rientrano: per il tuo caso chiedi al commercialista o alla tua associazione di categoria. In ogni caso avvisa il cliente prima che ordini o arrivi alla cassa.",
    },
    {
      question: "Posso collegare la cassa all’hotspot del telefono?",
      answer:
        "Dipende dal registratore e da come si collega alla rete: non tutti i modelli hanno il Wi-Fi. Chiedilo al tecnico che lo ha installato e fai una prova in un momento tranquillo, senza aspettare il primo guasto.",
    },
    {
      question: "Il locale resta chiuso qualche giorno dopo una nevicata: devo fare qualcosa sulla cassa?",
      answer:
        "Per i giorni di chiusura la guida dell’Agenzia delle Entrate dice che non devi fare registrazioni: alla prima trasmissione dopo la riapertura il registratore telematico comunica da solo le giornate di chiusura. Se l’interruzione supera i 12 giorni, o non sai quanto durerà, è possibile informare prima l’Agenzia impostando il registratore in “fuori servizio” con il codice 608, periodo di inattività.",
    },
  ],
  cta: {
    title: "Vuoi un punto cassa adatto a come lavori?",
    description:
      "Indicaci i modelli di cassa e POS che usi e il comune della tua attività. Valutiamo con te le soluzioni di cassa e di pagamento più adatte.",
    showPhone: true,
  },
};
