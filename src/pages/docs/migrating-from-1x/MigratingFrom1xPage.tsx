import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import ScrollTable from "@/components/ScrollTable/ScrollTable";
import type { DocsSection } from "@/content/docsPages";
import expiryAfter from "@examples/migrating-from-1x-expiry-after.cs?raw";
import expiryBefore from "@examples/migrating-from-1x-expiry-before.cs?raw";
import secretAfter from "@examples/migrating-from-1x-secret-after.cs?raw";
import secretBefore from "@examples/migrating-from-1x-secret-before.cs?raw";

const SLUG = "migrating-from-1x";

// migration-guide.html shows shorter names in "On this page", but each entry must match
// its heading, so a link cannot drift from its section (DocsPage.test.tsx).
const sections: DocsSection[] = [
  { id: "summary-of-changes", title: "Summary of changes", level: 2 },
  { id: "net-10", title: ".NET 10 only", level: 2 },
  { id: "minimum-secret-length", title: "Minimum secret length", level: 2 },
  { id: "expiry-in-utc", title: "Expiry in UTC", level: 2 },
  {
    id: "isempty",
    title: "IsEmpty on an empty or null dictionary",
    level: 2,
  },
  { id: "logging", title: "Personal-data logging stays off", level: 2 },
  { id: "identitymodel-8", title: "IdentityModel version 8", level: 2 },
  { id: "other-changes", title: "Other changes", level: 2 },
];

// The six changes in spec section 2, one row each in the summary table.
type Change = {
  id: string; // The section the row links to
  name: ReactNode;
  affectsYouIf: ReactNode;
  whatToDo: string;
};

const changes: Change[] = [
  {
    id: "net-10",
    name: ".NET 10 only",
    affectsYouIf: "Your project targets .NET 9 or older.",
    whatToDo: "Move to .NET 10, or stay on 1.0.3.",
  },
  {
    id: "minimum-secret-length",
    name: "Minimum secret length",
    affectsYouIf: (
      <>
        You use <code>WithSigningKeyFromSecret</code>.
      </>
    ),
    whatToDo: "Use at least 32 bytes for HS256.",
  },
  {
    id: "expiry-in-utc",
    name: "Expiry in UTC",
    affectsYouIf: (
      <>
        You use <code>WhenDoesJWTExpire</code>.
      </>
    ),
    whatToDo: "Convert to local time yourself if you need it.",
  },
  {
    id: "isempty",
    name: (
      <>
        <code>IsEmpty</code> on null
      </>
    ),
    affectsYouIf: "You call it on a dictionary that can be empty or null.",
    whatToDo: "Check code that relied on the old result.",
  },
  {
    id: "logging",
    name: "Logging stays off",
    affectsYouIf: "You read IdentityModel messages while you debug.",
    whatToDo: "Turn it on in your own app.",
  },
  {
    id: "identitymodel-8",
    name: "IdentityModel 8",
    affectsYouIf: "Your app also uses IdentityModel packages directly.",
    whatToDo: "Move them to version 8 too.",
  },
];

// The "Affects you if" label and its text, at the top of each change.
const AffectsYouIf = ({ children }: { children: ReactNode }) => (
  <div>
    <Box
      component="p"
      sx={(theme) => ({
        margin: "0 0 4px",
        fontFamily: theme.tokens.fontMono,
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: theme.tokens.mutedText,
      })}
    >
      Affects you if
    </Box>
    <Box component="p" sx={{ margin: 0 }}>
      {children}
    </Box>
  </div>
);

// The 1.0.3 and 2.0.0 code side by side, or one above the other when there is no room.
// Each is a whole compiled program from examples/ (spec section 6.1.3, item 6).
const BeforeAndAfter = ({
  before,
  after,
}: {
  before: string;
  after: string;
}) => (
  <Box
    sx={{
      display: "grid",
      // min() lets a column shrink below 300 px on a narrow screen, so the page does
      // not get wider than the screen (spec section 6.6.3, item 2).
      gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
      gap: "14px",
    }}
  >
    <CodeBlock code={before} caption="1.0.3" />
    <CodeBlock code={after} caption="2.0.0" highlighted />
  </Box>
);

