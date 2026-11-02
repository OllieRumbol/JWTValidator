// Plan section 7.2, test 4: the data part. VersionsPage.test.tsx has the page part.
import { describe, expect, test } from "vitest";
import { latestVersion, versions } from "./versions";

describe("versions", () => {
  test("lists only the released versions, newest first", () => {
    expect(versions.map((version) => version.version)).toEqual([
      "2.0.0",
      "1.0.3",
      "1.0.2",
      "1.0.1",
      "1.0.0",
    ]);
  });

  test("gives each version its status and its date from nuget.org", () => {
    const rows = versions.map(({ version, status, published }) => [
      version,
      status,
      published,
    ]);
    expect(rows).toEqual([
      ["2.0.0", "Latest", "25 October 2026"],
      ["1.0.3", "Previous", "8 November 2022"],
      ["1.0.2", "Previous", "19 September 2022"],
      ["1.0.1", "Previous", "10 September 2022"],
      ["1.0.0", "Unlisted", "2022"],
    ]);
  });

  test("marks only the newest version as Latest", () => {
    const latest = versions.filter((version) => version.status === "Latest");
    expect(latest).toEqual([versions[0]]);
    expect(latestVersion).toBe("2.0.0");
  });

  test("gives every version a summary and at least one change", () => {
    for (const version of versions) {
      expect(version.summary).not.toBe("");
      expect(version.changes.length).toBeGreaterThan(0);
    }
  });

  // Spec section 6.1.6, item 4, and spec section 2: the six breaking changes.
  test("gives only 2.0.0 its breaking changes", () => {
    const withBreakingChanges = versions.filter(
      (version) => version.breakingChanges,
    );
    expect(withBreakingChanges.map((version) => version.version)).toEqual([
      "2.0.0",
    ]);
    expect(withBreakingChanges[0].breakingChanges).toHaveLength(6);
  });

  // VersionsPage shows text in backticks as code. An unmatched backtick would show the
  // rest of the line as code.
  test("closes every backtick it opens", () => {
    for (const version of versions) {
      for (const text of [
        version.summary,
        ...version.changes,
        ...(version.breakingChanges ?? []),
      ]) {
        expect(text.split("`").length % 2, text).toBe(1);
      }
    }
  });
});
