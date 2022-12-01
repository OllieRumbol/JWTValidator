import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CardActionArea } from "@mui/material";

import "../../style/shared.css";

type VersionCardProps = {
  version: Version;
};

type Version = {
  title: string;
  status: string;
  description: string;
  tasks: Task[];
};

type Task = {
  name: string;
  isComplete: boolean;
};

const VersionCard = (props: VersionCardProps) => {
  const { title, status, description, tasks } = props.version;
  const color = status == "done" ? "#388e3c" : status == "in progress" ? "#f57c00" : status == "to do" ? "#d32f2f" : "#e3f2fd";

  return (
    <Card style={{width: "100%"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3" style={{ color: color }}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h4">
            Description of version
          </Typography>
          <Typography gutterBottom variant="body1">{description}</Typography>
          <Typography gutterBottom variant="h4">
            Features
          </Typography>
          <FormGroup>
            {tasks.map((task, index) => {
              return (
                <FormControlLabel
                  disabled
                  checked={task.isComplete}
                  control={<Checkbox />}
                  label={task.name}
                />
              );
            })}
          </FormGroup>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VersionCard;