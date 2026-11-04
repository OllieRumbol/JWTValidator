import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import { versions } from "@/content/versions";
import { renderRoute } from "@/test/renderRoute";

async function renderVersions() {
  renderRoute("/versions");
  return within(
    await screen.findByRole("list", {
      name: "Released versions, newest first",
    }),
  );
}

// Plan section 7.2, test 4, the page part (spec sections 6.1.6 and 6.2.4). The data
// part is in src/content/versions.test.ts.
describe("Versions", () => {
  test("lists only released versions, newest first", async () => {
    const list = await renderVersions();

    const numbers = list
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(numbers).toEqual(["2.0.0", "1.0.3", "1.0.2", "1.0.1", "1.0.0"]);
    expect(list.queryByText("1.0.4")).toBeNull();
    expect(list.queryByText("1.0.5")).toBeNull();
  });

  test("shows each version's date, status and changes", async () => {
    const list = await renderVersions();

    for (const version of versions) {
      const entry = within(
        list.getByRole("article", { name: version.version }),
      );
      expect(entry.getByText(version.published)).toBeVisible();
      expect(entry.getByText(version.status)).toBeVisible();
      expect(entry.getAllByRole("listitem")).toHaveLength(
        version.changes.length + (version.breakingChanges?.length ?? 0),
      );
    }
  });

  test('shows "2022" for 1.0.0, and its status is Unlisted', async () => {
    const list = await renderVersions();

    const entry = within(list.getByRole("article", { name: "1.0.0" }));
    expect(entry.getByText("2022")).toBeVisible();
    expect(entry.getByText("Unlisted")).toBeVisible();
  });

  // Spec section 6.1.6, item 4.
  test("shows the breaking changes of 2.0.0 first, then its other changes, and links to the migration guide", async () => {
    const list = await renderVersions();
    const entry = within(list.getByRole("article", { name: "2.0.0" }));

    const headings = entry
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual(["Breaking changes", "Other changes"]);
    const [breakingChanges, otherChanges] = entry.getAllByRole("list");
    expect(within(breakingChanges).getAllByRole("listitem")).toHaveLength(6);
    expect(within(otherChanges).getAllByRole("listitem")).toHaveLength(2);
    expect(
      entry.getByRole("link", { name: "Read the migration guide" }),
    ).toHaveAttribute("href", "/docs/migrating-from-1x");
  });

  test("gives no other version breaking changes or a migration guide link", async () => {
    const list = await renderVersions();

    for (const version of ["1.0.3", "1.0.2", "1.0.1", "1.0.0"]) {
      const entry = within(list.getByRole("article", { name: version }));
      expect(entry.queryByRole("heading", { level: 3 })).toBeNull();
      expect(entry.queryByRole("link")).toBeNull();
    }
  });

  test("shows the text in backticks as code", async () => {
    const list = await renderVersions();
    const entry = within(list.getByRole("article", { name: "1.0.3" }));

    expect(entry.getByText("JWTExpiryChecker").tagName).toBe("CODE");
    expect(entry.queryByText(/`/)).toBeNull();
  });

  // Spec section 4.1, item 11: the old page showed features as disabled checkboxes.
  test("has no checkboxes", async () => {
    await renderVersions();

    expect(screen.queryByRole("checkbox")).toBeNull();
  });
});
