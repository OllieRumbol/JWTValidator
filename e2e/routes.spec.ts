// Addresses in a real browser: plan section 7.2, test 8, and "Page not found" in tests 10
// and 11.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Spec section 6.2.1, with the address each one ends on, the page's tab title, and a
// heading only that page has.
const addresses = [
  {
    from: "",
    to: /JWTValidator\/(#\/)?$/,
    title: "JWT Validator",
    heading: "Four small parts",
  },
  {
    from: "#/",
    to: /#\/$/,
    title: "JWT Validator",
    heading: "Four small parts",
  },
  {
    from: "#/versions",
    to: /#\/versions$/,
    title: "Versions — JWT Validator",
    heading: "Versions",
  },
  {
    from: "#/documentation/builder",
    to: /#\/docs\/validation-options$/,
    title: "Validation options — JWT Validator",
    heading: "Technical Details",
  },
  {
    from: "#/documentation/validator",
    to: /#\/docs\/validator$/,
    title: "Validator — JWT Validator",
    heading: "TryValidateJWT",
  },
  {
    from: "#/documentation/expiry",
    to: /#\/docs\/expiry-checker$/,
    title: "Expiry checker — JWT Validator",
    heading: "TryHasJWTExpired",
  },
  {
    from: "#/documentation/dictionary",
    to: /#\/docs\/dictionary-extensions$/,
    title: "Dictionary extensions — JWT Validator",
    heading: "ContainsKeyAndValue",
  },
  {
    from: "#/docs",
    to: /#\/docs\/validation-options$/,
    title: "Validation options — JWT Validator",
    heading: "Technical Details",
  },
  {
    from: "#/no-such-page",
    to: /#\/no-such-page$/,
    title: "Page not found — JWT Validator",
    heading: "Page not found",
  },
];

// Test 8 (spec sections 6.1.1, items 2, 3 and 8, and 6.2.1).
test.describe("addresses (test 8)", () => {
  for (const { from, to, title, heading } of addresses) {
    test(`"${from || "(nothing)"}" shows the right page`, async ({ page }) => {
      await page.goto(from);

      await expect(page).toHaveURL(to);
      await expect(page).toHaveTitle(title);
      await expect(
        page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    });
  }

  test("an old address is replaced, so Back does not return to it", async ({
    page,
  }) => {
    await page.goto("#/");
    await page.goto("#/documentation/builder");
    await expect(page).toHaveURL(/#\/docs\/validation-options$/);

    await page.goBack();

    await expect(page).toHaveURL(/#\/$/);
  });

  test("an unknown docs page shows Page not found", async ({ page }) => {
    await page.goto("#/docs/no-such-page");

    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
  });

  test("Page not found links to Home", async ({ page }) => {
    await page.goto("#/no-such-page");

    await page.getByRole("link", { name: "Go to Home" }).click();

    await expect(page).toHaveURL(/#\/$/);
    await expect(page).toHaveTitle("JWT Validator");
  });
});

// "Page not found" is the first page in the new design, so the whole page is checked.
test.describe("Page not found", () => {
  // Test 10 (spec section 6.6.3, item 2).
  test("does not scroll sideways at 320 px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("#/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const pageWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(pageWidth).toBeLessThanOrEqual(320);
  });

  // Test 11 (spec section 6.6.1, item 2).
  for (const width of [320, 1280]) {
    test(`has no accessibility violations at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("#/no-such-page");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
