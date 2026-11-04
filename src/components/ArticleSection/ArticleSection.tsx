import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

type ArticleSectionProps = {
  id: string; // The SectionHeading's id, and the last part of the section address
  title: ReactNode; // Usually text. It can hold code, for example a method name.
  children: ReactNode;
};

// A top-level section of a docs page: its heading and content, with the spacing in
// docs-page.html.
const ArticleSection = ({ id, title, children }: ArticleSectionProps) => {
  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "44px",
        // Only the section's own paragraphs and lists, not those inside components.
        "& > p, & > ul": { margin: 0 },
        // Code in the text has a tinted box, as docs-page.html shows. Code in a heading
        // is in the code font only. The method reference lists style their own code.
        "& p code, & li code, & td code": {
          fontFamily: theme.tokens.fontMono,
          fontSize: "15px",
          padding: "1px 6px",
          borderRadius: "4px",
          backgroundColor: theme.tokens.hover.tint,
          // A long name, such as IdentityModelEventSource.ShowPII, breaks instead of
          // spilling out of the column at 320 px.
          overflowWrap: "anywhere",
        },
        "& h2 code, & h3 code": { fontFamily: theme.tokens.fontMono },
      })}
    >
      <SectionHeading id={id} level={2}>
        {title}
      </SectionHeading>
      {children}
    </Box>
  );
};

export default ArticleSection;
