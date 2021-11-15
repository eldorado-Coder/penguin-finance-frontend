import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'
import UpcomingIDOs from './components/UpcomingIDOs';
import CompletedIDOs from './components/CompletedIDOs';
import AcoomalatingSteps from './components/AcoomalatingSteps';

const Launchpad: React.FC = () => {
  return (
    <div>
      <IgloosBannerContainer justifyContent='center'>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/launchpad/launchpad-banner.png`}
          alt="launchpad banner"
        />
        <HeaderContainer>
          <HeaderTitle fontSize='48px' fontWeight={800} color='white' mb='8px'>THE FIRST & FAIREST LAUNCHPAD PROTOCOL ON THE AVALANCHE NETWORK</HeaderTitle>
          <Description fontSize='24px' lineHeight='31px' color='white'>Stake iPEFI and earn allocations to invest in top-tier projects.</Description>
          <Description fontSize='24px' lineHeight='31px' color='white'>No KYC required.</Description>
          <TopTierProjects mt='32px'>
            <img 
              src={`${process.env.PUBLIC_URL}/images/launchpad/top-tier-projects/apply-project.png`} 
              alt='apply-project' />
            <img 
              src={`${process.env.PUBLIC_URL}/images/launchpad/top-tier-projects/trader-joe.png`} 
              alt='trader-joe' />
            <img 
              src={`${process.env.PUBLIC_URL}/images/launchpad/top-tier-projects/pangolin.png`} 
              alt='pangolin' />
            <img 
              src={`${process.env.PUBLIC_URL}/images/launchpad/top-tier-projects/lydia.png`} 
              alt='lydia' />
          </TopTierProjects>
        </HeaderContainer>
      </IgloosBannerContainer>
      <LaunchpadPage>
        <LaunchpadBgContainer />
        <AcoomalatingSteps />
        <UpcomingIDOs />
        <CompletedIDOs />
      </LaunchpadPage>
    </div>
  )
}

const LaunchpadPage = styled(Page)`
  max-width: 1300px;
`

const LaunchpadBgContainer = styled.div`
  background-image: url(/images/launchpad/background.svg);
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
  background-color: ${({ theme }) => theme.isDark ? '#2e2152' : '#483692'};
`

// banner
const IgloosBannerContainer = styled(Flex)`
  margin-bottom: 32px;
  position: relative;
  justify-content: flex-start;

  @media (min-width: 1200px) {
    margin-bottom: 60px;
  }

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
  min-height: 400px;

  @media (min-width: 640px) {
    min-height: 320px;
  }

  @media (min-width: 968px) {
    min-height: 480px;
  }
`

const Description = styled(Text)`
  font-family: 'Fira Code';
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  @media (min-width: 968px) {
    font-size: 24px;
    line-height: 36px;
    text-align: left;
  }
`;

const HeaderTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  max-width: 1040px;

  @media (min-width: 968px) {
    font-size: 48px;
    line-height: 72px;
    text-align: left;
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  margin: 48px 16px 0;
  top: 0;
  z-index: 2;

  @media (min-width: 640px) {
    margin: 60px 32px 0;
  }

  @media (min-width: 968px) {
    margin: 60px 32px 0;
  }

  @media (min-width: 1300px) {
    min-width: 1236px;
    margin: 100px 64px 0;
  }
`;

const TopTierProjects = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  img {
    cursor: pointer;
    margin-right: 16px;
    margin-bottom: 16px;
    height: 40px;

    @media (min-width: 968px) {
      height: 64px;
    }

    @media (min-width: 1200px) {
      margin-right: 32px;
      margin-bottom: 32px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (min-width: 968px) {
    justify-content: flex-start;
  }
`;

export default Launchpad
