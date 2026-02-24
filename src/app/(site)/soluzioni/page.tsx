import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import { Icon, type IconName } from "@/components/Icons";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: siteConfig.seo.soluzioni.title,
  description: siteConfig.seo.soluzioni.description,
  alternates: { canonical: "/soluzioni" },
  openGraph: {
    title: siteConfig.seo.soluzioni.title,
    description: siteConfig.seo.soluzioni.description,
  },
};

export default function SoluzioniPage() {
  const { intro, blocks, faq } = siteConfig.solutions;

  return (
    <>
      {/* ── Intro ─────────────────────────────────────── */}
      <Section>
        <SectionHeader
          title="Le nostre soluzioni"
          subtitle={intro}
        />
      </Section>

      {/* ── Blocchi soluzione ─────────────────────────── */}
      {blocks.map((block, i) => (
        <Section key={block.id} id={block.id} gray={i % 2 === 1}>
          <ScrollReveal>
            <div className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl] md:[&>*]:[direction:ltr]" : ""}`}>
              {/* Immagine */}
              {block.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Testo + features */}
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={block.icon as IconName} className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {block.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {block.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {block.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </Section>
      ))}

      {/* ── FAQ ───────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <SectionHeader
            title="Domande frequenti"
            subtitle="Risposte alle domande più comuni sui nostri servizi."
          />
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <Accordion items={faq.map((f) => ({ question: f.question, answer: f.answer }))} />
        </ScrollReveal>
      </Section>
    </>
  );
}
