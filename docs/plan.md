# JWT Validator documentation site upgrade — Plan

> **What this document is for:** It answers *how will we build it?* It turns the approved requirements in spec.md into a design, and it is agreed before any code is written.

Status: Approved
Last updated: 2026-10-24

---

## 1. Approach

The site stays a single-page React app on GitHub Pages, as spec section 5.1 requires. The build moves from webpack to Vite. React, MUI and the router move to their current major versions. The pages are rebuilt to the approved design (section 3.6). Documentation pages are TypeScript components with shared building blocks, and every C# example is a real `.cs` file that the pipeline compiles. The work is delivered in the three releases of spec section 6.1.10, each on its own release branch.

### 1.1 Options considered

The maintainer chose the build tool, the UI library, the routing and the host on 2026-10-21 and 2026-10-23, after comparing the options. They are recorded in section 3.5. These further choices were made for this plan:

**How the documentation content is written**

| Option | Pros | Cons |
| --- | --- | --- |
| TypeScript components, with typed data for method references | The current pattern. One language. Type checking catches broken links to data. | Prose is written inside JSX. |
| MDX (Markdown with components) | Prose is easier to write. | A new syntax and build plugin. Code blocks and notes need custom components anyway. |

Chosen: **TypeScript components with typed data.** There are 10 pages, which is too few to justify a second content format.

**How the C# examples are proved to compile (spec section 6.1.3, item 6)**

| Option | Pros | Cons |
| --- | --- | --- |
| Each example is a `.cs` file. The site imports its text. The pipeline compiles every file. | The shown code is the compiled code. A broken example fails the pull request. | Adds a .NET job to the pipeline. Examples must be complete programs. |
| Examples are strings in TypeScript. They are copied into a console app by hand. | No .NET in the pipeline. | Easy to forget. Nothing stops a broken example. |

Chosen: **`.cs` files compiled by the pipeline.** It is the only option that keeps spec section 6.1.3, item 6 true over time.

**How behaviour in a real browser is tested**

| Option | Pros | Cons |
| --- | --- | --- |
| Component tests only, in a simulated browser | Fast. One tool. | Cannot check scrolling, page width, colour contrast, network requests or the old addresses. |
| Component tests, plus end-to-end tests in a real browser | Proves spec sections 6.2.1 to 6.2.3 and 6.6 as written. The accessibility check runs with real colours. | A second tool. The pipeline downloads a browser. |

Chosen: **both.** Most of the spec's worked examples are browser behaviour.

---

## 2. Configuration

The site has no secrets and no environment-specific settings.

| Setting | Value | Where | Notes |
| --- | --- | --- | --- |
| Base path | `/JWTValidator/` | `vite.config.ts` | The site is served from this path (spec section 5.1). |
| Site address | `https://ollierumbol.github.io/JWTValidator/` | `index.html` | Used in the Open Graph tags, which need absolute addresses. |
| Library and repository links | nuget.org package page, library repository, site repository, licence | `src/content/links.ts` | One place for every external link. |
| Latest library version | From the newest entry in `src/content/versions.ts` | Computed | The footer reads it (spec section 6.1.2, item 6). It is never typed twice. |
| Node version | 24, the current LTS ("Krypton") | `.nvmrc` only. `package.json` `engines` says `>=24`, and the workflows read `.nvmrc` with `node-version-file`. | One place for the version. Node 26 is expected to become LTS at about the end of October 2026; moving to it is a one-line change, checked at each release. |
| Package version for the examples | A pre-release of 2.0.0 (`2.0.0-beta.1`), then `2.0.0` | `examples/Directory.Build.props` | Section 3.5, "Example compilation". |
| Size limits | As spec section 6.6.2 sets them | `scripts/check-size.mjs` and the end-to-end tests | How each is measured: section 7.2, tests 13 and 14. |
| Path alias | `@/` for `src/` | `vite.config.ts` and `tsconfig.json` | Absolute imports, as the React rules require. |
| Type-checked files | `src/`, `e2e/`, `scripts/` and `vite.config.ts` | `tsconfig.json`, plus `tsconfig.node.json` for the files that run in Node | Every TypeScript file is checked, not only the app. |

---

## 3. Architecture

### 3.1 Components

