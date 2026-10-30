import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { DocsSection } from "@/content/docsPages";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import OnThisPage from "./OnThisPage";

const sections: DocsSection[] = [
  { id: "choose-a-signing-key", title: "Choose a signing key", level: 2 },
  { id: "minimum-secret-length", title: "Minimum secret length", level: 3 },
  { id: "reference", title: "Reference", level: 2 },
];

describe("OnThisPage", () => {
  test("links each section to its address, and marks the first at the top of the page", async () => {
    renderOnDocsPage(<OnThisPage sections={sections} variant="column" />);

    const links = await screen.findAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/docs/validator/choose-a-signing-key",
      "/docs/validator/minimum-secret-length",
      "/docs/validator/reference",
    ]);
    expect(links[0]).toHaveAttribute("aria-current", "location");
  });

  test("marks the section in the address", async () => {
    renderOnDocsPage(
      <OnThisPage sections={sections} variant="column" />,
      "/docs/validator/reference",
    );

    expect(
      await screen.findByRole("link", { name: "Reference" }),
    ).toHaveAttribute("aria-current", "location");
    expect(
      screen.getByRole("link", { name: "Choose a signing key" }),
    ).not.toHaveAttribute("aria-current");
  });

  test("the box form opens and closes", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<OnThisPage sections={sections} variant="box" />);

    const button = await screen.findByRole("button", { name: "On this page" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Reference" })).toBeVisible();

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Reference" })).toBeNull();
  });
});
