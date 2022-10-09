import React from "react";
import Typography from "@mui/material/Typography";
import "../../style/shared.css";

const Title = () => {
  const image =
    "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";

  return (
    <div className="article" style={{ backgroundImage: `url(${image})` }}>
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
