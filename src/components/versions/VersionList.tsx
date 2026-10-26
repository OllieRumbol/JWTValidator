import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Versions from "./Versions";
import { SxProps, Theme } from "@mui/material/styles";
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
        <Grid container spacing={5} sx={{ width: "100%" }}>
          {Versions.map((version, index) => {
            return (
              <Grid size={12}>
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