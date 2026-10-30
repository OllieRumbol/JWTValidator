import type { ComponentType } from "react";
import { useParams } from "react-router";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import DictionaryExtensionsPage from "./dictionary-extensions/DictionaryExtensionsPage";
import ExpiryCheckerPage from "./expiry-checker/ExpiryCheckerPage";
import ValidationOptionsPage from "./validation-options/ValidationOptionsPage";
import ValidatorPage from "./validator/ValidatorPage";

// The page for each slug in docsPages (plan section 3.4). Release 3 adds the rest.
const pages: Record<string, ComponentType> = {
  "validation-options": ValidationOptionsPage,
  validator: ValidatorPage,
  "expiry-checker": ExpiryCheckerPage,
  "dictionary-extensions": DictionaryExtensionsPage,
};

// The docs page for the slug in the address, or "Page not found" for an unknown slug
// (plan section 3.3). Each page sets its own title through DocsLayout.
const DocsPage = () => {
  const { slug } = useParams();
  // Own keys only, so an address such as #/docs/toString is not found on the prototype.
  const Page = slug && Object.hasOwn(pages, slug) ? pages[slug] : undefined;

  if (!Page) {
    return <NotFoundPage />;
  }

  return <Page />;
};

export default DocsPage;
