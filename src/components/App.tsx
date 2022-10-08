import * as React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./home/HomePage";
import DocumentationPage from "./documentation/DocumentationPage";
import VersionsPage from "./versions/VersionsPage";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../style/app.css";

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
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Toolbar>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
                <Link to="/versions">
                  <Button>Versions</Button>
                </Link>
                <Link to="/documentation">
                  <Button>Documentation</Button>
                </Link>
              </Toolbar>
            </Grid>
          </AppBar>
        </Box>
      </ThemeProvider>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/versions" element={<VersionsPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
