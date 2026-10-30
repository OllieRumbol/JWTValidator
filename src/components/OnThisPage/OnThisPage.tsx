import { useId, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink, useParams } from "react-router";
import type { DocsSection } from "@/content/docsPages";

type OnThisPageProps = {
  sections: DocsSection[];
  // "column" sits beside the article from the lg breakpoint, as docs-page.html shows.
  // "box" is the collapsible box at the top of the article, as docs-phone.html shows.
  variant: "column" | "box";
};

// The page's own sections, each a link to its section address (spec section 6.1.4,
// item 3). A link within the page replaces the history entry (plan section 3.3). The
// section in the address is marked. With no section in the address, the first is.
const OnThisPage = ({ sections, variant }: OnThisPageProps) => {
  const { slug, section } = useParams();
  const [open, setOpen] = useState(true);
  const listId = useId();
  const currentId = sections.some((item) => item.id === section)
    ? section
    : sections[0]?.id;

  const links = sections.map((item) => (
    <Box
      component="li"
      key={item.id}
      sx={{ paddingLeft: item.level === 3 ? "12px" : 0 }}
    >
      <Box
        component={RouterLink}
        to={`/docs/${slug}/${item.id}`}
        replace
        aria-current={item.id === currentId ? "location" : undefined}
        sx={(theme: Theme) => ({
          display: "block",
          padding: variant === "box" ? "6px 0" : 0,
          color:
            variant === "box" ? theme.tokens.bodyText : theme.tokens.mutedText,
          textDecoration: "none",
          "&:hover": { color: theme.tokens.linkHover },
          '&[aria-current="location"]': {
            color: theme.tokens.link,
            fontWeight: 600,
          },
        })}
      >
        {item.title}
      </Box>
    </Box>
  ));

  if (variant === "column") {
    return (
      <Box component="nav" aria-label="On this page" sx={{ fontSize: "14px" }}>
        <Box component="p" sx={{ margin: "0 0 8px", fontWeight: 600 }}>
          On this page
        </Box>
        <Box
          component="ul"
          sx={(theme) => ({
            listStyle: "none",
            margin: 0,
            padding: "0 0 0 12px",
            borderLeft: `2px solid ${theme.tokens.border}`,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          })}
        >
          {links}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="nav"
      aria-label="On this page"
      sx={(theme) => ({
        border: `1px solid ${theme.tokens.border}`,
        borderRadius: "10px",
        overflow: "hidden",
      })}
    >
      <ButtonBase
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
        sx={(theme) => ({
          width: "100%",
          minHeight: "44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 14px",
          fontFamily: theme.tokens.fontSans,
          fontSize: "inherit",
          fontWeight: 600,
          color: theme.tokens.text,
          backgroundColor: theme.tokens.surface,
        })}
      >
        On this page
        <Box
          component="svg"
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          // The chevron points up when the box is open, as docs-phone.html shows.
          sx={{ transform: open ? "none" : "rotate(180deg)" }}
        >
          <path d="m6 15 6-6 6 6" />
        </Box>
      </ButtonBase>
      <Box
        component="ul"
        id={listId}
        hidden={!open}
        sx={{
          listStyle: "none",
          margin: 0,
          padding: "8px 14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          fontSize: "15px",
          "&[hidden]": { display: "none" },
        }}
      >
        {links}
      </Box>
    </Box>
  );
};

export default OnThisPage;
