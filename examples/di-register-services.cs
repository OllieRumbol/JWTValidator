using JWTValidatorService.Builder;
using JWTValidatorService.Validator;
using Microsoft.Extensions.DependencyInjection;

ServiceCollection services = new ServiceCollection();

// The validator keeps no state between calls, so one instance can serve the whole app.
services.AddSingleton<IJWTValidator, JWTValidator>();
// The container uses the constructor that takes an IJWTValidator.
services.AddSingleton<JWTExpiryChecker>();
services.AddSingleton<TokenService>();

using ServiceProvider provider = services.BuildServiceProvider();

TokenService tokenService = provider.GetRequiredService<TokenService>();
Console.WriteLine(tokenService.Describe(Console.ReadLine() ?? ""));

// A class that gets the validator and the expiry checker from the container.
public class TokenService(IJWTValidator validator, JWTExpiryChecker expiryChecker)
{
    // Read the secret from configuration in a real application. HS256 needs at least 32 bytes.
    private const String Secret = "a-secret-of-at-least-32-bytes-for-hs256";

    public String Describe(String jwt)
    {
        JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
            .Create()
            .WithSigningKeyFromSecret(Secret)
            .WithExpiryDate()
            .Build();

        if (validator.TryValidateJWT(jwt, options, out Dictionary<String, List<String>> claims) == false)
        {
            return "The token is not valid";
        }

        expiryChecker.TryGetWhenDoesJWTExpire(jwt, Secret, out DateTime expiry);
        return $"The token has {claims.Count} claims and expires at {expiry:u}";
    }
}
