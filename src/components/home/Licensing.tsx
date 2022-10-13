import React from "react";
import "../../style/shared.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Licensing = () => {
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
          Licensing
        </Typography>
        <Typography align="center" variant="h5" component="h5" gutterBottom>
          JWT validator is open source library under the{" "}
          <a href="https://github.com/OllieRumbol/ID_Token-JWT_Validator/blob/main/LICENSE.txt">
            MIT Licence
          </a>{" "}
          and its free for commercial and personal use.
        </Typography>
      </Container>
    </Box>
  );
};

export default Licensing;
