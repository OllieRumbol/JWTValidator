import type { MethodReference } from "./types";

// The options builder's methods, and Print on the options it builds, for 2.0.0. The
// signatures are from the library source at tag v2.0.0. What each method throws was
// checked with a probe against the 2.0.0 package (T29).
export const validationOptionsMethods: MethodReference[] = [
  {
    name: "Create",
    summary: "Starts the builder.",
    signatures: ["public static JWTValidatorOptionsBuilderCreator Create()"],
    parameters: [],
    returns:
      "A JWTValidatorOptionsBuilderCreator. Its only methods choose the signing key.",
    failsWhen: "It does not fail.",
  },
  {
    name: "WithSigningKeyFromSecret",
    summary: "Checks the signature with a secret.",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromSecret(String secret)",
    ],
    parameters: [
      {
        name: "secret",
        description:
          "The secret that signed the token. It must be at least as long as the token's algorithm needs.",
      },
    ],
    returns: "The builder, ready for checks or Build.",
    failsWhen:
      "Throws ArgumentNullException when the secret is null or empty. A secret that is too short does not fail here. Validation fails later.",
    changedIn2:
      "A secret shorter than the minimum for the token's algorithm no longer validates.",
  },
  {
    name: "WithSigningKeyFromOpenIdUrl",
    summary: "Checks the signature with the provider's published keys.",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithSigningKeyFromOpenIdUrl(String openIdUrl)",
    ],
    parameters: [
      {
        name: "openIdUrl",
        description:
          "The address of the provider's OpenID configuration, for example https://accounts.google.com/.well-known/openid-configuration.",
      },
    ],
    returns: "The builder, ready for checks or Build.",
    failsWhen:
      "Throws ArgumentNullException when the address is null or empty. The library downloads the configuration when it validates a token, so a wrong address fails then.",
  },
  {
    name: "WithIssuer",
    summary: "Checks who issued the token.",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithIssuer(String issuer)",
    ],
    parameters: [
      {
        name: "issuer",
        description:
          'The value that the token\'s "iss" claim must have. It takes one value.',
      },
    ],
    returns: "The same builder.",
    failsWhen: "Throws ArgumentNullException when the issuer is null or empty.",
  },
  {
    name: "WithAudience",
    summary: "Checks who the token is for.",
    signatures: [
      "public IJWTValidatorOptionsBuilderFinisher WithAudience(String audience)",
    ],
    parameters: [
      {
        name: "audience",
        description:
          'The value that the token\'s "aud" claim must have, usually your client ID.',
      },
    ],
    returns: "The same builder.",
    failsWhen:
      "Throws ArgumentNullException when the audience is null or empty.",
  },
  {
    name: "WithExpiryDate",
    summary: "Checks that the token has not expired and is already valid.",
    signatures: ["public IJWTValidatorOptionsBuilderFinisher WithExpiryDate()"],
    parameters: [],
    returns: "The same builder.",
    failsWhen:
      'It does not fail. Validation then fails for a token that expired more than 5 minutes ago, that will not be valid for more than 5 minutes, or that has no "exp" claim.',
    changedIn2:
      "A token whose expiry is after 19 January 2038 now validates. Version 1.0.3 rejected it.",
  },
  {
    name: "Build",
    summary: "Returns the finished options.",
    signatures: ["public JWTValidatorOptions Build()"],
    parameters: [],
    returns: "A JWTValidatorOptions object, for the validator.",
    failsWhen: "It does not fail.",
  },
  {
    name: "Print",
    summary: "Returns the options as text, while you debug.",
    signatures: ["public String Print()"],
    parameters: [],
    returns:
      'One line for each option. A text option that is not set shows "None", and the expiry check shows True or False. The text shows the secret, so do not write it to a log.',
    failsWhen: "It does not fail.",
  },
];
