import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { allowAttempt, createReceipt, readReceipt, RECEIPT_COOKIE, RECEIPT_SECONDS, validateContact } from "@/lib/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return error("Richiesta non consentita.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return error("Formato non valido.", 415);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD?.replace(/\s/g, "");
  const secret = process.env.CONTACT_FORM_SECRET;
  const recipient = process.env.CONTACT_TO?.trim();
  if (!user || !password || !secret || secret.length < 32 || !recipient || !/^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(recipient)) {
    console.error("Contact form: incomplete or invalid server configuration");
    return error("Il modulo non è al momento disponibile. Contattaci via email o telefono.", 503);
  }

  const receipt = readReceipt(request.cookies.get(RECEIPT_COOKIE)?.value, secret);
  if (receipt && Date.now() - receipt.issued < 60000) return error("Hai appena inviato una richiesta. Attendi un minuto prima di inviarne un’altra.", 429);
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "unknown";
  const key = createHmac("sha256", secret).update(ip).digest("hex");
  if (!allowAttempt(key)) return error("Troppi tentativi. Riprova tra dieci minuti.", 429);

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Richiesta vuota.", 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 32768) { await reader.cancel(); return error("Messaggio troppo lungo.", 413); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return error("Richiesta non valida.", 400); }
  const form = validateContact(body);
  if (!form) return error("Controlla i campi del modulo e riprova.", 400);

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user, pass: password },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 15000,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "Sito Mifro", address: user },
      to: recipient,
      replyTo: { name: form.name, address: form.email },
      subject: `Nuova richiesta dal sito Mifro: ${form.subject}`,
      text: `Nuova richiesta dal modulo Contattaci\nSettore: ${form.context.sector}\nPosizione modulo: ${form.context.form_location}\n\nNome: ${form.name}\nEmail: ${form.email}\nOggetto: ${form.subject}\n\n${form.message}\n\nPresa in carico: il gestore del sito inoltra questa richiesta a Mifro, che risponde al visitatore. Usa Reply-To per rispondere all’indirizzo indicato.`,
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted.length) throw new Error("Recipient not accepted");
  } catch {
    // Never log message content or SMTP credentials.
    console.error("Contact form: SMTP delivery failed");
    return error("Non siamo riusciti a inviare la richiesta. Riprova più tardi o contattaci via email o telefono.", 502);
  } finally { transport.close(); }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(RECEIPT_COOKIE, createReceipt(secret), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: RECEIPT_SECONDS,
  });
  return response;
}
