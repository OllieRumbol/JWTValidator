// The docs layout in a real browser: the rows of plan section 7.2, test 9 for section
// links, shared section links and copying a section link. Tests 10 and 11 are in
// pages.spec.ts.
import { expect, test, type Page } from "@playwright/test";

const DESKTOP = { width: 1280, height: 720 };

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
      .getByRole("link", { name: "Add checks and build" })
      .click();

    await expect(page).toHaveURL(
      /#\/docs\/validation-options\/add-checks-and-build$/,
    );
    // The scroll follows the address change, so wait for it.
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
    await expectInView(page, "add-checks-and-build");
  });

  test("a shared section link opens the page scrolled to that section", async ({
    page,
  }) => {
    await page.goto("#/docs/validation-options/minimum-secret-length", {
      waitUntil: "networkidle",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: "Validation options" }),
    ).toBeVisible();
    await expectInView(page, "minimum-secret-length");
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
      .getByRole("link", { name: "Reference" })
      .click();
    await expect(page).toHaveURL(/#\/docs\/validator\/reference$/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/$/);
  });

  test("Back to a section address returns to where the reader was, not to the section", async ({
    page,
  }) => {
    await page.goto("#/docs/validation-options/choose-a-signing-key", {
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

    await expect(page).toHaveURL(
      /#\/docs\/validation-options\/choose-a-signing-key$/,
    );
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(position);
  });

  test("the section link copies the section's address and shows Link copied", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("#/docs/validator", { waitUntil: "networkidle" });

    await page.getByRole("heading", { name: "Choose a method" }).hover();
    await page
      .getByRole("link", {
        name: "Link to this section: Choose a method",
      })
      .click();

    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      `${baseURL}#/docs/validator/choose-a-method`,
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
    .getByText(/Returns false when the token is not valid/);
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

  // docs-page.html: the sidebar has 240 px of content and 56 px of padding, and On this
  // page is 180 to 220 px wide. A wider sidebar left empty space beside the docs list.
  // The article has 32 px on each side, not the design's 48 px (maintainer's choice).
  test("the sidebar, the article and On this page have their set widths", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("#/docs/validator");

    const sidebar = await page
      .getByRole("navigation", { name: "Documentation" })
      .boundingBox();
    const article = await page.locator("article").boundingBox();
    const onThisPage = await page
      .getByRole("navigation", { name: "On this page" })
      .boundingBox();
    // 240 + 32 + 24 px, and the 1 px border.
    expect(sidebar!.width).toBe(297);
    expect(article!.x - (sidebar!.x + sidebar!.width)).toBe(32);
    expect(onThisPage!.x - (article!.x + article!.width)).toBe(32);
    expect(onThisPage!.width).toBeGreaterThanOrEqual(180);
    expect(onThisPage!.width).toBeLessThanOrEqual(220);

    // At the narrowest width that shows the column, it shrinks, but not below 180 px.
    await page.setViewportSize({ width: 1200, height: 720 });
    const narrowest = await page
      .getByRole("navigation", { name: "On this page" })
      .boundingBox();
    expect(narrowest!.width).toBeGreaterThanOrEqual(180);
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

// Test 10, the secret length row of spec section 6.2.3: at 320 px the table scrolls
// inside its box, if it is wider than the box, and the page does not scroll sideways.
test("at 320 px the secret length table stays inside its box", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("#/docs/validation-options/minimum-secret-length", {
    waitUntil: "networkidle",
  });

  const box = page.getByRole("region", { name: "Minimum secret length" });
  const layout = await box.evaluate((element) => ({
    overflowX: getComputedStyle(element).overflowX,
    right: element.getBoundingClientRect().right,
    pageWidth: document.documentElement.scrollWidth,
  }));
  expect(layout.overflowX).toBe("auto");
  expect(layout.right).toBeLessThanOrEqual(320);
  expect(layout.pageWidth).toBeLessThanOrEqual(320);
});
