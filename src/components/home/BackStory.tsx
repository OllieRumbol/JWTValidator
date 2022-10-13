import React from "react";
import "../../style/shared.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BackStory = () => {
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
          Back Story
        </Typography>
        <Typography align="center" variant="h5" component="h5">
          The biggest use case of this library is to validate ID tokens after a
          successful OAuth login, however, any JWT can be validated. Over the
          years I have seen many developers trip up on the final hurdle of an
          OAuth login integration and with the complexities of the following
          objects in C#/.NET
          <ul style={{ listStylePosition: "inside" }}>
            <li>TokenValidationParameters</li>
            <li>JwtSecurityTokenHandler</li>
            <li>ClaimsPrincipal</li>
          </ul>
          My library abstracts away from these complexities and allows a simple
          flow to validate any part of JWT as well as extracting its claims. It
          was important for the JWT validator library to be able to handle any
          JWT which is why it allows both symmetric key encryption and
          asymmetric key encryption.
        </Typography>
      </Container>
    </Box>
  );
};

export default BackStory;
