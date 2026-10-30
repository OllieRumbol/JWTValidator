import { describe, expect, test, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COPIED_DURATION_MS } from "@/hooks/useCopyToClipboard";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import CopyButton from "./CopyButton";

describe("CopyButton", () => {
  // Plan section 7.2, test 1 (spec section 6.1.5, items 3, 4 and 6).
  test("copies the exact text, shows Copied and announces it", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<CopyButton text={'Console.WriteLine("Hi");'} />);

    await user.click(await screen.findByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(
      'Console.WriteLine("Hi");',
    );
    expect(screen.getByRole("button", { name: "Copied" })).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  test("returns to Copy after 2 seconds, and the announcement stays", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<CopyButton text="text" />);

    await user.click(await screen.findByRole("button", { name: "Copy code" }));

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Copy code" }),
        ).toHaveTextContent("Copy");
      },
      { timeout: COPIED_DURATION_MS + 1000 },
    );
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  test("works with the keyboard", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<CopyButton text="text" label="Copy the command" />);

    await screen.findByRole("button", { name: "Copy the command" });
    await user.tab();
    await user.keyboard("{Enter}");

    expect(await navigator.clipboard.readText()).toBe("text");
  });

  // Plan section 7.2, test 2 (spec section 6.1.5, item 5).
  test("shows and announces Copy failed when the clipboard rejects the write", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("Blocked by the browser"),
    );
    renderOnDocsPage(<CopyButton text="text" />);

    await user.click(await screen.findByRole("button", { name: "Copy code" }));

    expect(
      await screen.findByRole("button", { name: "Copy failed" }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Copy failed. Select the code by hand instead.",
    );
  });
});
