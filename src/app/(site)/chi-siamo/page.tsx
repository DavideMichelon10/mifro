import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: siteConfig.seo.chiSiamo.title,
  description: siteConfig.seo.chiSiamo.description,
  alternates: { canonical: "/chi-siamo" },
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
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="flex-shrink-0 md:w-[36rem]">
            <Image
              src="/images/chi_siamo.jpg"
              alt="Team Mifro"
              width={576}
              height={720}
              className="w-full rounded-2xl object-cover shadow-md"
            />
          </div>
          <div className="flex-1 space-y-5 text-sm leading-relaxed text-gray-600">
            <h2 className="text-xl font-bold text-gray-900">La nostra storia</h2>
            <p>{about.story}</p>
            <h3 className="!mt-8 text-lg font-semibold text-gray-900">
              Il nostro approccio
            </h3>
            <p>{about.approach}</p>
          </div>
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

      {/* ── Team ──────────────────────────────────────── */}
      <Section gray>
        <SectionHeader
          title="Il nostro team"
          subtitle="Le persone che ogni giorno lavorano al tuo fianco."
        />
        <div className="mx-auto mt-2 grid max-w-4xl gap-8 sm:grid-cols-3">
          {about.team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-center"
            >
              <div className="mb-4 h-28 w-28 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-bold text-gray-900">{member.name}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand-500">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{member.bio}</p>
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
