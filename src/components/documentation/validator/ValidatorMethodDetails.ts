const ValidatorMethodDetails = [
  {
    title: ".ValidateJWT()",
    summary:
      "This is the main method of this libaray and is actually used to validate a JWT. The method converts the JWTValidatorOptions model into C#s TokenValidationParameters class. The JwtSecurityTokenHandler class is actually used to validate the JWT. Finally the complicated ClaimsPrincipal class is converted into a dictionary of claims ready for extraction later on.",
    syntax:
      "public Dictionary<string, List<string>> ValidateJWT(string jwt, JWTValidatorOptions options)",
    parameters:
      "This method takes two parameters, a string containing a JWT and a JWTValidatorOptions object",
    returns:
      "To help make validation easier this method outputs a dictionary of claims. The key is a string and the value is a list of strings",
  },
  {
    title: ".TryValidateJWT()",
    summary: "The .TryValidateJWT() method is very similar to the .ValidateJWT() method. However, it makes use of the TryGet pattern to help better deal with exceptions and create a better technical flow for developers.",
    syntax:
      "public bool TryValidateJWT(string jwt, JWTValidatorOptions options, out Dictionary<string, List<string>> result)",
    parameters:
      "This method takes two parameters, a string containing a JWT and a JWTValidatorOptions object. There is an out parameter containing a dictionary of claims",
    returns:
      "The method returns a boolan identifying if the validation process of the JWT was successful or not",
  },
];

export default ValidatorMethodDetails;
