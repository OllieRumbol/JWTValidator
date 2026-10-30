import type { ComponentType } from "react";
import type { DocsSection } from "@/content/docsPages";
import BuilderDocuments from "@/components/documentation/builder/BuilderDocuments";
import ValidatorPage from "@/components/documentation/validator/ValidatorPage";
import ExpiryCheckerPage from "@/components/documentation/expiryChecker/ExpiryCheckerPage";
import DictionaryExtensionsPage from "@/components/documentation/dictionaryExtensions/DictionaryExtensionsPage";

// Kept apart from DocsPage.tsx, so that file exports only its component, which lets
// Vite update it in place while it is edited.

type PageContent = {
  Content: ComponentType;
  // The sections the content declares with SectionHeading, in order (plan section 3.3).
  sections: DocsSection[];
};

// Each title is the heading's own text, so "On this page" matches the page.
function section(id: string, title: string): DocsSection {
  return { id, title, level: 2 };
}

const codeSamples = section("code-samples", "Code Samples");
const methods = section("methods", "Methods");

// The content of each slug in docsPages. T21 moves each page to the new design.
export const pageContent: Record<string, PageContent> = {
  "validation-options": {
    Content: BuilderDocuments,
    sections: [
      section("introduction", "Builder Introduction"),
      section("code-example", "Code example"),
      section("technical-details", "Technical Details"),
      methods,
    ],
  },
  validator: {
    Content: ValidatorPage,
    sections: [
      section("introduction", "Validator Introduction"),
      codeSamples,
      methods,
    ],
  },
  "expiry-checker": {
    Content: ExpiryCheckerPage,
    sections: [
      section("introduction", "Expiry Checker Introduction"),
      codeSamples,
      methods,
    ],
  },
  "dictionary-extensions": {
    Content: DictionaryExtensionsPage,
    sections: [
      section("introduction", "Dictionary Extensions Introduction"),
      codeSamples,
      methods,
    ],
  },
};
