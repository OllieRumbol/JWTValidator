import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";

const DictionaryExtensionsIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Dictionary Extensions Introduction
      </Typography>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        I want to make every part of processing a JWT easy for developers. Which
        is why I have created a few dictionary extenion methods to help find
        specfic properties with the dictionary of claims.
      </Typography>
    </Panel>
  );
};

export default DictionaryExtensionsIntroduction;
