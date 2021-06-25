import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Player from "../../src/components/Player";
import songs from "../../src/songs.json";

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.addTextTrack = jest.fn();
});

test("it renders a list of songs", async () => {
  render(<Player songs={songs} />);

  expect(screen.getByAltText("A Coyote")).toBeTruthy();

  for (const song of songs) {
    expect(screen.getByText(song.title)).toBeTruthy();
  }
});

test("it renders a list of links", async () => {
  render(<Player songs={songs} />);

  expect(await screen.findByTestId("providers-container")).toBeTruthy();
  expect(screen.getByTitle("Listen to the album on Bandcamp")).toBeTruthy();
  expect(screen.getByTitle("Listen to the album on Spotify")).toBeTruthy();
  expect(screen.getByTitle("Listen to the album on Apple Music")).toBeTruthy();
});

test("it toggles play/pause with the button", () => {
  render(<Player songs={songs} />);

  const playToggle = screen.getByTestId("play-toggle");

  expect(playToggle).toHaveTextContent("Play");
  fireEvent.click(playToggle);

  expect(playToggle).toHaveTextContent("Pause");
});
