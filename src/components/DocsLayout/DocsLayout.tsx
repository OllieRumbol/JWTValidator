import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import DocsNav from "@/components/DocsNav/DocsNav";
import OnThisPage from "@/components/OnThisPage/OnThisPage";
import PrevNextLinks from "@/components/PrevNextLinks/PrevNextLinks";
import type { DocsPage, DocsSection } from "@/content/docsPages";
import { useScrollToSection } from "@/hooks/useScrollToSection";

type DocsLayoutProps = {
  page: DocsPage;
  // The page's sections, in order. Each id is a SectionHeading on the page.
  sections: DocsSection[];
  children: ReactNode;
};

// Every docs page: the docs list as a sidebar, the article, "On this page", and the
// previous and next links, as docs-page.html shows (spec section 6.1.4). Below the md
// breakpoint the sidebar is hidden, because the menu holds the docs list. Below lg,
// "On this page" moves to the top of the article (plan section 3.6).
const DocsLayout = ({ page, sections, children }: DocsLayoutProps) => {
  useScrollToSection();

  return (
    <Box
      sx={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        fontSize: { xs: "16px", md: "17px" },
        lineHeight: { xs: 1.6, md: 1.65 },
      }}
    >
      <Box
        component="nav"
        aria-label="Documentation"
        sx={(theme) => ({
          display: { xs: "none", md: "block" },
          flex: "0 0 280px",
          padding: "36px 24px 36px 32px",
          borderRight: `1px solid ${theme.tokens.border}`,
          backgroundColor: theme.tokens.sidebar,
          fontSize: "15px",
          // The group labels are 13 px in the sidebar, and 12 px in the menu.
          "& p": { fontSize: "13px" },
        })}
      >
        <DocsNav />
      </Box>
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          padding: { xs: "20px 16px 48px", md: "36px 48px 72px" },
          display: "flex",
          gap: "48px",
        }}
      >
        <Box
          component="article"
          sx={{ flex: "1 1 auto", minWidth: 0, maxWidth: 760 }}
        >
          <Box
            component="nav"
            aria-label="Breadcrumb"
            sx={(theme) => ({
              marginBottom: { xs: "8px", md: "10px" },
              fontSize: { xs: "14px", md: "15px" },
              color: theme.tokens.mutedText,
              "& a": { color: theme.tokens.mutedText },
            })}
          >
            <Link component={RouterLink} to="/docs">
              Docs
            </Link>{" "}
            / {page.group} / {page.title}
          </Box>
          <Box
            component="h1"
            sx={{
              margin: "0 0 24px",
              fontSize: { xs: "30px", md: "42px" },
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {page.title}
          </Box>
          {sections.length > 0 && (
            <Box sx={{ display: { lg: "none" }, marginBottom: "22px" }}>
              <OnThisPage sections={sections} variant="box" />
            </Box>
          )}
          {children}
          <Box sx={{ marginTop: "44px" }}>
            <PrevNextLinks slug={page.slug} />
          </Box>
        </Box>
        {sections.length > 0 && (
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              flex: "0 0 220px",
              alignSelf: "flex-start",
              // Stays in view while the reader scrolls the article.
              position: "sticky",
              top: "24px",
            }}
          >
            <OnThisPage sections={sections} variant="column" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DocsLayout;
