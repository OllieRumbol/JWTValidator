using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";
String secret = "a-secret-of-at-least-32-bytes-for-hs256";

JWTExpiryChecker checker = new JWTExpiryChecker();
DateTime expiry = checker.WhenDoesJWTExpire(jwt, secret); // UTC in 2.0.0
DateTime local = expiry.ToLocalTime();

Console.WriteLine($"Expires at {local}");
