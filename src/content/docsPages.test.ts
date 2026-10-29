// Plan section 7.2, test 5.
import { describe, expect, test } from "vitest";
import { docsPages, getAdjacentPages } from "./docsPages";

describe("docsPages", () => {
  test("has the release 2 pages in reading order", () => {
    expect(docsPages.map((page) => page.slug)).toEqual([
      "validation-options",
      "validator",
      "expiry-checker",
      "dictionary-extensions",
    ]);
  });

  test("gives every page a unique slug, a title and a group", () => {
    const slugs = docsPages.map((page) => page.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const page of docsPages) {
      expect(page.title).not.toBe("");
      expect(["Get started", "Guides", "More"]).toContain(page.group);
    }
  });

  test("links each page to its neighbours, with no gaps and no loop", () => {
    const first = docsPages[0];
    const last = docsPages[docsPages.length - 1];
    expect(getAdjacentPages(first.slug).previous).toBeUndefined();
    expect(getAdjacentPages(last.slug).next).toBeUndefined();

    // Following "next" from the first page visits every page once, in order. A loop
    // fails here instead of running for ever.
    const visited: string[] = [];
    let page: (typeof docsPages)[number] | undefined = first;
    while (page) {
      expect(visited, "next pages form a loop").not.toContain(page.slug);
      visited.push(page.slug);
      const next: (typeof docsPages)[number] | undefined = getAdjacentPages(
        page.slug,
      ).next;
      if (next) {
        expect(getAdjacentPages(next.slug).previous).toBe(page);
      }
      page = next;
    }
    expect(visited).toEqual(docsPages.map((docsPage) => docsPage.slug));
  });

  test("has no neighbours for an unknown slug", () => {
    expect(getAdjacentPages("no-such-page")).toEqual({});
  });
});
