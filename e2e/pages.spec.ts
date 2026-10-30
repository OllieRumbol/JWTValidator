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

    // index.html preloads fonts so text does not move when they arrive (T24). A font
    // that a page does not use is wasted bytes, and a preload left behind when
    // src/app/fonts.ts changes would be one. A preload address that differs from the
    // CSS one would download the font twice.
    test("uses every font that index.html preloads, loading each once", async ({
      page,
    }) => {
      const fontResponses: { url: string; status: number }[] = [];
      page.on("response", (response) => {
        if (/\.woff2?$/.test(response.url())) {
          fontResponses.push({
            url: response.url(),
            status: response.status(),
          });
        }
      });
      await page.goto(route, { waitUntil: "networkidle" });

      // One download for each family and weight, for example "sans-latin-400".
      const fontFiles = fontResponses.map(
        (response) =>
          /ibm-plex-(\w+-latin-\d+)-normal/.exec(response.url)?.[1] ??
          response.url,
      );
      expect(new Set(fontFiles).size).toBe(fontFiles.length);
      expect(
        fontResponses.filter((response) => response.status !== 200),
      ).toEqual([]);

      const unused = await page.evaluate(async () => {
        await document.fonts.ready;
        const loaded = [...document.fonts]
          .filter((font) => font.status === "loaded")
          .map((font) => `${font.family.replaceAll('"', "")} ${font.weight}`);
        // For example ".../ibm-plex-sans-latin-400-normal-<hash>.woff2" is
        // "IBM Plex Sans 400".
        return [...document.querySelectorAll('link[rel="preload"][as="font"]')]
          .map((link) => {
            const name = link.getAttribute("href") ?? "";
            const [, family, weight] =
              /ibm-plex-(sans|mono)-latin-(\d+)-normal/.exec(name) ?? [];
            return family
              ? `IBM Plex ${family === "sans" ? "Sans" : "Mono"} ${weight}`
              : name;
          })
          .filter((font) => !loaded.includes(font));
      });
      expect(unused).toEqual([]);
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
