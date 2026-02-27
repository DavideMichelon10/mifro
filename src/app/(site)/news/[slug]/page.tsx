import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";

type Props = { params: Promise<{ slug: string }> };

function getNews(slug: string) {
  return siteConfig.news.find((n) => n.slug === slug);
}

export function generateStaticParams() {
  return siteConfig.news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) return {};

  return {
    title: `${news.title} – Mifro S.a.s.`,
    description: news.description,
    alternates: { canonical: `/news/${news.slug}` },
    openGraph: {
      title: `${news.title} – Mifro S.a.s.`,
      description: news.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) notFound();

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alle news
          </Link>

          <p className="mb-2 text-sm text-gray-400">{formatDate(news.date)}</p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {news.title}
          </h1>

          <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-gray-600">
            {news.content}
          </div>

          {news.type === "pdf" && "file" in news && (
            <a
              href={news.file}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              <Download className="h-4 w-4" />
              Scarica PDF
            </a>
          )}

          {news.type === "link" && "file" in news && (
            <a
              href={news.file}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              <ExternalLink className="h-4 w-4" />
              Vai al link
            </a>
          )}
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
    </>
  );
}
