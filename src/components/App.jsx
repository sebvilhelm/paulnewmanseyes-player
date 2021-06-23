import React, { Component } from "react";
import songs from "../songs.json";

import Player from "./Player.useReducer";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Player songs={songs} />
      </React.Fragment>
    );
  }
}
