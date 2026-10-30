import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import type { Theme } from "@mui/material/styles";
import { visuallyHidden } from "@/app/theme";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type CopyButtonProps = {
  text: string;
  label?: string; // Accessible name, default "Copy code"
};

const FAILED_MESSAGE = "Copy failed. Select the code by hand instead.";

// The colours of each state, as states.html shows them.
const stateStyle = {
  idle: (theme: Theme) => ({
    color: theme.tokens.primary,
    backgroundColor: theme.tokens.selected.background,
    "&:hover": {
      color: theme.tokens.hover.copyButtonText,
      backgroundColor: theme.tokens.hover.copyButton,
    },
  }),
  copied: (theme: Theme) => ({
    color: theme.tokens.success.text,
    backgroundColor: theme.tokens.success.background,
  }),
  failed: (theme: Theme) => ({
    color: theme.tokens.changedNote.label,
    backgroundColor: theme.tokens.changedNote.background,
  }),
};

// Copies the exact text, and shows and announces the result (spec section 6.1.5, items
// 3 to 6). The live region keeps its message after the button returns to "Copy".
const CopyButton = ({ text, label = "Copy code" }: CopyButtonProps) => {
  const { status, copy } = useCopyToClipboard();
  const [announcement, setAnnouncement] = useState("");

  async function handleClick() {
    // Emptied first, so a second "Copied" is a change, and screen readers announce it.
    setAnnouncement("");
    const copied = await copy(text);
    setAnnouncement(copied ? "Copied" : FAILED_MESSAGE);
  }

  return (
    <>
      <ButtonBase
        // The label names the button only while it says "Copy". "Copied" and "Copy
        // failed" name it by their own text.
        aria-label={status === "idle" ? label : undefined}
        onClick={() => void handleClick()}
        sx={(theme) => ({
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          minHeight: "40px",
          padding: "8px 14px",
          borderRadius: "6px",
          fontFamily: theme.tokens.fontSans,
          fontSize: "15px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          ...stateStyle[status](theme),
        })}
      >
        {status === "copied" && (
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        {status === "idle" && "Copy"}
        {status === "copied" && "Copied"}
        {status === "failed" && "Copy failed"}
      </ButtonBase>
      <Box component="span" role="status" sx={visuallyHidden}>
        {announcement}
      </Box>
    </>
  );
};

export default CopyButton;
