// Plan section 7.2, test 4: the data part, for 1.0.0 to 1.0.3. T21 adds the page part.
import { describe, expect, test } from "vitest";
import { latestVersion, versions } from "./versions";

describe("versions", () => {
  test("lists only the released versions, newest first", () => {
    expect(versions.map((version) => version.version)).toEqual([
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
      ["1.0.3", "Latest", "8 November 2022"],
      ["1.0.2", "Previous", "19 September 2022"],
      ["1.0.1", "Previous", "10 September 2022"],
      ["1.0.0", "Unlisted", "2022"],
    ]);
  });

  test("marks only the newest version as Latest", () => {
    const latest = versions.filter((version) => version.status === "Latest");
    expect(latest).toEqual([versions[0]]);
    expect(latestVersion).toBe("1.0.3");
  });

  test("gives every version a summary and at least one change", () => {
    for (const version of versions) {
      expect(version.summary).not.toBe("");
      expect(version.changes.length).toBeGreaterThan(0);
    }
  });
});
