import { describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { docsPages } from "@/content/docsPages";
import { renderRoute } from "@/test/renderRoute";

// Plan section 7.2, test 6 (spec section 6.1.1, item 9).
describe("tab titles", () => {
  const pages = [
    { path: "/", title: "JWT Validator" },
    { path: "/versions", title: "Versions — JWT Validator" },
    ...docsPages.map((page) => ({
      path: `/docs/${page.slug}`,
      title: `${page.title} — JWT Validator`,
    })),
    { path: "/no-such-page", title: "Page not found — JWT Validator" },
  ];

  test.each(pages)("$path sets the title $title", async ({ path, title }) => {
    renderRoute(path);

    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});

// Spec section 6.1.3, item 1: the documentation describes version 2.0.0 only.
describe("the layout", () => {
  test("does not say that the site still describes version 1.0.3", async () => {
    renderRoute("/");

    await screen.findByRole("heading", { level: 1 });
    expect(document.body.textContent).not.toContain("still describes");
  });
});

describe("routes", () => {
  test.each([
    ["/docs", `/docs/${docsPages[0].slug}`],
    ["/documentation/builder", "/docs/validation-options"],
    ["/documentation/validator", "/docs/validator"],
    ["/documentation/expiry", "/docs/expiry-checker"],
    ["/documentation/dictionary", "/docs/dictionary-extensions"],
  ])("%s redirects to %s, replacing the history entry", async (from, to) => {
    const router = renderRoute(from);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(to);
    });
    expect(router.state.historyAction).toBe("REPLACE");
  });

  test("a section address shows its docs page", async () => {
    renderRoute("/docs/validator/some-section");

    await waitFor(() => {
      expect(document.title).toBe("Validator — JWT Validator");
    });
  });

  test.each(["/no-such-page", "/docs/no-such-page", "/docs/reference"])(
    '%s shows "Page not found"',
    async (path) => {
      renderRoute(path);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: "Page not found",
        }),
      ).toBeVisible();
    },
  );
});
