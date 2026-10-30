import { describe, expect, test, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import { docsPages } from "@/content/docsPages";
import { links } from "@/content/links";
import { renderRoute } from "@/test/renderRoute";

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

// Spec section 6.1.7, as far as release 2 goes (T22).
describe("Home", () => {
  test("shows the latest version and links Get started to the first docs page", async () => {
    await renderHome();

    expect(screen.getByText("Version 9.9.9 · MIT licence")).toBeVisible();
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      `/docs/${docsPages[0].slug}`,
    );
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

  test("shows the example in one code block, without tabs", async () => {
    await renderHome();

    const example = within(
      screen.getByRole("region", { name: "Validate a token" }),
    );
    expect(example.getByRole("figure", { name: "C#" })).toBeVisible();
    expect(example.getByText(/WithSigningKeyFromSecret/)).toBeVisible();
    expect(screen.queryByRole("tab")).toBeNull();
  });

  test("shows the author card and Why I built this", async () => {
    await renderHome();

    const section = within(
      screen.getByRole("region", { name: "Why I built this" }),
    );
    expect(
      section.getByRole("link", { name: /GitHub profile/ }),
    ).toHaveAttribute("href", links.authorProfile);
    expect(section.getAllByRole("listitem")).toHaveLength(3);
  });

  // Spec section 6.1.10, release 2: the design has no photos.
  test("shows no images", async () => {
    await renderHome();

    expect(screen.queryByRole("img")).toBeNull();
  });
});
