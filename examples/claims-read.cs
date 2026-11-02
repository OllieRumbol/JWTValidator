using JWTValidatorService.Builder;
using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

// Read the secret from configuration in a real application. HS256 needs at least 32 bytes.
JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret("a-secret-of-at-least-32-bytes-for-hs256")
    .WithExpiryDate()
    .Build();

if (new JWTValidator().TryValidateJWT(jwt, options, out Dictionary<String, List<String>> claims) == false)
{
    Console.WriteLine("The token is not valid");
    return;
}

// A claim that is not in the token is not in the dictionary.
if (claims.TryGetValue("email", out List<String>? email))
{
    Console.WriteLine($"Email: {email[0]}");
}

// An array claim holds one string for each item.
foreach (String role in claims.GetValueOrDefault("roles", []))
{
    Console.WriteLine($"Role: {role}");
}

// The times are Unix seconds, as text. WithExpiryDate rejects a token without "exp".
DateTimeOffset expiry = DateTimeOffset.FromUnixTimeSeconds(Int64.Parse(claims["exp"][0]));
Console.WriteLine($"Expires at {expiry:u}");
