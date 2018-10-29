import React, { Component } from 'react'
import songs from './songs.json'

import Player from './components/Player.new'

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Player songs={songs} />
      </React.Fragment>
    )
  }
}
