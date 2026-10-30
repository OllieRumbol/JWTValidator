import type { MethodReference } from "./types";

// The expiry checker's methods. The text is the 1.0.3 site's, unchanged. Each method's
// one parameter sentence is kept whole, named by the signature's parameters. Release 3
// rewrites it for 2.0.0 (plan section 3.2).
export const expiryCheckerMethods: MethodReference[] = [
  {
    name: "HasJWTExpired",
    summary: "This method identifies if a JWT has expired or not",
    signatures: [
      "bool HasJWTExpired(string jwt, string signingKey)",
      "bool HasJWTExpired(string jwt, Uri openIdUrl)",
    ],
    parameters: [
      {
        name: "jwt, signingKey or openIdUrl",
        description:
          "Takes two parameters, a string representing a jwt and either a string (private key) or a Uri (open id url)",
      },
    ],
    returns:
      "Returns true if the jwt has expired and false if it's still valid",
  },
  {
    name: "TryHasJWTExpired",
    summary: "The try-get version of the .HasJWTExpired() method",
    signatures: [
      "bool TryHasJWTExpired(string jwt, string signingKey, out bool isExpired)",
      "bool TryHasJWTExpired(string jwt, Uri openIdUrl, out bool isExpired)",
    ],
    parameters: [
      {
        name: "jwt, signingKey or openIdUrl, isExpired",
        description:
          "As well as the parameters mentioned in .HasJWTExpired(), this method has an out parameter. True if the jwt has expired and false if it's still valid",
      },
    ],
    returns: "Returns a boolean if the method was successful completed or not",
  },
  {
    name: "WhenDoesJWTExpire",
    summary: "This method outputs the extract date and time a JWT expires",
    signatures: [
      "DateTime WhenDoesJWTExpire(string jwt, string signingKey)",
      "DateTime WhenDoesJWTExpire(string jwt, Uri openIdUrl)",
    ],
    parameters: [
      {
        name: "jwt, signingKey or openIdUrl",
        description:
          "Takes two parameters, a string representing a jwt and either a string (private key) or a Uri (open id url)",
      },
    ],
    returns: "Returns a DateTime object of when the JWT expires",
  },
  {
    name: "TryGetWhenDoesJWTExpire",
    summary: "The try-get version of the .WhenDoesJWTExpire() method",
    signatures: [
      "bool TryGetWhenDoesJWTExpire(string jwt, string signingKey, out DateTime expiryDate)",
      "bool TryGetWhenDoesJWTExpire(string jwt, Uri openIdUrl, out DateTime expiryDate)",
    ],
    parameters: [
      {
        name: "jwt, signingKey or openIdUrl, expiryDate",
        description:
          "As well as the parameters mentioned in .WhenDoesJWTExpire(), this method has an out parameter. Expiry date is a DateTime object of when the JWT expires",
      },
    ],
    returns: "Returns a boolean if the method successful completed or not",
  },
];
