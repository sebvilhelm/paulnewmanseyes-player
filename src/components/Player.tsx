import React, {
  useRef,
  useEffect,
  ReactNode,
  lazy,
  Fragment,
  Suspense,
} from "react";
import { VisuallyHidden } from "@reach/visually-hidden";
import { FaPause, FaPlay } from "react-icons/fa";
import Spinner from "./Spinner";
import classNames from "classnames";
import { usePlayer } from "../hooks/player";
import * as styles from "./Player.css";
const Providers = lazy(() => import("./Providers"));

interface Song {
  title: string;
  url: string;
}

interface PlayerProps {
  songs: Array<Song>;
}

function Player({ songs }: PlayerProps): JSX.Element {
  const [{ currentSong, hasPlayed, loading, playing }, dispatch] = usePlayer();

  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playing && !loading) {
      audio.current?.play();
    } else if (!playing) {
      audio.current?.pause();
    }
  }, [playing, loading]);

  useEffect(() => {
    const status = playing ? "🎶" : "🤫";
    if (hasPlayed) {
      document.title = `${songs[currentSong].title} ${status}`;
    }
  }, [currentSong, playing, hasPlayed, songs]);

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
      <audio
        ref={audio}
        onLoadedMetadata={() => {
          if (hasPlayed) {
            dispatch({ type: "PLAY" });
          } else {
            dispatch({ type: "LOADED" });
          }
        }}
        onEnded={() =>
          dispatch({
            type: "CHANGE_SONG",
            index: (currentSong + 1) % songs.length,
          })
        }
        onError={() => {
          dispatch({ type: "ERROR" });
        }}
        src={songs[currentSong].url}
      />
    </div>
  );
}

export default Player;

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
