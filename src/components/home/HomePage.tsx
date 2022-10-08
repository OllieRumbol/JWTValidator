import React from "react";
import Container from "@mui/material/Container";
import "../../style/homePage.css";
import Typography from "@mui/material/Typography"; 

const HomePage = () => {
  const image2 = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <div className="article" style={{ backgroundImage: `url(${image2})` }}>
      <Typography className="header bold shadow" variant="h1" gutterBottom>
        JWT Validator
      </Typography>
      <Typography className="header" variant="h4" gutterBottom>
        Simplify the validation and handling of a JWTs in C#
      </Typography>
      </div>
    </Container>
  );
};

export default HomePage;
