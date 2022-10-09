import React from "react";
import Typography from "@mui/material/Typography";
import CodeBackgroundImage from "../assets/codeBackground.jpg";
import "../../style/title.css";

const Title = () => {
  const image =
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";

  return(
    <div className="article" style={{ backgroundImage: `url(${image})` }}>
    <Typography className="header bold shadow" variant="h1" gutterBottom>
      JWT Validator
    </Typography>
    <Typography className="header" variant="h4" gutterBottom>
      Simplify the validation and handling of a JWTs in C#
    </Typography>
  </div>
  )
};

export default Title;