```
index.html                    Page shell: title, description, Open Graph tags,
                              noscript message. The build adds the content
                              security policy (section 3.5).
public/                       favicon.ico, og-image.png (1200 x 630)
src/main.tsx                  Starts React
src/app/
  router.tsx                  Every route, including the old addresses
  theme.ts                    MUI theme: colours, fonts, spacing, shapes
  RootLayout.tsx              Header, footer, scroll restoration, <Outlet />
src/components/               One folder per shared component, <Name>/<Name>.tsx,
                              with its tests beside it (React rules)
  SiteHeader/                 Logo, header links, menu button below the md breakpoint
  MobileMenu/                 Drawer with every header link and the docs list
  SiteFooter/                 Footer links and latest version
  Logo/                       The three bars and the name
  ExternalLink/               A link to another site, with the arrow and the
                              "leaves this site" text for screen readers
  CodeBlock/                  Highlighted code, caption, scrolls sideways, CopyButton
  CopyButton/                 Clipboard copy, success and failure messages
  ExampleTabs/                Tabs that switch between code examples (Home)
  ChangedNote/                "Changed in 2.0.0" note with a link to the migration guide
  MethodReference/            Summary, signatures, parameters, returns, failures
  MethodTable/                The table of a page's methods, linking to each reference
  SectionHeading/             Heading with an id and a section link that copies
                              its address
  ScrollTable/                A table inside a box that scrolls sideways
  RouteFallback/              Loading and failed-to-load messages for split pages
  DocsLayout/                 Sidebar, article, "On this page", previous and next
  DocsNav/                    The grouped list of docs pages (sidebar and menu)
  OnThisPage/                 The page's own sections, collapsible on a phone
  PrevNextLinks/              Reading-order links
src/pages/
  home/                       HomePage and its sections, TokenDiagram
  docs/<slug>/                One folder per docs page (section 3.4)
  versions/                   VersionsPage
  not-found/                  NotFoundPage
src/content/
  docsPages.ts                Slugs, titles, groups and reading order
  versions.ts                 Changelog entries
  links.ts                    External links
  methods/*.ts                Method reference data for each class
src/hooks/
  useScrollToSection.ts       Scrolls to the section named in the address
examples/
  *.cs                        Every C# example, as a complete program
  Directory.Build.props       Package version for the examples
  build-examples.ps1          Compiles each example in its own console project.
                              PowerShell, which runs on the pipeline's Ubuntu
                              runners and on Windows.
scripts/
  check-size.mjs              Size limits on the build output (section 7.2, test 14)
  csp.ts                      Vite plugin that adds the content security policy
                              to the built index.html only
e2e/                          End-to-end tests (section 7)
.github/workflows/
  ci.yml                      Checks on every pull request
  deploy.yml                  Deploys on every push to main
```

### 3.2 Existing code to follow or reuse

* `src/components/versions/Versions.ts` — a typed data array rendered by a component. `src/content/versions.ts` follows the same pattern with the fields in section 3.4.
* `src/components/documentation/*/…MethodDetails.ts` — method reference data kept apart from layout. `src/content/methods/*.ts` keeps this pattern. The text is rewritten for 2.0.0.
* `src/components/home/BackStory.tsx` — the source of the "Why I built this" draft on Home.
* Everything else is replaced. The current components mix layout and content, and they hold the defects in spec section 4.1.

### 3.3 Interfaces and contracts

Routes, defined in `src/app/router.tsx` with a hash router and a root layout:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/docs` | Redirect to the first page in `docsPages`. That is `getting-started` from release 3, and `validation-options` in release 2, before Getting started exists. |
| `/docs/:slug` | The docs page for `slug`, or "Page not found" when the slug is unknown |
| `/docs/:slug/:section` | The same page, scrolled to the element with id `section` |
| `/versions` | Versions |
| `/documentation/builder` | Redirect to `/docs/validation-options` |
| `/documentation/validator` | Redirect to `/docs/validator` |
| `/documentation/expiry` | Redirect to `/docs/expiry-checker` |
| `/documentation/dictionary` | Redirect to `/docs/dictionary-extensions` |
| `*` | "Page not found" |

Redirects replace the history entry, so Back does not return to the old address. A shared section link is the full hash, for example `#/docs/validation-options/minimum-secret-length` (spec section 6.1.1, item 6).

Main component contracts:

```tsx
type CodeBlockProps = {
  code: string;          // Exact text. CopyButton copies this, without line numbers.
  caption?: string;      // For example "Program.cs"
  language?: "csharp" | "xml" | "shell";   // Default "csharp". The label shows the language.
};

type CopyButtonProps = {
  text: string;
  label?: string;        // Accessible name, default "Copy code"
};

type ExampleTabsProps = {
  label: string;         // Accessible name of the tab list, for example "Signing key source"
  examples: { id: string; title: string; code: string; caption?: string }[];
                         // The first example is selected when the page opens
};

type ChangedNoteProps = {
  children: React.ReactNode;   // What changed, in one or two sentences
};

type SectionHeadingProps = {
  id: string;            // Also the last part of the section address
  level: 2 | 3;
  children: React.ReactNode;
};
```

