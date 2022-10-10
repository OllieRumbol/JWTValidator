import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import "../../style/shared.css";
import VersionCard from "./VersionCard";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 3,
};

const VersionList = () => {
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
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12}>
              <Box sx={item}>
                <VersionCard />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}></Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}></Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

export default VersionList;
