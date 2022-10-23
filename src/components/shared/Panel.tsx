import React, { Children } from "react";
import "../../style/shared.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

type Props = {
  colour: string;
  children: React.ReactNode;
};

const Panel = (props: Props) => {
  const { colour } = props;

  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: colour, overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.children}
      </Container>
    </Box>
  );
};

export default Panel;
