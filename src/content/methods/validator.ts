import type { MethodReference } from "./types";

// The validator's methods, for 2.0.0. The signatures are from the library source at tag
// v2.0.0. What each method throws was checked with a probe against the 2.0.0 package
// (T29).
export const validatorMethods: MethodReference[] = [
  {
    name: "ValidateJWT",
    summary:
      "Validates the token and returns its claims. Throws when the token is not valid.",
    signatures: [
      "public Dictionary<String, List<String>> ValidateJWT(String jwt, JWTValidatorOptions options)",
    ],
    parameters: [
      { name: "jwt", description: "The token, as a string." },
      { name: "options", description: "The options from the builder." },
    ],
    returns:
      "The claims, as a dictionary of claim names and their values. Claims shows the shape.",
    failsWhen:
      "Throws ArgumentException when the token is null or empty, or the options have no signing key, and ArgumentNullException when the options are null. Throws an IdentityModel exception when the token is not valid, and an AggregateException when the OpenID configuration cannot be downloaded.",
    changedIn2:
      "The exception messages no longer show personal data, because the library no longer turns it on.",
  },
  {
    name: "TryValidateJWT",
    summary:
      "Validates the token. Returns false, not an exception, when it fails.",
    signatures: [
      "public Boolean TryValidateJWT(String jwt, JWTValidatorOptions options, out Dictionary<String, List<String>> result)",
    ],
    parameters: [
      { name: "jwt", description: "The token, as a string." },
      { name: "options", description: "The options from the builder." },
      {
        name: "result",
        description:
          "The claims when the token is valid. An empty dictionary when it is not.",
      },
    ],
    returns: "True when the token is valid, otherwise false.",
    failsWhen:
      "Returns false in every case where ValidateJWT throws. It does not throw.",
  },
];
