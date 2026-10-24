# JWT Validator documentation site upgrade — Specification

> **What this document is for:** It answers *what are we building, and why?* It is agreed before any design or code, and it is the source of truth for requirements.

Status: Approved
Last updated: 2026-10-24

---

## 1. Purpose

The documentation site for the `JWTValidator` NuGet package was last changed in December 2022. It documents version 1.0.3, and some of its examples do not compile. It is slow to load, hard to use on a phone, and its packages are several major versions out of date.

This project brings the site up to date for version 2.0.0 of the library, and makes it fast, usable on any screen, accessible and easy to maintain. It is for developers who use the library, and for the maintainer who keeps the site up to date.

---

## 2. Background

* **The library.** `JWTValidator` is a public NuGet package that makes it simpler to validate a JWT in C#. Its source is the public repository `OllieRumbol/ID_Token-JWT_Validator`.
* **This repository.** `OllieRumbol/JWTValidator` holds only the documentation site. It is public.
* **Published versions.**

  | Version | Published on nuget.org | Listed |
  | --- | --- | --- |
  | 1.0.0 | 9 September 2022 | No. Unlisted on 10 September 2022, after 1.0.1 replaced it. |
  | 1.0.1 | 10 September 2022 | Yes |
  | 1.0.2 | 19 September 2022 | Yes |
  | 1.0.3 | 8 November 2022 | Yes |
  | 2.0.0 | Not yet released | — |

* **Version 2.0.0.** The work on 2.0.0 is in progress in the library repository. The library README and the package release notes for 2.0.0 are written. The release itself is not done yet. Version 2.0.0 adds no features and renames nothing. It changes behaviour only:
  1. .NET 10 only. .NET 6, 7, 8 and 9 are no longer supported.
  2. A secret shorter than the minimum for the token's algorithm no longer validates: 32 bytes for HS256, 48 for HS384 and 64 for HS512.
  3. `WhenDoesJWTExpire` returns UTC, not local time. `HasJWTExpired` gives the correct result in every time zone.
  4. `IsEmpty` returns `true` for an empty or `null` dictionary.
  5. The library no longer turns on personal-data logging. An application that wants it turns it on itself.
  6. The package depends on version 8 of the Microsoft IdentityModel packages, not version 6.

  The release notes also list two other changes: a token whose `exp` is after 19 January 2038 now validates when lifetime validation is on, and the dictionary extension methods no longer throw for a `null` dictionary or a `null` value inside a list.
* **Version 1.0.3** targets .NET 6, which is out of support.
* **Hosting.** The site is hosted on GitHub Pages at https://ollierumbol.github.io/JWTValidator. The nuget.org package page links to this address (section 5.2).
* **Readers.** .NET developers. Many arrive from the nuget.org package page or from the library repository.
* **Cost.** GitHub Pages and GitHub Actions minutes are free for public repositories. The project uses no Azure resources and has no running costs.

---

## 3. Goals and non-goals

### Goals

1. The site documents version 2.0.0 of the library. Every fact agrees with the library README and the release notes for 2.0.0, and every code example compiles against 2.0.0.
2. A reader who uses version 1.x can upgrade to 2.0.0 with the site alone.
3. Every page works on a screen 320 pixels wide, and every page and menu item can be reached on a touch screen.
4. The site meets the performance targets in section 6.6.2.
5. The site meets WCAG 2.2 level AA.
6. Every package the site depends on is at its latest stable version when the packages are upgraded, except where section 6.1.12, item 1 allows it, and no package has a known vulnerability at each release.
7. Every pull request is built and checked automatically. A merge into `main` deploys the site with no manual steps and no long-lived personal token.
8. The site has a new visual design, which the maintainer approves from mockups before it is built.
9. The spelling, grammar and wording of every page are checked once the final design and content are in place.

### Non-goals

