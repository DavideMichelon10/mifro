# Pagine per settore — revisione tecnica

Note sulle fonti, sulle configurazioni commerciali da verificare con i tecnici Mifro e sulle modifiche alle pagine. La versione aggiornata è preparata per il push richiesto dall’utente; non sono state attivate campagne Ads.

## Percorsi e contenuti

| Pagina | Percorso | Proposte in evidenza |
| --- | --- | --- |
| Bar e caffetterie | `/soluzioni/bar` | WALLE MEC RT, ATS 2, ATS 3 |
| Ristoranti e pizzerie | `/soluzioni/ristoranti` | ATS 2 e ATS 3 |
| Parrucchieri e saloni | `/soluzioni/parrucchieri-saloni` | WALLE MEC RT e ATS 3 |
| Ambulanti e mercati | `/soluzioni/ambulanti` | WALLE MEC RT Ambulanti e APE J RT |

Contenuti: `src/content/sectors.ts`. Layout condiviso: `src/app/(site)/soluzioni/[settore]/page.tsx`.
Le schede non sono una classifica di prezzo e non mostrano tre alternative equivalenti in tutti i settori.
ATS 2 e ATS 3 sono presentati come software da abbinare a hardware compatibile, non come modelli di registratore.
Le funzioni sono accompagnate dall’indicazione che dipendono dai moduli e dalla configurazione scelta.

## Verifiche dei tecnici prima della pubblicazione

- [ ] Denominazione: l’utente ha indicato «WALLE MAC»; le fonti ufficiali RCH riportano **WALLE MEC RT**. Nel sito è usata la denominazione ufficiale; confermare il modello e la variante effettivamente commercializzati.
- [ ] Disponibilità e condizioni commerciali di ATS 2 per nuove installazioni; motivo concreto per proporlo rispetto ad ATS 3. Non è stata ipotizzata una gerarchia economica né una data di fine supporto.
- [ ] Hardware abbinato ai due gestionali: modello, display, stampante, periferiche compatibili. Inserire fotografie esatte soltanto dopo questa scelta.
- [ ] Per ogni soluzione: funzioni incluse, moduli opzionali, licenze e canoni. Confermare gestione tavoli, asporto, report e multicassa nelle configurazioni effettivamente offerte.
- [ ] Beauty: confermare agenda, operatori, giacenze e disponibilità dei moduli; chiarire eventuali limiti rispetto ai gestionali già utilizzati dai clienti. Nessuna integrazione con software terzi è garantita.
- [ ] Ambulanti: confermare dotazione batteria/borsa/coperchio, autonomia reale, ricarica e collegamenti. Non sono promessi una durata della batteria o un comportamento offline specifici.
- [ ] Definire attività di installazione e formazione, modalità e condizioni di assistenza, eventuali servizi a pagamento. Non sono garantiti tempi di risposta o assistenza continuativa 24/7.
- [ ] Confermare formulazione e perimetro di «più di 1.000 clienti nella zona». L’affermazione proviene dall’utente e non equivale a «1.000 clienti attivi».
- [ ] La sede a Pergine e l’operatività in Trentino sono già descritte dal sito. Asiago è per ora solo un possibile limite geografico delle future campagne: non viene promessa copertura assistenziale ad Asiago.
- [ ] Se disponibili, aggiungere testimonianze autorizzate e installazioni reali per settore. Nessuna testimonianza è stata inventata.

## Fonti di prodotto consultate nel brainstorming

- WALLE MEC RT: https://www.rch.it/prodotti/registratori-di-cassa-telematici/walle-mec-rt/
- WALLE MEC RT Ambulanti: https://www.rch.it/prodotti/registratori-di-cassa-telematici/walle-mec-rt-ambulanti/
- APE J: https://www.rch.it/prodotti/registratori-di-cassa-telematici/ape-j/
- ATS 2: https://support.rch.it/docs/manuale-utente-a-touch-system/
- ATS 2, configurazioni e licenze: https://support.rch.it/docs/manuale-utente-a-touch-system/configurazione-e-primi-passi/inserisci-codice-licenza/
- ATS 3: https://www.rch.it/software-e-app/gestionale-di-cassa-ats-3/
- ATS 3 Beauty: https://www.rch.it/software-e-app/gestionale-di-cassa-ats-3/beauty/

## Contatti e verifica locale

