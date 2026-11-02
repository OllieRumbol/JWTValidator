using JWTValidatorService.Builder;
using JWTValidatorService.Validator;

String jwt = Console.ReadLine() ?? "";

JWTValidatorOptions options = JWTValidatorOptionsBuilderCreator
    .Create()
    .WithSigningKeyFromSecret("my-short-secret-key") // 19 bytes: validated in 1.0.3
    .WithExpiryDate()
    .Build();

Boolean isValid = new JWTValidator().TryValidateJWT(jwt, options, out _);
Console.WriteLine(isValid);
