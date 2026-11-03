import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validationOptionsMethods } from "@/content/methods/validationOptions";
import { renderRoute } from "@/test/renderRoute";
import googleExample from "@examples/validation-options-google.cs?raw";

async function sectionOf(heading: string) {
  return within(
    (await screen.findByRole("heading", { level: 2, name: heading })).closest(
      "section",
    )!,
  );
}

// Spec section 6.1.3, "Validation options" and "Secret length".
describe("Validation options", () => {
  test("shows the minimum secret length for each algorithm", async () => {
    renderRoute("/docs/validation-options");

    const table = within(
      await screen.findByRole("region", { name: "Minimum secret length" }),
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
      ["HS256", "32 bytes"],
      ["HS384", "48 bytes"],
      ["HS512", "64 bytes"],
    ]);
  });

  test("says that a short secret no longer validates, and links to the migration guide", async () => {
    renderRoute("/docs/validation-options");

    const section = await sectionOf("Choose a signing key");
    const note = within(section.getAllByRole("note")[0]);
    expect(note.getByText(/no longer validates/)).toBeVisible();
    expect(
      note.getByRole("link", { name: "Read the migration guide" }),
    ).toHaveAttribute("href", "/docs/migrating-from-1x");
  });

  test("states the 5-minute clock skew of WithExpiryDate", async () => {
    renderRoute("/docs/validation-options");

    const section = await sectionOf("Add checks and build");
    expect(section.getByText(/clock skew of 5\s+minutes/)).toBeVisible();
  });

  // The example is the compiled file (spec section 6.1.3, item 6).
  test("shows the compiled example", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/validation-options");

    const example = within(
      await screen.findByRole("figure", {
        name: "C# · An ID token from Google",
      }),
    );
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(googleExample);
  });

  test("gives the order of the methods", async () => {
    renderRoute("/docs/validation-options");

    const section = await sectionOf("The order of the methods");
    const steps = section
      .getAllByRole("listitem")
      .map((step) => step.textContent);
    expect(steps[0]).toMatch(/^Create\(\) comes first/);
    expect(steps.at(-1)).toMatch(/^Build\(\) comes last/);
  });

  // Spec section 6.1.3, items 3 and 4.
  test("documents when each method fails, and what changed in 2.0.0", () => {
    for (const method of validationOptionsMethods) {
      expect(method.failsWhen, method.name).toBeTruthy();
    }
    const changed = validationOptionsMethods
      .filter((method) => method.changedIn2)
      .map((method) => method.name);
    expect(changed).toContain("WithSigningKeyFromSecret");
  });
});
