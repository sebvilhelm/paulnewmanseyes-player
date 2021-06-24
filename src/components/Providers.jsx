import React from "react";
import { FaSpotify, FaBandcamp, FaApple } from "react-icons/fa";
import * as styles from "./Providers.css";

function Providers() {
  return (
    <div className={styles.container} data-test-id="providers-container">
      <a
        className={styles.provider}
        href="https://paulnewmanseyes.bandcamp.com/releases"
        rel="noopener noreferrer"
        target="_blank"
        title="Listen to the album on Bandcamp"
      >
        <FaBandcamp />
      </a>
      <a
        className={styles.provider}
        href="https://open.spotify.com/album/6LfR64fv8r4Uem36K4vtw7?si=oj7eSIMAT8O56N09nA2UNw"
        rel="noopener noreferrer"
        target="_blank"
        title="Listen to the album on Spotify"
      >
        <FaSpotify />
      </a>
      <a
        className={styles.provider}
        href="https://itunes.apple.com/dk/album/entitlement-ep/1424456482"
        rel="noopener noreferrer"
        target="_blank"
        title="Listen to the album on Apple Music"
      >
        <FaApple />
      </a>
    </div>
  );
}

export default Providers;
