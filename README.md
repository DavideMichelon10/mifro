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
