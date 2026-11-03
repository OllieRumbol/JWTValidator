import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import type { DocsSection } from "@/content/docsPages";
import { validatorMethods } from "@/content/methods/validator";
import tryValidateExample from "@examples/validator-try-validate-jwt.cs?raw";
import validateExample from "@examples/validator-validate-jwt.cs?raw";

const sections: DocsSection[] = [
  { id: "choose-a-method", title: "Choose a method", level: 2 },
  { id: "what-validatejwt-throws", title: "What ValidateJWT throws", level: 2 },
  { id: "a-failed-download", title: "A failed download", level: 2 },
  { id: "reference", title: "Reference", level: 2 },
];

// What ValidateJWT throws, and why. Checked with a probe against the 2.0.0 package (T29).
const exceptions: { name: string; when: string }[] = [
  {
    name: "ArgumentException",
    when: "The token is null or empty, or the options have no signing key. Options from the builder always have one.",
  },
  { name: "ArgumentNullException", when: "The options are null." },
  {
    name: "SecurityTokenMalformedException",
    when: "The token is not a JWT.",
  },
  {
    name: "SecurityTokenSignatureKeyNotFoundException",
    when: "No signing key matches the signature. A secret that is wrong, or too short, gives this exception.",
  },
  {
    name: "SecurityTokenInvalidIssuerException",
    when: "The issuer is not the one you set with WithIssuer.",
  },
  {
    name: "SecurityTokenInvalidAudienceException",
    when: "The audience is not the one you set with WithAudience.",
  },
  {
    name: "SecurityTokenExpiredException",
    when: "The token expired more than 5 minutes ago.",
  },
  {
    name: "SecurityTokenNotYetValidException",
    when: "The token only becomes valid more than 5 minutes from now.",
  },
  {
    name: "SecurityTokenNoExpirationException",
    when: 'With WithExpiryDate, the token has no "exp" claim.',
  },
  {
    name: "AggregateException",
    when: "The OpenID configuration cannot be downloaded.",
  },
];

// The Validator topic of spec section 6.1.3. Each fact is from the library README or
// source at tag v2.0.0, or a probe against the 2.0.0 package (T29).
const ValidatorPage = () => {
  return (
    <DocsLayout
      slug="validator"
      description="The validator checks a token against your options, and gives you its claims."
      sections={sections}
    >
      <ArticleSection id="choose-a-method" title="Choose a method">
        <p>The validator has two methods. Both check the same things.</p>
        <ul>
          <li>
            <code>TryValidateJWT</code> returns false when the token is not
            valid. Use it when you only need a yes or no.
          </li>
          <li>
            <code>ValidateJWT</code> throws when the token is not valid. The
            exception says why, which helps when you debug.
          </li>
        </ul>
        <CodeBlock code={tryValidateExample} caption="TryValidateJWT" />
        <CodeBlock code={validateExample} caption="ValidateJWT" />
        <p>
          Both give you the claims as a dictionary.{" "}
          <Link component={RouterLink} to="/docs/claims">
            Claims
          </Link>{" "}
          shows its shape.
        </p>
      </ArticleSection>

      <ArticleSection
        id="what-validatejwt-throws"
        title={
          <>
            What <code>ValidateJWT</code> throws
          </>
        }
      >
        <p>
          The exceptions that start with <code>SecurityToken</code> come from
          IdentityModel, in the <code>Microsoft.IdentityModel.Tokens</code>{" "}
          namespace. These are the most common:
        </p>
        {/* A list, not a table: the long exception names would break in the middle
            of a word in a narrow column. */}
        <ul aria-label="Exceptions from ValidateJWT">
          {exceptions.map((exception) => (
            <li key={exception.name}>
              <code>{exception.name}</code>: {exception.when}
            </li>
          ))}
        </ul>
        <p>
          IdentityModel hides personal data in its messages. To see it while you
          debug, set <code>IdentityModelEventSource.ShowPII = true</code> in
          your own application. The library does not turn it on.{" "}
          <Link component={RouterLink} to="/docs/debugging">
            Debugging
          </Link>{" "}
          has the details.
        </p>
      </ArticleSection>

      <ArticleSection id="a-failed-download" title="A failed download">
        <p>
          With <code>WithSigningKeyFromOpenIdUrl</code>, the validator downloads
          the provider&apos;s OpenID configuration and waits for it. When the
          download fails, <code>ValidateJWT</code> throws an{" "}
          <code>AggregateException</code>, and <code>TryValidateJWT</code>{" "}
          returns false.
        </p>
        <p>
          The message that says why is on the exception inside it. Call{" "}
          <code>GetBaseException()</code> to get it, as the{" "}
          <code>ValidateJWT</code> example above does.
        </p>
      </ArticleSection>

      <MethodsSection methods={validatorMethods} />
    </DocsLayout>
  );
};

export default ValidatorPage;
