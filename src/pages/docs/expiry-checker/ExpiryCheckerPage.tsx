import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import ChangedNote from "@/components/ChangedNote/ChangedNote";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import type { DocsSection } from "@/content/docsPages";
import { expiryCheckerMethods } from "@/content/methods/expiryChecker";
import openIdConnectExample from "@examples/expiry-checker-openid-connect.cs?raw";
import secretExample from "@examples/expiry-checker-secret.cs?raw";

const sections: DocsSection[] = [
  { id: "check-the-expiry", title: "Check the expiry", level: 2 },
  { id: "what-it-checks", title: "What the checker checks", level: 2 },
  { id: "when-it-fails", title: "When it fails", level: 2 },
  { id: "reference", title: "Reference", level: 2 },
];

// The Expiry checker topic of spec section 6.1.3. Each fact is from the library README
// or source at tag v2.0.0, or a probe against the 2.0.0 package (T30).
const ExpiryCheckerPage = () => {
  return (
    <DocsLayout
      slug="expiry-checker"
      description="The expiry checker says when a token expires, and whether it has expired. Times are in UTC."
      sections={sections}
    >
      <ArticleSection id="check-the-expiry" title="Check the expiry">
        <p>
          Create the checker with <code>new JWTExpiryChecker()</code>, or get it
          from a container, as{" "}
          <Link component={RouterLink} to="/docs/dependency-injection">
            Dependency injection
          </Link>{" "}
          shows. It has two pairs of methods, one that throws and one that
          returns false:
        </p>
        <ul>
          <li>
            <code>WhenDoesJWTExpire</code> and{" "}
            <code>TryGetWhenDoesJWTExpire</code> give the expiry time in UTC.
          </li>
          <li>
            <code>HasJWTExpired</code> and <code>TryHasJWTExpired</code> compare
            the expiry time with the current UTC time.
          </li>
        </ul>
        <p>
          Each method takes the token and the key: a secret as a{" "}
          <code>String</code>, or the address of the OpenID configuration as a{" "}
          <code>Uri</code>.
        </p>
        <ChangedNote>
          <code>WhenDoesJWTExpire</code> returns UTC, not local time.{" "}
          <code>HasJWTExpired</code> gives the correct result in every time
          zone. With the <code>String</code> overloads, a secret shorter than
          the minimum for the token&apos;s algorithm now fails.
        </ChangedNote>
        <CodeBlock code={secretExample} caption="The expiry, with a secret" />
        <CodeBlock
          code={openIdConnectExample}
          caption="Has it expired, with an OpenID Connect provider"
        />
      </ArticleSection>

      <ArticleSection id="what-it-checks" title="What the checker checks">
        <p>
          The checker validates the token&apos;s signature, then reads its{" "}
          <code>exp</code> claim. It does not check the issuer or the audience.
          It accepts an expired token, so it can still give the expiry time.
        </p>
        <p>
          <code>HasJWTExpired</code> compares the expiry with the current time
          exactly. It does not allow the 5-minute clock skew of{" "}
          <code>WithExpiryDate</code>. So a token that expired 2 minutes ago has
          expired here, but still passes <code>ValidateJWT</code> with{" "}
          <code>WithExpiryDate</code>.
        </p>
        <p>
          Each call validates the token again. With an OpenID address, each call
          also downloads the OpenID configuration again.{" "}
          <Link
            component={RouterLink}
            to="/docs/known-limitations/openid-downloads"
          >
            Known limitations
          </Link>{" "}
          explains why this matters.
        </p>
      </ArticleSection>

      <ArticleSection id="when-it-fails" title="When it fails">
        <ul>
          <li>
            The signature does not match, the secret is too short, or the OpenID
            configuration cannot be downloaded: an <code>Exception</code> with
            the message &quot;Unable to validate JWT&quot;.{" "}
            <Link
              component={RouterLink}
              to="/docs/validation-options/minimum-secret-length"
            >
              Minimum secret length
            </Link>{" "}
            gives the length for each algorithm.
          </li>
          <li>
            The token has no <code>exp</code> claim: an <code>Exception</code>{" "}
            with the message &quot;Jwt does not contain an expiry&quot;.
          </li>
          <li>
            The token&apos;s <code>exp</code> is after the year 9999: an{" "}
            <code>ArgumentOutOfRangeException</code>.
          </li>
          <li>
            The token or the secret is null or empty: an{" "}
            <code>ArgumentException</code>. For the token,{" "}
            <code>HasJWTExpired</code> throws <code>ArgumentNullException</code>{" "}
            instead.
          </li>
          <li>
            The OpenID address is null: a <code>NullReferenceException</code>.
          </li>
        </ul>
        <p>
          The <code>Try</code> methods return false in each of these cases.{" "}
          <code>TryGetWhenDoesJWTExpire</code> then gives{" "}
          <code>DateTime.MinValue</code>, and <code>TryHasJWTExpired</code>{" "}
          gives false.
        </p>
      </ArticleSection>

      <MethodsSection methods={expiryCheckerMethods} />
    </DocsLayout>
  );
};

export default ExpiryCheckerPage;
