import type { ReactNode } from "react";
import Link from "next/link";
import type { ArticleBlock } from "@/content/article-types";

export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Rimuove i formati in linea: serve per i dati strutturati e gli indici. */
export function plainText(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

const inlinePattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = "font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700";

function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={index} className="font-semibold text-gray-900">{match[1]}</strong>);
    } else if (match[3].startsWith("/")) {
      nodes.push(<Link key={index} href={match[3]} className={linkClass}>{match[2]}</Link>);
    } else {
      nodes.push(<a key={index} href={match[3]} target="_blank" rel="noopener noreferrer" className={linkClass}>{match[2]}</a>);
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="text-base leading-relaxed text-gray-700">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i} id={headingId(block.text)} className="mt-12 scroll-mt-28 text-2xl font-semibold leading-tight tracking-tight text-brand-900 first:mt-0">{block.text}</h2>;
          case "h3":
            return <h3 key={i} className="mt-8 text-lg font-semibold text-gray-900">{block.text}</h3>;
          case "p":
            return <p key={i} className="mt-4"><Inline text={block.text} /></p>;
          case "ul":
            return <ul key={i} className="mt-4 list-disc space-y-2 pl-5 marker:text-brand-400">{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ul>;
          case "ol":
            return <ol key={i} className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-brand-600">{block.items.map((item, j) => <li key={j} className="pl-1"><Inline text={item} /></li>)}</ol>;
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                  {block.caption && <caption className="border-b border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-900">{block.caption}</caption>}
                  <thead className="bg-brand-50 text-brand-900">
                    <tr>{block.head.map((cell, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold">{cell}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => k === 0
                          ? <th key={k} scope="row" className="px-4 py-3 align-top font-semibold text-gray-900"><Inline text={cell} /></th>
                          : <td key={k} className="px-4 py-3 align-top"><Inline text={cell} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <aside key={i} className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4 text-gray-700">
                {block.title && <p className="font-semibold text-brand-900">{block.title}</p>}
                <p className={block.title ? "mt-1" : undefined}><Inline text={block.text} /></p>
              </aside>
            );
        }
      })}
    </div>
  );
}
