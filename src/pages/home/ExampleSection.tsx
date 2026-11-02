import Box from "@mui/material/Box";
import ExampleTabs from "@/components/ExampleTabs/ExampleTabs";
import openIdConnectExample from "@examples/home-openid-connect.cs?raw";
import secretExample from "@examples/home-secret.cs?raw";

// The two compiled examples, OpenID Connect first because it is the library's main use
// (spec section 6.1.7, item 2).
const examples = [
  { id: "openid-connect", title: "OpenID Connect", code: openIdConnectExample },
  { id: "secret", title: "Secret", code: secretExample },
];

const ExampleSection = () => {
  return (
    <Box
      component="section"
      aria-labelledby="example-title"
      sx={(theme) => ({ borderTop: `1px solid ${theme.tokens.border}` })}
    >
      <Box
        sx={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: { xs: "48px 16px", md: "72px 32px" },
        }}
      >
        <Box
          component="h2"
          id="example-title"
          sx={{
            margin: "0 0 8px",
            fontSize: { xs: "28px", md: "32px" },
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Validate a token in a console app
        </Box>
        <Box
          component="p"
          sx={(theme) => ({
            margin: "0 0 26px",
            color: theme.tokens.mutedText,
          })}
        >
          Choose where the signing keys come from. The library&apos;s main use
          is to validate an ID token from an OpenID Connect sign-in.
        </Box>
        <ExampleTabs label="Signing key source" examples={examples} />
      </Box>
    </Box>
  );
};

export default ExampleSection;
