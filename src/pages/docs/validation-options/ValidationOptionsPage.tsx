import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodReference from "@/components/MethodReference/MethodReference";
import MethodTable from "@/components/MethodTable/MethodTable";
import type { DocsSection } from "@/content/docsPages";
import { validationOptionsMethods } from "@/content/methods/validationOptions";

// The text and examples are the 1.0.3 site's. Release 3 rewrites them for 2.0.0.
const secretExample = `JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();`;

const openIdExample = `JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromOpenIdUrl("https://<host_name>:<port_number>/oidc/endpoint/<provider_name>/.well-known/openid-configuration")
  .WithIssuer("exampleIssuer")
  .WithAudience("exampleAudience")
  .WithExpiryDate()
  .Build();`;

const sections: DocsSection[] = [
  { id: "code-example", title: "Code example", level: 2 },
  { id: "technical-details", title: "Technical Details", level: 2 },
  { id: "methods", title: "Methods", level: 2 },
];

const ValidationOptionsPage = () => {
  return (
    <DocsLayout
      slug="validation-options"
      description="The builder is used within this library to configure what parts of the JWT need validating. The JWTValidatorOptions class contains all of the different priorties of what can be validated in a JWT. However this class can only be created using the JWTValidatorOptionsBuilderCreator builder."
      sections={sections}
    >
      <ArticleSection id="code-example" title="Code example">
        <CodeBlock code={secretExample} caption="Symmetric Key Encryption" />
        <CodeBlock code={openIdExample} caption="Asymmetric Key Encryption" />
      </ArticleSection>
      <ArticleSection id="technical-details" title="Technical Details">
        <p>A variety of different builder design patterns have been used.</p>
        <ul>
          <li>
            Fluent: Allows developers to chain method calls as each method
            returns the current instance
          </li>
          <li>
            Strict: Developers can only call methods in a specfic order and
            can&apos;t chain certain methods together
          </li>
          <li>
            Nested: The JWTValidatorOptions model properties can only be set
            using the builder
          </li>
        </ul>
      </ArticleSection>
      <ArticleSection id="methods" title="Methods">
        <MethodTable methods={validationOptionsMethods} />
        {validationOptionsMethods.map((method) => (
          <MethodReference key={method.name} method={method} />
        ))}
      </ArticleSection>
    </DocsLayout>
  );
};

export default ValidationOptionsPage;
