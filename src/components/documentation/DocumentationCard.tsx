import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CardActionArea } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";

import "../../style/shared.css";

type DocumentationCardProps = {
  title: string;
  summary: string;
  parameters: string;
  returns: string;
};

const DocumentationCard = (props: DocumentationCardProps) => {
  const { title, summary, parameters, returns } = props;

  return (
    <Card style={{ width: "100%" }}>
      <CardActionArea>
        <CardContent>
          <Typography align="center" gutterBottom variant="h4">
            {title}
          </Typography>
          <Alert variant="outlined" severity="success">
            <AlertTitle>
              <Typography variant="h5">Summary</Typography>
            </AlertTitle>
            <Typography variant="h6">{summary}</Typography>
          </Alert>
          <br />
          <Alert variant="outlined" severity="info">
            <AlertTitle>
              <Typography variant="h5">Parameters</Typography>
            </AlertTitle>
            <Typography variant="h6">{parameters}</Typography>
          </Alert>
          <br />
          <Alert variant="outlined" severity="info">
            <AlertTitle>
              <Typography variant="h5">Summary</Typography>
            </AlertTitle>
            <Typography variant="h6">{returns}</Typography>
          </Alert>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DocumentationCard;
