import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Switch, Route, Link} from "react-router-dom";
import {createContext, useState} from "react";
import { Welcome } from './Welcome';
import { Err404 } from './Err404';
import { MovieInfo } from './MovieInfo';
import { movie_array_database } from './movie_array_database';
import { Movielist } from './Movielist';
import { ColorBox } from './ColorBox';

import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Paper from '@mui/material/Paper';


export const movielist_context = createContext({state:40});
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  
  const [movies, setmovies] = useState(movie_array_database());
  const list = [movies, setmovies]
  
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return(
    <movielist_context.Provider value={list}>
      <div className="App">
        <div className="header">
          <Paper elevation={0}>
          <h1>Movie List</h1>
          <div className="nav_bar">
            <div className="nav">
              <Button variant="text"><Link to="/welcome">Welcome</Link></Button>
              <Button variant="text"><Link to="/movielist">Movie List</Link></Button>
              <Button variant="text"><Link to="/welcome">Trailers</Link></Button>
              {/* <Button variant="text"><Link to="/color_box">Color Game</Link></Button> */}
            </div>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              {theme.palette.mode} mode 
            </IconButton>
          </div>
          <hr/>
          </Paper>
        </div>
        
        <div className="content">
          <Paper elevation={24}>
          <Switch>

            {/* Each route is case, eg. - case '/about': */}
            <Route path="/movielist">
              {/* Match url display the below component */}
              <Movielist/>
            </Route>

            <Route path="/welcome">
              <Welcome />
            </Route>

            {/* <Route path="/color_box">
              <ColorBox />
            </Route> */}
            
            <Route path="/movies/:id">
              <MovieInfo/>
            </Route>
            
            <Route path="**">
              <Err404/>
            </Route>

          </Switch>
          </Paper>
        </div>
      </div>
    </movielist_context.Provider>
  )
}


export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
