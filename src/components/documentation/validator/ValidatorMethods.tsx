import React from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";
import ValidatorMethodDetails from "./ValidatorMethodDetails";
import DocumentationCard from "../DocumentationCard";
import Grid from "@mui/material/Grid";

const ValidatorMethods = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="methods" level={2}>
          Methods
        </SectionHeading>
      </Box>
      <Grid container spacing={5} sx={{ width: "100%" }}>
        {ValidatorMethodDetails.map((methodDetails) => {
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

export default ValidatorMethods;
