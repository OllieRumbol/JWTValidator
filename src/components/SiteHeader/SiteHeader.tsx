import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import Logo from "@/components/Logo/Logo";
import MobileMenu, { MOBILE_MENU_ID } from "@/components/MobileMenu/MobileMenu";
import { links } from "@/content/links";

// A header link, as home.html and states.png show it.
const linkStyle = (theme: Theme) => ({
  padding: "10px 14px",
  borderRadius: "8px",
  color: theme.tokens.text,
  fontWeight: 500,
  textDecoration: "none",
  "&:hover": {
    color: theme.tokens.text,
    backgroundColor: theme.tokens.hover.tint,
  },
});

// The logo and the header links. Below the md breakpoint the links move into the menu
// (spec section 6.1.2, items 1 and 2).
const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isWide = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  // The menu exists only below the md breakpoint. When the window widens past it, the
  // menu closes, because the header links show again.
  if (isWide && menuOpen) {
    setMenuOpen(false);
  }

  return (
    <Box
      component="header"
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.tokens.border}`,
        // The text size and line height in home.html and phone.html.
        fontSize: { xs: "16px", md: "17px" },
        lineHeight: 1.6,
      })}
    >
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "12px 16px", md: "14px 32px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", textDecoration: "none" }}
        >
          <Logo size={{ xs: "small", md: "medium" }} />
        </Box>
        <Box
          component="nav"
          aria-label="Main"
          sx={{ display: { xs: "none", md: "flex" }, gap: "4px" }}
        >
          <Box component={RouterLink} to="/docs" sx={linkStyle}>
            Docs
          </Box>
          <Box component={RouterLink} to="/versions" sx={linkStyle}>
            Versions
          </Box>
          <ExternalLink href={links.nugetPackage} sx={linkStyle}>
            NuGet
          </ExternalLink>
          <ExternalLink href={links.libraryRepository} sx={linkStyle}>
            GitHub
          </ExternalLink>
        </Box>
        <IconButton
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? MOBILE_MENU_ID : undefined}
          onClick={() => setMenuOpen(true)}
          sx={(theme) => ({
            display: { xs: "inline-flex", md: "none" },
            width: 44,
            height: 44,
            borderRadius: "8px",
            color: theme.tokens.text,
            border: `1px solid ${theme.tokens.border}`,
            "&:hover": { backgroundColor: theme.tokens.hover.tint },
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
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </IconButton>
      </Box>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </Box>
  );
};

export default SiteHeader;
