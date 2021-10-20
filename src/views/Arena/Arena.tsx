import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'

const arenaBgVideoUrl =
  'https://res.cloudinary.com/dbyunrpzq/video/upload/v1632206011/The_Journey_to_the_Arena_Part_01_uvqzti.mp4'

const Arena: React.FC = () => {
  return (
    <ArenaPage>
      <ArenaBgContainer width="100%" height="100%" autoPlay loop controls>
        <source src={arenaBgVideoUrl} />
      </ArenaBgContainer>
    </ArenaPage>
  )
}

const ArenaPage = styled(Page)`
  height: 100%;
`

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
