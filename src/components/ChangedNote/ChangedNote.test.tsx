import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import ChangedNote from "./ChangedNote";

describe("ChangedNote", () => {
  test("says what changed in 2.0.0 and links to the migration guide", async () => {
    renderOnDocsPage(<ChangedNote>Expiry times are now in UTC.</ChangedNote>);

    const note = within(await screen.findByRole("note"));
    expect(note.getByText("Changed in 2.0.0")).toBeVisible();
    expect(note.getByText(/Expiry times are now in UTC\./)).toBeVisible();
    expect(
      note.getByRole("link", { name: "Read the migration guide" }),
    ).toHaveAttribute("href", "/docs/migrating-from-1x");
  });
});
