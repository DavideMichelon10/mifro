import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ExternalLink, Newspaper, ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: siteConfig.seo.news.title,
  description: siteConfig.seo.news.description,
  alternates: { canonical: "/news" },
  openGraph: {
    title: siteConfig.seo.news.title,
    description: siteConfig.seo.news.description,
  },
};

const typeConfig = {
  pdf: { label: "PDF", icon: FileText, color: "bg-red-100 text-red-700" },
  link: { label: "Link", icon: ExternalLink, color: "bg-blue-100 text-blue-700" },
  news: { label: "News", icon: Newspaper, color: "bg-green-100 text-green-700" },
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPage() {
  const news = [...siteConfig.news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Section>
      <SectionHeader
        title="News e aggiornamenti"
        subtitle="Novità, guide operative e aggiornamenti dal mondo dei registratori di cassa, POS e soluzioni IT."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item, i) => {
          const badge = typeConfig[item.type];
          const BadgeIcon = badge.icon;

          return (
            <ScrollReveal key={item.slug} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
              <Link
                href={`/news/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}
                    >
                      <BadgeIcon className="h-3 w-3" />
                      {badge.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 transition-colors group-hover:text-brand-700">
                    Leggi di più
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
