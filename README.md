# Mifro – Sito Web Aziendale

Sito web aziendale per **Mifro S.a.s.** di Pergine Valsugana (TN).
Realizzato con Next.js (App Router), TypeScript e Tailwind CSS.

## Quick start

```bash
npm install
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
│   └── sectors.ts              # Contenuti delle pagine per settore
└── lib/
    └── utils.ts                # Utility (cn)
```

## Come modificare i contenuti

I testi generali, i contatti, gli orari, i link e le label sono in:

```
src/content/site.ts
```

Modifica le proprietà dell'oggetto `siteConfig` e il sito si aggiornerà automaticamente.

### TODO (da completare)

Cerca `TODO` nel file `site.ts` per trovare i dati placeholder:

- **Telefono**: `contact.phone` – inserire il numero reale
- **Email**: `contact.email` – confermare l'indirizzo
- **Facebook**: `contact.facebook` – confermare il link
- **Privacy Policy**: `footer.quickLinks` – aggiungere la pagina

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
Se le credenziali mancano il form mostra un errore di indisponibilità, senza falsa conferma.
Cambiare il segreto invalida i cookie di conferma già emessi.

### Google Analytics

La proprietà esistente è `G-PHX0Y4MJH3`. Google Analytics viene caricato soltanto
dopo l'accettazione tramite il banner; “Preferenze cookie” permette di cambiare
scelta. Il rifiuto disabilita la raccolta e cancella i cookie GA visibili al sito.
Il form funziona indipendentemente dal consenso.

L'evento `generate_lead`, con il solo parametro applicativo `form_id: contact`,
viene emesso dal client una volta dopo la risposta di successo dell'endpoint,
prima della navigazione interna a `/grazie`. Il refresh di `/grazie` non emette
conversioni. Non sono inviati ad Analytics nome, email, oggetto o messaggio.
In GA4 → Amministrazione → Eventi/Eventi chiave, contrassegnare `generate_lead`
come evento chiave (o crearlo con questo nome). Usare questo evento per le
conversioni, non `page_view` di `/grazie` né l'evento automatico `form_submit`.

Verificare in Tempo reale/DebugView un invio con consenso accettato; con consenso
rifiutato deve arrivare comunque l'email, senza caricamento di GA. Le email sono
il riferimento operativo: consenso negato, ad blocker o problemi di rete possono
rendere il conteggio Analytics inferiore al numero di richieste.

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

Le pagine `/soluzioni/bar`, `/soluzioni/ristoranti`, `/soluzioni/parrucchieri-saloni`
e `/soluzioni/ambulanti` sono generate staticamente da `src/content/sectors.ts`
con il layout condiviso `src/app/(site)/soluzioni/[settore]/page.tsx`.
Sono raggiungibili dalle schede della home e dal menu «Per la tua attività» e incluse
nella sitemap. Ogni pagina ha metadati propri, FAQ specifiche, foto delle casse e
il modulo a tre campi con oggetto di settore automatico. Le schede prodotto usano
`src/components/SolutionCard.tsx`.

Non c’è una pagina indice: `/soluzioni` reindirizza a `/#settori` ed è esclusa dalla
sitemap. I collegamenti generici alle soluzioni puntano direttamente ai settori della
home. La home presenta prima i quattro settori, poi tre schede «Prodotti e assistenza»
collegate alle rispettive sezioni. Per negozi e altre attività c’è un invito esplicito
al contatto, senza una scheda che sembri rimandare a una pagina dedicata.
`/prodotti-assistenza` raccoglie POS e pagamenti, tecnologia per l’ufficio e
assistenza/riparazioni, con testi di approfondimento, foto alternate e gli anchor
`#pagamenti`, `#hardware-ufficio` e `#riparazioni`. Sotto i servizi, la sezione
«Hai un’attività?» collega direttamente le quattro pagine di settore.

La top bar contiene un unico pulsante «Per la tua attività» che apre i quattro settori,
«Prodotti e assistenza», «Chi siamo» e «Contattaci». Il logo torna alla home;
la voce «Guida RT–POS» nel footer porta direttamente a `/news/guida-ade-collegamento-rt-pos`.
L’indice `/news` reindirizza alla guida ed è escluso dalla sitemap. Sotto i 1024 px si usa il menu mobile. Entrambi i
menu gestiscono tastiera, focus e chiusura dopo la navigazione. Le pagine di settore
si aprono direttamente con l’introduzione, senza breadcrumb.

Fonti e dettagli delle soluzioni sono raccolti nella
[scheda di revisione tecnica](docs/revisione-pagine-settori.md).
L’archivio `download.zip` e i manuali estratti in `download/` sono materiale di
consultazione locale, escluso dal repository. Le immagini utilizzate dal sito e
la documentazione delle fonti sono versionate in `public/images/` e `docs/`.
