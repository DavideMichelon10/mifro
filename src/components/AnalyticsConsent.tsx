"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_KEY, GA_ID } from "@/lib/analytics";

function startAnalytics() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // Google’s command queue uses an Arguments object for each command.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    const parts = location.hostname.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join(".")}`;
    }
  }
}

export default function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let choice: string | null = null;
    try { choice = localStorage.getItem(CONSENT_KEY); } catch { /* Ask again if storage is unavailable. */ }
    if (choice === "accepted") startAnalytics();
    else clearAnalyticsCookies();
    const frame = requestAnimationFrame(() => {
      setOpen(choice !== "accepted" && choice !== "rejected");
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function choose(accepted: boolean) {
    try { localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected"); } catch { /* Form remains usable. */ }
    setOpen(false);
    if (accepted) startAnalytics();
    else {
      const wasLoaded = Boolean(window.gtag);
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
      if (wasLoaded) location.reload();
    }
  }

  if (!ready) return null;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-3 left-3 z-40 rounded border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow">Preferenze cookie</button>
      {open && (
        <div role="dialog" aria-label="Preferenze cookie" className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-5 shadow-xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-lg sm:rounded-xl sm:border">
          <p className="font-semibold text-gray-900">Statistiche del sito</p>
          <p className="mt-2 text-sm text-gray-600">Con il tuo consenso usiamo Google Analytics per capire come viene utilizzato il sito e misurare le richieste inviate. Puoi rifiutare e usare comunque il modulo. <Link href="/privacy" className="underline">Informativa privacy</Link></p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose(false)} className="rounded border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700">Rifiuta Analytics</button>
            <button type="button" onClick={() => choose(true)} className="rounded border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700">Accetta Analytics</button>
          </div>
        </div>
      )}
    </>
  );
}
