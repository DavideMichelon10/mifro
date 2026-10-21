"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="surface-card divide-y divide-gray-200 overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-gray-900 transition-colors hover:bg-brand-50 focus-visible:outline-offset-[-4px]"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            {item.question}
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-brand-600 transition-transform",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all",
              openIndex === i ? "max-h-96" : "max-h-0"
            )}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
