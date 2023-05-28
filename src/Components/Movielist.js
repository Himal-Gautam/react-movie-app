import * as React from "react";
import { createContext, useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import { MovieCard } from "./MovieCard";
import AddIcon from "@mui/icons-material/Add";
import { FormDialog } from "./FormDialog";
import { API } from "../global.js";

export const movielist_context = createContext({ state: 40 });

export function Movielist() {
  console.log("strted");
  const [movies, setmovies] = useState([]);
  const list = [movies, setmovies];
  const [open, setopen] = useState(false);

  useEffect(() => {
    try {
      fetch(`${API}/movies`)
        .then((data) => data.json())
        .then((mvs) => setmovies(mvs));
    } catch (error) {console.log(error);}
  }, []);

  return (
    <movielist_context.Provider value={list}>
      <div>
        <div className="App">
          <section className="MovieList">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} keyvalue={index} movies/>
            ))}
          </section>
          <FormDialog open={open} setopen={setopen} type='add'/>
          {!open ? (
            <Fab
              color="primary"
              aria-label="add"
              style={{ position: "fixed", right: "20px", bottom: "20px" }}
              size="large"
              onClick={() => setopen(true)}
            >
              <AddIcon />
            </Fab>
          ) : (
            <></>
          )}
        </div>
      </div>
    </movielist_context.Provider>
  );
}
