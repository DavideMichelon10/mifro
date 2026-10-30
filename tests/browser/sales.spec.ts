import { test, expect, type Page } from "@playwright/test";
import { createReceipt, RECEIPT_COOKIE } from "../../src/lib/contact";
import { ADS_CONSENT_KEY, CONSENT_KEY } from "../../src/lib/analytics";
import { SALES_PATH, SALES_CONTACT_SUBJECT, salesContactContext } from "../../src/lib/contact-context";

const secret = "browser-test-only-secret-at-least-32-characters";
const query = "?utm_source=google&utm_medium=cpc&utm_campaign=vendita&gclid=local-test&gbraid=local-braid&wbraid=local-web-braid";

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

for (const consent of ["accepted", "rejected"]) {
  test(`vendita, consenso ${consent}: validazione, richiesta distinta e una conversione dopo successo`, async ({ page }) => {
    const bodies: Record<string, unknown>[] = [];
    let shouldFail = true;
    await page.route("**/api/contact", async (route) => {
      bodies.push(route.request().postDataJSON());
      if (shouldFail) return route.fulfill({ status: 502, json: { error: "Invio non riuscito. Riprova." } });
      return route.fulfill({ json: { ok: true }, headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt(secret)}; Path=/; HttpOnly; SameSite=Strict` } });
    });
    await page.goto(`${SALES_PATH}${query}`);
    await page.getByRole("button", { name: consent === "accepted" ? "Accetta statistiche e misurazione Ads" : "Rifiuta", exact: true }).click();
    await page.locator("main").getByRole("link", { name: "Richiedi un preventivo", exact: true }).first().click();
    await expect(page).toHaveURL(/#richiedi-proposta$/);
    expect(new URL(page.url()).search).toBe(query);
    expect(await events(page, "generate_lead")).toHaveLength(0);
    const submit = page.locator('form button[type="submit"]');
    await submit.click();
    expect(bodies).toHaveLength(0);
    await expect(page.getByLabel("Nome e cognome", { exact: true })).toBeFocused();
    await page.getByLabel("Nome e cognome", { exact: true }).fill("Persona Test");
    await page.getByLabel("Email", { exact: true }).fill("email-non-valida");
    await page.getByLabel("Messaggio", { exact: true }).fill("Sostituzione della cassa del negozio a Pergine.");
    await submit.click();
    expect(bodies).toHaveLength(0);
    await expect(page.getByLabel("Email", { exact: true })).toBeFocused();
    await page.getByLabel("Email", { exact: true }).fill("test@example.com");
    await page.locator("#cf-privacy").check();
    expect(await page.locator("input[required], textarea[required]").count()).toBe(4);
    await expect(page.getByLabel("Numero di telefono", { exact: true })).not.toHaveAttribute("required", "");
    await submit.click();
    await expect(page.locator("form").getByRole("alert")).toBeFocused();
    await expect(page.getByLabel("Messaggio", { exact: true })).toHaveValue("Sostituzione della cassa del negozio a Pergine.");
    expect(await events(page, "generate_lead")).toHaveLength(0);
    shouldFail = false;
    await page.locator("form").evaluate((form: HTMLFormElement) => { form.requestSubmit(); form.requestSubmit(); });
    await expect(page).toHaveURL(/grazie$/);
    expect(bodies).toHaveLength(2);
    expect(bodies[1]).toMatchObject({ name: "Persona Test", email: "test@example.com", phone: "", subject: SALES_CONTACT_SUBJECT, context: salesContactContext });
    const leads = await events(page, "generate_lead");
    expect(leads).toHaveLength(consent === "accepted" ? 1 : 0);
    if (consent === "accepted") expect(leads[0][2]).toEqual({ form_id: "contact", ...salesContactContext, transport_type: "beacon" });
    expect(JSON.stringify(leads)).not.toMatch(/Persona Test|Pergine|test@example|local-test/);
    await page.reload();
    await expect(page.getByRole("heading", { name: "Grazie per averci contattato" })).toBeVisible();
    expect(await events(page, "generate_lead")).toHaveLength(0);
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`vendita: desktop/mobile a ${width}px, modelli, collegamenti e FAQ`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 768 ? 740 : 960 });
    await page.addInitScript(({ analytics, ads }) => {
      localStorage.setItem(analytics, "rejected");
      localStorage.setItem(ads, "rejected");
    }, { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY });
    const response = await page.goto(`${SALES_PATH}${query}`);
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Registratori di cassa per la tua attività");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.mifro.it${SALES_PATH}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await expect(page.locator(`header a[href="${SALES_PATH}"]`)).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("29 €");
    const cta = page.locator("main").getByRole("link", { name: "Richiedi un preventivo", exact: true }).first();
    await expect(cta).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`vendita-prima-schermata-${width}.png`) });
    await page.getByRole("link", { name: "Scopri alcuni modelli" }).click();
    await expect(page.locator("#modelli")).toBeInViewport();
    await expect(page.locator("#modelli h3")).toHaveText(["WALLE MEC RT", "WALLE 8T", "APE J RT"]);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    }
    for (const link of await page.locator('main a[href^="#"]').all()) {
      const target = await link.getAttribute("href");
      await expect(page.locator(target!)).toHaveCount(1);
    }
    const faq = page.locator("summary").first();
    await faq.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    await expect(page.locator('form a[href="/privacy"]')).toBeVisible();
    if (width < 1024) await page.getByRole("button", { name: "Apri menu di navigazione" }).click();
    await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    expect(new URL(page.url()).search).toBe(query);
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(page.locator('a[href^="tel:"], a[href^="mailto:"]')).toHaveCount(0);
    expect(await events(page, "generate_lead")).toHaveLength(0);
    await page.screenshot({ path: testInfo.outputPath(`vendita-${width}.png`), fullPage: true });
  });
}
