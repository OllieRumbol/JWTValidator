import Box from "@mui/material/Box";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

// The current Home example, unchanged. Release 3 replaces it with the compiled OpenID
// Connect and secret examples in tabs (T27).
const EXAMPLE = `string jwt = "eyJhbGciOi.....";

JWTValidatorOptions jwtValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();

if (new JWTValidator().TryValidateJWT(jwt, jwtValidatorOptions, out Dictionary<string, List<string>> result) == false)
{
  Console.WriteLine("Invalid jwt");
}

bool hasMemberRole = result.DictionaryContainsKeyAndValue("role", "MEMBER");

DateTime expiryDate = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, "serguhvalhoier.....");`;

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
          Validate a token
        </Box>
        <Box
          component="p"
          sx={(theme) => ({
            margin: "0 0 26px",
            color: theme.tokens.mutedText,
          })}
        >
          Check a token that is signed with a secret, then read its claims and
          its expiry date.
        </Box>
        <CodeBlock code={EXAMPLE} />
      </Box>
    </Box>
  );
};

export default ExampleSection;
