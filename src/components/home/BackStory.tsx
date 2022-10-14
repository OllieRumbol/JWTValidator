import React from "react";
import Panel from "../shared/Panel";
import Typography from "@mui/material/Typography";
import "../../style/shared.css";

const BackStory = () => {
  return (
    <Panel colour="#DDDDDD">
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Back Story
      </Typography>
      <Typography align="center" variant="h5" component="h5">
        The biggest use case of this library is to validate ID tokens after a
        successful OAuth login, however, any JWT can be validated. Over the
        years I have seen many developers trip up on the final hurdle of an
        OAuth login integration and with the complexities of the following
        objects in C#/.NET
        <ul style={{ listStylePosition: "inside" }}>
          <li>TokenValidationParameters</li>
          <li>JwtSecurityTokenHandler</li>
          <li>ClaimsPrincipal</li>
        </ul>
        My library abstracts away from these complexities and allows a simple
        flow to validate any part of JWT as well as extracting its claims. It
        was important for the JWT validator library to be able to handle any JWT
        which is why it allows both symmetric key encryption and asymmetric key
        encryption.
      </Typography>
    </Panel>
  );
};

export default BackStory;