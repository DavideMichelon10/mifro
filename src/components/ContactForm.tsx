"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackContactSubmission } from "@/lib/analytics";
import { defaultContactContext, requiresContactPhone, type ContactContext } from "@/lib/contact-context";

interface ContactFormProps {
  context?: ContactContext;
  defaultSubject?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  showSubject?: boolean;
}

export default function ContactForm({
  context = defaultContactContext,
  defaultSubject = "",
  messagePlaceholder = "Descrivi le tue esigenze.",
  submitLabel,
  showSubject = true,
}: ContactFormProps) {
  const { formFields } = siteConfig.contactPage;
  const isSectorForm = context.form_location === "sector_page";
  const isRentalForm = context.form_location === "rental_page";
  const isSalesForm = context.form_location === "sales_page";
  const phoneRequired = requiresContactPhone(context);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const [website, setWebsite] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    municipality: "",
    subject: defaultSubject,
    message: "",
    privacyAccepted: false,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    if (!e.currentTarget.reportValidity()) return;
    sending.current = true;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, context }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Invio non riuscito. Riprova più tardi.");
      trackContactSubmission(context);
      router.push("/grazie");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invio non riuscito. Controlla la connessione e riprova.");
      sending.current = false;
      setPending(false);
    }
  }

  const inputClass = "form-input";

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form" aria-busy={pending}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Sito web</label>
          <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="form-fields">
        <div className="form-field form-field-wide">
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            maxLength={120}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder={isRentalForm ? "Es. Mario Rossi, Bar Centrale" : "Mario Rossi"}
          />
          <label htmlFor="cf-name" className="form-label">
            {isRentalForm ? "Nome e attività" : formFields.name}
          </label>
        </div>

        {isRentalForm && (
          <div className="form-field">
            <input
              id="cf-municipality"
              name="municipality"
              autoComplete="address-level2"
              maxLength={120}
              type="text"
              required
              value={form.municipality}
              onChange={(e) => setForm({ ...form, municipality: e.target.value })}
              className={inputClass}
              placeholder="Es. Pergine Valsugana"
            />
            <label htmlFor="cf-municipality" className="form-label">Comune dell’attività</label>
          </div>
        )}

        <div className="form-field">
          <input
            id="cf-email"
            name="email"
            autoComplete="email"
            maxLength={254}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="mario@esempio.it"
          />
          <label htmlFor="cf-email" className="form-label">
            {formFields.email}
          </label>
        </div>

        {(isSectorForm || isRentalForm || isSalesForm) && (
          <div className="form-field">
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              required={phoneRequired}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              aria-describedby={!isRentalForm ? "cf-phone-help" : undefined}
              className={inputClass}
              placeholder="Es. +39 333 123 4567"
            />
            <label htmlFor="cf-phone" className="form-label">{isRentalForm ? "Cellulare" : formFields.phone}</label>
            {!isRentalForm && <p id="cf-phone-help" className="form-help">{phoneRequired ? "Il numero a cui ti richiamiamo subito." : "Facoltativo. Lascia un numero se preferisci essere ricontattato per telefono."}</p>}
          </div>
        )}

        {showSubject ? (
        <div className="form-field">
          <input
            id="cf-subject"
            name="subject"
            maxLength={200}
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass}
            placeholder="Oggetto"
          />
          <label htmlFor="cf-subject" className="form-label">
            {formFields.subject} <span className="font-normal">(facoltativo)</span>
          </label>
        </div>
        ) : <input id="cf-subject" type="hidden" name="subject" value={form.subject} />}

        <div className="form-field form-field-wide">
          <textarea
            id="cf-message"
            name="message"
            maxLength={5000}
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass}
            placeholder={messagePlaceholder}
          />
          <label htmlFor="cf-message" className="form-label">
            {isRentalForm ? "Esigenza e periodo di utilizzo" : formFields.message}
          </label>
        </div>

        </div>
        <label htmlFor="cf-privacy" className="form-privacy">
          <input
            id="cf-privacy"
            name="privacyAccepted"
            type="checkbox"
            required
            checked={form.privacyAccepted}
            onChange={(e) => setForm({ ...form, privacyAccepted: e.target.checked })}
          />
          <span>Ho letto e accetto l’<Link href="/privacy" target="_blank" rel="noopener noreferrer" aria-label="Leggi l’informativa privacy" className="underline underline-offset-2">informativa privacy</Link> e chiedo di essere ricontattato.</span>
        </label>
        {error && <p ref={errorRef} role="alert" tabIndex={-1} className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button
          disabled={pending}
          type="submit"
          className="button button-primary w-full"
        >
          {pending ? "Invio in corso…" : (submitLabel ?? formFields.submit)}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </button>
      </form>

    </>
  );
}
