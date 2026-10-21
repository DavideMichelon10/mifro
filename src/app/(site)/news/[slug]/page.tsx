import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";
import PageIntro from "@/components/PageIntro";

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
    title: news.title,
    description: news.description,
    alternates: { canonical: `/news/${news.slug}` },
    openGraph: {
      title: `${news.title} | Mifro`,
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
      <PageIntro title={news.title} eyebrow={`Guida operativa · ${formatDate(news.date)}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="whitespace-pre-line text-base leading-relaxed text-gray-600">
            {news.content}
          </div>

          {news.type === "pdf" && "file" in news && (
            <a
              href={news.file}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary mt-8"
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
              className="button button-primary mt-8"
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
