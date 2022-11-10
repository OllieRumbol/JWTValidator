import React from "react";
import Typography from "@mui/material/Typography";
import "../../style/title.css";
import versionHistory from "../../assets/versions.jpg";

const Title = () => {
  
  return (
    <div className="article" style={{ backgroundImage: `url(${versionHistory})` }}>
      <Typography className="header bold shadow" variant="h1" gutterBottom>
        Versions
      </Typography>
      <Typography className="header" variant="h4" gutterBottom>
        The past and future progress of this library
      </Typography>
    </div>
  );
};

export default Title;