Ogni pagina riutilizza il modulo esistente con oggetto di settore automatico (nascosto nelle pagine per settore; modificabile nella pagina Contatti) e suggerimento specifico per il messaggio. Il pulsante di apertura è «Contattaci»; il modulo presenta «Scrivici, ti ricontattiamo noi.» e il pulsante «Invia messaggio», specificando che il ricontatto avverrà all’indirizzo email indicato. Invio, validazione server, pagina di conferma e consenso Analytics restano quelli esistenti. Nessuna nuova campagna o configurazione Ads.

I test automatici del contatto usano SMTP simulato. L’anteprima non richiede invii reali; verificare localmente i campi senza spedire messaggi. Il backend continua a richiedere la configurazione SMTP documentata nel README.

Avvio locale: `npm run dev -- --hostname 127.0.0.1 --port 3001`.
Controlli: `npm test`, `npx tsc --noEmit`, `npm run build` e verifica delle quattro route, dei relativi metadati, link e moduli.


## Verifiche eseguite sulla prima versione

- Build Next.js completata con generazione statica delle quattro nuove pagine.
- Controllo TypeScript completato; cinque test esistenti superati con SMTP simulato.
- Browser Chromium: quattro pagine verificate a 1440, 390 e 320 px senza overflow orizzontale o errori JavaScript.
- Verificati titolo principale unico, canonical specifico, FAQ anche da tastiera e oggetto precompilato.
- Verificati link da home/Soluzioni, navigazione tra settori, reset del modulo al cambio settore, pagina Contatti originale, sitemap e 404 per settore inesistente.
- Errore di invio simulato nel browser: messaggio visibile, campi preservati e pulsante nuovamente disponibile. Nessuna email inviata e richieste a servizi esterni bloccate nel browser di verifica.


## Revisione UI/UX — testi e navigazione

- Rimossi su richiesta dell’utente i riquadri introduttivi con le tre fasi di lavoro (come «Dal banco alla chiusura») da tutti i settori, comprese le sintesi mobile. L’apertura usa una sola colonna con titolo, breve introduzione e pulsanti; rimossi anche i dati `workflow` non più utilizzati.
- Dopo la rimozione dei riquadri, il titolo usa l’intera larghezza del contenitore con righe bilanciate quando va a capo. Il paragrafo mantiene una misura di lettura più contenuta (massimo 48 rem); ridotti padding e distanze tra etichetta, titolo e testo per avvicinare le soluzioni all’inizio della pagina.
- Ripreso il componente `ScrollReveal` della home per titoli di sezione, schede prodotto e presenza locale: dissolvenza con salita di 24 px in 0,6 s, una sola volta, con schede sfalsate di 0,1 s. Conservato l’allineamento dei contenuti delle schede tramite subgrid; animazioni disattivate sotto 768 px e con movimento ridotto, come nel resto del sito.
- Eliminate la sezione sulle esigenze, già espresse nell’apertura, e le descrizioni ripetute delle schede prodotto. Conservati destinazione d’uso, funzioni principali e dipendenza dalla configurazione.
- Accorciati introduzioni, FAQ, pulsanti e blocco su Mifro. Le soluzioni seguono subito la fascia sull’esperienza.
- Nella pagina Bar il testo visibile del contenuto principale è passato da circa 617 a 309 parole, con FAQ chiuse; misura browser indicativa, esclusi header e footer.
- Modulo di settore con nome, email e messaggio. Il settore è trasmesso nell’oggetto automatico; la pagina Contatti conserva l’oggetto modificabile.
- Menu dei settori a tendina su desktop e disclosure annidata su mobile, con accesso separato a «Prodotti e assistenza». Un solo pulsante di contatto nella navigazione.
- Verificati Escape e ritorno del focus, apertura con Freccia giù, Tab, clic esterno, navigazione, link attivo e cambio di dimensione dello schermo. Menu scorrevole nei viewport bassi.
- Build eseguita su copia temporanea per non interrompere il server di sviluppo dell’utente. Superati TypeScript, cinque test esistenti e controlli browser a 1440, 390 e 320 px. Invio modulo simulato, nessuna email spedita.


## Pagine di ingresso e navigazione

La pagina indice è stata rimossa: `/soluzioni` reindirizza a `/#settori` ed è esclusa
dalla sitemap. I quattro settori si raggiungono direttamente dal menu e dalle schede
della home. Le quattro schede di settore precedono le tre schede dei servizi,
collegate agli anchor di `/prodotti-assistenza`. Per negozi e altre attività è presente
un invito esplicito al contatto. I collegamenti generici rimandano ai settori in home. Gli indirizzi delle pagine di settore restano invariati.

