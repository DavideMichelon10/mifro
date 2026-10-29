"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackContactSubmission } from "@/lib/analytics";
import { defaultContactContext, type ContactContext } from "@/lib/contact-context";

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
  const { formFields, replyNote } = siteConfig.contactPage;
  const isSectorForm = context.form_location === "sector_page";
  const isRentalForm = context.form_location === "rental_page";
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
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending.current) return;
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
      <form onSubmit={handleSubmit} className="space-y-5" aria-busy={pending}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Sito web</label>
          <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            {isRentalForm ? "Nome e attività" : formFields.name}
          </label>
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
        </div>

        {isRentalForm && (
          <div>
            <label htmlFor="cf-municipality" className="mb-1.5 block text-sm font-medium text-gray-700">Comune dell’attività</label>
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
          </div>
        )}

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.email}
          </label>
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
        </div>

        {(isSectorForm || isRentalForm) && (
          <div>
            <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-gray-700">{isRentalForm ? "Cellulare" : formFields.phone}</label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              aria-describedby={isSectorForm ? "cf-phone-help" : undefined}
              className={inputClass}
              placeholder="Es. +39 333 123 4567"
            />
            {isSectorForm && <p id="cf-phone-help" className="mt-2 text-sm text-gray-600">Il numero a cui Claudio può richiamarti.</p>}
          </div>
        )}

        {showSubject ? (
        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.subject} <span className="font-normal text-gray-500">(facoltativo)</span>
          </label>
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
        </div>
        ) : <input id="cf-subject" type="hidden" name="subject" value={form.subject} />}

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-gray-700">
            {isRentalForm ? "Esigenza e periodo di utilizzo" : formFields.message}
          </label>
          <textarea
            id="cf-message"
            name="message"
            maxLength={5000}
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass}
            placeholder={messagePlaceholder}
          />
        </div>

        <p className="text-sm text-gray-600">I dati saranno utilizzati per gestire la tua richiesta. <Link href="/privacy" className="text-brand-600 underline">Leggi l’informativa privacy</Link>.</p>
        {error && <p ref={errorRef} role="alert" tabIndex={-1} className="text-sm text-red-700">{error}</p>}
        <div className="space-y-3">
          <button
            disabled={pending}
            type="submit"
            className="button button-primary w-full sm:w-auto"
          >
            {pending ? "Invio in corso…" : (submitLabel ?? formFields.submit)}
          </button>
          {!isSectorForm && !isRentalForm && <p className="text-sm leading-relaxed text-gray-600">{replyNote}</p>}
        </div>
      </form>

    </>
  );
}
