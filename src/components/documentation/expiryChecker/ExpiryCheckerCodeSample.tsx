import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";
import SyntaxHighlighter, { vs2015 } from "../../shared/SyntaxHighlighter";

const ExpiryCheckerCodeSample = () => {
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
