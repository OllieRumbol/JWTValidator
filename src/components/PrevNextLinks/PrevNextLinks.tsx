import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { getAdjacentPages, type DocsPage } from "@/content/docsPages";

type PrevNextLinksProps = {
  slug: string;
};

// A card link, as docs-page.html shows it.
const cardStyle = (theme: Theme) => ({
  flex: "1 1 220px",
  padding: "14px 18px",
  border: `1px solid ${theme.tokens.border}`,
  borderRadius: "10px",
  textDecoration: "none",
  color: theme.tokens.link,
  "&:hover": {
    color: theme.tokens.linkHover,
    backgroundColor: theme.tokens.hover.tint,
  },
});

type CardProps = { label: "Previous" | "Next"; page: DocsPage };

const Card = ({ label, page }: CardProps) => (
  <Box
    component={RouterLink}
    to={`/docs/${page.slug}`}
    sx={(theme) => ({
      ...cardStyle(theme),
      textAlign: label === "Next" ? "right" : "left",
      // With no previous page, Next still sits on the right.
      marginLeft: label === "Next" ? "auto" : 0,
    })}
  >
    <Box
      component="span"
      sx={(theme) => ({
        display: "block",
        fontSize: "14px",
        color: theme.tokens.mutedText,
      })}
    >
      {label}
    </Box>
    <Box component="span" sx={{ fontWeight: 600 }}>
      {page.title}
    </Box>
  </Box>
);

// Links to the previous and the next page, in reading order (spec section 6.1.4,
// item 4).
const PrevNextLinks = ({ slug }: PrevNextLinksProps) => {
  const { previous, next } = getAdjacentPages(slug);

  return (
    <Box
      component="nav"
      aria-label="Previous and next"
      sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
    >
      {previous && <Card label="Previous" page={previous} />}
      {next && <Card label="Next" page={next} />}
    </Box>
  );
};

export default PrevNextLinks;