* No analytics or visitor tracking.
* No search across the documentation.
* No badges, for example for the NuGet version or the build status.
* No documentation of version 1.x beyond the migration guide (section 6.1.4) and the changelog (section 6.1.6).
* No roadmap or list of future versions.
* No change of host or address, and no custom domain.
* No server, back end or sign-in.
* No separate page per URL for search engines. Search engines index the site as one page. This is accepted, because most readers arrive from nuget.org or GitHub.
* No changes to the library or its repository.
* No `CONTRIBUTING.md`, `SECURITY.md` or `CHANGELOG.md` in this repository.

---

## 4. Current state of the code

| Area | Purpose | State |
| --- | --- | --- |
| Pages | Home, Versions, and four documentation pages: Builder, Validator, Expiry Checker and Dictionary Extensions | Content is written into the components and data files. It documents 1.0.3. |
| Build | Turns the source into the files that are deployed | Packages are from 2022, several major versions behind. Some build packages and settings are unused. |
| Deployment | Publishes the site on every push to `main` | Works since PR #6, with the built-in token. Uses Node 12 and version 1 of the GitHub actions. |
| Checks | Tests, lint and type check | None. Pull requests are not built. |
| Repository | Root files and folders | No README and no licence file. `package.json` says ISC. Build output from 2022 is committed. |
| Protection | Rules for `main` and `release/*` | `main` cannot be deleted or force-pushed, and needs a pull request. `release/*` cannot be force-pushed, and needs a pull request. No status check is required yet. Workflows get read access by default. |

### 4.1 Defects and gaps

1. **The page does not fit a phone screen.**
   `public/index.html` has no viewport setting, so phones draw the desktop page and shrink it. With the setting, the header menu, aligned right in `src/components/App.tsx:59`, pushes the Home link off the left edge of a 393-pixel screen. The page title is fixed at 100 pixels (`src/style/shared.css:11`) and is clipped.
2. **The images are very large.**
   `src/assets/documents.jpg` is 15.6 MB, `src/assets/versions.jpg` is 11.5 MB and `src/assets/codeBackground.jpg` is 1.4 MB.
3. **The script is large.**
   The production script is 1.33 MB, or 426 KB compressed with gzip.
4. **A code example is clipped.**
   `src/components/home/CodeSnippet.tsx:13`. The example grows to its longest line and is centred, so both sides are cut off and the line numbers are hidden.
5. **Examples that are wrong or do not compile.**
   * `src/components/home/CodeSnippet.tsx:34` calls `DictionaryContainsKeyAndValue`, which does not exist. The method is `ContainsKeyAndValue`.
   * Every example uses the secret `"serguhvalhoier....."`, which is 19 characters. It fails in 2.0.0.
   * Most examples are fragments with `...` in place of code, so they cannot compile.
   * `src/components/documentation/builder/BuilderMethods.ts:9` says `.Create()` returns an interface. It returns the class `JWTValidatorOptionsBuilderCreator`.
6. **Wrong labels.**
   `src/components/documentation/DocumentationCard.tsx:58` labels the return value section "Summary". `src/components/App.tsx:131` labels the NuGet link "NuGut".
7. **A link goes to the wrong repository.**
   `src/components/App.tsx:133`. "GitHub Repo" links to this site repository, not to the library.
8. **Spelling and grammar.**
   Examples: "libaray", "piller", "ued", "boolan", "dictonary", "specfic", "visability", "priorties", "isser", "extenion", "dependences", "Not Longer Listed", "bought" for "brought", "its free" for "it's free" and "extract date" for "exact date".
9. **The scroll position is kept between pages.**
   Scrolled 1,500 pixels down Home, a move to Versions shows Versions at 1,500 pixels, not at the top.
10. **An unknown address shows a blank page.**
    For example, `#/no-such-page` shows only the header, with no message.
11. **Accessibility.**
    * Buttons are inside links, for example `src/components/App.tsx:63`.
    * Whole cards are buttons, but do nothing when activated (`src/components/documentation/DocumentationCard.tsx:26`, `src/components/versions/VersionCard.tsx:34`).
    * The Versions page shows features as disabled checkboxes (`src/components/versions/VersionCard.tsx:52`).
    * Lists and code are placed inside headings and paragraphs, which is not valid HTML (for example `src/components/home/BackStory.tsx:18`).
    * Heading levels are used for body text.
    * Lists rendered from data have no keys (for example `src/components/documentation/builder/BuilderDocumentsMethods.tsx:27`).
