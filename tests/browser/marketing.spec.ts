import { test, expect, type Page } from "@playwright/test";
import { createReceipt, RECEIPT_COOKIE } from "../../src/lib/contact";
import { articles } from "../../src/content/articles";

const secret = "browser-test-only-secret-at-least-32-characters";
const choiceKey = "mifro-analytics-consent";
const adsChoiceKey = "mifro-ads-measurement-consent";
const sectors = ["ristoranti", "parrucchieri-saloni", "ambulanti", "altre-attivita"];

// No SMTP or third-party data collection: requests are simulated in the browser.
test.beforeEach(async ({ page, baseURL }) => {
  await page.addInitScript((key) => { if (!localStorage.getItem(key)) localStorage.setItem(key, "rejected"); }, adsChoiceKey);
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL!).origin) return route.continue();
    if (url.hostname === "app.chatwoot.com" && url.pathname === "/packs/js/sdk.js") {
      return route.fulfill({ contentType: "application/javascript", body: "window.chatwootSDK = { run() {} };" });
    }
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
});

async function events(page: Page, name: string) {
  return page.evaluate((name) => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((entry) => entry[0] === "event" && entry[1] === name), name);
}

async function fillContact(page: Page) {
  await page.getByLabel("Nome e cognome").fill("Persona Test");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  const phone = page.getByLabel("Numero di telefono", { exact: true });
  if (await phone.count()) await phone.fill("+39 333 123 4567");
  await page.getByLabel("Messaggio", { exact: true }).fill("Richiesta di prova, nessun invio reale.");
}

test("consenso: prima visita, rifiuto, accettazione, navigazione, revoca e nuova accettazione", async ({ page, context }) => {
  let loads = 0;
  page.on("request", (request) => { if (request.url().includes("googletagmanager.com/gtag/js")) loads++; });
  await page.goto("/contatti");
  await expect(page.getByRole("dialog", { name: "Preferenze cookie" })).toBeVisible();
  expect(loads).toBe(0);
  await page.getByRole("button", { name: "Rifiuta" }).click();
  await page.reload();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(loads).toBe(0);
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Solo statistiche" }).click();
  await expect.poll(() => loads).toBe(1);
  const consent = await page.evaluate(() => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)).filter((entry) => entry[0] === "consent"));
  expect(consent[0]).toEqual(["consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
  expect(consent.at(-1)).toEqual(["consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }]);
  await page.locator("footer").getByRole("link", { name: "Chi siamo", exact: true }).click();
  await expect(page).toHaveURL(/chi-siamo$/);
  expect(loads).toBe(1);
  await page.evaluate(() => { document.cookie = "_ga=test;path=/"; document.cookie = "_ga_TEST=test;path=/"; });
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Rifiuta" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("mifro-analytics-consent"))).toBe("rejected");
  await expect(page.locator("#mifro-google-measurement")).toHaveCount(0);
  expect((await context.cookies()).some((cookie) => cookie.name.startsWith("_ga"))).toBe(false);
  expect(loads).toBe(1);
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Solo statistiche" }).click();
  await expect.poll(() => loads).toBe(2);
});

for (const sector of [...sectors, "generico"]) {
  for (const consent of ["accepted", "rejected"]) {
    test(`invio ${sector}, consenso ${consent}: contesto e nessun lead duplicato`, async ({ page }) => {
      await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), { key: choiceKey, value: consent });
      const bodies: Record<string, unknown>[] = [];
      await page.route("**/api/contact", async (route) => {
        bodies.push(route.request().postDataJSON());
        await route.fulfill({ json: { ok: true }, headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt(secret)}; Path=/; HttpOnly; SameSite=Strict` } });
      });
      await page.goto(sector === "generico" ? "/contatti" : `/soluzioni/${sector}`);
      if (sector !== "generico") {
        await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/soluzioni/${sector}#richiedi-proposta$`));
        await expect(page.locator("#richiedi-proposta")).toBeInViewport();
      }
      await fillContact(page);
      expect(await page.locator("input[required], textarea[required]").count()).toBe((sector === "generico" || sector === "parrucchieri-saloni") ? 3 : 4);
      // Two submit events in the same tick exercise the ref guard, independently of button disabling.
      await page.locator("form").evaluate((form: HTMLFormElement) => { form.requestSubmit(); form.requestSubmit(); });
      await expect(page).toHaveURL(/grazie$/);
      await expect(page.getByRole("heading", { name: "Grazie per averci contattato" })).toBeVisible();
      expect(bodies).toHaveLength(1);
      const expectedContext = { sector, form_location: sector === "generico" ? "contact_page" : "sector_page" };
      expect(bodies[0].context).toEqual(expectedContext);
      if (sector !== "generico") expect(bodies[0].phone).toBe("+39 333 123 4567");
      const leads = await events(page, "generate_lead");
      expect(leads).toHaveLength(consent === "accepted" ? 1 : 0);
      if (consent === "accepted") expect(leads[0][2]).toEqual({ form_id: "contact", ...expectedContext, transport_type: "beacon" });
      await page.reload();
      await expect(page.getByRole("heading", { name: "Grazie per averci contattato" })).toBeVisible();
      expect(await events(page, "generate_lead")).toHaveLength(0);
      expect(bodies).toHaveLength(1);
    });
  }
}

