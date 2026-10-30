import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";

const DictionaryExtensionsIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="introduction" level={2}>
          Dictionary Extensions Introduction
        </SectionHeading>
      </Box>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        I want to make every part of processing a JWT easy for developers. Which
        is why I have created a few dictionary extenion methods to help find
        specfic properties with the dictionary of claims.
      </Typography>
    </Panel>
  );
};

export default DictionaryExtensionsIntroduction;
