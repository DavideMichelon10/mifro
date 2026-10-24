"use client";

import { useEffect } from "react";
import { trackContactClick } from "@/lib/analytics";

export default function ContactClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      let channel: "phone" | "whatsapp";
      if (target.protocol === "tel:") channel = "phone";
      else if (target.protocol === "https:" && ["wa.me", "api.whatsapp.com"].includes(target.hostname)) channel = "whatsapp";
      else return;
      trackContactClick(channel, window.location.pathname);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
