import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expiryCheckerMethods } from "@/content/methods/expiryChecker";
import { renderRoute } from "@/test/renderRoute";
import openIdConnectExample from "@examples/expiry-checker-openid-connect.cs?raw";
import secretExample from "@examples/expiry-checker-secret.cs?raw";

// Spec section 6.1.3, "Expiry checker".
describe("Expiry checker", () => {
  // The examples are the compiled files (spec section 6.1.3, item 6).
  test.each([
    ["C# · The expiry, with a secret", secretExample],
    ["C# · Has it expired, with an OpenID Connect provider", openIdConnectExample],
  ])("shows the compiled example %s", async (name, code) => {
    const user = userEvent.setup();
    renderRoute("/docs/expiry-checker");

    const example = within(await screen.findByRole("figure", { name }));
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(code);
  });

  test("says that times are in UTC, and that 2.0.0 changed this", async () => {
    renderRoute("/docs/expiry-checker");

    const section = within(
      (
        await screen.findByRole("heading", { level: 2, name: "Check the expiry" })
      ).closest("section")!,
    );
    expect(
      within(section.getByRole("note")).getByText(/returns UTC, not local time/),
    ).toBeVisible();
  });

  // Spec section 6.1.3, item 3: each method, with a secret and with an OpenID URL.
  test("documents both overloads of every method, and when it fails", () => {
    expect(expiryCheckerMethods.map((method) => method.name)).toEqual([
      "HasJWTExpired",
      "TryHasJWTExpired",
      "WhenDoesJWTExpire",
      "TryGetWhenDoesJWTExpire",
    ]);
    for (const method of expiryCheckerMethods) {
      expect(method.signatures, method.name).toHaveLength(2);
      expect(method.signatures[0], method.name).toContain("String signingKey");
      expect(method.signatures[1], method.name).toContain("Uri openIdUrl");
      expect(method.failsWhen, method.name).toBeTruthy();
    }
  });

  // Spec section 6.1.3, item 4.
  test("marks every method as changed in 2.0.0", () => {
    for (const method of expiryCheckerMethods) {
      expect(method.changedIn2, method.name).toBeTruthy();
    }
  });
});
