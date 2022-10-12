import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Versions from "./Versions";
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
        <Grid container spacing={5}>
          {Versions.map((version, index) => {
            return (
              <Grid item xs={12} md={12} lg={12}>
                <Box sx={item}>
                  <VersionCard version={version} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default VersionList;
