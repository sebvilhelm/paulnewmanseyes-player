import React, { Component } from 'react';
import {
  FaPause,
  FaPlay,
  FaSpotify,
  FaBandcamp,
  FaApple
} from 'react-icons/fa';

import {
  PlayerContainer,
  SongList,
  SongListItem,
  ControlsContainer,
  PlayButton,
  ProvidersContainer,
  ProviderStyle
} from './Player.style';

class Player extends Component {
  static defaultProps = {
    songs: []
  };

  state = {
    playing: false,
    hasPlayed: false,
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
        <ControlsContainer>
          <img src="/coyote.jpg" alt="A Coyote" />
          <PlayButton onClick={this.togglePlay}>
            {(playing && <FaPause />) || <FaPlay />}
          </PlayButton>
        </ControlsContainer>

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
          <ProvidersContainer>
            <a
              className={ProviderStyle}
              href="https://paulnewmanseyes.bandcamp.com/releases"
              rel="noopener noreferrer"
              target="_blank"
              title="Hear the album on Bandcamp"
            >
              <FaBandcamp />
            </a>
            <a
              className={ProviderStyle}
              href="https://open.spotify.com/album/6LfR64fv8r4Uem36K4vtw7?si=oj7eSIMAT8O56N09nA2UNw"
              rel="noopener noreferrer"
              target="_blank"
              title="Hear the album on Spotify"
            >
              <FaSpotify />
            </a>
            <a
              className={ProviderStyle}
              href="https://itunes.apple.com/dk/album/entitlement-ep/1424456482"
              rel="noopener noreferrer"
              target="_blank"
              title="Hear the album on Apple Music"
            >
              <FaApple />
            </a>
          </ProvidersContainer>
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
