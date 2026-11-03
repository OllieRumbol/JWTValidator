using JWTValidatorService.Builder;
using JWTValidatorService.Validator;
using Microsoft.IdentityModel.Logging;

// Turn these on only while you debug. Personal data in messages must not reach your logs.
IdentityModelEventSource.ShowPII = true;
// Also shows the token itself in messages.
IdentityModelEventSource.LogCompleteSecurityArtifact = true;

String jwt = Console.ReadLine() ?? "";

JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret("a-secret-of-at-least-32-bytes-for-hs256")
    .WithExpiryDate()
    .Build();

try
{
    new JWTValidator().ValidateJWT(jwt, options);
    Console.WriteLine("The token is valid");
}
catch (Exception exception)
{
    // The message says why the token is not valid.
    Console.WriteLine(exception.GetBaseException().Message);
}
