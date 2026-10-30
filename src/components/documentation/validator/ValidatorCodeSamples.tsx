import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";
import SyntaxHighlighter, { vs2015 } from "../../shared/SyntaxHighlighter";

const ValidatorCodeSamples = () => {
  return (
    <Panel colour="#FFFFFF">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="code-samples" level={2}>
          Code Samples
        </SectionHeading>
      </Box>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`string JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

if (new JWTValidator().TryValidateJWT(JWT, jWTValidatorOptions, out Dictionary<string, List<string>> result) == false)
{
    Console.WriteLine("Invalid JWT");
    return;
}`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`string JWT = "....";
JWTValidatorOptions jWTValidatorOptions = ...

Dictionary<string, List<string>> result = new JWTValidator().ValidateJWT(JWT, jWTValidatorOptions);
`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default ValidatorCodeSamples;
