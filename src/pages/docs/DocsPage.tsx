import type { ComponentType } from "react";
import { useParams } from "react-router";
import DocsLayout from "@/components/DocsLayout/DocsLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import { docsPages, type DocsSection } from "@/content/docsPages";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import BuilderDocuments from "@/components/documentation/builder/BuilderDocuments";
import ValidatorPage from "@/components/documentation/validator/ValidatorPage";
import ExpiryCheckerPage from "@/components/documentation/expiryChecker/ExpiryCheckerPage";
import DictionaryExtensionsPage from "@/components/documentation/dictionaryExtensions/DictionaryExtensionsPage";

type PageContent = {
  Content: ComponentType;
  // The sections the content declares with SectionHeading, in order (plan section 3.3).
  sections: DocsSection[];
};

const introduction: DocsSection = {
  id: "introduction",
  title: "Introduction",
  level: 2,
};
const codeSamples: DocsSection = {
  id: "code-samples",
  title: "Code samples",
  level: 2,
};
const methods: DocsSection = { id: "methods", title: "Methods", level: 2 };

// The content of each slug in docsPages. T21 moves each page to the new design.
export const pageContent: Record<string, PageContent> = {
  "validation-options": {
    Content: BuilderDocuments,
    sections: [
      introduction,
      { id: "code-example", title: "Code example", level: 2 },
      { id: "technical-details", title: "Technical details", level: 2 },
      methods,
    ],
  },
  validator: {
    Content: ValidatorPage,
    sections: [introduction, codeSamples, methods],
  },
  "expiry-checker": {
    Content: ExpiryCheckerPage,
    sections: [introduction, codeSamples, methods],
  },
  "dictionary-extensions": {
    Content: DictionaryExtensionsPage,
    sections: [introduction, codeSamples, methods],
  },
};

// The docs page for the slug in the address, or "Page not found" for an unknown slug
// (plan section 3.3).
const DocsPage = () => {
  const { slug } = useParams();
  const page = docsPages.find((docsPage) => docsPage.slug === slug);
  const content = page ? pageContent[page.slug] : undefined;

  if (!page || !content) {
    return <NotFoundPage />;
  }

  const { Content, sections } = content;
  return (
    <>
      <PageTitle name={page.title} />
      <DocsLayout page={page} sections={sections}>
        <Content />
      </DocsLayout>
    </>
  );
};

export default DocsPage;
