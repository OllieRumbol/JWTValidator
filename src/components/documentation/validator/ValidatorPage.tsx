import React from "react";
import Container from "@mui/material/Container";
import Title from "../Title";
import ValidatorIntroduction from "./ValidatorIntroduction";
import ValidatorCodeSamples from "./ValidatorCodeSamples";
import ValidatorMethods from "./ValidatorMethods";

const ValidatorPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <Title />
      <ValidatorIntroduction />
      <ValidatorCodeSamples />
      <ValidatorMethods />
    </Container>
  );
};

export default ValidatorPage;
