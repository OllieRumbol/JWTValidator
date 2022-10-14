import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
          style={darcula}
          showLineNumbers={true}
          wrapLines={true}
        >
          {`
                String JWT = "eyJhbGciOi.....";

                JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilder
                .Create()
                .WithSigningKeyFromSecret("serguhvalhoier.....")
                .WithExpiryDate()
                .Build();

                if (new JWTValidator().TryValidateJWT(JWT, jWTValidatorOptions, out Dictionary<String, List<String>> result) == false)
                {
                    Console.WriteLine("Invalid JWT");
                }

                Boolean hasMemberRole = result.DictionaryContainsKeyAndValue("role", "MEMBER");
            `}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default CodeSnippet;
