import React from "react";
import Container from "@mui/material/Container";

import Title from "../Title";
import DictionaryExtensionsIntroduction from "./DictionaryExtensionsIntroduction";
import DictionaryExtensionCodeSample from "./DictionaryExtensionCodeSample";
import DictionaryExtensionMethods from "./DictionaryExtensionMethods";

const DictionaryExtensionsPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <Title />
      <DictionaryExtensionsIntroduction />
      <DictionaryExtensionCodeSample />
      <DictionaryExtensionMethods />
    </Container>
  );
};

export default DictionaryExtensionsPage;
