import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import PageIntro from "@/components/PageIntro";
import ContactCta from "@/components/ContactCta";

export const metadata = createPageMetadata({ ...siteConfig.seo.chiSiamo, path: "/chi-siamo" });

export default function ChiSiamoPage() {
  const { about } = siteConfig;

  return (
    <>
      {/* ── Intro ─────────────────────────────────────── */}
      <PageIntro title="Chi siamo" description={about.intro} />

      {/* ── Storia ────────────────────────────────────── */}
      <Section>
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <Image
              src="/images/chi_siamo.jpg"
              alt="Team Mifro"
              width={576}
              height={720}
              className="w-full rounded-2xl object-cover"
              sizes="(max-width: 767px) calc(100vw - 32px), 528px"
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-gray-600">
            <h2 className="section-title">La nostra storia</h2>
            <p>{about.story}</p>
            <h3 className="!mt-8 text-lg font-semibold text-gray-900">
              Il nostro approccio
            </h3>
            <p>{about.approach}</p>
          </div>
        </div>
      </Section>

      {/* ── Perché Mifro ──────────────────────────────── */}
      <Section gray>
        <SectionHeader title="Perché scegliere Mifro" />
        <div className="grid gap-6 sm:grid-cols-2">
          {about.values.map((v) => (
            <div
              key={v.title}
              className="surface-card flex items-start gap-3 p-6"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <div>
                <p className="font-semibold text-gray-900">{v.title}</p>
                <p className="mt-1 text-sm text-gray-500">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Team ──────────────────────────────────────── */}
      <Section>
        <SectionHeader
          title="Il nostro team"
          subtitle="Le persone che ogni giorno lavorano al tuo fianco."
        />
        <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.team.map((member) => (
            <article
              key={member.name}
              className="surface-card p-6 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-0"
            >
              <h3 className="text-xl font-bold text-brand-900">
                <span aria-hidden="true" className="mb-4 block h-0.5 w-7 rounded-full bg-accent-500" />
                {member.name}
              </h3>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-brand-600">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────── */}
      <ContactCta />
    </>
  );
}
