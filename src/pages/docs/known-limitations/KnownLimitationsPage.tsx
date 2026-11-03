import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import type { DocsSection } from "@/content/docsPages";

const sections: DocsSection[] = [
  { id: "claim-type-map", title: "The claim type map", level: 2 },
  { id: "openid-downloads", title: "OpenID configuration downloads", level: 2 },
];

// The Known limitations topic of spec section 6.1.3. The facts are from the library
// README and source at tag v2.0.0 (T31).
const KnownLimitationsPage = () => {
  return (
    <DocsLayout
      slug="known-limitations"
      description="Two parts of how JWT Validator works can affect the rest of your application."
      sections={sections}
    >
      <ArticleSection id="claim-type-map" title="The claim type map">
        <p>
          Each validation clears{" "}
          <code>JwtSecurityTokenHandler.DefaultInboundClaimTypeMap</code>. This
          keeps the claim names as they are in the token, for example{" "}
          <code>sub</code>, not the long <code>ClaimTypes</code> names.
        </p>
        <ul>
          <li>
            The map is shared by the whole process. So clearing it also changes
            the claim names for other code in your application that uses{" "}
            <code>JwtSecurityTokenHandler</code>.
          </li>
          <li>
            Clearing the map is not thread-safe. Other code can fail if it reads
            the map at the same moment.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection
        id="openid-downloads"
        title="OpenID configuration downloads"
      >
        <p>
          With an OpenID address, each call downloads the OpenID configuration
          again and waits for it. The library does not keep the configuration
          between calls.
        </p>
        <p>
          The expiry checker validates the token again, so it downloads the
          configuration again too. If you need the claims and the expiry, take
          the expiry from the <code>exp</code> claim of one validation, rather
          than calling both the validator and the expiry checker.{" "}
          <Link component={RouterLink} to="/docs/claims/times">
            Claims
          </Link>{" "}
          shows how to read the time.
        </p>
      </ArticleSection>
    </DocsLayout>
  );
};

export default KnownLimitationsPage;
