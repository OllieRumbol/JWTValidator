import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import theme from "@/app/theme";
import { docsPages } from "@/content/docsPages";
import DocsNav from "./DocsNav";

// DocsNav on its own, at the given address. The docs routes come in T18.
function renderDocsNav(path: string) {
  const router = createMemoryRouter([{ path: "*", element: <DocsNav /> }], {
    initialEntries: [path],
  });
  render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

describe("DocsNav", () => {
  test("lists every docs page under its group, in reading order", () => {
    renderDocsNav("/");

    const groups = ["Get started", "Guides", "More"];
    for (const group of groups) {
      const pages = docsPages.filter((page) => page.group === group);
      const list = screen.queryByRole("list", { name: group });
      if (pages.length === 0) {
        expect(list).toBeNull();
        continue;
      }

      const titles = within(list!)
        .getAllByRole("link")
        .map((link) => link.textContent);
      expect(titles).toEqual(pages.map((page) => page.title));
    }
  });

  test("marks the current page", () => {
    renderDocsNav("/docs/validator");

    expect(screen.getByRole("link", { name: "Validator" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Expiry checker" }),
    ).not.toHaveAttribute("aria-current");
  });
});
