import React from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'
import IDODetail from './components/IDODetail'
import LaunchpadTimeline from './components/LaunchpadTimeline'
import ProjectDetailsCardSummary from './components/ProjectDetailsCardRegistration'
import ProjectDetailsCardDistribution from './components/ProjectDetailsCardDistribution'
import IDOData from './config'

const distributionEndTimeStamp = 1643068800

const Launchpad: React.FC = () => {
  const isEnded = Math.floor(Date.now() / 1000) > distributionEndTimeStamp

  return (
    <div>
      <IgloosBannerContainer justifyContent="center">
        <BannerImage src={`${process.env.PUBLIC_URL}/images/ido/header_bg.png`} alt="launchpad banner" />
        <HeaderContainer justifyContent="center">
          <IDODetail idoData={IDOData} isEnded={isEnded} />
        </HeaderContainer>
      </IgloosBannerContainer>
      <LaunchpadTimeline />
      {isEnded ? <ProjectDetailsCardSummary /> : <ProjectDetailsCardDistribution />}
    </div>
  )
}

// banner
const IgloosBannerContainer = styled(Flex)`
  position: relative;
  justify-content: flex-start;

  @media (min-width: 1400px) {
    justify-content: center;
  }

  img {
    max-height: 520px;
    object-fit: cover;
  }
`
const BannerImage = styled.img`
  z-index: 1;
  width: 100%;
  min-height: 920px;

  @media (min-width: 640px) {
    min-height: 840px;
  }

  @media (min-width: 768px) {
    min-height: 820px;
  }

  @media (min-width: 1080px) {
    min-height: 580px;
  }

  @media (min-width: 1200px) {
    min-height: 550px;
  }
`

const HeaderContainer = styled(Flex)`
  position: absolute;
  margin: 48px 0 0;
  width: 100%;
  top: 0;
  z-index: 2;

  @media (min-width: 640px) {
    margin: 60px 0 0;
  }

  @media (min-width: 968px) {
    margin: 60px 0 0;
    padding: 0 8px;
  }

  @media (min-width: 1080px) {
    margin: 60px 0 0;
  }

  @media (min-width: 1500px) {
    max-width: 1200px;
    min-width: 1200px;
    margin: 80px 24px 0;
  }

  @media (min-width: 1720px) {
    margin: 80px 64px 0;
  }

  @media (min-width: 2400px) {
    margin: 80px 64px 0;
  }
`

export default Launchpad
