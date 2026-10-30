import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderOnDocsPage } from "@/test/renderOnDocsPage";
import CodeBlock from "./CodeBlock";

const csharp = `using JWTValidatorService.Validator;

// Validate the token.
bool isValid = new JWTValidator().TryValidateJWT(token, options, out var claims);`;

describe("CodeBlock", () => {
  // Plan section 7.2, test 1, on a highlighted example.
  test("copies the exact example, without highlighting markup or line numbers", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<CodeBlock code={csharp} caption="Program.cs" />);

    await user.click(await screen.findByRole("button", { name: "Copy code" }));

    expect(await navigator.clipboard.readText()).toBe(csharp);
  });

  test("highlights C#", async () => {
    renderOnDocsPage(<CodeBlock code={csharp} />);

    const figure = await screen.findByRole("figure");
    expect(within(figure).getByText("using")).toHaveClass("hljs-keyword");
    expect(within(figure).getByText("// Validate the token.")).toHaveClass(
      "hljs-comment",
    );
  });

  test("labels the language, with the caption when there is one", async () => {
    renderOnDocsPage(
      <>
        <CodeBlock code={csharp} />
        <CodeBlock code="<Project />" language="xml" caption="App.csproj" />
        <CodeBlock code="dotnet add package JWTValidator" language="shell" />
      </>,
    );

    const figures = await screen.findAllByRole("figure");
    expect(figures[0]).toHaveTextContent(/^C#/);
    expect(figures[1]).toHaveTextContent(/^XML · App\.csproj/);
    expect(figures[2]).toHaveTextContent(/^Shell/);
  });

  test("lets a keyboard reader focus the code, to scroll it", async () => {
    const user = userEvent.setup();
    renderOnDocsPage(<CodeBlock code="dotnet build" language="shell" />);

    await screen.findByRole("figure");
    await user.tab();
    await user.tab();

    expect(document.activeElement?.tagName).toBe("PRE");
  });
});
