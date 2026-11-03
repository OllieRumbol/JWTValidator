import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dictionaryExtensionMethods } from "@/content/methods/dictionaryExtensions";
import { renderRoute } from "@/test/renderRoute";
import claimsExample from "@examples/dictionary-extensions-claims.cs?raw";

// Spec section 6.1.3, "Dictionary extensions".
describe("Dictionary extensions", () => {
  test("gives each method's result for an empty or null dictionary", async () => {
    renderRoute("/docs/dictionary-extensions");

    const table = within(
      await screen.findByRole("region", {
        name: "Results for an empty or null dictionary",
      }),
    );
    const rows = table
      .getAllByRole("row")
      .slice(1)
      .map((row) =>
        within(row)
          .getAllByRole("cell")
          .map((cell) => cell.textContent),
      );
    expect(rows).toEqual([
      ["Print", "An empty string"],
      ["ContainsKeyAndValue", "false"],
      ["ContainsValueInList", "false"],
      ["IsEmpty", "true"],
    ]);
  });

  test("says that keys and values match exactly", async () => {
    renderRoute("/docs/dictionary-extensions");

    const section = within(
      (
        await screen.findByRole("heading", { level: 2, name: "How values match" })
      ).closest("section")!,
    );
    expect(section.getByText(/match exactly, so case matters/)).toBeVisible();
  });

  // The example is the compiled file (spec section 6.1.3, item 6).
  test("shows the compiled example", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/dictionary-extensions");

    const example = within(
      await screen.findByRole("figure", {
        name: "C# · Check and print the claims",
      }),
    );
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(claimsExample);
  });

  // Spec section 6.1.3, items 3 and 4.
  test("documents when each method fails, and what changed in 2.0.0", () => {
    expect(dictionaryExtensionMethods.map((method) => method.name)).toEqual([
      "Print",
      "ContainsKeyAndValue",
      "ContainsValueInList",
      "IsEmpty",
    ]);
    for (const method of dictionaryExtensionMethods) {
      expect(method.failsWhen, method.name).toBeTruthy();
      expect(method.changedIn2, method.name).toBeTruthy();
    }
  });
});
