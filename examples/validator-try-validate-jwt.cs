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

Console.WriteLine($"The token has {claims.Count} claims");
