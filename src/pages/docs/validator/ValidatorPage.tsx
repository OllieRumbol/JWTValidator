import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodReference from "@/components/MethodReference/MethodReference";
import MethodTable from "@/components/MethodTable/MethodTable";
import type { DocsSection } from "@/content/docsPages";
import { validatorMethods } from "@/content/methods/validator";

// The text and examples are the 1.0.3 site's. Release 3 rewrites them for 2.0.0.
const tryValidateExample = `string JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

if (new JWTValidator().TryValidateJWT(JWT, jWTValidatorOptions, out Dictionary<string, List<string>> result) == false)
{
    Console.WriteLine("Invalid JWT");
    return;
}`;

const validateExample = `string JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

Dictionary<string, List<string>> result = new JWTValidator().ValidateJWT(JWT, jWTValidatorOptions);`;

const sections: DocsSection[] = [
  { id: "code-samples", title: "Code Samples", level: 2 },
  { id: "methods", title: "Methods", level: 2 },
];

const ValidatorPage = () => {
  return (
    <DocsLayout
      slug="validator"
      description="A key piller to this library is to enable developers to write the cleanest code possible that matches their coding style. That is why there are two different methods that can be ued to validate a JWT. However, each method outputs a dictionary of claims within a JWT. The key being the property name with a list of corresponding values."
      sections={sections}
    >
      <ArticleSection id="code-samples" title="Code Samples">
        <CodeBlock code={tryValidateExample} />
        <CodeBlock code={validateExample} />
      </ArticleSection>
      <ArticleSection id="methods" title="Methods">
        <MethodTable methods={validatorMethods} />
        {validatorMethods.map((method) => (
          <MethodReference key={method.name} method={method} />
        ))}
      </ArticleSection>
    </DocsLayout>
  );
};

export default ValidatorPage;
