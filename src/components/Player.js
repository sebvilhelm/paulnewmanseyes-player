import React, { Component } from 'react'
import PlayerView from './PlayerView'

class Player extends Component {
  static defaultProps = {
    songs: [],
  }

  state = {
    playing: false,
    hasPlayed: false,
    loading: true,
    currentSong: 0,
  }

  constructor(props) {
    super(props)
    this.audio = React.createRef()
  }

  changeCurrentSong = index => {
    if (index === this.state.currentSong) {
      this.togglePlay()
      return
    }

    this.setState({ currentSong: index, loading: true }, () => {
      this.audio.current.play()
    })
  }

  playNextSong = () => {
    if (this.state.currentSong < this.props.songs.length - 1) {
      this.changeCurrentSong(this.state.currentSong + 1)
    } else {
      this.setState({ currentSong: 0 })
    }
  }

  togglePlay = () => {
    const method = this.state.playing ? 'pause' : 'play'
    this.audio.current[method]()
  }

  setPlayState = playing => {
    if (!this.state.hasPlayed) {
      this.setState({ hasPlayed: true })
    }
    this.setState({ playing })
  }

  skipToEnd = () => {
    this.audio.current.currentTime = this.audio.current.duration - 5
  }

  loaded = () => {
    this.setState({ loading: false })
    if (this.state.hasPlayed) {
      this.audio.current.play()
    }
  }

  render() {
    const { currentSong } = this.state
    const { songs } = this.props

    return (
      <PlayerView
        {...this.state}
        songs={songs}
        onClickButton={this.togglePlay}
        onSelected={({ index }) => this.changeCurrentSong(index)}
      >
        <audio
          ref={this.audio}
          onLoadedMetadata={this.loaded}
          onPlay={() => this.setPlayState(true)}
          onPause={() => this.setPlayState(false)}
          onEnded={this.playNextSong}
          src={songs[currentSong].url}
        />
      </PlayerView>
    )
  }
}

export default Player
