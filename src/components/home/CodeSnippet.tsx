import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
          {`string JWT = "eyJhbGciOi.....";

JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();

if (new JWTValidator().TryValidateJWT(JWT, jWTValidatorOptions, out Dictionary<string, List<string>> result) == false)
{
  Console.WriteLine("Invalid JWT");
}

bool hasMemberRole = result.DictionaryContainsKeyAndValue("role", "MEMBER");

DateTime expiryDate = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, "serguhvalhoier.....");`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default CodeSnippet;
