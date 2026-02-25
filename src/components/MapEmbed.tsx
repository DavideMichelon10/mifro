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
        className="h-64 w-full rounded-xl border-0"
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
      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center transition-colors hover:bg-gray-100"
    >
      <MapPin className="h-8 w-8 text-gray-400" />
      <span className="text-sm font-medium text-gray-600">
        Clicca per caricare la mappa
      </span>
      <span className="text-xs text-gray-400">
        Google Maps potrebbe impostare cookie
      </span>
    </button>
  );
}
