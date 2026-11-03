import type { MethodReference } from "./types";

// The expiry checker's constructors, for the Dependency injection page. The signatures
// are from the library source at tag v2.0.0. The container's choice and the null
// validator were checked with a probe against the 2.0.0 package (T31).
export const expiryCheckerConstructors: MethodReference = {
  name: "JWTExpiryChecker",
  summary:
    "Creates an expiry checker. When IJWTValidator is registered, a dependency injection container uses the constructor that takes it. Otherwise it uses the constructor without parameters.",
  signatures: [
    "public JWTExpiryChecker()",
    "public JWTExpiryChecker(IJWTValidator jwtValidator)",
  ],
  parameters: [
    {
      name: "jwtValidator",
      description:
        "The validator that the checker uses to check the token. The constructor without it creates its own JWTValidator.",
    },
  ],
  returns: "A new expiry checker.",
  failsWhen:
    "It does not fail. A null jwtValidator is not checked: WhenDoesJWTExpire and HasJWTExpired then throw NullReferenceException, and the Try methods return false.",
};
