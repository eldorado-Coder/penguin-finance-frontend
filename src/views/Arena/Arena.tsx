import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
// import { isLiteralExpression } from 'typescript'
// import { useMatchBreakpoints } from 'penguinfinance-uikit2'

const arenaBgVideoUrl =
  'https://res.cloudinary.com/dbyunrpzq/video/upload/v1632206011/The_Journey_to_the_Arena_Part_01_uvqzti.mp4'

const Arena: React.FC = () => {
  // const { isLg, isXl } = useMatchBreakpoints()
  // const isStacked = !isLg && !isXl
  // const isMobile = !isXl;

  return (
    <ArenaPage>
      <ArenaBgContainer width="100%" height="100%" autoPlay loop controls>
        <source src={arenaBgVideoUrl} />
      </ArenaBgContainer>
    </ArenaPage>
  )
}

const ArenaPage = styled(Page)`
  min-width: 100vw;
  position: relative;
  height: 420px;
  min-height: 420px;

  @media (min-width: 640px) {
    height: calc(100vh - 260px);
    min-height: calc(100vh - 260px);
  }

  @media (min-width: 968px) {
    height: calc(100vh - 450px);
    min-height: calc(100vh - 450px);
  }

  @media (min-width: 1080px) {
    height: calc(100vh - 170px);
    min-height: calc(100vh - 170px);
  }

  @media (min-width: 1200px) {
    height: calc(100vh - 170px);
    min-height: calc(100vh - 170px);
  }
`

const ArenaBgContainer = styled.video`
  object-fit: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
`

export default Arena
