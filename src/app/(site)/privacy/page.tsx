import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di Mifro S.a.s. ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <Section>
      <SectionHeader
        title="Privacy Policy"
        subtitle="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)"
      />

      <div className="prose prose-gray mx-auto max-w-3xl text-sm leading-relaxed text-gray-600">

        <h2 className="mt-8 text-base font-semibold text-gray-800">1. Titolare del trattamento</h2>
        <p>
          <strong>Mifro S.a.s.</strong><br />
          {contact.fullAddress}<br />
          Email: <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a><br />
          Tel: {contact.phone}
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">2. Dati raccolti e finalità</h2>
        <p>
          Il modulo di contatto raccoglie nome, indirizzo email, oggetto e messaggio.
          I dati vengono elaborati dal sito ospitato su Vercel e inviati tramite Gmail
          al gestore del sito, Davide Michelon, che inoltra la richiesta a Mifro per la risposta.
          Non viene creato un archivio delle richieste nel database del sito.
          Se acconsenti alle statistiche, Google Analytics rileva le visite e gli invii
          riusciti del modulo; nome, email e contenuto del messaggio non vengono inviati ad Analytics.
        </p>
        <p>
          I dati del modulo sono utilizzati per gestire la richiesta, senza iscrizione automatica a comunicazioni promozionali.
        </p>

        <h2 className="mt-8 text-base font-semibold text-gray-800">3. Cookie</h2>
        <p>
          Il sito utilizza un cookie tecnico di dieci minuti per confermare l’invio del modulo
          e consentire l’accesso alla pagina di ringraziamento. La preferenza sulle statistiche
          viene memorizzata nel browser. Google Analytics viene caricato solo dopo
          l’accettazione: puoi rifiutare o modificare la scelta tramite “Preferenze cookie”.
          Il rifiuto non impedisce l’invio di richieste.
        </p>
        <p>
          La pagina dei contatti include una mappa fornita da <strong>Google Maps</strong> (Google LLC).
          La mappa viene caricata solo su esplicita azione dell&apos;utente (click sul riquadro). Al momento
          del caricamento, Google Maps può installare propri cookie secondo la sua{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            Privacy Policy
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

        <p className="mt-10 text-xs text-gray-400">
          Ultimo aggiornamento: {year} — Mifro S.a.s.
        </p>
      </div>
    </Section>
  );
}
