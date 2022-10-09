import React from "react";
import Tite from "./Title";
import HowItWorks from "./HowItWorks";
import BackStory from "./BackStory";
import Container from "@mui/material/Container";
import "../../style/homePage.css";
import "../../style/shared.css";

const HomePage = () => {

  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <Tite />
      <HowItWorks />
      <BackStory />
    </Container>
  );
};

export default HomePage;