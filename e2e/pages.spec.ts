// Plan section 7.2, tests 10 and 11, on every page (spec sections 6.6.1 and 6.6.3).
import { expect, test } from "@playwright/test";
import { accessibilityCheck } from "./accessibility.ts";
import { everyPage } from "./everyPage.ts";

const NARROWEST = { width: 320, height: 640 };
const DESKTOP = { width: 1280, height: 720 };

for (const route of everyPage) {
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

    // Test 10, second part: content that is wider than its box, such as code or a
    // table, scrolls inside the box. It is not clipped, and does not spill out
    // (spec section 4.1, item 4). Boxes 1 px wide are text for screen readers only.
    test("scrolls wide content inside its box at 320 px", async ({ page }) => {
      await page.setViewportSize(NARROWEST);
      await page.goto(route, { waitUntil: "networkidle" });

      const notScrolling = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((element) => element.clientWidth > 1)
          // 1 px for rounding.
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .filter((element) => {
            const overflow = getComputedStyle(element).overflowX;
            return overflow !== "auto" && overflow !== "scroll";
          })
          .map((element) => element.outerHTML.slice(0, 80)),
      );
      expect(notScrolling).toEqual([]);
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
