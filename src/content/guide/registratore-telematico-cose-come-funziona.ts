import type { Article } from "../article-types";

export const article: Article = {
  slug: "registratore-telematico-cose-come-funziona",
  title: "Registratore telematico: cos’è e come funziona",
  date: "2026-11-13",
  revisedAt: "2026-11-13",
  category: "basi",
  type: "news",
  description:
    "Cos’è il registratore telematico e come funziona: documento commerciale, chiusura giornaliera, verificazione periodica e obblighi, spiegati con le fonti.",
  answer:
    "Il registratore telematico (RT) è la cassa che registra ogni vendita, stampa il documento commerciale per il cliente e, alla chiusura giornaliera, crea un file con gli incassi del giorno, lo sigilla e lo invia via internet all’Agenzia delle Entrate. Lo attiva un tecnico di un laboratorio abilitato, che lo verifica ogni due anni. Ha sostituito il vecchio registratore di cassa e lo scontrino fiscale.",
  body: [
    { type: "h2", text: "Cos’è il registratore telematico, in parole semplici?" },
    {
      type: "p",
      text: "È un registratore di cassa capace di collegarsi a internet per mandare gli incassi all’Agenzia delle Entrate. Il provvedimento dell’Agenzia del 28 ottobre 2016 lo definisce come un insieme di hardware e software che serve a **registrare, memorizzare in memorie permanenti e inalterabili, elaborare, sigillare elettronicamente e trasmettere** i dati fiscali.",
    },
    {
      type: "p",
      text: "In pratica fa tre cose. **Memorizza** ogni vendita nel momento in cui la batti. **Sigilla** i dati con un sigillo elettronico, che ne garantisce autenticità e inalterabilità. **Trasmette** all’Agenzia i corrispettivi, cioè gli incassi delle vendite al pubblico per le quali non emetti fattura. L’obbligo nasce dall’articolo 2 del decreto legislativo 127 del 2015 e l’Agenzia spiega che dal 1° gennaio 2021 scontrini e ricevute fiscali sono stati sostituiti in via definitiva.",
    },

    { type: "h2", text: "Che differenza c’è tra registratore di cassa e registratore telematico?" },
    {
      type: "p",
      text: "Il vecchio registratore di cassa, detto misuratore fiscale, teneva i dati al proprio interno e non li inviava a nessuno. Il registratore telematico li invia all’Agenzia delle Entrate. Per legge, memorizzazione e invio sostituiscono anche l’annotazione degli incassi sul registro dei corrispettivi.",
    },
    {
      type: "table",
      caption: "Vecchio registratore di cassa e registratore telematico a confronto",
      head: ["", "Vecchio registratore", "Registratore telematico"],
      rows: [
        ["Cosa rilascia", "Scontrino fiscale", "Documento commerciale"],
        ["Dove finiscono i dati", "Restano nella cassa", "Inviati all’Agenzia delle Entrate"],
        ["Registro dei corrispettivi", "Da compilare", "Sostituito dall’invio"],
        ["Internet", "Non serve", "Serve alla chiusura"],
      ],
    },
    {
      type: "p",
      text: "Nel linguaggio di tutti i giorni si dice ancora «registratore di cassa» e «scontrino». Va benissimo: oggi indicano quasi sempre il registratore telematico e il documento commerciale.",
    },

    { type: "h2", text: "Scontrino o documento commerciale: cosa cambia?" },
    {
      type: "p",
      text: "Il foglietto che consegni al cliente oggi si chiama documento commerciale. Per il cliente, spiega l’Agenzia delle Entrate, cambia poco: il documento commerciale non ha valore fiscale, però può conservarlo **come garanzia, per un cambio merce o come prova d’acquisto**.",
    },
    {
      type: "p",
      text: "Secondo le specifiche tecniche dell’Agenzia, sopra trovi sempre la tua partita IVA, la data, la matricola del registratore e il numero del documento, formato dal numero della chiusura e da un progressivo di quattro cifre ciascuno (per esempio 0123-0045). La circolare 3/E del 2020 ricorda che il documento riporta anche la descrizione, che può essere sintetica, di cosa hai venduto e l’importo complessivo e quello pagato.",
    },
    {
      type: "p",
      text: "Il **codice fiscale o la partita IVA del cliente** vanno aggiunti quando il cliente li chiede, non oltre il momento dell’operazione: in quel caso la circolare parla di «documento commerciale valido ai fini fiscali». Se ti accorgi di un errore dopo aver emesso il documento, le specifiche prevedono un solo rimedio: un [documento di annullo o di reso](/news/scontrino-sbagliato-annullo-reso).",
    },

    { type: "h2", text: "Come funziona, dall’attivazione alla dismissione?" },
    {
      type: "p",
      text: "Ogni registratore telematico ha una vita tracciata dall’Agenzia delle Entrate, dal primo collegamento fino al giorno in cui lo togli dal banco. Queste le tappe previste dal provvedimento e dalle specifiche tecniche.",
    },
    {
      type: "ol",
      items: [
        "**Censimento.** Il tecnico collega la cassa al sistema dell’Agenzia, che le rilascia un certificato digitale: da lì l’apparecchio è «censito».",
        "**Attivazione.** La cassa viene associata alla tua partita IVA. La esegue il personale di un laboratorio abilitato dall’Agenzia e vale anche come prima verificazione periodica.",
        "**QR code.** Finita l’attivazione, l’Agenzia ti mette a disposizione nell’area riservata un QR code da applicare sulla cassa, visibile ai clienti. Chi lo inquadra vede i dati dell’apparecchio e del titolare, l’ultima verificazione e se la cassa trasmette.",
        "**Messa in servizio.** Il registratore è «in servizio» dal momento del primo invio dei corrispettivi.",
        "**Uso quotidiano.** Batti le vendite, consegni i documenti commerciali e a fine giornata fai la chiusura.",
        "**Verificazione periodica.** Ogni due anni un tecnico abilitato controlla la cassa.",
        "**Fuori servizio.** È lo stato che comunichi all’Agenzia quando la cassa non riesce a trasmettere, per esempio per un malfunzionamento o per un periodo di inattività. Torna «in servizio» da sola alla prima trasmissione utile.",
        "**Disattivazione o dismissione.** Se cedi la cassa a un altro esercente, viene disattivata e poi associata alla nuova partita IVA. Se la rottami, viene dismessa: il certificato è revocato e l’apparecchio è cancellato dall’anagrafica dell’Agenzia.",
      ],
    },
    {
      type: "p",
      text: "Le informazioni su attivazione, messa in servizio, verificazione periodica e dismissione compongono il «libretto di dotazione informatico» della cassa, che l’Agenzia ti mette a disposizione in un’area riservata del suo sito. Per i casi storti ci sono guide dedicate: [registratore guasto](/news/registratore-di-cassa-guasto-cosa-fare) e [cassa che funziona ma non trasmette](/news/registratore-telematico-non-trasmette-corrispettivi).",
    },

    { type: "h2", text: "Cos’è la chiusura giornaliera?" },
    {
      type: "p",
      text: "È l’operazione di fine giornata con cui la cassa somma gli incassi, crea un file, lo sigilla e lo invia all’Agenzia delle Entrate. L’Agenzia spiega che file, sigillo e invio sono automatici, senza intervento dell’esercente. Il nostro consiglio è comunque di controllare che l’invio sia andato a buon fine.",
    },
    {
      type: "p",
      text: "Durante il giorno il registratore può lavorare anche senza rete: internet serve alla chiusura. Se in quel momento la linea manca, cosa che in quota o in una valle laterale può capitare, hai **12 giorni** dalla data dell’operazione per completare la trasmissione. Trovi i dettagli in [cosa funziona senza internet o senza corrente](/news/internet-o-corrente-assenti-cassa-funziona).",
    },

    { type: "h2", text: "Ogni quanto va fatta la verificazione periodica?" },
    {
      type: "p",
      text: "Ogni due anni. Il punto 1.7 del provvedimento del 28 ottobre 2016 prevede una verificazione «con periodicità biennale», eseguita dal personale dei laboratori abilitati; la prima coincide con l’attivazione. Secondo le specifiche tecniche possono farla i laboratori e i fabbricanti, purché autorizzati dall’Agenzia delle Entrate e compresi nell’elenco pubblicato sul suo sito.",
    },
    {
      type: "p",
      text: "Sempre secondo le specifiche, il tecnico controlla almeno che il sigillo fiscale sia integro e, con una prova a campione, che la cassa registri, chiuda e trasmetta correttamente. L’esito viene inviato all’Agenzia con la prima trasmissione successiva. La cassa deve avvisarti a partire da 30 giorni prima della scadenza; se la superi, sulla chiusura giornaliera compare la scritta «Registratore Telematico privo di VP».",
    },

    { type: "h2", text: "Chi è obbligato ad avere il registratore telematico e chi è esonerato?" },
    {
      type: "p",
      text: "È obbligato chi vende beni o servizi al pubblico senza dover emettere fattura, salvo che il cliente la chieda: commercio al minuto e attività assimilate. L’Agenzia delle Entrate cita espressamente anche artigiani, alberghi e ristoranti, che prima rilasciavano la ricevuta fiscale. L’elenco completo è nell’articolo 22 del decreto IVA: comprende, tra le altre, le vendite al minuto in locali aperti al pubblico o in forma ambulante, le prestazioni alberghiere, la somministrazione di alimenti e bevande nei pubblici esercizi e i servizi resi dalle imprese in locali aperti al pubblico, in forma ambulante o a casa del cliente. Se vendi ai mercati, leggi la guida su [mercati e mercatini](/news/registratore-di-cassa-ambulanti-mercatini).",
    },
    {
      type: "p",
      text: "Gli esoneri sono pochi e riguardano singole operazioni, elencate dal decreto ministeriale del 10 maggio 2019: quelle che già prima non richiedevano scontrino o ricevuta (l’Agenzia fa l’esempio delle corse dei taxi e della vendita di giornali), il trasporto pubblico collettivo di persone e le operazioni effettuate a bordo di navi, aerei e treni nei trasporti internazionali. Il decreto prevede che queste operazioni continuino a essere annotate nel registro dei corrispettivi. Se pensi di rientrarci, fallo verificare al tuo commercialista prima di rinunciare alla cassa.",
    },
    {
      type: "note",
      title: "Dal 2027 cambia il riferimento di legge",
      text: "Su Normattiva l’articolo 2 del decreto legislativo 127 del 2015 risulta in vigore fino al 31 dicembre 2026 e poi abrogato, nei commi che riguardano i corrispettivi, dal testo unico IVA (decreto legislativo 19 gennaio 2026, n. 10). Se cerchi la norma dal 2027, controlla il nuovo testo o chiedi al tuo commercialista.",
    },

    { type: "h2", text: "Si può fare a meno del registratore telematico?" },
    {
      type: "p",
      text: "Sì, in due modi. Il primo è **Documento commerciale online**, la procedura web gratuita dell’Agenzia delle Entrate dentro il portale Fatture e Corrispettivi, utilizzabile anche dal telefono. Richiede però la connessione attiva a ogni vendita. L’Agenzia la indica per chi fa poche operazioni, come un idraulico o un falegname, e ritiene più conveniente il registratore per chi ne fa molte, come un bar.",
    },
    {
      type: "p",
      text: "Il secondo è la **fattura**: se la emetti, per quell’operazione non serve il documento commerciale. Registratore e procedura web si possono anche usare insieme: l’Agenzia somma i corrispettivi arrivati dalla cassa e quelli registrati con la procedura web.",
    },
    {
      type: "p",
      text: "Se invece la cassa ti serve, le scelte da fare hanno guide a parte: [quanto costa un registratore di cassa](/news/quanto-costa-registratore-di-cassa), [noleggio o acquisto](/news/noleggio-o-acquisto-registratore-di-cassa) e [cassa tradizionale o touch](/news/cassa-tradizionale-o-touch-come-scegliere). Se lavori solo alcuni mesi l’anno, leggi quella sulle [attività stagionali](/news/registratore-di-cassa-attivita-stagionali). Se sei in Trentino e preferisci parlarne con un tecnico, puoi [contattare Mifro](/contatti).",
    },

    { type: "h2", text: "Cosa è cambiato nel 2026 con il collegamento POS–RT?" },
    {
      type: "p",
      text: "Per le operazioni effettuate dal 1° gennaio 2026, il POS con cui incassi i corrispettivi va collegato al registratore telematico (o alla procedura Documento commerciale online) con cui li certifichi. Non è un collegamento fisico: è una registrazione che si fa nell’area riservata del portale Fatture e Corrispettivi, con la procedura disponibile dal 5 marzo 2026, e secondo le FAQ dell’Agenzia non richiede di cambiare o adeguare la cassa. L’obbligo viene dalla legge 207 del 2024 (articolo 1, commi 74 e 77) ed è attuato dal provvedimento dell’Agenzia delle Entrate del 31 ottobre 2025. Le stesse FAQ escludono il POS usato solo per operazioni esonerate dal documento commerciale e il caso in cui tutti gli incassi siano certificati con fattura. Passaggi e scadenze sono nella [guida al collegamento POS–RT](/news/guida-ade-collegamento-rt-pos).",
    },

    { type: "h2", text: "Le parole da conoscere" },
    {
      type: "table",
      caption: "Mini glossario del registratore telematico",
      head: ["Termine", "Cosa vuol dire"],
      rows: [
        ["RT", "Registratore telematico: la cassa che memorizza e trasmette gli incassi."],
        ["Documento commerciale", "Il foglio consegnato al cliente al posto dello scontrino fiscale."],
        ["Corrispettivi", "Gli incassi delle vendite al pubblico per le quali non emetti fattura."],
        ["Chiusura giornaliera", "Operazione di fine giornata che crea, sigilla e invia il file degli incassi."],
        ["Matricola", "Il codice che identifica in modo univoco la tua cassa. È stampato su ogni documento."],
        ["Fatture e Corrispettivi", "Il portale dell’Agenzia delle Entrate dove consulti i corrispettivi inviati e comunichi i cambi di stato della cassa."],
        ["Verificazione periodica", "Il controllo biennale eseguito da un tecnico di un laboratorio abilitato."],
      ],
    },
  ],
  sources: [
    {
      title: "Normattiva: decreto legislativo 5 agosto 2015, n. 127, articolo 2 (testo vigente fino al 31 dicembre 2026)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-08-05;127~art2!vig=2026-11-13",
    },
    {
      title: "Normattiva: decreto legislativo 19 gennaio 2026, n. 10, testo unico IVA",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2026-01-19;10",
    },
    {
      title: "Normattiva: DPR 26 ottobre 1972, n. 633, articolo 22 (commercio al minuto e attività assimilate)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:1972-10-26;633~art22!vig=2026-11-13",
    },
    {
      title: "Gazzetta Ufficiale n. 115 del 18 maggio 2019: decreto ministeriale 10 maggio 2019 (esoneri)",
      url: "https://www.gazzettaufficiale.it/eli/gu/2019/05/18/115/sg/pdf",
    },
    {
      title: "AdE: provvedimento del 28 ottobre 2016, testo coordinato",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/296529/Provvedimento+28102016_Testo+Coordinato_20240424.pdf/841f98a8-6c02-9324-cc40-a13738266e88",
    },
    {
      title: "AdE: specifiche tecniche dei registratori telematici, versione 11.2 (pubblicate il 4 marzo 2026, aggiornate il 21 aprile 2026)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2+agg.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21",
    },
    {
      title: "AdE: i corrispettivi elettronici (chi è obbligato, esoneri)",
      url: "https://www.agenziaentrate.gov.it/portale/i-corrispettivi-elettronici",
    },
    {
      title: "AdE: gli strumenti a disposizione (RT e Documento commerciale online)",
      url: "https://www.agenziaentrate.gov.it/portale/gli-strumenti-a-disposizione",
    },
    {
      title: "AdE: circolare n. 3/E del 21 febbraio 2020 (documento commerciale)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/2338359/Circolare+3+corrispettivi+21_02_20.pdf/44b98c61-e8cc-6840-4ead-287024092e98",
    },
    {
      title: "AdE: collegamento POS–RT (provvedimento del 31 ottobre 2025, guida e FAQ)",
      url: "https://www.agenziaentrate.gov.it/portale/collegamento-pos-rt",
    },
    {
      title: "AdE: FAQ sul collegamento POS–RT (aggiornate il 25 marzo 2026)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503",
    },
  ],
  faq: [
    {
      question: "Il registratore telematico funziona senza internet?",
      answer:
        "Sì, durante il giorno può registrare le vendite e stampare i documenti commerciali anche senza rete. La connessione serve al momento della chiusura, per inviare il file all’Agenzia delle Entrate. Se in quel momento manca, hai 12 giorni dalla data dell’operazione per completare la trasmissione.",
    },
    {
      question: "Devo fare la chiusura anche nei giorni in cui il locale è chiuso?",
      answer:
        "No. Nei giorni di chiusura non devi fare nulla: al primo invio dopo la riapertura il registratore comunica da solo i giorni senza incassi. Se resti chiuso più di 12 giorni, per esempio a fine stagione, puoi segnalare all’Agenzia delle Entrate il periodo di inattività impostando la cassa «fuori servizio».",
    },
    {
      question: "Cosa vede il cliente se inquadra il QR code sulla cassa?",
      answer:
        "Vede una pagina del sito dell’Agenzia delle Entrate con marca, modello e matricola del registratore, i dati dell’esercente, la data dell’ultima verificazione periodica, la data dell’ultima trasmissione e lo stato dell’apparecchio, cioè se trasmette o non trasmette i dati all’Agenzia. I dati si aggiornano in automatico.",
    },
    {
      question: "Posso usare sia il registratore telematico sia Documento commerciale online?",
      answer:
        "Sì. L’Agenzia delle Entrate fa l’esempio di chi usa il registratore in negozio e la procedura web per i lavori fuori sede. Il sistema somma i corrispettivi arrivati dai due strumenti e mostra il totale nel portale Fatture e Corrispettivi.",
    },
    {
      question: "Posso cedere il mio registratore telematico a un altro esercente?",
      answer:
        "Sì, ma non basta consegnarlo. La cassa va prima disattivata, cioè scollegata dalla tua partita IVA; poi il tecnico installatore la associa alla partita IVA del nuovo esercente. Attenzione a non dismetterla: la dismissione revoca il certificato e cancella l’apparecchio dall’anagrafica dell’Agenzia delle Entrate.",
    },
    {
      question: "Se il cliente mi dà il codice fiscale, vale anche il codice lotteria?",
      answer:
        "No, sono alternativi. Le specifiche tecniche dell’Agenzia delle Entrate prevedono che, quando sul documento commerciale è riportato il codice fiscale comunicato dal cliente, non si applichino le regole sul codice della lotteria degli scontrini.",
    },
  ],
  cta: {
    title: "Devi attivare o cambiare il registratore telematico?",
    description:
      "Raccontaci che attività hai e in quale comune del Trentino lavori. Ti aiutiamo a capire quale cassa ti serve e come metterla in funzione.",
    showPhone: true,
  },
};
