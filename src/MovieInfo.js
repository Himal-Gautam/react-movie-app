import * as React from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { movielist_context } from "./App";
import { useContext } from "react";

export function MovieInfo() {
  const { id } = useParams();

  const [movies, setmovies] = useContext(movielist_context);

  return (
    <div className="movie-detail">
      <iframe
        width="100%"
        height="500"
        src={movies[id].trailer}
        title="Artemis Fowl Trailer"
        allowfullscreen="true"
      ></iframe>
      <div className="movie-detail-container">
        <div className="name-likes">
          <h2>{movies[id].name}</h2>
          <Rating
            className="movie-rate"
            name="read-only"
            value={8.8}
            precision={0.5}
            readOnly
          />
        </div>
        <p>{movies[id].summary}</p>
      </div>
    </div>
  );
}
