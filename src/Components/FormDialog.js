import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import { API } from "../global.js";
import { movielist_context } from "./Movielist";

export function FormDialog({ open, setopen, type, id }) {
  const [movies, setmovies] = useContext(movielist_context);
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [trailer, setTrailer] = useState("");
  const [snackopen, setSnackOpen] = React.useState(false);

  async function handleAdd() {
    if (poster !== "" && name !== "" && summary !== "" && trailer !== "") {
      setSnackOpen(true);
      setopen(!open);
      await fetch(`${API}/movies`, {
        method: "POST",
        body: JSON.stringify({
          // id: newID,
          name: name,
          poster: poster,
          rating: rating,
          summary: summary,
          trailer: trailer,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      fetch(`${API}/movies`)
        .then((data) => data.json())
        .then((mvs) => setmovies(mvs));
    }
  }

  async function handleEdit() {
    if (poster !== "" && name !== "" && summary !== "" && trailer !== "") {
      setSnackOpen(true);
      setopen(!open);

      await fetch(`${API}/movies/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          poster: poster,
          rating: rating,
          summary: summary,
          trailer: trailer,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      fetch(`${API}/movies`)
        .then((data) => data.json())
        .then((mvs) => setmovies(mvs));
    }
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>{type === "add" ? "Add Movie" : "Edit Movie"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {type === "add" ? "Add " : "Edit "}Movie in the Movie List please
            fill the below details
            {<br />}
            It is cumpulsory to fill all fields else form doesn't get submitted
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Movie Name"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setSummary(event.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="poster"
            label="Poster url"
            type="url"
            fullWidth
            variant="filled"
            onChange={(event) => setPoster(event.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="trailer"
            label="Trailer url"
            type="url"
            fullWidth
            variant="filled"
            onChange={(event) => setTrailer(event.target.value)}
            required
          />
          <InputLabel htmlFor="bootstrap-input">Rating</InputLabel>
          <Rating
            id="rate"
            name="hover-feedback"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
            precision={0.5}
            classes="rate"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button
            onClick={type === "add" ? handleAdd : handleEdit}
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackopen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackOpen(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          CONGRATULATIONS!!! Action got Completed !
        </Alert>
      </Snackbar>
    </>
  );
}
