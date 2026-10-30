# Mifro – Sito Web Aziendale

Sito web aziendale per **Mifro S.a.s.** di Pergine Valsugana (TN).
Realizzato con Next.js (App Router), TypeScript e Tailwind CSS.

## Quick start

Node.js 22 (almeno 22.17), indicato anche in `.nvmrc`.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # Build di produzione
npm start        # Serve la build di produzione
```

## Struttura del progetto

```
src/
├── app/
│   ├── layout.tsx              # Root layout (font, metadata, JSON-LD)
│   └── (site)/
│       ├── layout.tsx          # Layout con Navbar + Footer
│       ├── page.tsx            # Home
│       ├── soluzioni/page.tsx  # Reindirizzamento ai settori in home
│       ├── chi-siamo/page.tsx  # Chi siamo
│       └── contatti/page.tsx   # Contatti
├── components/                 # Componenti riutilizzabili
├── content/
│   ├── site.ts                 # Contenuti generali del sito
│   ├── sectors.ts              # Contenuti delle pagine per settore
│   └── articles.ts             # Articoli tipizzati, fonti, download e CTA
└── lib/
    └── utils.ts                # Utility (cn)
```

## Come modificare i contenuti

I testi generali, i contatti, gli orari, i link e le label sono in:

```
src/content/site.ts
```

Modifica le proprietà dell'oggetto `siteConfig` e il sito si aggiornerà automaticamente.

### Flusso e perimetro dell’intervento

Il flusso confermato è **Davide → inoltro a Mifro**. La configurazione Vercel di
produzione contiene le quattro variabili richieste; la consegna SMTP resta distinta
dalla verifica tecnica della presenza delle variabili.
L’utente ha escluso i casi cliente e chiesto di ignorare per questo intervento le
informazioni aziendali non disponibili. Non sono introdotte nuove certificazioni,
condizioni commerciali o promesse di tempi garantiti. La bozza della nuova guida
resta interna e non costituisce un’attività da completare in questo rilascio.

### Google Maps

Per abilitare l'iframe della mappa, inserisci l'URL embed in:

```ts
contact: {
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=..."
}
```

Se il campo è vuoto viene mostrato un box placeholder con link a Google Maps.

## Immagini

Le immagini vanno in `public/images/`. I path sono definiti in `site.ts`:

| Proprietà            | File atteso                |
|----------------------|----------------------------|
| `logo`               | `/images/logo-mifro.png`   |
| `hero.image`         | `/images/hero.jpg` |
| `about.localPresence.image` | `/images/vetrina-mifro.jpg` |
| `partner.logo`       | `/images/logo-rch.png`     |

Sostituisci i file e il sito li utilizzerà automaticamente.

La home usa la foto presente nell’ultimo commit di `main` al momento del
ripristino: `f6b5259:public/images/hero.jpg` (1536 × 927 px), come chiarito
dall’utente. Il file è identico a quello del commit. Le precedenti varianti
restano conservate insieme alle relative note in `docs/`.

## Tech stack

- **Next.js 15** (App Router, Static Generation)
- **React 18**
- **TypeScript**
- **Tailwind CSS 4**
- **lucide-react** (icone)

## Modulo contatti: Gmail e conversioni

Il form invia JSON a `/api/contact`. Il server valida i campi, invia un'email
in testo semplice via Gmail SMTP (TLS, porta 465) e, solo dopo l'accettazione SMTP,
rilascia un cookie HttpOnly firmato valido dieci minuti per `/grazie`.
L'indirizzo del visitatore è il Reply-To; mittente e destinatario sono configurati
sul server, mai scelti dal visitatore. Nessun database delle richieste.

### Attivazione su Vercel

In Google attivare la verifica in due passaggi e creare una **password per le app**
chiamata “Sito Mifro”: https://myaccount.google.com/apppasswords.
Non usare la password principale dell'account e non inserire segreti nel repository.

In Vercel → progetto → Settings → Environment Variables impostare per Production:

| Variabile | Valore |
| --- | --- |
| `SMTP_USER` | `davidemichelon10@gmail.com` |
| `SMTP_PASSWORD` | Password per le app generata da Google |
| `CONTACT_TO` | `davidemichelon10@gmail.com` |
| `CONTACT_FORM_SECRET` | Stringa casuale di almeno 32 caratteri, generabile con `openssl rand -hex 32` |

Eseguire un nuovo deploy. Per prove locali copiare `.env.example` in `.env.local`
e compilare le variabili. Per Preview usare credenziali/indirizzo di test, se necessario.
`CONTACT_TO` è obbligatorio e deve contenere un solo indirizzo: non esiste un destinatario di ripiego. Se la configurazione manca o non è valida il form mostra un errore di indisponibilità, senza falsa conferma.
Cambiare il segreto invalida i cookie di conferma già emessi.

### Google Analytics

La proprietà esistente è `G-PHX0Y4MJH3`. Il banner offre rifiuto, sole statistiche
oppure statistiche e misurazione Ads. Il tag Google viene caricato soltanto dopo
l'accettazione delle statistiche; `ad_storage` e `ad_user_data` diventano `granted`
solo scegliendo esplicitamente anche la misurazione Ads. `ad_personalization` resta
sempre `denied`: nessun remarketing o invio dei dati del modulo per conversioni avanzate.
Le due preferenze sono salvate separatamente e il vecchio consenso Analytics non
viene esteso ad Ads. “Preferenze cookie” permette di cambiare scelta. La revoca
rimuove i cookie pertinenti accessibili al sito ed è sincronizzata tra schede.
Il form funziona indipendentemente dal consenso. Il collaudo con il loader Google
verifica entrambi i livelli di consenso e intercetta tutte le richieste di raccolta.

L’evento `generate_lead` viene emesso una volta dopo il successo dell’endpoint,
con `form_id: contact`, `sector` e `form_location` da elenchi controllati. I payload
precedenti senza contesto vengono classificati come generici. L’oggetto è facoltativo
nel modulo generico e obbligatorio/precompilato nei settori; il server assegna un
oggetto generico quando necessario. Il codice non emette `generate_lead` al refresh
di `/grazie`. La regola Google che creava una seconda conversione dalla visita alla pagina
è stata eliminata nella proprietà Mifro e il test con tag reale ora passa.
Configurazione e separazione dall’account Ads DavideDev sono documentate in
[Misurazione e gestione richieste](docs/misurazione-conversioni.md).

L’evento `contact_click` registra separatamente i clic su telefono e WhatsApp,
con `channel`, `sector` e `page_type`, anche dopo navigazioni interne. Non dimostra
una telefonata effettuata né una conversazione. Entrambi gli eventi rispettano il
consenso Analytics e non includono nome, email, messaggio, numero chiamato o URL
arbitrari nei propri parametri.

Configurazione GA4/Ads, rilevamento dei clic, registro commerciale e collaudo sono
descritti in [Misurazione e gestione richieste](docs/misurazione-conversioni.md).
Le chiamate usano il numero aziendale Mifro; i pulsanti WhatsApp usano il recapito
del gestore del sito, Davide Michelon: +39 351 688 8890. Le chiamate ricevute e la
provenienza dichiarata dal cliente si annotano nel registro commerciale.
Il consenso Analytics non abilita automaticamente finalità pubblicitarie.

### Protezioni e limiti

- Validazione server, dimensione massima del corpo, controllo Origin e honeypot.
- Pulsante bloccato durante l'invio e pausa di un minuto dopo un invio riuscito.
- Limite di cinque tentativi per dieci minuti per IP (memorizzato come hash),
  **per singola istanza server**. Non è un limite distribuito: per traffico abusivo
  configurare anche una regola in Vercel Firewall su `POST /api/contact`, secondo
  le opzioni disponibili nel piano. I cookie possono essere rimossi dai bot.
- SMTP conferma l'accettazione del messaggio, non l'arrivo nella posta in entrata.
  Controllare anche Spam. Gmail applica limiti di invio e può rifiutare richieste.
- Senza database/coda non ci sono archivio indipendente, ritentativi automatici o
  garanzia exactly-once: se la risposta di rete si perde dopo l'accettazione SMTP,
  un nuovo tentativo del visitatore può generare una seconda email.
- `/grazie` non è nella sitemap ed è `noindex`; è accessibile per dieci minuti
  dal browser che ha completato il form. Il cookie non contiene dati del modulo.
- L'informativa descrive il passaggio al gestore del sito e poi a Mifro. Prima
  della pubblicazione, Mifro deve confermare che ruoli e conservazione descritti
  corrispondano alla gestione effettiva delle richieste. La chat Chatwoot esistente
  mantiene il proprio funzionamento, indipendente dal consenso Analytics.

### Verifica

`npm test` verifica validazione, firma/scadenza cookie, limiti e endpoint con SMTP
simulato, senza inviare email. `npm run lint`, `npx tsc --noEmit` e `npm run build`
controllano il progetto. Dopo il deploy fare un invio reale e verificare ricezione,
Reply-To, inoltro a Mifro, pagina di conferma ed evento Analytics. Aprendo `/grazie`
in una finestra privata prima dell'invio si deve tornare a `/contatti`.


## Pagine per settore

Le pagine `/soluzioni/ristoranti`, `/soluzioni/parrucchieri-saloni`
e `/soluzioni/ambulanti` sono generate staticamente da `src/content/sectors.ts`
con il layout condiviso `src/app/(site)/soluzioni/[settore]/page.tsx`.
Sono raggiungibili dalle schede della home e dal menu «Per la tua attività» e incluse
nella sitemap. Ogni pagina ha metadati propri, FAQ specifiche, foto delle casse e
il modulo con oggetto di settore automatico. Nome, email e messaggio sono
obbligatori; il telefono è facoltativo per Beauty e obbligatorio negli altri
settori. Il numero, se fornito, viene validato dal server e incluso nell’email
interna, mai nei parametri Analytics. La pagina Contatti conserva nome, email e
messaggio obbligatori, con oggetto facoltativo. Le schede prodotto usano
`src/components/SolutionCard.tsx`.

Non c’è una pagina indice: `/soluzioni` reindirizza a `/#settori` ed è esclusa dalla
sitemap. I collegamenti generici alle soluzioni puntano direttamente ai settori della
home. La home presenta prima i tre settori, poi tre schede «Prodotti e assistenza»
collegate alle rispettive sezioni.
`/prodotti-assistenza` raccoglie POS e pagamenti, tecnologia per l’ufficio e
assistenza/riparazioni, con testi di approfondimento, foto alternate e gli anchor
`#pagamenti`, `#hardware-ufficio` e `#riparazioni`. Sotto i servizi, la sezione
«Hai un’attività?» collega direttamente le tre pagine di settore.

