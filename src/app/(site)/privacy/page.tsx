import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import Section from "@/components/Section";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Informativa privacy", description: "Informativa sul trattamento dei dati personali di Mifro S.a.s. ai sensi del Regolamento UE 2016/679 (GDPR).", path: "/privacy" }),
  robots: { index: false },
};

export default function PrivacyPage() {
  const { contact } = siteConfig;
  const revisedAt = new Date(siteConfig.privacyRevisedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });

  return (
    <>
      <PageIntro
        title="Informativa privacy"
        description="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
      />
    <Section>
      <div className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 [&_h2]:mb-3 [&_h2]:text-lg [&_p+p]:mt-3">

        <h2 className="mt-8 text-base font-semibold text-gray-800">1. Titolare del trattamento</h2>
        <p>
          <strong>Mifro S.a.s.</strong><br />
          {contact.fullAddress}<br />
          Email: <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a><br />
          Tel.: {contact.phone}
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">2. Dati raccolti e finalità</h2>
        <h3 className="mb-3 mt-5 font-semibold text-gray-800">Moduli del sito e contatti diretti</h3>
        <p>
          Il modulo di contatto raccoglie nome, indirizzo email e messaggio, con oggetto
          facoltativo nella pagina Contatti o automatico nelle pagine dedicate ai settori.
          Il telefono è richiesto nelle pagine ristoranti, ambulanti, altre attività e noleggio;
          è facoltativo nelle pagine Beauty e vendita. Nel modulo noleggio raccogliamo anche il comune dell’attività.
          Per inviare il modulo è necessario selezionare la casella di lettura e accettazione dell’informativa:
          questa conferma è inclusa nell’email della richiesta.
          La richiesta include il settore e la posizione del modulo sul sito.
          I dati vengono elaborati dal sito ospitato su Vercel e inviati tramite Gmail
          al gestore del sito, che inoltra la richiesta a Mifro per la risposta.
          Non viene creato un archivio delle richieste nel database del sito.
          Se acconsenti alle statistiche, Google Analytics rileva le visite, gli invii
          riusciti del modulo e i clic su telefono e WhatsApp, distinti per settore e tipo di pagina. I clic non indicano che sia avvenuta una conversazione; nome, email, numero di telefono, oggetto e
          contenuto del messaggio non vengono inviati nei parametri Analytics del modulo.
        </p>
        <p>
          I dati del modulo sono utilizzati per gestire la richiesta, senza iscrizione automatica a comunicazioni promozionali.
        </p>
        <p>
          I pulsanti WhatsApp aprono una conversazione con il gestore del sito,
          al numero {contact.whatsappDisplay}, che gestisce e inoltra le richieste a Mifro.
          Il messaggio viene inviato solo quando lo confermi in WhatsApp.
        </p>
        <h3 id="contatti-meta" className="mb-3 mt-5 scroll-mt-28 font-semibold text-gray-800">Moduli di contatto su Facebook e Instagram</h3>
        <p>
          Questa informativa si applica anche alle richieste inviate tramite i moduli istantanei
          associati agli annunci Mifro su Facebook e Instagram. In base al modulo, raccogliamo
          nome e cognome, email, telefono, nome e tipo di attività, comune dell’attività,
          esigenza di acquisto, sostituzione o noleggio e relative tempistiche.
          I campi richiesti sono indicati nel modulo; prima dell’invio puoi controllare
          e correggere anche i dati eventualmente precompilati da Meta.
        </p>
        <p>
          I dati sono raccolti sulla piattaforma Meta e resi disponibili a Mifro e a chi ne
          gestisce le richieste. Sono utilizzati per ricontattarti tramite telefono o email,
          approfondire le esigenze della tua attività, preparare un preventivo e concordare
          eventuali appuntamenti e successivi contatti relativi alla richiesta.
          Insieme alla richiesta possono essere trattati la data di invio e gli identificativi
          del contatto, del modulo e dell’annuncio o campagna di provenienza, per riconoscere
          la richiesta, evitare duplicati e valutarne l’esito.
        </p>
        <p>
          Il conferimento dei dati è facoltativo; senza i recapiti e le informazioni necessarie
          non possiamo gestire la richiesta o ricontattarti. L’invio non comporta l’iscrizione
          a newsletter o ad altre comunicazioni promozionali. I dati delle richieste non vengono venduti.
        </p>
        <h3 className="mb-3 mt-5 font-semibold text-gray-800">App Mifro Marketing</h3>
        <p>
          Mifro Marketing è l’app utilizzata per la gestione delle campagne pubblicitarie Mifro
          e delle richieste provenienti dai relativi moduli Meta. Nei limiti delle autorizzazioni
          concesse, può trattare gli identificativi della Pagina e dell’account pubblicitario,
          di campagne, annunci e moduli, i dati sul rendimento delle campagne e, quando viene
          abilitato l’accesso ai contatti, i dati delle richieste descritti sopra.
          L’accesso è riservato a chi gestisce queste attività per Mifro.
        </p>
        <p>
          Per il trattamento dei dati da parte di Meta nell’utilizzo di Facebook e Instagram,
          comprese le preferenze pubblicitarie e i trasferimenti internazionali, consulta
          anche l’<a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Informativa sulla privacy di Meta</a>.
          Le preferenze cookie di questo sito si applicano alla navigazione su mifro.it;
          le impostazioni delle piattaforme Meta si gestiscono nei rispettivi servizi.
        </p>
        <h3 className="mb-3 mt-5 font-semibold text-gray-800">Misurazione pubblicitaria sul sito</h3>
        <p>
          Se scegli anche la misurazione pubblicitaria, Google Analytics e Google Ads
          utilizzano cookie, identificativi dei clic sugli annunci e dati di navigazione
          per attribuire agli annunci le richieste ricevute e migliorarne il rendimento.
          Puoi accettare le sole statistiche senza questa finalità aggiuntiva.
          Per questi servizi Google non attiviamo la personalizzazione degli annunci o il remarketing e non
          trasmettiamo a Google i dati di contatto del modulo per le conversioni avanzate.
          Per il trattamento da parte di Google consulta anche la sua{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">informativa privacy</a>.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">3. Cookie</h2>
        <p>
          Il sito utilizza un cookie tecnico con una durata di dieci minuti per confermare l’invio del modulo
          e consentire l’accesso alla pagina di ringraziamento. Le preferenze per statistiche
          e misurazione pubblicitaria vengono memorizzate separatamente nel browser.
          Il tag Google viene caricato solo dopo l’accettazione delle statistiche;
          i segnali per la misurazione pubblicitaria vengono abilitati solo se scegli anche questa finalità.
          Puoi rifiutare entrambe le finalità, accettare solo le statistiche oppure accettare entrambe.
          Puoi modificare o revocare la scelta tramite “Preferenze cookie”: vengono
          rimossi i relativi cookie Google accessibili al sito. Il rifiuto non impedisce l’invio di richieste.
        </p>
        <p>
          I cookie Analytics hanno nomi come <code>_ga</code> e <code>_ga_*</code>;
          quelli di misurazione pubblicitaria possono avere nomi come <code>_gcl_*</code>.
          Il precedente consenso alle sole statistiche non viene esteso automaticamente alla pubblicità.
        </p>
        <p>
          La home include una mappa fornita da <strong>Google Maps</strong> (Google LLC).
          La mappa viene caricata solo su esplicita azione dell&apos;utente (clic sul riquadro). Al momento
          del caricamento, Google Maps può installare propri cookie secondo la sua{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            informativa privacy
          </a>.
        </p>

        <p className="mt-3">
          Il sito include anche una chat fornita da Chatwoot. Se utilizzi la chat,
          i messaggi e i dati che fornisci vengono trattati tramite questo servizio.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">4. Base giuridica del trattamento</h2>
        <p>
          Per le richieste di preventivo o di servizi inviate dal sito, dai moduli Meta o
          attraverso i contatti diretti, il trattamento necessario a dare seguito alla richiesta
          si basa sull’esecuzione di misure precontrattuali adottate su richiesta
          dell’interessato (art. 6, par. 1, lett. b del GDPR).
          La risposta ad altre richieste informative e la gestione dei rapporti con i referenti
          delle attività si basano sull’interesse legittimo di Mifro a gestire le comunicazioni
          ricevute (art. 6, par. 1, lett. f del GDPR).
          La presa visione dell’informativa non costituisce consenso a comunicazioni promozionali.
        </p>
        <p>
          Le statistiche e la misurazione pubblicitaria sul sito si basano sul consenso
          espresso nel banner (art. 6, par. 1, lett. a del GDPR).
          Puoi revocarlo in qualsiasi momento tramite “Preferenze cookie”.
          Gli eventuali adempimenti obbligatori si basano sugli obblighi di legge applicabili
          (art. 6, par. 1, lett. c del GDPR).
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">5. Destinatari dei dati</h2>
        <p>
          I dati sono trattati da Mifro e da chi gestisce per suo conto il sito, le campagne
          pubblicitarie e le richieste ricevute, nei limiti necessari alle rispettive attività.
          Sono coinvolti anche i fornitori dei servizi utilizzati: Vercel per il sito,
          Google per l’invio delle email e i servizi descritti sopra, Chatwoot per la chat
          e Meta per i moduli e le piattaforme pubblicitarie. Le richieste possono essere
          consultate negli strumenti Meta ed esportate per la gestione del contatto e del preventivo.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">6. Conservazione dei dati</h2>
        <p>
          Le richieste ricevute dal sito, via email o attraverso i moduli Meta, comprese
          le eventuali copie esportate, sono conservate per il tempo necessario a gestire
          la richiesta, il preventivo e i successivi contatti concordati.
          Conclusa la gestione, i dati non più necessari vengono cancellati o anonimizzati,
          salvo la conservazione richiesta da obblighi di legge o necessaria per la tutela
          di un diritto. In caso di acquisto o noleggio, i dati necessari al rapporto
          contrattuale e alla documentazione amministrativa seguono i relativi obblighi di conservazione.
          La conservazione effettuata da Meta per i propri servizi è descritta nella sua informativa.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">7. Diritti dell&apos;interessato</h2>
        <p>Nei casi e nei limiti previsti dal GDPR, l&apos;utente ha diritto di:</p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>accedere ai propri dati personali;</li>
          <li>chiederne la rettifica o la cancellazione;</li>
          <li>opporsi al trattamento o chiederne la limitazione;</li>
          <li>ricevere i dati in un formato strutturato e chiederne la portabilità, ove applicabile;</li>
          <li>revocare il consenso, senza pregiudicare la liceità del trattamento precedente alla revoca;</li>
          <li>proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">www.garanteprivacy.it</a>).</li>
        </ul>
        <p className="mt-3">
          Per esercitare i propri diritti è possibile contattare il Titolare all&apos;indirizzo{" "}
          <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a>.
        </p>

        <h3 id="cancellazione-dati" className="mb-3 mt-5 scroll-mt-28 font-semibold text-gray-800">Come richiedere la cancellazione dei dati, inclusi i contatti Meta</h3>
        <p>
          Scrivi a <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a>{" "}
          con oggetto “Cancellazione dati personali”, indicando il recapito utilizzato nella richiesta
          e, se possibile, la sua data e provenienza (sito, Facebook o Instagram).
          Puoi usare questa procedura anche per i dati trattati tramite l’app Mifro Marketing.
          Chiederemo solo le informazioni necessarie a identificare la richiesta e verificare
          che riguardi i tuoi dati.
        </p>
        <p>
          Mifro darà riscontro senza ingiustificato ritardo e, di norma, entro un mese dalla ricezione.
          Eventuali proroghe o ragioni che impediscano la cancellazione saranno comunicate
          nei termini previsti dal GDPR. La richiesta riguarda i dati trattati da Mifro
          e da chi li gestisce per suo conto; per i dati trattati autonomamente da Meta
          puoi utilizzare anche gli strumenti privacy di Facebook e Instagram.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">8. Aggiornamenti</h2>
        <p>
          Questa informativa può essere aggiornata per adeguarsi a modifiche normative o del sito.
          La data dell&apos;ultima revisione è indicata in calce.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Ultimo aggiornamento dei contenuti: <time dateTime={siteConfig.privacyRevisedAt}>{revisedAt}</time> — Mifro S.a.s.
        </p>
      </div>
    </Section>
    </>
  );
}