`/prodotti-assistenza` raccoglie POS e pagamenti, tecnologia per l’ufficio e
assistenza/riparazioni in tre blocchi verticali con foto alternate e testi pratici
di approfondimento. I contenuti sono in `siteConfig.productsAndSupport`: `details`
contiene i testi estesi, mentre `description` resta la sintesi per le schede in home.
Gli anchor sono `#pagamenti`, `#hardware-ufficio` e `#riparazioni`. Sotto i servizi,
la sezione «Hai un’attività?» collega direttamente le quattro pagine di settore
per casse e gestionali. Seguono l’invito al contatto e il telefono.

La top bar contiene un unico pulsante «Per la tua attività» che apre il menu dei
quattro settori, «Prodotti e assistenza», «Chi siamo» e «Contattaci». La home è
raggiungibile dal logo; la voce «Guida RT–POS» nel footer porta direttamente a
`/news/guida-ade-collegamento-rt-pos`, mantenendo l’indirizzo della guida. `/news`
reindirizza alla guida ed è escluso dalla sitemap. Sotto 1024 px si usa la navigazione mobile;
Escape ripristina il focus al pulsante che ha aperto il pannello. Le pagine di settore
si aprono direttamente con l’introduzione, senza breadcrumb.

Le schede prodotto utilizzano `src/components/SolutionCard.tsx`. Differenze commerciali,
moduli, configurazioni e abbinamenti hardware restano da verificare con i tecnici.


## Immagini delle soluzioni

Le schede includono fotografie locali, renderizzate tramite Next Image con dimensioni dichiarate, testo alternativo e proporzioni conservate. Le foto WALLE MEC RT, WALLE MEC RT Ambulanti e APE J RT provengono dalle rispettive pagine ufficiali RCH. ATS 2 usa la postazione RCH già presente nel repository; ATS 3 mostra un esempio su APE 3 dalla galleria ufficiale RCH. Su richiesta dell’utente, sono state rimosse le didascalie delle immagini e la nota generale sotto le schede.

La pagina Ambulanti affianca **APE J RT** a WALLE MEC RT Ambulanti, secondo la scelta esplicita dell’utente del 21 ottobre 2026. Nome, foto, metadati e FAQ sono aggiornati al modello telematico: stampa e invio dei corrispettivi sono integrati, con connessione Wi-Fi o mobile e attivazione del dispositivo. I pagamenti contactless richiedono il servizio RCH Pay SoftPOS, con attivazione e costi da definire nella proposta. L’immagine del precedente APE J è conservata ma non più utilizzata.

Fonti dei file: `docs/immagini-prodotti.json`. Confermare con i tecnici gli abbinamenti hardware e sostituire le immagini indicative con quelle della configurazione scelta prima della pubblicazione.

## Analisi dell’archivio RCH — 21 ottobre 2026

Questa sezione conserva le evidenze della ricognizione, precedente alle modifiche
descritte in «Aggiornamento delle pagine dopo l’analisi» in fondo al documento.

Fonte: `download.zip`, cartella interna `RCH/`. L’archivio contiene nove PDF
(642 pagine complessive) e un collegamento `.url`. Analizzati testi, indici,
descrizioni di prodotto e tabelle delle configurazioni; queste ultime controllate
anche visivamente, perché i simboli non compaiono nel testo estratto. Questa è
una ricognizione per i contenuti del sito, non una validazione delle procedure
tecniche o fiscali. Le pagine indicate sotto sono quelle del PDF, contando dalla
copertina: l’indice del manuale WALLE MEC presenta alcuni rimandi non allineati.

Le evidenze descrivono le versioni documentate nei file. Disponibilità commerciale,
prezzi, canoni, dotazione e offerta effettiva Mifro restano da confermare. Questa
analisi aggiunge note interne; non modifica le pagine pubbliche.

### Documenti e utilità