La top bar contiene un unico pulsante «Per la tua attività» che apre i quattro settori,
«Prodotti e assistenza», «Chi siamo» e «Contattaci». Il logo torna alla home;
la voce «Guida RT–POS» nel footer porta direttamente a `/news/guida-ade-collegamento-rt-pos`.
L’indice `/news` reindirizza alla guida ed è escluso dalla sitemap. Sotto i 1024 px si usa il menu mobile. Entrambi i
menu gestiscono tastiera, focus e chiusura dopo la navigazione. Nelle pagine settore
«Contattaci» porta al modulo locale `#richiedi-proposta`, preservandone il settore.
Nelle altre pagine il pulsante porta a `/contatti`. Le pagine di settore
si aprono direttamente con l’introduzione, senza breadcrumb.

Prima delle FAQ di ristoranti, ambulanti e altre attività, `ContactJourney` mostra il percorso in sei
passaggi: modulo, ricontatto con il messaggio «Ti richiamiamo subito»,
eventuale prova in negozio, preventivo, installazione e formazione con un tecnico
specializzato, assistenza successiva. Testi e impegno di ricontatto, confermati
dall’utente, sono centralizzati in `siteConfig.contactJourney`. Le CTA delle pagine
privilegiano il modulo; telefono aziendale e WhatsApp del gestore restano disponibili nel footer.

