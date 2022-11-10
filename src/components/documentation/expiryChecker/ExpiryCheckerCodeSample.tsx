import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ExpiryCheckerCodeSample = () => {
  return (
    <Panel colour="#FFFFFF">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Code Samples
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`string jwt = "....";

bool result = new JWTExpiryChecker().HasJWTExpired(jwt, "serguhvalhoier.....");

if(new JWTExpiryChecker().TryHasJWTExpired(jwt, "serguhvalhoier.....", out bool isExpired))
{
    ...
}
...`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`string jwt = "....";

DateTime result = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, "serguhvalhoier.....");

if(new JWTExpiryChecker().TryGetWhenDoesJWTExpire(jwt, "serguhvalhoier.....", out DateTime expiryDate))
{
    ...
}
...`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default ExpiryCheckerCodeSample;
