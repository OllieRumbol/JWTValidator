# JWT Validator documentation site upgrade — Tasks

> **What this document is for:** It answers *what do we do next?* It splits the approved design into small, verifiable steps and tracks progress against them.

Last updated: 2026-10-25

**Branches.** Each phase is one release (spec 6.1.10) on its own release branch, named in the phase's `Base branch:` line. A task branch is `task/<id>-<short-name>`, starts from its phase's release branch, and its pull request merges into that release branch. The `do-task` skill reads the `Base branch:` line. A phase's last task merges the release branch into `main`, which deploys it, after the maintainer approves the release. A small fix outside this file uses `fix/<short-name>` from `main`. Planning documents use `task/<short-name>` branches from `main`. A planning change during a phase reaches the release branch as plan 8 describes.

**Approval.** Calling `do-task` is the approval to commit, push and open the pull request. The maintainer merges. A task is done only when its pull request is merged. A task marked "(maintainer)" changes a repository setting or a release, so the maintainer does it, or approves each step.

**Commands.** Run from the repository root, in Git Bash: the `Verify` commands use Bash syntax such as `&&` and `grep`. The npm scripts arrive in this order: `dev`, `build`, `preview` and `typecheck` in T2; `lint` and `format:check` in T5; `check-size` in T6; `test` and `e2e` in T7. If `npm` is blocked in Windows PowerShell, use `npm.cmd`.

**Design.** `docs/design/` holds the approved design (plan 3.6). Each task that builds a screen matches the file it names.

## Phase 1 — Foundation

Goal: The site builds with Vite on current packages, every pull request is checked, the deployment uses GitHub's Pages actions, and the script and images meet the size limits. The pages look as they do today.

Base branch: release/phase-1-foundation

- [x] **T1 — Create the phase 1 release branch (maintainer)**
  - Refs: plan 8 (branches and releases), spec 8 assumption 4
  - Depends on: the pull request that adds this file, merged into `main`
  - Done when:
    - `release/phase-1-foundation` exists on origin, at the same commit as `main`.
    - `docs/spec.md`, `docs/plan.md` and `docs/tasks.md` on the release branch match `main`.
    - The result of pushing a new `release/*` branch under the "Protect release branches" ruleset is recorded in Notes.
  - Verify: `git ls-remote --heads origin release/phase-1-foundation` shows the commit that `git rev-parse origin/main` shows, and `git diff origin/main origin/release/phase-1-foundation -- docs` prints nothing.
  - Notes:
    - Spec 8, assumption 4 holds: on 2026-10-26, `git push origin main:refs/heads/release/phase-1-foundation` created the branch at `041f109` under the "Protect release branches" ruleset. No change is needed in the README (T11).
    - The ruleset applies to the new branch: pull request required, no force push.
    - Evidence: pull request #15

- [x] **T2 — Move the build to Vite and TypeScript 6.0**
  - Refs: plan 2 (base path, Node version, path alias, build manifest, TypeScript compiler options), plan 3.1, plan 3.5 (build tool, TypeScript), plan 8 (cleanup in release 1)
  - Depends on: T1
  - Done when:
    - `dist/` and `examples/dist/` are deleted, and `.gitignore` lists `dist/`, `playwright-report/`, `test-results/` and `examples/.build/`.
    - `vite.config.ts` uses the React plugin, the base path `/JWTValidator/`, `assetsInlineLimit: 0`, `build.manifest: true` and the `@/` path alias.
    - `index.html` is at the repository root and loads `src/main.tsx` (renamed from `src/index.tsx`). `favicon.ico` is in `public/`.
    - TypeScript is on the newest 6.0.x. `tsconfig.json` has the compiler options in plan 2 and no option that TypeScript reports as deprecated.
    - `package.json` has the scripts `dev`, `build`, `preview` and `typecheck` (`tsc --noEmit`), no `start` script, and `engines.node` set to `>=24`. `.nvmrc` holds `24`.
    - `webpack.config.js`, `public/index.html`, `.babelrc` and the webpack, Babel, loader and `html-webpack-plugin` packages are removed. Images are imported through Vite, not `file-loader`.
    - The six current routes look and work as they did before.
  - Verify: `npm run typecheck && npm run build && npm run preview`, then open every current route at `http://localhost:4173/JWTValidator/` and compare with the live site. `git ls-files | grep -E "webpack|babelrc|^dist/|^examples/dist/"` prints nothing, and `git status --short` after the build shows no files under `dist/`.
  - Notes:
    - React 18 and MUI 5 stay. TypeScript is 6.0.3. The six routes match the old build: same text, element counts and section heights.
    - Also done here, because they depended on webpack, Babel or `dist/`: removed `main`, `transpile`, `prepublishOnly` and `peerDependencies` (T11 only confirms them), pointed `deploy` at `dist` (T9 removes it), and regenerated the lock file.
    - `"type": "module"` removes Vite's CommonJS warning. It also makes default imports from CommonJS files return `module.exports`, so `HowItWorks.tsx` uses named icon imports.
    - Left to later tasks: Node 12 in the old workflow and gh-pages (T9), `npm audit` (T13), type-checking `vite.config.ts` (T5), `@types/react-router-dom` (T3).
    - Evidence: pull request #16

