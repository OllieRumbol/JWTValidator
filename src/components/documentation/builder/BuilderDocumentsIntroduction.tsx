import React from "react";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import "../../../style/shared.css";

const BuilderDocumentsIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="introduction" level={2}>
          Builder Introduction
        </SectionHeading>
      </Box>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        The builder is used within this library to configure what parts of the
        JWT need validating. The JWTValidatorOptions class contains all of the
        different priorties of what can be validated in a JWT. However this
        class can only be created using the JWTValidatorOptionsBuilderCreator
        builder.
      </Typography>
    </Panel>
  );
};

export default BuilderDocumentsIntroduction;
