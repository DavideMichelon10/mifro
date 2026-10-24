# Misurazione e gestione delle richieste Mifro

Revisione: 24 ottobre 2026. Modifiche locali e configurazione GA4 Mifro; nessun commit o deploy eseguito dall’agente. Campagna e quattro gruppi Ads abilitati dall’utente.

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
2. È stato creato l’account Ads separato **Mifro (276-321-8107)**, collegato alla
   proprietà GA4 Mifro con importazione dei segmenti di pubblico disattivata.
   È verificata l’unica azione primaria **Form (7869328228)**, sorgente GA4,
   evento `generate_lead`, proprietà `mifro.it`. Il conteggio Ads è stato corretto
   in «Una» e il valore in «Non usare un valore», verificando entrambi dopo reload.
   Vale per tutti e quattro i settori; non sommare eventi derivati per settore
   come ulteriori conversioni primarie. Stato: in attesa di conversioni; non è
   stata collaudata l’attribuzione di un clic pubblicitario reale.
3. Tenere `contact_click` nei report secondari. Non usarlo per ottimizzare come
   se fosse una telefonata o inserirlo in un obiettivo personalizzato di offerta.
4. Per richieste lead usare conteggio «Una», quando applicabile. Questo non elimina
   i duplicati tra azioni diverse (modulo e telefonata) o visite diverse.
5. Verificare in Tempo reale/DebugView successo, errore e refresh. Non usare visita
   a `/grazie` o `form_submit` automatico come altra conversione dello stesso invio.

## Verifica del sito pubblicato e limiti di attribuzione — 24 ottobre 2026

Controllati in un browser isolato i quattro URL finali degli annunci: rispondono
tutti 200. Per ciascun settore, accettando Analytics e usando «Contattaci» nel
menu, il modulo conserva il settore nel payload e accoda un solo `generate_lead`
dopo la risposta positiva. Prima del consenso non viene caricato il tag Google.
Ripetuto il percorso Parrucchieri con consenso rifiutato: il modulo invia comunque
la richiesta, ma non carica il tag né accoda il lead.

Nel controllo tutte le richieste `/api/contact` sono intercettate con risposta
simulata; il loader Google, la pagina successiva `/grazie` e le richieste esterne
sono sostituiti o bloccati. È una verifica del codice effettivamente pubblicato,
non della consegna email, della ricezione GA4 o dell'attribuzione Ads. Il controllo
del loader Google reale e dei duplicati al refresh resta quello locale descritto sotto.

In Chrome, nell'account Mifro, **Auto-tagging = Yes**. La campagna risulta ancora
orientata ai clic; la presenza di una conversione primaria non implica da sola
una strategia di offerta che massimizzi i contatti.

**Limite da risolvere prima di considerare completa l'attribuzione Ads:** anche
dopo «Accetta Analytics», il sito pubblicato imposta `analytics_storage: granted`
ma mantiene `ad_storage`, `ad_user_data` e `ad_personalization` su `denied`.
Google documenta che `ad_user_data: denied` limita l'esportazione verso Ads delle
conversioni associate agli identificativi dei clic. L'evento Analytics può quindi
essere emesso senza che il percorso pubblicitario sia attribuito completamente.
Serve una scelta esplicita del visitatore per la misurazione pubblicitaria,
con segnali coerenti con quella scelta e successiva verifica dell'attribuzione.
Accettare le sole statistiche non autorizza a concedere automaticamente i consensi Ads.
[Riferimento ufficiale sui consensi Google](https://support.google.com/tagmanager/answer/13802165?hl=en).

Le keyword correnti sono esatte e a frase, organizzate per intento del settore.
La ricerca generica «registratori di cassa» non garantisce l'attivazione degli
annunci e non identifica il gruppo Parrucchieri dalla professione della persona.
Una ricerca pertinente come «cassa per parrucchieri» può attivare quel gruppo e
portare a `/soluzioni/parrucchieri-saloni`, compatibilmente con targeting e asta.
La copertura delle ricerche generiche richiede una decisione distinta su keyword,
annuncio e destinazione adatta a più attività.

I totali email, eventi GA4 e conversioni Ads non sono necessariamente uguali:
consenso, blocchi del browser, provenienza organica, attribuzione, conteggio
«Una» in Ads e tempi di elaborazione possono produrre differenze legittime.
Un contatto tramite modulo è una richiesta, non una vendita né un contatto
commerciale già qualificato.

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
creazione di un’azione in DavideDev. Su successiva richiesta esplicita è stato
creato l’account separato **Mifro (276-321-8107)** con lo stesso accesso Google.
L’utente ha completato personalmente fatturazione e verifica dell’identità.
Il centro clienti **862-480-5066** resta in configurazione: Google segnala il
raggiungimento del limite di creazione degli account amministratore; non è stato
completato alcun collegamento MCC.

La struttura confermata dall’utente è **una campagna Search con quattro gruppi**:
Ristoranti, Bar, Parrucchieri e Ambulanti, con budget comune. Dopo la preparazione
senza budget, l’utente ha segnalato la pubblicazione della campagna: verificata
`24392958197`, Enabled, con 5 €/giorno già impostati. L’agente non ha modificato
budget o attivazione della campagna e ha completato Ristoranti, Bar e Ambulanti
in pausa. Parrucchieri era già abilitato. L’utente ha poi confermato di aver abilitato
tutti i gruppi: Enabled verificato per tutti e quattro. Verificati nell’account quattro gruppi,
quattro annunci, 40 keyword e 34 esclusioni a frase. Contenuti e stato in
[google-ads/campagne.json](google-ads/campagne.json).
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
