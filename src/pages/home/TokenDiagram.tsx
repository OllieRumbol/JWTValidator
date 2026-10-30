import { Fragment } from "react";
import Box from "@mui/material/Box";
import type { Theme } from "@mui/material/styles";

// An example token: {"alg":"HS256"}, {"role":"member","exp":1793451600} and a made-up
// signature. The parts are in the order of the logo bars.
const tokenParts = [
  "eyJhbGciOiJIUzI1NiJ9",
  "eyJyb2xlIjoibWVtYmVyIiwiZXhwIjoxNzkzNDUxNjAwfQ",
  "Zm9uY3Rpb25hbGx5LWEtc2lnbmF0dXJlLWhlcmU",
];

const partNames = ["Header", "Payload (claims)", "Signature"];

// The claims that the example token gives back.
const claims = [
  { name: "role", value: '[ "member" ]' },
  { name: "exp", value: '[ "1793451600" ]' },
];

const cardStyle = (theme: Theme) => ({
  margin: 0,
  backgroundColor: theme.tokens.background,
  border: `1px solid ${theme.tokens.border}`,
  borderRadius: "14px",
  boxShadow: theme.tokens.cardShadow,
});

// The hero's picture of a token and the validation result, built from markup so it
// needs no image (plan section 3.5, "Images").
const TokenDiagram = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <Box
        component="figure"
        sx={(theme) => ({ ...cardStyle(theme), padding: "22px" })}
      >
        <Box
          component="figcaption"
          sx={(theme) => ({
            margin: "0 0 12px",
            fontSize: "14px",
            color: theme.tokens.mutedText,
          })}
        >
          A token is three parts, joined by dots
        </Box>
        <Box
          sx={(theme) => ({
            fontFamily: theme.tokens.fontMono,
            fontSize: "15px",
            lineHeight: 1.7,
            fontWeight: 500,
            wordBreak: "break-all",
          })}
        >
          {tokenParts.map((part, index) => (
            <span key={part}>
              {index > 0 && (
                <Box
                  component="span"
                  sx={(theme) => ({ color: theme.tokens.mutedText })}
                >
                  .
                </Box>
              )}
              <Box
                component="span"
                sx={(theme) => ({ color: theme.tokens.accentText[index] })}
              >
                {part}
              </Box>
            </span>
          ))}
        </Box>
        <Box
          component="ul"
          aria-label="Token parts"
          sx={(theme) => ({
            listStyle: "none",
            margin: "14px 0 0",
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 18px",
            fontSize: "14px",
            color: theme.tokens.bodyText,
          })}
        >
          {partNames.map((name, index) => (
            <Box
              component="li"
              key={name}
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Box
                component="span"
                aria-hidden="true"
                sx={(theme) => ({
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  backgroundColor: theme.tokens.logoBars[index],
                })}
              />
              {name}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        component="figure"
        sx={(theme) => ({
          ...cardStyle(theme),
          // phone.html shows the token only.
          display: { xs: "none", sm: "block" },
          padding: "20px 22px",
          fontFamily: theme.tokens.fontMono,
          fontSize: "15px",
        })}
      >
        <Box
          component="figcaption"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
            fontWeight: 600,
            color: theme.tokens.success.text,
          })}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          TryValidateJWT returned true
        </Box>
        <Box
          component="dl"
          sx={(theme) => ({
            margin: 0,
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            gap: "6px 18px",
            color: theme.tokens.bodyText,
            "& dd": { margin: 0 },
          })}
        >
          {claims.map((claim) => (
            <Fragment key={claim.name}>
              <Box
                component="dt"
                sx={(theme) => ({ color: theme.tokens.link })}
              >
                {claim.name}
              </Box>
              <dd>{claim.value}</dd>
            </Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TokenDiagram;
