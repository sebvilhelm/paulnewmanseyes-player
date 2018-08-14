import React, { Component } from 'react';

import { PlayerContainer, SongList, SongListItem } from './Player.style';

class Player extends Component {
  static defaultProps = {
    songs: [],
  };

  state = {
    playing: false,
    hasPlayed: false,
    currentSong: 0,
  };

  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

  changeCurrentSong = index => {
    this.setState({ currentSong: index }, () => {
      this.audio.current.play();
    });
  };

  playNextSong = () => {
    if (this.state.currentSong < this.props.songs.length - 1) {
      this.changeCurrentSong(this.state.currentSong + 1);
    } else {
      this.setState({ currentSong: 0 });
    }
  };

  togglePlay = () => {

    const method = this.state.playing ? 'pause' : 'play';
    this.audio.current[method]();
  };

  setPlayState = playing => {
    if (!this.state.hasPlayed) {
      this.setState({ hasPlayed: true });
    }
    this.setState({ playing });
  };

  skipToEnd = () => {
    this.audio.current.currentTime = this.audio.current.duration - 5;
  };

  render() {
    const { playing, currentSong } = this.state;
    const { songs } = this.props;
    return (
      <PlayerContainer>
        <div>
          <img src="/coyote.jpg" alt="A Coyote" />
          <button onClick={this.togglePlay}>{playing ? '❚❚' : '►'}</button>
        </div>

        <div>
          <SongList>
            {songs.map((song, index) => {
              const songIsSelected = currentSong === index;
              const songIsPlaying = songIsSelected && playing;
              return (
                <SongListItem
                  key={song.title}
                  role="button"
                  tabIndex="0"
                  aria-label={`Play ${song.title}`}
                  onClick={() => {
                    this.changeCurrentSong(index);
                  }}
                  playing={songIsPlaying}
                  selected={this.state.hasPlayed && songIsSelected}
                >
                  {song.title}
                </SongListItem>
              );
            })}
          </SongList>
        </div>

        <audio
          ref={this.audio}
          onPlay={() => this.setPlayState(true)}
          onPause={() => this.setPlayState(false)}
          onEnded={this.playNextSong}
          src={songs[currentSong].url}
        />
      </PlayerContainer>
    );
  }
}

export default Player;
