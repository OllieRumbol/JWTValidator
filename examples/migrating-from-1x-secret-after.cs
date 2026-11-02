using JWTValidatorService.Builder;
using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

// At least 32 bytes for HS256. Read it from configuration in a real application.
String secret = "a-secret-of-at-least-32-bytes-for-hs256";

JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret(secret)
    .WithExpiryDate()
    .Build();

Boolean isValid = new JWTValidator().TryValidateJWT(jwt, options, out _);
Console.WriteLine(isValid);
