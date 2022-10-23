import React from "react";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import "../../../style/shared.css";

const BuilderDocumentsIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Builder Introduction
      </Typography>
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
