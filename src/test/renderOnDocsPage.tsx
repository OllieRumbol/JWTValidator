import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import theme from "@/app/theme";

// Renders one component as if it were on a docs page, at the docs route in plan section
// 3.3, with the site's theme. Returns the router, so a test can read the address.
export function renderOnDocsPage(element: ReactNode, path = "/docs/validator") {
  const router = createMemoryRouter(
    [{ path: "/docs/:slug/:section?", element }],
    { initialEntries: [path] },
  );
  render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
  return router;
}
