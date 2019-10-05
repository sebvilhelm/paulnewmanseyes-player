import React, { Fragment, lazy, Suspense, useRef, useEffect } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import VisuallyHidden from '@reach/visually-hidden'
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

const initialState = {
  playing: false,
  currentSong: 0,
  loading: true,
  hasPlayed: false,
}

function stateReducer(state, action) {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        loading: false,
        hasPlayed: true,
        playing: true,
      }
    case 'STOP':
      return {
        ...state,
        hasPlayed: true,
        playing: false,
      }
    case 'TOGGLE':
      return {
        ...state,
        hasPlayed: true,
        playing: !state.playing,
      }
    case 'CHANGE_SONG':
      return {
        ...state,
        hasPlayed: true,
        loading: true,
        currentSong: action.index,
      }
    case 'LOADED':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

function Player({ songs }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState)

  const audio = useRef()

  useEffect(() => {
    if (state.playing && !state.loading) {
      audio.current.play()
    } else if (!state.playing) {
      audio.current.pause()
    }
  }, [state.playing, state.loading])

  useEffect(() => {
    const status = state.playing ? '🎶' : '🤫'
    if (state.hasPlayed) {
      document.title = `${songs[state.currentSong].title} ${status}`
    }
  }, [state.currentSong, state.playing, state.hasPlayed, songs])

  return (
    <PlayerContainer>
      <ControlsContainer>
        <img src="/coyote.jpg" alt="A Coyote" />
        <PlayButton
          onClick={() => dispatch({ type: 'TOGGLE' })}
          data-test-id="play-toggle"
        >
          {state.playing ? (
            <Fragment>
              <VisuallyHidden>Pause</VisuallyHidden>
              <FaPause />
            </Fragment>
          ) : (
            <Fragment>
              <VisuallyHidden>Play</VisuallyHidden>
              <FaPlay />
            </Fragment>
          )}
        </PlayButton>
      </ControlsContainer>

      <div>
        <SongList>
          {songs.map((song, index) => {
            const songIsSelected = state.currentSong === index
            const songIsPlaying = songIsSelected && state.playing
            const songIsLoading = songIsSelected && state.loading
            return (
              <SongListItem
                key={song.title}
                onClick={() => {
                  if (songIsSelected) {
                    dispatch({ type: 'TOGGLE' })
                  } else {
                    dispatch({ type: 'CHANGE_SONG', index })
                  }
                }}
                playing={songIsPlaying}
                selected={state.hasPlayed && songIsSelected}
                aria-busy={songIsLoading}
              >
                <VisuallyHidden>
                  {songIsPlaying ? 'Pause' : 'Play'}
                </VisuallyHidden>
                {song.title}
                <SongStateWrapper>
                  {(songIsLoading && <Spinner />) ||
                    (songIsPlaying && !state.loading && <FaPlay />) ||
                    (state.hasPlayed && songIsSelected && !state.loading && (
                      <FaPause />
                    ))}
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
        onLoadedMetadata={() => {
          if (state.hasPlayed) {
            dispatch({ type: 'PLAY' })
          } else {
            dispatch({ type: 'LOADED' })
          }
        }}
        onEnded={() =>
          dispatch({
            type: 'CHANGE_SONG',
            index: (state.currentSong + 1) % songs.length,
          })
        }
        src={songs[state.currentSong].url}
      />
    </PlayerContainer>
  )
}

Player.defaultProps = {
  songs: [],
}

export default Player
