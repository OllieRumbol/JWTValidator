import React from "react";
import Container from "@mui/material/Container";

import DictionaryExtensionsIntroduction from "./DictionaryExtensionsIntroduction";
import DictionaryExtensionCodeSample from "./DictionaryExtensionCodeSample";
import DictionaryExtensionMethods from "./DictionaryExtensionMethods";

const DictionaryExtensionsPage = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <DictionaryExtensionsIntroduction />
      <DictionaryExtensionCodeSample />
      <DictionaryExtensionMethods />
    </Container>
  );
};

export default DictionaryExtensionsPage;