test("errore: dati preservati, focus sull’errore, nessuna conversione e possibilità di riprovare", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "accepted"), choiceKey);
  let attempts = 0;
  await page.route("**/api/contact", async (route) => {
    attempts++;
    return route.fulfill({ status: 502, json: { error: "Invio di prova non riuscito." } });
  });
  await page.goto("/soluzioni/ristoranti");
  await fillContact(page);
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("form").getByRole("alert")).toBeFocused();
  await expect(page.getByLabel("Email", { exact: true })).toHaveValue("test@example.com");
  await expect(page.getByLabel("Numero di telefono", { exact: true })).toHaveValue("+39 333 123 4567");
  expect(await events(page, "generate_lead")).toHaveLength(0);
  await page.locator('form button[type="submit"]').click();
  await expect.poll(() => attempts).toBe(2);
  await expect(page.getByRole("button", { name: "Richiedi un ricontatto" })).toBeEnabled();
});

test("categorie: quattro settori raggiungibili da home e menu", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/");
    const categories = page.locator("#settori");
    await expect(categories.getByRole("heading", { level: 3 })).toHaveText([
      "Ristorazione", "Beauty e benessere", "Ambulanti e mercati", "Altre attività",
    ]);
    await expect(categories.getByRole("link", { name: "Bar e caffetterie" })).toHaveCount(0);
    await expect(categories.getByRole("link", { name: /Ristorazione.*Vedi le soluzioni/ })).toHaveAttribute("href", "/soluzioni/ristoranti");
    if (width < 1024) await page.getByRole("button", { name: "Apri menu di navigazione" }).click();
    await page.getByRole("button", { name: "Per la tua attività", exact: true }).click();
    const menu = page.locator(width < 1024 ? "#mobile-solutions" : "#desktop-solutions");
    await expect(menu.getByRole("link", { name: "Ristorazione", exact: true })).toHaveAttribute("href", "/soluzioni/ristoranti");
    await expect(menu.getByRole("link", { name: "Beauty e benessere" })).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(4);
    await expect(menu.getByRole("link", { name: "Altre attività", exact: true })).toHaveAttribute("href", "/soluzioni/altre-attivita");
    await menu.getByRole("link", { name: "Ambulanti e mercati", exact: true }).click();
    await expect(page).toHaveURL(/soluzioni\/ambulanti$/);
  }
});

