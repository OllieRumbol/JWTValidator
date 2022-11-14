import React from "react";
import Typography from "@mui/material/Typography";
import "../../style/shared.css";
import documents from "../../assets/documents.jpg";

const Title = () => {
  
  return (
    <div className="article" style={{ backgroundImage: `url(${documents})` }}>
      <Typography className="header bold shadow" variant="h1" gutterBottom>
        Documentation
      </Typography>
      <Typography className="header" variant="h4" gutterBottom>
        A complete guide to the inner workings of the library
      </Typography>
    </div>
  );
};

export default Title;
