# Collaudo delle modifiche marketing

24 ottobre 2026. Repository `/home/davide/personal/sito_mifro`, base `f561f02`.
Modifiche locali non committate e non pubblicate. Flusso confermato: Davide → Mifro.

## Esito finale

| Controllo | Esito |
| --- | --- |
| Installazione pulita `npm ci` | Superata su copia isolata |
| `npm audit` | Zero vulnerabilità segnalate, incluse le dipendenze di sviluppo |
| `npm run lint` | Superato |
| `npm run typecheck` | Superato |
| `npm test` | 9 test superati; SMTP simulato |
| `npm run build` | Superata, 22 pagine generate, Next.js 15.5.28 |
| `MIFRO_TEST_PORT=3219 npm run test:browser` | 26 test superati |
| `MIFRO_TEST_PORT=3219 npm run test:analytics` | 1 test superato dopo la correzione GA4 |
| `git diff --check` | Superato |

Build e browser eseguiti in `/tmp/mifro-fix-uepnqdiy`, con installazione pulita,
senza file `.env`, credenziali, `.git` o archivi manuali. Nessuna email o richiesta
di raccolta Analytics del collaudo è stata inviata. I servizi esterni sono simulati
nella suite ordinaria; il controllo Analytics separato usa il tag pubblico reale
ma intercetta tutte le richieste esterne del browser.

## Correzioni completate

- Contesto di settore validato in modulo, email e `generate_lead`; Contattaci nel
  menu desktop/mobile porta al modulo locale di tutti e quattro i settori.
- Oggetto generico facoltativo, dati preservati dopo errore, focus accessibile,
  protezione dal doppio invio e conferma soltanto dopo accettazione SMTP.
- `CONTACT_TO` obbligatorio senza fallback; flusso Davide → Mifro mantenuto.
- Lead e clic telefono/WhatsApp distinti e subordinati al consenso.
- Redirect permanente, sitemap senza date artificiali, metadati completi e due
  immagini social 1200×630; test sitemap legato alle date editoriali, non a una data fissa.
- Testi home/assistenza, H2 per settore, FAQ e collegamenti contestuali.
- Articoli in `src/content/articles.ts`, con tipo dedicato e download, fonti,
  collegamenti e CTA configurabili. Contenuto RT–POS e relativo URL conservati.
- Font Inter locale, chat compatta e protezione delle preferenze cookie.
- Aggiornamenti correttivi delle dipendenze, mantenendo Next 15; override mirato
  PostCSS 8.5.31, Nodemailer 10.2.1 e Sharp 0.35.5 verificati con installazione pulita.
- Workflow CI per installazione, audit, lint, test, build, TypeScript e browser;
  predisposto localmente, non ancora eseguito da GitHub.
- Documentazione riallineata. Caso cliente e predisposizione rimossi su richiesta;
  dati aziendali non disponibili e seconda guida esclusi dall’intervento corrente.

## Configurazione Google verificata e corretta

Nella proprietà `mifro.it` (526284251), stream `G-PHX0Y4MJH3`, tramite la sessione
Chrome autorizzata sono state eseguite queste modifiche:

1. Eliminata la regola `ads_conversion_SUBMIT_LEAD_FORM_1` generata da `page_view`
   con percorso che iniziava con `/grazie`, e rimossa la relativa marcatura di evento chiave.
2. Marcato `generate_lead` come evento chiave senza valore monetario predefinito.
3. Registrate le dimensioni evento `sector`, `form_location`, `channel`, `page_type`.

Il controllo iniziale con loader reale riproduceva due conversioni derivate per
un invio più refresh. Dopo la correzione lo stesso controllo passa: un solo
`generate_lead`, settore ristoranti conservato e nessuna conversione derivata su
`/grazie`. Sono osservate anche le page view dopo navigazione Next.js, leggendo i
POST raggruppati. Nessun invio manuale parallelo di page view è stato aggiunto.

L’account Ads Chrome era **DavideDev**, con più proprietà. L’azione Mifro
`SUBMIT_LEAD_FORM` (7851721144) è stata temporaneamente resa secondaria e poi
**ripristinata a Primary**, su precisazione dell’utente, verificando il salvataggio.
Nessuna campagna, budget o conversione di `davidedev.me` è stata modificata o
cancellata. La procedura di una nuova conversione è stata abbandonata prima della
creazione in DavideDev. Su successiva richiesta è stato creato l’account separato
**Mifro (276-321-8107)** e collegata GA4; l’utente ha completato fatturazione e
identità. Il centro clienti resta incompleto per un limite Google. È stata completata
una sola campagna Search con quattro gruppi e budget comune. Dopo la preparazione
in bozza, l’utente ha segnalato la pubblicazione: verificata la campagna live a
5 €/giorno. L’agente ha completato i tre gruppi mancanti in pausa, senza modificare
budget o attivazione della campagna. L’utente ha poi confermato di aver abilitato
personalmente tutti i gruppi, ora verificati Enabled.
Dettagli in [misurazione-conversioni.md](misurazione-conversioni.md).

## Limiti delle verifiche

- Le quattro variabili server risultano presenti in Vercel Production. Una richiesta
  vuota al modulo pubblicato restituisce 400 di validazione; non è stato eseguito
  un invio email reale, quindi ricezione, Spam e Reply-To non sono collaudati sul servizio.
- I test browser coprono consenso, quattro settori e modulo generico, percorsi menu
  desktop/mobile, errori, doppio invio, refresh, navigazione, clic, metadati, sitemap,
  articoli, immagini social, FAQ da tastiera, mappa e layout a 320/390/768/1440 px.
  La suite simula Chatwoot; non certifica il comportamento del servizio remoto.
