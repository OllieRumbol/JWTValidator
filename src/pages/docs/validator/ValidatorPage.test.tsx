import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validatorMethods } from "@/content/methods/validator";
import { renderRoute } from "@/test/renderRoute";
import tryValidateExample from "@examples/validator-try-validate-jwt.cs?raw";
import validateExample from "@examples/validator-validate-jwt.cs?raw";

// Spec section 6.1.3, "Validator".
describe("Validator", () => {
  // The examples are the compiled files (spec section 6.1.3, item 6).
  test.each([
    ["C# · TryValidateJWT", tryValidateExample],
    ["C# · ValidateJWT", validateExample],
  ])("shows the compiled %s example", async (name, code) => {
    const user = userEvent.setup();
    renderRoute("/docs/validator");

    const example = within(await screen.findByRole("figure", { name }));
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(code);
  });

  test("lists what ValidateJWT throws, including a failed download", async () => {
    renderRoute("/docs/validator");

    const list = within(
      await screen.findByRole("list", { name: "Exceptions from ValidateJWT" }),
    );
    const names = list
      .getAllByRole("listitem")
      .map((item) => item.querySelector("code")!.textContent);
    expect(names).toContain("ArgumentException");
    expect(names).toContain("SecurityTokenExpiredException");
    expect(names).toContain("AggregateException");
    expect(
      screen.getByRole("heading", { level: 2, name: "A failed download" }),
    ).toBeVisible();
  });

  test("links to Claims for the shape of the dictionary", async () => {
    renderRoute("/docs/validator");

    const section = within(
      (
        await screen.findByRole("heading", { level: 2, name: "Choose a method" })
      ).closest("section")!,
    );
    expect(section.getByRole("link", { name: "Claims" })).toHaveAttribute(
      "href",
      "/docs/claims",
    );
  });

  // Spec section 6.1.3, item 3.
  test("documents when each method fails", () => {
    for (const method of validatorMethods) {
      expect(method.failsWhen, method.name).toBeTruthy();
    }
  });
});
