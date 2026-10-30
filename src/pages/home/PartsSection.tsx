import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";

// The four parts of the library, each with its docs page (spec section 6.1.7, item 3).
const parts = [
  {
    name: "Options builder",
    description:
      "Choose where the signing key comes from, then add the checks you need.",
    slug: "validation-options",
    linkText: "Validation options",
  },
  {
    name: "Validator",
    description:
      "Says whether the token is valid, and returns its claims as a dictionary.",
    slug: "validator",
    linkText: "Validator",
  },
  {
    name: "Expiry checker",
    description: "Says when the token expires, and whether it has expired.",
    slug: "expiry-checker",
    linkText: "Expiry checker",
  },
  {
    name: "Dictionary extensions",
    description:
      "Find a claim or a value in the result, or print it while you debug.",
    slug: "dictionary-extensions",
    linkText: "Dictionary extensions",
  },
];

const PartsSection = () => {
  return (
    <Box component="section" aria-labelledby="parts-title">
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "48px 16px", md: "72px 32px" },
        }}
      >
        <Box
          component="h2"
          id="parts-title"
          sx={{
            margin: "0 0 32px",
            fontSize: { xs: "28px", md: "32px" },
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Four small parts
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "36px 48px",
          }}
        >
          {parts.map((part, index) => (
            <Box key={part.slug} sx={{ display: "flex", gap: "18px" }}>
              <Box
                component="span"
                aria-hidden="true"
                sx={(theme) => ({
                  flex: "0 0 44px",
                  height: "44px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "10px",
                  fontFamily: theme.tokens.fontMono,
                  fontSize: "15px",
                  fontWeight: 600,
                  // The fourth part starts the colours again, as home.html shows.
                  color: theme.tokens.accentText[index % 3],
                  backgroundColor: theme.tokens.stepBackground[index % 3],
                })}
              >
                {String(index + 1).padStart(2, "0")}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box
                  component="h3"
                  sx={{ margin: "0 0 4px", fontSize: "20px" }}
                >
                  {part.name}
                </Box>
                <Box
                  component="p"
                  sx={(theme) => ({
                    margin: "0 0 6px",
                    color: theme.tokens.mutedText,
                  })}
                >
                  {part.description}
                </Box>
                <Link
                  component={RouterLink}
                  to={`/docs/${part.slug}`}
                  sx={{ fontWeight: 600 }}
                >
                  {part.linkText}
                </Link>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PartsSection;