| File dentro `RCH/` | Versione / pagine | Utilità per il progetto |
| --- | --- | --- |
| `Software RCH ATS3.0 - Borchure globale.pdf` | rev.2026_0506; 13 pp. | Quadro delle configurazioni, hardware compatibile, funzioni per ristorazione, retail e tabacchi |
| `Software RCH ATS3.0 - licenza RISTO-PRO.pdf` | rev.2026_0506; 6 pp. | Fonte più utile per arricchire le pagine Bar e Ristoranti |
| `Software RCH ATS3.0 - licenza RET@IL.pdf` | rev.2026_0506; 6 pp. | Magazzino, articoli, listini, prenotazioni e fidelity; base per un’eventuale pagina Negozi |
| `Software RCH ATS3.0 - licenza TABACCHI.pdf` | rev.2026_0506; 6 pp. | Funzioni specifiche per un’eventuale pagina Tabaccherie |
| `Manuale_Tecnico_APE3 (1).pdf` | revisione 10/2025; 158 pp. | Specifiche dell’hardware già raffigurato nella scheda ATS 3 |
| `RCH_MCT_Manuale_Tecnico_PRINT_3.0_RT (1).pdf` | revisione 04/2026; 152 pp. | Stampante telematica per postazioni con dispositivi separati |
| `RCH_MCT_Manuale_Tecnico_WallE_MEC_RT_IT.pdf` | revisione 1.1, 07/2026; 120 pp. | Caratteristiche della cassa, kit ambulanti e display opzionale per documento digitale |
| `RCH_Manuale_Tecnico_APEJ_RT (2).pdf` | revisione 04/2026; 160 pp. | Modello APE J **RT**, distinto dall’APE J attualmente presentato nel sito |
| `A-TS_ITA-Guida_Pratica_XML7_v8.pdf` | A-Touch System v.5.2.x, guida v.8; 21 pp.; metadati PDF del 2021 | Guida tematica XML7, utile all’assistenza; non è un catalogo completo e aggiornato di ATS 2 |

Le tre brochure verticali riprendono buona parte di quella globale. L’archivio
non contiene una brochure dedicata Beauty né una scheda del modello APE J senza RT.

### Contenuti da valorizzare nelle pagine

**Bar e ristoranti — ATS 3.0 RISTO-PRO.** Le pp. 5–6 della brochure dedicata
descrivono mappa e stato dei tavoli, comande da palmare, prenotazioni con cliente,
orario e tavolo, asporto organizzato per consegna/preparazione, report da remoto,
controllo giacenze collegato ai consumi impostati per piatti e bevande, schermo
comande in cucina, fidelity e app RCH Omnia. Rispetto ai testi attuali, i benefici
più concreti da aggiungere sono «ordini d’asporto organizzati per orario»,
«prenotazioni e tavoli nella stessa gestione» e «comande visibili in cucina».
Vanno riferiti alla configurazione proposta e ai relativi dispositivi/moduli.

**Parrucchieri e saloni.** La brochure globale cita Beauty tra i settori (p. 4)
e le prenotazioni beauty tra le attività consultabili con Omnia (p. 2).
RET@IL descrive agenda, dettagli cliente, assegnazione delle attività allo staff
e storico prenotazioni (p. 5). Questi elementi rafforzano la base documentale,
ma non dimostrano che RET@IL coincida con l’offerta Beauty di Mifro o che tutte
le funzioni specifiche di un salone siano comprese. Restano da confermare
configurazione Beauty, agenda/operatori e canoni.

**Negozi, se si amplia la copertura del sito.** RET@IL offre argomenti specifici:
articoli con varianti, listini modificabili da remoto, giacenze e inventari,
conto nominativo sospeso, vendita a peso e fidelity (pp. 5–6). È materiale
sufficiente per preparare una proposta di pagina Negozi, subordinata alla gamma
che Mifro vuole effettivamente promuovere.

**Tabaccherie, se incluse nell’offerta Mifro.** La brochure TABACCHI descrive
anagrafiche secondo le tariffe ADM aggiornate quotidianamente e gestione giacenze
(p. 5), catalogo Gratta e Vinci, scansione barcode, registrazione del pagamento
delle vincite e prodotti accessori (p. 6). Sono funzioni dichiarate dal produttore
nella brochure, da confermare nella configurazione commerciale proposta.

### Moduli: cosa dimostrano le tabelle

La p. 3 della brochure globale e le p. 3 delle brochure verticali associano:

| Configurazione | Moduli/app contrassegnati nella tabella |
| --- | --- |
| APE J | Prodotti, RCH Omnia |
| RISTO-PRO | Prodotti, 40 Tavoli/Park, Tavoli aggiuntivi, Garçon, Booking, Ticketing, Takeaway, Fidelity, Kitchen Display, RCH Omnia, Kiosk, X-Store Enterprise, Garçon Full |
| RET@IL | Prodotti, Booking, Fidelity, Stock Pro, RCH Omnia, X-Store Enterprise |
| TABACCHI | Prodotti, Tabacchi, Stock Pro, RCH Omnia, X-Store Enterprise |

