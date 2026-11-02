import Box from "@mui/material/Box";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import ChangedNote from "@/components/ChangedNote/ChangedNote";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import ScrollTable from "@/components/ScrollTable/ScrollTable";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import type { DocsSection } from "@/content/docsPages";
import { validationOptionsMethods } from "@/content/methods/validationOptions";
import googleExample from "@examples/validation-options-google.cs?raw";

const sections: DocsSection[] = [
  { id: "choose-a-signing-key", title: "Choose a signing key", level: 2 },
  { id: "minimum-secret-length", title: "Minimum secret length", level: 3 },
  { id: "add-checks-and-build", title: "Add checks and build", level: 2 },
  { id: "method-order", title: "The order of the methods", level: 2 },
  { id: "the-options", title: "The JWTValidatorOptions class", level: 2 },
  { id: "reference", title: "Reference", level: 2 },
];

// The minimum secret length for each algorithm, from the library README.
const secretLengths = [
  { algorithm: "HS256", bytes: 32 },
  { algorithm: "HS384", bytes: 48 },
  { algorithm: "HS512", bytes: 64 },
];

// Validation options and Secret length (spec section 6.1.3), as docs-page.html shows
// them. Each fact is from the library README or source at tag v2.0.0, or a probe
// against the 2.0.0 package (T29).
const ValidationOptionsPage = () => {
  return (
    <DocsLayout
      slug="validation-options"
      description="Build a JWTValidatorOptions object. It says where the signing keys come from, and which parts of the token to check."
      sections={sections}
    >
      <ArticleSection id="choose-a-signing-key" title="Choose a signing key">
        <p>
          Start with <code>Create()</code>, then choose one source for the key:
        </p>
        <ul>
          <li>
            <code>WithSigningKeyFromSecret(secret)</code> for a token signed
            with a secret.
          </li>
          <li>
            <code>WithSigningKeyFromOpenIdUrl(url)</code> for a token from an
            OpenID Connect provider. The library downloads the provider&apos;s
            signing keys from its OpenID configuration.
          </li>
        </ul>
        <ChangedNote>
          A secret shorter than the minimum for the token&apos;s algorithm no
          longer validates.
        </ChangedNote>
        <SectionHeading id="minimum-secret-length" level={3}>
          Minimum secret length
        </SectionHeading>
        <p>The length is counted in UTF-8 bytes.</p>
        <ScrollTable label="Minimum secret length">
          <table>
            <thead>
              <tr>
                <th scope="col">Algorithm</th>
                <th scope="col">Minimum secret length</th>
              </tr>
            </thead>
            <Box
              component="tbody"
              sx={(theme) => ({ fontFamily: theme.tokens.fontMono })}
            >
              {secretLengths.map((row) => (
                <tr key={row.algorithm}>
                  <td>{row.algorithm}</td>
                  <td>{row.bytes} bytes</td>
                </tr>
              ))}
            </Box>
          </table>
        </ScrollTable>
        <p>
          A shorter secret fails validation: <code>ValidateJWT</code> throws
          and <code>TryValidateJWT</code> returns false. IdentityModel reports
          it as <code>SecurityTokenSignatureKeyNotFoundException</code>, not as
          an error about the length. A wrong secret gives the same exception,
          so check both the length and the value of the secret.
        </p>
      </ArticleSection>

      <ArticleSection id="add-checks-and-build" title="Add checks and build">
        <p>
          Add only the checks you need. A check that you do not add is not
          made.
        </p>
        <ul>
          <li>
            <code>WithIssuer(issuer)</code> checks who issued the token.
          </li>
          <li>
            <code>WithAudience(audience)</code> checks who the token is for.
          </li>
          <li>
            <code>WithExpiryDate()</code> checks that the token has not expired
            and is already valid. IdentityModel allows a clock skew of 5
            minutes, so a token stays valid for up to 5 minutes after its
            expiry time.
          </li>
        </ul>
        <CodeBlock code={googleExample} caption="An ID token from Google" />
      </ArticleSection>

      <ArticleSection id="method-order" title="The order of the methods">
        <ol>
          <li>
            <code>Create()</code> comes first.
          </li>
          <li>
            Then one signing key method, <code>WithSigningKeyFromSecret</code>{" "}
            or <code>WithSigningKeyFromOpenIdUrl</code>.
          </li>
          <li>
            Then any of <code>WithIssuer</code>, <code>WithAudience</code> and{" "}
            <code>WithExpiryDate</code>, in any order.
          </li>
          <li>
            <code>Build()</code> comes last.
          </li>
        </ol>
        <p>
          Each method returns a type that has only the methods allowed next.
          So code in another order, or with two signing keys, does not compile.
        </p>
      </ArticleSection>

      <ArticleSection id="the-options" title="The JWTValidatorOptions class">
        <p>
          <code>Build()</code> returns a <code>JWTValidatorOptions</code>{" "}
          object. Pass it to the validator. Its properties,{" "}
          <code>Secret</code>, <code>OpenIdUrl</code>, <code>Issuer</code>,{" "}
          <code>Audience</code> and <code>ExpiryDate</code>, are read-only.
          Only the builder sets them.
        </p>
        <p>
          <code>Print()</code> returns the options as text while you debug.
          The text shows the secret, so do not write it to a log.
        </p>
      </ArticleSection>

      <MethodsSection methods={validationOptionsMethods} />
    </DocsLayout>
  );
};

export default ValidationOptionsPage;
