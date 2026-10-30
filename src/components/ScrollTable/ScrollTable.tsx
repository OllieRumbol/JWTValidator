import type { ReactNode } from "react";
import Box from "@mui/material/Box";

type ScrollTableProps = {
  label: string; // Names the box for screen readers, for example "Minimum secret length"
  children: ReactNode; // A <table> with <thead> and <tbody>
};

// A table in a box that scrolls sideways when the table is wider than the screen (spec
// section 6.6.3, item 2), as docs-page.html shows it. The box takes keyboard focus, so a
// keyboard reader can scroll it.
const ScrollTable = ({ label, children }: ScrollTableProps) => {
  return (
    <Box
      role="region"
      aria-label={label}
      tabIndex={0}
      sx={(theme) => ({
        overflowX: "auto",
        // Lets the box shrink in a flex or grid parent, so the table scrolls inside it.
        minWidth: 0,
        border: `1px solid ${theme.tokens.border}`,
        borderRadius: "10px",
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "16px",
        },
        "& th, & td": { padding: "10px 16px", textAlign: "left" },
        "& thead tr": { backgroundColor: theme.tokens.surface },
        "& tbody tr": { borderTop: `1px solid ${theme.tokens.border}` },
      })}
    >
      {children}
    </Box>
  );
};

export default ScrollTable;
