import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, Headset, MapPin, MonitorCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { rentalContent as content } from "@/content/rental";
import { productImages } from "@/content/sectors";
import { siteConfig } from "@/content/site";
import { rentalContactContext, RENTAL_CONTACT_SUBJECT, RENTAL_PATH } from "@/lib/contact-context";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({ ...content.seo, path: RENTAL_PATH }),
  // Review draft: keep out of organic search until the commercial terms are approved.
  robots: { index: false, follow: true },
};

const supportIcons = [MonitorCheck, BookOpen, Headset];

export default function RentalPage() {
  const { contact, about } = siteConfig;
  const product = productImages["WALLE MEC RT"];

  return (
    <>
      <section className="page-intro overflow-hidden" data-contact-form-only>
        <div className="site-container grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:py-14">
          <div className="min-w-0">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 className="page-title mt-4 max-w-xl">
              {content.hero.title}{" "}
              <span className="mt-3 block text-brand-600">
                <span className="text-2xl sm:text-3xl">{content.hero.pricePrefix}</span>{" "}
                <span className="text-5xl sm:text-6xl lg:text-7xl">{content.hero.price}</span>{" "}
                <span className="whitespace-nowrap text-2xl sm:text-3xl">{content.hero.pricePeriod}</span>
              </span>
            </h1>
            <p className="lead mt-5 max-w-xl text-pretty">{content.hero.subtitle}</p>
            <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-start">
              <a href="#richiedi-proposta" className="button button-primary">
                {content.hero.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
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

      <Section id="supporto-mifro">
        <p className="eyebrow">{content.support.eyebrow}</p>
        <h2 className="section-title mt-3 max-w-2xl">{content.support.title}</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-3 md:gap-8">
          {content.support.items.map((item, index) => {
            const SupportIcon = supportIcons[index];
            return (
              <article key={item.title}>
                <div className="icon-tile mb-4"><SupportIcon aria-hidden="true" className="h-6 w-6" /></div>
                <h3 className="text-lg font-semibold text-brand-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="come-funziona" className="bg-brand-900 text-white">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{content.steps.title}</h2>
        <p className="mt-3 text-brand-100">{content.steps.intro}</p>
        <ol className="mt-8 grid gap-7 md:grid-cols-3 md:gap-10">
          {content.steps.items.map((step, index) => (
            <li key={step.title} className="border-t border-white/20 pt-5">
              <span aria-hidden="true" className="text-sm font-semibold text-accent-500">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-brand-100">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
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
        </div>
      </Section>

      <Section gray>
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5 justify-center">{content.form.eyebrow}</p>
          <div id="richiedi-proposta" tabIndex={-1} aria-labelledby="rental-form-title" className="form-panel scroll-mt-24 bg-white">
            <h2 id="rental-form-title" className="mb-6 text-center text-xl font-semibold">{content.form.titlePanel}</h2>
            <ContactForm
              context={rentalContactContext}
              defaultSubject={RENTAL_CONTACT_SUBJECT}
              messagePlaceholder={content.form.messagePlaceholder}
              submitLabel={content.form.submitLabel}
              showSubject={false}
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <h2 className="section-title">Domande frequenti</h2>
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
    </>
  );
}
