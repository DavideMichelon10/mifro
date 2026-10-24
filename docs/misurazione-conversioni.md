# Misurazione e gestione delle richieste Mifro

Revisione: 24 ottobre 2026. Modifiche locali e configurazione GA4 Mifro; nessun commit, deploy o attivazione di campagne.

## Cosa misura il sito

| Evento | Quando | Parametri applicativi | Uso |
| --- | --- | --- | --- |
| `generate_lead` | Una risposta positiva del server, dopo accettazione SMTP | `form_id: contact`, `sector`, `form_location` | Richiesta tramite modulo |
| `contact_click` | Clic su link telefono o WhatsApp | `channel`, `sector`, `page_type` | Interesse secondario, non conversazione |

Settori: `bar`, `ristoranti`, `parrucchieri-saloni`, `ambulanti`, `generico`.
Posizioni modulo: `sector_page`, `contact_page`. Tipi pagina per i clic:
`home`, `sector_page`, `contact_page`, `support_page`, `other`.
Valori liberi, dati del modulo, numeri di telefono e URL arbitrari non entrano
nei parametri applicativi di questi eventi. GA gestisce separatamente i propri
metadati standard di navigazione: non inserire dati personali nelle URL.

Nelle pagine settore il pulsante «Contattaci» del menu, anche su mobile, porta al
modulo locale `#richiedi-proposta`: conserva così il settore nell’email e nel lead.
`sector` descrive il modulo utilizzato, non l’intera cronologia del visitatore.
L’accesso diretto alla pagina Contatti e i suoi invii restano `generico`.

Il modulo funziona senza consenso Analytics. Con consenso rifiutato o strumenti
bloccati le email possono superare il numero di eventi. SMTP accettato non prova
il recapito in posta in entrata; controllare anche Spam e inoltro al referente.

## GA4 e Google Ads

1. Nella proprietà `mifro.it` (526284251), stream `G-PHX0Y4MJH3`, sono state
   registrate le dimensioni evento `sector`, `form_location`, `channel`, `page_type`.
   `generate_lead` è marcato come evento chiave, senza valore monetario predefinito.
2. Le eventuali campagne Mifro devono usare un account Ads distinto da DavideDev.
   L’importazione nell’account separato non è ancora eseguita. Usare una sola azione
   primaria basata sull’invio riuscito; se si sceglie un evento derivato per il
   settore ristoranti, non sommarlo come conversione primaria a `generate_lead`.
3. Tenere `contact_click` nei report secondari. Non usarlo per ottimizzare come
   se fosse una telefonata o inserirlo in un obiettivo personalizzato di offerta.
4. Per richieste lead usare conteggio «Una», quando applicabile. Questo non elimina
   i duplicati tra azioni diverse (modulo e telefonata) o visite diverse.
5. Verificare in Tempo reale/DebugView successo, errore e refresh. Non usare visita
   a `/grazie` o `form_submit` automatico come altra conversione dello stesso invio.

## Visualizzazioni dopo navigazione interna

Il sito mantiene un solo tag e la misurazione automatica GA4. Nel controllo locale
con il loader Google reale, intercettando le richieste di raccolta, è stato osservato
il `page_view` iniziale e quelli successivi alla navigazione Next.js. Sono stati
letti sia i parametri URL sia le righe dei POST raggruppati. Le precedenti note
che riportavano soltanto la prima visualizzazione sono superate.
La ricezione in DebugView non è stata collaudata; le modifiche alla proprietà
sono descritte sotto.

Prima del rilascio controllare in GA4 → Amministrazione → Stream di dati → Web →
Misurazione avanzata → Visualizzazioni di pagina → impostazioni avanzate che siano
attivi i caricamenti e i cambi pagina basati sulla cronologia. Provare il percorso
ristoranti → contatti in DebugView: una visualizzazione per pagina, senza duplicati.
Non aggiungere in parallelo eventi manuali mantenendo quelli automatici.
[Procedura Google per le applicazioni a pagina singola](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications).

## Correzione della configurazione Google — eseguita

Il controllo iniziale del loader pubblico di `G-PHX0Y4MJH3` ha individuato una
regola che generava `ads_conversion_SUBMIT_LEAD_FORM_1` da `page_view` quando
il percorso iniziava con `/grazie`. Un invio seguito da refresh produceva un
`generate_lead` e due eventi di conversione derivati.

Su richiesta esplicita dell’utente è stata usata la sessione Chrome autenticata:

