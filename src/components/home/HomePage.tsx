import React from "react";
import Tite from "./Title";
import HowItWorks from "./HowItWorks";
import BackStory from "./BackStory";
import Licensing from "./Licensing";
import Container from "@mui/material/Container";
import "../../style/homePage.css";
import "../../style/shared.css";
import CodeSnippet from "./CodeSnippet";

const HomePage = () => {

  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <Tite />
      <HowItWorks />
      <CodeSnippet />
      <BackStory />
      <Licensing />
    </Container>
  );
};

export default HomePage;