import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Grid from "@mui/material/Grid";

const BuilderDocumentsCodeExample = () => {
  return (
    <Panel colour="#FFFFFF">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Code example
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h4" align="center" sx={{ mb: 3 }}>
            Symmetric Key Encryption
          </Typography>
          <Typography style={{ width: "100%" }}>
            <SyntaxHighlighter
              language="csharp"
              style={vs2015}
              showLineNumbers={true}
            >
              {`JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilder
  .Create()
  .WithSigningKeyFromSecret("serguhvalhoier.....")
  .WithExpiryDate()
  .Build();`}
            </SyntaxHighlighter>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h4" align="center" sx={{ mb: 3 }}>
            Asymmetric Key Encryption
          </Typography>
          <Typography style={{ width: "100%" }}>
            <SyntaxHighlighter
              language="csharp"
              style={vs2015}
              showLineNumbers={true}
            >
              {`JWTValidatorOptions jWTValidatorOptions = JWTValidatorOptionsBuilder
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
