"use client";

import { useState, useCallback, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import Toast from "@/components/Toast";

export default function ContactForm() {
  const { formFields } = siteConfig.contactPage;
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleClose = useCallback(() => setToast(false), []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;

    window.open(mailto, "_blank");
    setToast(true);
  }

  const inputClass =
    "block w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus-visible:outline-none";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.name}
          </label>
          <input
            id="cf-name"
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
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="mario@esempio.it"
          />
        </div>

        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.subject}
          </label>
          <input
            id="cf-subject"
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass}
            placeholder="Richiesta preventivo"
          />
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-gray-700">
            {formFields.message}
          </label>
          <textarea
            id="cf-message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass}
            placeholder="Descrivi le tue esigenze…"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto"
        >
          {formFields.submit}
        </button>
      </form>

      <Toast
        message="Messaggio pronto per l'invio."
        visible={toast}
        onClose={handleClose}
      />
    </>
  );
}
