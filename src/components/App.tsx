import * as React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./home/HomePage";
import VersionsPage from "./versions/VersionsPage";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../style/app.css";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import BuilderDocuments from "./documentation/builder/BuilderDocuments";
import DictionaryExtensionsPage from "./documentation/dictionaryExtensions/DictionaryExtensionsPage";
import ValidatorPage from "./documentation/validator/ValidatorPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const App = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

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
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  Documentation
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                          >
                            <Link to="/documentation/builder">
                              <MenuItem onClick={handleClose}>
                                <Button>Builder</Button>
                              </MenuItem>
                            </Link>
                            <Link to="/documentation/validator">
                              <MenuItem onClick={handleClose}>
                                <Button>Validator</Button>
                              </MenuItem>
                            </Link>
                            <Link to="/documentation/dictionary">
                              <MenuItem onClick={handleClose}>
                                <Button>Dictionary Extensions</Button>
                              </MenuItem>
                            </Link>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                <Button href="https://www.nuget.org/packages/JWTValidator">
                  NuGut
                </Button>
                <Button href="https://github.com/OllieRumbol/JWTValidator">
                  GitHub Repo
                </Button>
              </Toolbar>
            </Grid>
          </AppBar>
        </Box>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/versions" element={<VersionsPage />} />
          <Route path="/documentation/builder" element={<BuilderDocuments />} />
          <Route path="/documentation/validator" element={<ValidatorPage />} />
          <Route path="/documentation/dictionary" element={<DictionaryExtensionsPage />} />
        </Routes>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar></Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
