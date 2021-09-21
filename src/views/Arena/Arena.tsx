import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'

const arenaBgVideoUrl = 'https://res.cloudinary.com/dbyunrpzq/video/upload/v1624544901/penguin_arena_clpyb0.mp4'

const Arena: React.FC = () => {
  return (
    <Page>
      <ArenaBgContainer width="100%" height="100%" autoPlay loop controls>
        <source src={arenaBgVideoUrl} />
      </ArenaBgContainer>
    </Page>
  )
}

const ArenaBgContainer = styled.video`
  object-fit: fill;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
`

export default Arena
