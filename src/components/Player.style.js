import styled, { css } from 'react-emotion';

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
`;

export const SongListItem = styled('li')`
  cursor: default;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  font-weight: 300;

  ${props =>
    props.playing &&
    css`
      color: #f17474;
    `}
  ${props =>
    props.selected &&
    css`
      font-weight:400;
    `}

    &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const PlayerContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 1024px;
  margin: 0 auto;
`;
