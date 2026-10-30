// The docs layout in a real browser: the rows of plan section 7.2, test 9 for section
// links, shared section links and copying a section link, and a docs page in tests 10
// and 11.
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const DESKTOP = { width: 1280, height: 720 };
const NARROWEST = { width: 320, height: 640 };

// The page's top edge is at 0 or just below it after scrolling to a section. A section
// near the end of a page may stop lower, when the page cannot scroll further.
async function expectInView(page: Page, id: string) {
  const top = await page.locator(`#${id}`).evaluate((element) => {
    return element.getBoundingClientRect().top;
  });
  // Up to 1 px above, because the browser rounds the scroll to whole pixels.
  expect(top).toBeGreaterThanOrEqual(-1);
  expect(top).toBeLessThan(DESKTOP.height / 2);
}

test.describe("section addresses (test 9)", () => {
  test.use({ viewport: DESKTOP });

  test("selecting a section in On this page scrolls to it", async ({
    page,
  }) => {
    await page.goto("#/docs/validation-options", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    await page
      .getByRole("navigation", { name: "On this page" })
      .getByRole("link", { name: "Technical Details" })
      .click();

    await expect(page).toHaveURL(
      /#\/docs\/validation-options\/technical-details$/,
    );
    // The scroll follows the address change, so wait for it.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
    await expectInView(page, "technical-details");
  });

  test("a shared section link opens the page scrolled to that section", async ({
    page,
  }) => {
    await page.goto("#/docs/validation-options/technical-details", {
      waitUntil: "networkidle",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: "Validation options" }),
    ).toBeVisible();
    await expectInView(page, "technical-details");
  });

  test("an unknown section opens the page at the top", async ({ page }) => {
    await page.goto("#/docs/validation-options/no-such-section", {
      waitUntil: "networkidle",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: "Validation options" }),
    ).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("Back after a section link returns to the previous page", async ({
    page,
  }) => {
    await page.goto("#/");
    await page.goto("#/docs/validator");
    await page
      .getByRole("navigation", { name: "On this page" })
      .getByRole("link", { name: "Methods" })
      .click();
    await expect(page).toHaveURL(/#\/docs\/validator\/methods$/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/$/);
  });

  test("Back to a section address returns to where the reader was, not to the section", async ({
    page,
  }) => {
    await page.goto("#/docs/validation-options/code-example", {
      waitUntil: "networkidle",
    });
    // The reader scrolls on, below the section, then follows Next.
    await page.evaluate(() => window.scrollBy(0, 900));
    const position = await page.evaluate(() => window.scrollY);
    // dispatchEvent, because click() would first scroll the link into view.
    await page
      .getByRole("navigation", { name: "Previous and next" })
      .getByRole("link", { name: /Next/ })
      .dispatchEvent("click");
    await expect(page).toHaveURL(/#\/docs\/validator$/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/docs\/validation-options\/code-example$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(position);
  });

  test("the section link copies the section's address and shows Link copied", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("#/docs/validator", { waitUntil: "networkidle" });

    await page.getByRole("heading", { name: "Code Samples" }).hover();
    await page
      .getByRole("link", {
        name: "Link to this section: Code Samples",
      })
      .click();

    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      `${baseURL}#/docs/validator/code-samples`,
    );
    // The pill on screen, not the hidden live region with the same words, which
    // Playwright also counts as visible.
    await expect(
      page.locator('span[aria-hidden="true"]', { hasText: "Link copied" }),
    ).toBeVisible();
  });
});

// A section's own spacing must not reach into the components inside it. An earlier
// version removed the gap between each method's summary and its signature.
test("a reference block keeps its own spacing inside its section", async ({
  page,
}) => {
  await page.goto("#/docs/validator", { waitUntil: "networkidle" });

  const summary = page
    .getByRole("region", { name: "TryValidateJWT" })
    .getByText(/is very similar to the \.ValidateJWT\(\) method/);
  const margin = await summary.evaluate((element) => {
    const style = getComputedStyle(element);
    return [style.marginTop, style.marginBottom];
  });
  expect(margin).toEqual(["6px", "14px"]);
});

test.describe("layout at each width", () => {
  test("from 1200 px, the sidebar and On this page sit beside the article", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("#/docs/validator");

    await expect(
      page.getByRole("navigation", { name: "Documentation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "On this page" }),
    ).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "On this page" }),
    ).toBeVisible();
  });

  test("below 1200 px, On this page is a box at the top of the article", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1000, height: 720 });
    await page.goto("#/docs/validator");

    await expect(
      page.getByRole("navigation", { name: "Documentation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "On this page" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("below 900 px, the sidebar is hidden, because the menu holds the docs list", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 720 });
    await page.goto("#/docs/validator");

    await expect(
      page.getByRole("heading", { level: 1, name: "Validator" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Documentation" }),
    ).toBeHidden();
  });
});

// Tests 10 and 11 on every page rebuilt in the new design: the four docs pages and
// Versions. Home joins them in T22.
const pages = [
  "#/docs/validation-options",
  "#/docs/validator",
  "#/docs/expiry-checker",
  "#/docs/dictionary-extensions",
  "#/versions",
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

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
}