12. **Placeholder versions.**
    `src/components/versions/Versions.ts:91` and `:103` list 1.0.4 "Planning" and 1.0.5 "Future", both "Not yet planned".
13. **A deprecated start-up call.**
    `src/index.tsx:6` uses a rendering call that the current major version of React removes.
14. **Unused and stale files.**
    * `dist/` is a 2022 copy of the source.
    * `examples/dist/` is committed build output.
    * `.babelrc` names presets that are not installed.
    * Some packages are unused, for example a font package that is never imported.
    * `package.json` declares a dependency range for React 16 that the site does not use.
15. **Old deployment workflow.**
    `.github/workflows/main_deploy.yml` uses Node 12 and version 1 of the checkout and Node set-up actions. It runs only on pushes to `main`, so pull requests are not checked.
16. **No checks.** There are no tests, no lint and no type check.

---

## 5. External interfaces

### 5.1 GitHub Pages

* Serves the site at https://ollierumbol.github.io/JWTValidator.
* Serves static files only. It returns a file only when one exists at the requested path, and it has no rewrite rules.
* The browser does not send the part of an address after `#` to the server.
* Limits: a published site of at most 1 GB, a soft limit of 100 GB of traffic a month, and a deployment of at most 10 minutes.

### 5.2 nuget.org

* The package page at https://www.nuget.org/packages/JWTValidator links to the site address in section 5.1 as the project URL. The link is part of the published package, so the address must not change.
* The site links to the package page.

### 5.3 The library repository

* `OllieRumbol/ID_Token-JWT_Validator`, default branch `main`. Releases are tagged `vMAJOR.MINOR.PATCH`.
* The README and the package release notes at tag `v2.0.0` are the source of the facts in section 6.1.3.
* The site links to the repository.

### 5.4 GitHub repository settings

* The rulesets and the default workflow permission in section 4 are repository settings. Only the maintainer changes them.

---

## 6. Functional specification

### 6.1 Behaviour

#### 6.1.1 Pages and addresses

1. The site SHALL have these pages: Home, the documentation pages (section 6.1.3), Versions (section 6.1.6) and a "Page not found" page.
2. Every page SHALL have its own address. Opening the address directly, refreshing it, or opening it from a bookmark SHALL show that page.
3. The six addresses in section 6.2.1 that exist today SHALL keep working. Each SHALL show the same page, or the page that replaces it.
4. WHEN the reader opens a page from a link, the page SHALL start at the top.
5. WHEN the reader selects a link to a section of the current page, the page SHALL scroll to that section.
6. Each section of a documentation page SHALL have its own address. Opening that address SHALL show the page, scrolled to the section, so a reader can share a link to one section. Each section heading SHALL have a link to that address, shown on hover and on keyboard focus. Selecting the link SHALL copy the address to the clipboard and show "Link copied". WHEN the copy fails, the link SHALL still open the address, so the reader can copy it from the address bar.
7. The browser's Back and Forward buttons SHALL move between the pages the reader visited.
8. WHEN the address does not match a page, the site SHALL show the "Page not found" page, with a link to Home.
9. Each page SHALL have its own title in the browser tab, in the form `<page name> — JWT Validator`. Home SHALL use `JWT Validator`.

#### 6.1.2 Header, menu and footer

1. The header SHALL link to Home, the documentation, Versions, the NuGet package page and the library repository.
2. WHEN the screen is too narrow to show every header link, the header SHALL show a menu button in their place. The button SHALL open a panel with every header link.
3. The menu panel SHALL close when the reader selects a link, selects the close button, presses Escape or selects outside the panel.
4. WHEN the panel opens, focus SHALL move into it. WHEN it closes, focus SHALL return to the menu button.
5. The page SHALL be drawn at the width of the device. This SHALL be released in the same release as the menu in item 2, never before it.
6. The footer SHALL show links to the library repository, this site repository, the NuGet package page and the licence, and the number of the latest library version.
7. Links to other sites SHALL open in the same tab. The reader can choose a new tab themselves.

