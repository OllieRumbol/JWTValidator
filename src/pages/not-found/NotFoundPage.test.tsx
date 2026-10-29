import { describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { docsPages } from "@/content/docsPages";
import { renderRoute } from "@/test/renderRoute";

describe("Page not found", () => {
  test("links to Home", async () => {
    const user = userEvent.setup();
    const router = renderRoute("/no-such-page");

    await user.click(await screen.findByRole("link", { name: "Go to Home" }));

    expect(router.state.location.pathname).toBe("/");
  });

  test("links to the docs", async () => {
    const user = userEvent.setup();
    const router = renderRoute("/no-such-page");

    await user.click(
      await screen.findByRole("link", { name: "Browse the docs" }),
    );

    // "/docs" redirects to the first docs page.
    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/docs/${docsPages[0].slug}`);
    });
  });
});
