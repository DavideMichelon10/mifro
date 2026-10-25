"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ADS_CONSENT_KEY, CONSENT_KEY, GA_ID } from "@/lib/analytics";

const scriptId = "mifro-google-measurement";

function consentSettings(analytics: boolean, advertising: boolean) {
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: analytics && advertising ? "granted" : "denied",
    ad_user_data: analytics && advertising ? "granted" : "denied",
    ad_personalization: "denied",
  };
}

function initializeConsent() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // Google’s command queue uses an Arguments object for each command.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments); };
  // The local queue makes no requests. Google is loaded only after consent.
  window.gtag("consent", "default", consentSettings(false, false));
}

function startAnalytics(advertising: boolean) {
  initializeConsent();
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  window.gtag!("consent", "update", consentSettings(true, advertising));
  if (document.getElementById(scriptId)) return;
  // Do not emit another config/page_view when a visitor changes preferences.
  window.gtag!("js", new Date());
  window.gtag!("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function clearMeasurementCookies(analytics: boolean) {
  for (const entry of document.cookie.split(";")) {
    const name = entry.trim().split("=")[0];
    const isAnalytics = name === "_ga" || name.startsWith("_ga_");
    const isAdvertising = name.startsWith("_gcl_") || name.startsWith("_gac_");
    if (!(analytics && isAnalytics) && !isAdvertising) continue;
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
    let adsChoice: string | null = null;
    try {
      choice = localStorage.getItem(CONSENT_KEY);
      adsChoice = localStorage.getItem(ADS_CONSENT_KEY);
    } catch { /* Ask again if storage is unavailable. */ }
    initializeConsent();
    if (choice === "accepted") {
      if (adsChoice !== "accepted") clearMeasurementCookies(false);
      startAnalytics(adsChoice === "accepted");
    } else clearMeasurementCookies(true);
    const frame = requestAnimationFrame(() => {
      // Existing Analytics permission never grants the new advertising purpose.
      // Preserve an existing refusal; an Analytics-only visitor can choose again.
      setOpen(choice !== "rejected" && (choice !== "accepted" || !["accepted", "rejected"].includes(adsChoice || "")));
      setReady(true);
    });
    function synchronize(event: StorageEvent) {
      if (event.key === null || event.key === CONSENT_KEY || event.key === ADS_CONSENT_KEY) location.reload();
    }
    window.addEventListener("storage", synchronize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", synchronize);
    };
  }, []);

  function choose(analytics: boolean, advertising: boolean) {
    try {
      // Save Ads first: an interrupted write cannot extend a legacy permission.
      localStorage.setItem(ADS_CONSENT_KEY, advertising ? "accepted" : "rejected");
      localStorage.setItem(CONSENT_KEY, analytics ? "accepted" : "rejected");
    } catch { /* Form remains usable when browser storage is unavailable. */ }
    setOpen(false);
    if (analytics) {
      if (!advertising) clearMeasurementCookies(false);
      startAnalytics(advertising);
    }
    else {
      const wasLoaded = Boolean(document.getElementById(scriptId));
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      window.gtag?.("consent", "update", consentSettings(false, false));
      clearMeasurementCookies(true);
      if (wasLoaded) location.reload();
    }
  }

  if (!ready) return null;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-3 left-3 z-40 min-h-11 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm hover:bg-brand-50">Preferenze cookie</button>
      {open && (
        <div role="dialog" aria-label="Preferenze cookie" data-cookie-preferences className="fixed bottom-0 left-0 right-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-gray-200 bg-white p-5 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-lg sm:rounded-2xl sm:p-6">
          <p className="font-semibold text-gray-900">Statistiche e misurazione pubblicitaria</p>
          <p className="mt-2 text-sm text-gray-600">Puoi consentire a Google Analytics di misurare visite, invii del modulo e clic su telefono e WhatsApp. Puoi anche consentire l’uso di cookie e dati di navigazione per collegare le richieste agli annunci Google Ads e migliorarne il rendimento. La misurazione pubblicitaria non attiva annunci personalizzati.</p>
          <p className="mt-2 text-sm text-gray-600">Puoi rifiutare e usare comunque il modulo, oppure cambiare scelta da “Preferenze cookie”. <Link href="/privacy" className="underline">Informativa privacy</Link></p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose(false, false)} className="button button-secondary">Rifiuta</button>
            <button type="button" onClick={() => choose(true, false)} className="button button-secondary">Solo statistiche</button>
            <button type="button" onClick={() => choose(true, true)} className="button button-secondary">Accetta statistiche e misurazione Ads</button>
          </div>
        </div>
      )}
    </>
  );
}
