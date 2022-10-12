const versions = [
  {
    title: "1.0.0 - Not Longer Listed",
    status: "done",
    description:
      "This is the first version of the JWT Validator library. The main goal I need to achieve with this library is to simplify the process of validating any JWT. I want this libaray to be available on NuGet for other developers to use.",
    tasks: [
      {
        name: "Builder design pattern to config what parts of the JWT need to be validated",
        isComplete: true,
      },
      {
        name: "Try get method to validate a JWT and return a dictionary of claims",
        isComplete: true,
      },
      {
        name: "Dictionary extension methods",
        isComplete: true,
      },
      {
        name: "Unit tests",
        isComplete: true,
      },
      {
        name: "Deploy and release library to NuGet",
        isComplete: true,
      },
    ],
  },
  {
    title: "1.0.1 - Live",
    status: "done",
    description:
      "After the deployment of my first version of the JWT Validator library to the NuGet store, some the external dependences were not building correctly. Getting the project to be installed correctly on any device is the goal of this version.",
    tasks: [
      {
        name: "Combined models project into service project",
        isComplete: true,
      }
    ],
  },
  {
    title: "1.0.2 - Live",
    status: "done",
    description:
      "Now we have a stable platform for releasing the library, we can develop new features. I want to improve the builder design pattern used for configuring what needs validating in the JWT so that the end users (developers) have to give either a url or secret an not both as well as other restrctions.",
    tasks: [
      {
        name: "Create a strict builder so methods have to be used in a specfic order.",
        isComplete: true,
      },
      {
        name: "Create a nested builder so that models can only be made using the builder",
        isComplete: true,
      },
      {
        name: "Project clean up and refactor",
        isComplete: true,
      },
      {
        name: "Unit tests",
        isComplete: true,
      }
    ],
  },
  {
    title: "1.0.3 - Planning",
    status: "in progress",
    description:
      "The project now has proper restrictions in terms of what needs validating in the JWT. I know what to refine the methods used to actually validate JWT and handle exceptions better.",
    tasks: [
      {
        name: "N/A",
        isComplete: false,
      }
    ],
  },
  {
    title: "1.0.4 - Future",
    status: "to do",
    description:
      "Not yet planned",
    tasks: [
      {
        name: "N/A",
        isComplete: false,
      }
    ],
  },
  {
    title: "1.0.5 - Future",
    status: "to do",
    description:
      "Not yet planned",
    tasks: [
      {
        name: "N/A",
        isComplete: false,
      }
    ],
  },
];

export default versions;