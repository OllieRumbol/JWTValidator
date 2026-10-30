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
  expect(top).toBeGreaterThanOrEqual(0);
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
      .getByRole("link", { name: "Technical details" })
      .click();

    await expect(page).toHaveURL(
      /#\/docs\/validation-options\/technical-details$/,
    );
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
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

  test("the section link copies the section's address and shows Link copied", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("#/docs/validator", { waitUntil: "networkidle" });

    await page.getByRole("heading", { name: "Validator Introduction" }).hover();
    await page
      .getByRole("link", {
        name: "Link to this section: Validator Introduction",
      })
      .click();

    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      `${baseURL}#/docs/validator/introduction`,
    );
    await expect(page.getByText("Link copied").first()).toBeVisible();
  });
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

// "Page not found" and the docs layout are the new design. The old 1.0.3 content inside
// the layout (".noWhiteSpace") has the defects in spec section 4.1, item 11, until T21
// replaces it, so test 11 leaves it out.
test.describe("a docs page (tests 10 and 11)", () => {
  test("does not scroll sideways at 320 px", async ({ page }) => {
    await page.setViewportSize(NARROWEST);
    await page.goto("#/docs/validation-options", { waitUntil: "networkidle" });

    const pageWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(pageWidth).toBeLessThanOrEqual(NARROWEST.width);
  });

  for (const viewport of [NARROWEST, DESKTOP]) {
    test(`the layout has no accessibility violations at ${viewport.width} px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("#/docs/validation-options", {
        waitUntil: "networkidle",
      });

      const results = await new AxeBuilder({ page })
        .exclude(".noWhiteSpace")
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
