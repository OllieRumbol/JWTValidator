// The changelog: released versions only, newest first (spec sections 6.1.6 and 6.2.4).
// The text is versions.html's. Text in backticks shows as code.

export type VersionStatus = "Latest" | "Previous" | "Unlisted";

export type Version = {
  version: string;
  published: string; // A date, or "2022" for 1.0.0 (spec section 6.1.6, item 2)
  status: VersionStatus;
  summary: string;
  changes: string[]; // The other changes, when a version has breaking changes
  breakingChanges?: string[]; // 2.0.0 only, with a link to the migration guide
};

export const versions: Version[] = [
  {
    version: "2.0.0",
    published: "25 October 2026",
    status: "Latest",
    summary:
      "Brings the library up to date for .NET 10. No class or method names changed, but six changes can affect your code.",
    breakingChanges: [
      ".NET 10 only. .NET 6, 7, 8 and 9 are no longer supported.",
      "A secret shorter than the minimum for the token's algorithm no longer validates: 32 bytes for HS256, 48 for HS384 and 64 for HS512.",
      "`WhenDoesJWTExpire` returns UTC, not local time. `HasJWTExpired` is correct in every time zone.",
      "`IsEmpty` returns true for an empty or null dictionary.",
      "The library no longer turns on personal-data logging.",
      "Depends on version 8 of the Microsoft IdentityModel packages, not version 6.",
    ],
    changes: [
      "With lifetime validation on, a token whose expiry is after 19 January 2038 now validates.",
      "The dictionary extension methods no longer throw for a null dictionary, or a null value inside a list.",
    ],
  },
  {
    version: "1.0.3",
    published: "8 November 2022",
    status: "Previous",
    summary:
      "Added the expiry checker: find out whether a token has expired, and when it expires.",
    changes: [
      "New `JWTExpiryChecker` class, with `HasJWTExpired` and `WhenDoesJWTExpire` and their `Try` versions.",
      "Parameter checks across the library.",
    ],
  },
  {
    version: "1.0.2",
    published: "19 September 2022",
    status: "Previous",
    summary: "Made the options builder strict and nested.",
    changes: [
      "The builder's methods must be called in a set order.",
      "You give either a secret or an OpenID URL, not both.",
      "`JWTValidatorOptions` can only be made by the builder.",
    ],
  },
  {
    version: "1.0.1",
    published: "10 September 2022",
    status: "Previous",
    summary: "Fixed the package so it installs correctly.",
    changes: [
      "Moved the models into the main project, so the package's dependencies resolve on every machine.",
    ],
  },
  {
    version: "1.0.0",
    // nuget.org does not show the date of an unlisted version.
    published: "2022",
    status: "Unlisted",
    summary:
      "The first version. Replaced by 1.0.1 the next day, because its dependencies did not install correctly.",
    changes: [
      "The options builder, to choose what to validate.",
      "`TryValidateJWT`, which returns the claims as a dictionary.",
      "Extension methods for the claims dictionary.",
    ],
  },
];

// The footer shows this, so the number is never typed twice (plan section 2).
export const latestVersion = versions[0].version;
