import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronDown, MonitorCog } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getSector, sectors, sectorHref } from "@/content/sectors";
import { Icon } from "@/components/Icons";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import ContactJourney from "@/components/ContactJourney";
import SolutionCard from "@/components/SolutionCard";
import ProductGallery from "@/components/ProductGallery";
import ScrollReveal from "@/components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((sector) => ({ settore: sector.slug }));
}

type PageProps = { params: Promise<{ settore: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { settore } = await params;
  const sector = getSector(settore);
  if (!sector) notFound();
  return createPageMetadata({
    title: sector.title,
    description: sector.description,
    path: sectorHref(sector.slug),
    image: sector.slug === "ristoranti" ? "ristoranti" : "generale",
  });
}

export default async function SectorPage({ params }: PageProps) {
  const { settore } = await params;
  const sector = getSector(settore);
  if (!sector) notFound();
  const { highlights, localPresence } = siteConfig.about;
  const { contactJourney } = siteConfig;

  return (
    <>
      <section className="page-intro overflow-hidden">
        <div className="site-container py-8 sm:py-10 lg:py-12">
          <p className="eyebrow">{sector.digitalServices ? "Soluzioni Mifro" : "Soluzioni RCH"} · {sector.label}</p>
          <h1 className="page-title mt-3">{sector.headline}</h1>
          <p className="lead mt-4 max-w-3xl text-pretty">{sector.intro}</p>
          <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-5">
            <a href="#richiedi-proposta" className="button button-primary">{sector.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            <a href="#come-funziona" className="text-link justify-center sm:justify-start">Come funziona<ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
          </div>
        </div>
      </section>

      <section aria-label="L’esperienza Mifro" className="border-b border-gray-200 bg-white py-3 md:py-9 lg:py-10">
        <dl className="site-container grid divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {highlights.map((item) => (
            <div key={item.value} className="relative min-w-0 py-3 pl-5 md:px-6 md:py-1 md:first:pl-0 md:last:pr-0 lg:px-10">
              <dt className="text-2xl font-bold leading-tight tracking-tight text-brand-700 md:text-xl lg:text-2xl xl:text-3xl">
                <span aria-hidden="true" className="absolute left-0 top-5 h-5 w-0.5 rounded-full bg-accent-500 md:static md:mb-3 md:block md:h-0.5 md:w-7" />
                {item.value}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-gray-600 md:mt-1.5 lg:text-base">{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {sector.digitalServices && (
        <Section id="servizi-digitali">
          <ScrollReveal className="mb-8">
            <h2 className="section-title">Gestione e presenza online, su misura</h2>
            <p className="mt-4 leading-relaxed text-gray-600">Mifro ti segue in ogni fase: <strong className="font-semibold text-brand-900">installazione e configurazione</strong>, <strong className="font-semibold text-brand-900">formazione sull’utilizzo</strong> e <strong className="font-semibold text-brand-900">assistenza post-vendita</strong>. Ti aiutiamo a partire e restiamo al tuo fianco nel lavoro quotidiano.</p>
          </ScrollReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {sector.digitalServices.map((service, index) => (
              <ScrollReveal key={service.title} delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}>
                <article className="surface-card h-full p-6 sm:p-8">
                  <div className="icon-tile mb-5"><Icon name={service.icon} aria-hidden="true" className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-bold tracking-tight text-brand-900">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{service.description}</p>
                  <ul className="mt-5 space-y-3 border-t border-gray-200 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-700"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{feature}</li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <a href="#richiedi-proposta" className="text-link mt-5">Parliamo del tuo progetto<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
        </Section>
      )}

      {sector.software && (
        <Section id="software-gestionale" className="border-b border-gray-200">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <div className="icon-tile mb-5"><MonitorCog aria-hidden="true" className="h-6 w-6" /></div>
              <h2 className="section-title">{sector.software.title}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-gray-600">{sector.software.description}</p>
              <ul className="mt-6 space-y-4">
                {sector.software.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-medium text-brand-900">
                    <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{feature}
                  </li>
                ))}
              </ul>
              <a href="#richiedi-proposta" className="text-link mt-5">{sector.software.cta ?? "Parliamo del tuo gestionale"}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            </ScrollReveal>
            <ScrollReveal delay={1} className="min-w-0">
              <ProductGallery images={sector.software.gallery} name={sector.software.title} sizes="(max-width: 1023px) calc(100vw - 32px), 520px" large />
            </ScrollReveal>
          </div>
        </Section>
      )}

      <Section gray id="soluzioni-rch">
        <ScrollReveal className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl"><h2 className="section-title">{sector.solutionsHeading}</h2><p className="mt-4 leading-relaxed text-gray-600">{sector.solutionsIntro}</p></div>
          <div className="flex items-center gap-6">
            <Image src="/images/brands/rch.svg" alt="RCH" width={655} height={567} className="h-10 w-auto object-contain" />
            {sector.solutions.some((solution) => solution.name === "Cassetti automatici Cashmatic") && (
              <Image src="/images/brands/cashmatic.svg" alt="Cashmatic" width={180} height={60} className="h-8 w-auto max-w-36 object-contain" />
            )}
          </div>
        </ScrollReveal>
        <div className={`grid gap-5 ${sector.solutions.length === 3 ? "md:grid-cols-3" : sector.solutions.length >= 2 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {sector.solutions.map((solution, index) => (
            <ScrollReveal
              key={solution.name}
              delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}
              className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0"
            >
              <SolutionCard
                solution={solution}
                imageSizes={sector.solutions.length === 3 ? "(max-width: 767px) calc(100vw - 80px), 320px" : "(max-width: 767px) calc(100vw - 80px), 480px"}
              />
            </ScrollReveal>
          ))}
        </div>
        <a href="#richiedi-proposta" className="text-link mt-5">{sector.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
      </Section>

      <Section>
        <div className="grid items-center gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <ScrollReveal>
            <Image
              src={localPresence.image}
              alt={localPresence.imageAlt}
              width={2560}
              height={1537}
              quality={85}
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) 45vw, 475px"
              className="h-auto w-full rounded-2xl"
            />
          </ScrollReveal>
          <ScrollReveal delay={1} className="min-w-0">
            <h2 className="section-title">{localPresence.title}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{localPresence.intro}</p>
            <p className="mt-3 leading-relaxed text-gray-600">{localPresence.support}</p>
            <Link href="/chi-siamo" className="text-link mt-5">Conosci Mifro<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </ScrollReveal>
        </div>
      </Section>

      <ContactJourney />

      <Section gray>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <ScrollReveal><h2 className="section-title">Domande frequenti</h2></ScrollReveal>
          <div className="surface-card divide-y divide-gray-200 px-5 sm:px-6">
            {sector.faq.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" /></summary><p className="mt-3 pr-4 text-sm leading-relaxed text-gray-600">{faq.answer}</p></details>)}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ScrollReveal>
            <p className="eyebrow">Contatta Mifro</p>
            <h2 className="section-title mt-4">{sector.question}</h2>
            <p className="mt-5 leading-relaxed text-gray-600">{sector.questionText}</p>
          </ScrollReveal>
          <div id="richiedi-proposta" tabIndex={-1} aria-labelledby="contact-form-title" className="form-panel scroll-mt-24">
            <h3 id="contact-form-title" className="mb-6 text-xl font-semibold">{siteConfig.contactPage.formTitle}</h3>
            <ContactForm key={sector.slug} context={{ sector: sector.slug, form_location: "sector_page" }} defaultSubject={sector.subject} messagePlaceholder={sector.messagePlaceholder} submitLabel={contactJourney.cta} showSubject={false} />
          </div>
        </div>
      </Section>

    </>
  );
}
