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
      <Grid container spacing={3}>
        {BuilderMethods.map((bm, index) => {
          return (
            <Grid item xs={6}>
              <DocumentationCard
                title={bm.title}
                summary={bm.summary}
                parameters={bm.parameters}
                returns={bm.returns}
              />
            </Grid>
          );
        })}
      </Grid>
    </Panel>
  );
};

export default BuilderDocumentsMethods;
