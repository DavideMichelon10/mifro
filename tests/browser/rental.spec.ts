import { test, expect, type Page } from "@playwright/test";
import { createReceipt, RECEIPT_COOKIE } from "../../src/lib/contact";
import { ADS_CONSENT_KEY, CONSENT_KEY } from "../../src/lib/analytics";
import { RENTAL_PATH, rentalContactContext } from "../../src/lib/contact-context";

const secret = "browser-test-only-secret-at-least-32-characters";
const query = "?utm_source=google&utm_medium=cpc&utm_campaign=noleggio&gclid=local-test&gbraid=local-braid&wbraid=local-web-braid";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL!).origin) return route.continue();
    return route.fulfill({ contentType: "application/javascript", body: url.hostname === "app.chatwoot.com" ? "window.chatwootSDK = { run() {} };" : "" });
  });
});

async function events(page: Page, name: string) {
  return page.evaluate((name) => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((entry) => entry[0] === "event" && entry[1] === name), name);
}

async function fillRental(page: Page) {
  await page.getByLabel("Nome e attività", { exact: true }).fill("Persona Test, Negozio Test");
  await page.getByLabel("Comune dell’attività").fill("Pergine Valsugana");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Cellulare", { exact: true }).fill("+39 333 123 4567");
  await page.getByLabel("Esigenza e periodo di utilizzo").fill("Una cassa da dicembre per sei mesi.");
}

for (const consent of ["accepted", "rejected"]) {
  test(`noleggio, consenso ${consent}: solo modulo, attribuzione e un solo lead dopo successo`, async ({ page }) => {
    const bodies: Record<string, unknown>[] = [];
    let shouldFail = true;
    await page.route("**/api/contact", async (route) => {
      bodies.push(route.request().postDataJSON());
      if (shouldFail) return route.fulfill({ status: 502, json: { error: "Invio non riuscito. Riprova." } });
      return route.fulfill({ json: { ok: true }, headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt(secret)}; Path=/; HttpOnly; SameSite=Strict` } });
    });
    await page.goto(`${RENTAL_PATH}${query}`);
    // Anchors keep the ad parameters even before the visitor has chosen consent.
    await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
    expect(new URL(page.url()).search).toBe(query);
    await expect(page).toHaveURL(/#richiedi-proposta$/);
    await page.getByRole("button", { name: consent === "accepted" ? "Accetta statistiche e misurazione Ads" : "Rifiuta", exact: true }).click();
    await page.getByRole("link", { name: "Richiedi un preventivo di noleggio", exact: true }).click();
    expect(new URL(page.url()).search).toBe(query);
    await expect(page.locator('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"], a[href*="whatsapp.com"]')).toHaveCount(0);
    await page.locator("footer").getByRole("link", { name: "Contatti", exact: true }).click();
    expect(new URL(page.url()).search).toBe(query);
    expect(await events(page, "contact_click")).toHaveLength(0);
    expect(await events(page, "generate_lead")).toHaveLength(0);
    await fillRental(page);
    expect(await page.locator("input[required], textarea[required]").count()).toBe(5);
    await page.getByRole("button", { name: "Richiedi la proposta di noleggio" }).click();
    await expect(page.locator("form").getByRole("alert")).toBeFocused();
    await expect(page.getByLabel("Comune dell’attività")).toHaveValue("Pergine Valsugana");
    expect(await events(page, "generate_lead")).toHaveLength(0);
    shouldFail = false;
    await page.locator("form").evaluate((form: HTMLFormElement) => { form.requestSubmit(); form.requestSubmit(); });
    await expect(page).toHaveURL(/grazie$/);
    expect(bodies).toHaveLength(2);
    expect(bodies[1]).toMatchObject({ name: "Persona Test, Negozio Test", municipality: "Pergine Valsugana", email: "test@example.com", phone: "+39 333 123 4567", subject: "Noleggio registratore di cassa", message: "Una cassa da dicembre per sei mesi.", context: rentalContactContext });
    const leads = await events(page, "generate_lead");
    expect(leads).toHaveLength(consent === "accepted" ? 1 : 0);
    if (consent === "accepted") expect(leads[0][2]).toEqual({ form_id: "contact", ...rentalContactContext, transport_type: "beacon" });
    expect(JSON.stringify(leads)).not.toMatch(/Persona Test|Pergine|test@example|333|dicembre|local-test/);
    await page.reload();
    await expect(page.getByRole("heading", { name: "Grazie per averci contattato" })).toBeVisible();
    expect(await events(page, "generate_lead")).toHaveLength(0);
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`noleggio: anteprima a ${width}px, CTA e FAQ accessibili`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 768 ? 640 : 900 });
    await page.addInitScript(({ analytics, ads }) => {
      localStorage.setItem(analytics, "rejected");
      localStorage.setItem(ads, "rejected");
    }, { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY });
    const response = await page.goto(RENTAL_PATH);
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Registratori di cassa a noleggio da 29 € al mese");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.mifro.it${RENTAL_PATH}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await expect(page.locator(`header a[href="${RENTAL_PATH}"]`)).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Bastano poche informazioni per iniziare");
    await expect(page.locator("body")).not.toContainText("Riceverai una proposta con modello, durata, canone e servizi specificati.");
    await expect(page.locator("body")).not.toContainText("Il gestore del sito inoltra la richiesta");
    await expect(page.locator("body")).not.toContainText("0461 512777", { useInnerText: true });
    const formBox = await page.locator("#richiedi-proposta").boundingBox();
    expect(Math.abs(formBox!.x + formBox!.width / 2 - width / 2)).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const primaryCta = page.getByRole("link", { name: "Richiedi un preventivo di noleggio", exact: true });
    await expect(primaryCta).toBeInViewport({ ratio: 1 });
    await page.locator("main img").last().scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("main img").evaluateAll((images) => images.every((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`noleggio-prima-schermata-${width}.png`) });
    await page.screenshot({ path: testInfo.outputPath(`noleggio-${width}.png`), fullPage: true });
    const faq = page.locator("summary").first();
    await faq.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    if (width < 1024) await page.getByRole("button", { name: "Apri menu di navigazione" }).click();
    await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });
}

test("noleggio: chat e contatti diretti nascosti solo sulla landing, anche dopo navigazione", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), CONSENT_KEY);
  await page.goto(RENTAL_PATH);
  await page.evaluate(() => {
    for (const className of ["woot-widget-bubble", "woot-widget-holder"]) {
      const widget = document.createElement("div");
      widget.className = className;
      widget.style.cssText = "position:fixed;bottom:0;right:0;width:40px;height:40px";
      document.body.appendChild(widget);
    }
  });
  for (const selector of [".woot-widget-bubble", ".woot-widget-holder"]) await expect(page.locator(selector)).toBeHidden();
  await page.locator("footer").getByRole("link", { name: "Chi siamo", exact: true }).click();
  await expect(page).toHaveURL(/chi-siamo$/);
  await expect(page.locator('footer a[href^="tel:"]')).toBeVisible();
  await expect(page.locator('footer a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('footer a[href*="wa.me"]')).toBeVisible();
  for (const selector of [".woot-widget-bubble", ".woot-widget-holder"]) await expect(page.locator(selector)).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${RENTAL_PATH}$`));
  await expect(page.locator('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]')).toHaveCount(0);
  for (const selector of [".woot-widget-bubble", ".woot-widget-holder"]) await expect(page.locator(selector)).toBeHidden();
});
