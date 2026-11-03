import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/renderRoute";
import showPiiExample from "@examples/debugging-show-pii.cs?raw";

// Spec section 6.1.3, "Debugging".
describe("Debugging", () => {
  // The example is the compiled file (spec section 6.1.3, item 6).
  test("shows the compiled example that turns on personal data", async () => {
    const user = userEvent.setup();
    renderRoute("/docs/debugging");

    const example = within(
      await screen.findByRole("figure", {
        name: "C# · Turn on personal data while you debug",
      }),
    );
    await user.click(example.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(showPiiExample);
    expect(showPiiExample).toContain("IdentityModelEventSource.ShowPII = true;");
  });

  test("says that 2.0.0 no longer turns it on", async () => {
    renderRoute("/docs/debugging");

    const note = within(await screen.findByRole("note"));
    expect(note.getByText(/no longer turns on personal data/)).toBeVisible();
  });
});
