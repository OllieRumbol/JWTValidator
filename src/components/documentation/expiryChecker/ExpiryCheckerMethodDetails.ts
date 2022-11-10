const ExpiryCheckerMethodDetails = [
    {
      title: ".HasJWTExpired()",
      summary: "This method identifies if a JWT has expired or not",
      syntax: "bool HasJWTExpired(string jwt, string signingKey)\n\nbool HasJWTExpired(string jwt, Uri openIdUrl)",
      parameters: "Takes two parameters, a string representing a jwt and either a string (private key) or a Uri (open id url)",
      returns: "Returns true if the jwt has expired and false if it's still valid",
    },
    {
      title: ".TryHasJWTExpired()",
      summary: "The try-get version of the .HasJWTExpired() method",
      syntax: "bool TryHasJWTExpired(string jwt, string signingKey, out bool isExpired)\n\nbool TryHasJWTExpired(string jwt, Uri openIdUrl, out bool isExpired)",
      parameters: "As well as the parameters mentioned in .HasJWTExpired(), this method has an out parameter. True if the jwt has expired and false if it's still valid",
      returns: "Returns a boolean if the method was successful completed or not",
    },
    {
      title: ".WhenDoesJWTExpire()",
      summary: "This method outputs the extract date and time a JWT expires",
      syntax: "DateTime WhenDoesJWTExpire(string jwt, string signingKey)\n\nDateTime WhenDoesJWTExpire(string jwt, Uri openIdUrl)",
      parameters: "Takes two parameters, a string representing a jwt and either a string (private key) or a Uri (open id url)",
      returns: "Returns a DateTime object of when the JWT expires ",
    },
    {
      title: ".TryGetWhenDoesJWTExpire()",
      summary: "The try-get version of the .WhenDoesJWTExpire() method",
      syntax: "bool TryGetWhenDoesJWTExpire(string jwt, string signingKey, out DateTime expiryDate)\n\nbool TryGetWhenDoesJWTExpire(string jwt, Uri openIdUrl, out DateTime expiryDate)",
      parameters: "As well as the parameters mentioned in .WhenDoesJWTExpire(), this method has an out parameter. Expiry date is a DateTime object of when the JWT expires",
      returns: "Returns a boolean if the method successful completed or not",
    }
  ];
  
  export default ExpiryCheckerMethodDetails;
  