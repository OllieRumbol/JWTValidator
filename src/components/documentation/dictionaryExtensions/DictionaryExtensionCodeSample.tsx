import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const DictionaryExtensionCodeSample = () => {
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
          {`Dictionary<string, List<string>> result ...
          
Console.WriteLine(result.Print());`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`Dictionary<string, List<string>> result ...

bool hasMemberRole = result.ContainsKeyAndValue("role", "MEMBER");`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`Dictionary<string, List<string>> result ...

bool hasMemberRole = result.ContainsValueInList("MEMBER");`}
        </SyntaxHighlighter>
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`Dictionary<string, List<string>> dictionary = ...

if (dictionary.IsEmpty())
{
  ...
}

...`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default DictionaryExtensionCodeSample;
