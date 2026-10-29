import { test, expect, type Page } from "@playwright/test";
import { createReceipt, RECEIPT_COOKIE } from "../../src/lib/contact";
import { ADS_CONSENT_KEY, CONSENT_KEY } from "../../src/lib/analytics";

const path = "/soluzioni/parrucchieri-saloni";
const secret = "browser-test-only-secret-at-least-32-characters";
const subject = "Beauty: pagina web, prenotazioni e agenda per il salone";
const context = { sector: "parrucchieri-saloni", form_location: "sector_page" };

// All form submissions and external services are intercepted: no email or Google collection.
test.beforeEach(async ({ page, baseURL }) => {
  expect(new URL(baseURL!).hostname).toMatch(/^(localhost|127\.0\.0\.1)$/);
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL!).origin) return route.continue();
    return route.fulfill({ contentType: "application/javascript", body: url.hostname === "app.chatwoot.com" ? "window.chatwootSDK = { run() {} };" : "" });
  });
});

async function events(page: Page, name: string) {
  return page.evaluate((name) => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((entry) => entry[0] === "event" && entry[1] === name), name);
}

for (const width of [320, 390, 768, 1440]) {
  test(`Beauty: offerta, immagini sicure e navigazione a ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 768 ? 640 : 900 });
    await page.addInitScript(({ analytics, ads }) => {
      localStorage.setItem(analytics, "rejected");
      localStorage.setItem(ads, "rejected");
    }, { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY });
    const response = await page.goto(path);
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Pagina web e agenda online per il tuo salone");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.mifro.it${path}`);
    const primaryCta = page.locator(".page-intro").getByRole("link", { name: "Richiedi una proposta per il tuo salone", exact: true });
    await expect(primaryCta).toBeInViewport({ ratio: 1 });
    await expect(page.locator("#software-gestionale img")).toHaveCount(1);
    await expect(page.locator("#software-gestionale img")).toHaveAttribute("alt", /Schermata dimostrativa/);
    await expect(page.locator('img[src*="beauty-gestionale-listini"]')).toHaveCount(0);
    await expect(page.locator("#soluzioni-rch h3")).toHaveText(["WALLE 8T", "POS per pagamenti"]);
    expect(await page.evaluate(() => {
      const ids = ["come-funziona", "agenda-team", "software-gestionale", "supporto-mifro", "soluzioni-rch", "richiedi-proposta"];
      return ids.slice(1).every((id, index) => Boolean(document.getElementById(ids[index])!.compareDocumentPosition(document.getElementById(id)!) & Node.DOCUMENT_POSITION_FOLLOWING));
    })).toBe(true);
    for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("main img").evaluateAll((images) => images.every((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`beauty-prima-schermata-${width}.png`) });
    await page.screenshot({ path: testInfo.outputPath(`beauty-${width}.png`), fullPage: true });
    await primaryCta.click();
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    const faq = page.locator("summary").first();
    await faq.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    if (width < 1024) await page.getByRole("button", { name: "Apri menu di navigazione" }).click();
    await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
    await expect(page).toHaveURL(/parrucchieri-saloni#richiedi-proposta$/);
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(page.locator("form").getByRole("link", { name: "Leggi l’informativa privacy" })).toHaveAttribute("href", "/privacy");
  });
}

for (const consent of ["accepted", "rejected"]) {
  test(`Beauty: modulo breve, validazione e conversione dopo successo con consenso ${consent}`, async ({ page }) => {
    const bodies: Record<string, unknown>[] = [];
    let shouldFail = true;
    await page.addInitScript(({ analytics, ads, consent }) => {
      localStorage.setItem(analytics, consent);
      localStorage.setItem(ads, "rejected");
    }, { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY, consent });
    await page.route("**/api/contact", async (route) => {
      bodies.push(route.request().postDataJSON());
      if (shouldFail) return route.fulfill({ status: 502, json: { error: "Invio simulato non riuscito." } });
      return route.fulfill({ json: { ok: true }, headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt(secret)}; Path=/; HttpOnly; SameSite=Strict` } });
    });
    const query = "?utm_source=google&utm_medium=cpc&gclid=beauty-local-test";
    await page.goto(`${path}${query}`);
    await page.locator(".page-intro").getByRole("link", { name: "Richiedi una proposta per il tuo salone" }).click();
    expect(new URL(page.url()).search).toBe(query);
    expect(await events(page, "generate_lead")).toHaveLength(0);
    expect(bodies).toHaveLength(0);
    await page.getByRole("button", { name: "Invia la richiesta", exact: true }).click();
    expect(await page.locator("#cf-name").evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
    expect(bodies).toHaveLength(0);
    await page.locator("#cf-name").fill("Persona Test");
    await page.locator("#cf-email").fill("email-non-valida");
    await page.locator("#cf-message").fill("Salone di prova con due operatori, nessun invio reale.");
    await page.getByRole("button", { name: "Invia la richiesta", exact: true }).click();
    expect(await page.locator("#cf-email").evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true);
    expect(bodies).toHaveLength(0);
    await page.locator("#cf-email").fill("test@example.com");
    expect(await page.locator("input[required], textarea[required]").count()).toBe(3);
    await expect(page.locator("#cf-phone")).not.toHaveAttribute("required", "");
    await expect(page.locator("#cf-subject")).toHaveValue(subject);
    await page.getByRole("button", { name: "Invia la richiesta", exact: true }).click();
    await expect(page.locator("form").getByRole("alert")).toBeFocused();
    await expect(page.locator("#cf-message")).toHaveValue("Salone di prova con due operatori, nessun invio reale.");
    expect(await events(page, "generate_lead")).toHaveLength(0);
    shouldFail = false;
    await page.locator("form").evaluate((form: HTMLFormElement) => { form.requestSubmit(); form.requestSubmit(); });
    await expect(page).toHaveURL(/grazie$/);
    expect(bodies).toHaveLength(2);
    expect(bodies[1]).toMatchObject({ phone: "", subject, context });
    const leads = await events(page, "generate_lead");
    expect(leads).toHaveLength(consent === "accepted" ? 1 : 0);
    if (consent === "accepted") expect(leads[0][2]).toEqual({ form_id: "contact", ...context, transport_type: "beacon" });
    expect(JSON.stringify(leads)).not.toMatch(/Persona Test|test@example|operatori|beauty-local-test/);
    await page.reload();
    await expect(page.getByRole("heading", { name: "Grazie per averci contattato" })).toBeVisible();
    expect(await events(page, "generate_lead")).toHaveLength(0);
  });
}
