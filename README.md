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
│       ├── soluzioni/page.tsx  # Soluzioni
│       ├── chi-siamo/page.tsx  # Chi siamo
│       └── contatti/page.tsx   # Contatti
├── components/                 # Componenti riutilizzabili
├── content/
│   └── site.ts                 # ← TUTTI i contenuti del sito
└── lib/
    └── utils.ts                # Utility (cn)
```

## Come modificare i contenuti

Tutti i testi, i contatti, gli orari, i link e le label sono in un unico file:

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
| `hero.image`         | `/images/hero.jpg`         |
| `partner.logo`       | `/images/logo-rch.png`     |

Sostituisci i file e il sito li utilizzerà automaticamente.

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
