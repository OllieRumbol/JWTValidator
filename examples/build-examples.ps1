# Compiles each C# example in this folder (plan section 3.5, "Example compilation").
# It runs on Windows PowerShell 5.1 and on PowerShell 7, so it uses only syntax that both support.
$ErrorActionPreference = "Stop"

$examples = @(Get-ChildItem -Path $PSScriptRoot -Filter "*.cs" -File)

if ($examples.Count -eq 0) {
    Write-Host "No examples to compile."
    exit 0
}

# T26 in docs/tasks.md adds the compile step. Until then, an example fails the run
# rather than passing without being compiled.
Write-Host "Found $($examples.Count) example(s), but compiling them is not set up yet (T26 in docs/tasks.md)."
exit 1
