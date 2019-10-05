import React, { Component } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import Spinner from './Spinner'
import Providers from './Providers'

import {
  PlayerContainer,
  SongList,
  SongListItem,
  ControlsContainer,
  PlayButton,
  SongStateWrapper,
} from './Player.style'

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
    const { playing, currentSong } = this.state
    const { songs } = this.props
    return (
      <PlayerContainer>
        <ControlsContainer>
          <img src="/coyote.jpg" alt="A Coyote" />
          <PlayButton onClick={this.togglePlay}>
            {(playing && <FaPause />) || <FaPlay />}
          </PlayButton>
        </ControlsContainer>

        <div>
          <SongList>
            {songs.map((song, index) => {
              const songIsSelected = currentSong === index
              const songIsPlaying = songIsSelected && playing
              return (
                <SongListItem
                  key={song.title}
                  role="button"
                  tabIndex="0"
                  aria-label={`Play ${song.title}`}
                  onClick={() => {
                    this.changeCurrentSong(index)
                  }}
                  playing={songIsPlaying}
                  selected={this.state.hasPlayed && songIsSelected}
                >
                  {song.title}
                  <SongStateWrapper>
                    {(songIsSelected && this.state.loading && <Spinner />) ||
                      (songIsPlaying && !this.state.loading && <FaPlay />) ||
                      (this.state.hasPlayed &&
                        songIsSelected &&
                        !this.state.loading && <FaPause />)}
                  </SongStateWrapper>
                </SongListItem>
              )
            })}
          </SongList>
          <Providers />
        </div>

        <audio
          ref={this.audio}
          onLoadedMetadata={this.loaded}
          onPlay={() => this.setPlayState(true)}
          onPause={() => this.setPlayState(false)}
          onEnded={this.playNextSong}
          src={songs[currentSong].url}
        />
      </PlayerContainer>
    )
  }
}

export default Player