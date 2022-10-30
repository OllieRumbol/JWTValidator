const builderMethods = [
  {
    title: ".Create()",
    summary:
      "The create method is the only way to create a new instance of the builder class. This method call can only be followed with either .WithSigningKeyFromSecret() or .WithSigningKeyFromOpenIdUrl() thus forcing the developer to add a signing key.",
    syntax: "public static JWTValidatorOptionsBuilderCreator Create() => new JWTValidatorOptionsBuilderCreator();",
    parameters: "There are no parameters for this method.",
    returns:
      "Returns an instance of the IJWTValidatorOptionsBuilderCreator class.",
  },
  {
    title: ".WithSigningKeyFromSecret()",
    summary: "Adds the private signing key to the JWTValidatorOptions model ready for validation",
    syntax: "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromSecret(string secret)",
    parameters: "Takes only one parameter of type string containing the private signing key of the JWT",
    returns: "Returns a new instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    title: ".WithSigningKeyFromOpenIdUrl()",
    summary: "Adds the public signing keys from the Open-Id standard url to the JWTValidatorOptions model ready for validation",
    syntax: "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromOpenIdUrl(string openIdUrl)",
    parameters: "Takes only one parameter of type string containing the url of the public signing keys",
    returns: "Returns a new instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    title: ".WithAudience()",
    summary: "Adds audience to model",
    syntax: "public IJWTValidatorOptionsBuilderFinisher WithAudience(string audience)",
    parameters: "Takes only one parameter of type string containing the audience of the JWT",
    returns: "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    title: ".WithIssuer()",
    summary: "Adds issuer to model",
    syntax: "public IJWTValidatorOptionsBuilderFinisher WithIssuer(string issuer)",
    parameters: "Takes only one parameter of type string containing the isser of the JWT",
    returns: "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    title: ".WithExpiryDate()",
    summary: "During the validation process the JWT expiry date will be validated",
    syntax: "public IJWTValidatorOptionsBuilderFinisher WithExpiryDate()",
    parameters: "No parameters are required",
    returns: "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    title: ".Build()",
    summary: "Once the developer is happy with which properties of a JWT are being validated the JWTValidatorOptions class can be returned",
    syntax: "public JWTValidatorOptions Build()",
    parameters: "No parameters are required",
    returns: "Returns a complete JWTValidatorOptions model",
  }
];

export default builderMethods;
