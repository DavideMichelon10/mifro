import { test, expect } from "@playwright/test";
import { GA_ID, CONSENT_KEY } from "../../src/lib/analytics";
import { createReceipt, RECEIPT_COOKIE } from "../../src/lib/contact";

type CapturedEvent = { event: string | null; path: string; sector: string | null; location: string | null };

test("tag Google reale: un lead per invio, nessuna conversione su visita o refresh di grazie", async ({ page, context, baseURL }, testInfo) => {
  const origin = new URL(baseURL!).origin;
  if (!["127.0.0.1", "localhost", "[::1]"].includes(new URL(origin).hostname)) {
    throw new Error("Il collaudo Analytics deve utilizzare esclusivamente un server locale di test.");
  }
  // Download just the public loader. No visitor information is sent to Google.
  const loader = await fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, { signal: AbortSignal.timeout(20000) });
  expect(loader.ok, "Download del tag pubblico Google").toBe(true);
  const script = await loader.text();
  const captured: CapturedEvent[] = [];
  const submissions: unknown[] = [];
  let tagLoads = 0;
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === origin) {
      if (url.pathname !== "/api/contact") return route.continue();
      submissions.push(request.postDataJSON());
      return route.fulfill({
        json: { ok: true },
        headers: { "Set-Cookie": `${RECEIPT_COOKIE}=${createReceipt("browser-test-only-secret-at-least-32-characters")}; Path=/; HttpOnly; SameSite=Strict` },
      });
    }
    if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") {
      tagLoads++;
      return route.fulfill({ contentType: "application/javascript", body: script });
    }
    if (url.pathname.endsWith("/collect")) {
      // GA may batch several events in newline-separated POST rows, not only URL parameters.
      for (const row of request.postData()?.split(/\r?\n/).filter(Boolean) ?? [""]) {
        const params = new URLSearchParams(url.searchParams);
        for (const [key, value] of new URLSearchParams(row)) params.set(key, value);
        captured.push({
          event: params.get("en"),
          path: new URL(params.get("dl") || origin).pathname,
          sector: params.get("ep.sector"),
          location: params.get("ep.form_location"),
        });
      }
      return route.fulfill({ status: 204 });
    }
    if (url.hostname === "app.chatwoot.com") {
      return route.fulfill({ contentType: "application/javascript", body: "window.chatwootSDK = { run() {} };" });
    }
    return route.fulfill({ status: 200, body: "" });
  });
  await page.goto("/soluzioni/ristoranti");
  expect(tagLoads).toBe(0);
  expect(captured).toHaveLength(0);
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect.poll(() => captured.filter((event) => event.event === "page_view" && event.path === "/soluzioni/ristoranti").length, { timeout: 15000 }).toBe(1);
  await page.locator("header").getByRole("link", { name: "Contattaci", exact: true }).click();
  await page.getByLabel("Nome e cognome").fill("Verifica locale");
  await page.getByLabel("Email", { exact: true }).fill("review@example.com");
  await page.getByLabel("Messaggio", { exact: true }).fill("Collaudo intercettato: nessuna email o richiesta di raccolta reale.");
  await page.getByRole("button", { name: "Invia messaggio" }).click();
  await expect(page).toHaveURL(/grazie$/);
  await expect.poll(() => captured.filter((event) => event.event === "generate_lead").length, { timeout: 15000 }).toBe(1);
  await expect.poll(() => captured.filter((event) => event.event === "page_view" && event.path === "/grazie").length, { timeout: 15000 }).toBe(1);
  await page.reload();
  await expect.poll(() => captured.filter((event) => event.event === "page_view" && event.path === "/grazie").length, { timeout: 15000 }).toBe(2);
  // Wait for the loader's deferred collection batch before checking for duplicates.
  await page.waitForTimeout(6000);
  await testInfo.attach("analytics-events", { body: JSON.stringify(captured, null, 2), contentType: "application/json" });
  expect(submissions).toHaveLength(1);
  expect(captured.filter((event) => event.event === "generate_lead")).toEqual([
    { event: "generate_lead", path: "/soluzioni/ristoranti", sector: "ristoranti", location: "sector_page" },
  ]);
  expect(captured.filter((event) => event.event?.startsWith("ads_conversion_") && event.path === "/grazie"),
    "Rimuovere nell’account Google la conversione derivata dalla visita a /grazie: duplica l’invio e ricompare al refresh.",
  ).toEqual([]);
  expect(await page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY)).toBe("accepted");
});
