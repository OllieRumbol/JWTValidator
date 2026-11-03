using JWTValidatorService.Validator;

String idToken = Console.ReadLine() ?? "";

Uri openIdUrl = new Uri("https://accounts.google.com/.well-known/openid-configuration");

if (new JWTExpiryChecker().TryHasJWTExpired(idToken, openIdUrl, out Boolean isExpired) == false)
{
    Console.WriteLine("The token is not valid, or has no expiry");
    return;
}

Console.WriteLine(isExpired ? "The token has expired" : "The token has not expired");
