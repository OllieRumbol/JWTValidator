import { describe, expect, test, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { docsPages } from "@/content/docsPages";
import { renderRoute } from "@/test/renderRoute";

describe("docs page layout", () => {
  test("shows the docs list, the title, On this page, and previous and next", async () => {
    renderRoute("/docs/validator");

    const sidebar = within(
      await screen.findByRole("navigation", { name: "Documentation" }),
    );
    expect(sidebar.getByRole("link", { name: "Validator" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Validator" }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toHaveTextContent("Docs / Guides / Validator");

    const prevNext = within(
      screen.getByRole("navigation", { name: "Previous and next" }),
    );
    expect(
      prevNext.getByRole("link", { name: "Previous Validation options" }),
    ).toHaveAttribute("href", "/docs/validation-options");
    expect(
      prevNext.getByRole("link", { name: "Next Expiry checker" }),
    ).toHaveAttribute("href", "/docs/expiry-checker");
  });

  test("the first page has no previous link", async () => {
    renderRoute(`/docs/${docsPages[0].slug}`);

    const prevNext = within(
      await screen.findByRole("navigation", { name: "Previous and next" }),
    );
    expect(prevNext.getAllByRole("link")).toHaveLength(1);
    expect(prevNext.getByRole("link")).toHaveTextContent(/^Next/);
  });

  test("the last page has no next link", async () => {
    renderRoute(`/docs/${docsPages[docsPages.length - 1].slug}`);

    const prevNext = within(
      await screen.findByRole("navigation", { name: "Previous and next" }),
    );
    expect(prevNext.getAllByRole("link")).toHaveLength(1);
    expect(prevNext.getByRole("link")).toHaveTextContent(/^Previous/);
  });

  // Each section in "On this page" must be a heading on the page, with the same text,
  // or its link leads nowhere.
  test.each(docsPages.map((page) => page.slug))(
    "every section of %s in On this page is a heading on the page",
    async (slug) => {
      renderRoute(`/docs/${slug}`);

      const onThisPage = (
        await screen.findAllByRole("navigation", { name: "On this page" })
      )[0];
      const links = within(onThisPage).getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        const id = link.getAttribute("href")!.split("/").at(-1)!;
        const heading = document.getElementById(id);
        expect(heading, id).not.toBeNull();
        expect(heading!.tagName).toMatch(/^H[23]$/);
        expect(heading).toHaveTextContent(link.textContent);
      }
    },
  );

  test.each([
    ["validation-options", "Create", "create"],
    ["validator", "ValidateJWT", "validate-jwt"],
    ["expiry-checker", "HasJWTExpired", "has-jwt-expired"],
    ["dictionary-extensions", "Print", "print"],
  ])(
    "the reference of %s starts with the method table",
    async (slug, firstMethod, firstId) => {
      renderRoute(`/docs/${slug}`);

      const methods = await screen.findByRole("region", { name: "Methods" });
      // The heading's wrapper, then the table, then the reference blocks.
      const table = methods.children[1] as HTMLElement;
      expect(table).toHaveAccessibleName("Method summary");
      expect(
        within(table).getAllByRole("link")[0],
      ).toHaveAccessibleName(firstMethod);
      expect(within(table).getAllByRole("link")[0]).toHaveAttribute(
        "href",
        `/docs/${slug}/${firstId}`,
      );
    },
  );

  test("an address such as #/docs/toString shows Page not found", async () => {
    renderRoute("/docs/toString");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
  });
});

describe("section addresses", () => {
  test("opening a section address scrolls to that section", async () => {
    const scroll = vi.spyOn(Element.prototype, "scrollIntoView");
    renderRoute("/docs/validator/methods");

    await waitFor(() => {
      expect(scroll).toHaveBeenCalled();
    });
    expect(scroll.mock.contexts[0]).toHaveAttribute("id", "methods");
  });

  test("On this page links to each section, replacing the history entry", async () => {
    const user = userEvent.setup();
    const scroll = vi.spyOn(Element.prototype, "scrollIntoView");
    const router = renderRoute("/docs/validator");

    // The simulated browser shows both forms, so this takes the first.
    const onThisPage = within(
      (await screen.findAllByRole("navigation", { name: "On this page" }))[0],
    );
    await user.click(onThisPage.getByRole("link", { name: "Methods" }));

    expect(router.state.location.pathname).toBe("/docs/validator/methods");
    expect(router.state.historyAction).toBe("REPLACE");
    await waitFor(() => {
      expect(scroll.mock.contexts.at(-1)).toHaveAttribute("id", "methods");
    });
  });
});
