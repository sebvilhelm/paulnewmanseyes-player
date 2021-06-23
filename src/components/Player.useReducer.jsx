import React, { useRef, useEffect } from "react";
import PlayerView from "./PlayerView";

const initialState = {
  playing: false,
  currentSong: 0,
  loading: true,
  hasPlayed: false,
};

function stateReducer(state, action) {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        loading: false,
        hasPlayed: true,
        playing: true,
      };
    case "STOP":
      return {
        ...state,
        hasPlayed: true,
        playing: false,
      };
    case "TOGGLE":
      return {
        ...state,
        hasPlayed: true,
        playing: !state.playing,
      };
    case "CHANGE_SONG":
      return {
        ...state,
        hasPlayed: true,
        loading: true,
        currentSong: action.index,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

function Player({ songs }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const audio = useRef();

  useEffect(() => {
    if (state.playing && !state.loading) {
      audio.current.play();
    } else if (!state.playing) {
      audio.current.pause();
    }
  }, [state.playing, state.loading]);

  useEffect(() => {
    const status = state.playing ? "🎶" : "🤫";
    if (state.hasPlayed) {
      document.title = `${songs[state.currentSong].title} ${status}`;
    }
  }, [state.currentSong, state.playing, state.hasPlayed, songs]);

  return (
    <PlayerView
      {...state}
      songs={songs}
      onClickButton={() => dispatch({ type: "TOGGLE" })}
      onSelected={({ songIsSelected, index }) => {
        if (songIsSelected) {
          dispatch({ type: "TOGGLE" });
        } else {
          dispatch({ type: "CHANGE_SONG", index });
        }
      }}
    >
      <audio
        ref={audio}
        onLoadedMetadata={() => {
          if (state.hasPlayed) {
            dispatch({ type: "PLAY" });
          } else {
            dispatch({ type: "LOADED" });
          }
        }}
        onEnded={() =>
          dispatch({
            type: "CHANGE_SONG",
            index: (state.currentSong + 1) % songs.length,
          })
        }
        src={songs[state.currentSong].url}
      />
    </PlayerView>
  );
}

Player.defaultProps = {
  songs: [],
};

export default Player;
