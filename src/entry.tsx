import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Player from "./components/Player";
import songs from './songs.json'

ReactDOM.render(
  <StrictMode>
    <Player songs={songs} />
  </StrictMode>,
  document.getElementById("root")
);
