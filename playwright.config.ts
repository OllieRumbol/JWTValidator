import { defineConfig, devices } from "@playwright/test";

// The end-to-end tests run against the built site, so run `npm run build` first.
const baseURL = "http://localhost:4173/JWTValidator/";

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
