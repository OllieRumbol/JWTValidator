import React from "react";
import "../../../style/shared.css";
import Panel from "../../shared/Panel";
import Typography from "@mui/material/Typography";
import DocumentationCard from "../DocumentationCard";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import BuilderMethods from "./BuilderMethods";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 3,
};

const BuilderDocumentsMethods = () => {
  return (
    <Panel colour="#FFFFFF">
      <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
        Methods
      </Typography>
      <Grid container spacing={5}>
        {BuilderMethods.map((methodDetails, index) => {
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

export default BuilderDocumentsMethods;