#### 6.1.3 Documentation content

1. The documentation SHALL describe version 2.0.0 only.
2. The documentation SHALL cover these topics:

   | Topic | Content |
   | --- | --- |
   | Getting started | What the library does. The install command. The requirements: .NET 10, and version 8 of the Microsoft IdentityModel packages. A short complete example. |
   | Validation options | The builder: `Create`, `WithSigningKeyFromSecret`, `WithSigningKeyFromOpenIdUrl`, `WithIssuer`, `WithAudience`, `WithExpiryDate` and `Build`. The order in which the methods can be called. The 5-minute clock skew of `WithExpiryDate`. The `JWTValidatorOptions` class. |
   | Secret length | The minimum secret length for HS256, HS384 and HS512, counted in UTF-8 bytes. The exception that a short secret causes. |
   | Validator | `ValidateJWT` and `TryValidateJWT`, and when to use each. What `ValidateJWT` throws. A failed download of the OpenID configuration. |
   | Claims | The shape of the claims dictionary: claim names as in the token, every value a string, arrays, numbers, booleans, nested objects, `null`, and the times `exp`, `nbf` and `iat`. |
   | Expiry checker | `HasJWTExpired`, `TryHasJWTExpired`, `WhenDoesJWTExpire` and `TryGetWhenDoesJWTExpire`, each with a secret and with an OpenID URL. Times are in UTC. |
   | Dictionary extensions | `Print`, `ContainsKeyAndValue`, `ContainsValueInList` and `IsEmpty`, including their result for a `null` or empty dictionary. |
   | Dependency injection | The public interface `IJWTValidator`, and the `JWTExpiryChecker` constructor that takes an `IJWTValidator`, with an example that registers them in a dependency injection container. `IJWTExpiryChecker` is internal to the library, so readers cannot use it, and it is not documented. |
   | Debugging | How an application turns on personal data in IdentityModel messages itself. |
   | Migration from 1.x | Each change in section 2, and what a reader must do about it. |
   | Known limitations | The process-wide claim type map that each validation clears, and the OpenID configuration that is downloaded synchronously on every call. |

3. Each public method SHALL be documented with a summary, its signatures, its parameters, its return value, and when it throws or returns `false`.
4. WHEN a method's behaviour changed in 2.0.0, its documentation SHALL include a "Changed in 2.0.0" note that links to the migration guide. This applies at least to `WhenDoesJWTExpire`, `HasJWTExpired`, `IsEmpty`, `Print`, `ContainsKeyAndValue`, `ContainsValueInList` and `WithSigningKeyFromSecret`.
5. Every fact SHALL agree with the library README and the package release notes at tag `v2.0.0`. Where the site gives more detail, it SHALL NOT contradict them. Each topic is checked against them, one by one.
6. Every C# example SHALL compile when placed in a .NET 10 console application with the package installed. Before 2.0.0 is released, the examples SHALL compile against a pre-release of 2.0.0. After the release, they SHALL compile against 2.0.0. Examples MAY use placeholder values, for example `"your-client-id"`. A dependency injection example MAY also reference `Microsoft.Extensions.DependencyInjection`, and no example may reference any other package.
7. Every example that uses a secret SHALL use a secret long enough for its algorithm (section 2).
8. Snippets that are not C#, such as project file XML and shell commands, are not compiled. Each SHALL be labelled with its language.

#### 6.1.4 Documentation layout

1. On a wide screen, a list of every documentation page SHALL be visible beside the content, with the current page marked.
2. On a narrow screen, the same list SHALL be reachable from the menu (section 6.1.2).
3. Each documentation page SHALL list its own sections at the top or beside the content. Each item SHALL link to its section.
4. Each documentation page SHALL link to the previous and the next page, in reading order.