- DebugView, storico Search Console, anteprime social pubblicate e metriche di
  prestazione sul campo non sono stati verificati. Bundle: home 113 kB, contatti
  116 kB, settori 122 kB; non sono tempi di caricamento né Core Web Vitals.
- Nessun deploy o attivazione di campagne eseguito dall’agente. Il budget suggerito
  nella bozza era stato azzerato; dopo la pubblicazione segnalata dall’utente sono
  stati osservati 5 €/giorno, lasciati invariati. Il pacchetto locale non assegna
  budget. I quattro gruppi sono verificati nell’account dedicato. La conversione Ads
  **Form (7869328228)** importa `generate_lead` da GA4 `mifro.it`: Primary, conteggio
  Una, nessun valore monetario, verificati dopo reload. L’attribuzione di un clic
  pubblicitario reale non è collaudata.


## Preparazione Google Ads — 24 ottobre 2026

L’utente ha confermato **una campagna Search, quattro gruppi** (Ristoranti, Bar,
Parrucchieri e Ambulanti), inizialmente senza budget. In seguito ha segnalato che
la campagna era live: nell’account erano presenti solo Parrucchieri e un budget
di 5 €/giorno. L’agente ha quindi completato la struttura, lasciando i tre nuovi
gruppi in pausa e mantenendo budget e attivazione già presenti. L’utente ha poi
confermato di aver abilitato personalmente tutti i gruppi; lo stato Enabled è
stato osservato per tutti e quattro in Chrome.

| Elemento | Stato verificato |
| --- | --- |
| Account Mifro | Creato, ID `276-321-8107`, distinto da DavideDev |
| Centro clienti | Configurazione incompleta: limite Google alla creazione di account amministratore |
| Conversione | Unica azione primaria Form, ID `7869328228`, GA4 `mifro.it` / `generate_lead`, conteggio Una, senza valore monetario |
| Campagna Google Ads | `MIFRO \| Search \| Casse e Gestionali \| Trentino`, ID `24392958197`, Enabled, 5 €/giorno già presenti al nuovo controllo |
| Parrucchieri e saloni | Gruppo esistente rinominato da Ad group 1, già abilitato, 1 annuncio e 10 keyword |
| Ristoranti e pizzerie | Completato in pausa, poi abilitato dall’utente; Enabled, 1 annuncio e 10 keyword |
| Bar e caffetterie | Completato in pausa, poi abilitato dall’utente; Enabled, 1 annuncio e 10 keyword |
| Ambulanti e mercati | Completato in pausa, poi abilitato dall’utente; Enabled, 1 annuncio e 10 keyword |
| Esclusioni | Salvate 16 comuni di campagna e 18 specifiche di gruppo, tutte con corrispondenza a frase |

La procedura Chrome è stata verificata sia dalla panoramica sia da Campagne →
Nuova campagna. Nella bozza non è stato trovato un comando per aggiungere altri
gruppi; il menu del gruppo mostrava soltanto Rimuovi. La bozza vuota usata per
verificare il secondo percorso è stata eliminata, conservando quella con i testi.
La successiva pubblicazione segnalata dall’utente ha reso disponibile il percorso
Campagne → Gruppi di annunci → +, usato per completare i tre gruppi mancanti.
Per evitare erogazione durante la preparazione, ciascuno è stato creato senza
annunci, messo in pausa e poi completato con l’annuncio dedicato. Verificati
nell’interfaccia quattro annunci, 40 keyword e 34 esclusioni. I nuovi annunci
riportavano “Ad group paused” prima dell’abilitazione confermata dall’utente.
La bozza originaria aveva ID `281499369602634`.

È presente un asset messaggi condiviso di campagna con testo specifico per
parrucchieri. Testo e recapito restano da verificare per l’uso nei quattro settori;
non è stato modificato in questo completamento. Non è stato eseguito un test
reale del contatto WhatsApp o dell’attribuzione pubblicitaria.

### File locali e ripresa del lavoro

La sorgente è [google-ads/campagne.json](google-ads/campagne.json). Rigenerare con
`python3 docs/google-ads/esporta.py`: 1 campagna, 4 gruppi, 4 annunci responsive,
40 keyword e 34 esclusioni. Sono verificati limiti di lunghezza, URL di settore,
assenza di budget e assenza di conflitti diretti fra keyword ed esclusioni.
Non è stata eseguita un’importazione in Google Ads Editor.

I CSV 01–05 contengono campagne, gruppi, annunci, keyword ed esclusioni. Il primo
usa `Campaign status: Scratchpad` (bozza locale Editor) e budget vuoto; gruppi,
annunci e keyword hanno stato Paused. Le esclusioni specificano il livello con
`Type: Campaign negative` oppure `Negative`, e la corrispondenza a frase con le
virgolette nel testo. Verificare livello e corrispondenza nell’anteprima Editor.
[Colonne CSV Google](https://support.google.com/google-ads/editor/answer/57747?hl=en),
[tipi di corrispondenza](https://support.google.com/google-ads/editor/answer/47635?hl=en).

Questi CSV **non configurano** territorio, opzione Presenza, orari, strategia di
offerta, conversioni o asset aggiuntivi: i valori previsti sono nel JSON e vanno
controllati nell’interfaccia prima di un futuro avvio. I CSV restano un pacchetto
locale conservativo senza budget e con stato Scratchpad: **non importarli come
nuova campagna**, perché quella esistente è già stata completata tramite Chrome.
Lo stato dell’account è distinto dai vincoli dell’esportazione e registrato in
`google_ads_state` nel JSON. Tutti e quattro i gruppi sono ora abilitati dall’utente;
lo stato Paused dei CSV è una precauzione per l’esportazione locale, non lo stato live.
