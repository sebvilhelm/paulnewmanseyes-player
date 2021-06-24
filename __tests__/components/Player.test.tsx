import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Player from "../../src/components/Player";
import songs from "../../src/songs.json";

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.addTextTrack = jest.fn();
});

test("it renders a list of songs", async () => {
  const { getByText, getByAltText, findByTestId, getByTitle } = render(
    <Player songs={songs} />
  );

  expect(getByAltText("A Coyote")).toBeTruthy();

  for (const song of songs) {
    expect(getByText(song.title)).toBeTruthy();
  }

  expect(await findByTestId("providers-container")).toBeTruthy();
  expect(getByTitle(/Listen to the album on Bandcamp/i)).toBeTruthy();
  expect(getByTitle(/Listen to the album on Spotify/i)).toBeTruthy();
  expect(getByTitle(/Listen to the album on Apple Music/i)).toBeTruthy();
});

test("it toggles play/pause with the button", () => {
  const { getByTestId } = render(<Player songs={songs} />);

  const playToggle = getByTestId("play-toggle");

  expect(playToggle).toHaveTextContent(/play/i);
  fireEvent.click(playToggle);

  expect(playToggle).toHaveTextContent(/pause/i);

  // TODO: Check for `audio.play()`
});
