import type { ReactNode } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import type { DocsSection } from "@/content/docsPages";
import firstToken from "@examples/getting-started-first-token.cs?raw";

const SLUG = "getting-started";

const INSTALL_COMMAND = "dotnet add package JWTValidator";

const sections: DocsSection[] = [
  { id: "what-the-library-does", title: "What the library does", level: 2 },
  { id: "install", title: "Install", level: 2 },
  { id: "requirements", title: "Requirements", level: 2 },
  {
    id: "validate-your-first-token",
    title: "Validate your first token",
    level: 2,
  },
];

// A link to another docs page, in the text.
const DocsLink = ({ slug, children }: { slug: string; children: ReactNode }) => (
  <Link component={RouterLink} to={`/docs/${slug}`}>
    {children}
  </Link>
);

// Getting started (spec section 6.1.3): what the library does, how to install it, what
// it needs, and a short complete example. Each fact is from the library README at tag
// v2.0.0.
const GettingStartedPage = () => {
  return (
    <DocsLayout
      slug={SLUG}
      description="Install JWT Validator, then validate your first token in a console app."
      sections={sections}
    >
      <ArticleSection id="what-the-library-does" title="What the library does">
        <p>
          JWT Validator checks that a JWT is valid, and gives you its claims as
          a dictionary. Its main use is to validate ID tokens from an OpenID
          Connect sign-in. It hides the complexity of the IdentityModel types{" "}
          <code>TokenValidationParameters</code>,{" "}
          <code>JwtSecurityTokenHandler</code> and <code>ClaimsPrincipal</code>.
        </p>
        <p>The library has four parts:</p>
        <ul>
          <li>
            The options builder sets what to check and where the signing keys
            come from. See{" "}
            <DocsLink slug="validation-options">Validation options</DocsLink>.
          </li>
          <li>
            The validator says whether the token is valid, and returns its
            claims. See <DocsLink slug="validator">Validator</DocsLink>.
          </li>
          <li>
            The expiry checker says when the token expires, in UTC, and whether
            it has expired. See{" "}
            <DocsLink slug="expiry-checker">Expiry checker</DocsLink>.
          </li>
          <li>
            The dictionary extensions find a claim or a value in the claims, or
            print them. See{" "}
            <DocsLink slug="dictionary-extensions">
              Dictionary extensions
            </DocsLink>
            .
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="install" title="Install">
        <p>Add the package to your project:</p>
        <CodeBlock code={INSTALL_COMMAND} language="shell" />
      </ArticleSection>

      <ArticleSection id="requirements" title="Requirements">
        <ul>
          <li>
            .NET 10. Version 2.0.0 targets <code>net10.0</code> only.
          </li>
          <li>
            Version 8 of the Microsoft IdentityModel packages. The package
            depends on them. If your application also uses IdentityModel packages
            directly, use version 8 for them too.
          </li>
        </ul>
        <p>
          If you use version 1.0.3, read{" "}
          <DocsLink slug="migrating-from-1x">Migrating from 1.x</DocsLink>{" "}
          before you upgrade.
        </p>
      </ArticleSection>

      <ArticleSection
        id="validate-your-first-token"
        title="Validate your first token"
      >
        <p>
          This console app validates an ID token from Google. It checks the
          signature, the issuer, the audience and the expiry. Use your own
          client ID as the audience.
        </p>
        <CodeBlock code={firstToken} caption="Program.cs" />
        <ol>
          <li>
            <code>Create</code> starts the options.{" "}
            <code>WithSigningKeyFromOpenIdUrl</code> gets the signing keys from
            the provider&apos;s OpenID configuration.
          </li>
          <li>
            <code>WithIssuer</code>, <code>WithAudience</code> and{" "}
            <code>WithExpiryDate</code> add the checks. <code>Build</code>{" "}
            returns the options.
          </li>
          <li>
            <code>TryValidateJWT</code> returns false when the token is not
            valid. When it is valid, <code>claims</code> holds each claim by its
            name in the token, such as <code>sub</code>.
          </li>
        </ol>
        <p>
          For a token signed with a secret, use{" "}
          <code>WithSigningKeyFromSecret</code> in place of{" "}
          <code>WithSigningKeyFromOpenIdUrl</code>. The secret must be long
          enough for the token&apos;s algorithm.{" "}
          <DocsLink slug="validation-options">Validation options</DocsLink> has
          the details.
        </p>
      </ArticleSection>
    </DocsLayout>
  );
};

export default GettingStartedPage;
