import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import Logo from "./Logo";

function renderLogo(size?: "medium" | "large") {
  render(
    <ThemeProvider theme={theme}>
      <Logo size={size} />
    </ThemeProvider>,
  );
}

describe("Logo", () => {
  test("shows the site name, and hides the bars from screen readers", () => {
    renderLogo();

    expect(screen.getByText("JWT Validator")).toBeVisible();
    const bars = screen.getAllByTestId("logo-bar");
    expect(bars).toHaveLength(3);
    expect(bars[0].parentElement).toHaveAttribute("aria-hidden", "true");
  });

  test("draws the bars in the theme's logo colours, at the size in logo.png", () => {
    renderLogo("large");

    const bars = screen.getAllByTestId("logo-bar");
    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle({
        backgroundColor: theme.tokens.logoBars[index],
        width: "13px",
        height: "32px",
      });
    });
    expect(screen.getByText("JWT Validator")).toHaveStyle({
      fontSize: "28px",
      fontWeight: "700",
    });
  });
});
