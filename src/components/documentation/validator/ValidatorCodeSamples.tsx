import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ValidatorCodeSamples = () => {
  return (
    <Panel colour="#FFFFFF">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Code Samples
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={darcula}
          showLineNumbers={true}
        >
          {`String JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

if (new JWTValidator().TryValidateJWT(JWT, jWTValidatorOptions, out Dictionary<String, List<String>> result) == false)
{
    Console.WriteLine("Invalid JWT");
    return;
}`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={darcula}
          showLineNumbers={true}
        >
{`String JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

Dictionary<String, List<String>> result = new JWTValidator().ValidateJWT(JWT, jWTValidatorOptions);
`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default ValidatorCodeSamples;
