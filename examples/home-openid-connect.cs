using JWTValidatorService.Builder;
using JWTValidatorService.Validator;

String idToken = Console.ReadLine() ?? "";

JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromOpenIdUrl("https://accounts.google.com/.well-known/openid-configuration")
    .WithIssuer("https://accounts.google.com")
    .WithAudience("your-client-id.apps.googleusercontent.com")
    .WithExpiryDate()
    .Build();

if (new JWTValidator().TryValidateJWT(idToken, options, out Dictionary<String, List<String>> claims))
{
    Console.WriteLine($"Signed in as {claims["sub"][0]}");
}
