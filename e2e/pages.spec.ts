// Plan section 7.2, tests 10 and 11, on every page (spec sections 6.6.1 and 6.6.3).
import { expect, test } from "@playwright/test";
import { docsPages } from "../src/content/docsPages.ts";
import { accessibilityCheck } from "./accessibility.ts";

const NARROWEST = { width: 320, height: 640 };
const DESKTOP = { width: 1280, height: 720 };

// Every page: Home, Versions, each docs page and "Page not found" (spec section 6.1.1).
// A docs page joins when it is added to docsPages.
const pages = [
  "#/",
  "#/versions",
  ...docsPages.map((page) => `#/docs/${page.slug}`),
  "#/no-such-page",
];

for (const route of pages) {
  test.describe(route, () => {
    // Test 10 (spec section 6.6.3, item 2).
    test("does not scroll sideways at 320 px", async ({ page }) => {
      await page.setViewportSize(NARROWEST);
      await page.goto(route, { waitUntil: "networkidle" });

      const pageWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(pageWidth).toBeLessThanOrEqual(NARROWEST.width);
    });

    // Test 11 (spec section 6.6.1, item 2).
    for (const viewport of [NARROWEST, DESKTOP]) {
      test(`has no accessibility violations at ${viewport.width} px`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await page.goto(route, { waitUntil: "networkidle" });

        const results = await accessibilityCheck(page).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
}
