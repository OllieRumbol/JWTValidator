import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/renderRoute";
import firstToken from "@examples/getting-started-first-token.cs?raw";

async function sectionOf(heading: string) {
  return within(
    (await screen.findByRole("heading", { level: 2, name: heading })).closest(
      "section",
    )!,
  );
}

// Spec section 6.1.3, "Getting started".
describe("Getting started", () => {
  test("shows the install command, labelled as a shell command", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/getting-started");

    const install = await sectionOf("Install");
    const command = within(install.getByRole("figure", { name: "Shell" }));
    await user.click(command.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(
      "dotnet add package JWTValidator",
    );
  });

  test("names .NET 10 and IdentityModel 8 as the requirements", async () => {
    renderRoute("/docs/getting-started");

    const requirements = await sectionOf("Requirements");
    const items = requirements.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(/^\.NET 10\./);
    expect(items[1]).toHaveTextContent(
      /^Version 8 of the Microsoft IdentityModel packages\./,
    );
    expect(
      requirements.getByRole("link", { name: "Migrating from 1.x" }),
    ).toHaveAttribute("href", "/docs/migrating-from-1x");
  });

  // The example is the compiled file (spec section 6.1.3, item 6).
  test("shows the compiled example", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/getting-started");

    const example = await sectionOf("Validate your first token");
    const program = within(
      example.getByRole("figure", { name: "C# · Program.cs" }),
    );
    await user.click(program.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(firstToken);
  });

  test("links each of the four parts to its docs page", async () => {
    renderRoute("/docs/getting-started");

    const parts = within(
      (await sectionOf("What the library does")).getByRole("list"),
    );
    const targets = parts
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(targets).toEqual([
      "/docs/validation-options",
      "/docs/validator",
      "/docs/expiry-checker",
      "/docs/dictionary-extensions",
    ]);
  });
});
