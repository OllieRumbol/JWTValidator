import Box from "@mui/material/Box";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import ChangedNote from "@/components/ChangedNote/ChangedNote";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import MethodsSection from "@/components/MethodsSection/MethodsSection";
import ScrollTable from "@/components/ScrollTable/ScrollTable";
import type { DocsSection } from "@/content/docsPages";
import { dictionaryExtensionMethods } from "@/content/methods/dictionaryExtensions";
import claimsExample from "@examples/dictionary-extensions-claims.cs?raw";

const sections: DocsSection[] = [
  { id: "use-the-extensions", title: "Use the extensions", level: 2 },
  { id: "null-and-empty", title: "Empty and null dictionaries", level: 2 },
  { id: "matching", title: "How values match", level: 2 },
  { id: "reference", title: "Reference", level: 2 },
];

// Each method's result for an empty or null dictionary. Checked with a probe against
// the 2.0.0 package (T30).
const emptyResults = [
  { method: "Print", result: "An empty string" },
  { method: "ContainsKeyAndValue", result: "false" },
  { method: "ContainsValueInList", result: "false" },
  { method: "IsEmpty", result: "true" },
];

// The Dictionary extensions topic of spec section 6.1.3. Each fact is from the library
// README or source at tag v2.0.0, or a probe against the 2.0.0 package (T30).
const DictionaryExtensionsPage = () => {
  return (
    <DocsLayout
      slug="dictionary-extensions"
      description="Extension methods for the claims dictionary. Find a claim or a value, check for an empty result, or print the claims while you debug."
      sections={sections}
    >
      <ArticleSection id="use-the-extensions" title="Use the extensions">
        <p>
          Add <code>using JWTValidatorService.Extensions;</code>. The methods
          then work on any <code>Dictionary</code> whose values are lists, such
          as the claims from the validator.
        </p>
        <CodeBlock code={claimsExample} caption="Check and print the claims" />
      </ArticleSection>

      <ArticleSection id="null-and-empty" title="Empty and null dictionaries">
        <p>
          You can call each method on an empty or a null dictionary. None of
          them throws.
        </p>
        <ScrollTable label="Results for an empty or null dictionary">
          <table>
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {emptyResults.map((row) => (
                <tr key={row.method}>
                  <td>
                    <code>{row.method}</code>
                  </td>
                  <Box
                    component="td"
                    sx={(theme) => ({ fontFamily: theme.tokens.fontMono })}
                  >
                    {row.result}
                  </Box>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollTable>
        <ChangedNote>
          <code>IsEmpty</code> returns true for an empty or null dictionary. The
          methods no longer throw for a null dictionary, or for a null value in
          a list.
        </ChangedNote>
      </ArticleSection>

      <ArticleSection id="matching" title="How values match">
        <p>
          Keys and values match exactly, so case matters. For example,{" "}
          <code>ContainsKeyAndValue(&quot;roles&quot;, &quot;member&quot;)</code>{" "}
          does not find <code>&quot;MEMBER&quot;</code>.
        </p>
        <p>
          A null value in a list does not cause an error. The search goes on to
          the next value.
        </p>
      </ArticleSection>

      <MethodsSection methods={dictionaryExtensionMethods} />
    </DocsLayout>
  );
};

export default DictionaryExtensionsPage;
