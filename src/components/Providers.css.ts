import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
});

export const provider = style({
  padding: "1rem",
  fontSize: "1.5rem",
  color: "#444444",
  ":hover": {
    color: "#f17474",
  },
});
