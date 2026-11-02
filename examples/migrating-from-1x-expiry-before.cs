using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";
String secret = "a-secret-of-at-least-32-bytes-for-hs256";

JWTExpiryChecker checker = new JWTExpiryChecker();
DateTime expiry = checker.WhenDoesJWTExpire(jwt, secret); // Local time in 1.0.3

Console.WriteLine($"Expires at {expiry}");
