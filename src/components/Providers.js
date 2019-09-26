import React from 'react'
import { FaSpotify, FaBandcamp, FaApple } from 'react-icons/fa'

import { ProvidersContainer, Provider } from './Providers.style'

function Providers() {
  return (
    <ProvidersContainer>
      <Provider
        href="https://paulnewmanseyes.bandcamp.com/releases"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Bandcamp"
      >
        <FaBandcamp />
      </Provider>
      <Provider
        href="https://open.spotify.com/album/6LfR64fv8r4Uem36K4vtw7?si=oj7eSIMAT8O56N09nA2UNw"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Spotify"
      >
        <FaSpotify />
      </Provider>
      <Provider
        href="https://itunes.apple.com/dk/album/entitlement-ep/1424456482"
        rel="noopener noreferrer"
        target="_blank"
        title="Hear the album on Apple Music"
      >
        <FaApple />
      </Provider>
    </ProvidersContainer>
  )
}

export default Providers
