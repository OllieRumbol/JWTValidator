import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/renderRoute";
import readExample from "@examples/claims-read.cs?raw";

// Spec section 6.1.3, "Claims".
describe("Claims", () => {
  test("shows how each kind of value appears in the dictionary", async () => {
    renderRoute("/docs/claims");

    const table = within(
      await screen.findByRole("region", {
        name: "Claim values in the dictionary",
      }),
    );
    const kinds = table
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[0].textContent);
    expect(kinds).toEqual([
      "A string",
      "An array",
      "A number",
      "A boolean",
      "A nested object",
      "A null value",
      "A time",
    ]);
  });

  test("names the times exp, nbf and iat", async () => {
    renderRoute("/docs/claims");

    const section = within(
      (
        await screen.findByRole("heading", { level: 2, name: "Times" })
      ).closest("section")!,
    );

    for (const name of ["exp", "nbf", "iat"]) {
      expect(section.getByText(name)).toBeVisible();
    }
  });

  // The example is the compiled file (spec section 6.1.3, item 6).
  test("shows the compiled example", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/claims");

    const example = within(
      await screen.findByRole("figure", {
        name: "C# · Read a claim, an array and a time",
      }),
    );
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(readExample);
  });
});
