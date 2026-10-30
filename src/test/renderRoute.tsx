import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "@/app/router";
import theme from "@/app/theme";

// Renders the whole site at the given address, with the theme that src/main.tsx applies.
// Each call gets its own router, so no test depends on where another one left off.
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
  return router;
}
