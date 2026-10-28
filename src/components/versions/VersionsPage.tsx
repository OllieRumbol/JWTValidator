import React from "react";
import Container from "@mui/material/Container";
import "../../style/shared.css";
import Title from "./Title";
import VersionList from "./VersionList";

const VersionsPage = () => {
  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <Title />
      <VersionList />
    </Container>
  );
};

export default VersionsPage;
