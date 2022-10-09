import React from "react";
import Container from "@mui/material/Container";
import Title from "./Title";
import "../../style/shared.css"

const DocumentationPage = () => {

  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <Title />
    </Container>
    );
};

export default DocumentationPage;
