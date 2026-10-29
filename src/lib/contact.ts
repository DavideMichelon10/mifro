import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { DEFAULT_CONTACT_SUBJECT, RENTAL_CONTACT_SUBJECT, SALES_CONTACT_SUBJECT, parseContactContext, requiresContactPhone } from "@/lib/contact-context";

export const RECEIPT_COOKIE = "mifro_contact_receipt";
export const RECEIPT_SECONDS = 600;

export function createReceipt(secret: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ id: randomUUID(), issued: now, expires: now + RECEIPT_SECONDS * 1000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}

export function readReceipt(token: string | undefined, secret: string, now = Date.now()): { id: string; issued: number; expires: number } | null {
  if (!token || !secret || token.length > 1024) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const signature = Buffer.from(parts[1], "base64url");
    const expected = createHmac("sha256", secret).update(parts[0]).digest();
    if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) return null;
    const data = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    if (typeof data.id !== "string" || !Number.isFinite(data.issued) || !Number.isFinite(data.expires) || data.issued > now || data.expires <= now) return null;
    return data;
  } catch { return null; }
}

export function validateContact(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const context = parseContactContext(data.context);
  if (!context) return null;
  const limits = { name: 120, email: 254, message: 5000 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof data[key] !== "string" || !data[key].trim() || data[key].length > max) return null;
  }
  if (typeof data.website !== "string" || data.website !== "") return null;
  const isRental = context.form_location === "rental_page";
  if (isRental && (typeof data.municipality !== "string" || !data.municipality.trim() || data.municipality.length > 120 || /[\r\n\x00]/.test(data.municipality))) return null;
  const municipality = isRental ? (data.municipality as string).trim() : "";
  if (data.phone !== undefined && (typeof data.phone !== "string" || data.phone.length > 40 || /[\r\n\x00]/.test(data.phone))) return null;
  const phone = (data.phone as string | undefined)?.trim() || "";
  if (requiresContactPhone(context) && !phone) return null;
  if (phone && (!/^\+?[0-9 ()./-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, "")))) return null;
  if (data.subject !== undefined && (typeof data.subject !== "string" || data.subject.length > 200)) return null;
  if (context.sector !== "generico" && (typeof data.subject !== "string" || !data.subject.trim())) return null;
  if (/[\r\n\x00]/.test(String(data.name) + String(data.email) + String(data.subject))) return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const subject = isRental ? RENTAL_CONTACT_SUBJECT
    : context.form_location === "sales_page" ? SALES_CONTACT_SUBJECT
    : (data.subject as string | undefined)?.trim() || DEFAULT_CONTACT_SUBJECT;
  const message = (data.message as string).trim();
  if (/[\r\n\x00]/.test(name + email + subject) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) return null;
  return { name, email, phone, municipality, subject, message, context };
}

// Best-effort per-instance limit. Distributed enforcement belongs in Vercel Firewall.
const attempts = new Map<string, { count: number; expires: number }>();
export function allowAttempt(key: string, now = Date.now()) {
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const existing = attempts.get(key);
  if (existing) return ++existing.count <= 5;
  if (attempts.size >= 10000) return false;
  attempts.set(key, { count: 1, expires: now + 600000 });
  return true;
}
