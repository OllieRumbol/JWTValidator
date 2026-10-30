import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DocumentationCard from "../DocumentationCard";
import Grid from "@mui/material/Grid";
import BuilderMethods from "./BuilderMethods";

const BuilderDocumentsMethods = () => {
  return (
    <Panel colour="#FFFFFF">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="methods" level={2}>
          Methods
        </SectionHeading>
      </Box>
      <Grid container spacing={5} sx={{ width: "100%" }}>
        {BuilderMethods.map((methodDetails) => {
          return (
            <Grid key={methodDetails.title} size={12}>
              <DocumentationCard
                title={methodDetails.title}
                summary={methodDetails.summary}
                syntax={methodDetails.syntax}
                parameters={methodDetails.parameters}
                returns={methodDetails.returns}
              />
            </Grid>
          );
        })}
      </Grid>
    </Panel>
  );
};

export default BuilderDocumentsMethods;
