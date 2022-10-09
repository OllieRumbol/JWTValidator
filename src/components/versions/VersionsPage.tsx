import React from "react";
import Container from "@mui/material/Container";
import "../../style/shared.css";
import Title from "./Title";

const VersionsPage = () => {
  const image =
    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";

  return (
    <Container maxWidth={false} disableGutters className="noWhiteSpace">
      <Title />
    </Container>
  );
};

export default VersionsPage;
