import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import ValidatorMethodDetails from "./ValidatorMethodDetails";
import DocumentationCard from "../DocumentationCard";
import Grid from "@mui/material/Grid";

const ValidatorMethods = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography align="center" variant="h2" component="h2" sx={{ mb: 3 }}>
        Methods
      </Typography>
      <Grid container spacing={5}>
        {ValidatorMethodDetails.map((methodDetails, index) => {
          return (
            <Grid item xs={12}>
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
