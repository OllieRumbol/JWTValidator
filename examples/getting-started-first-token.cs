using JWTValidatorService.Builder;
using JWTValidatorService.Validator;

Console.WriteLine("Enter the ID token");
String idToken = Console.ReadLine() ?? "";

// Use your own client ID as the audience.
JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromOpenIdUrl("https://accounts.google.com/.well-known/openid-configuration")
    .WithIssuer("https://accounts.google.com")
    .WithAudience("your-client-id.apps.googleusercontent.com")
    .WithExpiryDate()
    .Build();

if (new JWTValidator().TryValidateJWT(idToken, options, out Dictionary<String, List<String>> claims) == false)
{
    Console.WriteLine("The token is not valid");
    return;
}

Console.WriteLine($"Signed in as {claims["sub"][0]}");
