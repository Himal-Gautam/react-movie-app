import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useState } from "react";

export function LikeDislikeCounter() {
  const [like, setlike] = useState(0);
  const [dislike, setdislike] = useState(0);

  return (
    <div className="like-dislike">
      <IconButton
        onClick={() => {
          setlike(like + 1);
        }}
        color="primary"
        size="small"
        aria-label="add to shopping cart"
      >
        <Badge badgeContent={like} color="primary">👍</Badge>
      </IconButton>
      <IconButton
        onClick={() => {
          setdislike(dislike + 1);
        }}
        color="primary"
        size="small"
      >
        <Badge badgeContent={dislike} color="error">👎</Badge>
      </IconButton>
    </div>
  );
}
