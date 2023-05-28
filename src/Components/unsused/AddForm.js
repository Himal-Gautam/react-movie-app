import { useFormik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { API } from "../../global.js";
import { movielist_context } from "../Movielist";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

export function AddForm({ open, setopen }) {
  const [movies, setmovies] = useContext(movielist_context);
  const [newID, setnewID] = useState(Math.random().toString(36).slice(2));

  const validateForm = () => {
    let errors = {};

    if (formik.values.name === "") {
      errors.name = "All the fields should have some evalue";
    }
    if (formik.values.poster === "") {
      errors.poster = "All the fields should have some evalue";
    }
    if (formik.values.rating === "") {
      errors.rating = "All the fields should have some evalue";
    }
    if (formik.values.summary === "") {
      errors.summary = "All the fields should have some evalue";
    }
    if (formik.values.trailer === "") {
      errors.trailer = "All the fields should have some evalue";
    }

    return errors;
  };

  let idGenrator = () => {
    while (movies.filter((thismovie) => thismovie.id === newID).length > 0) {
      setnewID(Math.random().toString(36).slice(2));
    }
    return newID;
  };

  const formik = useFormik({
    initialValues: {
      id: idGenrator(),
      name: "",
      poster: "",
      rating: "0",
      summary: "",
      trailer: "",
    },
    validate: validateForm,
    onSubmit: async (values) => {
      setopen(!open);
      try {
        await fetch(`${API}/movies`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }).then((res) => {
          console.log(res);
        });

        setTimeout(
          fetch(`${API}/movies`)
            .then((data) => data.json())
            .then(async (mvs) => {
              await setmovies(mvs);
            }),
          3000
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add Movie in the Movie List please fill the below details
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
            onChange={formik.handleChange}
            defaultValue={formik.values.name}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="summary"
            label="Description"
            type="text"
            fullWidth
            variant="filled"
            onChange={formik.handleChange}
            defaultValue={formik.values.summary}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="poster"
            label="Poster url"
            type="text"
            fullWidth
            variant="filled"
            onChange={formik.handleChange}
            defaultValue={formik.values.poster}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="trailer"
            label="Trailer url"
            type="text"
            fullWidth
            variant="filled"
            onChange={formik.handleChange}
            defaultValue={formik.values.trailer}
            required
          />
          <InputLabel htmlFor="bootstrap-input">Rating</InputLabel>
          <Rating
            id="rate"
            name="hover-feedback"
            onChange={formik.handleChange}
            size="large"
            precision={0.5}
            classes="rate"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
