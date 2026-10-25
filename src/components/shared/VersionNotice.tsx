import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Temporary: the site still documents 1.0.3 after 2.0.0 was released.
// Remove it when the 2.0.0 documentation goes live (release 3 of the site upgrade).
const VersionNotice = () => {
  return (
    <Box
      component="section"
      aria-label="Version notice"
      sx={{
        bgcolor: "#FDEEF3",
        borderBottom: "1px solid #F3C3D4",
        px: 3,
        py: 1.5,
      }}
    >
      <Typography align="center" sx={{ color: "#1B1A22" }}>
        <strong>JWT Validator 2.0.0 is out.</strong> This site still describes
        version 1.0.3, and its examples do not work with 2.0.0. Updated
        documentation is coming soon. Until then, read the{" "}
        <a
          href="https://www.nuget.org/packages/JWTValidator"
          style={{ color: "#A8174D", fontWeight: 600, textDecoration: "underline" }}
        >
          README and release notes on nuget.org
        </a>
        .
      </Typography>
    </Box>
  );
};

export default VersionNotice;
