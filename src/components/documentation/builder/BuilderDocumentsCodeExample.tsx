import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import SyntaxHighlighter, { vs2015 } from "../../shared/SyntaxHighlighter";
import Grid from "@mui/material/Grid";

const BuilderDocumentsCodeExample = () => {
  return (
    <Panel colour="#FFFFFF">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="code-example" level={2}>
          Code example
        </SectionHeading>
      </Box>
      <Grid container spacing={5} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h4" align="center" sx={{ mb: 3 }}>
            Symmetric Key Encryption
          </Typography>
          <Typography style={{ width: "100%" }}>
            <SyntaxHighlighter
              language="csharp"
              style={vs2015}
              showLineNumbers={true}
            >
              {`JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();`}
            </SyntaxHighlighter>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h4" align="center" sx={{ mb: 3 }}>
            Asymmetric Key Encryption
          </Typography>
          <Typography style={{ width: "100%" }}>
            <SyntaxHighlighter
              language="csharp"
              style={vs2015}
              showLineNumbers={true}
            >
              {`JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilderCreator
  .Create()
  .WithSigningKeyFromOpenIdUrl("https://<host_name>:<port_number>/oidc/endpoint/<provider_name>/.well-known/openid-configuration")
  .WithIssuer("exampleIssuer")
  .WithAudience("exampleAudience")
  .WithExpiryDate()
  .Build();`}
            </SyntaxHighlighter>
          </Typography>
        </Grid>
      </Grid>
    </Panel>
  );
};

export default BuilderDocumentsCodeExample;
