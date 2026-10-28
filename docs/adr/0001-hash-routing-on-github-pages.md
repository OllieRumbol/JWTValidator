# 1. Hash routing on GitHub Pages

Status: Accepted by the maintainer on 2026-10-28

The maintainer chose hash addresses when the plan was written, in October 2026. Plan section 3.5 records the choice. This record explains why, and what it costs.

## Context

- The site is served by GitHub Pages at https://ollierumbol.github.io/JWTValidator/ (spec section 5.1). The address must not change, because the package page on nuget.org links to it (spec section 5.2).
- GitHub Pages serves static files only. It returns a file only when one exists at the requested path, and it has no rewrite rules. For example, `https://ollierumbol.github.io/JWTValidator/versions` returns 404.
- The browser does not send the part of an address after `#` to the server. So every address that starts with `#/` loads `index.html`, and the app shows the right page.
- The site has used hash addresses since 2022, for example `#/documentation/builder`. These addresses are in bookmarks and shared links, and they must keep working (spec section 6.2.1).
- The site has no server (spec section 3, non-goals).

## Decision

The site keeps the page address after the `#`. It uses React Router's hash router in data mode (`createHashRouter` in `src/app/router.tsx`).

A link to a section of a page cannot use a normal `#anchor`, because the hash already holds the page address. The section is a second path segment instead, for example `#/docs/validation-options/minimum-secret-length` (plan section 3.3).

### Options rejected

| Option | Why it was rejected |
| --- | --- |
| Normal addresses, with `index.html` copied to `404.html` | GitHub Pages serves `404.html` for any unknown path, so the app loads. But every such response has the HTTP status 404 (checked on 2026-10-28 against a site that uses this method). Search engines and link previews then treat each page as missing. The old `#/` addresses still need redirects in the app. |
| Normal addresses, with a `404.html` that redirects to `index.html` and passes the path in the query | The first response for every page still has the status 404, and the reader sees a redirect. The old `#/` addresses still need redirects in the app. |
| Normal addresses, with a copy of `index.html` in a folder for each page, for example `versions/index.html` | GitHub Pages serves a folder's `index.html` with the status 200, so each page would have a real address. But spec section 6.2.1 and plan section 3.3 define every address with `#/`, and spec section 3 accepts that search engines index one page. Every new page would need its folder added to the build, and each copy would have the same preview tags. The old `#/` addresses still need redirects in the app. |
| Pre-rendering one HTML file for each page | Search engines could index each page. But it adds a build step and a tool to keep up to date, for 10 pages that most readers reach from nuget.org or GitHub. The old `#/` addresses still need redirects in the app. |

## Consequences

- Every address works when it is opened, reloaded or shared. No server setting and no `404.html` copy is needed.
- The old addresses keep working. From release 2, the router redirects each one to its new page, and these redirects stay for good (plan section 3.3).
- **Search engines index the site as one page.** The server only ever returns `index.html`, whatever comes after the `#`. This is accepted as a non-goal (spec section 3), because most readers arrive from nuget.org or GitHub.
- The site has one description and one set of link-preview tags, in `index.html`. Pages cannot have their own (spec section 6.1.9).
- Section links use a path segment, not `#anchor`, so the browser does not scroll to the section by itself. The site must do it (plan section 3.1, `useScrollToSection`). React Router's `ScrollRestoration` restores the position on Back (plan section 3.5).
- The server answers 200 for every `#/` address, including one that matches no page, such as `#/versionsabc`. The app shows "Page not found" from release 2, but search engines and link checkers never see a 404.
- Every address has `#/` in it, which is less tidy than a normal address.
- To move to normal addresses later, the site would need a host with rewrite rules, or pre-rendering, and a redirect from every `#/` address. That change needs a new decision record that replaces this one.
