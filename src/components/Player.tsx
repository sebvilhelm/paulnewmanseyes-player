import React, { useRef, useEffect } from "react";
import PlayerView from "./PlayerView";
import { usePlayer } from "../hooks/player";

interface Song {
  title: string;
  url: string;
}

interface PlayerProps {
  songs: Array<Song>;
}

function Player({ songs }: PlayerProps): JSX.Element {
  const [state, dispatch] = usePlayer();

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

  const onSelected = ({
    songIsSelected,
    index,
  }: {
    songIsSelected: boolean;
    index: number;
  }): void => {
    if (songIsSelected) {
      dispatch({ type: "TOGGLE" });
    } else {
      dispatch({ type: "CHANGE_SONG", index });
    }
  };

  const onClickButton = (): void => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <PlayerView
      {...state}
      songs={songs}
      onClickButton={onClickButton}
      onSelected={onSelected}
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
