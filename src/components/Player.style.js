import styled, { css } from 'react-emotion'

export const SongList = styled('ol')`
  counter-reset: song-counter;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    counter-increment: song-counter;

    &:before {
      content: counter(song-counter) '.';
      margin-right: 0.5rem;
      color: grey;
    }
  }
`

export const SongListItem = styled('li')`
  cursor: default;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  font-weight: 300;

  ${props =>
    props.playing &&
    css`
      color: #f17474;
    `} ${props =>
    props.selected &&
    css`
      font-weight: 400;
    `}

    &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`

export const PlayerContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`

export const ControlsContainer = styled('div')`
  position: relative;
  align-self: center;
  img {
    width: 100%;
  }
`

export const PlayButton = styled('button')`
  position: absolute;
  bottom: 5%;
  left: 5%;
  font-size: 1.5rem;
  border: 0;
  background-color: transparent;
  color: #ffffff;
`

export const ProvidersContainer = styled('div')`
  display: flex;
`

export const ProviderStyle = css`
  padding: 1rem;
  font-size: 1.5rem;
  color: #444444;
  &:hover {
    color: #f17474;
  }
`

export const SongStateWrapper = styled('span')`
  font-size: 0.7rem;
  margin: 0 0.3rem;
  vertical-align: middle;
`
