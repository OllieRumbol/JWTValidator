import React from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";
import DocumentationCard from "../DocumentationCard";
import ExpiryCheckerMethodDetails from "./ExpiryCheckerMethodDetails";
import Grid from "@mui/material/Grid";

const ExpiryCheckerMethods = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="methods" level={2}>
          Methods
        </SectionHeading>
      </Box>
      <Grid container spacing={5} sx={{ width: "100%" }}>
        {ExpiryCheckerMethodDetails.map((methodDetails) => {
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

export default ExpiryCheckerMethods;
