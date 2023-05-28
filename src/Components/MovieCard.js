import Button from "@mui/material/Button";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Rating from "@mui/material/Rating";
import { useState, useEffect, useContext } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LikeDislikeCounter } from "./LikeDislikeCounter";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { movielist_context } from "./Movielist";
import { API } from "../global.js"
import { FormDialog } from "./FormDialog";

export function MovieCard({ movie, keyvalue }) {
  const [movies, setmovies] = useContext(movielist_context);
  const [checked, setChecked] = useState(false);
  const [open, setopen] = useState(false);

  const history = useHistory();

  const deleteMovie = async (id) => {
    await fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    fetch(`${API}/movies`)
      .then((data) => data.json())
      .then((mvs) => setmovies(mvs));
  };

  return (
    <Card sx={{ maxWidth: 340, margin: 2 }} id={keyvalue}>
      <CardMedia
        component="img"
        height="500"
        image={movie.poster}
        alt={movie.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className="name-likes">
            <h3>{movie.name}</h3>
            <LikeDislikeCounter />
          </div>
        </Typography>
        <Typography gutterBottom variant="body1" component='div'>
          <div className="name-likes">
            <Rating
              className="movie-rate"
              name="read-only"
              value={parseInt(movie.rating)}
              precision={1}
              readOnly
            />
            <Button size="small" onClick={() => setChecked(!checked)}>
              Description
              {checked ? (
                <ExpandLessIcon color="primary" />
              ) : (
                <ExpandMoreIcon color="primary" />
              )}
            </Button>
          </div>
        </Typography>
        <Typography variant="body2" color="text.secondary" component='div'>
          <Collapse in={checked}>
            {<p className="movie-summary">{movie.summary}</p>}
          </Collapse>
        </Typography>
      </CardContent>
      <CardActions className="name-likes">
        <IconButton
          color="primary"
          onClick={() => history.push("/movies/" + movie._id)}
        >
          <InfoIcon movie={movie}/>
        </IconButton>
        <div>
          <IconButton
            color="warning"
            onClick={() => {
              deleteMovie(movie._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setopen(true)}
          >
            <EditIcon />
          </IconButton>
        </div>
      </CardActions>
      <FormDialog open={open} setopen={setopen} id={movie._id}/>
    </Card>
  );
}