- [x] **T3 — Upgrade React to 19 and the router to 8**
  - Refs: plan 3.3 (routes), plan 3.5 (React, router), plan 9 (API changes), spec 4.1 item 13
  - Depends on: T2
  - Done when:
    - React and React DOM are on 19, and `src/main.tsx` uses `createRoot`.
    - The routes are defined in `src/app/router.tsx` with React Router 8's hash router in data mode and a root layout, at the current six addresses.
    - The packages `react-router-dom` and `@types/react-router-dom` are removed if version 8 no longer needs them.
    - The browser console shows no deprecation warnings from React or the router.
  - Verify: `npm run typecheck && npm run build && npm run preview`, then open the six current addresses in spec 6.2.1.
  - Notes:
    - Plan 9 check: React Router 8.5.0 still exports `createHashRouter`, `RouterProvider` (from `react-router/dom`) and `ScrollRestoration`, so no plan change is needed. Version 8 has no `react-router-dom`.
    - MUI stays on 5, because 5.18 already supports React 19. The six routes match T2: same text and element counts.
    - An empty `{ path: "*", element: null }` route keeps the old result for an unknown address: the layout with an empty body. Without it, the data router shows its own error page. Release 2 replaces it with "Page not found".
    - Console messages that were there before T3, release 2 removes them: `<pre>` inside `<p>` in the code samples, and a missing `key` in `VersionList`.
    - Evidence: pull request #17

- [x] **T4 — Upgrade MUI to 9**
  - Refs: plan 3.5 (UI library), plan 9 (API changes)
  - Depends on: T3
  - Done when:
    - `@mui/material`, `@mui/icons-material`, `@emotion/react` and `@emotion/styled` are on their latest versions.
    - No import uses a deep path that MUI 9 removed, for example `@mui/material/Alert/Alert`.
    - Every page looks as it did before. Grid layouts use the MUI 9 Grid API.
    - The unused `@fontsource/roboto` package is removed.
  - Verify: `npm run typecheck && npm run build && npm run preview`, then compare every route with the live site at 1280 px and 390 px.
  - Notes:
    - Followed the guides to 6, 7 and 9 (MUI has no 8). The new Grid does not stretch inside `Panel`, which centres its children, so every Grid container has `sx={{ width: "100%" }}`. Without it, a long code line pushed the method cards off both sides of the page.
    - MUI 9 resolves `@mui/icons-material/<Icon>` to an ES module, so the icons use per-icon imports again. This replaces the named imports in T2.
    - Compared with the T3 build and the old webpack build of `main` (the browser pane cannot open github.io): page and section heights match at 1280, 980 and 390 px.
    - Lists changed here have keys. `VersionCard`'s task list still has none, and release 2 rebuilds that page.
    - Evidence: pull request #18

- [x] **T5 — Add lint, format and the React Compiler**
  - Refs: plan 2 (type-checked files), plan 3.5 (lint and format, React), plan 9 (React Compiler packages)
  - Depends on: T4
  - Done when:
    - ESLint 10 uses a flat config with `typescript-eslint` and the React Hooks recommended rules. Prettier is set up. `lint` and `format:check` scripts exist.
    - `tsconfig.json` and `tsconfig.node.json` cover `src/`, `e2e/`, `scripts/` and `vite.config.ts`.
    - The React Compiler is on, with the packages the Vite React plugin lists.
    - `npm run typecheck`, `npm run lint` and `npm run format:check` pass.
  - Verify: `npm run typecheck && npm run lint && npm run format:check && npm run build`
  - Notes:
    - The React Compiler runs through Babel (`@rolldown/plugin-babel`, `@babel/core` 8, `babel-plugin-react-compiler`), as the plugin README lists. Its Rust compiler is marked experimental. The README (T11) must list these three packages.
    - Lint uses typed rules and fails on warnings, because three React Hooks rules that report a skipped component are warnings. JavaScript files (`.js`, `.mjs`, `.cjs`) are linted without types, because no tsconfig covers them.
    - Prettier uses `endOfLine: "auto"`, because the Windows checkout is CRLF and the repository stores LF. It does not format `docs/`.
    - Lint fixes only: unused values, a key on VersionCard's static list, and the Popper `anchorEl` read during render. Pages match T3 at 1280 and 390 px.
    - Evidence: pull request #19

- [x] **T6 — Meet the size limits**
  - Refs: spec 6.6.2, spec 6.2.5, plan 3.5 (syntax highlighting, images, split pages), plan 7.1 (sizes, Lighthouse), plan 7.2 test 14
  - Depends on: T5
  - Done when:
    - The syntax highlighter uses its light build with the C# grammar only.
    - Each image in `src/assets/` is WebP and at most 200 KB.
    - `scripts/check-size.mjs` reads Vite's build manifest and, for each route, fails when the gzipped JavaScript loaded on first load is over 300 KB, or an image is over 200 KB. It prints each route's total and each image against its limit. `npm run check-size` runs it.
    - `npm run check-size` passes. If that needed lazy routes, Notes says so.
    - A Lighthouse mobile run on Home and the Builder page scores at least 90 for performance, and the scores are in the pull request.
  - Verify: `npm run build && npm run check-size`. Then make one image too large on purpose, run it again, see it fail, and undo the change.
  - Notes:
    - Images converted once with `npx sharp-cli -f webp -q 60 resize 1600`. At 1920 px, `documents.webp` stayed over 200 KB even at quality 50. Release 2 removes them (plan 3.5, images).
    - The highlighter is imported only through `src/components/shared/SyntaxHighlighter.ts`. Lint rejects any other import of `react-syntax-highlighter` in `src/`.
    - No lazy routes were needed. First-load JavaScript is 187.5 KB gzipped (465 KB before). `check-size` does not count a chunk that a lazy route loads lazily.
    - Lighthouse 13.5 mobile: Home 97, Builder 92 (three runs).
    - Evidence: pull request #20

