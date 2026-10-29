// The changelog: released versions only, newest first (spec sections 6.1.6 and 6.2.4).
// The text is the current Versions page's text. Release 3 rewrites it and adds 2.0.0.

export type VersionStatus = "Latest" | "Previous" | "Unlisted";

export type Version = {
  version: string;
  published: string; // A date, or "2022" for 1.0.0 (spec section 6.1.6, item 2)
  status: VersionStatus;
  summary: string;
  changes: string[];
  breakingChanges?: string[]; // 2.0.0 only, with a link to the migration guide
};

export const versions: Version[] = [
  {
    version: "1.0.3",
    published: "8 November 2022",
    status: "Latest",
    summary:
      "The project now has proper restrictions in terms of what properties can be validated in a JWT. The main goal of version 1.0.3 is to identify if and when a JWT has expired. This is important as this should trigger a refresh process.",
    changes: [
      "Create a new class with methods that returns if a JWT has expired and when the JWT expires",
      "Add parameter validation across project",
      "Refactor/ clean up",
      "Unit tests",
    ],
  },
  {
    version: "1.0.2",
    published: "19 September 2022",
    status: "Previous",
    summary:
      "Now we have a stable platform for releasing the library, we can develop new features. I want to improve the builder design pattern used for configuring what needs validating in the JWT so that the end users (developers) have to give either a url or secret an not both as well as other restrctions.",
    changes: [
      "Create a strict builder so methods have to be used in a specfic order.",
      "Create a nested builder so that models can only be made using the builder",
      "Project clean up and refactor",
      "Unit tests",
    ],
  },
  {
    version: "1.0.1",
    published: "10 September 2022",
    status: "Previous",
    summary:
      "After the deployment of my first version of the JWT Validator library to the NuGet store, some of the external dependences were not building correctly. Getting the project to be installed correctly on any device is the goal of this version.",
    changes: ["Combined models project into service project"],
  },
  {
    version: "1.0.0",
    // nuget.org does not show the date of an unlisted version.
    published: "2022",
    status: "Unlisted",
    summary:
      "This is the first version of the JWT Validator library. The main goal I need to achieve with this library is to simplify the process of validating any JWT. I want this libaray to be available on NuGet for other developers to use.",
    changes: [
      "Builder design pattern to config what parts of the JWT need to be validated",
      "Try get method to validate a JWT and return a dictionary of claims",
      "Dictionary extension methods",
      "Unit tests",
      "Deploy and release library to NuGet",
    ],
  },
];

// The footer shows this, so the number is never typed twice (plan section 2).
export const latestVersion = versions[0].version;
