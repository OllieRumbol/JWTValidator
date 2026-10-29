// The header, the menu and the footer in a real browser: plan section 7.2, the rows of
// test 9 for the layout, tests 10 and 11 for these parts, and test 18.
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const PHONE = { width: 375, height: 812 };
const NARROWEST = { width: 320, height: 640 };
// Short enough that Home can scroll the 1,500 pixels in spec section 6.2.2.
const DESKTOP = { width: 1280, height: 600 };

// The parts that T17 rebuilt. Each page joins tests 10 and 11 when it is rebuilt (plan
// section 7.1), so the old page content is not checked here.
const LAYOUT_PARTS = [
  "header",
  'section[aria-label="Version notice"]',
  "footer",
];

async function openMenu(page: Page) {
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  return menu;
}

test.describe("navigation (test 9)", () => {
  test("a page opened from a header link starts at the top", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    // Images that load later would move the page after the scroll.
    await page.goto("#/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);

    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Versions" })
      .click();

    await expect(page).toHaveURL(/#\/versions$/);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("Back returns to the page the reader came from", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("#/");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Versions" })
      .click();
    await expect(page).toHaveURL(/#\/versions$/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/$/);
    // Home's title until T22 rebuilds Home.
    await expect(
      page.getByRole("heading", { level: 1, name: "JWT Validator" }),
    ).toBeVisible();
  });

  test("on a phone, the menu closes on a link and the page starts at the top", async ({
    page,
  }) => {
    await page.setViewportSize(PHONE);
    // Images that load later would move the page after the scroll.
    await page.goto("#/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(1500);
    const menu = await openMenu(page);

    await menu.getByRole("link", { name: "Versions" }).click();

    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#\/versions$/);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("on a phone, Escape closes the menu and focus returns to the menu button", async ({
    page,
  }) => {
    await page.setViewportSize(PHONE);
    await page.goto("#/");
    const menu = await openMenu(page);

    await page.keyboard.press("Escape");

    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});

test("the header shows its links on a desktop and the menu button on a phone", async ({
  page,
}) => {
  await page.goto("#/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const menuButton = page.getByRole("button", { name: "Open menu" });

  await page.setViewportSize(DESKTOP);
  await expect(nav).toBeVisible();
  await expect(menuButton).toBeHidden();

  await page.setViewportSize(PHONE);
  await expect(nav).toBeHidden();
  await expect(menuButton).toBeVisible();
});

test("the menu closes when the window widens past the menu's breakpoint", async ({
  page,
}) => {
  await page.setViewportSize(PHONE);
  await page.goto("#/");
  const menu = await openMenu(page);

  await page.setViewportSize(DESKTOP);

  await expect(menu).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Main" })).toHaveCount(1);
});

// Test 18 (spec section 6.7).
test.describe("with reduced motion asked for", () => {
  test.use({ reducedMotion: "reduce" });

  test("opening the menu has no transition", async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("#/");

    const menu = await openMenu(page);

    const duration = await menu.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    );
    expect(duration).toBe("0s");
  });
});

// Test 10 (spec section 6.6.3, item 2).
test.describe("at 320 px", () => {
  test.use({ viewport: NARROWEST });

  test("the header, the version notice and the footer fit the screen", async ({
    page,
  }) => {
    await page.goto("#/");

    for (const selector of LAYOUT_PARTS) {
      const part = page.locator(selector);
      const box = (await part.boundingBox())!;
      expect(box.x, selector).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, selector).toBeLessThanOrEqual(NARROWEST.width);
      const overflows = await part.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      );
      expect(overflows, `${selector} scrolls sideways`).toBe(false);
    }
  });

  test("the open menu fits the screen", async ({ page }) => {
    await page.goto("#/");

    const menu = await openMenu(page);

    const box = (await menu.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(NARROWEST.width);
    const overflows = await menu.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    );
    expect(overflows).toBe(false);
  });
});

// Test 11 (spec section 6.6.1, item 2).
test.describe("accessibility", () => {
  for (const viewport of [NARROWEST, DESKTOP]) {
    test(`the header, the version notice and the footer have no violations at ${viewport.width} px`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("#/");
      await expect(page.getByRole("banner")).toBeVisible();

      let axe = new AxeBuilder({ page });
      for (const selector of LAYOUT_PARTS) {
        axe = axe.include(selector);
      }
      const results = await axe.analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test("the open menu has no violations at 320 px", async ({ page }) => {
    await page.setViewportSize(NARROWEST);
    await page.goto("#/");
    await openMenu(page);

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