- [x] **T7 — Set up component and end-to-end tests**
  - Refs: plan 7.1, plan 7.2 tests 13 and 20, spec 6.5, spec 6.6.2 item 4, spec 6.6.4 items 1 and 2, plan 3.5 (split pages)
  - Depends on: T6
  - Done when:
    - Vitest, React Testing Library, `user-event` and `jest-dom` are set up, with one test that renders Home. `npm test` runs them.
    - Playwright runs against `npm run preview` in Chromium. `npm run e2e` runs it.
    - Plan 7.2 test 13 exists and passes on every current route: no request to another host, no cookies, and at most 500 KB sent over the network, measured as plan 7.1 says.
    - If the site uses lazy routes, `RouteFallback` shows the loading and failure messages in spec 6.5, and plan 7.2 test 20 passes.
  - Verify: `npm test && npm run build && npm run e2e`
  - Notes:
    - The accessibility tests start in release 2 (plan 7.1).
    - Component tests build their own memory router from the `routes` that `src/app/router.tsx` exports.
    - Test 13 lists the six current addresses itself. T18 adds its new routes to that list. Sent today: Home 233 KB, Versions 282 KB, each docs page 386 KB.
    - No lazy routes (T6), so test 20 and `RouteFallback` are not needed.
    - Evidence: pull request #21

- [x] **T8 — Check every pull request**
  - Refs: spec 6.1.11 items 1 and 2, plan 8 (`ci.yml`, required checks), plan 3.5 (example compilation), plan 6 (pipeline token, third-party actions)
  - Depends on: T7
  - Done when:
    - `.github/workflows/ci.yml` runs on pull requests into `main` and `release/**`, and on pushes to them, with `contents: read` only. Each job that needs Node sets it up from `.nvmrc`.
    - The `build`, `e2e` and `examples` jobs follow plan 8.
    - `examples/build-examples.ps1` exists, runs on Windows PowerShell 5.1 and PowerShell 7, and passes when `examples/` has no `.cs` files.
    - `npm audit` fails the run for pull requests into `main`, and only reports for pull requests into `release/**` and for pushes.
    - The pull request for this task shows the three jobs passing.
    - The maintainer has added `build`, `e2e` and `examples` as required checks to "Protect release branches" only. "Protect main" gets them in T13 (plan 8).
  - Verify: `powershell -File examples/build-examples.ps1` passes locally. `gh pr checks <number>` shows `build`, `e2e` and `examples` passing. `gh api repos/OllieRumbol/JWTValidator/rules/branches/release/phase-1-foundation` lists a `required_status_checks` rule with the three checks.
  - Notes:
    - The `examples` job looks only for `.cs` files. Until T26 adds the compile step, the script fails when it finds one, so no example passes without being compiled.
    - On pull requests into `release/**` and on pushes, a failed `npm audit` is a warning annotation, and the job passes.
    - "Protect release branches" requires `build`, `e2e` and `examples` since 2026-10-26, checked with the `gh api` command in Verify.
    - `npm audit` also reports a moderate `prismjs` chain through `react-syntax-highlighter`. T13 needs a clean audit.
    - Evidence: pull request #22

- [x] **T9 — Deploy with GitHub's Pages actions**
  - Refs: spec 6.1.11 items 3 to 5, plan 3.5 (deployment), plan 8 (`deploy.yml`, Pages source, Pages environment), plan 6 (pipeline token, old secrets)
  - Depends on: T8
  - Done when:
    - `.github/workflows/deploy.yml` runs on pushes to `main` and by `workflow_dispatch`: build, upload the Pages artifact, deploy. Only the deploy job has `pages: write` and `id-token: write`. It sets `concurrency` so one deploy runs at a time, and sets up Node from `.nvmrc`.
    - `.github/workflows/main_deploy.yml`, the `gh-pages` package and the `deploy` and `publish-demo` scripts are removed.
  - Verify: `actionlint` 1.7.12, the binary from the official `rhysd/actionlint` GitHub release, reports no errors on both workflows. The real deploy is checked in T13.
  - Notes:
    - The deploy can only run from `main`, so T13 checks it after the phase 1 merge.
    - The build job runs only for `main`, so a manual run from another branch deploys nothing.
    - `actionlint` 1.7.12 reported no errors on both workflows (run by the maintainer, exit 0).
    - The maintainer deletes the `TOKEN`, `EMAIL` and `USERNAME` secrets and the `gh-pages` branch after the first deploy (plan 6).
    - Evidence: pull request #24

- [x] **T10 — Add page metadata and the security policy**
  - Refs: spec 6.1.9, spec 6.6.4 item 2, spec 6.7 (JavaScript off), plan 3.5 (shared-link preview, content security policy, no JavaScript), plan 2 (site address), plan 3.6 (logo), plan 7.2 tests 12 and 19
  - Depends on: T8
  - Done when:
    - `index.html` has the site description, the Open Graph title, description, image and address, and a `<noscript>` message.
    - `public/og-image.png` is 1200 x 630, shows the approved logo and the site name, and is at most 200 KB.
    - `scripts/csp.ts` adds the content security policy to the built `index.html` only. The policy allows only the site's own origin for scripts, fonts, images and connections, and inline styles.
    - Every current page still works on `npm run preview`, with no policy errors in the browser console, and `npm run dev` still works.
    - Plan 7.2 tests 12 and 19 exist and pass.
  - Verify: `npm run build && npm run e2e`, then open every route on `npm run preview` and on `npm run dev` with the console open.
  - Notes:
    - The image is the light wordmark from `docs/design/logo.html`, scaled about 3.3 times on Surface `#F7F6FB`, rendered once with `npx playwright screenshot` at 1200 x 630 (17.3 KB).
    - The policy tag is first in the built `<head>`. `<meta charset>` follows it, still within the first 1,024 bytes.
    - The real link preview can only be checked on the live site, after the phase 1 deploy (T13).
    - Evidence: pull request #25

