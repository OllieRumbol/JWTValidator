import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

import ConstructionIcon from "@mui/icons-material/Construction";
import CodeIcon from "@mui/icons-material/Code";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
              <CodeIcon style={{ height: "5em", width: "5em" }} />
              <br />
              <Typography variant="h4" align="center">
                Validator
              </Typography>
              <br />
              <Typography variant="h5" align="center">
                The key method that returns whether the JWT is valid or not as
                well as a dictionary of claims
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <MenuBookIcon style={{ height: "5em", width: "5em" }} />
              <br />
              <Typography variant="h4" align="center">
                Extensions
              </Typography>
              <br />
              <Typography variant="h5" align="center">
                There are a variety of extension methods to deal with the
                dictionary outputted once valation is complete
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Panel>
  );
};

export default HowItWorks;
