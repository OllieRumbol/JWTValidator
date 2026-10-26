import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter, { vs2015 } from "../shared/SyntaxHighlighter";
import "../../style/shared.css";

const CodeSnippet = () => {
  return (
    <Panel colour="#FFFFFF">
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Code Example
      </Typography>
      <Typography>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
          wrapLines={true}
        >
          {`string jwt = "eyJhbGciOi.....";

JWTValidatorOptions jwtValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();

if (new JWTValidator().TryValidateJWT(jwt, jwtValidatorOptions, out Dictionary<string, List<string>> result) == false)
{
  Console.WriteLine("Invalid jwt");
}

bool hasMemberRole = result.DictionaryContainsKeyAndValue("role", "MEMBER");

DateTime expiryDate = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, "serguhvalhoier.....");`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default CodeSnippet;
