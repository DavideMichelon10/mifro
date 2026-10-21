"use client";

import { useState, useRef, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trackContactSubmission } from "@/lib/analytics";

interface ContactFormProps {
  defaultSubject?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  showSubject?: boolean;
}

export default function ContactForm({
  defaultSubject = "",
  messagePlaceholder = "Descrivi le tue esigenze…",
  submitLabel,
  showSubject = true,
}: ContactFormProps) {
  const { formFields, replyNote } = siteConfig.contactPage;
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);
  const [website, setWebsite] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
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
        body: JSON.stringify({ ...form, website }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Invio non riuscito. Riprova più tardi.");
      trackContactSubmission();
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
            {formFields.name}
          </label>
          <input
            id="cf-name"
            name="name"
            maxLength={120}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.email}
          </label>
          <input
            id="cf-email"
            name="email"
            maxLength={254}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="mario@esempio.it"
          />
        </div>

        {showSubject ? (
        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.subject}
          </label>
          <input
            id="cf-subject"
            name="subject"
            maxLength={200}
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass}
            placeholder="Oggetto"
          />
        </div>
        ) : <input id="cf-subject" type="hidden" name="subject" value={form.subject} />}

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.message}
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
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <div className="space-y-3">
          <button
            disabled={pending}
            type="submit"
            className="button button-primary w-full sm:w-auto"
          >
            {pending ? "Invio in corso…" : (submitLabel ?? formFields.submit)}
          </button>
          <p className="text-sm leading-relaxed text-gray-600">{replyNote}</p>
        </div>
      </form>

    </>
  );
}
