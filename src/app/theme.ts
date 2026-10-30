import { createTheme, type Theme } from "@mui/material/styles";
import type { CSSObject } from "@emotion/react";

// The design tokens in plan section 3.6. No component uses a colour that is not here
// (React rules, "Styling").
const tokens = {
  background: "#FFFFFF",
  surface: "#F7F6FB",
  border: "#E3E0EC",
  text: "#1B1A22",
  mutedText: "#55526A",
  primary: "#6B24B2",
  link: "#7A2DBE",
  // Header, payload and signature, in that order.
  logoBars: ["#E5427A", "#9447D6", "#1C9CC9"],
  accentText: ["#C21E5A", "#7A2DBE", "#0A7398"],
  changedNote: { background: "#FDEEF3", border: "#F3C3D4", label: "#A8174D" },
  code: {
    background: "#FCFBFE",
    keyword: "#7A2DBE",
    type: "#0A7398",
    string: "#A0461A",
    method: "#6B4E00",
    comment: "#5E6573",
  },
  hover: { tint: "#F3F1F8", copyButton: "#E4D6F7", copyButtonText: "#5A1F8F" },
  // The current docs page, the open menu button and the Copy button.
  selected: { background: "#F0E7FB", border: "#CDB4EE", text: "#5A1F8F" },
  linkHover: "#5A1F8F",
  docsListText: "#2C2A36",
  // Body text in tables and some sections of the design. Softer than "text".
  bodyText: "#3B3848",
  // Lines between items in the menu and in tables. Lighter than "border".
  divider: "#EEECF4",
  focusRing: "#6B24B2",
  success: { background: "#E3F3E8", text: "#1F6B36" },
  fontSans: "'IBM Plex Sans', system-ui, sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
} as const;

type Tokens = typeof tokens;

declare module "@mui/material/styles" {
  interface Theme {
    tokens: Tokens;
  }
  interface ThemeOptions {
    tokens?: Tokens;
  }
}

// Breakpoints are MUI's defaults (plan section 3.6), so they are not set here.
const theme = createTheme({
  tokens,
  palette: {
    primary: { main: tokens.primary },
    text: { primary: tokens.text, secondary: tokens.mutedText },
    background: { default: tokens.background, paper: tokens.background },
    divider: tokens.border,
  },
  typography: {
    fontFamily: tokens.fontSans,
  },
  components: {
    // Links in text, as states.png shows them.
    MuiLink: {
      defaultProps: { underline: "always" },
      styleOverrides: {
        root: {
          color: tokens.link,
          textDecorationColor: "currentColor",
          textUnderlineOffset: "3px",
          "&:hover": {
            color: tokens.linkHover,
            textDecorationThickness: "2px",
          },
        },
      },
    },
  },
});

// Hides text on screen and keeps it for screen readers.
export const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

// Rules for the whole page, applied with MUI's GlobalStyles.
export function globalStyles(theme: Theme): CSSObject {
  return {
    // The design is light only (plan section 3.6). Without these, the page is
    // transparent, and a browser that draws its own background dark hides the header.
    html: { colorScheme: "light" },
    body: {
      fontFamily: theme.tokens.fontSans,
      color: theme.tokens.text,
      backgroundColor: theme.tokens.background,
    },
    // Keyboard focus on every focusable part (plan section 3.6, WCAG 2.2, 2.4.7). The
    // "html" makes this rule win over MUI's "outline: 0" on buttons.
    "html :focus-visible": {
      outline: `2px solid ${theme.tokens.focusRing}`,
      outlineOffset: "2px",
    },
    // One rule covers MUI's transitions and the site's own (spec section 6.7). The
    // durations are 0, not "none", so each element still reaches its end state.
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": {
        animationDuration: "0s !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0s !important",
      },
    },
  };
}

export default theme;
