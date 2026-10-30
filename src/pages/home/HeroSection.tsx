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
          // The phone sizes are the ones phone.html shows.
          padding: { xs: "30px 16px 24px", md: "80px 32px" },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: "24px", md: "56px" },
        }}
      >
        <Box sx={{ flex: "1 1 440px", minWidth: 0 }}>
          <Box
            component="p"
            sx={(theme) => ({
              display: "inline-block",
              margin: { xs: "0 0 12px", md: "0 0 16px" },
              padding: { xs: "3px 12px", md: "4px 14px" },
              borderRadius: "999px",
              fontSize: { xs: "13px", md: "14px" },
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
              margin: { xs: "0 0 12px", md: "0 0 18px" },
              fontSize: { xs: "33px", md: "52px" },
              lineHeight: { xs: 1.1, md: 1.08 },
              letterSpacing: "-0.03em",
            }}
          >
            Validate a JWT in C#, in a few readable lines.
          </Box>
          <Box
            component="p"
            sx={(theme) => ({
              margin: { xs: "0 0 20px", md: "0 0 30px" },
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
          <Box
            sx={{
              display: "flex",
              // Full width on a phone.
              flexDirection: { xs: "column", sm: "row" },
              marginBottom: { xs: "16px", md: "26px" },
            }}
          >
            <Box
              component={RouterLink}
              to={`/docs/${docsPages[0].slug}`}
              sx={(theme) => ({
                ...primaryLinkStyle(theme),
                textAlign: "center",
              })}
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
