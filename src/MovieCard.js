import Button from '@mui/material/Button';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Rating from '@mui/material/Rating';
import { useContext, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LikeDislikeCounter } from './LikeDislikeCounter';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from "react-router-dom";
import { movielist_context } from './App';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MovieCard({ id }) {

  const [movies, setmovies] = useContext(movielist_context);
  
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 340, margin: 2 }}>
      <CardMedia
        component="img"
        height="500"
        image={movies[id].poster}
        alt={movies[id].name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className="name-likes">
            <h3>{movies[id].name}</h3>
            <LikeDislikeCounter />
          </div>
        </Typography>
        <Typography gutterBottom variant="body1">
          <div className="name-likes">
            <Rating className="movie-rate" name="read-only" value={movies[id].rating} precision={0.5} readOnly />
            <Button size="small" onClick={() => setChecked(!checked)}>Description
                {checked ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
            </Button>
          </div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Collapse in={checked}>{<p className="movie-summary">{movies[id].summary}</p>}</Collapse>
        </Typography>
      </CardContent>
      <CardActions className="name-likes">
        <IconButton color="primary"
            onClick={()=> history.push("/movies/" + id)}>
        <InfoIcon/>
        </IconButton>
        <div>
          <IconButton color="warning"
              onClick={()=> {
                setmovies(movies.filter(movie => movie.name !== movies[id].name))
              }}>
            <DeleteIcon />     
          </IconButton >
          {/* <IconButton color="primary"
              onClick={()=> {
                setmovies(movies.filter(movie => movie.name !== movies[id].name))
              }}>
            <EditIcon/>  
          </IconButton > */}
        </div>
      </CardActions>
    </Card>
  );
}
