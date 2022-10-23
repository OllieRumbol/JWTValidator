import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const DictionaryExtensionCodeSample = () => {
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
          {`Dictionary<String, List<String>> result ...

Boolean hasMemberRole = result.ContainsKeyAndValue("role", "MEMBER");`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={darcula}
          showLineNumbers={true}
        >
          {`Dictionary<String, List<String>> result ...

Boolean hasMemberRole = result.ContainsValueInList("MEMBER");`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default DictionaryExtensionCodeSample;
