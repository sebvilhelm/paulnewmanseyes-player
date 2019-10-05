import React, { useRef, useState, useEffect } from 'react'

import PlayerView from './PlayerView'

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

  useEffect(() => {
    if (playing && !loading) {
      audio.current.play()
    } else if (!playing) {
      audio.current.pause()
    }
  }, [playing, loading])

  useEffect(() => {
    const status = playing ? '🎶' : '🤫'
    if (hasPlayed) {
      document.title = `${songs[currentSong].title} ${status}`
    }
  }, [currentSong, playing, hasPlayed, songs])

  return (
    <PlayerView
      playing={playing}
      loading={loading}
      currentSong={currentSong}
      songs={songs}
      hasPlayed={hasPlayed}
      onClickButton={togglePlay}
      onSelected={({ index }) => changeCurrentSong(index)}
    >
      <audio
        ref={audio}
        onLoadedMetadata={() => setLoading(false)}
        onPlay={() => setHasPlayed(true)}
        onEnded={() => changeCurrentSong((currentSong + 1) % songs.length)}
        src={songs[currentSong].url}
      />
    </PlayerView>
  )
}

Player.defaultProps = {
  songs: [],
}

export default Player
