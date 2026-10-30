import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

type ArticleSectionProps = {
  id: string; // The SectionHeading's id, and the last part of the section address
  title: string;
  children: ReactNode;
};

// A top-level section of a docs page: its heading and content, with the spacing in
// docs-page.html.
const ArticleSection = ({ id, title, children }: ArticleSectionProps) => {
  return (
    <Box
      component="section"
      aria-labelledby={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "44px",
        "& p, & ul": { margin: 0 },
      }}
    >
      <SectionHeading id={id} level={2}>
        {title}
      </SectionHeading>
      {children}
    </Box>
  );
};

export default ArticleSection;
