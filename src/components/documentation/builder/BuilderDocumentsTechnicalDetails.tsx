import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";

const BuilderDocumentsTechnicalDetails = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Technical Details
      </Typography>
      <Typography align="center" variant="h5" component="h5">
        A variety of different builder design patterns have been used.
        <ul style={{ listStylePosition: "inside" }}>
          <li>
            Fluent: Allows developers to chain method calls as each method
            returns the current instance
          </li>
          <li>
            Strict: Developers can only call methods in a specfic order and
            can't chain certain methods together
          </li>
          <li>
            Nested: The JWTValidatorOptions model properties can only be set
            using the builder
          </li>
        </ul>
      </Typography>
    </Panel>
  );
};

export default BuilderDocumentsTechnicalDetails;
