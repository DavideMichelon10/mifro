import { test, expect, type Page } from "@playwright/test";
import { ADS_CONSENT_KEY, CONSENT_KEY } from "../../src/lib/analytics";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL!).origin) return route.continue();
    const body = url.hostname === "app.chatwoot.com" ? "window.chatwootSDK = { run() {} };" : "";
    return route.fulfill({ contentType: "application/javascript", body });
  });
});

async function commands(page: Page) {
  return page.evaluate(() => (window.dataLayer || []).map((entry) => Array.from(entry as ArrayLike<unknown>)));
}

async function settings(page: Page) {
  return (await commands(page)).filter((entry) => entry[0] === "consent").at(-1)?.[2];
}

const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
const statistics = { ...denied, analytics_storage: "granted" };
const advertising = { ...statistics, ad_storage: "granted", ad_user_data: "granted" };

test("consensi distinti: ripristino, revoca Ads, revoca completa e nessuna personalizzazione", async ({ page, context }) => {
  let loads = 0;
  page.on("request", request => { if (request.url().includes("googletagmanager.com/gtag/js")) loads++; });
  await page.goto("/contatti");
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await settings(page)).toEqual(denied);
  expect(loads).toBe(0);
  await page.getByRole("button", { name: "Solo statistiche", exact: true }).click();
  expect(await settings(page)).toEqual(statistics);
  await expect.poll(() => loads).toBe(1);
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Accetta statistiche e misurazione Ads", exact: true }).click();
  expect(await settings(page)).toEqual(advertising);
  expect(loads).toBe(1);
  expect((await commands(page)).filter(entry => entry[0] === "config")).toHaveLength(1);

  await page.reload();
  await expect(page.locator("#mifro-google-measurement")).toHaveCount(1);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await settings(page)).toEqual(advertising);
  expect(loads).toBe(2);
  await page.evaluate(() => {
    document.cookie = "_ga=test;path=/";
    document.cookie = "_gcl_aw=test;path=/";
    document.cookie = "_gac_test=test;path=/";
  });
  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Solo statistiche", exact: true }).click();
  expect(await settings(page)).toEqual(statistics);
  let cookies = await context.cookies();
  expect(cookies.some(cookie => /^_gc[la]_/.test(cookie.name))).toBe(false);
  expect(cookies.some(cookie => cookie.name === "_ga")).toBe(true);
  expect(loads).toBe(2);

  await page.getByRole("button", { name: "Preferenze cookie", exact: true }).click();
  await page.getByRole("button", { name: "Rifiuta", exact: true }).click();
  await expect(page.locator("#mifro-google-measurement")).toHaveCount(0);
  expect(await settings(page)).toEqual(denied);
  cookies = await context.cookies();
  expect(cookies.some(cookie => /^_(ga|gcl|gac)/.test(cookie.name))).toBe(false);
  expect(loads).toBe(2);
  expect(await page.evaluate(({ analytics, ads }) => [localStorage.getItem(analytics), localStorage.getItem(ads)], { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY })).toEqual(["rejected", "rejected"]);
});

for (const legacy of ["accepted", "rejected"]) {
  test(`preferenza precedente ${legacy}: nessuna autorizzazione Ads implicita`, async ({ page }) => {
    await page.addInitScript(({ key, choice }) => localStorage.setItem(key, choice), { key: CONSENT_KEY, choice: legacy });
    await page.goto("/contatti");
    await expect(page.getByRole("button", { name: "Preferenze cookie", exact: true })).toBeVisible();
    expect(await settings(page)).toEqual(legacy === "accepted" ? statistics : denied);
    await expect(page.getByRole("dialog")).toHaveCount(legacy === "accepted" ? 1 : 0);
    expect(await page.evaluate(key => localStorage.getItem(key), ADS_CONSENT_KEY)).toBeNull();
  });
}

test("revoca in un'altra scheda disattiva la raccolta anche nella scheda aperta", async ({ page, context }) => {
  await page.goto("/contatti");
  await page.getByRole("button", { name: "Accetta statistiche e misurazione Ads", exact: true }).click();
  const other = await context.newPage();
  // No site scripts or external services are needed in this same-origin document.
  await other.route("**/*", route => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Preferences test</title>" }));
  await other.goto(page.url());
  await other.evaluate(({ analytics, ads }) => {
    localStorage.setItem(ads, "rejected");
    localStorage.setItem(analytics, "rejected");
  }, { analytics: CONSENT_KEY, ads: ADS_CONSENT_KEY });
  await expect(page.locator("#mifro-google-measurement")).toHaveCount(0);
  await expect.poll(() => settings(page)).toEqual(denied);
  await other.close();
});

test("scelte del banner accessibili su schermo piccolo", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/contatti");
  const dialog = page.getByRole("dialog", { name: "Preferenze cookie" });
  await expect(dialog).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Accetta statistiche e misurazione Ads", exact: true }).click();
  expect(await settings(page)).toEqual(advertising);
});

test("il passaggio al modulo conserva i parametri del clic prima del consenso", async ({ page }) => {
  await page.goto("/soluzioni/parrucchieri-saloni?gclid=local-test-only&utm_source=google");
  await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
  await expect(page).toHaveURL(/#richiedi-proposta$/);
  expect(new URL(page.url()).searchParams.get("gclid")).toBe("local-test-only");
  await page.getByRole("button", { name: "Accetta statistiche e misurazione Ads", exact: true }).click();
  expect(await settings(page)).toEqual(advertising);
});
