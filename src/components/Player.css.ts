import { style, createVar } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "1fr 1fr",
  justifyContent: "center",
  margin: "0 auto",
  maxWidth: 1200,
});

export const controls = style({
  position: "relative",
  alignSelf: "center",
});

export const img = style({
  width: "100%",
});

export const songList = style({
  counterReset: "song-counter",
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const songListColorVar = createVar();
const songListWeightVar = createVar();

export const songListItem = style({
  color: songListColorVar,
  counterIncrement: "song-counter",
  cursor: "default",
  fontWeight: songListWeightVar,
  margin: "0.5rem 0rem",
  padding: "0.5rem 1rem",
  ":before": {
    content: 'counter(song-counter) "."',
    marginInlineEnd: "0.5rem",
    color: "grey",
  },
  ":hover": {
    backgroundColor: "hsla(0  0%  0% / 0.04)",
  },
  vars: {
    [songListColorVar]: "#444444",
    [songListWeightVar]: "300",
  },
});

export const neutralButton = style({
  background: "none",
  border: "none",
  color: "inherit",
  font: "inherit",
});

export const songListItemPlaying = style({
  vars: {
    [songListColorVar]: "#f17474",
  },
});

export const songListItemSelected = style({
  vars: {
    [songListWeightVar]: "400",
  },
});

export const songStateIcon = style({
  fontSize: "0.7rem",
  margin: "0 0.3rem",
  verticalAlign: "middle",
});

export const playButton = style({
  background: "none",
  border: "none",
  bottom: "5%",
  color: "white",
  fontSize: "1.5rem",
  left: "5%",
  position: "absolute",
});
