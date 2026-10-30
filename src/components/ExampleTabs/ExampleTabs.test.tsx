import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import ExampleTabs from "./ExampleTabs";

const examples = [
  { id: "openid", title: "OpenID Connect", code: "var openId = true;" },
  { id: "secret", title: "Secret", code: "var secret = true;" },
];

function renderTabs() {
  renderOnDocsPage(
    <ExampleTabs label="Signing key source" examples={examples} />,
  );
}

// Plan section 7.2, test 17 (spec sections 6.1.7, item 2, and 6.2.2).
describe("ExampleTabs", () => {
  test("shows the first example when the page opens", async () => {
    renderTabs();

    expect(
      await screen.findByRole("tablist", { name: "Signing key source" }),
    ).toBeVisible();
    expect(screen.getByRole("tab", { name: "OpenID Connect" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("tabpanel", { name: "OpenID Connect" }),
    ).toHaveTextContent("var openId = true;");
  });

  test("switches with the mouse", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(await screen.findByRole("tab", { name: "Secret" }));

    expect(screen.getByRole("tabpanel", { name: "Secret" })).toHaveTextContent(
      "var secret = true;",
    );
  });

  test("switches with the arrow keys, and the selected tab has focus", async () => {
    const user = userEvent.setup();
    renderTabs();

    const openId = await screen.findByRole("tab", { name: "OpenID Connect" });
    await user.click(openId);
    await user.keyboard("{ArrowRight}");

    const secret = screen.getByRole("tab", { name: "Secret" });
    expect(secret).toHaveAttribute("aria-selected", "true");
    expect(secret).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "var secret = true;",
    );
  });

  test("copies the example that shows", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(await screen.findByRole("tab", { name: "Secret" }));
    await user.click(screen.getByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe("var secret = true;");
  });

  test("does not say Copied for an example that was not copied", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(await screen.findByRole("button", { name: "Copy code" }));
    await user.click(screen.getByRole("tab", { name: "Secret" }));

    expect(screen.getByRole("button", { name: "Copy code" })).toHaveTextContent(
      "Copy",
    );
  });
});
