import React, { Component } from 'react';

import { SongList, SongListItem } from './Player.style';

class Player extends Component {
  static defaultProps = {
    songs: []
  };

  state = {
    playing: false,
    currentSong: 0
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
    this.setState({ playing });
  };

  render() {
    const { playing, currentSong} = this.state;
    const { songs } = this.props;
    return (
      <div>
        <div>
          <img src="/coyote.jpg" alt="A Coyote" />
          <button onClick={this.togglePlay}>
            {playing ? '❚❚' : '►'}
          </button>
          <button
            onClick={() => {
              this.audio.current.currentTime = this.audio.current.duration - 5;
            }}
          >
            Skip to end
          </button>
        </div>

        <SongList>
          {songs.map((song, index) => (
            <SongListItem
              key={song.title}
              role="button"
              tabIndex="0"
              aria-label={`Play ${song.title}`}
              onClick={() => {
                this.changeCurrentSong(index);
              }}
              playing={currentSong === index && playing}
            >
              {song.title}
            </SongListItem>
          ))}
        </SongList>

        <audio
          ref={this.audio}
          onPlay={() => this.setPlayState(true)}
          onPause={() => this.setPlayState(false)}
          onEnded={this.playNextSong}
          src={songs[currentSong].url}
        />
      </div>
    );
  }
}

export default Player;
