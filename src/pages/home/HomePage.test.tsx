import { describe, expect, test, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { docsPages, MIGRATION_GUIDE_PATH } from "@/content/docsPages";
import { links } from "@/content/links";
import { renderRoute } from "@/test/renderRoute";
import openIdConnectExample from "@examples/home-openid-connect.cs?raw";
import secretExample from "@examples/home-secret.cs?raw";

// A version that does not exist, so the test fails if the badge types the real number
// itself instead of reading it from the versions data.
vi.mock("@/content/versions", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/content/versions")>()),
  latestVersion: "9.9.9",
}));

async function renderHome() {
  renderRoute("/");
  await screen.findByRole("heading", {
    level: 1,
    name: "Validate a JWT in C#, in a few readable lines.",
  });
}

// Spec section 6.1.7.
describe("Home", () => {
  test("shows the latest version and links Get started to the first docs page", async () => {
    await renderHome();

    expect(
      screen.getByText("Version 9.9.9 · .NET 10 · MIT licence"),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      `/docs/${docsPages[0].slug}`,
    );
    expect(
      screen.getByRole("link", { name: "Migrating from 1.x" }),
    ).toHaveAttribute("href", MIGRATION_GUIDE_PATH);
  });

  test("shows the install command with its own Copy button", async () => {
    await renderHome();

    expect(screen.getByText("dotnet add package JWTValidator")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Copy install command" }),
    ).toBeVisible();
  });

  test("links each of the four parts to its docs page", async () => {
    await renderHome();

    const parts = within(
      screen.getByRole("region", { name: "Four small parts" }),
    );
    const headings = parts
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual([
      "Options builder",
      "Validator",
      "Expiry checker",
      "Dictionary extensions",
    ]);
    // Each link goes to a docs page that exists, and each part to its own page.
    const docsPaths = docsPages.map((page) => `/docs/${page.slug}`);
    const targets = parts
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(targets).toHaveLength(4);
    expect(new Set(targets).size).toBe(4);
    for (const target of targets) {
      expect(docsPaths).toContain(target);
    }
  });

  // Each tab shows its compiled file (spec section 6.1.3, item 6), OpenID Connect first.
  test("shows the OpenID Connect and secret examples in tabs", async () => {
    const user = userEvent.setup();
    await renderHome();

    const example = within(
      screen.getByRole("region", { name: "Validate a token in a console app" }),
    );
    const tabs = example.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "OpenID Connect",
      "Secret",
    ]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    for (const [tab, code] of [
      ["OpenID Connect", openIdConnectExample],
      ["Secret", secretExample],
    ]) {
      await user.click(example.getByRole("tab", { name: tab }));
      await user.click(example.getByRole("button", { name: "Copy code" }));
      expect(await navigator.clipboard.readText()).toBe(code);
    }
  });

  test("says what is new in 2.0.0 and links to the migration guide", async () => {
    await renderHome();

    const section = within(
      screen.getByRole("region", { name: "Same names. Safer behaviour." }),
    );
    const rows = within(
      section.getByRole("region", { name: "Changes in 2.0.0, and what to do" }),
    )
      .getAllByRole("row")
      .slice(1);
    // The six changes in spec section 2, named as the migration guide names them.
    const names = rows.map(
      (row) => within(row).getAllByRole("cell")[0].textContent,
    );
    expect(names).toEqual([
      ".NET 10 only",
      "Minimum secret length",
      "Expiry in UTC",
      "IsEmpty on null",
      "Logging stays off",
      "IdentityModel 8",
    ]);
    expect(
      section.getByRole("link", { name: "Read the migration guide" }),
    ).toHaveAttribute("href", MIGRATION_GUIDE_PATH);
  });

  test("shows the author card and Why I built this", async () => {
    await renderHome();

    const section = within(
      screen.getByRole("region", { name: "Why I built this" }),
    );
    expect(
      section.getByRole("link", { name: /GitHub profile/ }),
    ).toHaveAttribute("href", links.authorProfile);
    expect(section.getByText(/^I built JWT Validator/)).toBeVisible();
  });

  // Spec section 6.1.10, release 2: the design has no photos.
  test("shows no images", async () => {
    await renderHome();

    expect(screen.queryByRole("img")).toBeNull();
  });
});
