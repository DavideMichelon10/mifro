import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Shield, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";
import BrandMarquee from "@/components/BrandMarquee";
import MapEmbed from "@/components/MapEmbed";
import ContactCta from "@/components/ContactCta";

export default function HomePage() {
  const { hero, productsAndSupport, sectors, brands, certifications, contact, hoursShort } =
    siteConfig;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="page-intro overflow-hidden">
        <div className="site-container py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-4xl text-left sm:text-center">
            <p className="eyebrow mb-4 sm:justify-center">
              {hero.tagline}
            </p>
            <h1 className="page-title">
              {hero.title}
            </h1>
            <p className="lead mx-auto mt-5 max-w-2xl">
              {hero.subtitle}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <Link
                href={hero.cta1.href}
                className="button button-primary"
              >
                {hero.cta1.label}
              </Link>
              <Link
                href={hero.cta2.href}
                className="button button-secondary"
              >
                {hero.cta2.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="surface-card mt-8 overflow-hidden sm:mt-10">
            <Image
              src={hero.image}
              alt="Sede Mifro con i mezzi aziendali davanti al negozio"
              width={1536}
              height={927}
              quality={85}
              className="h-auto w-full"
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1151px) calc(100vw - 48px), 1104px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Scelta del settore ────────────────────────── */}
      <Section id="settori">
        <ScrollReveal>
          <SectionHeader
            title="Per la tua attività"
            subtitle="Scegli il tuo settore e scopri le casse e i gestionali adatti al tuo lavoro."
          />
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector, index) => (
            <ScrollReveal key={sector.title} delay={(index + 1) as 1 | 2 | 3 | 4}>
              <Card
                title={sector.title}
                description={sector.description}
                icon={sector.icon}
                href={sector.href}
                linkLabel="Vedi le soluzioni"
              />
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-gray-600">Non sai quale soluzione scegliere? <Link href="/contatti" className="font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700">Parlane con i nostri tecnici</Link>.</p>
      </Section>

      {/* ── Prodotti e assistenza ─────────────────────── */}
      <Section gray id="servizi">
        <ScrollReveal>
          <SectionHeader
            title="Prodotti e assistenza"
            subtitle="Pagamenti, strumenti per l’ufficio e supporto tecnico."
          />
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {productsAndSupport.blocks.map((service, index) => (
            <ScrollReveal key={service.id} delay={(index + 1) as 1 | 2 | 3}>
              <Card
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                imageAlt={service.imageAlt}
                imageFit={service.imageFit}
                imageSizes="(max-width: 639px) 96px, (max-width: 1199px) 33vw, 368px"
                compactMobile
                href={`/prodotti-assistenza#${service.id}`}
                linkLabel="Esplora il servizio"
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── I nostri principali marchi ────────────────── */}
      <Section>
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
      <Section gray>
        <ScrollReveal>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="icon-tile">
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
      <Section id="dove-siamo">
        <ScrollReveal>
          <SectionHeader title="Dove siamo" />
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <p className="font-medium text-gray-900">Sede</p>
                  <p>{contact.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <p className="font-medium text-gray-900">Orari</p>
                  <p>{hoursShort}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${contact.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
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
              <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
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
      <ContactCta />
    </>
  );
}
