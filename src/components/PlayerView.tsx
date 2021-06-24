import React, { Fragment, lazy, ReactNode, Suspense } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import classNames from "classnames";
import { FaPause, FaPlay } from "react-icons/fa";
import Spinner from "./Spinner";
import * as styles from "./PlayerView.css";

const Providers = lazy(() => import("./Providers"));

interface Song {
  title: string;
  url: string;
}

interface Props {
  children: ReactNode;
  currentSong: number;
  error: boolean;
  hasPlayed: boolean;
  loading: boolean;
  onClickButton: () => void;
  onSelected: (options: { index: number; songIsSelected: boolean }) => void;
  playing: boolean;
  songs: Array<Song>;
}

export default function PlayerView({
  children,
  currentSong,
  error,
  hasPlayed,
  loading,
  onClickButton,
  onSelected,
  playing,
  songs,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <img className={styles.img} src="/coyote.jpg" alt="A Coyote" />
        <button
          className={styles.playButton}
          onClick={onClickButton}
          data-test-id="play-toggle"
        >
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
        </button>
      </div>

      <div>
        <ol className={styles.songList}>
          {songs.map((song, index) => {
            const isSelected = currentSong === index;
            const isPlaying = isSelected && playing;
            const isLoading = isSelected && loading;
            return (
              <SongListItem
                key={song.title}
                isLoading={isLoading}
                isPlaying={isPlaying}
                isSelected={isSelected}
                onSelected={() =>
                  onSelected({ songIsSelected: isSelected, index })
                }
              >
                <VisuallyHidden>{isPlaying ? "Pause" : "Play"} </VisuallyHidden>
                {song.title}
                <span className={styles.songStateIcon}>
                  {(isLoading && <Spinner />) ||
                    (isPlaying && !isLoading && <FaPlay />) ||
                    (hasPlayed && isSelected && !isLoading && <FaPause />)}
                </span>
              </SongListItem>
            );
          })}
        </ol>
        <Suspense fallback="loading...">
          <Providers />
        </Suspense>
      </div>
      {children}
    </div>
  );
}

interface SongListItemProps {
  children: ReactNode;
  isLoading: boolean;
  isPlaying: boolean;
  isSelected: boolean;
  onSelected: () => void;
}

function SongListItem({
  children,
  isLoading,
  isPlaying,
  isSelected,
  onSelected,
}: SongListItemProps): JSX.Element {
  return (
    <li
      className={classNames(styles.songListItem, {
        [styles.songListItemPlaying]: isPlaying,
        [styles.songListItemSelected]: isSelected,
      })}
      onClick={() => onSelected()}
      aria-busy={isLoading}
    >
      <button className={styles.neutralButton}>{children}</button>
    </li>
  );
}
