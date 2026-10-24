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
creazione. Per Mifro serve un account Ads separato, non creato in questa sessione.
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
- Nessun deploy, attivazione di campagne o modifica ai budget. La configurazione Ads
  Mifro rimane separata dalle correzioni tecniche e richiede un account dedicato.
