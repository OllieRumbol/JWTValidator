import { docsPages } from "../src/content/docsPages.ts";

// Every page: Home, Versions, each docs page and "Page not found" (spec section 6.1.1).
// A docs page joins when it is added to docsPages.
export const everyPage = [
  "#/",
  "#/versions",
  ...docsPages.map((page) => `#/docs/${page.slug}`),
  "#/no-such-page",
];