I simboli non hanno una legenda che distingua incluso, opzionale o acquistabile
separatamente. Non trasformare quindi questa matrice in una promessa di dotazione
compresa nel prezzo. X-Store Enterprise è descritto come valido per una macchina
e cinque cataloghi. La riga MyBooking nella tabella globale è vuota: da sola
non permette conclusioni sulla disponibilità del servizio. Stock Pro non è
contrassegnato per RISTO-PRO, pur essendoci una descrizione di giacenze e consumi
nelle pagine funzionali: va chiarito quale gestione scorte copra la licenza offerta.

### Hardware e punti da chiarire prima di cambiare le schede

**APE J e APE J RT.** La pagina Ambulanti attuale e la relativa fotografia
presentano APE J. Il nuovo manuale riguarda invece APE J RT: lo identifica come
registratore telematico (p. 20), con display da 6,5", stampante da 58 mm,
batteria 7,6 V / 3.500 mAh, LTE/Wi-Fi/Bluetooth e peso dichiarato di 400 g (p. 23).
L’app APE J Core gestisce documenti commerciali e trasmissione dei corrispettivi
(p. 30); l’attivazione del servizio RCH Pay SoftPOS è descritta alle pp. 31–32.
Non sono indicate ore di autonomia da promettere al cliente.

Se Mifro intende proporre **APE J RT**, occorre aggiornare insieme nome,
fotografia, scheda e FAQ sui corrispettivi. La FAQ attuale è stata scritta per
APE J senza RT: non va trasferita al modello RT. Il manuale contiene anche una
frase generica sull’abbinamento a un altro RT (p. 30), da chiarire con i tecnici
rispetto alla descrizione delle funzioni fiscali integrate.

**WALLE MEC RT.** Il manuale documenta 10 reparti, 100 articoli a prezzo
memorizzato e 4 operatori (p. 16); ingombro 255 × 225 × 115 mm, peso 1.450 g e
carta da 57,5 mm (p. 19). Sono dati concreti utilizzabili per spiegare la cassa
essenziale, senza caricare le schede di dettagli tecnici. Le pp. 29–30 descrivono
il kit batteria ambulanti opzionale, il coperchio antipioggia e impostazioni che
incidono sui consumi. La borsa non compare nell’elenco di quel kit: questo PDF
non risolve da solo la dotazione commerciale della variante Ambulanti.

Il display per mostrare il QR del documento digitale richiede un coperchio
specifico opzionale (p. 22): è un possibile approfondimento, non una funzione
da attribuire indistintamente a ogni esemplare. Il manuale riporta 30 tasti
nella descrizione a p. 16 e 32 nella tabella a p. 19; evitare quel numero nelle
schede finché non è verificato. Wi-Fi e batteria vanno riferiti alla dotazione
effettiva, non dedotti dalla sola presenza delle procedure nel manuale.

**APE 3.** Confermati touch da 10", display cliente da 4", stampante integrata
da 80 mm a 200 mm/s e lettore NFC (pp. 16–19). Il manuale descrive anche ATS 3.0
(p. 30). Questo rende più documentato l’esempio hardware già presente nel sito,
ma non significa che tutte le licenze software o i servizi di pagamento siano
inclusi nell’acquisto della macchina.

**PRINT! 3.0 RT.** Stampante telematica compatta con uscita carta frontale o
superiore (p. 17), ingombro 127 × 127 × 134 mm, Ethernet/USB/seriale (p. 20),
carta da 80 mm, velocità massima 250 mm/s e taglio automatico (p. 21).
Utile per spiegare una postazione composta da schermo e stampante separati;
il manuale non prova la compatibilità con ogni gestionale o periferica.

### Immagini e collegamento Smart Order / WaitHero

Le brochure contengono schermate del software: tavoli, report, scorte, asporto
e prenotazioni in RISTO-PRO p. 5; articoli, report, magazzino e agenda in RET@IL
p. 5. Potrebbero aiutare a mostrare cosa fa il gestionale nelle pagine di settore.
Le schermate sono inclinate, sovrapposte e talvolta tagliate nell’impaginazione:
per una buona resa sul sito conviene recuperare gli originali RCH o screenshot
di una configurazione dimostrativa. Non sono state aggiunte immagini a `public/`.

