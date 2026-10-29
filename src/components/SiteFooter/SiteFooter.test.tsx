import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import { links } from "@/content/links";
import { latestVersion } from "@/content/versions";
import { renderRoute } from "@/test/renderRoute";

describe("Footer", () => {
  // Plan section 7.2, test 7 (spec section 6.1.2, item 6).
  test("shows the newest version from the versions data", async () => {
    renderRoute("/");

    const footer = within(await screen.findByRole("contentinfo"));
    expect(
      footer.getByText(`JWT Validator ${latestVersion} · MIT licence`),
    ).toBeVisible();
  });

  test("links to the library, the package, this site's repository and the licence", async () => {
    renderRoute("/");

    const nav = within(
      await screen.findByRole("navigation", { name: "Footer" }),
    );
    const expected = [
      ["Library on GitHub", links.libraryRepository],
      ["NuGet package", links.nugetPackage],
      ["Site repository", links.siteRepository],
      ["Licence", links.licence],
    ];
    for (const [label, href] of expected) {
      const link = nav.getByRole("link", {
        name: `${label}, leaves this site`,
      });
      expect(link).toHaveAttribute("href", href);
      expect(link).not.toHaveAttribute("target");
    }
  });
});
