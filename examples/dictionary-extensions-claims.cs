using JWTValidatorService.Builder;
using JWTValidatorService.Extensions;
using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

// Read the secret from configuration in a real application. HS256 needs at least 32 bytes.
JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret("a-secret-of-at-least-32-bytes-for-hs256")
    .Build();

// The claims are an empty dictionary when the token is not valid.
new JWTValidator().TryValidateJWT(jwt, options, out Dictionary<String, List<String>> claims);

if (claims.IsEmpty())
{
    Console.WriteLine("No claims");
    return;
}

Console.WriteLine(claims.Print());

Boolean isMember = claims.ContainsKeyAndValue("roles", "member");
Boolean mentionsAdmin = claims.ContainsValueInList("admin");

Console.WriteLine($"Member: {isMember}. Admin anywhere: {mentionsAdmin}.");
