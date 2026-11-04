using JWTValidatorService.Builder;
using JWTValidatorService.Extensions;
using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

// Read the secret from configuration in a real application. HS256 needs at least 32 bytes.
String secret = "a-secret-of-at-least-32-bytes-for-hs256";

JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret(secret)
    .WithExpiryDate()
    .Build();

if (new JWTValidator().TryValidateJWT(jwt, options, out Dictionary<String, List<String>> claims))
{
    Console.WriteLine(claims.Print());
}