test("navigazione tra settori: modulo azzerato e oggetto aggiornato", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), choiceKey);
  await page.goto("/soluzioni/parrucchieri-saloni");
  await fillContact(page);
  await page.getByRole("button", { name: "Per la tua attività", exact: true }).click();
  await page.getByRole("link", { name: "Ristorazione", exact: true }).first().click();
  await expect(page).toHaveURL(/soluzioni\/ristoranti$/);
  await expect(page.getByLabel("Nome e cognome")).toHaveValue("");
  await expect(page.getByLabel("Numero di telefono", { exact: true })).toHaveValue("");
  await expect(page.locator('input[name="subject"]')).toHaveValue("Soluzioni di cassa per il mio locale");
});

test("route, redirect, sitemap e metadati specifici", async ({ page, request }) => {
  for (const path of ["/", "/contatti", "/chi-siamo", "/prodotti-assistenza", ...articles.map((article) => `/news/${article.slug}`), ...sectors.map((s) => `/soluzioni/${s}`)]) {
    const response = await page.goto(path);
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect((await page.title()).match(/\| Mifro/g)).toHaveLength(1);
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(new URL(path, "https://www.mifro.it").href);
    expect(new URL((await page.locator('meta[property="og:url"]').getAttribute("content"))!).href).toBe(new URL(path, "https://www.mifro.it").href);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toBe(`https://www.mifro.it/images/og/${path === "/soluzioni/ristoranti" ? "ristoranti" : "generale"}`);
  }
  for (const [path, destination] of [["/soluzioni", "/#settori"], ["/news", "/news/guida-ade-collegamento-rt-pos"]]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
  expect((await request.get("/soluzioni/inesistente")).status()).toBe(404);
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<lastmod>/g)).toHaveLength(articles.length);
  for (const article of articles) {
    expect(xml).toContain(`<loc>https://www.mifro.it/news/${article.slug}</loc>\n<lastmod>${new Date(article.revisedAt ?? article.date).toISOString()}</lastmod>`);
  }
  expect(xml).not.toMatch(/<loc>[^<]*(?:\/grazie|\/privacy|\/news|\/soluzioni)<\/loc>/);
  await page.goto("/grazie");
  await expect(page).toHaveURL(/contatti$/);
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout a ${width}px, FAQ da tastiera e mappa su richiesta`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript((key) => localStorage.setItem(key, "rejected"), choiceKey);
    for (const path of ["/", "/soluzioni/ristoranti", "/prodotti-assistenza", "/contatti"]) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (path === "/") {
        await expect(page.locator('iframe[src*="google.com/maps"]')).toHaveCount(0);
        await page.getByRole("button", { name: /Clicca per caricare la mappa/ }).click();
        await expect(page.locator('iframe[src*="google.com/maps"]')).toHaveCount(1);
      }
      if (path === "/soluzioni/ristoranti") {
        const faq = page.locator("summary").first();
        await faq.focus();
        await page.keyboard.press("Enter");
        await expect(page.locator("details").first()).toHaveAttribute("open", "");
        await page.getByRole("link", { name: "Richiedi informazioni", exact: true }).first().click();
        await expect(page.locator("#richiedi-proposta")).toBeInViewport();
      }
      await page.screenshot({ path: testInfo.outputPath(`${path.replaceAll("/", "_") || "home"}-${width}.png`), fullPage: true });
    }
  });
}


test("telefono e WhatsApp: soli clic secondari con consenso e contesto dopo navigazione", async ({ page }) => {
  await page.goto("/soluzioni/ristoranti");
  await page.getByRole("button", { name: "Rifiuta" }).click();
  async function clickContact(selector: string) {
    await page.evaluate((selector) => {
      const link = document.querySelector<HTMLAnchorElement>(selector)!;
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
      link.click();
    }, selector);
  }
  await clickContact('a[href^="tel:"]');
  expect(await events(page, "contact_click")).toHaveLength(0);
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Solo statistiche" }).click();
  await clickContact('a[href^="tel:"]');
  await clickContact('a[href^="https://wa.me"]');
  const clicks = await events(page, "contact_click");
  expect(clicks).toHaveLength(2);
  expect(clicks[0][2]).toEqual({ channel: "phone", sector: "ristoranti", page_type: "sector_page", transport_type: "beacon" });
  expect(clicks[1][2]).toEqual({ channel: "whatsapp", sector: "ristoranti", page_type: "sector_page", transport_type: "beacon" });
  await page.locator("footer").getByRole("link", { name: "Contatti", exact: true }).click();
  await expect(page).toHaveURL(/contatti$/);
  await clickContact('a[href^="tel:"]');
  const next = await events(page, "contact_click");
  expect(next).toHaveLength(3);
  expect(next[2][2]).toEqual({ channel: "phone", sector: "generico", page_type: "contact_page", transport_type: "beacon" });
  expect(await events(page, "generate_lead")).toHaveLength(0);
});

for (const sector of sectors) {
  if (sector !== "parrucchieri-saloni") test(`percorso ${sector}: prima delle FAQ, porta al modulo e richiede il telefono`, async ({ page }) => {
    await page.addInitScript((key) => localStorage.setItem(key, "rejected"), choiceKey);
    let submissions = 0;
    await page.route("**/api/contact", async (route) => {
      submissions++;
      return route.fulfill({ status: 502, json: { error: "Invio simulato." } });
    });
    await page.goto(`/soluzioni/${sector}`);
    await page.getByRole("link", { name: "Come funziona", exact: true }).click();
    const journey = page.getByRole("region", { name: "Dalla prima richiesta, sempre al tuo fianco" });
    await expect(journey).toBeInViewport();
    await expect(journey.getByRole("listitem")).toHaveCount(6);
    expect(await page.evaluate(() => {
      const journey = document.getElementById("come-funziona")!;
      const faq = Array.from(document.querySelectorAll("h2")).find((heading) => heading.textContent === "Domande frequenti")!;
      return Boolean(journey.compareDocumentPosition(faq) & Node.DOCUMENT_POSITION_FOLLOWING);
    })).toBe(true);
    await journey.getByRole("link", { name: "Richiedi un ricontatto" }).click();
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    await fillContact(page);
    const phone = page.getByLabel("Numero di telefono", { exact: true });
    await phone.fill("");
    await page.locator('form button[type="submit"]').click();
    expect(await phone.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
    expect(submissions).toBe(0);
    await phone.fill("+39 333 123 4567");
    await page.locator('form button[type="submit"]').click();
    await expect.poll(() => submissions).toBe(1);
  });

  test(`menu mobile: Contattaci conserva il settore ${sector} fino all’invio`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript((key) => localStorage.setItem(key, "accepted"), choiceKey);
    const bodies: Record<string, unknown>[] = [];
    await page.route("**/api/contact", async (route) => {
      bodies.push(route.request().postDataJSON());
      await route.fulfill({ json: { ok: true }, headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt(secret)}; Path=/; HttpOnly; SameSite=Strict` } });
    });
    await page.goto(`/soluzioni/${sector}`);
    await page.getByRole("button", { name: "Apri menu di navigazione" }).click();
    await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/soluzioni/${sector}#richiedi-proposta$`));
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(page.locator("#richiedi-proposta")).toBeInViewport();
    await fillContact(page);
    await page.locator('form button[type="submit"]').click();
    await expect(page).toHaveURL(/grazie$/);
    expect(bodies).toHaveLength(1);
    expect(bodies[0].context).toEqual({ sector, form_location: "sector_page" });
    expect(bodies[0].phone).toBe("+39 333 123 4567");
    const leads = await events(page, "generate_lead");
    expect(leads).toHaveLength(1);
    expect(leads[0][2]).toMatchObject({ sector, form_location: "sector_page" });
  });
}

