import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Headset, MapPin, MonitorCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import SolutionCard from "@/components/SolutionCard";
import ScrollReveal from "@/components/ScrollReveal";
import { salesContent as content } from "@/content/sales";
import { productImages } from "@/content/sectors";
import { siteConfig } from "@/content/site";
import { salesContactContext, SALES_CONTACT_SUBJECT, SALES_PATH } from "@/lib/contact-context";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({ ...content.seo, path: SALES_PATH }),
  // Dedicated advertising landing, following the rental landing's indexing policy.
  robots: { index: false, follow: true },
};

const supportIcons = [MonitorCheck, BookOpen, Headset];

export default function SalesPage() {
  const { contact, about } = siteConfig;
  const product = productImages["WALLE MEC RT"];

  return (
    <>
      <section className="page-intro overflow-hidden" data-contact-form-only>
        <div className="site-container grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:py-14">
          <div className="min-w-0">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 className="page-title mt-4 max-w-xl">{content.hero.title}</h1>
            <p className="lead mt-5 max-w-xl text-pretty">{content.hero.subtitle}</p>
            <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-start">
              <a href="#richiedi-proposta" className="button button-primary">
                {content.hero.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
              <a href="#modelli" className="text-link justify-center">Scopri alcuni modelli<ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            </div>
          </div>
          <figure className="surface-card mx-auto w-full max-w-md p-5 sm:p-6">
            <Image
              src={product.src}
              alt={product.alt}
              width={product.width}
              height={product.height}
              priority
              sizes="(max-width: 479px) calc(100vw - 72px), (max-width: 1023px) 398px, 358px"
              className="mx-auto h-auto w-full max-w-80"
            />
            <figcaption className="mt-4 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-600">{content.hero.imageCaption}</figcaption>
          </figure>
        </div>
      </section>

      <Section id="prima-cassa-o-sostituzione">
        <ScrollReveal>
          <p className="eyebrow">{content.needs.eyebrow}</p>
          <h2 className="section-title mt-3 max-w-2xl">{content.needs.title}</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.needs.items.map((item, index) => (
            <ScrollReveal key={item.title} delay={(index + 1) as 1 | 2}>
              <article className="surface-card h-full p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-brand-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section gray id="modelli">
        <ScrollReveal>
          <p className="eyebrow">{content.products.eyebrow}</p>
          <h2 className="section-title mt-3">{content.products.title}</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {content.products.items.map((solution, index) => (
            <ScrollReveal key={solution.name} delay={(index + 1) as 1 | 2 | 3} className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0">
              <SolutionCard solution={solution} />
            </ScrollReveal>
          ))}
        </div>
        <a href="#richiedi-proposta" className="text-link mt-3">{content.hero.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
      </Section>

      <Section id="supporto-mifro">
        <ScrollReveal>
          <p className="eyebrow">{content.support.eyebrow}</p>
          <h2 className="section-title mt-3 max-w-2xl">{content.support.title}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{content.support.intro}</p>
        </ScrollReveal>
        <div className="mt-8 grid gap-7 md:grid-cols-3 md:gap-8">
          {content.support.items.map((item, index) => {
            const SupportIcon = supportIcons[index];
            return (
              <ScrollReveal key={item.title} delay={(index + 1) as 1 | 2 | 3}>
                <article>
                  <div className="icon-tile mb-4"><SupportIcon aria-hidden="true" className="h-6 w-6" /></div>
                  <h3 className="text-lg font-semibold text-brand-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{item.text}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <ScrollReveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <figure>
            <Image
              src={about.localPresence.image}
              alt={about.localPresence.imageAlt}
              width={2560}
              height={1537}
              sizes="(max-width: 1023px) calc(100vw - 32px), 528px"
              className="h-auto w-full rounded-2xl"
            />
            <figcaption className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-gray-600">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{contact.fullAddress}
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">{content.people.eyebrow}</p>
            <h2 className="section-title mt-3">{content.people.title}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{content.people.intro}</p>
            <p className="mt-3 leading-relaxed text-gray-600">{content.people.support}</p>
            <Link href="/chi-siamo" className="text-link mt-4">{content.people.link}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          </div>
        </ScrollReveal>
      </Section>

      <Section id="come-funziona" className="bg-brand-900 text-white">
        <ScrollReveal><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{content.steps.title}</h2></ScrollReveal>
        <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
          {content.steps.items.map((step, index) => (
            <li key={step.title}>
              <ScrollReveal delay={(index + 1) as 1 | 2 | 3} className="border-t border-white/20 pt-5">
                <span aria-hidden="true" className="text-sm font-semibold text-accent-500">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-100">{step.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <ScrollReveal><h2 className="section-title">Domande frequenti</h2></ScrollReveal>
          <div className="surface-card divide-y divide-gray-200 px-5 sm:px-6">
            {content.faq.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}<ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 pr-4 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section gray>
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5 justify-center">{content.form.eyebrow}</p>
          <div id="richiedi-proposta" tabIndex={-1} aria-labelledby="sales-form-title" className="form-panel scroll-mt-24 bg-white">
            <h2 id="sales-form-title" className="text-center text-xl font-semibold">{content.form.titlePanel}</h2>
            <p className="mb-6 mt-3 text-sm leading-relaxed text-gray-600">{content.form.intro}</p>
            <ContactForm
              context={salesContactContext}
              defaultSubject={SALES_CONTACT_SUBJECT}
              messagePlaceholder={content.form.messagePlaceholder}
              submitLabel={content.form.submitLabel}
              showSubject={false}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
