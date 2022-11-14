import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

import ConstructionIcon from "@mui/icons-material/Construction";
import VerifiedIcon from "@mui/icons-material/Verified";
import ExtensionIcon from "@mui/icons-material/Extension";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 3,
};

const HowItWorks = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        How it works
      </Typography>
      <div>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <ConstructionIcon style={{ height: "5em", width: "5em" }} />
              <br />
              <Typography variant="h4" align="center">
                Builder
              </Typography>
              <br />
              <Typography variant="h5" align="center">
                A fluent, strict and nested builder to construct what properties
                of a JWT need validating
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <VerifiedIcon style={{ height: "5em", width: "5em" }} />
              <br />
              <Typography variant="h4" align="center">
                Validator
              </Typography>
              <br />
              <Typography variant="h5" align="center">
                The key methods that returns whether the JWT is valid or not as
                well as a dictionary of claims. Other services are also
                available for validating the expiry date
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <ExtensionIcon style={{ height: "5em", width: "5em" }} />
              <br />
              <Typography variant="h4" align="center">
                Extensions
              </Typography>
              <br />
              <Typography variant="h5" align="center">
                There are a variety of extension methods available to deal with
                the dictionary outputted once validation is complete
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Panel>
  );
};

export default HowItWorks;
