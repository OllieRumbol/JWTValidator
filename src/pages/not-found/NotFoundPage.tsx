import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import PageTitle from "@/components/PageTitle/PageTitle";

// The two links, as not-found.html shows them.
const linkStyle = (theme: Theme) => ({
  fontSize: "17px",
  lineHeight: 1.6,
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: "8px",
  textDecoration: "none",
  backgroundColor: theme.tokens.primary,
  color: theme.tokens.background,
});

const secondaryLinkStyle = (theme: Theme) => ({
  ...linkStyle(theme),
  backgroundColor: theme.tokens.background,
  color: theme.tokens.primary,
  border: `1px solid ${theme.tokens.selected.border}`,
});

// Shown for an address that matches no page, and for an unknown docs page (spec section
// 6.1.1, item 8).
const NotFoundPage = () => {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        backgroundColor: theme.tokens.surface,
        borderBottom: `1px solid ${theme.tokens.border}`,
      })}
    >
      <PageTitle name="Page not found" />
      <Box
        sx={{
          maxWidth: 720,
          margin: "0 auto",
          padding: { xs: "64px 16px 72px", md: "96px 32px 104px" },
          textAlign: "center",
        }}
      >
        {/* The logo with its middle bar faded: a token with a missing part. */}
        <Box
          component="span"
          aria-hidden="true"
          sx={{ display: "inline-flex", gap: "6px", marginBottom: "28px" }}
        >
          {[0, 1, 2].map((bar) => (
            <Box
              key={bar}
              component="span"
              sx={(theme) => ({
                width: "16px",
                height: "48px",
                borderRadius: "5px",
                backgroundColor: theme.tokens.logoBars[bar],
                opacity: bar === 1 ? 0.35 : 1,
              })}
            />
          ))}
        </Box>
        <Box
          component="p"
          sx={(theme) => ({
            margin: "0 0 8px",
            fontFamily: theme.tokens.fontMono,
            fontSize: "15px",
            fontWeight: 600,
            color: theme.tokens.changedNote.label,
          })}
        >
          404
        </Box>
        <Box
          component="h1"
          sx={{
            margin: "0 0 14px",
            fontSize: { xs: "36px", md: "44px" },
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Page not found
        </Box>
        <Box
          component="p"
          sx={(theme) => ({
            margin: "0 auto 32px",
            fontSize: "19px",
            lineHeight: 1.6,
            color: theme.tokens.mutedText,
            maxWidth: "30em",
          })}
        >
          This address does not match a page. It may be from an older version of
          the site, or have a typing mistake.
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Box component={RouterLink} to="/" sx={linkStyle}>
            Go to Home
          </Box>
          <Box component={RouterLink} to="/docs" sx={secondaryLinkStyle}>
            Browse the docs
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
