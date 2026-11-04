# 2. Compile the documentation examples

Status: Accepted when the maintainer merges the T26 pull request

Plan section 3.5 ("Example compilation") records the choice. This record explains why, and what it costs.

## Context

- Before this site was rebuilt, most of its C# examples were fragments with `...` in place of code, so they could not compile. Every example used a 19-character secret, which fails in 2.0.0 (spec section 4.1, item 5).
- Spec section 6.1.3, item 6 requires every C# example to compile in a .NET 10 console application with the package installed. Before 2.0.0 was released, a pre-release was enough. After the release, the examples must compile against 2.0.0.
- Spec section 6.1.3, item 7 requires every secret to be long enough for its algorithm.
- An example typed into a page as a string is checked only by eye. A library change, or an edit to the page, can break it without any check failing.
- The pipeline already has an `examples` job, which runs `examples/build-examples.ps1` (plan section 8).

## Decision

Every C# example is a file in `examples/`, as a complete console program. The site shows the file's own text, through Vite's `?raw` import. `examples/build-examples.ps1` compiles each file in its own .NET 10 console project under `examples/.build/<name>/`, and fails when any file does not compile. The `examples` check runs it on every pull request.

`examples/Directory.Build.props` holds the package versions as properties:

- `JWTValidatorVersion` is the package version that the site documents. It is `2.0.0`. 2.0.0 was listed on nuget.org on 2026-10-25, before T26 started, so the examples never needed the pre-release.
- `DependencyInjectionVersion` is the version of `Microsoft.Extensions.DependencyInjection`. Only an example whose name starts with `di-` gets this package. Spec section 6.1.3, item 6 allows it for dependency injection examples, and no other package.

The temporary projects match `dotnet new console`: `net10.0`, implicit usings and nullable reference types. So an example compiles as it would in a reader's new application. `examples/.build/` is ignored by git.

The script uses only syntax that runs on both Windows PowerShell 5.1 and PowerShell 7. So the same script runs on a Windows machine without PowerShell 7, and on the pipeline's Linux runner.

### Options rejected

| Option | Why it was rejected |
| --- | --- |
| Examples as strings in the pages, checked by hand | This is how the old examples broke (spec section 4.1, item 5). Nothing fails when the library changes. |
| A project reference to a local clone of the library | The pipeline would need the library repository, and the examples would compile against unreleased code, not the package that readers install. |
| One project that compiles every example together | Each example is a console program with top-level statements, and a project can have only one file with top-level statements. |
| A Bash script and a PowerShell script side by side | Two scripts would have to be kept in step. |

## Consequences

- The code that readers see and copy is the code that the `examples` check compiles.
- A new library version is one change: set `JWTValidatorVersion`, run the script, and fix each example that fails (README, "Updating the content for a new library version").
- Each example compiles on its own, so the check takes a few seconds for each file, and the first run downloads the packages.
- Only C# is compiled. Project file XML and shell commands stay in the pages, labelled with their language (spec section 6.1.3, item 8).
- The check proves that an example compiles, not that it runs or that its text is right. Spec section 6.1.3, item 5 still needs each page checked against the library README and release notes.
- An example cannot use any package other than `JWTValidator`, and `Microsoft.Extensions.DependencyInjection` for a `di-` file. A new package needs a spec change and a change to the script.
