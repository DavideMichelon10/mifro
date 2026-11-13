import type { Article } from "../article-types";

export const article: Article = {
  slug: "registratore-telematico-non-trasmette-corrispettivi",
  title: "Registratore telematico non trasmette i corrispettivi: cosa fare",
  date: "2026-11-13",
  revisedAt: "2026-11-13",
  category: "problemi",
  type: "news",
  description:
    "Il registratore telematico non trasmette i corrispettivi? Hai 12 giorni: i controlli da fare, l’invio dal portale dell’Agenzia e quando chiamare il tecnico.",
  answer:
    "Se il registratore telematico non trasmette i corrispettivi, non sei subito fuori regola: la trasmissione può avvenire entro 12 giorni dalla data delle vendite e la cassa ritenta da sola. Controlla la connessione e lasciala accesa. Se la rete non torna, copia il file della chiusura su una chiavetta USB e caricalo sul portale Fatture e Corrispettivi con la procedura «Assenza di rete». Se l’invio viene scartato, chiama il tecnico.",
  body: [
    { type: "h2", text: "Entro quanti giorni vanno trasmessi i corrispettivi?" },
    {
      type: "p",
      text: "Hai **12 giorni** dalla data in cui hai fatto le vendite. Lo stabilisce il provvedimento dell’Agenzia delle Entrate del 28 ottobre 2016: i corrispettivi (cioè gli incassi della giornata) si memorizzano subito, ma la trasmissione può avvenire entro 12 giorni dall’operazione.",
    },
    {
      type: "p",
      text: "Nel frattempo la cassa non resta ferma. Alla chiusura giornaliera prepara un file con i totali, lo sigilla e prova a inviarlo. Se l’invio non va a buon fine, le regole tecniche dell’Agenzia le impongono di **ritentare da sola**, più volte, con un intervallo minimo di 15/30 minuti tra un tentativo e l’altro, finché il file non viene preso in carico. Per questo la prima cosa da fare è lasciarla accesa e collegata.",
    },
    {
      type: "p",
      text: "Due cose da sapere per non allarmarti inutilmente. L’invio parte a un orario casuale, non per forza nell’istante della chiusura, e non avviene mai tra le 3 e le 5 del mattino. E nei giorni in cui sei chiuso non devi fare nulla: alla riapertura è il registratore a comunicare le giornate di chiusura.",
    },

    { type: "h2", text: "Come controllo se l’invio è arrivato all’Agenzia delle Entrate?" },
    {
      type: "p",
      text: "Il modo più veloce è il **QR code** applicato sul registratore: inquadralo con il telefono. Si apre una pagina dell’Agenzia delle Entrate con i dati dell’apparecchio, aggiornati in tempo reale.",
    },
    {
      type: "ul",
      items: [
        "**«Ultima trasmissione da dispositivo»**: è la data dell’ultima trasmissione effettuata. Le specifiche tecniche dell’Agenzia la prevedono proprio per capire se la cassa non trasmette da più di 12 giorni.",
        "**Stato**: deve comparire «trasmette i dati all’agenzia». Le altre diciture previste sono «non trasmette i dati all’agenzia» e «dispositivo non utilizzabile»; se la cassa non trasmette, tra parentesi trovi lo stato effettivo (per esempio «disattivato»).",
      ],
    },
    {
      type: "p",
      text: "L’altra strada è l’area riservata del portale **Fatture e Corrispettivi**, a cui accedi con SPID, CIE o CNS: lì l’Agenzia mette a disposizione le informazioni che riceve dal tuo registratore. Se il portale lo segue il commercialista, chiedi a lui di controllare.",
    },

    { type: "h2", text: "Perché il registratore telematico non trasmette?" },
    {
      type: "p",
      text: "La prima cosa da controllare è la rete: la cassa può funzionare e stampare, ma non raggiungere i server dell’Agenzia. Le altre cause richiedono il tecnico.",
    },
    {
      type: "table",
      caption: "Cause possibili della mancata trasmissione dei corrispettivi",
      head: ["Causa", "Come si riconosce", "Chi la risolve"],
      rows: [
        [
          "Rete assente o instabile",
          "Anche gli altri apparecchi sono senza internet; router spento; SIM dati senza campo",
          "Tu, poi l’operatore internet",
        ],
        [
          "File scartato",
          "L’Agenzia risponde con un codice di errore: l’invio risulta non effettuato",
          "Il tecnico",
        ],
        [
          "Stato sul portale diverso da quello della cassa",
          "Messaggio «Dispositivo bloccato, necessario intervento tecnico per lo sblocco»",
          "Il tecnico abilitato",
        ],
        [
          "Guasto che compromette il certificato del dispositivo",
          "Messaggio di guasto sulla cassa",
          "Il tecnico abilitato",
        ],
        [
          "Memoria quasi piena",
          "Avviso con la percentuale di memoria rimasta",
          "Il tecnico: chiamalo prima che si riempia",
        ],
      ],
    },
    {
      type: "p",
      text: "Qualche spiegazione. Il **certificato del dispositivo** è la «firma» elettronica con cui la cassa sigilla ogni file: lo rilascia l’Agenzia e, secondo le specifiche tecniche, vale 8 anni. L’obbligo dei corrispettivi telematici è scattato il 1° luglio 2019 per chi aveva un volume d’affari sopra i 400.000 euro e il 1° gennaio 2020 per gli altri: se la tua cassa è di quegli anni, chiedi al tecnico quando scade il certificato e cosa va fatto. Lo **stato** è la situazione dell’apparecchio registrata dall’Agenzia (per esempio in servizio, fuori servizio, disattivato): se viene cambiato solo sul portale, la cassa non si allinea da sola e l’invio riceve esito negativo; la cassa segnala il blocco e serve il tecnico abilitato. Quanto alla **memoria**, la cassa deve avvisarti quando si avvicina all’esaurimento, non oltre il 90% della capacità, indicando la percentuale rimasta; quando è piena interrompe le funzioni fiscali.",
    },

    { type: "h2", text: "Cosa faccio, in ordine?" },
    {
      type: "p",
      text: "Parti dai controlli che puoi fare da solo e non aspettare l’ultimo giorno utile. Intanto continua a lavorare: la cassa memorizza le vendite ed emette i documenti commerciali anche senza rete.",
    },
    {
      type: "ol",
      items: [
        "**Leggi il messaggio** sul display o sullo scontrino di chiusura e segnati il codice di errore, se c’è. Non resettare la cassa.",
        "**Controlla la connessione**: router acceso, cavo di rete inserito o Wi-Fi collegato, SIM dati con campo e credito. Prova se un altro apparecchio sulla stessa rete naviga.",
        "**Lascia la cassa accesa e collegata**: ritenta da sola.",
        "**Verifica che sia arrivato**: inquadra il QR code e guarda la data dell’ultima trasmissione.",
        "**Se la rete non torna**, non aspettare la fine dei 12 giorni: copia il file della chiusura su una chiavetta USB e caricalo dal portale con la procedura «Assenza di rete».",
        "**Se l’invio viene scartato o la cassa segnala un blocco**, chiama subito il tecnico.",
        "**Se i 12 giorni sono già passati**, avvisa subito il commercialista: i dati vanno comunque trasmessi.",
      ],
    },
    {
      type: "p",
      text: "Se manca la corrente o la linea è proprio assente, trovi i dettagli in [Internet o corrente assenti: la cassa funziona?](/news/internet-o-corrente-assenti-cassa-funziona).",
    },

    { type: "h2", text: "Come invio i corrispettivi dal portale se la cassa non si collega?" },
    {
      type: "p",
      text: "Con la procedura di emergenza **«Assenza di rete»** del portale Fatture e Corrispettivi: carichi tu, da un computer collegato a internet, il file che la cassa ha già preparato e sigillato.",
    },
    {
      type: "ol",
      items: [
        "Fai la chiusura giornaliera come sempre.",
        "Con la funzione prevista dal tuo modello, copia il file XML sigillato su una memoria esterna, per esempio una chiavetta USB. Se non sai come fare, chiedi al tecnico.",
        "Entra nel portale Fatture e Corrispettivi, area «Corrispettivi», sezione «Area Gestore ed Esercente».",
        "Apri «Procedure di Emergenza > Assenza di rete», premi «Sfoglia», scegli il file e invialo.",
      ],
    },
    {
      type: "p",
      text: "L’invio viene registrato come «trasmissione mediante upload» e i dati sono attribuiti al titolare del registratore, chiunque carichi il file: può farlo anche il commercialista con la delega. L’Agenzia precisa che la funzione ha valore solo di emergenza e va usata in caso di effettiva necessità. I nomi delle voci sono quelli riportati nelle specifiche tecniche dell’Agenzia (versione 11.2, paragrafo 2.8.1): se sul portale non li ritrovi uguali, chiedi al commercialista o al tecnico.",
    },
    {
      type: "note",
      title: "Rifugi, malghe e banchi al mercato",
      text: "Dove il segnale va e viene, i 12 giorni sono il tuo margine: puoi ricollegare la cassa quando torni in una zona coperta, oppure portare a valle il file su chiavetta e caricarlo dal portale. Per le casse portatili vedi anche le [soluzioni per ambulanti](/soluzioni/ambulanti).",
    },

    { type: "h2", text: "Cosa succede se l’invio viene scartato?" },
    {
      type: "p",
      text: "Un invio scartato vale come non fatto. I tentativi automatici della cassa riguardano gli invii falliti per motivi diversi dallo scarto: qui va corretta la causa e trasmesso il file corretto **entro i cinque giorni lavorativi** successivi alla comunicazione di scarto.",
    },
    {
      type: "p",
      text: "Le regole tecniche dicono che risolvere lo scarto spetta all’esercente, con il supporto del produttore o del tecnico abilitato. Per tre errori specifici (data nel futuro, codice 00203; matricola del punto cassa mancante, 00212; codice attività ATECO inesistente, 00215) le stesse specifiche (paragrafo 2.8.3) indicano sul portale la funzione «Procedure di Emergenza > Trasmissione Scartata», utilizzabile entro 30 giorni dal primo invio. Sono casi da gestire con il tecnico.",
    },

    { type: "h2", text: "Quando devo chiamare il tecnico?" },
    {
      type: "p",
      text: "Chiamalo quando il problema non è la rete, oppure quando la rete funziona e la cassa continua a non trasmettere.",
    },
    {
      type: "ul",
      items: [
        "L’invio risulta scartato o compare un codice di errore.",
        "La cassa segnala un blocco, un problema di certificato o di memoria.",
        "Internet funziona sugli altri apparecchi, ma dopo un giorno la data dell’ultima trasmissione non si aggiorna.",
        "Non riesci a estrarre il file per caricarlo dal portale.",
        "Il QR code mostra «non trasmette i dati all’agenzia» o «dispositivo non utilizzabile».",
      ],
    },
    {
      type: "p",
      text: "Se la cassa non memorizza più le vendite o non stampa, è un guasto e le regole cambiano: leggi [Registratore di cassa guasto: cosa fare](/news/registratore-di-cassa-guasto-cosa-fare). Se lavori in Trentino puoi rivolgerti all’[assistenza Mifro](/prodotti-assistenza#riparazioni): indica modello, messaggio di errore e comune.",
    },

    { type: "h2", text: "Cosa rischio se i corrispettivi non vengono trasmessi?" },
    {
      type: "p",
      text: "Se trasmetti entro i 12 giorni, anche caricando il file dal portale, sei nei termini. Oltre quel termine la trasmissione è tardiva o omessa e sono previste sanzioni.",
    },
    {
      type: "p",
      text: "La guida dell’Agenzia delle Entrate (aggiornamento di marzo 2025) indica una sanzione pari al **70% dell’imposta, con un minimo di 300 euro**, quando i corrispettivi non sono regolarmente memorizzati o trasmessi. Se invece la trasmissione omessa o tardiva non incide sulla corretta liquidazione dell’imposta, la sanzione è fissa: **100 euro per ciascuna trasmissione, fino a 1.000 euro per trimestre**. Esiste anche una sanzione accessoria, la sospensione dell’attività da tre giorni a un mese: la legge la collega a quattro violazioni distinte, in giorni diversi, contestate nell’arco di cinque anni.",
    },
    {
      type: "p",
      text: "Sono gli importi del decreto legislativo 471/1997 (articoli 6, 11 e 12) nel testo in vigore a novembre 2026. Normattiva segnala che dal 1° gennaio 2027 il decreto risulta abrogato dal decreto legislativo 173/2024: per le violazioni commesse da quella data chiedi al commercialista quale norma si applica.",
    },
    {
      type: "p",
      text: "L’Agenzia ha chiarito nella circolare 3/E del 2020 che l’invio in ritardo resta una violazione anche se fatto spontaneamente, ma che è possibile il ravvedimento operoso, cioè la regolarizzazione volontaria con sanzione ridotta. Quale sanzione si applichi al tuo caso lo valuta il commercialista: avvisalo appena ti accorgi che un invio è saltato.",
    },
  ],
  sources: [
    {
      title: "AdE: specifiche tecniche dei registratori telematici, versione 11.2 (pubblicata il 4 marzo 2026, aggiornata il 21 aprile 2026)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21",
    },
    {
      title: "AdE: provvedimento del 28 ottobre 2016, testo coordinato (termini di trasmissione e scarti)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/296529/Provvedimento+28102016_Testo+Coordinato_20240424.pdf/841f98a8-6c02-9324-cc40-a13738266e88",
    },
    {
      title: "AdE: guida «Memorizzazione elettronica e trasmissione telematica dei corrispettivi» (marzo 2025)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/memorizzazione_elettronica_e_trasmissione_telematica_corrispettivi_marzo25",
    },
    {
      title: "AdE: «Se non si rispetta l’obbligo» (sanzioni)",
      url: "https://www.agenziaentrate.gov.it/portale/se-non-si-rispetta-l-obbligo",
    },
    {
      title: "Normattiva: decreto legislativo 18 dicembre 1997, n. 471, articolo 6 (testo vigente al 13 novembre 2026)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-12-18;471~art6!vig=2026-11-13",
    },
    {
      title: "AdE: il portale «Fatture e Corrispettivi» (modalità di accesso)",
      url: "https://www.agenziaentrate.gov.it/portale/aree-tematiche/fatturazione-elettronica/guida-fatturazione-elettronica/i-servizi-dell-agenzia-fe/il-portale-fatture-e-corrispettivi",
    },
    {
      title: "AdE: circolare n. 3/E del 21 febbraio 2020 (paragrafo 5: ritardo e ravvedimento; gli importi lì indicati sono quelli dell’epoca)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/2338359/Circolare+3+corrispettivi+21_02_20.pdf/44b98c61-e8cc-6840-4ead-287024092e98",
    },
  ],
  faq: [
    {
      question: "La cassa deve restare sempre collegata a internet?",
      answer:
        "No. Il registratore telematico memorizza le vendite ed emette i documenti commerciali anche senza rete. La connessione serve al momento della chiusura di cassa e deve restare attiva finché la trasmissione non è completata. Lo indica la guida dell’Agenzia delle Entrate sui corrispettivi telematici.",
    },
    {
      question: "Devo fare la chiusura giornaliera anche se la cassa non riesce a trasmettere?",
      answer:
        "Sì. È con la chiusura giornaliera che il registratore genera e sigilla il file dei corrispettivi della giornata. È quel file che viene inviato: dalla cassa quando torna la rete, oppure dal portale con la procedura «Assenza di rete».",
    },
    {
      question: "Nei giorni di chiusura devo trasmettere qualcosa?",
      answer:
        "No. Alla prima trasmissione dopo la riapertura è il registratore a comunicare le giornate di chiusura. Se resti chiuso più di 12 giorni, per esempio per una chiusura stagionale, puoi impostare prima la cassa in «fuori servizio» con il codice 608, periodo di inattività: tornerà in servizio alla prima trasmissione utile.",
    },
    {
      question: "Posso correggere un invio già trasmesso con dati sbagliati?",
      answer:
        "Non con un secondo file: le specifiche tecniche dell’Agenzia delle Entrate escludono l’invio di file correttivi di file già trasmessi. Se i dati sono errati o parziali puoi segnalare l’anomalia con la procedura online disponibile sul sito dell’Agenzia. Coinvolgi il commercialista prima di procedere.",
    },
    {
      question: "Il commercialista può caricare il file dei corrispettivi al posto mio?",
      answer:
        "Sì, se è un intermediario con la delega ai servizi dei corrispettivi. Le procedure di emergenza del portale sono disponibili sia all’esercente sia agli intermediari delegati. I dati vengono comunque attribuiti al titolare del registratore che ha sigillato il file.",
    },
  ],
  cta: {
    title: "La cassa non trasmette e la rete funziona?",
    description:
      "Indicaci il modello del registratore, il messaggio o il codice di errore e il comune della tua attività. I tecnici Mifro valutano con te se serve un intervento da remoto o sul posto.",
    showPhone: true,
  },
};
