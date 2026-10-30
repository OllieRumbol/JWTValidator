import Box from "@mui/material/Box";
import CopyButton from "@/components/CopyButton/CopyButton";

const COMMAND = "dotnet add package JWTValidator";

// The install command with its Copy button, as home.html shows it. The "$" is not
// copied.
const InstallCommand = () => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: 440,
        padding: "6px 6px 6px 16px",
        backgroundColor: theme.tokens.background,
        border: `1px solid ${theme.tokens.border}`,
        borderRadius: "8px",
      })}
    >
      <Box
        component="code"
        // Scrolls sideways on a narrow screen, so the keyboard can reach it.
        tabIndex={0}
        sx={(theme) => ({
          flex: "1 1 auto",
          minWidth: 0,
          overflowX: "auto",
          whiteSpace: "nowrap",
          fontFamily: theme.tokens.fontMono,
          fontSize: "15px",
        })}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={(theme) => ({ color: theme.tokens.code.comment })}
        >
          ${" "}
        </Box>
        {COMMAND}
      </Box>
      <CopyButton text={COMMAND} label="Copy install command" />
    </Box>
  );
};

export default InstallCommand;
