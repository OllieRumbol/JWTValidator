import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import HighlightedCode from "@/components/CodeBlock/HighlightedCode";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodReference from "@/components/MethodReference/MethodReference";
import type { DocsSection } from "@/content/docsPages";
import { expiryCheckerConstructors } from "@/content/methods/dependencyInjection";
import registerExample from "@examples/di-register-services.cs?raw";

const sections: DocsSection[] = [
  { id: "register-the-services", title: "Register the services", level: 2 },
  {
    id: "the-validator-interface",
    title: "The IJWTValidator interface",
    level: 2,
  },
  {
    id: "the-checker-constructors",
    title: "The expiry checker's constructors",
    level: 2,
  },
];

// The members of IJWTValidator, from the library source at tag v2.0.0.
const VALIDATOR_INTERFACE = `Boolean TryValidateJWT(String jwt, JWTValidatorOptions options, out Dictionary<String, List<String>> result);
Dictionary<String, List<String>> ValidateJWT(String jwt, JWTValidatorOptions options);`;

// The Dependency injection topic of spec section 6.1.3. Each fact is from the library
// source at tag v2.0.0, or a probe against the 2.0.0 package (T31).
const DependencyInjectionPage = () => {
  return (
    <DocsLayout
      slug="dependency-injection"
      description="Register the validator and the expiry checker in a dependency injection container, and get them in your own classes."
      sections={sections}
    >
      <ArticleSection id="register-the-services" title="Register the services">
        <p>
          Register <code>JWTValidator</code> as <code>IJWTValidator</code>, and
          register <code>JWTExpiryChecker</code> as itself. The expiry checker
          has no public interface.
        </p>
        <p>
          The validator keeps no state between calls, so you can register it as
          a singleton. With both registered, the container gives the expiry
          checker the same validator.
        </p>
        <CodeBlock
          code={registerExample}
          caption="Register the services and use them in a class"
        />
        <p>
          The example also needs the{" "}
          <code>Microsoft.Extensions.DependencyInjection</code> package.
        </p>
      </ArticleSection>

      <ArticleSection
        id="the-validator-interface"
        title={
          <>
            The <code>IJWTValidator</code> interface
          </>
        }
      >
        <p>
          <code>JWTValidator</code> implements <code>IJWTValidator</code>. Use
          the interface to inject the validator, or to replace it with a fake in
          your tests. It has the two validator methods:
        </p>
        <HighlightedCode code={VALIDATOR_INTERFACE} variant="signature" />
        <p>
          <Link component={RouterLink} to="/docs/validator/reference">
            The Validator reference
          </Link>{" "}
          describes each one.
        </p>
      </ArticleSection>

      <ArticleSection
        id="the-checker-constructors"
        title="The expiry checker's constructors"
      >
        <p>
          The expiry checker uses a validator to check the token. Pass your own{" "}
          <code>IJWTValidator</code>, or let the checker create a{" "}
          <code>JWTValidator</code>.
        </p>
        <MethodReference method={expiryCheckerConstructors} />
      </ArticleSection>
    </DocsLayout>
  );
};

export default DependencyInjectionPage;
