import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";
import PageIntro from "@/components/PageIntro";
import ContactCta from "@/components/ContactCta";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import type { Article } from "@/content/articles";

type Props = { params: Promise<{ slug: string }> };

function getNews(slug: string): Article | undefined {
  return siteConfig.news.find((n) => n.slug === slug);
}

export function generateStaticParams() {
  return siteConfig.news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) return {};

  return createPageMetadata({
    title: news.title,
    description: news.description,
    path: `/news/${news.slug}`,
    article: { published: news.date, revised: news.revisedAt ?? news.date },
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) notFound();

  return (
    <>
      <PageIntro title={news.title} eyebrow={`Guida operativa · Pubblicata il ${formatDate(news.date)}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
          {news.revisedAt && <p className="mb-6 text-sm text-gray-500">Revisione delle fonti: <time dateTime={news.revisedAt}>{formatDate(news.revisedAt)}</time></p>}
          <div className="whitespace-pre-line text-base leading-relaxed text-gray-600">
            {news.content}
          </div>

          {news.type !== "news" && (
            <a
              href={news.file}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary mt-8"
            >
              {news.type === "pdf" ? <Download aria-hidden="true" className="h-4 w-4" /> : <ExternalLink aria-hidden="true" className="h-4 w-4" />}
              {news.fileLabel}
            </a>
          )}
          {!!news.sources?.length && <aside aria-label="Fonti ufficiali" className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold">Fonti ufficiali</h2>
            <ul className="mt-3 space-y-2">
              {news.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-link">{source.title}<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /></a></li>)}
            </ul>
          </aside>}
          {!!news.relatedLinks?.length && <nav aria-label="Approfondimenti" className="mt-4 flex flex-col items-start gap-3">
            {news.relatedLinks.map((link) => <Link key={link.href} href={link.href} className="text-link">{link.label}</Link>)}
          </nav>}
        </div>
      </Section>

      {"faq" in news && news.faq && news.faq.length > 0 && (
        <Section gray>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <SectionHeader
                title="Domande e risposte"
                subtitle="Le risposte alle domande più frequenti su questo argomento."
              />
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <Accordion
                items={news.faq.map((f) => ({
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </ScrollReveal>
          </div>
        </Section>
      )}
      <ContactCta {...news.cta} />
    </>
  );
}
