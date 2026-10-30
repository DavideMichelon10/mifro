import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import PageIntro from "@/components/PageIntro";
import { readReceipt, RECEIPT_COOKIE } from "@/lib/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Grazie per la tua richiesta", description: "Il tuo messaggio è stato inviato. Ti ricontattiamo subito ai recapiti indicati.", path: "/grazie" }),
  robots: { index: false, follow: false },
};

export default async function GraziePage() {
  const jar = await cookies();
  if (!readReceipt(jar.get(RECEIPT_COOKIE)?.value, process.env.CONTACT_FORM_SECRET || "")) redirect("/contatti");
  return (
    <>
      <PageIntro title="Grazie per averci contattato" description="Il tuo messaggio è stato inviato. Ti ricontattiamo subito ai recapiti indicati." />
      <Section><Link href="/" className="button button-primary">Torna alla home</Link></Section>
    </>
  );
}
