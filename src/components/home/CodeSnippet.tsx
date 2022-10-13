import React from "react";
import "../../style/shared.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeSnippet = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "#FFFFFF", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
      </Container>
    </Box>
  );
};

export default CodeSnippet;
