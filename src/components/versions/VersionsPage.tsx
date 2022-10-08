import React from "react";
import Typography from "@mui/material/Typography"; 
import Container from "@mui/material/Container";
import "../../style/shared.css"

const VersionsPage = () => {
    const image = "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";

    return (
      <Container maxWidth={false} disableGutters className="noWhiteSpace">
        <div className="article" style={{ backgroundImage: `url(${image})` }}>
        <Typography className="header bold shadow" variant="h1" gutterBottom>
          Versions
        </Typography>
        <Typography className="header" variant="h4" gutterBottom>
          The past and future progress of this library
        </Typography>
        </div>
      </Container>
    );
};

export default VersionsPage;
