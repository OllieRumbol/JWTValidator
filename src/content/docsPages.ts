// The docs pages, in reading order (plan section 3.4). Previous and next come from the
// order. Release 3 adds Getting started, Migrating from 1.x, Claims, Dependency
// injection, Debugging and Known limitations.

export type DocsGroup = "Get started" | "Guides" | "More";

export type DocsPage = {
  slug: string; // Unique. Part of the address.
  title: string;
  group: DocsGroup;
};

export const docsPages: DocsPage[] = [
  { slug: "validation-options", title: "Validation options", group: "Guides" },
  { slug: "validator", title: "Validator", group: "Guides" },
  { slug: "expiry-checker", title: "Expiry checker", group: "Guides" },
  {
    slug: "dictionary-extensions",
    title: "Dictionary extensions",
    group: "Guides",
  },
];

// A section of a docs page, for "On this page". The id is also the SectionHeading's id,
// and the last part of the section address (plan section 3.3).
export type DocsSection = {
  id: string;
  title: string;
  level: 2 | 3;
};

// The migration guide's address (plan section 3.4). Release 3 adds the page.
export const MIGRATION_GUIDE_PATH = "/docs/migrating-from-1x";

export type AdjacentPages = {
  previous?: DocsPage;
  next?: DocsPage;
};

// The pages before and after the given one in reading order. The first page has no
// previous page, and the last has no next page.
export function getAdjacentPages(slug: string): AdjacentPages {
  const index = docsPages.findIndex((page) => page.slug === slug);
  if (index === -1) {
    return {};
  }

  return {
    previous: docsPages[index - 1],
    next: docsPages[index + 1],
  };
}
