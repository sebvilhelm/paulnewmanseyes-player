import { style, keyframes } from "@vanilla-extract/css";

const spinning = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const Spinner = style({
  animation: `1s linear infinite ${spinning}`,
});
