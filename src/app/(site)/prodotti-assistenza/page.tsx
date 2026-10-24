import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/Icons";
import Card from "@/components/Card";
import Section, { SectionHeader } from "@/components/Section";
import PageIntro from "@/components/PageIntro";
import ContactCta from "@/components/ContactCta";

export const metadata = createPageMetadata({ ...siteConfig.seo.prodottiAssistenza, path: "/prodotti-assistenza" });

export default function ProdottiAssistenzaPage() {
  const { intro, blocks, sectorsIntro } = siteConfig.productsAndSupport;

  return (
    <>
      <PageIntro title="Prodotti e assistenza" description={intro} />
      <Section>
        <div className="space-y-6 sm:space-y-8">
          {blocks.map((block, index) => (
            <section key={block.id} id={block.id} aria-labelledby={`${block.id}-title`} className="surface-card grid overflow-hidden md:grid-cols-2">
              <div className={`relative aspect-[4/3] bg-gray-50 md:aspect-auto md:min-h-[360px] lg:min-h-[400px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) 50vw, 576px"
                  className={block.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              </div>
              <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-12 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="icon-tile"><Icon name={block.icon} aria-hidden="true" className="h-6 w-6" /></span>
                <h2 id={`${block.id}-title`} className="section-title mt-5">{block.title}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-gray-600">{block.details}</p>
                {block.id === "riparazioni" && (
                  <div className="mt-5 space-y-3 text-sm leading-relaxed text-gray-600">
                    <p>{siteConfig.support.territory} {siteConfig.support.methods}</p>
                    <p>{siteConfig.support.requestNote}</p>
                    <p><strong className="font-medium text-gray-900">Orari della sede:</strong> {siteConfig.hoursShort}. {siteConfig.support.hoursNote}</p>
                    <Link href="/contatti" className="text-link">Contatta l’assistenza Mifro</Link>
                  </div>
                )}
                {block.id === "pagamenti" && <Link href="/news/guida-ade-collegamento-rt-pos" className="text-link mt-4">Leggi la guida al collegamento RT–POS</Link>}
              </div>
            </section>
          ))}
        </div>
      </Section>
      <Section id="settori" gray>
        <SectionHeader title={sectorsIntro.title} subtitle={sectorsIntro.description} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.sectors.map((sector) => (
            <Card
              key={sector.href}
              title={sector.title}
              description={sector.description}
              icon={sector.icon}
              href={sector.href}
              linkLabel="Vedi le soluzioni"
            />
          ))}
        </div>
      </Section>
      <ContactCta title="Di cosa hai bisogno?" description={siteConfig.support.requestNote} label="Contattaci" showPhone />
    </>
  );
}
