import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Panel from "../../shared/Panel";

const ValidatorIntroduction = () => {
  return (
    <Panel colour="#DDDDDD">
      <Box sx={{ mb: 3 }}>
        <SectionHeading id="introduction" level={2}>
          Validator Introduction
        </SectionHeading>
      </Box>
      <Typography align="center" variant="h5" component="h5" gutterBottom>
        A key piller to this library is to enable developers to write the
        cleanest code possible that matches their coding style. That is why
        there are two different methods that can be ued to validate a JWT.
        However, each method outputs a dictionary of claims within a JWT. The
        key being the property name with a list of corresponding values.
      </Typography>
    </Panel>
  );
};

export default ValidatorIntroduction;