Beauty mantiene `/soluzioni/parrucchieri-saloni`, menu e sitemap esistenti. Il
template di settore usa `BeautyPage` e `src/content/beauty.ts` per presentare prima
la pagina web del salone con prenotazione operatore/orario e l’agenda del team,
poi gestionale, formazione/assistenza e integrazioni di cassa e POS. Lo schema
di prenotazione illustra il percorso del cliente; la schermata dimostrativa delle
vendite non mostra dati personali. L’oggetto specifico e il contesto
`parrucchieri-saloni` / `sector_page` distinguono la richiesta Beauty.
Assistenza, integrazioni e presenza locale occupano sezioni distinte, con spaziatura
e sfondi alternati. Tutti i moduli usano `ContactSection`: riquadro blu scuro, introduzione e passaggi
a sinistra, scheda bianca con campi chiari a destra; su mobile le colonne si impilano.
Lo stile riprende il modulo di piazzale.app/#chiamata, con colori e contenuti Mifro.
La casella privacy è obbligatoria e inizialmente vuota in tutti i moduli: il server
accetta soltanto `privacyAccepted: true` e riporta la conferma nell’email interna.
Il link all’informativa si apre in una nuova scheda per preservare i dati compilati.

### Landing per acquisto e noleggio

`/vendita-registratori-di-cassa` riprende struttura, componenti e stile di
`/noleggio-registratori-di-cassa`. I testi della vendita sono in
`src/content/sales.ts`; modelli e foto provengono dal catalogo esistente. La pagina
generale `/soluzioni/altre-attivita` conserva i propri contenuti. Le landing non sono aggiunte
al menu né alla sitemap e mantengono `noindex, follow` per l’anteprima. L’indicizzazione
potrà essere rivalutata al rilascio.

Nella vendita sono richiesti solo nome, email e messaggio, con telefono facoltativo
e oggetto automatico «Acquisto o sostituzione registratore di cassa», confermato
anche dal server. Il contesto controllato `generico` / `sales_page` identifica la
vendita nell’email e in `generate_lead`. Noleggio conserva `rental_page` e i campi
esistenti. Le CTA e Contattaci portano al modulo locale, conservando i parametri
pubblicitari; come nel noleggio, footer e chat della vendita privilegiano il modulo.
Il pulsante WhatsApp al recapito del gestore è disponibile anche su queste landing.
Nessuna conversione viene emessa dal clic sulla CTA.

