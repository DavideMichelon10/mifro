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
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 sm:text-base"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            {item.question}
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform",
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
            <p className="px-5 pb-4 text-sm leading-relaxed text-gray-500">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
