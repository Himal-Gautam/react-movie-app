import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { API } from "../global.js";

export function MovieInfo() {
  const { id } = useParams();
  const history = useHistory();
  const [movie, setmovie] = useState({});

  useEffect(() => {
    console.log('called');
    try {
      fetch(`${API}/movies/${id}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((mv) => {setmovie(mv)});
    } catch (error) {
      console.log('error');
    }
      
  }, []);

  return (
    <div className="movie-detail" wait={1000}>
      <iframe
        width="100%"
        height="500"
        src={movie.trailer}
        title="Trailer"
        allowfullscreen="true"
      ></iframe>
      <div className="movie-detail-container">
        <div className="name-likes">
          <h2>{movie.name}</h2>
          <Rating
            className="movie-rate"
            name="read-only"
            value={8.8}
            precision={0.5}
            readOnly
          />
        </div>
        <p>{movie.summary}</p>
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
