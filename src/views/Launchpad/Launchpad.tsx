import React from 'react'
import Sound from 'react-sound'
import styled from 'styled-components'
import Page from 'components/layout/Page'

const Launchpad: React.FC = () => {
  return (
    <Page>
      <Sound url="/sounds/launchpad_sound.mp3" playStatus={Sound.status.PLAYING} loop />
      <LaunchpadBgContainer width="100%" height="100%" autoPlay loop muted>
        <source src="/videos/launchpad_video.mp4" />
      </LaunchpadBgContainer>
    </Page>
  )
}

const LaunchpadBgContainer = styled.video`
  object-fit: fill;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
`

export default Launchpad
