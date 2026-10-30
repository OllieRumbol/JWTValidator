import React from "react";
import Container from "@mui/material/Container";
import ValidatorIntroduction from "./ValidatorIntroduction";
import ValidatorCodeSamples from "./ValidatorCodeSamples";
import ValidatorMethods from "./ValidatorMethods";

const ValidatorPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <ValidatorIntroduction />
      <ValidatorCodeSamples />
      <ValidatorMethods />
    </Container>
  );
};

export default ValidatorPage;
