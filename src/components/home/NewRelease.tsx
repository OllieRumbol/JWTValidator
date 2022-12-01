import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "../../style/shared.css";

const NewRelease = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        New Release: 1.0.3
      </Typography>
      <Typography align="center" variant="h5" component="h5">
        With the release of version 1.0.3 bought brand new features to the
        JWTValidator library. Developers are now able to find out if a JWT has
        expired as well as the exact date and time of expiry.
      </Typography>
      <Typography style={{ width: "100%" }}>
        <SyntaxHighlighter
          language="csharp"
          style={vs2015}
          showLineNumbers={true}
        >
          {`string jwt = "....";
string privateSigningKey = "serguhvalhoier.....";

bool isExpired = new JWTExpiryChecker().HasJWTExpired(jwt, privateSigningKey);

DateTime expiryDate = new JWTExpiryChecker().WhenDoesJWTExpire(jwt, privateSigningKey);`}
        </SyntaxHighlighter>
      </Typography>
    </Panel>
  );
};

export default NewRelease;
