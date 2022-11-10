import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";

const ExpiryCheckerIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Expiry Checker Introduction
      </Typography>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        With the release of version 1.0.3 came the new feature of "Jwt Expiry
        Checker". This new feature allows developers to quickly validate the
        expiry date of a JWT as well as know the exact date and time the JWT
        expires. This information allows developers to then start a refresh
        process and get an new/ updated JWT from their provider.
      </Typography>
    </Panel>
  );
};

export default ExpiryCheckerIntroduction;
