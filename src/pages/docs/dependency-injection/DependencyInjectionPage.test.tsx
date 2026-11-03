import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/renderRoute";
import registerExample from "@examples/di-register-services.cs?raw";

// Spec section 6.1.3, "Dependency injection".
describe("Dependency injection", () => {
  // The example is the compiled di- file (spec section 6.1.3, item 6, plan section 3.5).
  test("shows the compiled registration example", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/dependency-injection");

    const example = within(
      await screen.findByRole("figure", {
        name: "C# · Register the services and use them in a class",
      }),
    );
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(registerExample);
  });

  test("documents IJWTValidator and the JWTExpiryChecker(IJWTValidator) constructor", async () => {
    renderRoute("/docs/dependency-injection");

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "The IJWTValidator interface",
      }),
    ).toBeVisible();
    // The signature is split across highlighting spans, so this reads the block's text.
    expect(
      screen.getByRole("region", { name: "JWTExpiryChecker" }),
    ).toHaveTextContent("public JWTExpiryChecker(IJWTValidator jwtValidator)");
  });

  // IJWTExpiryChecker is internal to the library (spec section 6.1.3).
  test("does not name the internal IJWTExpiryChecker", async () => {
    renderRoute("/docs/dependency-injection");

    await screen.findByRole("heading", { level: 1 });
    expect(document.body.textContent).not.toContain("IJWTExpiryChecker");
  });
});
