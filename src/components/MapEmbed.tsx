"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
  src: string;
  title?: string;
}

export default function MapEmbed({ src, title = "Mappa" }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        className="h-64 w-full rounded-2xl border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-center transition-colors hover:bg-brand-100"
    >
      <MapPin className="h-8 w-8 text-brand-600" />
      <span className="text-sm font-medium text-gray-600">
        Clicca per caricare la mappa
      </span>
      <span className="text-xs text-gray-500">
        Google Maps potrebbe impostare cookie
      </span>
    </button>
  );
}
