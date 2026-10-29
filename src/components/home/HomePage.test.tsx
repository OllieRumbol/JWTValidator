import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderRoute } from "@/test/renderRoute";

describe("Home", () => {
  test("shows the title and the How it works section", async () => {
    renderRoute("/");

    expect(
      await screen.findByRole("heading", { level: 1, name: "JWT Validator" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "How it works" }),
    ).toBeVisible();
  });
});
