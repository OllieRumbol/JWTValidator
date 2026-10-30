import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import type { DocsSection } from "@/content/docsPages";
import { dictionaryExtensionMethods } from "@/content/methods/dictionaryExtensions";

// The text and examples are the 1.0.3 site's. Release 3 rewrites them for 2.0.0.
const examples = [
  `Dictionary<string, List<string>> result ...

Console.WriteLine(result.Print());`,
  `Dictionary<string, List<string>> result ...

bool hasMemberRole = result.ContainsKeyAndValue("role", "MEMBER");`,
  `Dictionary<string, List<string>> result ...

bool hasMemberRole = result.ContainsValueInList("MEMBER");`,
  `Dictionary<string, List<string>> dictionary = ...

if (dictionary.IsEmpty())
{
  ...
}

...`,
];

const sections: DocsSection[] = [
  { id: "code-samples", title: "Code Samples", level: 2 },
  { id: "methods", title: "Methods", level: 2 },
];

const DictionaryExtensionsPage = () => {
  return (
    <DocsLayout
      slug="dictionary-extensions"
      description="I want to make every part of processing a JWT easy for developers. Which is why I have created a few dictionary extenion methods to help find specfic properties with the dictionary of claims."
      sections={sections}
    >
      <ArticleSection id="code-samples" title="Code Samples">
        {examples.map((example) => (
          <CodeBlock key={example} code={example} />
        ))}
      </ArticleSection>
      <MethodsSection methods={dictionaryExtensionMethods} />
    </DocsLayout>
  );
};

export default DictionaryExtensionsPage;
