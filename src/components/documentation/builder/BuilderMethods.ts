const builderMethods = [
  {
    title: ".Create()",
    summary:
      "The create method is the only way to create a new instance of the builder class. This method call can only be followed with either .WithSigningKeyFromSecret() or .WithSigningKeyFromOpenIdUrl() thus forcing the developer to add a signing key.",
    parameters: "There are no parameters for this method.",
    returns:
      "Returns an instance of the JWTValidatorOptionsBuilderCreator class.",
  },
];

export default builderMethods;
