import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import ArticleSection from "@/components/ArticleSection/ArticleSection";
import ChangedNote from "@/components/ChangedNote/ChangedNote";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import type { DocsSection } from "@/content/docsPages";
import showPiiExample from "@examples/debugging-show-pii.cs?raw";

const sections: DocsSection[] = [
  { id: "personal-data", title: "Personal data in messages", level: 2 },
  { id: "only-while-you-debug", title: "Only while you debug", level: 2 },
  { id: "read-the-message", title: "Read the message", level: 2 },
];

// The Debugging topic of spec section 6.1.3. The facts are from the library README and
// the release notes at tag v2.0.0 (T31).
const DebuggingPage = () => {
  return (
    <DocsLayout
      slug="debugging"
      description="See why a token is not valid, and turn on personal data in IdentityModel messages while you debug."
      sections={sections}
    >
      <ArticleSection id="personal-data" title="Personal data in messages">
        <p>
          IdentityModel hides personal data in its messages. To see it while you
          debug, set <code>IdentityModelEventSource.ShowPII = true</code> in
          your own application. The library does not turn it on.
        </p>
        <p>
          The token itself stays hidden unless you also set{" "}
          <code>IdentityModelEventSource.LogCompleteSecurityArtifact = true</code>
          . Both are in the <code>Microsoft.IdentityModel.Logging</code>{" "}
          namespace, which the package brings in.
        </p>
        <ChangedNote>
          The library no longer turns on personal data in IdentityModel
          messages. Version 1.0.3 set <code>ShowPII</code> to true. An
          application that wants it turns it on itself.
        </ChangedNote>
        <CodeBlock
          code={showPiiExample}
          caption="Turn on personal data while you debug"
        />
      </ArticleSection>

      <ArticleSection id="only-while-you-debug" title="Only while you debug">
        <p>
          Both settings apply to the whole process. With them on, messages and
          logs can hold personal data and whole tokens. Turn them on only while
          you debug, and never in production.
        </p>
      </ArticleSection>

      <ArticleSection id="read-the-message" title="Read the message">
        <p>
          <code>TryValidateJWT</code> only says that a token is not valid. To
          see why, call <code>ValidateJWT</code> and read the exception message.
          A failed download of the OpenID configuration is wrapped in an{" "}
          <code>AggregateException</code>, so read the message of{" "}
          <code>GetBaseException()</code>.
        </p>
        <p>
          <Link
            component={RouterLink}
            to="/docs/validator/what-validatejwt-throws"
          >
            What ValidateJWT throws
          </Link>{" "}
          lists the common exceptions and their causes.
        </p>
      </ArticleSection>
    </DocsLayout>
  );
};

export default DebuggingPage;
