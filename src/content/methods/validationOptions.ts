import type { MethodReference } from "./types";

// The options builder's methods. The text is the 1.0.3 site's, unchanged. Each method's
// one parameter sentence is kept whole, named by the signature's parameters. Release 3
// rewrites it for 2.0.0 (plan section 3.2).
export const validationOptionsMethods: MethodReference[] = [
  {
    name: "Create",
    summary:
      "The create method is the only way to create a new instance of the builder class. This method call can only be followed with either .WithSigningKeyFromSecret() or .WithSigningKeyFromOpenIdUrl() thus forcing the developer to add a signing key.",
    signatures: [
      "public static JWTValidatorOptionsBuilderCreator Create() => new JWTValidatorOptionsBuilderCreator();",
    ],
    parameters: [],
    returns:
      "Returns an instance of the IJWTValidatorOptionsBuilderCreator class.",
  },
  {
    name: "WithSigningKeyFromSecret",
    summary:
      "Adds the private signing key to the JWTValidatorOptions model ready for validation",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromSecret(string secret)",
    ],
    parameters: [
      {
        name: "secret",
        description:
          "Takes only one parameter of type string containing the private signing key of the JWT",
      },
    ],
    returns:
      "Returns a new instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    name: "WithSigningKeyFromOpenIdUrl",
    summary:
      "Adds the public signing keys from the Open-Id standard url to the JWTValidatorOptions model ready for validation",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromOpenIdUrl(string openIdUrl)",
    ],
    parameters: [
      {
        name: "openIdUrl",
        description:
          "Takes only one parameter of type string containing the url of the public signing keys",
      },
    ],
    returns:
      "Returns a new instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    name: "WithAudience",
    summary: "Adds audience to model",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithAudience(string audience)",
    ],
    parameters: [
      {
        name: "audience",
        description:
          "Takes only one parameter of type string containing the audience of the JWT",
      },
    ],
    returns:
      "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    name: "WithIssuer",
    summary: "Adds issuer to model",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithIssuer(string issuer)",
    ],
    parameters: [
      {
        name: "issuer",
        description:
          "Takes only one parameter of type string containing the isser of the JWT",
      },
    ],
    returns:
      "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    name: "WithExpiryDate",
    summary:
      "During the validation process the JWT expiry date will be validated",
    signatures: ["public IJWTValidatorOptionsBuilderFinisher WithExpiryDate()"],
    parameters: [],
    returns:
      "Returns the current instance of IJWTValidatorOptionsBuilderFinisher class",
  },
  {
    name: "Build",
    summary:
      "Once the developer is happy with which properties of a JWT are being validated the JWTValidatorOptions class can be returned",
    signatures: ["public JWTValidatorOptions Build()"],
    parameters: [],
    returns: "Returns a complete JWTValidatorOptions model",
  },
];
