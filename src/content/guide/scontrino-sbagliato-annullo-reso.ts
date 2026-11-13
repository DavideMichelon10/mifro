import type { Article } from "../article-types";

export const article: Article = {
  slug: "scontrino-sbagliato-annullo-reso",
  title: "Scontrino sbagliato: come annullarlo e come fare un reso",
  date: "2026-05-07",
  revisedAt: "2026-05-07",
  category: "problemi",
  type: "news",
  description:
    "Scontrino sbagliato o merce restituita: quando serve il documento di annullo e quando quello di reso, quali dati servono e gli errori da evitare.",
  answer:
    "Uno scontrino già emesso non si corregge e non si strappa. Dal registratore telematico emetti un documento commerciale di annullo, che vale per l’intero importo, e poi lo scontrino giusto. Se invece il cliente restituisce la merce emetti un documento commerciale di reso, anche solo per una parte. Entrambi richiamano lo scontrino originale con numero e data.",
  body: [
    { type: "h2", text: "Come si annulla uno scontrino sbagliato?" },
    {
      type: "p",
      text: "Emetti dal registratore un **documento commerciale di annullo** che richiama lo scontrino sbagliato, poi batti di nuovo la vendita corretta. Prima dell’emissione il registratore può avere funzioni per correggere quello che hai battuto: dipende dal modello. Dopo l’emissione, le specifiche tecniche dell’Agenzia delle Entrate ammettono solo due strumenti: il documento di annullo e il documento di reso.",
    },
    {
      type: "p",
      text: "«Documento commerciale» è il nome ufficiale dello scontrino emesso dal registratore telematico. L’annullo è a sua volta un documento commerciale: riporta la dicitura «emesso per ANNULLAMENTO» e gli estremi del documento di riferimento. Nei dati giornalieri che il registratore trasmette all’Agenzia c’è una voce apposita per il totale degli annulli e una per il totale dei resi.",
    },
    {
      type: "ol",
      items: [
        "Recupera lo scontrino sbagliato, o la sua copia, e leggi **numero del documento** e **data**.",
        "Entra nella funzione di annullo del registratore e indica il documento da annullare. La cassa lo cerca nella propria memoria.",
        "Conferma: esce il documento di annullo, per lo stesso importo dell’originale.",
        "Emetti lo scontrino corretto e consegnalo al cliente.",
        "Se il cliente aveva pagato con carta e l’importo cambia, controlla che anche l’incasso sul POS venga sistemato. Come fare lo storno dipende dal POS e da come è collegato alla cassa: chiedi a chi te lo ha fornito.",
        "Un consiglio: conserva insieme scontrino sbagliato e annullo, così la vicenda si ricostruisce facilmente.",
      ],
    },
    {
      type: "note",
      title: "Tasti e menu cambiano da modello a modello",
      text: "La regola fiscale è uguale per tutti, il percorso sulla cassa no: per sapere dove si trova la funzione di annullo controlla il manuale del tuo modello o chiedi a chi ti fa assistenza.",
    },
    { type: "h2", text: "Che differenza c’è tra annullo e reso?" },
    {
      type: "p",
      text: "L’annullo riguarda l’operazione: azzera per intero uno scontrino che non doveva esistere in quella forma. Il reso riguarda la merce: rettifica una vendita quando il cliente restituisce il bene, in tutto o in parte. La circolare 3/E del 2020 parla infatti di «restituzione del bene» per il reso e di «annullo dell’operazione» per l’annullo. La differenza di importo è scritta nelle specifiche tecniche dei registratori: l’annullo vale solo per l’intero importo dell’originale, per ciascuna aliquota, mentre il reso può essere pari o inferiore.",
    },
    {
      type: "table",
      caption: "Annullo e reso a confronto",
      head: ["", "Annullo", "Reso"],
      rows: [
        ["Quando", "Scontrino sbagliato o operazione da annullare", "Il cliente restituisce la merce"],
        ["Importo", "Sempre l’intero scontrino, per ogni aliquota IVA", "Tutto o una parte, entro l’importo originale di ogni aliquota"],
        ["Dopo", "Riemetti lo scontrino corretto, se la vendita c’è", "Rimborso, cambio merce o buono"],
      ],
    },
    { type: "h2", text: "Quali dati dello scontrino originale servono?" },
    {
      type: "p",
      text: "Servono la **matricola** del registratore che lo ha emesso e l’**identificativo del documento**, formato dal numero progressivo della chiusura seguito dal numero progressivo dello scontrino. Nel fac-simile ufficiale dell’Agenzia compare come «DOCUMENTO N. 0002-0013», accanto a data e ora. Con questi dati la cassa cerca l’originale nella propria memoria e, se lo trova, emette l’annullo o il reso collegato.",
    },
    {
      type: "p",
      text: "Se lo scontrino è stato emesso da **un altro registratore**, cioè da un apparecchio con una matricola diversa, la cassa non può trovarlo nella propria memoria. In questo caso le specifiche prevedono l’inserimento a mano di matricola, data, identificativo del documento, aliquote IVA interessate e codice lotteria, se presente.",
    },
    { type: "h2", text: "Cosa faccio se il cliente non ha più lo scontrino?" },
    {
      type: "p",
      text: "Il reso si può documentare anche se il cliente ti dà un’altra prova dell’acquisto. La circolare 3/E del 2020 dell’Agenzia delle Entrate cita espressamente la **ricevuta del POS**: in quel caso sul documento di reso puoi riportare gli estremi della ricevuta o un codice generico. Le specifiche tecniche prevedono la sigla «POS» al posto della matricola, oppure «ND» nei casi residui, insieme alla data dell’operazione e alle aliquote IVA.",
    },
    {
      type: "p",
      text: "Un esempio: il cliente torna con gli scarponi da cambiare e ha solo la ricevuta del pagamento con carta. Se accetti il reso, il registratore ti permette di documentarlo.",
    },
    {
      type: "p",
      text: "Se invece sei tu a dover annullare e non trovi più la tua copia, i dati di ogni scontrino restano nella memoria del registratore (il giornale di fondo elettronico), che secondo le specifiche deve poter essere letta e stampata. Il modo per consultarla cambia da modello a modello: guarda il manuale o chiedi a chi ti fa assistenza.",
    },
    {
      type: "h2",
      text: "Posso annullare uno scontrino del giorno prima, dopo la chiusura giornaliera?",
    },
    {
      type: "p",
      text: "Dipende dal tuo registratore: le fonti ufficiali che abbiamo consultato non lo dicono in modo esplicito. Le specifiche tecniche dell’Agenzia delle Entrate prevedono che il registratore cerchi lo scontrino originale nella propria memoria attraverso matricola e identificativo del documento. Se e come puoi farlo dopo la chiusura giornaliera sul tuo modello, chiedilo a chi ti fa assistenza o controlla il manuale.",
    },
    {
      type: "p",
      text: "Su come registrare un annullo o un reso che riguarda uno scontrino di un giorno, di un mese o di un trimestre precedente, chiedi al commercialista. Se la cassa non trova il documento perché è più vecchio del primo presente in memoria, cioè la memoria è stata sostituita, le specifiche prevedono l’inserimento manuale dei dati.",
    },
    {
      type: "h2",
      text: "Ho sbagliato importo, aliquota IVA o tipo di pagamento: cosa devo emettere?",
    },
    {
      type: "p",
      text: "In tutti e tre i casi la strada è la stessa: annullo dello scontrino sbagliato e nuovo scontrino corretto. Dopo l’emissione le specifiche tecniche ammettono solo annullo e reso: non esiste un documento «di correzione» che cambi solo una riga.",
    },
    {
      type: "table",
      caption: "Situazione e documento da emettere",
      head: ["Situazione", "Cosa emettere"],
      rows: [
        ["Importo sbagliato", "Annullo, poi nuovo scontrino"],
        ["Aliquota IVA sbagliata", "Annullo, poi nuovo scontrino"],
        ["Contanti al posto di elettronico, o viceversa", "Annullo, poi nuovo scontrino con il pagamento giusto"],
        ["Scontrino battuto due volte o vendita saltata", "Annullo, senza nuovo scontrino"],
        ["Il cliente restituisce tutta la merce", "Reso totale"],
        ["Il cliente restituisce un solo articolo", "Reso parziale"],
        ["Reso senza scontrino, con ricevuta POS", "Reso con sigla «POS» e data dell’operazione"],
        ["Scontrino emesso da un’altra cassa", "Annullo o reso con dati inseriti a mano"],
      ],
    },
    {
      type: "p",
      text: "L’errore sul **tipo di pagamento** merita attenzione, ora che c’è il [collegamento tra POS e registratore](/news/guida-ade-collegamento-rt-pos). Il Ministero dell’Economia, rispondendo il 16 dicembre 2025 all’interrogazione 5-04808 in Commissione Finanze della Camera, ha indicato che quando l’errata indicazione del mezzo di pagamento viene riscontrata tempestivamente è già possibile annullare il documento commerciale con l’indicazione sbagliata, seguendo la procedura prevista per correggere gli errori. Lo scopo dichiarato è evitare irregolarità e le relative sanzioni fisse. La risposta non fissa un termine in giorni: conviene farlo appena te ne accorgi.",
    },
    { type: "h2", text: "Come si fa un reso con cambio merce o con un buono?" },
    {
      type: "p",
      text: "Emetti il documento di reso quando il cliente riconsegna la merce e un normale scontrino quando ritira il nuovo articolo. L’Agenzia delle Entrate ha descritto la procedura nella risposta a interpello n. 167 del 2020, per un commerciante al dettaglio di calzature, abbigliamento, borse e accessori.",
    },
    {
      type: "ol",
      items: [
        "Alla riconsegna emetti il **documento commerciale di reso**, che richiama lo scontrino originale.",
        "Se consegni un buono spendibile su articoli diversi (quello che l’Agenzia chiama «multiuso»), dagli un numero e collegalo alla pratica di reso. Per la sola consegna di questo buono non è richiesto uno scontrino.",
        "Al nuovo acquisto emetti uno scontrino per il valore pieno della merce. Il buono entra come **mezzo di pagamento**, con il suo numero riportato sul documento.",
        "Se il cliente cambia di nuovo, ripeti la procedura: il nuovo reso richiama lo scontrino del secondo acquisto.",
      ],
    },
    {
      type: "p",
      text: "L’errore da evitare è quello contestato in quell’interpello: emettere il reso e poi uno scontrino a totale zero per il nuovo articolo. Se invece rimborsi il prezzo, il principio di diritto n. 21 del 2019 conferma che valgono anche per il documento commerciale le procedure già previste per lo scontrino fiscale: per i dettagli senti il commercialista. In ogni caso l’Agenzia chiede che il reso sia ricostruibile: chi ha restituito, quanto hai rimborsato, quale scontrino è stato rettificato e un numero di pratica.",
    },
    { type: "h2", text: "Cosa non devo fare con uno scontrino sbagliato?" },
    {
      type: "p",
      text: "Non devi farlo sparire né aggiustarlo a mano. Quando lo scontrino esce, i dati dell’operazione sono già nella memoria del registratore: la carta è solo la copia.",
    },
    {
      type: "ul",
      items: [
        "**Non strappare lo scontrino** pensando di averlo eliminato: resta nella memoria della cassa.",
        "**Non correggerlo a penna**: una modifica a mano non cambia i dati memorizzati.",
        "**Non compensare** con uno sconto inventato sullo scontrino successivo o battendo di meno al cliente dopo: l’Agenzia chiede che ogni singola operazione sia ricostruibile.",
        "**Non rimandare**: più tempo passa, più è difficile ricostruire cosa è successo.",
      ],
    },
    {
      type: "p",
      text: "Se la funzione di annullo dà errore o la cassa non trova il documento, serve una verifica tecnica. Se sei in Trentino puoi chiedere alla nostra [assistenza su casse e gestionali](/prodotti-assistenza). Se invece è l’invio dei dati a non partire, leggi [cosa fare quando il registratore non trasmette i corrispettivi](/news/registratore-telematico-non-trasmette-corrispettivi).",
    },
  ],
  sources: [
    {
      title: "AdE: specifiche tecniche dei registratori telematici, versione 11.2, pubblicate il 4 marzo 2026 e aggiornate il 21 aprile 2026 (par. 2.1, «Documento commerciale di reso o annullo»)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/9796628/Specifiche_Tecniche_RT_V11.2+agg.pdf/271e6bac-1ec0-6e6f-3493-32dd369d2c21?t=1776774168529",
    },
    {
      title: "AdE: allegato «Layout documento commerciale», versione 5, pubblicato il 21 febbraio 2023 (fac-simile dei documenti di reso e di annullo)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/288260/Allegato+-+Layout+documento+commerciale+V+5.pdf/f317e2f6-8ba8-5648-6f79-af8c0cfbeba8?t=1676962705395",
    },
    {
      title: "AdE: allegato «Tipi dati per i corrispettivi», versione 7.1, gennaio 2023 (totale resi e totale annulli nei dati giornalieri)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/4972665/Allegato+-+Tipi+Dati+per+i+Corrispettivi+ver+7.1.pdf/34f405fb-2874-d185-e961-34a25b5590db?t=1742281552191",
    },
    {
      title: "AdE: circolare n. 3/E del 21 febbraio 2020 (procedure di reso e annullo)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/2338359/Circolare+3+corrispettivi+21_02_20.pdf/44b98c61-e8cc-6840-4ead-287024092e98",
    },
    {
      title: "AdE: principio di diritto n. 21 del 1° agosto 2019 (reso e documento commerciale)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/1755279/Interpelli_Principio%2Bdi%2Bdiritto%2Bn.%2B21.pdf/b91f4db9-9263-bf59-f34a-039377b65ff9?t=1564668774746",
    },
    {
      title: "AdE: risposta a interpello n. 167 del 5 giugno 2020 (reso merce, buono e «reso del reso»)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/20143/2522858/Risposta+all%27interpello+n.+167+del+2020.pdf/ea0b7956-e1aa-5b73-30b7-714e71e4bfd6?t=1591369947857",
    },
    {
      title: "Camera dei deputati: interrogazione a risposta immediata in Commissione Finanze 5-04808 e risposta del Ministero dell’Economia (16 dicembre 2025)",
      url: "https://aic.camera.it/aic/scheda.html?numero=5-04808&ramo=C&leg=19",
    },
    {
      title: "AdE: FAQ sul collegamento POS–RT, aggiornate al 25 marzo 2026 (FAQ n. 27 sugli assegni)",
      url: "https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503",
    },
  ],
  faq: [
    {
      question: "Posso annullare solo una parte dello scontrino?",
      answer:
        "No. Secondo le specifiche tecniche dell’Agenzia delle Entrate il documento di annullo vale solo per l’intero importo dello scontrino originale, aliquota per aliquota. Se l’errore riguarda una sola riga, annulli tutto e riemetti lo scontrino corretto. Per la merce restituita in parte si usa invece il reso parziale.",
    },
    {
      question: "Uso il Documento commerciale online dell’Agenzia: posso fare annullo e reso?",
      answer:
        "Sì. Secondo le specifiche tecniche dell’Agenzia, la procedura web del portale Fatture e Corrispettivi gestisce anche i documenti di reso e di annullo. Per emetterli devi prima recuperare il documento commerciale originale, che deve essere stato creato con la stessa procedura. Fino alla conferma il documento resta modificabile; la conferma consolida le informazioni.",
    },
    {
      question: "Il cliente ha pagato con assegno: sullo scontrino metto contanti o elettronico?",
      answer:
        "Contanti. Nelle FAQ sul collegamento POS–RT l’Agenzia delle Entrate indica che il pagamento con assegno, bancario o circolare, va riportato sul documento commerciale come pagamento in contanti. Se lo hai battuto come elettronico e te ne accorgi subito, puoi annullare lo scontrino e riemetterlo con la modalità giusta.",
    },
    {
      question: "Devo avvisare il commercialista quando faccio un annullo o un reso?",
      answer:
        "È una buona abitudine, soprattutto quando annullo o reso riguardano uno scontrino di un mese o di un trimestre precedente, o quando hai inserito i dati a mano. L’Agenzia chiede che ogni operazione sia ricostruibile e trovi rispondenza nei corrispettivi trasmessi e nelle registrazioni effettuate.",
    },
  ],
  cta: {
    title: "La cassa non ti lascia annullare lo scontrino?",
    description:
      "Indicaci il modello del registratore, il messaggio che compare e il comune in cui lavori. Ti aiutiamo a capire se è una questione di procedura o se serve un intervento tecnico.",
    showPhone: true,
  },
};
