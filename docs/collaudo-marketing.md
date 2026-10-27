# Collaudo delle modifiche marketing

## Ricontrollo con Tag Assistant — 26 ottobre 2026, ore 19:55

Account Ads Mifro `276-321-8107`, campagna `24392958197`, periodo **24–26 ottobre**:
**2 impressioni, 0 clic, 0,00 € di costo, 0 conversioni**. Entrambe le impressioni
sono del 26 ottobre. È quindi confermato l’avvio dell’erogazione, ma non risultano
ancora visite provenienti dai clic della campagna. Budget 5 €/giorno, strategia
Maximize conversions, stato Eligible (Limited), avviso sul monitoraggio incompleto
e strategia in apprendimento. Il dettaglio di Form rimane Awaiting conversions;
la sua scheda Diagnostics non presenta ulteriori indicazioni operative.

Eseguita una sessione Tag Assistant su
`https://www.mifro.it/soluzioni/parrucchieri-saloni`: collegamento riuscito,
un tag rilevato (`G-PHX0Y4MJH3`, nome Mifro), hit `page_view` inviato alla
destinazione corretta e Console (0). Al momento di `config`, Tag Assistant
mostra default denied e aggiornamento/current state granted per `ad_storage`,
`analytics_storage`, `ad_user_data`; `ad_personalization` resta denied.
La sessione utilizzava il consenso già presente nel browser. Terminata tramite
Finish nel badge del sito. Nessun modulo inviato e nessun `generate_lead` di prova:
è un controllo del tag e del consenso, **non** una verifica dell’invio completo
del modulo o dell’attribuzione della conversione in Ads.

L’avviso non è risolto. Il basso volume è compatibile con gli avvisi diagnostici
documentati da Google, ma non è una prova esclusiva della loro causa. Il trascorrere
di 48 ore non sostituisce la verifica di una conversione effettiva. Nessuna modifica
a budget, offerte, conversioni o account DavideDev. Evidenze della sessione in
`/tmp/mifro-ads-24-26-oct-2026.png` e
`/tmp/mifro-tag-assistant-consent-20261026.png` (file temporanei).

## Ricontrollo — 25 ottobre 2026, ore 19:20

Verifica in Chrome dopo la nuova segnalazione dell’utente:

- Ads Mifro `276-321-8107`: **Form (7869328228)** resta **Awaiting conversions**.
  Il dettaglio riporta creazione il 24 ottobre, evento GA4 `generate_lead`, proprietà
  `mifro.it`, azione primaria Submit lead forms e conteggio Una.
- GA4: `generate_lead` è un evento chiave e lo stream Mifro ha ricevuto dati.
  Nel report Eventi, periodo **27 settembre–24 ottobre**, risultano **2 eventi,
  1 utente**: una sessione `(direct) / (none)` e una `google / organic`.
  Il dettaglio temporale mostra un evento il 24 ottobre. Non sono necessariamente
  due clienti distinti; la sorgente di sessione non dimostra l’intero percorso
  di attribuzione. Nessun evento è stato generato durante questo ricontrollo.
- Il report filtrato su `generate_lead` per il **25 ottobre** mostra «No data
  available» al momento del controllo; i dati del giorno possono essere incompleti.
- Collegamento GA4 → Ads Mifro presente, completato il 24 ottobre;
  Admin → Account settings di Ads conferma **Auto-tagging = Yes**.
- Il riepilogo Ads, esteso al 24–25 ottobre, mostra risultati «Upcoming».
  La tabella non espone le metriche standard anche dopo ricaricamento: non è
  stata verificata una quantità numerica di impressioni, clic o spesa.

Non emerge una configurazione mancante dai controlli effettuati. Rimane
**non verificata l’attribuzione di una richiesta alla campagna** e l’avviso
generale è ancora presente. La ricezione GA4 è ora confermata anche per
`generate_lead`, oltre al precedente evento diagnostico; non prova da sola
una conversione pubblicitaria. Nessuna modifica a campagne, offerte, budget,
azioni di conversione o account DavideDev.

