import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import theme from "@/app/theme";
import SectionHeading from "./SectionHeading";

// The site's own hash router, so the copied address is the real one, with the hash.
function renderHeading() {
  window.location.hash = "#/docs/validation-options";
  const router = createHashRouter([
    {
      path: "/docs/:slug/:section?",
      element: (
        <SectionHeading id="minimum-secret-length" level={3}>
          Minimum secret length
        </SectionHeading>
      ),
    },
  ]);
  render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
  return router;
}

const SECTION_ADDRESS = `${window.location.origin}/#/docs/validation-options/minimum-secret-length`;

afterEach(() => {
  window.location.hash = "";
});

describe("SectionHeading", () => {
  test("is a heading named by its text only, with the id in its address", async () => {
    renderHeading();

    const heading = await screen.findByRole("heading", {
      level: 3,
      name: "Minimum secret length",
    });
    expect(heading).toHaveAttribute("id", "minimum-secret-length");
    expect(
      screen.getByRole("link", {
        name: "Link to this section: Minimum secret length",
      }),
    ).toHaveAttribute(
      "href",
      "#/docs/validation-options/minimum-secret-length",
    );
  });

  // Plan section 7.2, test 16 (spec section 6.1.1, item 6).
  test("the section link copies the full address and shows Link copied", async () => {
    const user = userEvent.setup();
    const router = renderHeading();

    await user.click(
      await screen.findByRole("link", { name: /Link to this section/ }),
    );

    expect(await navigator.clipboard.readText()).toBe(SECTION_ADDRESS);
    // The pill on screen. The live region holds the same words for screen readers.
    expect(
      screen.getByText("Link copied", { ignore: '[role="status"]' }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Link copied");
    // The address stays the same: the link copied it and did not open it.
    expect(router.state.location.pathname).toBe("/docs/validation-options");
  });

  test("the section link opens the address when the clipboard rejects the write", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("Blocked by the browser"),
    );
    const router = renderHeading();

    await user.click(
      await screen.findByRole("link", { name: /Link to this section/ }),
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(
        "/docs/validation-options/minimum-secret-length",
      );
    });
    expect(router.state.historyAction).toBe("REPLACE");
    expect(
      screen.queryByText("Link copied", { ignore: '[role="status"]' }),
    ).toBeNull();
  });
});
