import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

// Explicit, network-dependent audit of the current Google configuration.
// Kept separate from the deterministic CI suite; collection is always intercepted.
export default defineConfig(base, {
  testDir: "./tests/analytics-live",
  timeout: 60000,
  use: { serviceWorkers: "block" },
});
