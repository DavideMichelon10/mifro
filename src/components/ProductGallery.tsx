"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/content/sectors";

export default function ProductGallery({ images, name, sizes, large = false }: { images: ProductImage[]; name: string; sizes: string; large?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const element = viewport.current;
    if (!element) return;
    const next = (index + images.length) % images.length;
    element.scrollTo({ left: next * element.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div role="region" aria-roledescription="carosello" aria-label={`Foto: ${name}`} className="min-w-0">
      <div
        ref={viewport}
        tabIndex={0}
        aria-label="Scorri le foto del prodotto"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            goTo(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={(event) => {
          const element = event.currentTarget;
          setActive(Math.round(element.scrollLeft / element.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        {images.map((image, index) => (
          <div key={image.src} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} di ${images.length}`} className="w-full shrink-0 snap-center">
            <Image {...image} alt={image.alt} sizes={sizes} className={large ? "w-full object-contain" : "h-44 w-full object-contain sm:h-48"} style={large ? { aspectRatio: `${images[0].width} / ${images[0].height}` } : undefined} />
          </div>
        ))}
      </div>
      <div className="flex h-11 items-center justify-center gap-1">
        <button type="button" aria-label="Foto precedente" onClick={() => goTo(active - 1)} className="flex h-11 w-11 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50"><ChevronLeft className="h-4 w-4" aria-hidden="true" /></button>
        <span aria-live="polite" aria-atomic="true" className="min-w-12 text-center text-xs text-gray-600">{active + 1} / {images.length}</span>
        <button type="button" aria-label="Foto successiva" onClick={() => goTo(active + 1)} className="flex h-11 w-11 items-center justify-center rounded-full text-brand-700 hover:bg-brand-50"><ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
      </div>
    </div>
  );
}
