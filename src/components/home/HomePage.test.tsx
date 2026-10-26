import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router/dom";
import router from "@/app/router";

describe("Home", () => {
  test("shows the title and the How it works section", async () => {
    window.location.hash = "#/";
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { level: 1, name: "JWT Validator" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "How it works" }),
    ).toBeVisible();
  });

  test("opens the documentation menu with a link to each page", async () => {
    const user = userEvent.setup();
    window.location.hash = "#/";
    render(<RouterProvider router={router} />);

    await user.click(
      await screen.findByRole("button", { name: "Documentation" }),
    );

    const menu = screen.getByRole("menu");
    expect(menu).toHaveTextContent("Builder");
    expect(menu).toHaveTextContent("Validator");
    expect(menu).toHaveTextContent("Expiry Checker");
    expect(menu).toHaveTextContent("Dictionary Extensions");
  });
});
