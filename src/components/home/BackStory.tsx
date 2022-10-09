import React from "react";
import "../../style/shared.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const BackStory = () => {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography align="center" variant="h2" component="h2">
        Back Story
      </Typography>
    </Container>
  );
};

export default BackStory;