- [x] **T11 — Add the README and the licence, and remove stale settings**
  - Refs: spec 6.1.11 items 7 and 8, spec 4.1 item 14, plan 8 (cleanup in release 1), plan 9 (React Compiler packages)
  - Depends on: T9, T10
  - Done when:
    - `README.md` has the sections in spec 6.1.11, item 7. Its "Run it locally" section lists the React Compiler packages that `package.json` has.
    - `LICENSE` holds the MIT licence, and `package.json` says `MIT`.
    - `package.json` has no `main`, `peerDependencies`, `start`, `transpile` or `prepublishOnly`.
  - Verify: `test -f LICENSE && grep -q "MIT License" LICENSE`, then `node -e "const p=require('./package.json'); const bad=['main','peerDependencies'].filter(k=>p[k]).concat(['start','transpile','prepublishOnly'].filter(s=>p.scripts[s])); if(bad.length||p.license!=='MIT'){console.error(bad, p.license); process.exit(1)}"`, then `npm ci && npm run build`.
  - Notes:
    - `LICENSE` is a copy of the library's `LICENSE.txt`, with the same copyright line. `package.json` and the lock file say MIT.
    - `main`, `peerDependencies` and the `start`, `transpile` and `prepublishOnly` scripts were already gone before T11.
    - The README describes the site at the end of release 1, including the checks on `main` from T13. T24 and T26 update it for their phases.
    - Evidence: pull request #26

- [x] **T12 — Record the hash routing decision**
  - Refs: plan 3.5 (ADRs, router), spec 3 non-goals
  - Depends on: T1
  - Done when:
    - `docs/adr/0001-hash-routing-on-github-pages.md` records the context, the decision and the consequences, including that search engines index one page.
  - Verify: The maintainer reads the ADR.
  - Notes:
    - The maintainer read and accepted the ADR on 2026-10-28, after comparing the other options. The two options raised then are in its "Options rejected" table.
    - Checked with `curl`: a `404.html` fallback on GitHub Pages answers 404, and a folder's `index.html` answers 200.
    - Evidence: pull request #27

- [x] **T13 — Release phase 1 (maintainer)**
  - Refs: spec 6.1.10 items 4 to 6, spec 6.1.11 items 2 to 4, spec 6.1.12, spec 6.6.2, spec 6.6.3 item 3, plan 5 (releases), plan 8 (Pages source, Pages environment, required checks), plan 9 (TypeScript, Node), plan 6 (old secrets)
  - Depends on: T2 to T12
  - Done when:
    - The release pull request from `release/phase-1-foundation` into `main` records:
      - `npm audit` clean.
      - Every package at its latest stable version when it was upgraded, or a recorded exception (TypeScript, plan 3.5).
      - Whether `typescript-eslint` now supports TypeScript 7, and whether Node 26 is now the LTS.
      - No deprecation warnings in the build or the browser console.
      - Lighthouse mobile performance at least 90 on Home and the Builder page, and the size check output.
      - The browser check in Chrome, Edge and Firefox, at desktop and phone widths.
    - `gh pr checks` on the release pull request shows `build`, `e2e` and `examples` passing before the merge.
    - Before the merge, the maintainer adds `main` to the `github-pages` environment's deployment branches, and switches the Pages source to "GitHub Actions".
    - After the merge, `deploy.yml` passes and the live site works at every current address.
    - The maintainer adds `build`, `e2e` and `examples` as required checks to "Protect main".
    - The maintainer deletes the `TOKEN`, `EMAIL` and `USERNAME` secrets and the `gh-pages` branch, and removes `gh-pages` from the environment's deployment branches.
  - Verify: `gh run list --workflow deploy.yml --limit 1` shows success. The live site opens at every current address. `gh api repos/OllieRumbol/JWTValidator/rules/branches/main` lists the three checks. `gh api repos/OllieRumbol/JWTValidator/environments/github-pages/deployment-branch-policies` lists `main` only. `gh secret list` prints nothing.
  - Notes:
    - The accessibility targets apply from release 2 (spec 6.1.10, item 6).
    - The maintainer approved an extra step on 2026-10-28: T2 missed `react-syntax-highlighter` 16, and 15 failed `npm audit`. Pull request #28 upgraded it, with the same code-block HTML.
    - The first deploy from `main` was rejected, because the environment did not allow `main` yet. The live site stayed unchanged. The re-run passed once both Pages settings were saved.
    - Lighthouse mobile: Home 96 to 97, Builder 90 to 91. The browser check, the audit and the size check are recorded in pull request #29.
    - Evidence: pull requests #28 and #29

## Phase 2 — Redesign

Goal: The site has the approved design, the new header, menu, footer and docs layout, a changelog, "Page not found", correct scrolling, and meets the accessibility targets. The documentation content is still the 1.0.3 content.

