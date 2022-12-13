import React from "react";
import Typography from "@mui/material/Typography";
import Panel from "../../shared/Panel";
import DocumentationCard from "../DocumentationCard";
import ExpiryCheckerMethodDetails from "./ExpiryCheckerMethodDetails";
import Grid from "@mui/material/Grid";

const ExpiryCheckerMethods = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography align="center" variant="h2" component="h2" sx={{ mb: 3 }}>
        Methods
      </Typography>
      <Grid container spacing={5}>
        {ExpiryCheckerMethodDetails.map((methodDetails, index) => {
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

export default ExpiryCheckerMethods;
