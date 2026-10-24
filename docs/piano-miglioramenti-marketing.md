# Piano di modifiche al sito Mifro

**Revisione:** 24 ottobre 2026. Base: commit `f561f02` più modifiche locali.
**Stato:** implementazione locale e correzioni della revisione tecnica; nessun deploy
o invio email reale eseguito dall’agente. L’utente ha poi segnalato la campagna Ads
live; verificata a 5 €/giorno e completata con tre nuovi gruppi inizialmente in pausa.
L’utente ha poi confermato di aver abilitato tutti e quattro i gruppi, verificati in Chrome.
Esiti e conteggi dei test sono raccolti solo in
[collaudo-marketing.md](collaudo-marketing.md).

## Perimetro confermato

- Contatti: Davide riceve e inoltra a Mifro; destinatario obbligatorio.
- Account Ads separato Mifro creato: **276-321-8107**. Struttura confermata:
  una campagna Search con quattro gruppi (Ristoranti, Bar, Parrucchieri, Ambulanti),
  budget comune. Dopo la preparazione senza budget, l’utente ha segnalato la
  pubblicazione: nell’account risultano 5 €/giorno, non modificati dall’agente.
  Tutti i gruppi, annunci, keyword ed esclusioni sono inseriti; Parrucchieri era
  già abilitato, Ristoranti, Bar e Ambulanti sono stati completati in pausa.
  L’utente ha successivamente abilitato personalmente tutti i gruppi, ora Enabled.
  Il centro clienti resta incompleto per un limite Google.
- Il caso cliente è escluso per scelta dell’utente, compresa la predisposizione inutilizzata.
- Ulteriori informazioni aziendali e nuova guida sono fuori dall’intervento corrente,
  su indicazione dell’utente. La bozza editoriale resta interna.
- Il piano originario sotto è conservato come riferimento storico; queste decisioni
  prevalgono sulle sue richieste di casi cliente, nuove conferme aziendali e sulla
  precedente campagna limitata ai ristoranti con budget ipotizzato di 1.000 €/mese.

## Stato dei dodici interventi

| Punto | Stato nel repository | Residuo operativo |
| --- | --- | --- |
| 01 · Contesto lead | Settore/posizione validati; Contattaci desktop/mobile usa il modulo locale del settore | Dimensioni GA4 registrate; account Ads Mifro collegato, `generate_lead` primario verificato con conteggio Una |
| 02 · Recapito | `CONTACT_TO` obbligatorio; conferma dopo accettazione SMTP | Variabili Production presenti; consegna reale non collaudata |
| 03 · Consenso e misura | Consenso/revoca, lead e clic distinti; test con tag reale disponibile | Regola duplicata rimossa via Chrome; test con tag reale superato |
| 04 · SEO tecnico | Redirect permanente e sitemap senza date artificiali | Storico Search Console non consultato |
| 05 · Metadati | Canonical, Open Graph/Twitter e due immagini 1200×630 | Anteprime social dopo il rilascio |
| 06 · Assistenza | Informazioni centralizzate e collegate dai settori; orari distinti dal contratto | Nessuna ulteriore informazione aziendale richiesta in questo intervento |
| 07 · Settori/home | H2 distinti, FAQ mirate e sottotitolo aggiornato | Nessun nuovo contenuto commerciale da inventare |
| 08 · Modulo generico | Oggetto facoltativo, autocomplete, errori accessibili e dati preservati | Invio indipendente dal consenso Analytics |
| 09 · Caso cliente | Escluso e predisposizione rimossa su richiesta | Nessuno |
| 10 · Articoli | Guida RT–POS aggiornata; modello tipizzato con download, fonti e CTA per articolo | Seconda guida esclusa dall’intervento corrente |
| 11 · Documentazione | README e collaudo riallineati, flusso confermato e decisioni esplicite | Verifica ricezione Analytics nell’account |
| 12 · Affidabilità | Font locale, chat compatta, test browser, CI e aggiornamenti delle dipendenze | Prestazioni sul campo e ambiente pubblicato |

`contact_click` misura intenzione, non telefonate o conversazioni avvenute.
Le page view iniziale e dopo navigazione Next.js sono state osservate nel tag reale,
leggendo anche i POST raggruppati. Il codice non invia page view manuali parallele.
Il refresh non genera `generate_lead`; la regola Google che creava una conversione
derivata dalla visita è stata eliminata e il test con tag reale ora passa.
Configurazione e controllo ripetibile in [misurazione-conversioni.md](misurazione-conversioni.md).