Beauty e vendita riutilizzano `ScrollReveal` per le animazioni, con contenuti
immediatamente visibili su smartphone e quando è richiesto movimento ridotto.
Verifiche, URL dell’anteprima, stato di rilascio e materiali mancanti sono in
[Collaudo marketing](docs/collaudo-marketing.md).

Fonti e dettagli delle soluzioni sono raccolti nella
[scheda di revisione tecnica](docs/revisione-pagine-settori.md).
L’archivio `download.zip` e i manuali estratti in `download/` sono materiale di
consultazione locale, escluso dal repository. Le immagini utilizzate dal sito e
la documentazione delle fonti sono versionate in `public/images/` e `docs/`.

## SEO e contenuti

`createPageMetadata` mantiene coerenti canonical e anteprime social; le immagini
1200×630 `/images/og/generale` e `/images/og/ristoranti` sono generate in build con
foto e marchio esistenti. `/soluzioni` reindirizza permanentemente a `/#settori`.
La sitemap omette date artificiali sulle pagine statiche e usa la revisione reale
degli articoli, oppure la pubblicazione se non c’è una revisione.

Gli articoli sono in `src/content/articles.ts`, esposti anche come `siteConfig.news`.
Il tipo `Article` distingue PDF/link con file ed etichetta obbligatori dagli articoli
senza download. Ogni voce può definire fonti, collegamenti di approfondimento, FAQ,
data di revisione e CTA. Il template non contiene testi specifici della guida RT–POS.
L’unica guida pubblicata resta quella RT–POS; `/news` mantiene il redirect attuale.
La [bozza della guida alla scelta](docs/bozza-guida-scelta-cassa.md) resta interna.
Il caso cliente e la relativa predisposizione sono stati rimossi su richiesta.

## Verifiche e CI

```bash
npm run lint
npm test
npm run build
npm run typecheck
npm run test:browser
npm audit
```

Il workflow `.github/workflows/ci.yml` esegue installazione pulita, audit delle
dipendenze di produzione, lint, test, build, TypeScript e browser su push e pull
request. Non effettua deploy e non utilizza credenziali SMTP. Gli artefatti dei test
falliti sono conservati per sette giorni.

Per i test browser installare Chromium una volta con
`npx playwright install chromium`, oppure utilizzare Chrome già installato con
`MIFRO_TEST_BROWSER=chrome npm run test:browser`. Preparare prima la build.
Il server di prova usa la porta 3101, modificabile con `MIFRO_TEST_PORT=3217`,
credenziali SMTP vuote e un segreto esclusivamente di test.
In alternativa `MIFRO_TEST_BASE_URL=http://127.0.0.1:3101` usa un server locale già
avviato, che deve avere `CONTACT_FORM_SECRET=browser-test-only-secret-at-least-32-characters`
e nessuna credenziale reale. Non puntare la suite al sito pubblicato.

La suite simula invii e servizi esterni. Verifica consenso, errori, doppio invio,
refresh, percorso Contattaci desktop/mobile per tutti i settori, metadati, redirect,
sitemap, articoli, FAQ da tastiera, mappa su richiesta e layout a 320/390/768/1440 px.
Screenshot e trace sono in `test-results/`, esclusi da Git.
Esiti, conteggi e limiti del collaudo sono mantenuti in un solo documento:
[Collaudo marketing](docs/collaudo-marketing.md).

`npm run test:analytics` è un controllo separato con il tag Google pubblico reale.
Scarica il loader ma intercetta tutta la raccolta del browser; SMTP è simulato.
Verifica navigazione Next.js, settore del lead e assenza di conversioni generate
su `/grazie`, anche dopo refresh. È distinto dalla CI e segnala eventuali future regressioni nella configurazione
remota. La regola duplicata individuata nel collaudo iniziale è stata rimossa.
Non sostituisce la verifica della ricezione in DebugView.

## Dipendenze e font

Next resta nella versione 15.5.28. Nodemailer, Sharp e le dipendenze vulnerabili
sono aggiornati in `package-lock.json`. L’override mirato `next → postcss` usa
PostCSS 8.5.31 compatibile con la major 8, sostituendo la versione 8.4.31 fissata
nel manifest di Next. Quando una versione Next compatibile include già la
correzione, rivalutare la necessità dell’override. Il lockfile è verificato con
installazione pulita, build e test.

Il font Inter latino variabile è distribuito con licenza OFL in `src/app/fonts/`
e caricato da `next/font/local`: la build non scarica font da Google. Il cambiamento
risolve il timeout di download riprodotto; non è una misura di velocità del sito.
