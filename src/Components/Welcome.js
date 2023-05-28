import * as React from "react";
// import { Component } from "react";

import WordArt from "react-wordart";

export function Welcome() {
  return (
    <div className="welcome">
      <WordArt
        text="Welcome to the Movie List App"
        theme={`superhero`}
        fontSize={100}
      />
    </div>
  );
}
