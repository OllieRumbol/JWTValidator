using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

// Read the secret from configuration in a real application. HS256 needs at least 32 bytes.
String secret = "a-secret-of-at-least-32-bytes-for-hs256";

JWTExpiryChecker checker = new JWTExpiryChecker();

if (checker.TryGetWhenDoesJWTExpire(jwt, secret, out DateTime expiry) == false)
{
    Console.WriteLine("The token is not valid, or has no expiry");
    return;
}

// The expiry is in UTC.
Console.WriteLine($"Expires at {expiry:u}");
Console.WriteLine($"Expires at {expiry.ToLocalTime()} local time");
