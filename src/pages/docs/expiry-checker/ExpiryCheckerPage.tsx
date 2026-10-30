import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import type { DocsSection } from "@/content/docsPages";
import { expiryCheckerMethods } from "@/content/methods/expiryChecker";

// The text and examples are the 1.0.3 site's. Release 3 rewrites them for 2.0.0.
const hasExpiredExample = `string jwt = "....";

bool result = new JWTExpiryChecker().HasJWTExpired(jwt, "serguhvalhoier.....");

if(new JWTExpiryChecker().TryHasJWTExpired(jwt, "serguhvalhoier.....", out bool isExpired))
{
    ...
}
...`;

const whenExpiresExample = `string jwt = "....";

DateTime result = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, "serguhvalhoier.....");

if(new JWTExpiryChecker().TryGetWhenDoesJWTExpire(jwt, "serguhvalhoier.....", out DateTime expiryDate))
{
    ...
}
...`;

const sections: DocsSection[] = [
  { id: "code-samples", title: "Code Samples", level: 2 },
  { id: "methods", title: "Methods", level: 2 },
];

const ExpiryCheckerPage = () => {
  return (
    <DocsLayout
      slug="expiry-checker"
      description={`With the release of version 1.0.3 came the new feature of "Jwt Expiry Checker". This new feature allows developers to quickly validate the expiry date of a JWT as well as know the exact date and time the JWT expires. This information allows developers to then start a refresh process and get an new/ updated JWT from their provider.`}
      sections={sections}
    >
      <ArticleSection id="code-samples" title="Code Samples">
        <CodeBlock code={hasExpiredExample} />
        <CodeBlock code={whenExpiresExample} />
      </ArticleSection>
      <MethodsSection methods={expiryCheckerMethods} />
    </DocsLayout>
  );
};

export default ExpiryCheckerPage;
