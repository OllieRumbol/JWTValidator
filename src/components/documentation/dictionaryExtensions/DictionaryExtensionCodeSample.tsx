import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";
import SyntaxHighlighter, { vs2015 } from "../../shared/SyntaxHighlighter";

const DictionaryExtensionCodeSample = () => {
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
