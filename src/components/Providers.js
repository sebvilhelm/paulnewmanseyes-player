import React from 'react'
import { FaSpotify, FaBandcamp, FaApple } from 'react-icons/fa'

import { ProvidersContainer, ProviderStyle } from './Providers.style'

function Providers() {
  return (
    <ProvidersContainer>
      <a
        className={ProviderStyle}
        href="https://paulnewmanseyes.bandcamp.com/releases"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Bandcamp"
      >
        <FaBandcamp />
      </a>
      <a
        className={ProviderStyle}
        href="https://open.spotify.com/album/6LfR64fv8r4Uem36K4vtw7?si=oj7eSIMAT8O56N09nA2UNw"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Spotify"
      >
        <FaSpotify />
      </a>
      <a
        className={ProviderStyle}
        href="https://itunes.apple.com/dk/album/entitlement-ep/1424456482"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Apple Music"
      >
        <FaApple />
      </a>
    </ProvidersContainer>
  )
}

export default Providers
