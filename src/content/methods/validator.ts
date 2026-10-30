import type { MethodReference } from "./types";

// The validator's methods. The text is the 1.0.3 site's, unchanged. Each method's one
// parameter sentence is kept whole, named by the signature's parameters. Release 3
// rewrites it for 2.0.0 (plan section 3.2).
export const validatorMethods: MethodReference[] = [
  {
    name: "ValidateJWT",
    summary:
      "This is the main method of this libaray and is actually used to validate a JWT. The method converts the JWTValidatorOptions model into C#s TokenValidationParameters class. The JwtSecurityTokenHandler class is actually used to validate the JWT. Finally the complicated ClaimsPrincipal class is converted into a dictionary of claims ready for extraction later on.",
    signatures: [
      "public Dictionary<string, List<string>> ValidateJWT(string jwt, JWTValidatorOptions options)",
    ],
    parameters: [
      {
        name: "jwt, options",
        description:
          "This method takes two parameters, a string containing a JWT and a JWTValidatorOptions object",
      },
    ],
    returns:
      "To help make validation easier this method outputs a dictionary of claims. The key is a string and the value is a list of strings",
  },
  {
    name: "TryValidateJWT",
    summary:
      "The .TryValidateJWT() method is very similar to the .ValidateJWT() method. However, it makes use of the TryGet pattern to help better deal with exceptions and create a better technical flow for developers.",
    signatures: [
      "public bool TryValidateJWT(string jwt, JWTValidatorOptions options, out Dictionary<string, List<string>> result)",
    ],
    parameters: [
      {
        name: "jwt, options, result",
        description:
          "This method takes two parameters, a string containing a JWT and a JWTValidatorOptions object. There is an out parameter containing a dictionary of claims",
      },
    ],
    returns:
      "The method returns a boolan identifying if the validation process of the JWT was successful or not",
  },
];
