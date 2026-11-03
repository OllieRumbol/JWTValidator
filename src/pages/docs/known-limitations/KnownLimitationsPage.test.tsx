import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderRoute } from "@/test/renderRoute";

// Spec section 6.1.3, "Known limitations": the two limitations, each in its own section
// so that other pages can link to it.
describe("Known limitations", () => {
  test.each([
    ["claim-type-map", "The claim type map", /DefaultInboundClaimTypeMap/],
    [
      "openid-downloads",
      "OpenID configuration downloads",
      /downloads the OpenID configuration again/,
    ],
  ])("has the %s section", async (id, heading, text) => {
    renderRoute("/docs/known-limitations");

    const title = await screen.findByRole("heading", {
      level: 2,
      name: heading,
    });
    expect(title).toHaveAttribute("id", id);
    expect(title.closest("section")).toHaveTextContent(text);
  });
});