Base branch: release/phase-2-redesign

- [x] **T14 — Create the phase 2 release branch (maintainer)**
  - Refs: plan 8 (branches and releases)
  - Depends on: T13
  - Done when:
    - `release/phase-2-redesign` exists on origin, at the same commit as `main`.
  - Verify: `git ls-remote --heads origin release/phase-2-redesign`
  - Notes:
    - With the maintainer's approval on 2026-10-28, `git push origin main:refs/heads/release/phase-2-redesign` created the branch at `5c8bf23`, the same commit as `main`.
    - "Protect release branches" applies at once: no force-push, pull requests only, and the `build`, `e2e` and `examples` checks.
    - Evidence: pull request #31

- [ ] **T15 — Add the theme, fonts and logo**
  - Refs: plan 3.6 (tokens, breakpoints), plan 3.5 (fonts, reduced motion, favicon), plan 3.1 (`theme.ts`, `Logo`), spec 6.6.4 item 2, spec 6.7 (reduced motion), `docs/design/logo.png`
  - Depends on: T14
  - Done when:
    - `src/app/theme.ts` holds every token in plan 3.6, including the focus ring. Every new component uses only theme colours.
    - IBM Plex Sans and Plex Mono load from the bundled `@fontsource` packages, Latin subset, in the weights in plan 3.6 only.
    - `Logo` draws the three bars and the name, and matches `docs/design/logo.png`. `public/favicon.ico` is made from the logo.
    - A global rule removes transitions and animations when the reader asks for reduced motion.
    - `npm run check-size` and plan 7.2 test 13 still pass.
  - Verify: `npm run build && npm run check-size && npm run e2e`
  - Notes: Plan 7.2 test 18 needs the menu, so T17 adds it. Old components keep their colours until T21 and T22 replace them.

- [ ] **T16 — Add the content data**
  - Refs: plan 3.4 (data model, docs pages), plan 3.1 (`src/content/`), plan 2 (links, latest version), spec 6.1.6, spec 6.2.4, plan 7.2 tests 4 and 5
  - Depends on: T14
  - Done when:
    - `docsPages.ts` lists the docs pages in plan 3.4 that have content in release 2, in reading order: validation options, validator, expiry checker and dictionary extensions.
    - `versions.ts` holds 1.0.3, 1.0.2, 1.0.1 and 1.0.0, with the dates in spec 2 and "2022" for 1.0.0. 1.0.4 and 1.0.5 are gone.
    - `links.ts` holds every external link, including the author's GitHub profile shown in `docs/design/home.png`.
    - Plan 7.2 test 5, and the data part of test 4 for 1.0.0 to 1.0.3, exist and pass.
  - Verify: `npm test`
  - Notes: Release 3 adds the other six docs pages and the 2.0.0 entry.

- [ ] **T17 — Build the header, menu, footer and layout**
  - Refs: spec 6.1.2, spec 6.1.4 item 2, spec 6.1.1 items 4 and 7, spec 6.7 (reduced motion), plan 3.1 (`RootLayout`, `SiteHeader`, `MobileMenu`, `SiteFooter`, `ExternalLink`, `DocsNav`), plan 3.5 (router, UI library), plan 3.6, plan 7.1, plan 7.2 tests 3, 7, 9, 10, 11 and 18, spec 4.1 items 1, 6, 7 and 9, `docs/design/home.png`, `docs/design/phone.png`, `docs/design/states.png`
  - Depends on: T15, T16
  - Done when:
    - The header, the menu and the footer match `docs/design/` at 1280 px and 390 px, including the hover and focus states in `states.png`.
    - `DocsNav` lists the docs pages from `docsPages.ts` in their groups. Below 900 px, the header shows the menu button, and the menu holds every header link and `DocsNav`.
    - `index.html` has the viewport meta tag, in the same change as the menu (spec 6.1.2, item 5).
    - `ScrollRestoration` is in the root layout.
    - The NuGet link reads "NuGet", the GitHub link goes to the library repository, and every link to another site uses `ExternalLink` and opens in the same tab.
    - The version notice from PR #14 stays below the header on every page, with the same wording, styled with the theme's "Changed in 2.0.0" colours. The site still documents 1.0.3 until release 3.
    - Plan 7.2 tests 3, 7 and 18 exist and pass. The rows of test 9 for starting at the top, Back, the phone menu and pressing Escape in the open menu exist and pass.
    - Plan 7.2 tests 10 and 11 exist and pass for the header, the menu and the footer.
  - Verify: `npm test && npm run build && npm run e2e`
  - Notes: Each page joins tests 10 and 11 in the task that rebuilds it (plan 7.1).

- [ ] **T18 — Add the new routes, redirects and "Page not found"**
  - Refs: plan 3.3 (routes), spec 6.1.1 items 1 to 3, 8 and 9, spec 6.2.1, plan 7.2 tests 6, 8, 10 and 11, spec 4.1 item 10, `docs/design/not-found.png`
  - Depends on: T17
  - Done when:
    - The routes in plan 3.3 exist. The four old docs addresses redirect, replacing the history entry. `/docs` redirects to the first page in `docsPages`.
    - "Page not found" matches `docs/design/not-found.png`, has links to Home and the docs, and shows for unknown addresses and unknown docs slugs.
    - Each page sets its tab title (spec 6.1.1, item 9).
    - Plan 7.2 tests 6 and 8, including `#/docs`, exist and pass. "Page not found" is in tests 10 and 11.
  - Verify: `npm test && npm run build && npm run e2e`
  - Notes: Docs slugs that release 3 adds show "Page not found" until then.

