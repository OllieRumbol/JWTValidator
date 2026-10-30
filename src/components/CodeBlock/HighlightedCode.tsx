import type { HTMLAttributes } from "react";
import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import SyntaxHighlighter from "@/components/shared/SyntaxHighlighter";

export type CodeLanguage = "csharp" | "xml" | "shell";

type HighlightedCodeProps = {
  code: string;
  language?: CodeLanguage;
  // "block" is an example, as in docs-page.html. "signature" is a method signature in
  // a reference block.
  variant?: "block" | "signature";
  // Passed to the <pre>, for example the tab panel's role and label.
  preProps?: Pick<
    HTMLAttributes<HTMLPreElement>,
    "id" | "role" | "aria-labelledby"
  >;
};

// The colours of the classes that the C# grammar gives (plan section 3.6, "Code"). The
// grammar does not mark type names or method calls, so those stay in the text colour.
const codeColours = (theme: Theme) => ({
  "& .hljs-keyword, & .hljs-built_in, & .hljs-literal": {
    color: theme.tokens.code.keyword,
  },
  "& .hljs-type, & .hljs-class, & .hljs-number": {
    color: theme.tokens.code.type,
  },
  "& .hljs-string": { color: theme.tokens.code.string },
  "& .hljs-title": { color: theme.tokens.code.method },
  "& .hljs-comment, & .hljs-meta": { color: theme.tokens.code.comment },
});

const variantStyle = {
  block: (theme: Theme) => ({
    padding: "18px 20px",
    fontSize: "15px",
    lineHeight: 1.7,
    backgroundColor: theme.tokens.code.background,
  }),
  signature: (theme: Theme) => ({
    padding: "12px 16px",
    fontSize: "14px",
    lineHeight: 1.6,
    borderRadius: "8px",
    backgroundColor: theme.tokens.surface,
  }),
};

// The code itself, in a box that scrolls sideways when a line is too wide (spec section
// 6.1.5, item 2). Only C# is highlighted (plan section 3.5). The box can take keyboard
// focus, so a keyboard reader can scroll it.
const HighlightedCode = ({
  code,
  language = "csharp",
  variant = "block",
  preProps,
}: HighlightedCodeProps) => {
  return (
    <Box
      sx={(theme) => ({
        // Lets the box shrink in a flex or grid parent, so wide code scrolls inside it.
        minWidth: 0,
        "& pre": {
          margin: 0,
          overflowX: "auto",
          fontFamily: theme.tokens.fontMono,
          color: theme.tokens.text,
          ...variantStyle[variant](theme),
        },
        // The browser gives <code> its own monospace font, which would replace Plex Mono.
        "& pre code": { fontFamily: "inherit" },
        ...codeColours(theme),
      })}
    >
      {language === "csharp" ? (
        <SyntaxHighlighter
          language="csharp"
          useInlineStyles={false}
          tabIndex={0}
          {...preProps}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <pre tabIndex={0} {...preProps}>
          <code>{code}</code>
        </pre>
      )}
    </Box>
  );
};

export default HighlightedCode;
