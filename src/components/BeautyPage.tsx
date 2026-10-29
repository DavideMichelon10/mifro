import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, Globe, Headset, MapPin, Settings } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import SolutionCard from "@/components/SolutionCard";
import ScrollReveal from "@/components/ScrollReveal";
import { beautyContent as content } from "@/content/beauty";
import type { Sector } from "@/content/sectors";
import { siteConfig } from "@/content/site";

const supportIcons = [Settings, BookOpen, Headset];

function BookingIllustration() {
  return (
    <figure className="surface-card mx-auto w-full max-w-md p-5 sm:p-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <Globe aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600" />
        <p className="text-sm font-semibold text-brand-900">La pagina web del tuo salone</p>
      </div>
      <p className="mt-5 text-lg font-semibold text-brand-900">Il cliente sceglie</p>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-3">
          <dt className="text-gray-600">Operatore</dt>
          <dd className="mt-1 font-semibold text-brand-900">Operatore A</dd>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-3">
          <dt className="text-gray-600">Orario</dt>
          <dd className="mt-1 font-semibold text-brand-900">09:30</dd>
        </div>
      </dl>
      <div className="flex justify-center py-4"><ArrowDown aria-hidden="true" className="h-5 w-5 text-brand-600" /></div>
      <div className="rounded-xl bg-brand-900 p-4 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-200" />L’agenda del team si aggiorna</div>
        <div className="mt-4 flex items-start gap-3 border-l-2 border-accent-500 pl-3 text-sm">
          <span className="font-semibold">09:30</span>
          <p>Appuntamento<span className="mt-1 block text-brand-100">Operatore A</span></p>
        </div>
      </div>
    </figure>
  );
}

export default function BeautyPage({ sector }: { sector: Sector }) {
  const { localPresence } = siteConfig.about;
  const integrations = sector.solutions
    .filter((solution) => solution.name === "WALLE 8T" || solution.name === "POS per pagamenti")
    .map((solution) => solution.name === "POS per pagamenti" ? { ...solution, features: content.integrations.posFeatures } : solution);

  return (
    <>
      <section className="page-intro">
        <div className="site-container grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:py-14">
          <div className="min-w-0">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 className="page-title mt-4 max-w-xl">{content.hero.title}</h1>
            <p className="lead mt-5 max-w-xl text-pretty">{content.hero.subtitle}</p>
            <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-start">
              <a href="#richiedi-proposta" className="button button-primary">{content.hero.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
              <a href="#come-funziona" className="text-link justify-center sm:justify-start">Come funziona<ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            </div>
          </div>
          <BookingIllustration />
        </div>
      </section>

      <Section id="come-funziona">
        <ScrollReveal>
          <p className="eyebrow">{content.booking.eyebrow}</p>
          <h2 className="section-title mt-3 max-w-2xl">{content.booking.title}</h2>
        </ScrollReveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {content.booking.steps.map((step, index) => (
            <li key={step.title}>
              <ScrollReveal delay={(index + 1) as 1 | 2 | 3} className="border-t border-brand-200 pt-5">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-semibold text-brand-700">{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{step.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="agenda-team" className="bg-brand-900 text-white">
        <ScrollReveal className="grid items-start gap-7 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">{content.team.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{content.team.title}</h2>
            <p className="mt-4 leading-relaxed text-brand-100">{content.team.intro}</p>
          </div>
          <ul className="space-y-5 lg:pt-8">
            {content.team.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 leading-relaxed"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-500" />{feature}</li>
            ))}
          </ul>
        </ScrollReveal>
      </Section>

      <Section id="software-gestionale">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal>
            <h2 className="section-title">{content.software.title}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{content.software.intro}</p>
            <ul className="mt-5 space-y-3">
              {content.software.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 leading-relaxed text-gray-700"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-600" />{feature}</li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={1} className="min-w-0">
            <figure className="surface-card overflow-hidden p-2">
              {content.software.gallery.map((image) => <Image key={image.src} {...image} alt={image.alt} sizes="(max-width: 1023px) calc(100vw - 50px), 510px" className="h-auto w-full rounded-lg" />)}
            </figure>
          </ScrollReveal>
        </div>
      </Section>

      <Section id="supporto-mifro" gray className="border-y border-gray-200">
        <ScrollReveal>
          <p className="eyebrow">{content.support.eyebrow}</p>
          <h2 className="section-title mt-3 max-w-3xl">{content.support.title}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{content.support.intro}</p>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {content.support.items.map((item, index) => {
            const SupportIcon = supportIcons[index];
            return (
              <ScrollReveal key={item.title} delay={(index + 1) as 1 | 2 | 3}>
                <article>
                  <div className="icon-tile mb-4 bg-white"><SupportIcon aria-hidden="true" className="h-6 w-6" /></div>
                  <h3 className="text-lg font-semibold text-brand-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{item.text}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <Section id="soluzioni-rch">
        <ScrollReveal>
          <h2 className="section-title max-w-2xl">{content.integrations.title}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{content.integrations.intro}</p>
        </ScrollReveal>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {integrations.map((solution, index) => (
            <ScrollReveal key={solution.name} delay={(index + 1) as 1 | 2} className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0">
              <SolutionCard solution={solution} imageSizes="(max-width: 767px) calc(100vw - 80px), 480px" />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section id="presenza-mifro" gray className="border-y border-gray-200">
        <ScrollReveal className="grid items-center gap-7 md:grid-cols-2 lg:gap-12">
          <figure>
            <Image src={localPresence.image} alt={localPresence.imageAlt} width={2560} height={1537} sizes="(max-width: 767px) calc(100vw - 32px), 528px" className="h-auto w-full rounded-2xl" />
            <figcaption className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-600"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{siteConfig.contact.fullAddress}</figcaption>
          </figure>
          <div>
            <h2 className="section-title">{content.support.peopleTitle}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{content.support.peopleText}</p>
            <Link href="/chi-siamo" className="text-link mt-3">Conosci Mifro<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
            <a href="#richiedi-proposta" className="button button-primary mt-5 flex w-fit max-w-full">{content.hero.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
          </div>
        </ScrollReveal>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <ScrollReveal><h2 className="section-title">Domande frequenti</h2></ScrollReveal>
          <div className="surface-card divide-y divide-gray-200 px-5 sm:px-6">
            {content.faq.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" /></summary>
                <p className="mt-3 pr-4 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section gray>
        <div className="mx-auto max-w-2xl space-y-8">
          <ScrollReveal className="text-center">
            <p className="eyebrow justify-center">{content.form.eyebrow}</p>
            <h2 className="section-title mt-4">{content.form.title}</h2>
            <p className="mt-5 leading-relaxed text-gray-600">{content.form.intro}</p>
          </ScrollReveal>
          <div id="richiedi-proposta" tabIndex={-1} aria-labelledby="beauty-form-title" className="form-panel scroll-mt-24 bg-white">
            <h3 id="beauty-form-title" className="mb-6 text-center text-xl font-semibold">{siteConfig.contactPage.formTitle}</h3>
            <ContactForm context={{ sector: "parrucchieri-saloni", form_location: "sector_page" }} defaultSubject={content.form.subject} messagePlaceholder={content.form.messagePlaceholder} submitLabel={content.form.submitLabel} showSubject={false} />
          </div>
        </div>
      </Section>
    </>
  );
}
