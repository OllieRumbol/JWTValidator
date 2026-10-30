import React from "react";
import Container from "@mui/material/Container";
import BuilderDocumentsIntroduction from "./BuilderDocumentsIntroduction";
import BuilderDocumentsTechnicalDetails from "./BuilderDocumentsTechnicalDetails";
import BuilderDocumentsMethods from "./BuilderDocumentsMethods";
import BuilderDocumentsCodeExample from "./BuilderDocumentsCodeExample";

const BuilderDocuments = () => {
  return (
    <Container maxWidth={false} className="noWhiteSpace">
      <BuilderDocumentsIntroduction />
      <BuilderDocumentsCodeExample />
      <BuilderDocumentsTechnicalDetails />
      <BuilderDocumentsMethods />
    </Container>
  );
};

export default BuilderDocuments;
