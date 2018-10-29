import React, { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import Spinner from './Spinner'
import {
  PlayerContainer,
  SongList,
  SongListItem,
  ControlsContainer,
  PlayButton,
  SongStateWrapper,
} from './Player.style'

const Providers = lazy(() => import('./Providers'))

function usePlaying() {
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => (playing ? setPlaying(false) : setPlaying(true))

  const play = () => setPlaying(true)
  const pause = () => setPlaying(false)

  return { playing, togglePlay, play, pause }
}

function Player({ songs }) {
  const { playing, play, togglePlay } = usePlaying()
  const [currentSong, setCurrentSong] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const audio = useRef()

  const changeCurrentSong = index => {
    if (index === currentSong) {
      togglePlay()
      return
    }

    setCurrentSong(index)
    setLoading(true)
    play()
  }

  useEffect(
    () => {
      if (playing && !loading) {
        audio.current.play()
      } else if (!playing) {
        audio.current.pause()
      }
    },
    [playing, loading]
  )

  const playNextSong = () => {
    if (currentSong < songs.length - 1) {
      changeCurrentSong(this.state.currentSong + 1)
    } else {
      setCurrentSong(0)
    }
  }

  return (
    <PlayerContainer>
      <ControlsContainer>
        <img src="/coyote.jpg" alt="A Coyote" />
        <PlayButton onClick={togglePlay}>
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
                  changeCurrentSong(index)
                }}
                playing={songIsPlaying}
                selected={hasPlayed && songIsSelected}
              >
                {song.title}
                <SongStateWrapper>
                  {(songIsSelected && loading && <Spinner />) ||
                    (songIsPlaying && !loading && <FaPlay />) ||
                    (hasPlayed && songIsSelected && !loading && <FaPause />)}
                </SongStateWrapper>
              </SongListItem>
            )
          })}
        </SongList>
        <Suspense fallback="loading...">
          <Providers />
        </Suspense>
      </div>

      <audio
        ref={audio}
        onLoadedMetadata={() => setLoading(false)}
        onPlay={() => setHasPlayed(true)}
        onEnded={playNextSong}
        src={songs[currentSong].url}
      />
    </PlayerContainer>
  )
}

Player.defaultProps = {
  songs: [],
}

export default Player
