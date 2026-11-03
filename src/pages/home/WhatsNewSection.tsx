import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router";
import { primaryLinkStyle } from "@/app/theme";
import { MIGRATION_GUIDE_PATH } from "@/content/docsPages";

// The six changes in spec section 2, as home.html words them, with the maintainer's
// changes of 2026-11-02 and 2026-11-03. The migration guide's table has a column for who each change
// affects, so its "What to do" text can be shorter. These rows have no such column.
const changes: { name: ReactNode; whatToDo: string }[] = [
  { name: ".NET 10 only", whatToDo: "Move to .NET 10, or stay on 1.0.3." },
  {
    name: "Minimum secret length",
    whatToDo: "Use at least 32 bytes for HS256.",
  },
  {
    name: "Expiry in UTC",
    whatToDo:
      "Convert the expiry to local time if you need it. Remove any time zone workaround.",
  },
  {
    name: (
      <>
        <code>IsEmpty</code> on null
      </>
    ),
    whatToDo: "Check code that relied on the old result.",
  },
  {
    name: "Personal data stays hidden",
    whatToDo: "Show it in your own application while you debug.",
  },
  {
    name: "IdentityModel 8",
    whatToDo: "Use version 8 for any IdentityModel packages you use directly.",
  },
];

// What is new in 2.0.0, with a link to the migration guide (spec section 6.1.7, item 4).
const WhatsNewSection = () => {
  return (
    <Box
      component="section"
      aria-labelledby="whats-new-title"
      sx={{ padding: { xs: "0 16px", md: "0 32px" } }}
    >
      <Box
        sx={(theme) => ({
          maxWidth: 1096,
          margin: "0 auto",
          padding: { xs: "28px 20px", md: "40px 44px" },
          display: "flex",
          flexWrap: "wrap",
          gap: "32px 48px",
          borderRadius: "16px",
          backgroundColor: theme.tokens.whatsNew.background,
        })}
      >
        <Box sx={{ flex: "1 1 260px", minWidth: 0 }}>
          <Box
            component="p"
            sx={(theme) => ({
              margin: "0 0 8px",
              fontFamily: theme.tokens.fontMono,
              fontSize: "14px",
              fontWeight: 600,
              color: theme.tokens.accentText[0],
            })}
          >
            New in 2.0.0
          </Box>
          <Box
            component="h2"
            id="whats-new-title"
            sx={{
              margin: "0 0 12px",
              fontSize: { xs: "28px", md: "30px" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Same names. Safer behaviour.
          </Box>
          <Box
            component="p"
            sx={(theme) => ({
              margin: "0 0 20px",
              color: theme.tokens.whatsNew.text,
            })}
          >
            Six changes can affect your code. Here is what to do about each.
          </Box>
          <Box
            component={RouterLink}
            to={MIGRATION_GUIDE_PATH}
            sx={(theme) => ({
              ...primaryLinkStyle(theme),
              display: "inline-block",
              padding: "11px 22px",
            })}
          >
            Read the migration guide
          </Box>
        </Box>
        <Box
          // Scrolls sideways on a narrow screen, so the keyboard can reach it.
          role="region"
          aria-label="Changes in 2.0.0, and what to do"
          tabIndex={0}
          sx={(theme) => ({
            flex: "2 1 560px",
            minWidth: 0,
            overflowX: "auto",
            borderRadius: "12px",
            backgroundColor: theme.tokens.background,
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            },
            "& th": { padding: "12px 18px", textAlign: "left" },
            "& td": { padding: "10px 18px", color: theme.tokens.bodyText },
            "& td:first-of-type": { fontWeight: 600, color: theme.tokens.text },
            "& thead tr": { borderBottom: `1px solid ${theme.tokens.border}` },
            "& tbody tr:not(:last-of-type)": {
              borderBottom: `1px solid ${theme.tokens.divider}`,
            },
            "& code": { fontFamily: theme.tokens.fontMono, fontSize: "15px" },
          })}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Change</th>
                <th scope="col">What to do</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.whatToDo}>
                  <td>{change.name}</td>
                  <td>{change.whatToDo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default WhatsNewSection;