Only `csharp` examples come from `examples/` and are compiled. `xml` and `shell` snippets are written in the page and are not compiled (spec section 6.1.3, item 8).

`SectionHeading`'s section link is a real link to the section address. Selecting it copies the full address and shows "Link copied" in the same way as `CopyButton`. When the clipboard rejects the write, the link opens the address as a normal link (spec section 6.1.1, item 6). The link shows on hover and on keyboard focus (section 3.6).

`ExampleTabs` uses MUI's `Tabs`, which follows the ARIA tabs pattern: the arrow keys move between tabs, and each tab panel is labelled by its tab (spec section 6.1.7, item 2).

Every docs page uses `DocsLayout`, which reads the page's metadata from `docsPages.ts` and its sections from the `SectionHeading` ids the page declares.

### 3.4 Data model

```ts
type DocsGroup = "Get started" | "Guides" | "More";

type DocsPage = {
  slug: string;          // Unique. Part of the address.
  title: string;
  group: DocsGroup;
};
// docsPages is an array in reading order. Previous and next come from the order.

type VersionStatus = "Latest" | "Previous" | "Unlisted";

type Version = {
  version: string;       // "2.0.0"
  published: string;     // "8 November 2022", or "2022" for 1.0.0 (spec section 6.1.6, item 2)
  status: VersionStatus;
  summary: string;
  changes: string[];
  breakingChanges?: string[];   // 2.0.0 only, with a link to the migration guide
};

type MethodReference = {
  name: string;          // "WithSigningKeyFromSecret"
  summary: string;
  signatures: string[];
  parameters: { name: string; description: string }[];
  returns: string;
  failsWhen: string;     // When it throws or returns false
  changedIn2?: string;   // The "Changed in 2.0.0" text, when there is one
};
```

The docs pages, in reading order:

| Group | Slug | Title | Spec topic (section 6.1.3) |
| --- | --- | --- | --- |
| Get started | `getting-started` | Getting started | Getting started |
| Get started | `migrating-from-1x` | Migrating from 1.x | Migration from 1.x |
| Guides | `validation-options` | Validation options | Validation options, Secret length |
| Guides | `validator` | Validator | Validator |
| Guides | `claims` | Claims | Claims |
| Guides | `expiry-checker` | Expiry checker | Expiry checker |
| Guides | `dictionary-extensions` | Dictionary extensions | Dictionary extensions |
| More | `dependency-injection` | Dependency injection | Dependency injection |
| More | `debugging` | Debugging | Debugging |
| More | `known-limitations` | Known limitations | Known limitations |

### 3.5 Key decisions

