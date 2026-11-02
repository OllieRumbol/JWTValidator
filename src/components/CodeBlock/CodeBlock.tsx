import { useId } from "react";
import Box from "@mui/material/Box";
import CopyButton from "@/components/CopyButton/CopyButton";
import HighlightedCode, { type CodeLanguage } from "./HighlightedCode";

type CodeBlockProps = {
  code: string; // Exact text. CopyButton copies this, without line numbers.
  caption?: string; // For example "Program.cs"
  language?: CodeLanguage; // Default "csharp". The label shows the language.
  highlighted?: boolean; // Marks the new code, as the migration guide's 2.0.0 panels show
};

// The language label on every example (spec section 6.1.3, item 8).
const languageLabels: Record<CodeLanguage, string> = {
  csharp: "C#",
  xml: "XML",
  shell: "Shell",
};

// An example with its language, an optional caption and a Copy button, as
// docs-page.html shows it.
const CodeBlock = ({
  code,
  caption,
  language = "csharp",
  highlighted = false,
}: CodeBlockProps) => {
  const label = languageLabels[language];
  const labelId = useId();

  return (
    <Box
      component="figure"
      // Named by the label only, not by the Copy button and its result.
      aria-labelledby={labelId}
      sx={(theme) => ({
        margin: 0,
        // Lets the box shrink in a flex or grid parent, so wide code scrolls inside it.
        minWidth: 0,
        border: `1px solid ${highlighted ? theme.tokens.selected.border : theme.tokens.border}`,
        borderRadius: "10px",
        overflow: "hidden",
      })}
    >
      <Box
        component="figcaption"
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          padding: "6px 6px 6px 16px",
          borderBottom: `1px solid ${highlighted ? theme.tokens.selected.border : theme.tokens.border}`,
          backgroundColor: highlighted
            ? theme.tokens.selected.background
            : theme.tokens.surface,
          fontFamily: theme.tokens.fontMono,
          fontSize: "14px",
          color: highlighted
            ? theme.tokens.selected.text
            : theme.tokens.mutedText,
        })}
      >
        <span id={labelId}>{caption ? `${label} · ${caption}` : label}</span>
        <CopyButton text={code} />
      </Box>
      <HighlightedCode code={code} language={language} />
    </Box>
  );
};

export default CodeBlock;
