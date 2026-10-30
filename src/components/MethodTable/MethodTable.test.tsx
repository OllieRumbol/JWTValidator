import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MethodReference } from "@/content/methods/types";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import MethodTable from "./MethodTable";

const methods: MethodReference[] = ["Create", "WithIssuer"].map((name) => ({
  name,
  summary: `What ${name} does.`,
  signatures: [],
  parameters: [],
  returns: "",
  failsWhen: "",
}));

describe("MethodTable", () => {
  test("lists each method with what it does, in a table that can scroll", async () => {
    renderOnDocsPage(<MethodTable methods={methods} />);

    const region = await screen.findByRole("region", {
      name: "Method summary",
    });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("What WithIssuer does.")).toBeVisible();
  });

  test("links each method to its reference block, replacing the history entry", async () => {
    const user = userEvent.setup();
    const router = renderOnDocsPage(
      <MethodTable methods={methods} />,
      "/docs/validation-options",
    );

    await user.click(await screen.findByRole("link", { name: "WithIssuer" }));

    expect(router.state.location.pathname).toBe(
      "/docs/validation-options/with-issuer",
    );
    expect(router.state.historyAction).toBe("REPLACE");
  });
});
