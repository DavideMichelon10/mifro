import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Shield, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Card from "@/components/Card";
import { type IconName } from "@/components/Icons";
import ScrollReveal from "@/components/ScrollReveal";
import BrandMarquee from "@/components/BrandMarquee";
import MapEmbed from "@/components/MapEmbed";

export default function HomePage() {
  const { hero, services, sectors, brands, certifications, ctaFinal, contact, hoursShort } =
    siteConfig;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-brand-50/40">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-16 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-4xl text-left sm:text-center">
            <p className="mb-3 text-xs sm:mb-4 sm:text-sm font-semibold uppercase tracking-widest text-brand-500">
              {hero.tagline}
            </p>
            <h1 className="text-[1.875rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:mt-6 leading-relaxed text-gray-500 sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <Link
                href={hero.cta1.href}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {hero.cta1.label}
              </Link>
              <Link
                href={hero.cta2.href}
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
              >
                {hero.cta2.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <nav aria-label="Accesso rapido alle sezioni" className="mt-6 grid grid-cols-3 gap-2 sm:hidden">
            <a href="#servizi" className="flex min-h-12 items-center justify-center rounded-lg bg-brand-50 px-2 text-sm font-semibold text-brand-700">Servizi</a>
            <a href="#settori" className="flex min-h-12 items-center justify-center rounded-lg bg-brand-50 px-2 text-sm font-semibold text-brand-700">Settori</a>
            <a href="#dove-siamo" className="flex min-h-12 items-center justify-center rounded-lg bg-brand-50 px-2 text-sm font-semibold text-brand-700">Dove siamo</a>
          </nav>

          <div className="mt-8 overflow-hidden rounded-xl shadow-lg sm:mt-16 sm:rounded-2xl sm:shadow-2xl">
            <Image
              src={hero.image}
              alt="Sede Mifro a Pergine Valsugana – veduta esterna del negozio"
              width={1400}
              height={700}
              className="aspect-[16/9] w-full object-cover sm:aspect-auto sm:h-auto"
              sizes="(max-width: 640px) 100vw, 1152px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Cosa facciamo ─────────────────────────────── */}
      <Section id="servizi" className="max-sm:py-10">
        <ScrollReveal>
          <SectionHeader
            title="Cosa facciamo"
            subtitle="Soluzioni complete per il punto vendita e l'ufficio: dalla consulenza all'assistenza."
          />
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <Card
                title={s.title}
                description={s.description}
                icon={s.icon as IconName}
                image={s.image}
                compactMobile
                href={s.href}
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Soluzioni per settori ─────────────────────── */}
      <Section gray id="settori" className="max-sm:py-10">
        <ScrollReveal>
          <SectionHeader
            title="Soluzioni per il tuo settore"
            subtitle="Ristorazione, retail o ufficio: abbiamo la tecnologia giusta per te."
          />
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {sectors.map((s, i) => (
            <ScrollReveal key={s.title} delay={(i + 1) as 1 | 2 | 3}>
              <Card
                title={s.title}
                description={s.description}
                icon={s.icon as IconName}
                href={s.href}
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── I nostri principali marchi ────────────────── */}
      <Section className="max-sm:py-10">
        <ScrollReveal>
          <SectionHeader
            title="I nostri principali marchi"
            subtitle="Collaboriamo con i migliori produttori del settore per offrirti soluzioni affidabili e certificate."
          />
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <BrandMarquee brands={brands} />
        </ScrollReveal>
      </Section>

      {/* ── Qualità e certificazioni ──────────────────── */}
      <Section gray className="max-sm:py-10">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {certifications.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                {certifications.text}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
              {certifications.badge}
            </span>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Dove siamo ────────────────────────────────── */}
      <Section id="dove-siamo" className="max-sm:py-10">
        <ScrollReveal>
          <SectionHeader title="Dove siamo" />
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-medium text-gray-900">Sede</p>
                  <p>{contact.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-medium text-gray-900">Orari</p>
                  <p>{hoursShort}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${contact.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-700"
              >
                Apri su Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {contact.googleMapsEmbed ? (
              <MapEmbed
                src={contact.googleMapsEmbed}
                title="Posizione Mifro su Google Maps"
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8" />
                  <p>Mappa – inserire embed di Google Maps</p>
                  <p className="text-xs">in siteConfig.contact.googleMapsEmbed</p>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Section>

      {/* ── CTA finale ────────────────────────────────── */}
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
