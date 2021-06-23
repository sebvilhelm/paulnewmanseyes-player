import React, { useRef, useEffect, useReducer } from "react";
import PlayerView from "./PlayerView";

interface PlayerState {
  currentSong: number;
  hasPlayed: boolean;
  status: "loading" | "error" | "playing" | "paused"
}

const initialState: PlayerState = {
  currentSong: 0,
  hasPlayed: false,
  status: "loading"
};

type Action =
  | { type: "PLAY" }
  | { type: "STOP" }
  | { type: "TOGGLE" }
  | { type: "CHANGE_SONG"; index: number }
  | { type: "LOADED" }
  | { type: "ERROR" };

function stateReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        hasPlayed: true,
        status: "playing"
      };
    case "STOP":
      return {
        ...state,
        hasPlayed: true,
        status: "paused"
      };
    case "TOGGLE":
      return {
        ...state,
        hasPlayed: true,
        status: state.status === "playing" ? "paused" : "playing"
      };
    case "CHANGE_SONG":
      return {
        ...state,
        hasPlayed: true,
        status: "loading", 
        currentSong: action.index,
      };
    case "LOADED":
      return {
        ...state,
        status: "paused"
      };
    case "ERROR":
      return {
        ...state,
        status: "error"
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
    if (state.status === "playing") {
      audio.current?.play();
    } else if (state.status === "paused") {
      audio.current?.pause();
    }
  }, [state.status]);

  useEffect(() => {
    const status = state.status === "playing" ? "🎶" : state.status === "paused" ? "🤫" : "";
    if (state.hasPlayed) {
      document.title = `${songs[state.currentSong].title} ${status}`;
    }
  }, [state.currentSong, state.status, state.hasPlayed, songs]);

  return (
    <PlayerView
      currentSong={state.currentSong}
      hasPlayed={state.hasPlayed}
      error={state.status === "error"}
      playing={state.status === "playing"}
      loading={state.status === "loading"}
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
