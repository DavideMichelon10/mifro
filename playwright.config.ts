import { defineConfig } from "@playwright/test";

const port = process.env.MIFRO_TEST_PORT || "3101";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.MIFRO_TEST_BASE_URL || `http://127.0.0.1:${port}`,
    channel: process.env.MIFRO_TEST_BROWSER || undefined,
    viewport: { width: 1440, height: 960 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: process.env.MIFRO_TEST_BASE_URL ? undefined : {
    command: `npm start -- --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    env: { SMTP_USER: "", SMTP_PASSWORD: "", CONTACT_TO: "", CONTACT_FORM_SECRET: "browser-test-only-secret-at-least-32-characters" },
  },
});
