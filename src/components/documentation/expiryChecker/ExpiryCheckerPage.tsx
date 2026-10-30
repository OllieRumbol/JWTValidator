import React from "react";
import Container from "@mui/material/Container";
import ExpiryCheckerIntroduction from "./ExpiryCheckerIntroduction";
import ExpiryCheckerCodeSample from "./ExpiryCheckerCodeSample";
import ExpiryCheckerMethods from "./ExpiryCheckerMethods";

const ExpiryCheckerPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <ExpiryCheckerIntroduction />
      <ExpiryCheckerCodeSample />
      <ExpiryCheckerMethods />
    </Container>
  );
};

export default ExpiryCheckerPage;
