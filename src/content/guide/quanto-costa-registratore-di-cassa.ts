import type { Article } from "../article-types";

export const article: Article = {
  slug: "quanto-costa-registratore-di-cassa",
  title: "Quanto costa un registratore di cassa: tutte le voci di spesa",
  date: "2026-11-13",
  revisedAt: "2026-11-13",
  category: "costi",
  type: "news",
  description:
    "Quanto costa un registratore di cassa telematico: da cosa dipende il prezzo, quali costi tornano ogni anno e come leggere un preventivo voce per voce.",
  answer:
    "Non esiste un prezzo unico: il costo di un registratore di cassa telematico dipende dal tipo di apparecchio e dai servizi compresi. Oltre all’acquisto vanno messi in conto attivazione, verificazione periodica ogni due anni, assistenza, eventuali canoni software, rotoli e POS. In alternativa all’acquisto c’è il noleggio. A novembre 2026 non ci risultano crediti d’imposta per l’acquisto.",
  body: [
    { type: "h2", text: "Da cosa dipende il prezzo dell’apparecchio?" },
    {
      type: "p",
      text: "Soprattutto dalla tipologia, dagli accessori e dai servizi compresi. In questa guida **non trovi un listino**: i prezzi cambiano da un venditore all’altro e secondo quello che è incluso, quindi l’unica cifra affidabile è quella di un preventivo scritto sul tuo caso. Qui sotto trovi le tipologie più comuni e le voci che fanno salire il prezzo.",
    },
    {
      type: "table",
      caption: "Tipologie di cassa e voci che incidono sul prezzo",
      head: ["Tipologia", "Per chi", "Cosa incide sul prezzo"],
      rows: [
        ["Portatile a batteria", "Mercati, consegne, lavoro fuori sede", "Batteria, connessione, accessori"],
        ["Da banco con tastiera", "Negozio o banco con pochi reparti", "Cassetto, display cliente, programmazione"],
        ["Touch compatto con stampante integrata", "Bar, saloni, negozi con più articoli", "Software, numero di articoli da caricare"],
        ["Sistema touch con stampante telematica separata", "Ristoranti, più postazioni, magazzino", "Schermo, stampante, palmari, licenze"],
      ],
    },
    {
      type: "p",
      text: "Quando confronti due offerte per lo stesso modello, guarda prima di tutto che cosa è compreso: accessori, attivazione, programmazione e assistenza possono essere dentro il prezzo oppure a parte. Se devi ancora capire quale tipologia ti serve, leggi [cassa tradizionale o touch: come scegliere](/news/cassa-tradizionale-o-touch-come-scegliere). Se preferisci non acquistare, Mifro propone il [noleggio di registratori di cassa](/noleggio-registratori-di-cassa) da 29 euro al mese: modello, durata, canone e servizi sono specificati nel preventivo, e formazione e assistenza si concordano nella proposta.",
    },
    {
      type: "note",
      title: "IVA inclusa o esclusa?",
      text: "Un prezzo può essere indicato IVA inclusa o IVA esclusa: controllalo sempre e confronta le offerte sulla stessa base. Se sei in regime forfettario non detrai l’IVA sugli acquisti, come spiega l’Agenzia delle Entrate: per te conta il prezzo IVA inclusa.",
    },
    { type: "h2", text: "Quali costi ci sono oltre al prezzo d’acquisto?" },
    {
      type: "p",
      text: "Le voci sono otto, e solo due si pagano una volta sola. Le altre tornano nel tempo: per questo conviene farsele indicare tutte prima di firmare.",
    },
    {
      type: "table",
      caption: "Le voci di costo di un registratore telematico",
      head: ["Voce", "Quando si paga", "Da cosa dipende"],
      rows: [
        ["Apparecchio", "Una tantum", "Tipologia, accessori, marca"],
        ["Attivazione e messa in servizio", "Una tantum", "Se è compresa, programmazione di reparti e articoli, trasferta"],
        ["Verificazione periodica", "Ogni due anni", "Tariffa del laboratorio, trasferta, contratto"],
        ["Assistenza", "Annuale o a chiamata", "Cosa copre: telefono, uscite, ricambi, cassa sostitutiva"],
        ["Software e licenze", "Mensile o annuale", "Funzioni, numero di postazioni e palmari"],
        ["Rotoli di carta termica", "A consumo", "Numero di scontrini, larghezza del rotolo"],
        ["POS e commissioni", "Canone e percentuale", "Contratto con banca o fornitore, volume incassato"],
        ["Memoria (giornale elettronico)", "Quando si esaurisce", "Numero di scontrini emessi"],
      ],
    },
    {
      type: "p",
      text: "**Attivazione e messa in servizio.** Un registratore telematico non si accende e basta: l’installazione e l’attivazione sono eseguite da laboratori e tecnici abilitati dall’Agenzia delle Entrate, che associano l’apparecchio alla tua partita IVA. Con questo passaggio l’apparecchio risulta prima «censito» e poi «attivato» nei sistemi dell’Agenzia; diventa «in servizio» con la prima trasmissione dei corrispettivi. L’attivazione può essere compresa nel prezzo oppure esposta a parte: chiedilo. Anche la programmazione di intestazione dello scontrino, reparti, aliquote e articoli è un lavoro da far indicare nel preventivo.",
    },
    {
      type: "p",
      text: "**Assistenza.** Può essere un contratto annuale o un intervento pagato a chiamata. Conta cosa c’è dentro: supporto telefonico, uscite sul posto, ricambi, aggiornamenti e un apparecchio sostitutivo in caso di guasto. Se la tua attività è lontana dalla sede di chi ti assiste, come può capitare nelle valli del Trentino, chiedi se l’uscita ha un costo di trasferta e in quali tempi è previsto l’intervento.",
    },
    {
      type: "p",
      text: "**Software e canoni.** Dipende dal prodotto: alcune casse si pagano una volta sola, altre prevedono un canone per il software, e sul mercato esistono formule che uniscono apparecchio, software e assistenza in un unico canone. Chiedi sempre se c’è un canone, cosa succede dopo il primo anno e se i palmari o le postazioni aggiuntive si pagano a parte.",
    },
    {
      type: "p",
      text: "**Rotoli, POS e memoria.** I rotoli di carta termica si pagano a consumo. Il POS è un contratto separato con la banca o con il fornitore del servizio: fatti indicare canone e commissioni sugli incassi. Il collegamento tra POS e registratore previsto dal 2026 si fa con una procedura web dell’Agenzia delle Entrate e, come precisano le FAQ dell’Agenzia, non richiede di cambiare o adeguare la cassa: i dettagli sono nella [guida al collegamento POS–RT](/news/guida-ade-collegamento-rt-pos). Infine la memoria che conserva il dettaglio degli scontrini (il giornale di fondo elettronico) non è infinita: secondo le specifiche tecniche dell’Agenzia la cassa deve avvisarti quando si avvicina all’esaurimento e, a memoria piena, interrompe le funzioni fiscali. Chiedi a chi ti assiste come avviene la sostituzione sul tuo modello e quanto costa.",
    },
    { type: "h2", text: "Ogni quanto va fatta la verificazione periodica e chi può farla?" },
    {
      type: "p",
      text: "Ogni due anni, e solo dal personale dei laboratori abilitati dall’Agenzia delle Entrate. Lo stabilisce il punto 1.7 del provvedimento del 28 ottobre 2016: la prima verificazione è effettuata all’atto dell’attivazione dell’apparecchio e il biennio decorre da lì.",
    },
    {
      type: "p",
      text: "La scadenza cade l’ultimo giorno del mese in cui si compie il biennio: se l’ultima verificazione è del 19 ottobre 2025, la prossima va fatta entro il 31 ottobre 2027. Secondo le specifiche tecniche, il registratore deve poterti avvisare a partire dai 30 giorni precedenti la scadenza; se la data passa, stampa in chiusura giornaliera la dicitura «Registratore Telematico privo di VP». L’elenco di chi è abilitato si consulta sul sito dell’Agenzia, con ricerca per regione, per denominazione o per partita IVA.",
    },
    {
      type: "p",
      text: "Il provvedimento e le specifiche tecniche non indicano una tariffa: il prezzo lo comunica il laboratorio, e può aggiungersi l’uscita del tecnico. La verificazione può anche essere compresa nel contratto di assistenza: controlla che sia scritto. Se lavori solo pochi mesi l’anno, guarda per tempo la data di scadenza e programma la verificazione prima dell’apertura: ne parliamo nella guida per le [attività stagionali](/news/registratore-di-cassa-attivita-stagionali).",
    },
    { type: "h2", text: "Come si legge un preventivo per un registratore di cassa?" },
    {
      type: "p",
      text: "Un buon preventivo separa quello che paghi una volta da quello che pagherai ogni anno. Se trovi una sola cifra «tutto compreso», chiedi che venga scomposta: è l’unico modo per confrontare due offerte. Fatti scrivere in voci distinte:",
    },
    {
      type: "ol",
      items: [
        "**Apparecchio**: marca, modello esatto e accessori compresi (cassetto, display cliente, lettore di codici a barre, batteria).",
        "**Attivazione e programmazione**: cosa viene configurato e se la consegna è presso la tua attività.",
        "**Formazione**: quante ore, dove, per quante persone.",
        "**Software**: licenza una tantum o canone, importo dopo il primo anno, costo di postazioni e palmari aggiuntivi.",
        "**Assistenza**: cosa copre, in che orari, costo dell’uscita, se è prevista una cassa sostitutiva.",
        "**Verificazione periodica**: compresa o a parte, e a quale prezzo.",
        "**Durata e uscita**: vincoli, rinnovo automatico, cosa succede se chiudi o cambi fornitore.",
      ],
    },
    {
      type: "p",
      text: "Poi fai un conto semplice: somma i costi una tantum e aggiungi i costi ricorrenti di cinque anni, verificazioni comprese. È su questo totale che due preventivi diventano confrontabili, e lo stesso calcolo serve per decidere tra [noleggio e acquisto](/news/noleggio-o-acquisto-registratore-di-cassa).",
    },
    { type: "h2", text: "Ci sono agevolazioni per comprare un registratore di cassa nel 2026?" },
    {
      type: "p",
      text: "A novembre 2026 non ci risulta alcun credito d’imposta attivo per l’acquisto di un registratore telematico: per eventuali novità chiedi conferma al tuo commercialista. I due aiuti statali di cui l’Agenzia delle Entrate ha dato notizia negli anni scorsi riguardavano spese ormai passate.",
    },
    {
      type: "ul",
      items: [
        "Il credito d’imposta del 50%, fino a 250 euro per l’acquisto e 50 euro per l’adattamento, valeva per le spese sostenute nel 2019 e nel 2020.",
        "Il credito del 100%, fino a 50 euro per ogni registratore, riguardava l’adeguamento degli apparecchi da effettuare nel 2023, legato alla nuova modalità di partecipazione alla lotteria degli scontrini.",
      ],
    },
    {
      type: "p",
      text: "In Trentino la Camera di Commercio di Trento pubblica i propri bandi per le imprese nella pagina del [Punto Impresa Digitale](https://www.tn.camcom.it/imprenditore/impresa-digitale-pid/bandi-contributi): prima di contarci, leggi nel bando quali spese sono ammesse. Come trattare fiscalmente la spesa nel tuo regime lo sa il tuo commercialista.",
    },
    {
      type: "p",
      text: "Se la tua attività è in Trentino e vuoi un preventivo con le voci separate, puoi partire dalla pagina sulla [vendita di registratori di cassa](/vendita-registratori-di-cassa) di Mifro.",
    },
  ],
  sources: [
    {
      title: "Agenzia delle Entrate: provvedimento del 28 ottobre 2016, testo coordinato del 24 aprile 2024 (punti 1.6–1.10: attivazione, verificazione biennale, QR code)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/296529/Provvedimento+28102016_Testo+Coordinato_20240424.pdf/841f98a8-6c02-9324-cc40-a13738266e88",
    },
    {
      title: "Agenzia delle Entrate: specifiche tecniche dei registratori telematici, versione 11.2 (attivazione, verificazioni periodiche, memorie)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2+agg.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21",
    },
    {
      title: "Agenzia delle Entrate: chiarimenti e precisazioni sui registratori telematici (19 aprile 2019), scadenza della verificazione biennale",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/2340020/chiarimenti+e+precisazioni+registratore+cassa+rt_Chiarimenti+e+precisazioni+su+RT_aprile2109_def.pdf/4ad3a7cd-01f8-18e8-a87c-7a78046e435d",
    },
    {
      title: "Agenzia delle Entrate: fabbricanti, laboratori e tecnici abilitati alla verifica periodica dei registratori telematici",
      url: "https://www1.agenziaentrate.gov.it/servizi/misuratorifiscali2/elenco_laboratori.htm",
    },
    {
      title: "Agenzia delle Entrate: comunicato stampa del 28 febbraio 2019 sul credito d’imposta del 50% per le spese 2019 e 2020",
      url: "https://www.agenziaentrate.gov.it/portale/web/guest/-/cs-28-febbraio-2019-cs-provvedimento-misuratori-fiscali",
    },
    {
      title: "Agenzia delle Entrate: comunicato stampa del 23 giugno 2023 sul credito d’imposta per l’adeguamento dei registratori telematici",
      url: "https://www.agenziaentrate.gov.it/portale/-/comunicato-stampa-del-23-giugno-2023",
    },
    {
      title: "Agenzia delle Entrate: provvedimento del 23 giugno 2023, prot. 231943/2023 (adeguamento da effettuarsi nell’anno 2023)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/5329112/Provvedimentodel+23+giugno+2023+-+Credito+d'imposta+registratori+telematici.pdf/6cb76b4d-bc11-e820-7733-523bc8b9f449",
    },
    {
      title: "Agenzia delle Entrate: FAQ sul collegamento POS-RT, aggiornate al 25 marzo 2026 (FAQ n. 2)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503",
    },
    {
      title: "Agenzia delle Entrate: regime forfettario, semplificazioni e adempimenti (IVA sugli acquisti non detratta)",
      url: "https://www.agenziaentrate.gov.it/portale/schede/agevolazioni/regime-agevolato-forfettario/semplificazioni-e-adempimenti",
    },
    {
      title: "Camera di Commercio di Trento: bandi e contributi del Punto Impresa Digitale (pagina consultata il 13 novembre 2026)",
      url: "https://www.tn.camcom.it/imprenditore/impresa-digitale-pid/bandi-contributi",
    },
  ],
  faq: [
    {
      question: "Quanto costa mantenere un registratore di cassa in un anno?",
      answer:
        "Dipende dal contratto, quindi non c’è una cifra valida per tutti. Le voci da sommare sono i rotoli, la verificazione periodica (che cade ogni due anni), l’assistenza a contratto o a chiamata, gli eventuali canoni software e i costi del POS. Fatti scrivere nel preventivo l’importo di ciascuna.",
    },
    {
      question: "La verificazione periodica è compresa nel contratto di assistenza?",
      answer:
        "Dipende dal contratto: alcuni la comprendono, altri la fatturano a parte insieme all’eventuale uscita del tecnico. Non darlo per scontato. Chiedi che nel preventivo sia indicato se la verificazione biennale è inclusa e, se non lo è, a quale prezzo viene eseguita.",
    },
    {
      question: "Posso attivare da solo un registratore telematico comprato online?",
      answer:
        "No. Secondo le specifiche tecniche dell’Agenzia delle Entrate, installazione e attivazione sono condotte da laboratori e tecnici abilitati: è il tecnico a inserire nel registratore i propri dati identificativi e la tua partita IVA. Se compri online, verifica prima dell’acquisto chi eseguirà l’attivazione e chi ti seguirà poi per assistenza e verificazione periodica.",
    },
    {
      question: "Come faccio a sapere quando scade la verificazione del mio registratore?",
      answer:
        "Inquadra il QR code applicato sul registratore: porta a una pagina dell’Agenzia delle Entrate che mostra i dati dell’apparecchio e la voce «Ultima verificazione periodica», con la data oppure la dicitura «Prima attivazione del dispositivo». La scadenza è due anni dopo, entro l’ultimo giorno del mese. Il registratore deve inoltre poterti avvisare a partire dai 30 giorni precedenti.",
    },
    {
      question: "Esiste un bonus per il registratore di cassa nel 2026?",
      answer:
        "A novembre 2026 non ci risulta alcun credito d’imposta attivo per acquistare un registratore telematico. Quelli previsti in passato riguardavano le spese del 2019 e 2020 per acquisto o adattamento e l’adeguamento da effettuare nel 2023 per la lotteria degli scontrini. Per eventuali novità chiedi conferma al tuo commercialista.",
    },
    {
      question: "Il prezzo più basso è sempre l’offerta più conveniente?",
      answer:
        "Non necessariamente. Un apparecchio economico può non comprendere attivazione, programmazione, formazione e assistenza, che poi paghi a parte. Confronta le offerte sul costo totale di cinque anni: acquisto, servizi iniziali, canoni, assistenza e verificazioni periodiche. E considera chi interviene, e in quanto tempo, se la cassa si ferma.",
    },
  ],
  cta: {
    title: "Vuoi un preventivo con le voci separate?",
    description:
      "Indicaci il tipo di attività, il comune e come lavori al banco o in mobilità. Prepariamo una proposta che distingue apparecchio, software e servizi.",
  },
};
