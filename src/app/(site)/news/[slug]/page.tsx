import type { Metadata } from "next";
import { ChevronRight, Download, ExternalLink } from "lucide-react";
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
import { articleCategories } from "@/content/article-types";
import ArticleBody, { headingId } from "@/components/ArticleBody";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

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

function formatMonth(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) notFound();

  const path = `/news/${news.slug}`;
  const category = articleCategories[news.category];
  const revised = news.revisedAt ?? news.date;
  const toc = (news.body ?? []).flatMap((block) => (block.type === "h2" ? [block.text] : []));
  const related = siteConfig.news
    .filter((other) => other.slug !== news.slug)
    .sort((a, b) => Number(b.category === news.category) - Number(a.category === news.category))
    .slice(0, 3);

  return (
    <>
      <ArticleJsonLd path={path} title={news.title} description={news.description} published={news.date} revised={revised} section={category.label} faq={news.faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Guide", path: "/news" }, { name: news.title, path }]} />
      <PageIntro title={news.title} eyebrow={`${category.label} · ${formatMonth(news.date)}`}>
        <nav aria-label="Percorso" className="mt-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
            <li className="flex items-center gap-1"><ChevronRight aria-hidden="true" className="h-4 w-4 text-gray-400" /><Link href="/news" className="hover:text-brand-700 hover:underline">Guide</Link></li>
          </ol>
        </nav>
      </PageIntro>
      <Section>
        <article className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-gray-500">A cura di Mifro S.a.s. · Ultima verifica delle fonti: <time dateTime={revised}>{formatMonth(revised)}</time></p>
          {news.answer && (
            <div className="mb-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <p className="text-sm font-medium text-brand-700">In breve</p>
              <p className="mt-2 text-base leading-relaxed text-brand-900 sm:text-lg">{news.answer}</p>
            </div>
          )}
          {toc.length > 2 && (
            <nav aria-label="In questa guida" className="mb-10 border-l-2 border-brand-200 pl-5">
              <p className="text-sm font-semibold text-gray-900">In questa guida</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {toc.map((text) => <li key={text}><a href={`#${headingId(text)}`} className="text-brand-600 underline-offset-4 hover:text-brand-700 hover:underline">{text}</a></li>)}
              </ul>
            </nav>
          )}
          {news.body && <ArticleBody blocks={news.body} />}
          {news.content && <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">{news.content}</div>}

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
        </article>
      </Section>

      {news.faq && news.faq.length > 0 && (
        <Section gray>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <SectionHeader
                title="Domande e risposte"
                subtitle="Le risposte alle domande più frequenti su questo argomento"
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
      {related.length > 0 && (
        <Section gray={!news.faq?.length}>
          <div className="mx-auto max-w-3xl">
            <h2 className="section-title">Altre guide utili</h2>
            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/news/${other.slug}`} className="group block py-4">
                    <span className="font-semibold text-gray-900 group-hover:text-brand-700">{other.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-600">{other.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/news" className="text-link mt-4">Tutte le guide</Link>
          </div>
        </Section>
      )}
      <ContactCta {...news.cta} />
    </>
  );
}
