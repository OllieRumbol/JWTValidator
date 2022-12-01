import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import "../../style/shared.css";

const Licensing = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Licensing
      </Typography>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        JWT validator is open source library under the{" "}
        <a href="https://github.com/OllieRumbol/ID_Token-JWT_Validator/blob/main/LICENSE.txt">
          MIT Licence
        </a>{" "}
        and its free for commercial and personal use.
      </Typography>
    </Panel>
  );
};

export default Licensing;
