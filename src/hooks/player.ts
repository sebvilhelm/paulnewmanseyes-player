import { Dispatch, ReducerState, useReducer } from "react";

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

function reducer(state: typeof initialState, action: Action) {
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

export function usePlayer(): [ReducerState<typeof reducer>, Dispatch<Action>] {
  return useReducer(reducer, initialState);
}
