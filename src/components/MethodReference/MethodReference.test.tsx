import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import type { MethodReference as Method } from "@/content/methods/types";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import MethodReference from "./MethodReference";

const method: Method = {
  name: "WithSigningKeyFromSecret",
  summary: "Uses a secret to check the signature.",
  signatures: [
    "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromSecret(String secret)",
  ],
  parameters: [{ name: "secret", description: "the shared secret." }],
  returns: "The builder.",
  failsWhen: "The secret is empty.",
};

describe("MethodReference", () => {
  test("shows the summary, signature, parameters, return value and failures", async () => {
    renderOnDocsPage(<MethodReference method={method} />);

    const section = within(
      await screen.findByRole("region", { name: "WithSigningKeyFromSecret" }),
    );
    expect(
      section.getByRole("heading", {
        level: 3,
        name: "WithSigningKeyFromSecret",
      }),
    ).toHaveAttribute("id", "with-signing-key-from-secret");
    expect(
      section.getByText("Uses a secret to check the signature."),
    ).toBeVisible();
    expect(
      section.getByText(/IJWTValidatorOptionsBuilderFinisher/),
    ).toBeVisible();
    expect(section.getByText("secret")).toBeVisible();
    expect(section.getByText("The secret is empty.")).toBeVisible();
  });

  // Spec section 4.1, item 6: the old site labelled the return value "Summary".
  test('labels the return value "Returns"', async () => {
    renderOnDocsPage(<MethodReference method={method} />);

    const returns = await screen.findByText("Returns");
    expect(returns.tagName).toBe("DT");
    expect(returns.nextElementSibling).toHaveTextContent("The builder.");
  });

  // The 1.0.3 text has no failures, until release 3 writes them.
  test('leaves out "Fails when" for a method without that text', async () => {
    renderOnDocsPage(
      <MethodReference method={{ ...method, failsWhen: undefined }} />,
    );

    expect(await screen.findByText("Returns")).toBeVisible();
    expect(screen.queryByText("Fails when")).toBeNull();
  });

  test('says "None" for a method with no parameters', async () => {
    renderOnDocsPage(
      <MethodReference
        method={{ ...method, name: "Create", parameters: [] }}
      />,
    );

    const parameters = await screen.findByText("Parameters");
    expect(parameters.nextElementSibling).toHaveTextContent("None");
  });

  test("shows the Changed in 2.0.0 note when the method has one", async () => {
    renderOnDocsPage(
      <MethodReference
        method={{
          ...method,
          changedIn2: "A short secret no longer validates.",
        }}
      />,
    );

    expect(await screen.findByRole("note")).toHaveTextContent(
      "A short secret no longer validates.",
    );
  });
});
