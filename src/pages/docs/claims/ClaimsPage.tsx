import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import ScrollTable from "@/components/ScrollTable/ScrollTable";
import type { DocsSection } from "@/content/docsPages";
import readExample from "@examples/claims-read.cs?raw";

const sections: DocsSection[] = [
  { id: "the-dictionary", title: "The dictionary", level: 2 },
  { id: "values", title: "How each value appears", level: 2 },
  { id: "times", title: "Times", level: 2 },
  { id: "read-the-claims", title: "Read the claims", level: 2 },
];

// Each kind of claim value, and how it appears in the dictionary. The library README
// lists these, and a probe against the 2.0.0 package gave these exact results (T29).
const values = [
  { kind: "A string", inToken: '"sub": "1234"', inDictionary: '["1234"]' },
  {
    kind: "An array",
    inToken: '"roles": ["admin", "member"]',
    inDictionary: '["admin", "member"]',
  },
  { kind: "A number", inToken: '"age": 42', inDictionary: '["42"]' },
  { kind: "A boolean", inToken: '"admin": true', inDictionary: '["true"]' },
  {
    kind: "A nested object",
    inToken: '"address": {"city": "London", "floor": 3}',
    inDictionary: '["{\\"city\\":\\"London\\",\\"floor\\":3}"]',
  },
  { kind: "A null value", inToken: '"nickname": null', inDictionary: '[""]' },
  {
    kind: "A time",
    inToken: '"exp": 1793451600',
    inDictionary: '["1793451600"]',
  },
];

// The Claims topic of spec section 6.1.3: the shape of the dictionary that the
// validator returns.
const ClaimsPage = () => {
  return (
    <DocsLayout
      slug="claims"
      description="The validator returns the token's claims as a Dictionary<String, List<String>>. This page shows how each claim appears in it."
      sections={sections}
    >
      <ArticleSection id="the-dictionary" title="The dictionary">
        <ul>
          <li>
            The key is the claim name as it is in the token, for example{" "}
            <code>sub</code> or <code>email</code>.{" "}
            <Link component={RouterLink} to="/docs/known-limitations/claim-type-map">
              Known limitations
            </Link>{" "}
            explains how the library keeps these names.
          </li>
          <li>
            The value is a list of strings. Most claims have one string. A
            claim with an array has one string for each item.
          </li>
          <li>
            A claim that is not in the token is not in the dictionary. Use{" "}
            <code>TryGetValue</code> for a claim that can be missing.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="values" title="How each value appears">
        <p>Every value becomes a string:</p>
        <ScrollTable label="Claim values in the dictionary">
          {/* On a narrow screen the table scrolls sideways. Without a minimum width
              there, the code columns shrink to a few letters a line. */}
          <Box component="table" sx={{ minWidth: { xs: "36em", md: 0 } }}>
            <thead>
              <tr>
                <th scope="col">Value</th>
                <th scope="col">In the token</th>
                <th scope="col">In the dictionary</th>
              </tr>
            </thead>
            <tbody>
              {values.map((value) => (
                <tr key={value.kind}>
                  <td>{value.kind}</td>
                  <td>
                    <code>{value.inToken}</code>
                  </td>
                  <td>
                    <code>{value.inDictionary}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </ScrollTable>
      </ArticleSection>

      <ArticleSection id="times" title="Times">
        <p>
          The times <code>exp</code>, <code>nbf</code> and <code>iat</code> are
          Unix seconds, as text. To get a date, parse the text, then call{" "}
          <code>DateTimeOffset.FromUnixTimeSeconds</code>. The time is in UTC.
        </p>
      </ArticleSection>

      <ArticleSection id="read-the-claims" title="Read the claims">
        <CodeBlock code={readExample} caption="Read a claim, an array and a time" />
      </ArticleSection>
    </DocsLayout>
  );
};

export default ClaimsPage;
