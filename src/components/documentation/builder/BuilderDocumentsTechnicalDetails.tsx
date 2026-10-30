import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

const BuilderDocumentsTechnicalDetails = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="technical-details" level={2}>
          Technical Details
        </SectionHeading>
      </Box>
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
