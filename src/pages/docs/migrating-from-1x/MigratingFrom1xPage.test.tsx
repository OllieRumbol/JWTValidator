import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/renderRoute";
import secretBefore from "@examples/migrating-from-1x-secret-before.cs?raw";

// Spec section 6.1.3, "Migration from 1.x", and spec section 2: the six changes.
const changeSections = [
  ["net-10", ".NET 10 only"],
  ["minimum-secret-length", "Minimum secret length"],
  ["expiry-in-utc", "Expiry in UTC"],
  ["isempty", "IsEmpty on null"],
  ["logging", "Logging stays off"],
  ["identitymodel-8", "IdentityModel 8"],
];

describe("Migrating from 1.x", () => {
  test("lists the six changes in the summary table, each linking to its section", async () => {
    renderRoute("/docs/migrating-from-1x");

    const table = within(
      await screen.findByRole("region", {
        name: "Changes, who they affect, and what to do",
      }),
    );
    const rows = table.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(changeSections.length);
    changeSections.forEach(([id, name], index) => {
      const link = within(rows[index]).getByRole("link");
      expect(link).toHaveTextContent(name);
      expect(link).toHaveAttribute("href", `/docs/migrating-from-1x/${id}`);
      expect(document.getElementById(id)?.tagName).toBe("H2");
    });
  });

  test('says who each change affects, under "Affects you if"', async () => {
    renderRoute("/docs/migrating-from-1x");

    await screen.findByRole("heading", { level: 1 });
    expect(screen.getAllByText("Affects you if", { selector: "p" })).toHaveLength(
      changeSections.length,
    );
  });

  test("shows the 1.0.3 and 2.0.0 code of a change from the compiled examples", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/migrating-from-1x");

    const section = within(
      (await screen.findByRole("heading", { name: "Minimum secret length" }))
        .closest("section")!,
    );
    const before = within(section.getByRole("figure", { name: "C# · 1.0.3" }));
    expect(section.getByRole("figure", { name: "C# · 2.0.0" })).toBeVisible();
    await user.click(before.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(secretBefore);
  });

  test("lists the two other changes", async () => {
    renderRoute("/docs/migrating-from-1x");

    const section = within(
      (await screen.findByRole("heading", { name: "Other changes" })).closest(
        "section",
      )!,
    );
    expect(section.getAllByRole("listitem")).toHaveLength(2);
  });
});
