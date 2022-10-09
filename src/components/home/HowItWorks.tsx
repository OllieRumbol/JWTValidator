import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

import ConstructionIcon from '@mui/icons-material/Construction';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 3,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const HowItWorks = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
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
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1</Box>
                <Typography variant="h4" align="center">
                  Builder
                </Typography>
                <ConstructionIcon style={{height: "5em", width: "5em"}}/>
                <Typography variant="h5" align="center">
                  A fluent, strict and nested builder to construct what
                  properties of a JWT need validating
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2</Box>
                <Typography variant="h4" align="center">
                  Try Get Method
                </Typography>
                <CodeIcon style={{height: "5em", width: "5em"}}/>
                <Typography variant="h5" align="center">
                  The key method that returns whether the JWT is valid or not
                  as well as a dictionary of claims
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3</Box>
                <Typography variant="h4" align="center">
                  Dictionary Extensions
                </Typography>
                <MenuBookIcon style={{height: "5em", width: "5em"}} />
                <Typography variant="h5" align="center">
                  There are a variety of extension methods to deal with the
                  dictionary outputted once valation is complete
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

export default HowItWorks;