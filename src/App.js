//Essential imports
import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

//Importing components
import { Welcome } from "./Components/Welcome";
import { Err404 } from "./Components/Err404";
import { MovieInfo } from "./Components/MovieInfo";
import { Movielist } from "./Components/Movielist";
import { ColorBox } from "./Components/ColorBox";
// import { FormicPractice } from "./Components/FormikDialog";

//Imports for setting theme
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Paper from "@mui/material/Paper";

//context creation

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {


  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
      <div className="App">
        <div className="header">
          <Paper elevation={0}>
            <h1>Movie List</h1>
            <div className="nav_bar">
              <div className="nav">
                <Button variant="text">
                  <Link to="/welcome">Welcome</Link>
                </Button>
                <Button variant="text">
                  <Link to="/movielist">Movie List</Link>
                </Button>
                <Button variant="text"><Link to="/color_box">Color Game</Link></Button>
              </div>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
                {theme.palette.mode} mode
              </IconButton>
            </div>
            <hr />
          </Paper>
        </div>

        <div className="content">
          <Paper elevation={24} sx={{borderRadius:"8px", minHeight:"100vh"}}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/welcome" />
              </Route>

              <Route path="/movielist">
                <Movielist />
              </Route>

              <Route path="/welcome">
                <Welcome />
              </Route>

              <Route path="/color_box">
               <ColorBox />
               </Route>

              <Route path="/movies/:id">
                <MovieInfo />
              </Route>

              {/* <Route path="/movies/edit/:id">
                <EditMovie />
              </Route> */}

              {/* <Route path="/formic_practice">
                <FormicPractice />
              </Route> */}

              <Route path="**">
                <Err404 />
              </Route>
            </Switch>
          </Paper>
        </div>
      </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