- Verificati proprietà `mifro.it`, ID 526284251 e stream `G-PHX0Y4MJH3`.
- Eliminata la sola regola `ads_conversion_SUBMIT_LEAD_FORM_1` con condizioni
  `event_name = page_view` e `page_path starts with /grazie`.
- Rimossa la marcatura di evento chiave dal vecchio evento.
- Marcato `generate_lead` come evento chiave, con creazione «with code» (evento
  già emesso dal sito), senza valore monetario predefinito e conteggio per evento.
- Registrate le quattro dimensioni evento: Settore (`sector`), Posizione modulo
  (`form_location`), Canale contatto (`channel`), Tipo pagina (`page_type`).

Il controllo con il tag pubblico reale è stato ripetuto ed è passato: un solo
`generate_lead`, settore ristoranti preservato, page view dopo navigazione e
nessuna conversione `ads_conversion_*` su `/grazie` o al refresh. SMTP è simulato
e tutte le richieste esterne del browser sono intercettate, non inviate a Google.

### Separazione dall’account Ads DavideDev

L’account Ads aperto in Chrome era DavideDev e conteneva azioni di più proprietà.
L’azione esistente `SUBMIT_LEAD_FORM` (ID 7851721144) era collegata a `mifro.it`
e al vecchio evento `ads_conversion_SUBMIT_LEAD_FORM_1`. La sua priorità è stata
portata temporaneamente a Secondary, poi **ripristinata a Primary** dopo la
precisazione dell’utente. Il ripristino è stato verificato nell’interfaccia.

Nessuna campagna, budget o azione della proprietà `davidedev.me` è stata modificata
o cancellata. La nuova procedura di conversione è stata abbandonata prima della
creazione di un’azione. Non è stato creato un nuovo account Ads. Non usare
l’account DavideDev per le future campagne Mifro: predisporre un account separato.
La correzione della sorgente GA4 Mifro rimane applicata: l’evento derivato dalla
visita a `/grazie` non viene più generato.

### Controllo ripetibile

```bash
npm run build
npm run test:analytics
```

Il controllo scarica il tag pubblico reale, simula SMTP e intercetta la raccolta.
Esamina anche i POST con più eventi e fallisce se una conversione `ads_conversion_*`
viene generata su `/grazie`. È distinto dalla CI deterministica e non dimostra
la ricezione in DebugView. L’esito finale è riportato in [collaudo-marketing.md](collaudo-marketing.md).

## Telefonate al numero Mifro

Il sito mostra sempre il numero aziendale Mifro e i collegamenti «Chiama» aprono
quel recapito. La misurazione del sito registra, con consenso Analytics, soltanto
il clic sul collegamento: non conferma che la telefonata sia partita o abbia ricevuto
risposta e non ne misura durata o contenuto.

Le telefonate ricevute si annotano nel registro commerciale, insieme all’esito e
alla provenienza quando dichiarata dal cliente. Una chiamata composta manualmente
non genera l’evento `contact_click`. La provenienza non nota resta tale: non viene
attribuita automaticamente a una campagna.

In Ads la conversione primaria prevista è l’invio riuscito del modulo pertinente.
I clic su telefono e WhatsApp restano osservazioni secondarie.

## Registro commerciale e costo per contatto

Usare il sistema aziendale esistente, senza creare un database pubblico nel sito.
Registrare data, canale, settore, esigenza, provenienza quando disponibile,
nuovo potenziale cliente/assistenza esistente, esito e prossimo ricontatto.
Riconciliare modulo e telefonata della stessa persona come un’unica opportunità.
La metrica decisionale per una campagna è **spesa / contatti commerciali pertinenti
unici attribuiti alla campagna**. Le chiamate di provenienza non nota restano separate.
L’assistenza ai clienti esistenti resta un’attività utile, ma non è acquisizione.

## Recapito e responsabilità prima del deploy

`CONTACT_TO` è obbligatorio, senza fallback. Il flusso confermato è Davide → Mifro.
In Vercel risultano presenti in Production le quattro variabili server del modulo;
una richiesta vuota al sito pubblicato restituisce 400 per validazione, non 503
per configurazione assente. Questo controllo non invia email e non prova la consegna.
Non stampare credenziali. L’invio reale di collaudo va concordato; i test automatici
usano SMTP simulato. Il caso cliente è escluso per scelta dell’utente; le ulteriori
verifiche dei dati aziendali e la nuova guida sono fuori da questo intervento.

## Fonti ufficiali

- [Google: conversioni primarie e secondarie](https://support.google.com/google-ads/answer/11461796?hl=en).
- [Google: opzioni di conteggio](https://support.google.com/google-ads/answer/3438531?hl=it).
