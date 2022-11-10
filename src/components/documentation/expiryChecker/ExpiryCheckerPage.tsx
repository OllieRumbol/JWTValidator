import React from "react";
import Container from "@mui/material/Container";
import Title from "../Title";
import ExpiryCheckerIntroduction from "./ExpiryCheckerIntroduction";
import ExpiryCheckerCodeSample from "./ExpiryCheckerCodeSample";
import ExpiryCheckerMethods from "./ExpiryCheckerMethods";

const ExpiryCheckerPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <Title />
      <ExpiryCheckerIntroduction />
      <ExpiryCheckerCodeSample />
      <ExpiryCheckerMethods />
    </Container>
  );
};

export default ExpiryCheckerPage;
