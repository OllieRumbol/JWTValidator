import React from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import Container from "@mui/material/Container";
import "../../style/shared.css";
import Title from "./Title";
import VersionList from "./VersionList";

const VersionsPage = () => {
  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <PageTitle name="Versions" />
      <Title />
      <VersionList />
    </Container>
  );
};

export default VersionsPage;