#### 6.1.5 Code examples

1. Every C# example SHALL have syntax highlighting.
2. No example SHALL be clipped. WHEN a line is wider than the example's box, the box SHALL scroll sideways. The page itself SHALL NOT scroll sideways.
3. Every example SHALL have a copy button. The button SHALL copy the exact text of the example, without line numbers.
4. WHEN the copy succeeds, the site SHALL show that it was copied, and SHALL announce it to screen readers.
5. WHEN the copy fails, the site SHALL say so. The reader can still select the text by hand.
6. The copy button SHALL work with the keyboard.

#### 6.1.6 Versions page

1. The Versions page SHALL be a changelog of released versions, newest first.
2. Each entry SHALL show the version number, the date it was published, its status and a list of its changes. The 1.0.0 entry SHALL show the year only, "2022", because nuget.org does not show the date of an unlisted version.
3. The status SHALL be one of `Latest`, `Previous` or `Unlisted`.
4. The 2.0.0 entry SHALL list its breaking changes and link to the migration guide.
5. The page SHALL NOT list versions that are not released.

#### 6.1.7 Home page

1. Home SHALL say what the library does, in one or two sentences.
2. Home SHALL show the install command and a short example that compiles (section 6.1.3, item 6), in two versions: a token from an OpenID Connect provider, shown first because it is the library's main use, and a token signed with a secret. The reader SHALL switch between them with tabs that work with the mouse, touch and the keyboard, including the arrow keys.
3. Home SHALL describe the four parts of the library: the options builder, the validator, the expiry checker and the dictionary extensions. Each SHALL link to its documentation.
4. Home SHALL say what is new in the latest version, and link to the migration guide.
5. Home SHALL have one personal section about why the library was built.
6. Home SHALL state the licence and link to it.

#### 6.1.8 Writing style

1. The documentation SHALL speak to the reader as "you", and to the library by name.
2. Only the personal section on Home (section 6.1.7, item 5) SHALL use the first person.
3. Text SHALL use plain technical English: short sentences, one idea per sentence, and common words. The maintainer checks this in the final wording check (section 6.1.10, item 3).
4. All pages SHALL use British English spelling, as the library README does, for example "licence" and "behaviour". Names from code keep their own spelling, for example `Color`.

#### 6.1.9 Shared links

1. WHEN a link to the site is shared, for example in a chat or on social media, the preview SHALL show the site name, a one-sentence description and an image.
2. The site SHALL have one description for search engines. Search engines see the site as one page (section 3, non-goals), so pages do not have their own.

#### 6.1.10 Releases

1. The work SHALL be released in three releases, in this order:

   | Release | Contents |
   | --- | --- |
   | 1. Foundation | Upgraded packages and build. Checks on every pull request. The new deployment. The current images compressed to the size limit, and a smaller script. Shared-link previews (section 6.1.9). The README and the licence (section 6.1.11). Removal of unused and stale files. |
   | 2. Redesign | The new visual design, with the images replaced or removed as the design says. The header, menu and footer (section 6.1.2). The documentation layout (section 6.1.4). Code examples (section 6.1.5). The Versions changelog (section 6.1.6). The "Page not found" page and scrolling (section 6.1.1). The accessibility fixes. |
   | 3. Version 2.0.0 content | The documentation for 2.0.0 (section 6.1.3). The Home content (section 6.1.7). The 2.0.0 changelog entry. The spelling, grammar and wording check of every page. |

2. Release 3 SHALL NOT go live before version 2.0.0 is listed on nuget.org.
3. The spelling, grammar and wording check SHALL be the last change in release 3.
4. Each release SHALL go live only when the maintainer approves it.
5. Work for a release SHALL NOT go live before that release.
6. The performance requirements (section 6.6.2) SHALL apply from release 1. The accessibility requirements (section 6.6.1) SHALL apply from release 2, which holds the accessibility fixes.

#### 6.1.11 Repository and pipeline

