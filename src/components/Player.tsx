import React, { useRef, useEffect, useReducer } from "react";
import PlayerView from "./PlayerView";

const initialState = {
  currentSong: 0,
  error: false,
  hasPlayed: false,
  loading: true,
  playing: false,
};

type Action =
  | { type: "PLAY" }
  | { type: "STOP" }
  | { type: "TOGGLE" }
  | { type: "CHANGE_SONG"; index: number }
  | { type: "LOADED" }
  | { type: "ERROR" };

function stateReducer(state: typeof initialState, action: Action) {
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
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
  }
}

interface Song {
  title: string;
  url: string;
}

interface PlayerProps {
  songs: Array<Song>
}

function Player({ songs }: PlayerProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (state.playing && !state.loading) {
      audio.current?.play();
    } else if (!state.playing) {
      audio.current?.pause();
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
        onError={() => {
          dispatch({ type: "ERROR" });
        }}
        src={songs[state.currentSong].url}
      />
    </PlayerView>
  );
}

export default Player;
