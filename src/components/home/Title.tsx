import React from "react";
import Typography from "@mui/material/Typography";
import "../../style/title.css";
import codeBackground from "../../assets/codeBackground.jpg";

const Title = () => {

  return (
    <div className="article" style={{ backgroundImage: `url(${codeBackground})` }}>
      <Typography className="header bold shadow" variant="h1" gutterBottom>
        JWT Validator
      </Typography>
      <Typography className="header" variant="h4" gutterBottom>
        Simplify the validation and handling of JWTs in C#
      </Typography>
    </div>
  );
};

export default Title;
