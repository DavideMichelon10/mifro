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
        <p>
          Il modulo di contatto raccoglie nome, indirizzo email e messaggio, con oggetto
          facoltativo nella pagina Contatti o automatico nelle pagine dedicate ai settori.
          Il telefono è richiesto nelle pagine ristoranti, ambulanti, altre attività e noleggio;
          è facoltativo nelle pagine Beauty e vendita. Nel modulo noleggio raccogliamo anche il comune dell’attività.
          Per inviare il modulo è necessario selezionare la casella di lettura e accettazione dell’informativa:
          questa conferma è inclusa nell’email della richiesta.
          La richiesta include il settore e la posizione del modulo sul sito.
          I dati vengono elaborati dal sito ospitato su Vercel e inviati tramite Gmail
          al gestore del sito, Davide Michelon, che inoltra la richiesta a Mifro per la risposta.
          Non viene creato un archivio delle richieste nel database del sito.
          Se acconsenti alle statistiche, Google Analytics rileva le visite, gli invii
          riusciti del modulo e i clic su telefono e WhatsApp, distinti per settore e tipo di pagina. I clic non indicano che sia avvenuta una conversazione; nome, email, numero di telefono, oggetto e
          contenuto del messaggio non vengono inviati nei parametri Analytics del modulo.
        </p>
        <p>
          I dati del modulo sono utilizzati per gestire la richiesta, senza iscrizione automatica a comunicazioni promozionali.
        </p>
        <p>
          I pulsanti WhatsApp aprono una conversazione con il gestore del sito, Davide Michelon,
          al numero {contact.whatsappDisplay}, che gestisce e inoltra le richieste a Mifro.
          Il messaggio viene inviato solo quando lo confermi in WhatsApp.
        </p>
        <p>
          Se scegli anche la misurazione pubblicitaria, Google Analytics e Google Ads
          utilizzano cookie, identificativi dei clic sugli annunci e dati di navigazione
          per attribuire agli annunci le richieste ricevute e migliorarne il rendimento.
          Puoi accettare le sole statistiche senza questa finalità aggiuntiva.
          Non attiviamo la personalizzazione degli annunci o il remarketing e non
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
          Il trattamento dei dati inviati tramite il modulo di contatto è basato sul
          <strong> consenso dell&apos;interessato</strong> (art. 6, par. 1, lett. a del GDPR) e
          sull&apos;<strong>interesse legittimo</strong> del Titolare a rispondere alle richieste ricevute
          (art. 6, par. 1, lett. f del GDPR).
        </p>
        <p>
          Le statistiche e la misurazione pubblicitaria si basano sulle scelte di consenso
          espresse nel banner. Puoi revocarle in qualsiasi momento tramite “Preferenze cookie”.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">5. Conservazione dei dati</h2>
        <p>
          I dati trasmessi via email vengono conservati per il tempo strettamente necessario a gestire
          la richiesta e, ove applicabile, per adempiere agli obblighi di legge.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">6. Diritti dell&apos;interessato</h2>
        <p>Ai sensi degli artt. 15–22 del GDPR, l&apos;utente ha diritto di:</p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>accedere ai propri dati personali;</li>
          <li>chiederne la rettifica o la cancellazione;</li>
          <li>opporsi al trattamento o chiederne la limitazione;</li>
          <li>proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">www.garanteprivacy.it</a>).</li>
        </ul>
        <p className="mt-3">
          Per esercitare i propri diritti è possibile contattare il Titolare all&apos;indirizzo{" "}
          <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a>.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">7. Aggiornamenti</h2>
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