Fonti RT–POS consultate: [FAQ AdE del 25 marzo 2026](https://www.agenziaentrate.gov.it/portale/documents/d/guest/faq_collegamento_pos_rt_2503)
e [scadenzario AdE del 20 aprile 2026](https://www1.agenziaentrate.gov.it/servizi/scadenzario/main.php?chi=3982&come=549&cosa=11494&entroil=20-04-2026&op=4&vista=0).
Il PDF scaricabile resta identificato come edizione febbraio 2026.

## Piano originario — riferimento storico

## Decisione di fondo

Intervenire sul sito Next.js esistente con rilasci piccoli. Le pagine settore, la navigazione, i moduli e buona parte della SEO sono già presenti. La priorità è distinguere le richieste, verificarne la presa in carico, rendere concreta l'assistenza e rafforzare le prove dell'offerta.

Il piano traduce le analisi in interventi sul repository. Alcuni giudizi vengono precisati grazie all'accesso al codice: Analytics e invio email non sono componenti da installare da zero; la configurazione in produzione e il recapito finale restano da collaudare.

Documenti di origine, nella cartella `/home/davide/personal/team-marketing-ai/mifro`:

- [Pagella Marketing](../../team-marketing-ai/mifro/PAGELLA-MARKETING.md).
- [Piano SEO](../../team-marketing-ai/mifro/PIANO-SEO.md).
- [Mappa opportunità](../../team-marketing-ai/mifro/MAPPA-OPPORTUNITA.md).
- [Campagna Ads](../../team-marketing-ai/mifro/CAMPAGNE-ADS.md).

## Cosa è già implementato

| Evidenza nel codice | Conseguenza per il piano |
|---|---|
| `ContactForm.tsx` chiama `/api/contact` e invia l'evento solo dopo una risposta positiva | Preservare questo ordine; collaudare successo, errore e consenso |
| L'endpoint conferma il successo dopo l'accettazione SMTP | Non introdurre conferme anticipate. Accettazione SMTP e arrivo nella casella restano verifiche diverse |
| `/grazie` richiede un cookie firmato, è noindex e non emette il lead al refresh | Conservare il meccanismo; non conteggiare la visita a `/grazie` come nuova conversione |
| `generate_lead` usa sempre `form_id: contact` | Aggiungere il contesto di settore e pagina, senza dati personali |
| Analytics si carica dopo accettazione; i parametri pubblicitari sono impostati a denied | Preparare la misurazione Ads rispettando scelte e finalità; non attivare segnali pubblicitari automaticamente |
| Il recapito usa `CONTACT_TO` con fallback al gestore del sito | Rendere esplicita la configurazione e chiarire chi prende in carico le richieste |
| Canonical, titoli, FAQ, sitemap e LocalBusiness sono presenti | Affinare e verificare ciò che esiste, senza aggiungere duplicati |
| `/news` usa già `permanentRedirect`; `/soluzioni` usa `redirect` | Intervenire sul solo redirect temporaneo delle soluzioni |
| `sitemap.ts` usa `new Date()` per molte pagine | Usare date di modifica reali oppure omettere `lastModified` |
| L'immagine Open Graph nel layout è soltanto commentata | Aggiungere anteprime coerenti con foto e marchio già disponibili |

Questi sono riscontri sul codice locale. Non provano che tutte le impostazioni esterne siano attive o che ogni comportamento sia stato riprodotto sulla versione pubblica.

## Scelte del progetto da rispettare

Le note in [revisione-pagine-settori.md](revisione-pagine-settori.md) documentano scelte dell'utente: introduzione compatta, assenza dei vecchi blocchi a tre fasi, schede con un vantaggio e tre punti, dettagli nelle FAQ, foto attuale della home e modello APE J RT per ambulanti.

Gli approfondimenti previsti qui useranno FAQ, collegamenti e contenuti mirati. Non aggiungere una grande tabella comparativa sopra i prodotti, didascalie già rimosse o nuove sezioni ripetitive. Per la pagina ristoranti manteniamo inizialmente il titolo visibile attuale, già affiancato da un'introduzione esplicita e da un title SEO pertinente: cambiarlo non è un prerequisito per Ads.

All'inizio della ricognizione erano presenti due file non tracciati: `.vercelignore` e `public/google2586a720711a1ee5.html`. Conservarli e verificare il loro scopo nel rilascio; non includerli, eliminare o sovrascrivere automaticamente nel lavoro marketing.

## Rilascio 1: richieste misurabili e pronte per Ads

### 01 · Distinguere i lead per settore e pagina

**Priorità P0. Sforzo medio.**

File: `src/lib/analytics.ts`, `src/components/ContactForm.tsx`, `src/app/(site)/soluzioni/[settore]/page.tsx`, `src/app/(site)/contatti/page.tsx`, `src/lib/contact.ts`, `src/app/api/contact/route.ts`, `tests/contact.test.cjs`. Aggiungere un piccolo modulo condiviso di tipi/valori ammessi, ad esempio `src/lib/contact-context.ts`, se evita duplicazioni tra client e server.

Implementazione proposta:

1. Aggiungere al modulo un contesto tipizzato con settore e posizione. Settori ammessi: `bar`, `ristoranti`, `parrucchieri-saloni`, `ambulanti`, `generico`. Posizioni ammesse: pagina settore e pagina contatti, estensibili solo quando servono.
2. Conservare `generate_lead` e `form_id: contact` per continuità, aggiungendo `sector` e `form_location` da valori controllati. Non includere oggetto libero, nome, email, testo o URL con query.
3. Trasmettere lo stesso contesto al server e aggiungerlo all'email interna. Validare con elenco ammesso: il client non è una fonte affidabile. I payload precedenti senza contesto rimangono validi e vengono classificati come generici.
4. Emettere una sola volta dopo successo, con consenso statistiche accettato; non emettere su errori, click, apertura modulo o refresh di conferma.

**Accettazione:** un invio ristoranti produce una richiesta email riconoscibile e un solo evento con `sector: ristoranti` quando consentito; bar e contatti generici rimangono distinguibili; dati personali assenti dai parametri applicativi Analytics. Il modulo resta utilizzabile con consenso rifiutato.

**Configurazione esterna collegata:** registrare le dimensioni utili in GA4. Per la campagna ristoranti usare un'azione di conversione filtrata su quel settore, eventualmente un evento derivato in GA4, importando una sola azione primaria in Ads. Non sommare evento generico e derivato come due lead. Le altre richieste restano visibili nei report, senza alimentare impropriamente la campagna.

### 02 · Rendere esplicito il recapito e collaudare la presa in carico

**Priorità P0. Sforzo basso per il codice, medio per il collaudo completo.**

File: `src/app/api/contact/route.ts`, `src/app/(site)/grazie/page.tsx`, `src/content/site.ts`, `README.md`, `tests/contact.test.cjs`; configurazione Vercel fuori dal repository.

- Eliminare il fallback implicito a un destinatario personale: rendere `CONTACT_TO` una configurazione richiesta e documentata, con verifica della presenza prima dell'invio. Configurare l'indirizzo concordato prima del deploy della modifica; non scegliere un destinatario nuovo per deduzione.
- Definire se la presa in carico rimane al gestore o passa direttamente alla casella aziendale. Allineare testo email, conferma e informativa al flusso effettivo.
- Mantenere Reply-To, validazione, honeypot, limiti, cookie firmato e messaggi di errore. La modifica non deve creare un relay utilizzabile verso destinatari scelti dal visitatore.
- Collaudare con SMTP simulato. Un controllo finale su casella reale richiede un invio concordato e identificato come test: non è parte delle verifiche già eseguite.

**Accettazione:** configurazione incompleta → errore chiaro senza falsa conferma; successo SMTP → conferma e cookie; casella e responsabile verificati nel collaudo operativo. Nessuna richiesta deve dipendere da un inoltro non assegnato.

### 03 · Completare la verifica Analytics, consenso e Ads

**Priorità P0 per il collaudo; modifiche solo sui problemi riscontrati. Sforzo medio.**

File: `src/components/AnalyticsConsent.tsx`, `src/lib/analytics.ts`, `src/app/layout.tsx`, `src/app/(site)/privacy/page.tsx`, test browser mirati da aggiungere.

Testare prima apertura, accettazione, rifiuto, revoca e nuova accettazione. Verificare navigazione interna Next.js, una sola inizializzazione del tag, caricamento delle pagine e ricezione dei lead. La configurazione attuale non offre una scelta pubblicitaria: non trasformare “Accetta Analytics” in consenso a finalità aggiuntive.

Prima scelta: riusare il flusso GA4 già presente, verificandone l'idoneità all'importazione nell'account Ads. Se servono tag o finalità ulteriori, trattare la modifica come intervento distinto: preferenze esplicite, aggiornamento dei testi e test di tutti gli stati. Non caricare un secondo sistema di conversione parallelo per lo stesso invio. [Documentazione tecnica Google sul consenso](https://developers.google.com/tag-platform/security/guides/consent).

**Accettazione:** nessuna raccolta Analytics prima dell'accettazione secondo il comportamento scelto; rifiuto e revoca rispettati; invio contatti indipendente dal tracking; nessun lead duplicato. Riconciliare email e Analytics considerando rifiuti e blocchi del browser, senza aspettarsi uguaglianza perfetta.

## Rilascio 2: SEO tecnico e qualità delle anteprime

### 04 · Consolidare redirect e sitemap

**Priorità P1. Sforzo basso.**

File: `src/app/(site)/soluzioni/page.tsx`, `src/app/sitemap.ts`; contenuti `site.ts`/`sectors.ts` solo se si adotta una data editoriale esplicita.

- Usare `permanentRedirect('/#settori')` per `/soluzioni`, coerentemente con la rimozione definitiva dell'indice documentata. Verificare comunque eventuali esigenze emerse dallo storico Search Console prima della pubblicazione.
- Conservare il redirect permanente già esistente da `/news` alla guida e gli URL delle quattro pagine settore.
- Rimuovere `lastModified: new Date()` dalle pagine senza una data editoriale attendibile. Se si aggiunge `updatedAt`, valorizzarlo solo dopo modifiche sostanziali e usarlo nella sitemap. Non inventare date retroattive.
- Escludere ancora conferma, privacy e URL di redirect dalla sitemap; verificare canonical e risposte delle destinazioni.

**Accettazione:** redirect permanente senza catene o loop, `#settori` presente e raggiungibile; sitemap con URL canonici che rispondono correttamente e date reali o omesse. Due build senza cambi ai contenuti non devono alterare artificialmente le date.

Fonti: [Next.js permanentRedirect](https://nextjs.org/docs/app/api-reference/functions/permanentRedirect), [Google: sitemap e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Verificare il comportamento con Next.js 15 installato nel progetto.

### 05 · Completare metadati e anteprime social

**Priorità P1. Sforzo medio.**

File: `src/app/layout.tsx`, pagine settore, servizi, contatti, chi siamo e articoli; possibile helper `src/lib/metadata.ts`; immagini in `public/images/og/`.

Creare un'immagine generale e una variante per ristoranti, usando foto e marchio già presenti. Definire titolo, descrizione, URL canonico, Open Graph e Twitter coerenti per ogni pagina. Verificare l'ereditarietà dei metadati Next.js, senza presumere che i campi annidati si uniscano automaticamente. Un helper serve soltanto se semplifica la coerenza.

Conservare il LocalBusiness esistente; controllare indirizzo, orari e copertura rispetto ai contenuti visibili. Non inserire rating aggregati o recensioni autoattribuite nei dati strutturati. Le pagine principali hanno già title e H1: non introdurre cambi generalizzati per inseguire una lunghezza prefissata.

**Accettazione:** titolo e descrizione specifici, canonical corretto, immagini raggiungibili con URL assoluti e anteprima leggibile; nessuna duplicazione del nome del brand. Verifica nel DOM renderizzato e nell'HTML destinato ai crawler.

## Rilascio 3: offerta e pagine che aiutano a scegliere

### 06 · Rendere concreta l'assistenza

**Priorità P1. Sforzo medio.**

File: `src/content/site.ts`, `src/app/(site)/prodotti-assistenza/page.tsx`, `src/components/ContactCta.tsx`, `src/components/ContactForm.tsx`, layout settore.

Centralizzare un piccolo insieme di informazioni sull'assistenza: territorio, modalità, orari di contatto, dati utili per diagnosticare la richiesta e nota sul ricontatto. Distinguere orario della sede e copertura contrattuale del servizio. Pubblicare tempi garantiti soltanto quando definiti dal titolare.

Arricchire il blocco `#riparazioni` esistente con un riferimento esplicito alle casse e ai gestionali. Mantenere l'anchor per non rompere i collegamenti. Inserire un link contestuale dalle pagine settore. Una riga vicino al modulo spiega come avviene il ricontatto, senza allungare le schede prodotto.

Testo di partenza, basato sull'offerta già descritta: “Indicaci il modello, cosa succede e il comune in cui lavori. I nostri tecnici ti ricontattano per capire quale intervento serve.”

**Accettazione:** informazioni coerenti in tutte le pagine; recapito e modalità comprensibili; nessuna promessa 24/7 o di intervento immediato implicita. Nessuna nuova pagina assistenza in questa prima fase: la si valuta sui dati dopo l'ampliamento.

### 07 · Migliorare la scelta nei settori, iniziando dai ristoranti

**Priorità P1 per ristoranti; P2 per gli altri. Sforzo medio.**

File: `src/content/sectors.ts`, `src/app/(site)/soluzioni/[settore]/page.tsx`, `src/components/SolutionCard.tsx` soltanto se necessario.

- Aggiungere al tipo `Sector` un `solutionsHeading` per evitare lo stesso H2 generico ovunque. Ristoranti: “Casse e gestionali per il tuo ristorante”; bar: “Cassa essenziale o gestionale per il bar”.
- Ampliare selettivamente le FAQ: scelta tra configurazioni, hardware riutilizzabile, moduli e canoni, installazione e formazione. I dettagli dipendono dalla validazione tecnica già richiesta nelle note del progetto.
- Mantenere le schede concise. Evitare classifiche “economico/premium”, prezzi o differenze tra ATS 2 e ATS 3 non documentate.
- Collegare assistenza e approfondimenti con testi descrittivi. Conservare l'anchor `#richiedi-proposta`, il modulo a tre campi e l'oggetto automatico.
- Nella home sostituire il sottotitolo generico con una sintesi del servizio: “Ti aiutiamo a scegliere la cassa, la installiamo e ti seguiamo nell'assistenza, con tecnici in Trentino.” Mantenere una CTA breve e chiara; non allungare i pulsanti per finalità SEO.

**Accettazione:** pagina ristoranti coerente con gli annunci; differenze leggibili anche a FAQ aperte; nessun aumento dei campi obbligatori; mantenuta la gerarchia grafica scelta dall'utente.

### 08 · Semplificare il contatto generico mantenendo il contesto

**Priorità P2. Sforzo basso/medio.**

File: `ContactForm.tsx`, pagina contatti, `site.ts`, validazione contatti e relativi test.

Rendere facoltativo l'oggetto libero nella sola pagina contatti e assegnare lato server un oggetto generico quando assente. Nome, email e messaggio restano richiesti. Il settore conserva l'oggetto precompilato. La motivazione è ridurre un campo poco necessario, non correggere un modulo attualmente rotto.

In alternativa a nuove scelte obbligatorie, ricavare il contesto dal punto di ingresso con valori controllati. Aggiungere autocomplete appropriato a nome/email e verificare focus, stato di invio ed errore.

**Accettazione:** invio generico possibile senza oggetto; contatti per settore ancora identificabili; errori preservano i dati; nessuna variazione alle protezioni server.

## Rilascio 4: prove concrete e contenuti utili

### 09 · Aggiungere un caso cliente autorizzato

**Priorità P1 quando i materiali sono disponibili. Sforzo medio.**

Nuovi file proposti: `src/content/case-studies.ts`, `src/components/CaseStudy.tsx`; utilizzo nel layout settore e, per una sintesi, nella home.

Definire contenuti tipizzati: settore, attività, località, problema iniziale, soluzione installata, risultato documentabile, foto e citazione approvate. Pubblicare inizialmente un solo caso ristoranti, vicino al punto di richiesta, con testo breve e approfondimento opzionale.

Non mostrare riquadri vuoti, nomi fittizi, risultati ipotetici o stelle statiche. Le autorizzazioni sono gestite fuori dal bundle pubblico; nel codice si pubblicano soltanto i materiali approvati. Se manca il caso, questa sezione non viene renderizzata e gli altri rilasci possono procedere.

**Accettazione:** fonte e autorizzazioni disponibili, immagini ottimizzate, contenuto pertinente al settore, nessuna alterazione delle dichiarazioni del cliente.

### 10 · Rendere gli articoli collegati al percorso commerciale

**Priorità P2. Sforzo medio.**

File: `src/content/site.ts` oppure nuovo `src/content/articles.ts`, `src/app/(site)/news/[slug]/page.tsx`, sitemap; CTA e collegamenti con componenti esistenti.

- Introdurre data di revisione reale e fonti per gli articoli, distinta dalla data di pubblicazione.
- Rivedere la guida RT–POS rispetto alle fonti ufficiali aggiornate prima di correggere o ripubblicare istruzioni normative. Il piano non stabilisce nuovi obblighi o scadenze.
- Inserire una CTA contestuale alla guida e collegamenti ai servizi pertinenti.
- Preparare una guida breve alla scelta della cassa soltanto dopo aver raccolto le domande dei clienti; usare titoli e casi utili ai quattro settori.
- Conservare per ora il redirect `/news`. Quando gli articoli pubblicati diventano almeno due, decidere esplicitamente il ripristino di un indice utile; non lasciare nuove guide irraggiungibili né cambiare l'indice prima che serva.

**Accettazione:** fonti e data editoriale visibili, URL stabili, collegamenti funzionanti, nessuna ripetizione di contenuti già coperti nelle pagine settore.

### 11 · Allineare documentazione, affermazioni aziendali e informativa

**Priorità P1 per le dichiarazioni usate in acquisizione; P2 per la pulizia documentale. Sforzo basso/medio.**

File: `README.md`, `docs/revisione-pagine-settori.md`, `site.ts`, pagina privacy; eventuale documento di collaudo operativo.

Rivedere il README: alcuni TODO indicano ancora telefono e privacy come incompleti, mentre il codice li contiene. Documentare contesto dei lead, destinatario configurato, verifica GA4/Ads e responsabilità di gestione.

Verificare con Mifro perimetro della dichiarazione “oltre 1.000 clienti”, documentazione delle certificazioni, disponibilità e condizioni dei prodotti. L'attuale riferimento alla versione ISO 9001:2008 va confrontato con il certificato effettivo; non sostituirlo automaticamente con un altro standard né dichiararlo invalido senza prova.

Aggiornare l'informativa quando cambia il flusso operativo: destinatario delle email, strumenti di misura e dati raccolti. Correggere i riferimenti descrittivi alle pagine che ospitano la mappa. Definire una data di revisione reale al posto del solo anno corrente. La revisione dei contenuti normativi richiede la verifica competente; non trattare questa lettura del codice come attestazione di conformità.

## Rilascio 5: prestazioni e affidabilità, guidate dai riscontri

### 12 · Verificare esperienza mobile e costo dei componenti esterni

**Priorità P2; diventa P0 solo in presenza di un blocco riprodotto. Sforzo medio.**

File potenzialmente coinvolti: `src/app/layout.tsx`, `AnalyticsConsent.tsx`, `MapEmbed.tsx`, `Footer.tsx`, `globals.css` e componenti immagine.

Misurare prima di ottimizzare: caricamento della pagina ristoranti, immagine principale della home, font, chat e mappa. Verificare a 320, 390, 768 e 1440 px menu, consenso, widget chat e CTA, con tastiera e movimento ridotto. Nessuna sovrapposizione o lentezza viene dichiarata certa dalla sola lettura del codice.

Se la chat pesa o copre elementi, intervenire su caricamento, posizione e apertura mantenendo un accesso utile. Conservare il caricamento della mappa su richiesta. Evitare nuove barre fisse che competono con gli elementi già presenti.

**Accettazione:** nessuna regressione nei percorsi, componenti interattivi raggiungibili, immagini appropriate al dispositivo, report prestazionale prima/dopo solo per interventi realmente necessari.

## Ordine operativo e dimensione del lavoro

| Lotto | Contenuto | Dipendenze | Stima di lavoro attivo |
|---|---|---|---|
| A | Lead per settore, recapito esplicito, collaudo consenso e documentazione conversioni | Identificazione destinatario e accessi per il controllo esterno | 1,5–3 giornate |
| B | Redirect, sitemap e metadati/anteprime | Materiali grafici già disponibili; decisione sulle date editoriali | 0,5–1 giornata |
| C | Assistenza, testi e FAQ ristoranti, alleggerimento contatto generico | Condizioni e configurazioni approvate da Mifro | 1–2 giornate |
| D | Caso cliente e revisione articoli | Autorizzazioni, materiali e verifica delle fonti | 1–2 giornate, oltre la raccolta materiali |
| E | Verifica finale mobile, prestazioni e rilascio | Lotti inclusi nel rilascio completati | 0,5–1 giornata |

**Ordine di grandezza: 5–9 giornate di lavoro attivo**, con possibile sovrapposizione tra sviluppo e raccolta contenuti. È una stima di pianificazione, non un preventivo né una scadenza promessa; esclude attese, creazione di materiali non disponibili e gestione continuativa delle campagne. Il primo rilascio utile può includere A, B e la parte di C basata su informazioni già confermate.

Il via libera tecnico alla campagna richiede almeno: recapito collaudato, referente assegnato, evento del settore misurato senza duplicazioni e pagina coerente con gli annunci. I casi cliente migliorano la forza della pagina ma la loro assenza non è un guasto tecnico.

## Verifiche e criterio di completamento

**Eseguito nella ricognizione iniziale, prima dell’implementazione:** `npm test` superato, 5 test su 5 con SMTP simulato; `npm run lint` superato. Nessuna email inviata. Non sono stati eseguiti build di produzione, test browser nuovi o verifiche nelle console proprietarie in questo turno.

Durante l'implementazione:

1. Estendere i test significativi per contesto ammesso/rifiutato, compatibilità dei payload precedenti, destinatario mancante, oggetto generico e assenza di dati personali negli eventi.
2. Simulare in browser successo e fallimento del server, invio ripetuto, consenso accettato/rifiutato e refresh di `/grazie`. Non sostituire l'esito di questi test al collaudo SMTP operativo.
3. Eseguire lint, TypeScript, test e build. La build può essere fatta su copia temporanea per non interferire con il server di sviluppo; non copiare credenziali o archivi non necessari.
4. Controllare tutte le route principali, 404 di settore sconosciuto, redirect, sitemap, canonical, anteprime e modulo dopo navigazione tra settori.
5. Revisionare gli screenshot dei componenti modificati e verificare mobile/tastiera. Provare i difetti tecnici nel browser prima di descriverli come risolti.
6. Documentare quali configurazioni GA4, Ads, Search Console e Vercel sono state effettivamente verificate. Tenere separate verifiche locali, preview e produzione.

Ogni lotto va isolato in un cambiamento revisionabile. Per un rollback ripristinare insieme contenuti e comportamento associato; per le conversioni annotare anche eventuali modifiche nelle console. Nessun deploy o avvio Ads è implicito nella sola preparazione di questo piano.

## Attività esterne al codice e sviluppi successivi

| Attività | Passo concreto | Perché non è una modifica del sito |
|---|---|---|
| Google Business Profile | Verificare dati, orari, foto e link; organizzare richiesta recensioni | Richiede la scheda e una routine aziendale |
| Preventivi e ricontatti | Assegnare referente, stato e prossima azione nel sistema già usato | Il sito raccoglie richieste, non sostituisce la gestione commerciale |
| Campagna da 1.000 €/mese | Configurare il progetto Ads dopo il collaudo del lotto A | Budget e conversioni vanno verificati nell'account; nessuna spesa in questo piano |
| Email post-installazione e promemoria | Definire destinatari, motivo e tempi del contatto dal lavoro reale | Non serve aggiungere una newsletter al form commerciale |
| Social e partner locali | Riutilizzare il caso cliente e i materiali verificati | Non richiedono nuovi componenti o canali aperti automaticamente |
| Pacchetti assistenza | Definire capacità, inclusioni e condizioni prima dei testi | È una decisione di servizio, non una semplice frase da pubblicare |

Rimandare CRM integrato, database lead, automazioni di rinnovo, e-commerce, rifacimento grafico e nuove pagine per ogni comune finché i dati non ne dimostrano il bisogno. Se il traffico cresce o si osservano perdite/duplicazioni, valutare separatamente coda email, idempotenza e archivio: il codice attuale documenta già i limiti del solo SMTP e del rate limit per istanza.

La priorità rimane rendere verificabile il percorso commerciale già presente, consolidare la SEO e aggiungere prove dell'assistenza che Mifro può mantenere.