1. WHEN a pull request is opened or updated into `main` or a `release/*` branch, THE PIPELINE SHALL type-check, lint, test and build the site, and check the size limits in section 6.6.2.
2. A pull request SHALL NOT merge until those checks pass.
3. WHEN a change is merged into `main`, THE PIPELINE SHALL deploy the site.
4. WHEN any step fails, the site that is live SHALL NOT change.
5. The pipeline SHALL NOT use a long-lived personal token.
6. `main` and `release/*` SHALL keep the protection in section 4.
7. The repository SHALL have a README with these sections: a summary with links to the live site, the library repository and the NuGet package; which repository to use for what; the technology used; how to run the site locally; the folder structure; how to update the content for a new library version; branches and releases; deployment; and the licence.
8. The repository SHALL have an MIT licence, the same as the library. The package metadata SHALL name the same licence.
9. The repository SHALL NOT track build output, or copies of the source.

#### 6.1.12 Dependencies

1. Every package SHALL be at its latest stable version when the packages are upgraded in release 1, unless that version is incompatible with another package the site uses. Each exception SHALL be recorded with its reason.
2. At each release, the package audit SHALL report no known vulnerabilities.
3. The site SHALL NOT use an interface that its packages report as deprecated.

### 6.2 Worked examples

#### 6.2.1 Addresses

| Address (after `https://ollierumbol.github.io/JWTValidator/`) | Result |
| --- | --- |
| (nothing) | Home |
| `#/` | Home |
| `#/versions` | Versions |
| `#/documentation/builder` | The documentation for validation options |
| `#/documentation/validator` | The documentation for the validator |
| `#/documentation/expiry` | The documentation for the expiry checker |
| `#/documentation/dictionary` | The documentation for the dictionary extensions |
| `#/docs` | The first documentation page in reading order |
| `#/no-such-page` | "Page not found", with a link to Home |

#### 6.2.2 Navigation

| Starting state | Action | Result |
| --- | --- | --- |
| Home, scrolled 1,500 pixels down | Select Versions in the header | Versions, at the top |
| A documentation page, at the top | Select a section in its list of sections | The same page, scrolled to that section |
| A shared link to the "Secret length" section | Open it in a new tab | The page that holds "Secret length", scrolled to that section |
| Versions, after moving there from Home | Select Back | Home |
| A 375-pixel screen, menu closed | Select the menu button, then Versions | The panel closes. Versions is shown, at the top. |
| A 375-pixel screen, menu open | Press Escape | The panel closes. Focus is on the menu button. |
| A documentation page | Select the link beside a section heading | The clipboard holds the section's address. "Link copied" shows. |
| Home, "OpenID Connect" example shown, focus on its tab | Press the right arrow key | The "Secret" tab is selected and has focus. The secret example shows. |

#### 6.2.3 Code examples

| Screen width | Example | Result |
| --- | --- | --- |
| 320 pixels | A line of 130 characters | The example box scrolls sideways. The page is 320 pixels wide and does not scroll sideways. |
| 320 pixels | The secret length table, if it is wider than the screen | The table scrolls sideways inside its box. The page does not scroll sideways. |
| Any | Select Copy | The clipboard holds the example text, with no line numbers. The button shows that it was copied. |
| Any, clipboard blocked by the browser | Select Copy | A message says the copy failed. |

#### 6.2.4 Changelog

| Version | Status | Notes |
| --- | --- | --- |
| 2.0.0 | `Latest` | Lists the six breaking changes and links to the migration guide. |
| 1.0.3 | `Previous` | Added the expiry checker. |
| 1.0.2 | `Previous` | Made the builder strict and nested. |
| 1.0.1 | `Previous` | Fixed the package dependencies. |
| 1.0.0 | `Unlisted` | The first version. The date shows the year only: "2022". |

#### 6.2.5 Size limits

| Item | Today | Limit (section 6.6.2) | Result today |
| --- | --- | --- | --- |
| JavaScript for the first load of Home, compressed with gzip | 426 KB | 300 KB | Fails |
| Largest image | 15.6 MB | 200 KB | Fails |
| Total for the first load of Home | More than 1.8 MB | 500 KB | Fails |

