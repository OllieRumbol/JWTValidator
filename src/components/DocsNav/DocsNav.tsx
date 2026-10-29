import Box from "@mui/material/Box";
import { NavLink } from "react-router";
import { docsPages, type DocsGroup } from "@/content/docsPages";

// The groups in the order the design shows them. A group with no pages is left out.
const groups: DocsGroup[] = ["Get started", "Guides", "More"];

type DocsNavProps = {
  // Called when the reader selects a page, so the menu can close.
  onNavigate?: () => void;
};

// The grouped list of docs pages, with the current page marked (spec section 6.1.4,
// items 1 and 2). The sidebar and the menu both show it.
const DocsNav = ({ onNavigate }: DocsNavProps) => {
  return (
    <Box>
      {groups.map((group) => {
        const pages = docsPages.filter((page) => page.group === group);
        if (pages.length === 0) {
          return null;
        }

        const labelId = `docs-group-${group.toLowerCase().replaceAll(" ", "-")}`;
        return (
          <Box key={group}>
            <Box
              component="p"
              id={labelId}
              sx={(theme) => ({
                margin: "8px 12px 2px",
                fontFamily: theme.tokens.fontMono,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: theme.tokens.mutedText,
              })}
            >
              {group}
            </Box>
            <Box
              component="ul"
              aria-labelledby={labelId}
              sx={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {pages.map((page) => (
                <li key={page.slug}>
                  <Box
                    component={NavLink}
                    to={`/docs/${page.slug}`}
                    onClick={onNavigate}
                    sx={(theme) => ({
                      display: "block",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      color: theme.tokens.docsListText,
                      textDecoration: "none",
                      "&:hover": {
                        color: theme.tokens.text,
                        backgroundColor: theme.tokens.hover.tint,
                      },
                      '&[aria-current="page"]': {
                        color: theme.tokens.selected.text,
                        backgroundColor: theme.tokens.selected.background,
                        fontWeight: 600,
                        boxShadow: `inset 3px 0 0 ${theme.tokens.logoBars[1]}`,
                      },
                    })}
                  >
                    {page.title}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default DocsNav;
