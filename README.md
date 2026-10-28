# JWT Validator documentation site

This repository holds the documentation site for `JWTValidator`, a .NET library that validates JSON Web Tokens.

- Live site: https://ollierumbol.github.io/JWTValidator/
- Library repository: https://github.com/OllieRumbol/ID_Token-JWT_Validator
- NuGet package: https://www.nuget.org/packages/JWTValidator

## Which repository to use

| You want to                                                     | Use                                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Change or report a problem with the library's code or behaviour | The [library repository](https://github.com/OllieRumbol/ID_Token-JWT_Validator) |
| Change or report a problem with the documentation site          | This repository                                                                 |
| Install the library                                             | The [NuGet package](https://www.nuget.org/packages/JWTValidator)                |

The package page on nuget.org links to the live site, so the site address must not change.

## Technology

- [Vite](https://vite.dev/) 8 builds the site.
- [React](https://react.dev/) 19, with the [React Compiler](https://react.dev/learn/react-compiler).
- [TypeScript](https://www.typescriptlang.org/) 6.0. Version 7 is out, but `typescript-eslint` does not support it yet.
- [MUI](https://mui.com/) 9, styled with Emotion.
- [React Router](https://reactrouter.com/) 8, with a hash router. GitHub Pages serves only files, so the page address is kept after the `#`.
- `react-syntax-highlighter`, with only the C# grammar loaded.
- [Vitest](https://vitest.dev/) and React Testing Library for component tests. [Playwright](https://playwright.dev/) for end-to-end tests.
- ESLint, `typescript-eslint` and Prettier.
- GitHub Actions checks every pull request and deploys to GitHub Pages.

## Run it locally

You need Node.js 24, the version in `.nvmrc`.

1. Install the packages:

   ```bash
   npm ci
   ```

2. Start the development server, then open http://localhost:5173/JWTValidator/:

   ```bash
   npm run dev
   ```

The React Compiler runs through Babel. It needs these three packages, which `npm ci` installs:

- `babel-plugin-react-compiler`
- `@babel/core`
- `@rolldown/plugin-babel`

### Checks

These are the checks that run on every pull request:

| Command                                        | What it does                                                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`                            | Type checks the site, the tests and the scripts                                                                            |
| `npm run lint`                                 | Runs ESLint. Any warning fails.                                                                                            |
| `npm run format:check`                         | Checks the formatting. `npm run format` fixes it.                                                                          |
| `npm test`                                     | Runs the component tests                                                                                                   |
| `npm run build`                                | Builds the site into `dist/`                                                                                               |
| `npm run check-size`                           | Checks the size limits on `dist/`. Run it after a build.                                                                   |
| `npm run e2e`                                  | Serves `dist/` with `npm run preview` and runs the end-to-end tests in Chromium. Build first.                              |
| `powershell -File examples/build-examples.ps1` | Checks the C# examples in `examples/`. There are none yet, so it passes.                                                   |
| `npm audit`                                    | Reports known vulnerabilities in the packages. It fails a pull request into `main`, and only warns on other pull requests. |

Before the first `npm run e2e`, install Chromium for Playwright:

```bash
npx playwright install chromium
```

To see the built site, run `npm run build`, then `npm run preview`, and open http://localhost:4173/JWTValidator/.

## Folder structure

```
.github/workflows/   ci.yml checks every pull request. deploy.yml deploys main.
docs/                The specification, plan and tasks, and the approved design
e2e/                 End-to-end tests (Playwright)
examples/            The script that checks the C# examples, which come later
public/              Files copied to the site as they are: favicon and share image
scripts/             The size check, and the Vite plugin that adds the security policy
src/
  app/               The routes and the layout around every page
  assets/            Images that the build hashes
  components/        One folder per page, and shared components
  style/             CSS
  test/              Set-up for the component tests
index.html           The page shell: title, description, share tags and noscript message
```

## Updating the content for a new library version

The site follows the library's README and release notes for the version it documents. Today the content is in the page components:

1. Update each documentation page in `src/components/documentation/<part>/`. The introduction, the method details and the code examples are separate files.
2. Add the version to `src/components/versions/Versions.ts`.
3. Update what is new on Home in `src/components/home/NewRelease.tsx`.
4. Run the checks, and open a pull request.

This section changes when the content moves to its own data files and the C# examples are compiled.

## Branches and releases

- `main` is the live site. Every push to `main` deploys it.
- Each release has its own branch from `main`, for example `release/phase-1-foundation`.
- Each task is a branch named `task/<id>-<short-name>` from its release branch. Its pull request merges into the release branch.
- When the maintainer approves a release, one pull request merges the release branch into `main`.
- A small fix outside a release is a branch named `fix/<short-name>` from `main`.
- Changes to the planning documents in `docs/` go into `main` by pull request. Then `main` is merged into the open release branch.

`main` and `release/*` are protected. They cannot be force-pushed, and every change needs a pull request. A pull request into a release branch merges only when the `build`, `e2e` and `examples` checks pass. From the end of release 1, the same is true for `main`.

## Deployment

`.github/workflows/deploy.yml` deploys the site with GitHub's Pages actions:

1. It runs on every push to `main`. You can also run it by hand from the Actions tab, to deploy `main` again.
2. It builds the site and uploads `dist/` as the Pages artifact.
3. It deploys the artifact. If any step fails, the live site does not change.

Only one deployment runs at a time. The workflow uses the built-in token, and no secrets.

To roll back, revert the change in a pull request into `main`. The merge deploys the reverted site.

## Licence

[MIT](LICENSE), the same licence as the library.
