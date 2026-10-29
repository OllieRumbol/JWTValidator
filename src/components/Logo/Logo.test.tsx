import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import Logo from "./Logo";

function renderLogo(size?: "small" | "medium" | "large", showName?: boolean) {
  render(
    <ThemeProvider theme={theme}>
      <Logo size={size} showName={showName} />
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

  test("draws the header size by default, as in home.html", () => {
    renderLogo();

    screen.getAllByTestId("logo-bar").forEach((bar) => {
      expect(bar).toHaveStyle({ width: "10px", height: "24px" });
    });
    expect(screen.getByText("JWT Validator")).toHaveStyle({ fontSize: "20px" });
  });

  test("draws the phone header size, as in phone.html", () => {
    renderLogo("small");

    screen.getAllByTestId("logo-bar").forEach((bar) => {
      expect(bar).toHaveStyle({ width: "8px", height: "20px" });
    });
    expect(screen.getByText("JWT Validator")).toHaveStyle({ fontSize: "18px" });
  });

  test("can show the bars without the name, as the footer does", () => {
    renderLogo("medium", false);

    expect(screen.getAllByTestId("logo-bar")).toHaveLength(3);
    expect(screen.queryByText("JWT Validator")).toBeNull();
  });
});
