import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";

const ExpiryCheckerIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="introduction" level={2}>
          Expiry Checker Introduction
        </SectionHeading>
      </Box>
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
