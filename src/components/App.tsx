import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./home/HomePage";
import DocumentationPage from "./documentation/DocumentationPage";
import VersionsPage from "./versions/VersionsPage";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import '../style/app.css';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h5"
                component="div"
                align="center"
                sx={{ flexGrow: 1 }}
              >
                JWT Validator
              </Typography>
              <Link to="versions">
                <Button>Versions</Button>
              </Link>
              <Link to="documentation">
                <Button>Documentation</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/versions" element={<VersionsPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
