import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { articleCategories, type ArticleCategory } from "@/content/article-types";
import PageIntro from "@/components/PageIntro";
import ContactCta from "@/components/ContactCta";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { headingId } from "@/components/ArticleBody";

const title = "Guide su registratori di cassa, POS e scontrini";
const heading = "Cassa, POS e scontrini: cosa fare e come scegliere";
const description =
  "Guide pratiche per negozi, bar, ristoranti e ambulanti: cosa fare se la cassa non trasmette, quanto costa un registratore, noleggio o acquisto, obblighi e scadenze.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/news" });

const categoryOrder: ArticleCategory[] = ["problemi", "costi", "territorio", "basi", "normativa"];

function formatMonth(dateStr: string) {
  const month = new Date(dateStr).toLocaleDateString("it-IT", { month: "long", year: "numeric", timeZone: "Europe/Rome" });
  return `${month.startsWith("a") ? "ad" : "a"} ${month}`;
}

export default function NewsPage() {
  const groups = categoryOrder
    .map((category) => ({
      category,
      ...articleCategories[category],
      items: siteConfig.news.filter((article) => article.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Guide", path: "/news" }]} />
      <PageIntro
        eyebrow="Guide Mifro"
        title={heading}
        description="Risposte chiare alle domande più comuni su cassa, POS e scontrini. Scritte per chi lavora dietro al banco, con le fonti ufficiali in fondo a ogni guida."
      >
        <nav aria-label="Argomenti" className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a key={group.category} href={`#${headingId(group.label)}`} className="inline-flex min-h-11 items-center rounded-xl border border-brand-200 bg-white px-4 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100">
              {group.label}
            </a>
          ))}
        </nav>
      </PageIntro>

      <section className="py-12 sm:py-16">
        <div className="site-container">
          {groups.map((group) => (
            <section
              key={group.category}
              id={headingId(group.label)}
              className="grid gap-x-12 gap-y-6 border-t border-gray-200 py-10 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]"
            >
              <div>
                <h2 className="text-xl font-semibold leading-tight tracking-tight text-brand-900 sm:text-2xl">{group.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{group.description}</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {group.items.map((article) => (
                  <li key={article.slug} className="py-5 first:pt-0 last:pb-0">
                    <Link href={`/news/${article.slug}`} className="group flex items-start justify-between gap-6 rounded-sm">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-brand-700">{article.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">{article.description}</p>
                        <p className="mt-3 text-xs text-gray-500">Aggiornata <time dateTime={article.revisedAt ?? article.date}>{formatMonth(article.revisedAt ?? article.date)}</time></p>
                      </div>
                      <ArrowRight aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-brand-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <ContactCta title="Non trovi la risposta che cerchi?" description="Scrivici la tua domanda su cassa, POS o gestionale: indicaci il modello che utilizzi e il comune della tua attività." showPhone />
    </>
  );
}