- [ ] **T19 — Build the code, tabs and reference components**
  - Refs: spec 6.1.5, spec 6.1.1 item 6, spec 6.1.7 item 2, spec 6.1.3 item 8, plan 3.3 (component contracts), plan 3.5 (syntax highlighting, copy, example tabs and section links), plan 3.6 (code colours, states), plan 4 (clipboard failure), plan 7.2 tests 1, 2, 16 and 17, spec 4.1 item 4, `docs/design/docs-page.png`, `docs/design/states.png`
  - Depends on: T15
  - Done when:
    - `CodeBlock` (C#, XML and shell, with a language label), `CopyButton`, `ExampleTabs`, `ChangedNote`, `SectionHeading` with its copying section link, `ScrollTable`, `MethodReference` and `MethodTable` follow plan 3.3 and match `docs/design/docs-page.png` and `states.png`.
    - Plan 7.2 tests 1, 2, 16 and 17 exist and pass.
  - Verify: `npm test`
  - Notes: The "Returns" label must say "Returns" (spec 4.1, item 6). Sideways scrolling is checked by test 10 when T20 and T21 put these components on real pages. If this task grows past one session, split `ExampleTabs` and `SectionHeading` into their own task.

- [ ] **T20 — Build the docs layout and section addresses**
  - Refs: spec 6.1.4, spec 6.1.1 items 5 and 6, spec 6.2.2, plan 3.1 (`DocsLayout`, `OnThisPage`, `PrevNextLinks`), plan 3.3 (section addresses, history entries), plan 3.6 (breakpoints), plan 4 (unknown section), `docs/design/docs-page.png`, `docs/design/docs-phone.png`
  - Depends on: T18, T19
  - Done when:
    - `DocsLayout` shows `DocsNav` as the sidebar, the article, "On this page", and previous and next links, as in `docs/design/docs-page.png`. Below 900 px the sidebar is hidden, because the menu holds `DocsNav`.
    - Below 1200 px "On this page" is a collapsible box at the top of the article, as in `docs/design/docs-phone.png`.
    - `/docs/:slug/:section` opens the page scrolled to the section. An unknown section opens the page at the top. Links within the page replace the history entry.
    - The rows of plan 7.2 test 9 for section links, shared section links and copying a section link exist and pass.
    - A docs page is in tests 10 and 11.
  - Verify: `npm test && npm run build && npm run e2e`
  - Notes: —

- [ ] **T21 — Move the docs and Versions pages to the new design**
  - Refs: spec 6.1.6, spec 6.1.10 release 2, plan 3.2, plan 7.2 tests 4, 10 and 11, spec 4.1 items 11 and 12, `docs/design/versions.png`
  - Depends on: T20
  - Done when:
    - The four docs pages use `DocsLayout` and the new components, with their current 1.0.3 content. Each page's reference starts with a `MethodTable`.
    - The Versions page is a changelog from `versions.ts`, newest first, with no checkboxes, and matches the layout of `docs/design/versions.png`.
    - The old `src/components/documentation/` and `src/components/versions/` folders and their photos are removed.
    - Plan 7.2 test 4 passes for 1.0.0 to 1.0.3. The four docs pages and Versions are in tests 10 and 11.
  - Verify: `npm test && npm run build && npm run e2e`
  - Notes: Content errors are fixed in release 3, not here (spec 6.1.10). T28 extends test 4 to 2.0.0.

- [ ] **T22 — Move Home to the new design and remove the last photo**
  - Refs: spec 6.1.10 items 1 and 5, spec 6.1.7, plan 3.5 (images), plan 3.6, plan 7.2 tests 10 and 11, `docs/design/home.png`
  - Depends on: T19, T21
  - Done when:
    - Home matches the layout of `docs/design/home.png`, with these differences until release 3:
      - The example shows the current secret example in a `CodeBlock`, without tabs.
      - "Get started" links to the first page in `docsPages`.
      - The "Migrating from 1.x" button and the "Same names. Safer behaviour." section are left out.
    - The author card and "Why I built this" use the current Back Story text.
    - The token diagram in the hero is built from markup, not an image.
    - The last photo in `src/assets/` is deleted, and nothing imports it.
    - Home is in tests 10 and 11.
  - Verify: `npm run build && npm run check-size && npm run e2e`
  - Notes: Release 3 adds the tabs, the migration button and the change table, and rewrites the Home text (T27).

- [ ] **T23 — Meet the accessibility targets on every page**
  - Refs: spec 6.6.1, spec 6.6.3 item 2, spec 6.7, plan 3.6 (theme colours), plan 7.2 tests 10 and 11, spec 4.1 item 11
  - Depends on: T21, T22
  - Done when:
    - Plan 7.2 tests 10 and 11 run on every page at 320 px and 1280 px, and find no violations.
    - No button is inside a link, every list from data has a key from the data, and heading levels follow the page outline.
    - No file in `src/` outside `src/app/theme.ts` holds a colour value.
  - Verify: `npm run build && npm run e2e`, then `grep -rnE "#[0-9A-Fa-f]{6}\b|rgba?\(" src --include=*.ts --include=*.tsx --include=*.css | grep -v "src/app/theme.ts"` prints nothing.
  - Notes: Earlier tasks added each page to the tests as they rebuilt it. This task closes anything left.

- [ ] **T24 — Release phase 2 (maintainer)**
  - Refs: spec 6.1.10 items 4 to 6, spec 6.1.12, spec 6.6.1 items 3 and 4, spec 6.6.2, spec 6.6.3 item 3, spec 6.7 (zoom), plan 5 (releases), plan 9 (TypeScript, Node)
  - Depends on: T15 to T23
  - Done when:
    - The README describes the phase 2 tools: the fonts, the theme and the accessibility tests.
    - The release pull request into `main` records:
      - `npm audit` clean, and any package added in this phase at its latest stable version.
      - Whether `typescript-eslint` now supports TypeScript 7, and whether Node 26 is now the LTS.
      - No deprecation warnings in the build or the browser console.
      - Lighthouse accessibility 100 on Home, the longest docs page, Versions and "Page not found".
      - Lighthouse mobile performance at least 90 on Home and the longest docs page.
      - The keyboard check, and every page at 400 % zoom on a desktop with no sideways scrolling.
      - The browser check in Chrome, Edge and Firefox, at desktop and phone widths.
    - The maintainer approves and merges it, and the deploy passes.
  - Verify: `gh run list --workflow deploy.yml --limit 1` shows success, and the live site matches `docs/design/`, apart from the release 3 parts that T22 leaves out.
  - Notes: —

## Phase 3 — Version 2.0.0 content

Goal: The site documents version 2.0.0, every example compiles against the package, and every page has had its final wording check. It goes live only after 2.0.0 is listed on nuget.org.

Base branch: release/phase-3-content

- [ ] **T25 — Create the phase 3 release branch (maintainer)**
  - Refs: plan 8 (branches and releases)
  - Depends on: T24
  - Done when:
    - `release/phase-3-content` exists on origin, at the same commit as `main`.
  - Verify: `git ls-remote --heads origin release/phase-3-content`
  - Notes: —

- [ ] **T26 — Compile the C# examples in the pipeline**
  - Refs: spec 6.1.3 items 6 to 8, spec 6.1.11 item 7, plan 3.5 (example compilation, ADRs), plan 8 (`examples` job), plan 7.2 test 15
  - Depends on: T25, and `2.0.0-beta.1` listed on nuget.org (library task T15)
  - Done when:
    - `examples/Directory.Build.props` sets the `JWTValidator` version to `2.0.0-beta.1`, and the `Microsoft.Extensions.DependencyInjection` version to its latest stable version.
    - `examples/build-examples.ps1` builds each `.cs` file in its own .NET 10 console project under `examples/.build/`, adds `Microsoft.Extensions.DependencyInjection` for files named `di-*.cs`, and fails when any file does not compile.
    - `CodeBlock` and `ExampleTabs` can show a file from `examples/` through a `?raw` import.
    - The two Home examples, OpenID Connect and secret, exist as files and compile.
    - `docs/adr/0002-compile-documentation-examples.md` records the decision.
    - The README's "Updating the content" section explains how to add an example and how to move to a new library version.
    - The pull request shows the `examples` job passing.
  - Verify: `powershell -File examples/build-examples.ps1` passes locally. Break one example on purpose, see the script fail, and undo the change. `gh pr checks <number>` shows `examples` passing.
  - Notes: —

- [ ] **T27 — Write Getting started and Home**
  - Refs: spec 6.1.3 (Getting started), spec 6.1.7, spec 6.1.8, plan 3.4 (docs pages), plan 7.2 tests 9, 10 and 11, `docs/design/home.png`
  - Depends on: T26, T28
  - Done when:
    - The Getting started page covers its row in spec 6.1.3, with a compiled example. Any project file XML is labelled and not compiled (spec 6.1.3, item 8).
    - Home meets spec 6.1.7 and matches `docs/design/home.png` in full, including the "Migrating from 1.x" button, the "Change / What to do" table and the author card. The personal section is approved by the maintainer.
    - The Home example uses `ExampleTabs` with the compiled OpenID Connect and secret examples from T26, OpenID Connect first.
    - `docsPages.ts` lists Getting started first, so `/docs` now opens it. Getting started is in tests 10 and 11, and the tabs row of test 9 passes.
    - Every fact is checked against the library README.
  - Verify: `npm test && npm run build && npm run e2e`, and the `examples` job passes.
  - Notes: Draft the personal section from the current Back Story and `docs/design/home.html`. T28 comes first because Home links to the migration guide.

- [ ] **T28 — Write the migration guide and the 2.0.0 changelog entry**
  - Refs: spec 6.1.3 (Migration from 1.x), spec 6.1.3 item 6, spec 2 (the six changes and the two other changes), spec 6.1.6 item 4, plan 3.4, plan 7.2 tests 4, 10 and 11, `docs/design/migration-guide.png`
  - Depends on: T26
  - Done when:
    - The migration guide matches `docs/design/migration-guide.png`: a summary table, then one section per change in spec 2 with "Affects you if" and what to do, and 1.0.3 and 2.0.0 code side by side where the code changes.
    - Every C# example, including the 1.0.3 "before" code, is a compiled file in `examples/`. 2.0.0 renames nothing (spec 2), so the "before" code compiles too.
    - `docsPages.ts` lists the migration guide, and it is in tests 10 and 11.
    - `versions.ts` has a 2.0.0 entry with status `Latest`, its changes, its breaking changes and a link to the migration guide. 1.0.3 becomes `Previous`.
    - Plan 7.2 test 4 covers 2.0.0.
    - The publish date of 2.0.0 is a placeholder marked in Notes until 2.0.0 is released.
  - Verify: `npm test && npm run build && npm run e2e`, and the `examples` job passes.
  - Notes: —

- [ ] **T29 — Write Validation options, Validator and Claims**
  - Refs: spec 6.1.3 items 2 to 7 (Validation options, Secret length, Validator, Claims), spec 6.2.3, plan 3.4 (`MethodReference`), plan 7.2 tests 10 and 11, spec 4.1 item 5, `docs/design/docs-page.png`
  - Depends on: T26
  - Done when:
    - The three pages cover their rows in spec 6.1.3, including the secret length table and the 5-minute clock skew.
    - Each page's reference starts with a `MethodTable`, and every public method has a full reference, with "Changed in 2.0.0" where spec 6.1.3, item 4 lists it.
    - Every example is a compiled file in `examples/`.
    - `docsPages.ts` lists Claims. The three pages are in tests 10 and 11, and test 10 checks that the secret length table scrolls inside its box at 320 px (spec 6.2.3).
    - Every fact is checked against the library README and release notes.
  - Verify: `npm test && npm run build && npm run e2e`, and the `examples` job passes.
  - Notes: —

- [ ] **T30 — Write Expiry checker and Dictionary extensions**
  - Refs: spec 6.1.3 items 2 to 7 (Expiry checker, Dictionary extensions), plan 3.4 (`MethodReference`), plan 7.2 tests 10 and 11
  - Depends on: T26
  - Done when:
    - The two pages cover their rows in spec 6.1.3, including UTC times and the results for a `null` or empty dictionary.
    - Each page's reference starts with a `MethodTable`, and every public method has a full reference, with "Changed in 2.0.0" where spec 6.1.3, item 4 lists it.
    - Every example is a compiled file in `examples/`.
    - The two pages are in tests 10 and 11 with their 2.0.0 content.
    - Every fact is checked against the library README and release notes.
  - Verify: `npm test && npm run build && npm run e2e`, and the `examples` job passes.
  - Notes: —

- [ ] **T31 — Write Dependency injection, Debugging and Known limitations**
  - Refs: spec 6.1.3 items 2, 5, 6 and 8, plan 3.4 (docs pages), plan 3.5 (example compilation), plan 7.2 tests 10 and 11
  - Depends on: T26
  - Done when:
    - The three pages cover their rows in spec 6.1.3. Dependency injection documents `IJWTValidator` and the `JWTExpiryChecker(IJWTValidator)` constructor, and does not document `IJWTExpiryChecker`, which is internal.
    - The dependency injection example is `examples/di-*.cs` and compiles with `Microsoft.Extensions.DependencyInjection`.
    - `docsPages.ts` lists these three pages, and all 10 pages are in the order in plan 3.4.
    - The three pages are in tests 10 and 11.
    - Every example is a compiled file in `examples/`.
  - Verify: `npm test && npm run build && npm run e2e`, and the `examples` job passes.
  - Notes: —

- [ ] **T32 — Check the content against 2.0.0**
  - Refs: spec 6.1.3 items 5 and 6, spec 9, plan 3.5 (example compilation)
  - Depends on: T27 to T31, and 2.0.0 listed on nuget.org (library task T16)
  - Done when:
    - `examples/Directory.Build.props` uses version `2.0.0`, and the `examples` job passes.
    - Each docs topic is checked against the README and release notes at tag `v2.0.0`. Differences are fixed.
    - The 2.0.0 changelog date is the real publish date.
  - Verify: `gh pr checks <number>` shows every job passing. The fact check is listed topic by topic in the pull request.
  - Notes: —

- [ ] **T33 — Check spelling, grammar and wording**
  - Refs: spec 6.1.8, spec 6.1.10 item 3, spec 3 goal 9
  - Depends on: T32
  - Done when:
    - Every page has been read for British English spelling, grammar, plain technical English, and the voice rules in spec 6.1.8.
    - The maintainer has reviewed the changes.
    - No other change is merged into the release branch after this task.
  - Verify: The maintainer reads every page on `npm run preview`.
  - Notes: —

- [ ] **T34 — Release phase 3 (maintainer)**
  - Refs: spec 6.1.10 items 2 to 6, spec 6.1.12, spec 9, plan 5 (releases), plan 9 (TypeScript, Node)
  - Depends on: T33
  - Done when:
    - 2.0.0 is listed on nuget.org.
    - The version notice is removed from the site, in the release branch, before the release pull request.
    - The release pull request into `main` records the same checks as T24, including the TypeScript and Node check, plus the spec 9 checklist.
    - The maintainer approves and merges it, and the deploy passes.
  - Verify: `gh run list --workflow deploy.yml --limit 1` shows success. Every item in spec 9 is true on the live site.
  - Notes: Remind the maintainer to do two things in the library repository from the library's own session, because this project does not change that repository (spec 3, non-goals): tick task T17, and remove the README note that says the documentation site still describes 1.0.3. When every task is ticked, suggest `/retrospective`.

---

## Blocked

None.

## Completed log

- 2026-10-26 — T1
- 2026-10-26 — T2
- 2026-10-26 — T3
- 2026-10-26 — T4
- 2026-10-26 — T5
- 2026-10-26 — T6
- 2026-10-26 — T7
- 2026-10-26 — T8
- 2026-10-27 — T9
- 2026-10-27 — T10
- 2026-10-28 — T11
- 2026-10-28 — T12
- 2026-10-28 — T13
- 2026-10-28 — T14

