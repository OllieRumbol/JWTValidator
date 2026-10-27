// Plan section 7.2, tests 12 and 19: the page shell in index.html.
import { expect, test } from "@playwright/test";

const SITE_ADDRESS = "https://ollierumbol.github.io/JWTValidator/";

test.describe("with JavaScript off", () => {
  test.use({ javaScriptEnabled: false });

  // Test 12 (spec section 6.7).
  test("shows that the site needs JavaScript", async ({ page }) => {
    await page.goto("#/");

    // getByText skips text inside <noscript>, so the message is found by its role.
    const message = page.getByRole("paragraph");
    await expect(message).toBeVisible();
    await expect(message).toContainText("JWT Validator needs JavaScript.");
  });
});

// Test 19 (spec section 6.1.9).
test("has the description and the Open Graph tags, and the image exists", async ({
  page,
  request,
}) => {
  await page.goto("#/");

  const content = (selector: string) =>
    page.locator(`head meta[${selector}]`).getAttribute("content");

  const description = await content('name="description"');
  expect(description).toBeTruthy();
  expect(await content('property="og:title"')).toBe("JWT Validator");
  expect(await content('property="og:description"')).toBe(description);
  expect(await content('property="og:url"')).toBe(SITE_ADDRESS);

  // The image address is absolute, for the live site. The same path must exist in this build.
  const image = await content('property="og:image"');
  expect(image).toBe(`${SITE_ADDRESS}og-image.png`);
  const response = await request.get("og-image.png");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toBe("image/png");
});

// Plan section 3.5, "Content security policy": the build adds the policy first in the head.
test("has the content security policy before anything it covers", async ({
  page,
}) => {
  await page.goto("#/");

  const policy = page.locator(
    'head > meta[http-equiv="Content-Security-Policy"]:first-child',
  );
  await expect(policy).toHaveAttribute("content", /default-src 'self'/);
});
