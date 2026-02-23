import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: siteConfig.seo.chiSiamo.title,
  description: siteConfig.seo.chiSiamo.description,
  openGraph: {
    title: siteConfig.seo.chiSiamo.title,
    description: siteConfig.seo.chiSiamo.description,
  },
};

export default function ChiSiamoPage() {
  const { about, ctaFinal } = siteConfig;

  return (
    <>
      {/* ── Intro ─────────────────────────────────────── */}
      <Section>
        <SectionHeader title="Chi siamo" subtitle={about.intro} />
      </Section>

      {/* ── Storia ────────────────────────────────────── */}
      <Section gray>
        <div className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-gray-600">
          <h2 className="text-xl font-bold text-gray-900">La nostra storia</h2>
          <p>{about.story}</p>
          <h3 className="!mt-8 text-lg font-semibold text-gray-900">
            Il nostro approccio
          </h3>
          <p>{about.approach}</p>
        </div>
      </Section>

      {/* ── Perché Mifro ──────────────────────────────── */}
      <Section>
        <SectionHeader title="Perché scegliere Mifro" />
        <div className="grid gap-6 sm:grid-cols-2">
          {about.values.map((v) => (
            <div
              key={v.title}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <div>
                <p className="font-semibold text-gray-900">{v.title}</p>
                <p className="mt-1 text-sm text-gray-500">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-brand-600 px-4 py-16 text-center text-white sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{ctaFinal.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-100">
            {ctaFinal.description}
          </p>
          <Link
            href={ctaFinal.cta.href}
            className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
          >
            {ctaFinal.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