### 6.4 Outcomes and states

| Pipeline outcome | Meaning |
| --- | --- |
| Checks passed | The pull request can merge. Nothing is deployed. |
| Checks failed | The pull request cannot merge. Nothing is deployed. |
| Deployed | The change is on `main`, and the live site shows it. |
| Deployment failed | The live site has not changed. |

### 6.5 User interface

The site has no forms, no sign-in and no data that loads after the page. So pages have no loading, empty or error states, except the "Page not found" page and the copy failure messages.

If the build splits the site into parts that load when a page is opened:

1. A part that takes longer than half a second to load SHALL show a loading message.
2. A part that fails to load, for example because a new version was deployed meanwhile, SHALL show a message with a link that reloads the page.

| Page | Purpose | Reader actions |
| --- | --- | --- |
| Home | Section 6.1.7 | Follow links to the documentation, Versions, the migration guide and the licence. Copy the example and the install command. |
| Documentation pages | Section 6.1.3 | Move between pages and sections. Copy examples. |
| Versions | Section 6.1.6 | Follow the link to the migration guide. |
| Page not found | Section 6.1.1, item 8 | Go to Home. |
| Header and menu | Section 6.1.2 | Open and close the menu. Move to any page. |
| Footer | Section 6.1.2, item 6 | Follow links. |

The visual design comes from mockups that the maintainer approves (section 3, goal 8). These questions are answered from the mockups: whether the large header photos stay, whether there is a light mode, a dark mode or both, whether the site has a logo, and how the documentation pages are grouped.

### 6.6 Non-functional requirements

#### 6.6.1 Accessibility

1. Every page SHALL meet WCAG 2.2 level AA.
2. An automated accessibility check SHALL find no violations on any page. It SHALL run with the tests on every pull request.
3. Lighthouse SHALL give Home, the longest documentation page, Versions and "Page not found" an accessibility score of 100. The automated check in item 2 covers every page.
4. Every page, link, menu and copy button SHALL be usable with the keyboard alone. The maintainer checks this by hand at the end of each release.

#### 6.6.2 Performance

1. Lighthouse SHALL give Home and the longest documentation page a mobile performance score of at least 90.
2. The JavaScript that the first load of any page downloads SHALL be at most 300 KB in total, compressed with gzip. When the script is split into several files, the files that page loads count together.
3. Each image SHALL be at most 200 KB.
4. The first load of any page SHALL transfer at most 500 KB in total, counted as the bytes sent over the network, after compression.
5. The pipeline SHALL check items 2 and 3 on every pull request. Lighthouse runs by hand at the end of each release.

#### 6.6.3 Browsers and screens

1. The site SHALL work in the browser versions that support the "Baseline Widely Available" web features: Chrome, Edge, Firefox and Safari, on desktop and mobile.
2. Every page SHALL work at widths from 320 pixels. The page SHALL NOT scroll sideways at any width from 320 pixels. Code examples (section 6.1.5) and tables that are wider than the screen SHALL scroll sideways inside their own box.
3. The site is checked by hand in Chrome, Edge and Firefox on desktop, and at phone widths in the browser's developer tools. Safari and real phones are not checked by hand. This is accepted, because the site uses only features that every browser in item 1 supports.

#### 6.6.4 Privacy and security

1. The site SHALL NOT collect analytics or set cookies.
2. The site SHALL NOT load anything from a host other than its own, for example fonts or scripts. Links that the reader selects are allowed.
3. The site and the repository SHALL NOT contain secrets.
4. The pipeline SHALL NOT use a long-lived personal token (section 6.1.11, item 5).

#### 6.6.5 Cost

1. The site SHALL use only free GitHub Pages hosting and free GitHub Actions minutes.

### 6.7 Edge cases

