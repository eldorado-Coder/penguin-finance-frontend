import React from 'react'
import Sound from 'react-sound';
import Page from 'components/layout/Page'

const Arena: React.FC = () => {

  return (
    <Page >
      <Sound
        url="/sounds/penguin_arena_page.mp3"
        playStatus={Sound.status.PLAYING}
        loop
      />
    </Page>
  )
}

export default Arena
