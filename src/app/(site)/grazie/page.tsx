import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import { readReceipt, RECEIPT_COOKIE } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Grazie per la tua richiesta",
  robots: { index: false, follow: false },
  alternates: { canonical: "/grazie" },
};

export default async function GraziePage() {
  const jar = await cookies();
  if (!readReceipt(jar.get(RECEIPT_COOKIE)?.value, process.env.CONTACT_FORM_SECRET || "")) redirect("/contatti");
  return (
    <Section>
      <SectionHeader title="Grazie per averci contattato" subtitle="La tua richiesta è stata inviata. Ti risponderemo al più presto all’indirizzo email indicato." />
      <div className="text-center"><Link href="/" className="font-semibold text-brand-600 hover:underline">Torna alla home</Link></div>
    </Section>
  );
}