| Decision | Choice | Why | Alternatives rejected |
| --- | --- | --- | --- |
| Build tool | Vite 8 with the React plugin | Maintainer's choice. Two packages replace about eight. Hashed file names by default. | Upgrading webpack. Next.js. A docs framework. |
| UI library | MUI 9, styled with Emotion | Maintainer's choice, confirmed by the approved design, which is mostly standard parts. The `Drawer` gives the mobile menu its focus trap, Escape and backdrop behaviour (spec section 6.1.2, items 3 and 4). | Plain CSS. Tailwind. MUI's zero-runtime Pigment CSS engine, which is newer and changes how every style is written. |
| React | 19, with the React Compiler | Current major version. Removes the deprecated start-up call (spec section 4.1, item 13). The compiler is the default in the React rules. React 19 places `<title>` in the head from any component, which gives each page its title (spec section 6.1.1, item 9). | React 18. |
| Router | React Router 8, hash router in data mode | Maintainer's choice of hash addresses for GitHub Pages (spec section 5.1). Data mode gives `ScrollRestoration`: a new page starts at the top, and Back restores the old position (spec section 6.1.1, items 4 and 7). | Normal addresses with a `404.html` copy. Pre-rendering. |
| Section addresses | A second path segment, `/docs/:slug/:section` | A normal `#anchor` cannot be used, because the hash holds the route. A path segment is readable and works with the router. | A query string such as `?section=`. |
| TypeScript | 6.0, the newest 6.x | The lint package, `typescript-eslint` 8.72, supports TypeScript below 6.1 only. TypeScript 7 is the latest stable version, so this is the one exception that spec section 6.1.12, item 1 allows. It also matches the global TypeScript pin in the React rules. Move to 7 when `typescript-eslint` supports it. | TypeScript 7 without type-aware lint rules. |
| Lint and format | ESLint 10 flat config, `typescript-eslint`, React Hooks recommended rules, Prettier | The defaults in the React rules. The Hooks rules include the React Compiler checks. | — |
| Fonts | IBM Plex Sans and IBM Plex Mono, from the `@fontsource` packages, Latin subset, only the weights in use | The approved design. Bundled with the site, so nothing loads from another host (spec section 6.6.4, item 2). `font-display: swap` shows text before the font arrives. | Google Fonts, which is another host. |
| Syntax highlighting | `react-syntax-highlighter`, light build, C# grammar only, with a theme from the design colours | The existing package. Loading one grammar keeps the script small (spec section 6.6.2, item 2). | Highlighting every language, as today. A new highlighting package. |
| Copy | The browser Clipboard API, with a polite live region for the result | No package needed. The live region announces "Copied" or the failure to screen readers (spec section 6.1.5, items 4 and 5). | A copy library. |
| Example compilation | Every C# example is `examples/<name>.cs`, a complete console program. The site imports the file text with Vite's `?raw` import. `examples/build-examples.ps1` builds each file in its own temporary .NET 10 console project that references the `JWTValidator` package at the version in `examples/Directory.Build.props`. A file whose name starts with `di-` also gets `Microsoft.Extensions.DependencyInjection`. The script passes when the folder has no `.cs` files. | The shown code is the compiled code (spec section 6.1.3, items 6 and 8). `2.0.0-beta.1` is a pre-release of 2.0.0 with the same API, and is on nuget.org before 2.0.0, so the examples can be checked while release 3 is built. The version moves to `2.0.0` when it is released. One PowerShell script runs on the pipeline and on Windows, so there are not two scripts to keep in step. | Examples as strings, checked by hand. A project reference to a local clone of the library. A Bash and a PowerShell script side by side. |
| Images | Release 1: each current image converted once to WebP under 200 KB, with a one-off `sharp-cli` command. Release 2: the photos are removed, because the design has none. | Spec section 6.1.10, releases 1 and 2. The conversion is one command, so little work is lost when release 2 removes the photos. | Keeping the JPGs until release 2. An image plugin in the build, which release 2 would make unused. |
| Shared-link preview | Site-wide tags in `index.html`, with a 1200 x 630 PNG of the logo and name | Search engines and link previews read only `index.html` (spec section 6.1.9). | Tags per page, which a hash-routed site cannot serve. |
| Content security policy | A `<meta http-equiv="Content-Security-Policy">` tag that allows only the site's own origin for scripts, fonts, images and connections, and inline styles for Emotion. `scripts/csp.ts` adds it to the built `index.html` only, so `npm run dev`, which needs an inline refresh script, keeps working. Vite's `assetsInlineLimit` is `0`, so no asset becomes a `data:` address that the policy would block. | Makes the browser block any load from another host, which enforces spec section 6.6.4, item 2. GitHub Pages cannot set response headers, so a meta tag is the only way. | No policy. A policy in dev too, which would need `'unsafe-inline'` for scripts. |
| Split pages | Lazy routes only if the size check needs them. A lazy page uses `RouteFallback`: a loading message after 0.5 seconds, and, when its file fails to load, a message with a link that reloads the page. | Spec section 6.5. A file can disappear when a new version is deployed while a reader has the site open. | Splitting every page by default. |
| Example tabs and section links | `ExampleTabs` on MUI's `Tabs`. The section link copies with the same Clipboard code as `CopyButton`. | The approved design (section 3.6) and spec sections 6.1.1, item 6 and 6.1.7, item 2. | Custom tab code. |
| Reduced motion | A global rule that removes transitions and animations when the reader asks for reduced motion | Spec section 6.7. One rule covers MUI's transitions and the site's own. | Changing each MUI transition in the theme. |
| No JavaScript | A `<noscript>` message in `index.html` | Spec section 6.7. | — |
| Deployment | GitHub's Pages actions: build, upload the artifact, deploy. Runs on every push to `main`, and by hand (`workflow_dispatch`) to deploy `main` again. One deploy at a time (`concurrency`), as GitHub's Pages starter workflow does. To roll back, revert the bad change in a pull request into `main`, which deploys the reverted site. | No personal token and no `gh-pages` branch (spec section 6.1.11, items 3 to 5). The workflow gets only `pages: write` and `id-token: write`. A rollback goes through the same checks as any change. | The current push to `gh-pages`. Deploying an old build by hand. |
| Package audit | `npm audit` in the pipeline. It fails pull requests into `main` and only reports on pull requests into `release/*`. | Spec section 6.1.12, item 2 applies at each release, which is a merge into `main`. A new advisory then does not block unrelated task work. | Failing every pull request. Checking by hand. |