`SMART ORDER in realta si tratta di WaitHero.url` punta a un articolo del 2024,
non a un manuale né a una scheda di compatibilità. La verifica delle fonti
primarie online mostra che [RCH presenta Smart Order](https://xmarket.rch.it/product-app/rch-smartorder/)
per menu, ordini e pagamenti da smartphone, mentre [WaitHero presenta Space M Plus](https://waithero.it/)
per ordinazioni al tavolo, asporto e delivery, dichiarando integrazione con RCH.
Queste pagine non bastano a stabilire equivalenza o sostituzione tra i due nomi:
prima di citarli nella proposta Mifro occorre identificare servizio, versione e
integrazione realmente installati. Consultazione: 21 ottobre 2026.

### Priorità per la prossima revisione

1. Confermare se la proposta ambulanti debba restare APE J o diventare APE J RT.
2. Rendere più concreti i testi ATS 3 di Bar/Ristoranti, usando pochi benefici
   documentati di RISTO-PRO e indicando la dipendenza dalla configurazione.
3. Confermare la configurazione Beauty e cosa comprendono licenze e accessori.
4. Valutare Negozi e Tabaccherie come ulteriori pagine, se coerenti con l’offerta.
5. Usare le schermate del gestionale per un eventuale approfondimento visivo.

La guida A-Touch/XML7 aiuta a individuare argomenti di assistenza (fidelity,
acconti, forme di pagamento), ma non risolve disponibilità, supporto e convenienza
di ATS 2 per nuove installazioni. Non sono state ricavate nuove indicazioni
normative dalle procedure contenute nei manuali.

## Aggiornamento delle pagine dopo l’analisi — 21 ottobre 2026

Su richiesta dell’utente, le quattro pagine evidenziano un vantaggio principale
e tre punti brevi per ciascuna soluzione, mantenendo 21–27 parole per scheda
(escluse le immagini). I dettagli sulla configurazione rimangono nelle FAQ.

- Bar: WALLE MEC per lo spazio al banco; ATS 2 per tavoli e conti; ATS 3
  RISTO-PRO per incassi da smartphone, listini remoti e dati sincronizzati.
- Ristoranti: ATS 2 per comande, conti e asporto; ATS 3 RISTO-PRO per tavoli,
  prenotazioni, asporto per orario e comande su schermo in cucina. La FAQ precisa
  la necessità di dispositivi e moduli compatibili.
- Saloni: WALLE MEC per gli incassi e ATS 3 per agenda/operatori, scorte e
  controllo da remoto. Le funzioni sono confermate anche dalla
  [pagina ufficiale RCH Beauty](https://www.rch.it/software-e-app/gestionale-di-cassa-ats-3/beauty/),
  consultata il 21 ottobre 2026; restano da definire i moduli offerti da Mifro.
- Ambulanti: passaggio ad APE J RT autorizzato dall’utente, con fotografia
  ufficiale del modello, metadati e FAQ coerenti. La
  [pagina RCH APE J RT](https://www.rch.it/prodotti/registratori-di-cassa-telematici/ape-j-rt/)
  conferma trasmissione tramite Wi-Fi/rete mobile e servizio SoftPOS. Nessuna
  promessa di autonomia oraria. La scheda non usa peso o CPU: i valori della
  pagina commerciale differiscono da quelli del manuale fornito.

Le righe delle schede condividono l’allineamento da tablet in su tramite CSS
subgrid. Su tablet il padding è ridotto per contenere gli a capo; il vantaggio
principale usa il colore del brand. Il layout mobile resta a colonna singola.
Non sono state aggiunte nuove sezioni o nuove pagine di settore.

Verifiche: build di produzione completata su copia temporanea, TypeScript e
lint dei file coinvolti superati. In Chrome verificate tutte e quattro le pagine
a 1440, 768, 390 e 320 px: nessun overflow orizzontale o errore JavaScript,
immagini caricate, tre vantaggi per scheda, titoli e liste allineati su desktop
e tablet, FAQ apribili da tastiera. Nessun modulo inviato durante i controlli.

## Revisione delle immagini — 21 ottobre 2026

Come chiarito dall’utente, la home torna alla foto dell’ultimo commit di `main`,
`f6b5259:public/images/hero.jpg`, recuperata senza modifiche. La foto dell’assistenza usa
una variante generata con mani maschili; dalle foto WALLE MEC RT e WALLE MEC RT
Ambulanti è stato rimosso il bollino grafico «RT / Registratore telematico».
Le varianti sono salvate in file dedicati, conservando gli originali. Fonti,
percorsi e prompt sono in `docs/ritocchi-immagini-2026-10-21.json`,
`docs/immagini-prodotti.json` e `docs/immagini-servizi.json`.
