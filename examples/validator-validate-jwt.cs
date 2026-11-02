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

try
{
    Dictionary<String, List<String>> claims = new JWTValidator().ValidateJWT(idToken, options);
    Console.WriteLine($"Signed in as {claims["sub"][0]}");
}
catch (Exception exception)
{
    // A failed download is wrapped in an AggregateException.
    // GetBaseException gives the exception inside it, which says why.
    Console.WriteLine(exception.GetBaseException().Message);
}