A significant decision gets an ADR. These two get one each, because they have long-term effects and are easy to "improve" away:

1. `docs/adr/0001-hash-routing-on-github-pages.md` — hash routing, why, and that search engines index one page.
2. `docs/adr/0002-compile-documentation-examples.md` — examples as compiled files, and the package version they track.

### 3.6 Visual design

The maintainer approved the "Combined" design on 2026-10-23: Calm docs' light layout with the Token direction's logo and colours.

The approved design is stored in `docs/design/`. It is the reference for the build:

| File | Shows |
| --- | --- |
| `home.png`, `home.html` | Home at 1280 px |
| `docs-page.png`, `docs-page.html` | A docs page ("Validation options") at 1280 px, with the method table before the reference blocks |
| `migration-guide.png`, `migration-guide.html` | The migration guide at 1280 px: a summary table, then one section per change with "Affects you if" and before-and-after code |
| `versions.png`, `versions.html` | The Versions page at 1280 px, as it looks in release 3 |
| `not-found.png`, `not-found.html` | "Page not found" at 1280 px |
| `phone.png`, `phone.html` | Home and the open menu at 390 px |
| `docs-phone.png`, `docs-phone.html` | A docs page at 390 px: "On this page" as a collapsible box at the top, a table, and code that scrolls sideways |
| `states.png`, `states.html` | Interaction states: the Copy button, keyboard focus, links, section links, tabs and the docs list |
| `logo.png`, `logo.html` | The logo on light and dark, and the package icon at 128, 64 and 32 px |

Each PNG is a screenshot of the HTML file next to it. The HTML files open in any browser and can be edited. They load their fonts from Google Fonts; the site itself hosts its fonts (section 3.5). When the design changes, update the HTML and take the screenshot again, in the same pull request as the change to this section.

The mockups were made on a design canvas at https://claude.ai/artifact/HAYiod2CQbwdKc6UmHeVXB, rows 4 and 5. The canvas is private to the maintainer and is a place to explore ideas. `docs/design/` is the record of what was approved. After release 2, the theme and components in code are the source of truth for the design.

The theme holds these values. No component uses a colour that is not in the theme (React rules, "Styling").

| Token | Value | Use |
| --- | --- | --- |
| Background | `#FFFFFF` | Page |
| Surface | `#F7F6FB` | Hero band, footer, code captions, table headers |
| Border | `#E3E0EC` | Lines and outlines |
| Text | `#1B1A22` | Body text |
| Muted text | `#55526A` | Secondary text. 7.5:1 on white. |
| Primary | `#6B24B2` | Buttons. White text on it is 8.3:1. |
| Link | `#7A2DBE` | Links and the current docs page. 7.1:1 on white. |
| Logo bars | `#E5427A`, `#9447D6`, `#1C9CC9` | Logo and colour keys. Each is at least 3:1 on white. |
| Accent text | `#C21E5A`, `#7A2DBE`, `#0A7398` | The coloured token parts and step numbers. Each is at least 4.5:1 on white. |
| Changed note | Background `#FDEEF3`, border `#F3C3D4`, label `#A8174D` | "Changed in 2.0.0" |
| Code | Background `#FCFBFE`. Keywords `#7A2DBE`, types `#0A7398`, strings `#A0461A`, methods `#6B4E00`, comments `#5E6573` | Every colour at least 4.5:1 on the code background |
| Hover | Tint `#F3F1F8` behind header and docs list links. Copy button `#E4D6F7` with text `#5A1F8F`. | Pointer hover |
| Focus ring | 2 px solid `#6B24B2` outline, 2 px offset, on `:focus-visible` | Keyboard focus on every focusable part (WCAG 2.2, 2.4.7). 8.3:1 against white. |
| Success | Background `#E3F3E8`, text `#1F6B36` | "Copied" and "Link copied". 5.7:1. |
| Failure | The changed note colours | "Copy failed" |
| External links | A 14 px arrow after the text, and "leaves this site" for screen readers | Links to nuget.org and GitHub, which open in the same tab (spec 6.1.2, item 7) |
| Section links | The "#" link after a heading shows on hover and on keyboard focus only | Spec 6.1.1, item 6 |
| Fonts | IBM Plex Sans (400, 500, 600, 700), IBM Plex Mono (400, 500, 600) | Text and code |
| Breakpoints | MUI defaults. Below `md` (900 px) the header links become the menu button and the docs sidebar moves into the menu. Below `lg` (1200 px) "On this page" moves to the top of the article. | Spec sections 6.1.2 and 6.1.4 |

