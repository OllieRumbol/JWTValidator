import type { ComponentType } from "react";
import { useParams } from "react-router";
import PageTitle from "@/components/PageTitle/PageTitle";
import { docsPages } from "@/content/docsPages";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import BuilderDocuments from "@/components/documentation/builder/BuilderDocuments";
import ValidatorPage from "@/components/documentation/validator/ValidatorPage";
import ExpiryCheckerPage from "@/components/documentation/expiryChecker/ExpiryCheckerPage";
import DictionaryExtensionsPage from "@/components/documentation/dictionaryExtensions/DictionaryExtensionsPage";

// The page for each slug in docsPages. T21 moves each page to the new design.
const pageContent: Record<string, ComponentType> = {
  "validation-options": BuilderDocuments,
  validator: ValidatorPage,
  "expiry-checker": ExpiryCheckerPage,
  "dictionary-extensions": DictionaryExtensionsPage,
};

// The docs page for the slug in the address, or "Page not found" for an unknown slug
// (plan section 3.3).
const DocsPage = () => {
  const { slug } = useParams();
  const page = docsPages.find((docsPage) => docsPage.slug === slug);
  const Content = page ? pageContent[page.slug] : undefined;

  if (!page || !Content) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageTitle name={page.title} />
      <Content />
    </>
  );
};

export default DocsPage;
