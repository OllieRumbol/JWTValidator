import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import { MIGRATION_GUIDE_PATH } from "@/content/docsPages";

type ChangedNoteProps = {
  children: ReactNode; // What changed, in one or two sentences
};

// A "Changed in 2.0.0" note with a link to the migration guide (spec section 6.1.3,
// item 4), as docs-page.html shows it.
const ChangedNote = ({ children }: ChangedNoteProps) => {
  return (
    <Box
      role="note"
      sx={(theme) => ({
        padding: "16px 20px",
        borderRadius: "10px",
        border: `1px solid ${theme.tokens.changedNote.border}`,
        backgroundColor: theme.tokens.changedNote.background,
      })}
    >
      <Box
        component="p"
        sx={(theme) => ({
          margin: "0 0 4px",
          fontFamily: theme.tokens.fontMono,
          fontSize: "13px",
          fontWeight: 600,
          textTransform: "uppercase",
          color: theme.tokens.changedNote.label,
        })}
      >
        Changed in 2.0.0
      </Box>
      <Box component="p" sx={{ margin: 0 }}>
        {children}{" "}
        <Link component={RouterLink} to={MIGRATION_GUIDE_PATH}>
          Read the migration guide
        </Link>
        .
      </Box>
    </Box>
  );
};

export default ChangedNote;