Google indica [24–48 ore per aggiornare la diagnostica dopo correzioni al tag,
con possibili falsi positivi a basso volume](https://support.google.com/google-ads/answer/9148089?hl=it).
Il consenso corretto è stato pubblicato il 24 ottobre alle 23:16: al controllo
sono trascorse circa 20 ore. Questo non garantisce la scomparsa automatica
dell’avviso. [Ads importa gli eventi chiave attribuibili alle proprie campagne](https://support.google.com/analytics/answer/13684192?hl=it),
non ogni invio presente in GA4. Ricontrollare il 26 ottobre; se persiste oltre
la finestra di aggiornamento, verificare la diagnostica del tag con Tag Assistant
e un percorso di invio controllato, senza creare conversioni duplicate.

## Diagnostica Ads — 25 ottobre 2026

L’utente ha attivato Maximize conversions, confermato dallo screenshot delle
impostazioni, mantenendo 5 €/giorno e Submit lead forms. Ha poi segnalato
«Eligible (Limited)» e «Conversion tracking setup is incomplete».

Controllo diretto in Chrome, account Mifro 276-321-8107, Goals → Conversions →
Summary: obiettivo predefinito Submit lead form usato da 1 campagna su 1;
un’unica azione **Form**, primaria, origine Website (Google Analytics GA4),
zero conversioni, stato **Awaiting conversions**. Il tooltip specifica che
l’azione è stata creata di recente e possono servire fino a 48 ore per registrare
conversioni. Il riepilogo dell’obiettivo mostra ancora Needs attention.

L’avviso generale non è stato dichiarato risolto. Nessuna nuova azione creata,
nessuna modifica al budget o alle offerte, nessun clic pubblicitario o falso lead
generato. Il precedente evento diagnostico conferma la ricezione GA4, non una
conversione attribuita in Ads. Trascorso il periodo indicato da Google, ricontrollare
lo stato; se persiste un errore o mancano conversioni attese, serve il collaudo
assistito dell’evento effettivo e del collegamento Ads.

## Aggiornamento: consenso Ads pubblicato — 24 ottobre 2026, ore 23:16

Pubblicato su [www.mifro.it](https://www.mifro.it) il consenso esplicito per la
misurazione pubblicitaria e l'informativa aggiornata. Deployment Vercel
`dpl_FUuy6BqV3oT67rZR6B5QBtf8ozRp`, stato Ready, alias di produzione verificato.
Base del codice `9e94807`; modifiche del presente intervento nel workspace, senza commit.
Budget, stato degli annunci e strategia di offerta non modificati da questo intervento.

Verifiche sulla copia isolata `/tmp/mifro-measurement-jbiik310`, senza `.env`:

- Lint, typecheck, build (22 pagine) e 10 test Node superati; audit delle dipendenze
  di produzione senza vulnerabilità.
- 30 scenari browser esistenti verificati più 6 nuovi scenari di consenso: scelta,
  ripristino, revoca Ads/completa, preferenze storiche, sincronizzazione tra schede,
  schermo da 320 px e conservazione di `gclid` nel passaggio al modulo.
- Due scenari con loader Google reale superati: consenso alle sole statistiche e
  consenso anche ad Ads. Un solo lead, nessun duplicato su `/grazie`, segnali
  `gcs=G101`/`G111`, `gcd` presente, `npa=1`. Raccolta e SMTP intercettati.
- Separata la cartella degli artefatti del collaudo Google per evitare interferenze
  con i test browser eseguiti in parallelo. Corretto il test di navigazione per
  attendere l'aggiornamento asincrono della URL; il comportamento applicativo era corretto.

Controllo post-rilascio sui quattro URL finali, tutti 200: un lead con contesto
corretto dopo successo simulato per settore; ripetuti anche «Solo statistiche» e
«Rifiuta». Nessun tag prima della scelta; nessun lead con rifiuto. Queste prove
intercettano tutti i POST del modulo e la raccolta: nessuna email o conversione
fittizia è stata inviata.

Controllo separato della raccolta reale: evento diagnostico `measurement_check`,
`check_id=consent_v2_20261024`, diretto a `G-PHX0Y4MJH3`, con risposta Google 204,
`gcs=G111`, `gcd=13r3r3r2q7l1`, `npa=1`. Non è un `generate_lead` e non è stato
marcato come evento chiave o importato come conversione. L'esito nei report è
distinto dalla sola risposta dell'endpoint ed è riportato sotto.

Alle 23:22 verificato in Chrome **GA4 → Reports → Realtime overview**:
`measurement_check` presente, conteggio 1; aprendo il parametro `check_id` compare
`consent_v2_20261024`. Il riquadro Key events non contiene eventi del collaudo.
È quindi confermata la ricezione nel report della proprietà Mifro, oltre alla
risposta 204. DebugView non ha mostrato il dispositivo nel controllo effettuato;
la prova di ricezione è quella in Realtime, non una verifica DebugView.

Ricontrollata in Chrome l'azione Ads Mifro **Form (7869328228)**: primaria,
GA4 `generate_lead`, proprietà `mifro.it`, conteggio Una, nessun valore monetario,
attribuzione basata sui dati per i canali Google a pagamento. L'attribuzione di
un contatto effettivo resta da osservare sul primo clic pubblicitario che produca
una richiesta: non sono stati generati clic sugli annunci o falsi lead per provarla.

## Resoconto precedente alla pubblicazione

24 ottobre 2026. Repository `/home/davide/personal/sito_mifro`, base `f561f02`.
Modifiche locali non committate e non pubblicate. Flusso confermato: Davide → Mifro.

## Esito del primo collaudo

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
