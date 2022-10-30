import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import "../../style/shared.css";

type DocumentationCardProps = {
  title: string;
  summary: string;
  syntax: string;
  parameters: string;
  returns: string;
};

const DocumentationCard = (props: DocumentationCardProps) => {
  const { title, summary, syntax, parameters, returns } = props;

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
              <Typography variant="h5">Syntax</Typography>
            </AlertTitle>
            <Typography variant="h6">
              <SyntaxHighlighter language="csharp" style={vs2015}>
                {syntax}
              </SyntaxHighlighter>
            </Typography>
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
