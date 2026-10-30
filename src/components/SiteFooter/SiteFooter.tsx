import Box from "@mui/material/Box";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import Logo from "@/components/Logo/Logo";
import { links } from "@/content/links";
import { latestVersion } from "@/content/versions";

const footerLinks = [
  { label: "Library on GitHub", href: links.libraryRepository },
  { label: "NuGet package", href: links.nugetPackage },
  { label: "Site repository", href: links.siteRepository },
  { label: "Licence", href: links.licence },
];

// The footer links and the latest library version (spec section 6.1.2, item 6).
const SiteFooter = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.tokens.surface,
        borderTop: `1px solid ${theme.tokens.border}`,
      })}
    >
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "32px 16px", md: "40px 32px" },
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          fontSize: "16px",
          lineHeight: 1.6,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Logo size="xsmall" showName={false} />
          <Box
            component="p"
            sx={(theme) => ({ margin: 0, color: theme.tokens.mutedText })}
          >
            JWT Validator {latestVersion} · MIT licence
          </Box>
        </Box>
        <Box
          component="nav"
          aria-label="Footer"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 28px",
            fontWeight: 600,
          }}
        >
          {footerLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SiteFooter;
