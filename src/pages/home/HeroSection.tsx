import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router";
import { primaryLinkStyle } from "@/app/theme";
import { docsPages } from "@/content/docsPages";
import { latestVersion } from "@/content/versions";
import InstallCommand from "./InstallCommand";
import TokenDiagram from "./TokenDiagram";

// What the library does, how to install it, and a picture of a token (spec section
// 6.1.7, items 1 and 2). Release 3 adds the "Migrating from 1.x" button (T27).
const HeroSection = () => {
  return (
    <Box
      component="section"
      aria-labelledby="home-title"
      sx={(theme) => ({
        backgroundColor: theme.tokens.surface,
        borderBottom: `1px solid ${theme.tokens.border}`,
      })}
    >
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "48px 16px", md: "80px 32px" },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: "40px", md: "56px" },
        }}
      >
        <Box sx={{ flex: "1 1 440px", minWidth: 0 }}>
          <Box
            component="p"
            sx={(theme) => ({
              display: "inline-block",
              margin: "0 0 16px",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              color: theme.tokens.selected.text,
              backgroundColor: theme.tokens.selected.background,
            })}
          >
            Version {latestVersion} · MIT licence
          </Box>
          <Box
            component="h1"
            id="home-title"
            sx={{
              margin: "0 0 18px",
              fontSize: { xs: "36px", md: "52px" },
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Validate a JWT in C#, in a few readable lines.
          </Box>
          <Box
            component="p"
            sx={(theme) => ({
              margin: "0 0 30px",
              maxWidth: "33em",
              fontSize: { xs: "17px", md: "19px" },
              color: theme.tokens.mutedText,
            })}
          >
            JWT Validator hides the complexity of TokenValidationParameters,
            JwtSecurityTokenHandler and ClaimsPrincipal. Check the signature,
            issuer, audience and expiry, and get the claims back as a
            dictionary.
          </Box>
          <Box sx={{ display: "flex", marginBottom: "26px" }}>
            <Box
              component={RouterLink}
              to={`/docs/${docsPages[0].slug}`}
              sx={primaryLinkStyle}
            >
              Get started
            </Box>
          </Box>
          <InstallCommand />
        </Box>
        <Box sx={{ flex: "1 1 440px", minWidth: 0 }}>
          <TokenDiagram />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
