import React from "react";
import Tite from "./Title";
import HowItWorks from "./HowItWorks";
import Container from "@mui/material/Container";
import "../../style/homePage.css";
import "../../style/shared.css";

const HomePage = () => {

  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <Tite />
      <HowItWorks />
    </Container>
  );
};

export default HomePage;