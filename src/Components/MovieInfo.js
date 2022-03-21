import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { movielist_context } from "./Movielist";
import { useContext } from "react";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

export function MovieInfo() {
  const { id } = useParams();
  const history = useHistory();

  const [movies, setmovies] = useContext(movielist_context);
  let movie = movies.filter((movie) => movie.id === id);

  return (
    <div className="movie-detail">
      <iframe
        width="100%"
        height="500"
        src={movie[0].trailer}
        title="Trailer"
        allowfullscreen="true"
      ></iframe>
      <div className="movie-detail-container">
        <div className="name-likes">
          <h2>{movie[0].name}</h2>
          <Rating
            className="movie-rate"
            name="read-only"
            value={8.8}
            precision={0.5}
            readOnly
          />
        </div>
        <p>{movie[0].summary}</p>
        <Button
          onClick={() => history.goBack()}
          variant="outlined"
          startIcon={<ArrowBackIos />}
        >
          BACK
        </Button>
      </div>
    </div>
  );
}
