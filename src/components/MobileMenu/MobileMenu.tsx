import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import DocsNav from "@/components/DocsNav/DocsNav";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import Logo from "@/components/Logo/Logo";
import { links } from "@/content/links";

export const MOBILE_MENU_ID = "mobile-menu";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

// A top-level item in the menu, as phone.html shows it.
const itemStyle = (theme: Theme) => ({
  display: "block",
  padding: "11px 12px",
  color: theme.tokens.text,
  fontWeight: 600,
  textDecoration: "none",
  borderBottom: `1px solid ${theme.tokens.divider}`,
  "&:hover": {
    color: theme.tokens.text,
    backgroundColor: theme.tokens.hover.tint,
  },
});

// The menu below the md breakpoint, with every header link and the docs list (spec
// section 6.1.2, items 2 to 4, and 6.1.4, item 2). MUI's Drawer moves focus into the
// panel, keeps it there, closes on Escape and the backdrop, and returns focus to the
// menu button.
const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          id: MOBILE_MENU_ID,
          role: "dialog",
          "aria-modal": true,
          "aria-label": "Menu",
          // The text size and line height in phone.html.
          sx: { maxHeight: "100%", fontSize: "16px", lineHeight: 1.5 },
        },
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${theme.tokens.border}`,
        })}
      >
        <Box
          component={RouterLink}
          to="/"
          onClick={onClose}
          sx={{ display: "flex", textDecoration: "none" }}
        >
          <Logo size="small" />
        </Box>
        <IconButton
          aria-label="Close menu"
          onClick={onClose}
          sx={(theme) => ({
            width: 44,
            height: 44,
            borderRadius: "8px",
            color: theme.tokens.selected.text,
            backgroundColor: theme.tokens.selected.background,
            border: `1px solid ${theme.tokens.selected.border}`,
            "&:hover": { backgroundColor: theme.tokens.selected.background },
          })}
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </IconButton>
      </Box>
      <Box component="nav" aria-label="Main" sx={{ padding: "10px 16px 24px" }}>
        <Box component="ul" sx={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <Box component={RouterLink} to="/" onClick={onClose} sx={itemStyle}>
              Home
            </Box>
          </li>
          <Box
            component="li"
            sx={(theme) => ({
              paddingBottom: "8px",
              borderBottom: `1px solid ${theme.tokens.divider}`,
              // The docs list is indented below "Docs" in the menu.
              "& a": { paddingLeft: "20px" },
            })}
          >
            <Box
              component="p"
              sx={{ margin: 0, padding: "11px 12px 4px", fontWeight: 600 }}
            >
              Docs
            </Box>
            <DocsNav onNavigate={onClose} />
          </Box>
          <li>
            <Box
              component={RouterLink}
              to="/versions"
              onClick={onClose}
              sx={itemStyle}
            >
              Versions
            </Box>
          </li>
          <li>
            <ExternalLink
              href={links.nugetPackage}
              sx={itemStyle}
              onClick={onClose}
            >
              NuGet package
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={links.libraryRepository}
              sx={(theme) => ({ ...itemStyle(theme), borderBottom: 0 })}
              onClick={onClose}
            >
              GitHub
            </ExternalLink>
          </li>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