// The migration guide: each change in spec section 2, who it affects and what to do
// (spec section 6.1.3, "Migration from 1.x"), as migration-guide.html shows it.
const MigratingFrom1xPage = () => {
  return (
    <DocsLayout
      slug={SLUG}
      description="Version 2.0.0 renames no classes or methods. Six changes can still affect your code. Check each one before you upgrade."
      sections={sections}
    >
      <ArticleSection id="summary-of-changes" title="Summary of changes">
        <ScrollTable label="Changes, who they affect, and what to do">
          {/* On a narrow screen the table scrolls sideways. Without a minimum width there,
              the last column shrinks to a word or two a line, and each row grows very
              tall. On a wide screen the table fits its box, as the design shows. */}
          <Box
            component="table"
            sx={{
              "& th:last-of-type, & td:last-of-type": {
                minWidth: { xs: "9em", md: 0 },
              },
            }}
          >
            <thead>
              <tr>
                <th scope="col">Change</th>
                <th scope="col">Affects you if</th>
                <th scope="col">What to do</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id}>
                  <Box
                    component="td"
                    sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                  >
                    <Link
                      component={RouterLink}
                      to={`/docs/${SLUG}/${change.id}`}
                      sx={(theme) => ({ color: theme.tokens.text })}
                    >
                      {change.name}
                    </Link>
                  </Box>
                  <td>{change.affectsYouIf}</td>
                  <td>{change.whatToDo}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </ScrollTable>
      </ArticleSection>

      <ArticleSection id="net-10" title=".NET 10 only">
        <AffectsYouIf>Your project targets .NET 9 or older.</AffectsYouIf>
        <p>
          Version 2.0.0 targets <code>net10.0</code> only. .NET 6, 7, 8 and 9
          are no longer supported. Move your project to .NET 10, or keep using
          1.0.3, which stays on nuget.org.
        </p>
      </ArticleSection>

      <ArticleSection id="minimum-secret-length" title="Minimum secret length">
        <AffectsYouIf>
          You use <code>WithSigningKeyFromSecret</code>.
        </AffectsYouIf>
        <p>
          A secret shorter than the minimum for the token&apos;s algorithm no
          longer validates: 32 bytes for HS256, 48 for HS384 and 64 for HS512,
          counted in UTF-8. <code>ValidateJWT</code> throws and{" "}
          <code>TryValidateJWT</code> returns false.
        </p>
        <BeforeAndAfter before={secretBefore} after={secretAfter} />
      </ArticleSection>

      <ArticleSection id="expiry-in-utc" title="Expiry in UTC">
        <AffectsYouIf>
          You use <code>WhenDoesJWTExpire</code> or <code>HasJWTExpired</code>.
        </AffectsYouIf>
        <p>
          <code>WhenDoesJWTExpire</code> now returns UTC, not local time.{" "}
          <code>HasJWTExpired</code> now gives the correct result in every time
          zone.
        </p>
        <BeforeAndAfter before={expiryBefore} after={expiryAfter} />
      </ArticleSection>

      <ArticleSection
        id="isempty"
        title={
          <>
            <code>IsEmpty</code> on an empty or null dictionary
          </>
        }
      >
        <AffectsYouIf>
          You call it on a dictionary that can be empty or null.
        </AffectsYouIf>
        <p>
          1.0.3 returned false for an empty dictionary and threw for null.
          2.0.0 returns true for both.
        </p>
      </ArticleSection>

      <ArticleSection id="logging" title="Personal-data logging stays off">
        <AffectsYouIf>
          You read IdentityModel messages while you debug.
        </AffectsYouIf>
        {/* T31 links "Debugging" to its page, as migration-guide.html shows. The page
            does not exist yet. */}
        <p>
          The library no longer turns on personal data in IdentityModel
          messages. To see it while you debug, set{" "}
          <code>IdentityModelEventSource.ShowPII = true</code> in your own app.
          Debugging has the details.
        </p>
      </ArticleSection>

      <ArticleSection id="identitymodel-8" title="IdentityModel version 8">
        <AffectsYouIf>
          Your app also uses the Microsoft IdentityModel packages directly.
        </AffectsYouIf>
        <p>
          The package now depends on version 8, not version 6. Move your own
          references to version 8 too.
        </p>
      </ArticleSection>

      <ArticleSection id="other-changes" title="Other changes">
        <ul>
          <li>
            With lifetime validation on, a token whose expiry is after 19
            January 2038 now validates.
          </li>
          <li>
            The dictionary extension methods no longer throw for a null
            dictionary, or a null value inside a list.
          </li>
        </ul>
      </ArticleSection>
    </DocsLayout>
  );
};

export default MigratingFrom1xPage;
