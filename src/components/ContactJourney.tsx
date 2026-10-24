import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function ContactJourney() {
  const { contactJourney } = siteConfig;

  return (
    <section id="come-funziona" aria-labelledby="contact-journey-title" className="border-y border-brand-100 bg-brand-50 py-12 sm:py-16 lg:py-20">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">Come ti seguiamo</p>
          <h2 id="contact-journey-title" className="mt-4 max-w-md text-balance text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{contactJourney.title}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-gray-600">{contactJourney.description}</p>
          <a href="#richiedi-proposta" className="button button-primary mt-7 w-full sm:w-auto">{contactJourney.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
        </div>

        <ol className="min-w-0" aria-label="Dalla richiesta all’assistenza">
          {contactJourney.steps.map((step, index) => (
            <li key={step.title} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-8 before:absolute before:bottom-0 before:left-[21px] before:top-11 before:w-px before:bg-brand-200 last:pb-0 last:before:hidden sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6 sm:pb-9 sm:before:left-[23px] sm:before:top-12">
              <span aria-hidden="true" className={`relative flex h-11 w-11 items-center justify-center rounded-full text-xl font-bold sm:h-12 sm:w-12 ${"badge" in step ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700"}`}>{index + 1}</span>
              <div className="min-w-0 pt-1.5 sm:pt-2">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-brand-900 sm:text-2xl">{step.title}</h3>
                {"badge" in step && <p className="mt-2 text-sm font-semibold text-brand-700">{step.badge}</p>}
                <p className="mt-3 leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
