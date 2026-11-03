import type { MethodReference } from "./types";

// The expiry checker's methods, for 2.0.0. The signatures are from the library source at
// tag v2.0.0. What each method throws was checked with a probe against the 2.0.0 package
// (T30).
const tokenParameter = { name: "jwt", description: "The token, as a string." };

const keyParameters = [
  {
    name: "signingKey",
    description:
      "The secret that signed the token. Used by the String overload.",
  },
  {
    name: "openIdUrl",
    description:
      "The address of the provider's OpenID configuration. Used by the Uri overload.",
  },
];

// The secret overloads validate the token with WithSigningKeyFromSecret, so the minimum
// secret length of 2.0.0 applies to them too.
const shortSecretChange =
  "With the String overloads, a secret shorter than the minimum for the token's algorithm now fails.";

const hasExpiredChange = `The result is correct in every time zone. Version 1.0.3 compared a local time with UTC. ${shortSecretChange}`;

const whenExpiresChange = `The expiry is in UTC, not local time. ${shortSecretChange}`;

// The causes of "Unable to validate JWT", and the failures that both throwing methods share.
const sharedFailures =
  'Throws Exception "Unable to validate JWT" when the signature does not match, the secret is too short, or the download fails. Throws Exception "Jwt does not contain an expiry" when the token has no "exp" claim, and ArgumentOutOfRangeException when its "exp" is after the year 9999. A null openIdUrl throws NullReferenceException.';

export const expiryCheckerMethods: MethodReference[] = [
  {
    name: "HasJWTExpired",
    summary: "Says whether the token has expired.",
    signatures: [
      "public Boolean HasJWTExpired(String jwt, String signingKey)",
      "public Boolean HasJWTExpired(String jwt, Uri openIdUrl)",
    ],
    parameters: [tokenParameter, ...keyParameters],
    returns:
      "True when the expiry is before the current UTC time, otherwise false. There is no clock skew.",
    failsWhen: `Throws ArgumentNullException when the token is null or empty, and ArgumentException when the secret is null or empty. ${sharedFailures}`,
    changedIn2: hasExpiredChange,
  },
  {
    name: "TryHasJWTExpired",
    summary: "Says whether the token has expired. Returns false when it fails.",
    signatures: [
      "public Boolean TryHasJWTExpired(String jwt, String signingKey, out Boolean isExpired)",
      "public Boolean TryHasJWTExpired(String jwt, Uri openIdUrl, out Boolean isExpired)",
    ],
    parameters: [
      tokenParameter,
      ...keyParameters,
      {
        name: "isExpired",
        description:
          "True when the token has expired. False when the method fails.",
      },
    ],
    returns: "True when the check worked, otherwise false.",
    failsWhen:
      "Returns false in every case where HasJWTExpired throws. It does not throw.",
    changedIn2: hasExpiredChange,
  },
  {
    name: "WhenDoesJWTExpire",
    summary: "Gives the time when the token expires, in UTC.",
    signatures: [
      "public DateTime WhenDoesJWTExpire(String jwt, String signingKey)",
      "public DateTime WhenDoesJWTExpire(String jwt, Uri openIdUrl)",
    ],
    parameters: [tokenParameter, ...keyParameters],
    returns:
      'The "exp" time as a DateTime in UTC. An expired token still gives its expiry.',
    failsWhen: `Throws ArgumentException when the token or the secret is null or empty. ${sharedFailures}`,
    changedIn2: whenExpiresChange,
  },
  {
    name: "TryGetWhenDoesJWTExpire",
    summary:
      "Gives the time when the token expires, in UTC. Returns false when it fails.",
    signatures: [
      "public Boolean TryGetWhenDoesJWTExpire(String jwt, String signingKey, out DateTime expiryDate)",
      "public Boolean TryGetWhenDoesJWTExpire(String jwt, Uri openIdUrl, out DateTime expiryDate)",
    ],
    parameters: [
      tokenParameter,
      ...keyParameters,
      {
        name: "expiryDate",
        description:
          "The expiry in UTC. DateTime.MinValue when the method fails.",
      },
    ],
    returns: "True when the expiry was found, otherwise false.",
    failsWhen:
      "Returns false in every case where WhenDoesJWTExpire throws. It does not throw.",
    changedIn2: whenExpiresChange,
  },
];
