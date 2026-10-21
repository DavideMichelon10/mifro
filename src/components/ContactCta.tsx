import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function ContactCta({
  title = siteConfig.ctaFinal.title,
  description = siteConfig.ctaFinal.description,
  label = siteConfig.ctaFinal.cta.label,
  href = siteConfig.ctaFinal.cta.href,
  showPhone = false,
}: {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  showPhone?: boolean;
}) {
  return (
    <section className="bg-brand-900 text-white">
      <div className="site-container flex flex-col items-start justify-between gap-7 py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-100">{description}</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
          <Link href={href} className="button button-inverse">{label}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          {showPhone && <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-brand-100 hover:text-white focus-visible:outline-white"><Phone aria-hidden="true" className="h-4 w-4" />{siteConfig.contact.phone}</a>}
        </div>
      </div>
    </section>
  );
}