test("articoli: download, fonti e CTA corrispondono ai dati editoriali", async ({ page }) => {
  for (const article of articles) {
    await page.goto(`/news/${article.slug}`);
    if (article.type !== "news") {
      await expect(page.getByRole("link", { name: article.fileLabel, exact: true })).toHaveAttribute("href", article.file);
    }
    for (const link of article.relatedLinks ?? []) {
      await expect(page.getByRole("link", { name: link.label, exact: true })).toHaveAttribute("href", link.href);
    }
    if (article.cta) await expect(page.getByRole("heading", { name: article.cta.title, exact: true })).toBeVisible();
    await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute("content", article.revisedAt ?? article.date);
  }
});

test("anteprime social generate con dimensioni corrette", async ({ request }) => {
  for (const variant of ["generale", "ristoranti"]) {
    const response = await request.get(`/images/og/${variant}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const body = await response.body();
    expect(body.readUInt32BE(16)).toBe(1200);
    expect(body.readUInt32BE(20)).toBe(630);
  }
  expect((await request.get("/images/og/inesistente")).status()).toBe(404);
});


test("preferenze cookie accessibili anche con elementi della chat sovrapposti", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/contatti");
  await page.getByRole("dialog", { name: "Preferenze cookie" }).waitFor();
  await page.evaluate(() => {
    for (const className of ["woot-widget-bubble", "woot-widget-holder"]) {
      const widget = document.createElement("div");
      widget.className = className;
      widget.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:white";
      document.body.appendChild(widget);
    }
  });
  await expect(page.locator(".woot-widget-bubble")).toBeHidden();
  await expect(page.locator(".woot-widget-holder")).toBeHidden();
  await page.getByRole("button", { name: "Rifiuta" }).click();
  await expect(page.locator(".woot-widget-bubble")).toBeVisible();
  await expect(page.locator(".woot-widget-holder")).toBeVisible();
});

test("Ristorazione: quattro prodotti, software dedicato e gallerie su desktop e mobile", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), choiceKey);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/soluzioni/ristoranti");
    const solutions = page.locator("#soluzioni-rch");
    await expect(solutions.getByRole("heading", { level: 3 })).toHaveText([
      "PC POS Touch Screen", "Registratore telematico APE3 con POS integrato", "POS per pagamenti", "Cassetti automatici Cashmatic",
    ]);
    await expect(solutions.locator("article")).toHaveCount(4);
    await expect(solutions.locator("article p")).toHaveCount(0);
    const cashmaticImage = solutions.getByRole("img", { name: "Cassetto automatico Cashmatic SelfPay 860 per banconote e monete" });
    await cashmaticImage.scrollIntoViewIfNeeded();
    await expect.poll(() => cashmaticImage.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const software = page.locator("#software-gestionale");
    await expect(software.getByRole("heading", { level: 2, name: "Software gestionale in cloud", exact: true })).toBeVisible();
    await expect(software.getByRole("listitem")).toHaveCount(4);
    await expect(software.getByRole("link", { name: "Parliamo del tuo gestionale" })).toHaveAttribute("href", "#richiedi-proposta");
    const softwareGallery = software.getByRole("region", { name: "Foto: Software gestionale in cloud" });
    await softwareGallery.scrollIntoViewIfNeeded();
    await expect(softwareGallery.getByRole("img")).toHaveCount(5);
    await expect(softwareGallery.getByText("1 / 5", { exact: true })).toBeVisible();
    await softwareGallery.getByRole("button", { name: "Foto successiva" }).click();
    await expect(softwareGallery.getByText("2 / 5", { exact: true })).toBeVisible();
    await softwareGallery.getByRole("button", { name: "Foto precedente" }).click();
    await softwareGallery.getByRole("button", { name: "Foto precedente" }).click();
    await expect(softwareGallery.getByText("5 / 5", { exact: true })).toBeVisible();
    await expect.poll(() => softwareGallery.locator("img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await software.screenshot({ path: `/tmp/mifro-software-${width}.png` });
    await expect(page.locator("main")).not.toContainText(/ATS\s*[23]|A-Touch System|RISTO-PRO/);
    for (const name of ["PC POS Touch Screen", "Registratore telematico APE3 con POS integrato"]) {
      const gallery = solutions.getByRole("region", { name: `Foto: ${name}` });
      await gallery.scrollIntoViewIfNeeded();
      await expect(gallery.getByText("1 / 3", { exact: true })).toBeVisible();
      await gallery.getByRole("button", { name: "Foto successiva" }).click();
      await expect(gallery.getByText("2 / 3", { exact: true })).toBeVisible();
      await gallery.getByRole("button", { name: "Foto precedente" }).click();
      await expect(gallery.getByText("1 / 3", { exact: true })).toBeVisible();
      await gallery.getByRole("button", { name: "Foto precedente" }).click();
      await expect(gallery.getByText("3 / 3", { exact: true })).toBeVisible();
      const viewport = gallery.getByLabel("Scorri le foto del prodotto");
      await viewport.focus();
      await page.keyboard.press("ArrowRight");
      await expect(gallery.getByText("1 / 3", { exact: true })).toBeVisible();
      await viewport.evaluate((element) => element.scrollTo({ left: element.clientWidth * 2 }));
      await expect(gallery.getByText("3 / 3", { exact: true })).toBeVisible();
      await expect.poll(() => gallery.locator("img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await solutions.screenshot({ path: `/tmp/mifro-food-${width}.png` });
  }
});



test("Ambulanti: casse esistenti, POS e Smart Order con foto", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, "rejected"), choiceKey);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/soluzioni/ambulanti");
    const solutions = page.locator("#soluzioni-rch");
    await expect(solutions.getByRole("heading", { level: 3 })).toHaveText(["WALLE MEC RT Ambulanti", "APE J RT", "POS per pagamenti"]);
    const software = page.locator("#software-gestionale");
    await software.scrollIntoViewIfNeeded();
    await expect(software.getByRole("heading", { level: 2 })).toHaveText("RCH Smart Order 3.0");
    await expect(software.getByRole("link", { name: "Richiedi informazioni su Smart Order" })).toHaveAttribute("href", "#richiedi-proposta");
    const gallery = software.getByRole("region", { name: "Foto: RCH Smart Order 3.0" });
    await expect(gallery.getByRole("img")).toHaveCount(5);
    // Visit each slide so off-screen images can load lazily before checking them.
    for (let index = 0; index < 5; index++) {
      await expect(gallery.getByText(`${index + 1} / 5`, { exact: true })).toBeVisible();
      await expect.poll(() => gallery.getByRole("img").nth(index).evaluate((image) => (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
      if (index < 4) await gallery.getByRole("button", { name: "Foto successiva" }).click();
    }
    await expect.poll(() => gallery.locator("img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await software.screenshot({ path: `/tmp/mifro-smart-order-${width}.png` });
  }
});

test("altre attività: servizi digitali, prodotti e modulo su desktop e mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/soluzioni/altre-attivita");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Strumenti su misura per il tuo lavoro");
    await expect(page.locator("#servizi-digitali h3")).toHaveText([
      "Gestionali su misura", "Sito web", "E-commerce", "Agenda per appuntamenti",
    ]);
    await expect(page.locator("#soluzioni-rch article")).toHaveCount(4);
    await page.getByRole("link", { name: "Parliamo del tuo progetto" }).click();
    await expect(page.getByLabel("Nome e cognome")).toBeInViewport();
    await expect(page.locator('input[name="subject"]')).toHaveValue("Soluzioni per la mia attività");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("prodotti e assistenza: comparsa allo scroll e accesso diretto al NAS", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/prodotti-assistenza");
  const nas = page.locator("#nas-backup .animate-on-scroll");
  await nas.scrollIntoViewIfNeeded();
  await expect(nas).toHaveClass(/is-visible/);
  await expect(nas).toHaveCSS("opacity", "1");
  await page.goto("/prodotti-assistenza#nas-backup");
  await expect(page.getByRole("heading", { name: "NAS e sistemi di backup", exact: true })).toBeInViewport();
  await expect(nas).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(nas).toHaveCSS("transition-duration", "0s");
});
