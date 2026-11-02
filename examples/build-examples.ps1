# Compiles each C# example in this folder (plan section 3.5, "Example compilation").
# It runs on Windows PowerShell 5.1 and on PowerShell 7, so it uses only syntax that both support.
$ErrorActionPreference = "Stop"

$examples = @(Get-ChildItem -Path $PSScriptRoot -Filter "*.cs" -File)

if ($examples.Count -eq 0) {
    Write-Host "No examples to compile."
    exit 0
}

# Each example gets its own console project, the same as "dotnet new console", so it
# compiles as it would in a reader's application. Directory.Build.props in this folder
# sets the package versions. The project compiles the example file where it is, so a
# compile error names the file in this folder, not a copy.
$projectTemplate = @"
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="{0}" />
    <PackageReference Include="JWTValidator" Version="`$(JWTValidatorVersion)" />
{1}  </ItemGroup>
</Project>
"@
$dependencyInjectionReference = "    <PackageReference Include=""Microsoft.Extensions.DependencyInjection"" Version=""`$(DependencyInjectionVersion)"" />`n"

$buildRoot = Join-Path $PSScriptRoot ".build"
$failed = @()

foreach ($example in $examples) {
    $name = $example.BaseName
    Write-Host "Compiling $($example.Name)"

    # Start from an empty folder, so no file from an earlier run is compiled.
    $projectFolder = Join-Path $buildRoot $name
    if (Test-Path $projectFolder) {
        Remove-Item -Path $projectFolder -Recurse -Force
    }
    New-Item -Path $projectFolder -ItemType Directory | Out-Null

    $extraReferences = ""
    if ($name.StartsWith("di-")) {
        $extraReferences = $dependencyInjectionReference
    }
    $project = $projectTemplate -f $example.FullName, $extraReferences
    Set-Content -Path (Join-Path $projectFolder "$name.csproj") -Value $project -Encoding UTF8

    dotnet build $projectFolder --nologo --verbosity quiet
    if ($LASTEXITCODE -ne 0) {
        $failed += $example.Name
    }
}

if ($failed.Count -gt 0) {
    Write-Host "These examples do not compile: $($failed -join ', ')"
    exit 1
}

Write-Host "All $($examples.Count) example(s) compile."
exit 0