Every pair was measured on 2026-10-23 with the WCAG formula. The lowest are the logo bars (pink 3.9:1, cyan 3.2:1), which are graphics and need 3:1, and the code types (5.2:1), which are text and need 4.5:1. The accessibility tests in section 7 check them again on the built pages.

---

## 4. Error handling

The site has no server and makes no network calls of its own. These are the failure cases:

| Situation | Behaviour |
| --- | --- |
| An address matches no route | "Page not found", with a link to Home (spec section 6.1.1, item 8). |
| `/docs/:slug` with an unknown slug | "Page not found". |
| `/docs/:slug/:section` with an unknown section | The page opens at the top (spec section 6.7). No error is shown. |
| The clipboard write fails or is not available | The button shows "Copy failed", and the live region announces it. The code stays selectable (spec section 6.1.5, item 5). |
| JavaScript is off | The `<noscript>` message says the site needs JavaScript. |
| A font file fails to load | The text stays in the system font (`font-display: swap`). |
| A pipeline check fails | The pull request cannot merge. Nothing is deployed. |
| The deployment fails | The live site keeps the last good version (spec section 6.1.11, item 4). The workflow run shows the failed step. |

---

## 5. Observability

The site collects nothing at run time (spec section 6.6.4, item 1).

* **Pull requests:** the `ci.yml` run shows each check. The size check prints each file's gzipped size against its limit.
* **Deployments:** the `deploy.yml` run and the repository's Pages environment show what is live and when it went live.
* **Releases:** the release pull request into `main` records the Lighthouse scores, the keyboard check, the browser check and the package audit result.

---

## 6. Security

| Item | Decision |
| --- | --- |
| Secrets | None in the site, the repository or the pipeline. |
| Pipeline token | The built-in token only. `ci.yml` has `contents: read`. `deploy.yml` has `pages: write` and `id-token: write`, on the deploy job only. |
| Old secrets | After the first deploy with the Pages actions works, the maintainer deletes the `TOKEN`, `EMAIL` and `USERNAME` secrets, and the `gh-pages` branch. |
| Third-party actions | GitHub's own `actions/*` only. Playwright and .NET come from their official set-up steps and npm, not from community actions. Each action is pinned to its current major version. |
| Requests to other hosts | None. Enforced by the content security policy (section 3.5) and tested (section 7, test 13). |
| Cookies and storage | No cookies (spec section 6.6.4, item 1), tested in section 7, test 13. React Router's `ScrollRestoration` keeps scroll positions in the browser's `sessionStorage` for the open tab. It holds no personal data and is gone when the tab closes. |
| Rendering of HTML | The site renders only its own content. No HTML from another source is inserted. |
| Branch protection | As spec section 4. The required checks are added as section 8 describes. |

---

## 7. Testing

### 7.1 Principles

* **Component tests** use Vitest, React Testing Library and `user-event`, in a simulated browser. They test what the reader sees and does, finding elements by role and name (React rules, "Testing React").
* **End-to-end tests** use Playwright in Chromium against the built site (`vite preview`). They prove the browser behaviour in spec sections 6.2.1 to 6.2.3 and 6.6. The accessibility check uses `@axe-core/playwright`, so colour contrast is checked with real styles. A simulated browser cannot check contrast.
* **Content data** is plain TypeScript, tested without rendering.
* **Not automated:** Lighthouse scores, the keyboard walkthrough, the browser check (spec section 6.6.3, item 3), the fact check against the library README, and the wording check. They are done by hand for each release and recorded in the release pull request.
* Accessibility tests start in release 2 (spec section 6.1.10, item 6). Tests 10 and 11 are added with the first redesigned part, the header and menu, and each later task adds its page to them. Accessibility problems are found in the task that causes them, not at the end. Size limits apply from release 1.
* **Sizes** are measured as spec section 6.6.2 defines them:
  * Test 14 reads Vite's build manifest. For each route, it adds up the gzipped size of every JavaScript file that the route loads on first load.
  * Test 13 adds up the bytes each response sent over the network, from Playwright's `request.sizes()`. `vite preview` may not compress responses as GitHub Pages does, so test 13 gzips each text response itself when the server did not.
* A Lighthouse mobile run on Home and the longest docs page is part of the size task in release 1, not only the release checks. The score of 90 is tight for a site drawn in the browser, so a problem is found early.
* A test that a change breaks is fixed or updated with that change, never skipped.

### 7.2 Tests