* A screen 320 pixels wide, and a page zoomed to 400 % on a desktop.
* A table or a method signature that is wider than the screen (section 6.6.3, item 2).
* A shared link to a section that a later change renames or removes. The page opens at the top.
* The reader uses only the keyboard, or a screen reader.
* The reader's system asks for reduced motion. The site SHALL NOT animate in that case.
* The browser blocks the clipboard (section 6.2.3).
* JavaScript is turned off. The site SHALL show a message that it needs JavaScript.
* An old bookmark to one of the addresses in section 6.2.1.
* An address that matches no page.
* Version 2.0.0 is released later than planned. Releases 1 and 2 go ahead. Release 3 waits (section 6.1.10, item 2).
* The library's README or release notes change between now and tag `v2.0.0`. The site follows the text at the tag (section 6.1.3, item 5).

---

## 7. Open questions

None. Two questions were raised and answered on 2026-10-22: the spelling standard (section 6.1.8, item 4) and the publish date of 1.0.0 (section 2). The changelog shows the year only for 1.0.0 (section 6.1.6, item 2).

On 2026-10-23, with the plan's approval, section 6.1.12, item 1 was changed to allow a package to stay below its latest version when the latest is incompatible with another package. Each exception is recorded with its reason.

On 2026-10-24, after the planning review, the maintainer approved these changes:

* Section 6.1.3: `IJWTExpiryChecker` is internal to the library, so it is not documented. Examples compile against a pre-release of 2.0.0 before the release. A dependency injection example may reference `Microsoft.Extensions.DependencyInjection`. Snippets that are not C# are labelled and not compiled.
* Sections 6.1.1, item 6 and 6.1.7, item 2: the section link copies its address, and the Home example has OpenID Connect and secret tabs, as the approved design shows.
* Section 6.5: loading and failure messages, if the site is split into parts.
* Section 6.6.2: how the script size and the transfer size are measured.
* Section 6.2: worked examples for `#/docs`, the section link and the tabs.

---

## 8. Assumptions

1. The library README and release notes on the library's `main` branch today are the text that will be at tag `v2.0.0`. If they change, section 6.1.3, item 5 applies.
2. Version 2.0.0 does not rename any class or method before its release.
3. GitHub Pages and GitHub Actions stay free for public repositories.
4. GitHub allows a new `release/*` branch to be pushed under the current rules. This is checked before the first release branch is created.
5. The maintainer writes or approves the text of the personal section on Home. It can be drafted from the current Back Story.
6. Readers use a current browser (section 6.6.3).

---

## 9. Definition of done

* Every page in section 6.1.1 exists, and every address in section 6.2.1 gives the result in that table.
* Every row in sections 6.2.2 and 6.2.3 behaves as described.
* The documentation covers every topic in section 6.1.3, and describes version 2.0.0 only.
* Every C# example compiles against 2.0.0 in a .NET 10 console application.
* Every fact agrees with the library README and the release notes at tag `v2.0.0`.
* The Versions page matches section 6.2.4, and lists no unreleased version.
* The automated accessibility check finds no violations on any page. Lighthouse gives the four pages in section 6.6.1, item 3 an accessibility score of 100. The keyboard check passes.
* Home and the longest documentation page have a Lighthouse mobile performance score of at least 90.
* The script is at most 300 KB gzipped, each image is at most 200 KB, and the first load of any page is at most 500 KB.
* No page scrolls sideways at 320 pixels. Wide code examples and tables scroll inside their own box.
* Every section of a documentation page can be opened from its own address.
* The site loads nothing from another host and sets no cookies.
* Every package was at its latest stable version when upgraded, or is a recorded exception (section 6.1.12, item 1), and the package audit reports no known vulnerabilities at each release.
* Every pull request into `main` or `release/*` runs the checks in section 6.1.11, item 1, and cannot merge until they pass.
* A merge into `main` deploys the site without a personal token.
* The repository has the README in section 6.1.11, item 7, and an MIT licence. It tracks no build output and no copy of the source.
* The maintainer approved the visual design before it was built.
* The spelling, grammar and wording of every page were checked after the final content was in place.
* Release 3 went live only after version 2.0.0 was listed on nuget.org.
