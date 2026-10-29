import { describe, expect, test } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { links } from "@/content/links";
import { renderRoute } from "@/test/renderRoute";

// The simulated browser applies no media queries, so the header links and the menu
// button are both present here. The end-to-end tests check which one shows at each width.

async function openMenu() {
  const user = userEvent.setup();
  const menuButton = await screen.findByRole("button", { name: "Open menu" });
  await user.click(menuButton);
  const menu = screen.getByRole("dialog", { name: "Menu" });
  return { user, menuButton, menu };
}

async function expectMenuClosed(menuButton: HTMLElement) {
  await waitFor(() => {
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull();
  });
  await waitFor(() => {
    expect(menuButton).toHaveFocus();
  });
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
}

describe("Header", () => {
  test("links to Home, the docs, Versions, NuGet and the library repository", async () => {
    renderRoute("/");

    const header = within(await screen.findByRole("banner"));
    const nav = within(header.getByRole("navigation", { name: "Main" }));
    expect(header.getByRole("link", { name: "JWT Validator" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(nav.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(nav.getByRole("link", { name: "Versions" })).toHaveAttribute(
      "href",
      "/versions",
    );
    expect(
      nav.getByRole("link", { name: "NuGet, leaves this site" }),
    ).toHaveAttribute("href", links.nugetPackage);
    expect(
      nav.getByRole("link", { name: "GitHub, leaves this site" }),
    ).toHaveAttribute("href", links.libraryRepository);
  });

  test("opens links to other sites in the same tab", async () => {
    renderRoute("/");

    const header = within(await screen.findByRole("banner"));
    for (const link of header.getAllByRole("link")) {
      expect(link).not.toHaveAttribute("target");
    }
  });
});

// Plan section 7.2, test 3 (spec section 6.1.2, items 2 to 4).
describe("Menu", () => {
  test("opens from the menu button and moves focus into the panel", async () => {
    renderRoute("/");

    const { menuButton, menu } = await openMenu();

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).toContainElement(document.activeElement as HTMLElement);
  });

  test("holds every header link and the docs list", async () => {
    renderRoute("/");

    const { menu } = await openMenu();

    const nav = within(within(menu).getByRole("navigation", { name: "Main" }));
    expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(nav.getByRole("link", { name: "Versions" })).toBeVisible();
    expect(
      nav.getByRole("link", { name: "NuGet package, leaves this site" }),
    ).toHaveAttribute("href", links.nugetPackage);
    expect(
      nav.getByRole("link", { name: "GitHub, leaves this site" }),
    ).toHaveAttribute("href", links.libraryRepository);
    expect(nav.getByRole("list", { name: "Guides" })).toBeVisible();
    expect(nav.getByRole("link", { name: "Validator" })).toHaveAttribute(
      "href",
      "/docs/validator",
    );
  });

  test("closes when the reader selects a link, and shows that page", async () => {
    const router = renderRoute("/");
    const { user, menuButton, menu } = await openMenu();

    await user.click(within(menu).getByRole("link", { name: "Versions" }));

    await expectMenuClosed(menuButton);
    expect(router.state.location.pathname).toBe("/versions");
  });

  test("closes on the close button", async () => {
    renderRoute("/");
    const { user, menuButton, menu } = await openMenu();

    await user.click(within(menu).getByRole("button", { name: "Close menu" }));

    await expectMenuClosed(menuButton);
  });

  test("closes on Escape", async () => {
    renderRoute("/");
    const { user, menuButton } = await openMenu();

    await user.keyboard("{Escape}");

    await expectMenuClosed(menuButton);
  });

  test("closes when the reader selects outside the panel", async () => {
    renderRoute("/");
    const { user, menuButton } = await openMenu();

    // The backdrop is hidden from screen readers, so it has no role to find it by.
    const backdrop = document.querySelector(".MuiBackdrop-root")!;
    await user.click(backdrop);

    await expectMenuClosed(menuButton);
  });
});