| # | Test | Kind | Spec | Defect it catches |
| --- | --- | --- | --- | --- |
| 1 | Copy puts the exact example text on the clipboard, without line numbers, shows "Copied" and announces it | Component | 6.1.5 items 3, 4 | Line numbers or highlighting markup copied. No feedback. |
| 2 | Copy shows and announces "Copy failed" when the clipboard rejects the write | Component | 6.1.5 item 5 | Silent failure. |
| 3 | The menu opens from the menu button, closes on a link, the close button, Escape and the backdrop, and focus returns to the menu button | Component | 6.1.2 items 2 to 4 | A menu that traps the reader or loses focus. |
| 4 | Versions lists only released versions, newest first, with the right status, and 1.0.0 shows "2022" | Component and data | 6.1.6, 6.2.4 | Unreleased placeholders. Wrong order or status. |
| 5 | Every docs slug is unique, every page has a group, and previous and next follow the reading order with no gaps | Data | 6.1.4 item 4 | Broken or circular previous and next links. |
| 6 | Each page sets its tab title in the form `<page name> — JWT Validator`, and Home sets `JWT Validator` | Component | 6.1.1 item 9 | Missing or repeated titles. |
| 7 | The footer shows the newest version from the versions data | Component | 6.1.2 item 6 | A version number typed in two places. |
| 8 | Every address in spec section 6.2.1, including `#/docs`, gives the page in that table | End-to-end | 6.1.1 items 2, 3, 8; 6.2.1 | Broken bookmarks. Blank page for unknown addresses. A docs link that lands on "Page not found". |
| 9 | Every row of spec section 6.2.2: start at the top, section link, shared section link, Back, phone menu, Escape, copying a section link, and the example tabs with the arrow keys | End-to-end | 6.1.1 items 4 to 7; 6.1.7 item 2; 6.2.2 | The kept scroll position (spec section 4.1, item 9). Tabs that the keyboard cannot reach. |
| 10 | At 320 px, no page is wider than the screen, and wide code and tables scroll inside their box | End-to-end | 6.6.3 item 2; 6.2.3 | The clipped example (spec section 4.1, item 4). Sideways page scroll. |
| 11 | At 320 px and 1280 px, every page has no accessibility violations | End-to-end | 6.6.1 item 2 | Low contrast, missing names, invalid structure (spec section 4.1, item 11). |
| 12 | With JavaScript off, the page shows the noscript message | End-to-end | 6.7 | A blank page. |
| 13 | Loading each page makes no request to another host, transfers at most 500 KB, and sets no cookies | End-to-end | 6.6.4 items 1, 2; 6.6.2 item 4 | A font, image or script from another host. Size growth. A cookie from a package. |
| 14 | For each route, the JavaScript loaded on first load is at most 300 KB gzipped, and each image is at most 200 KB | Script, `scripts/check-size.mjs` | 6.6.2 items 2, 3, 5 | The 1.3 MB script and the 15.6 MB image (spec section 4.1, items 2 and 3). |
| 15 | Every file in `examples/` compiles against the package version in `examples/Directory.Build.props`, and the script passes when there are none | Script, .NET | 6.1.3 items 6, 7 | Examples that do not compile (spec section 4.1, item 5). |
| 16 | The section link copies the section's full address and shows "Link copied", and opens the address when the clipboard rejects the write | Component | 6.1.1 item 6 | A link that copies the wrong address, or does nothing on failure. |
| 17 | The example tabs show the OpenID Connect example first, switch with the mouse and the arrow keys, and copy the shown example | Component | 6.1.7 item 2 | The wrong default tab. Copying the hidden example. |
| 18 | With reduced motion asked for, opening the menu has no transition | End-to-end | 6.7 | Animations that ignore the reader's setting. |
| 19 | The built `index.html` has the site description, and the Open Graph title, description, image and address, and the image file exists | End-to-end | 6.1.9 | A broken link preview. |
| 20 | When a split page's file fails to load, the page shows the reload message (only if lazy routes are used) | Component | 6.5 | A blank page after a new deploy. |

---

## 8. Infrastructure and deployment

**Hosting.** GitHub Pages, as spec section 5.1 requires. Public repository, so hosting and Actions minutes are free (spec section 6.6.5). No Azure resources.

**Pages source.** The maintainer changes the repository's Pages source from the `gh-pages` branch to "GitHub Actions" just before the first deploy with `deploy.yml`. Whether the old site stays up in between is not documented, so the maintainer checks the live site straight after that deploy (section 9).

**`ci.yml`** runs on every pull request into `main` or `release/**`, and on pushes to those branches:

| Job | Steps |
| --- | --- |
| `build` | Set up Node from `.nvmrc` with the npm cache. `npm ci`. Type check. Lint. Prettier check. Component tests. Build. Size check (test 14). `npm audit`: failing for pull requests into `main`, reporting only for `release/**`. Upload the `dist` folder for the next job. |
| `e2e` | Needs `build`. Download `dist`. Install Playwright's Chromium. Serve `dist` with `vite preview`. Run the end-to-end tests. Upload the report when a test fails. |
| `examples` | Set up .NET 10. Run `pwsh examples/build-examples.ps1`. The script exists from the task that adds `ci.yml`, and passes when the folder has no `.cs` files yet. |

**`deploy.yml`** runs on every push to `main`, and by hand with `workflow_dispatch`: build, upload the Pages artifact, deploy. Only the deploy job has the Pages permissions. `concurrency` lets one deploy run at a time. To roll back, revert the change in a pull request into `main`.

**Required checks.** A required check must report on every pull request into its branch, or no pull request can merge. So:

1. When `ci.yml` is merged into `release/phase-1-foundation`, the maintainer adds `build`, `e2e` and `examples` to "Protect release branches".
2. When release 1 is merged into `main`, `ci.yml` is on `main`, and the maintainer adds the same checks to "Protect main".

Until then, pull requests into `main`, such as planning changes, merge without checks, as they do today.

**Branches and releases.** Each release in spec section 6.1.10 has a release branch from `main`: `release/phase-1-foundation`, `release/phase-2-redesign` and `release/phase-3-content`. Task branches start from the release branch and merge into it. When the maintainer approves a release, one pull request merges the release branch into `main`, which deploys it. The release pull request records the manual checks in section 7.1. `release/phase-3-content` merges only after 2.0.0 is listed on nuget.org (spec section 6.1.10, item 2).

**Planning changes during a phase.** A change to `docs/spec.md` or `docs/plan.md` goes into `main` by pull request, as before. Straight after it merges, a pull request merges `main` into the open release branch, so task sessions read the current documents. Ticks in `docs/tasks.md` are made on the release branch and reach `main` with the release.

**Cleanup in release 1.** The first task removes `dist/` and `examples/dist/`, because Vite builds into `dist/` and the 2022 files would be mixed with new build output. The same task adds `dist/`, `playwright-report/` and `test-results/` to `.gitignore`, and moves `favicon.ico` to `public/`. Later in release 1: `.babelrc`, `webpack.config.js`, the Babel 6 and webpack packages, `file-loader`, `gh-pages`, the unused font package, `peerDependencies`, `main`, and the `transpile` and `prepublishOnly` scripts in `package.json`. The `examples/` folder name is reused for the C# examples (section 3.5).

---

## 9. Risks

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| TypeScript stays on 6.0 while `typescript-eslint` does not support 7, so the project falls behind the latest version. | Certain | Recorded as the exception in section 3.5, as spec section 6.1.12, item 1 allows. Check at each release whether `typescript-eslint` supports 7, and move when it does. |
| MUI, Emotion, React and the router together exceed the 300 KB script limit. | Low | Load each page's code only when it is opened (lazy routes, with the states in section 3.5). Import MUI components by path. Test 14 shows the size on every pull request. |
| Fonts push the first load past 500 KB. | Low | Latin subset and only the weights in use, about 20 KB each. Test 13 measures the total. |
| React Router 8 or MUI 9 changed an API this plan relies on, for example the hash router in data mode or `ScrollRestoration`. | Medium | Release 1's router and MUI upgrades confirm each API before release 2 builds on it. A change goes back into this plan for approval. |
| The React plugin for Vite 8 needs extra packages for the React Compiler. | Medium | Install what the plugin's documentation lists at the time. The README lists them. |
| The Lighthouse mobile score of 90 is hard to reach for a site drawn in the browser, with up to 300 KB of script. | Medium | Run Lighthouse in the release 1 size task, not only at the release. If it falls short, split pages (section 3.5), and keep the hero free of large images, as the design already is. |
| Node 26 becomes the LTS during the project. | Medium | The version is in `.nvmrc` only. Check at each release, and move in a small task when the packages support it. |
| 2.0.0 or its beta is released later than planned. | Medium | Releases 1 and 2 do not depend on it. Release 3's examples build against `2.0.0-beta.1` until 2.0.0 exists. Release 3 waits (spec section 6.1.10, item 2). |
| Playwright's browser download makes the pipeline slow. | Low | Install Chromium only. Cache it between runs. |
| Switching the Pages source causes a short outage. | Low | Switch just before the first `deploy.yml` run, and check the live site straight after. |
| GitHub blocks pushing a new `release/*` branch under the current rules (spec section 8, assumption 4). | Low | Check before the first release branch. If blocked, create the branch on the GitHub website. |
| Old addresses shared before the upgrade keep circulating. | Certain | The redirects in section 3.3 stay for good. Test 8 covers them. |
