import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExternalLink from "@/components/ExternalLink/ExternalLink";
import { links } from "@/content/links";

// Temporary: the site still documents 1.0.3 after 2.0.0 was released.
// Remove it when the 2.0.0 documentation goes live (release 3 of the site upgrade).
const VersionNotice = () => {
  return (
    <Box
      component="section"
      aria-label="Version notice"
      sx={(theme) => ({
        backgroundColor: theme.tokens.changedNote.background,
        borderBottom: `1px solid ${theme.tokens.changedNote.border}`,
        px: { xs: 2, md: 3 },
        py: 1.5,
      })}
    >
      <Typography align="center" sx={(theme) => ({ color: theme.tokens.text })}>
        <strong>JWT Validator 2.0.0 is out.</strong> This site still describes
        version 1.0.3, and its examples do not work with 2.0.0. Updated
        documentation is coming soon. Until then, read the{" "}
        <ExternalLink
          href={links.nugetPackage}
          sx={(theme) => ({
            color: theme.tokens.changedNote.label,
            fontWeight: 600,
            "&:hover": { color: theme.tokens.changedNote.label },
          })}
        >
          README and release notes on nuget.org
        </ExternalLink>
        .
      </Typography>
    </Box>
  );
};

export default VersionNotice;
