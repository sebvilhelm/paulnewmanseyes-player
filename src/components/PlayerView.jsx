import React, { Fragment, lazy, Suspense } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import VisuallyHidden from "@reach/visually-hidden";
import Spinner from "./Spinner";
import {
  PlayerContainer,
  SongList,
  SongListItem,
  ControlsContainer,
  PlayButton,
  SongStateWrapper,
} from "./Player.style";

const Providers = lazy(() => import("./Providers"));

export default function PlayerView({
  children,
  playing,
  loading,
  currentSong,
  songs,
  hasPlayed,
  onClickButton,
  onSelected,
}) {
  return (
    <PlayerContainer>
      <ControlsContainer>
        <img src="/coyote.jpg" alt="A Coyote" />
        <PlayButton onClick={onClickButton} data-test-id="play-toggle">
          {playing ? (
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
            const songIsSelected = currentSong === index;
            const songIsPlaying = songIsSelected && playing;
            const songIsLoading = songIsSelected && loading;
            return (
              <SongListItem
                key={song.title}
                onClick={() => onSelected({ songIsSelected, index })}
                playing={songIsPlaying}
                selected={hasPlayed && songIsSelected}
                aria-busy={songIsLoading}
              >
                <VisuallyHidden>
                  {songIsPlaying ? "Pause" : "Play"}
                </VisuallyHidden>
                {song.title}
                <SongStateWrapper>
                  {(songIsLoading && <Spinner />) ||
                    (songIsPlaying && !loading && <FaPlay />) ||
                    (hasPlayed && songIsSelected && !loading && <FaPause />)}
                </SongStateWrapper>
              </SongListItem>
            );
          })}
        </SongList>
        <Suspense fallback="loading...">
          <Providers />
        </Suspense>
      </div>
      {children}
    </PlayerContainer>
  );
}
