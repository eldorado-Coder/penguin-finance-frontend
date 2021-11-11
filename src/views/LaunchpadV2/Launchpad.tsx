import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import SvgIcon from 'components/SvgIcon'
import UpcomingIDOs from './components/UpcomingIDOs';
import CompletedIDOs from './components/CompletedIDOs';
import AcoomalatingSteps from './components/AcoomalatingSteps';

const Launchpad: React.FC = () => {
  const { isDark } = useTheme()

  return (
    <div>
      <LaunchpadPage>
        <LaunchpadBgContainer />
        <IgloosBannerContainer>
          <BannerImage
            src={
              isDark
                ? `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_dark.gif`
                : `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_light.gif`
            }
            alt="launchpad banner"
          />
        </IgloosBannerContainer>
        <Flex flexDirection='column' alignItems='center'>
          <HeaderTitle fontSize='36px' fontWeight={500} lineHeight='54px' color='red' mb='8px'>The first and fairest fundraising protocol on the Avalanche Network.</HeaderTitle>
          <Description fontSize='24px' lineHeight='31px' color='white'>Stake iPEFI and earn allocations to invest in top-tier projects.</Description>
          <Description fontSize='24px' lineHeight='31px' color='white'>
            No KYC required. The Penguin Launchpad is built for all.
          </Description>
        </Flex>
        <AcoomalatingSteps />
        <UpcomingIDOs />
        <CompletedIDOs />
      </LaunchpadPage>
      <FooterImage
        src={`${process.env.PUBLIC_URL}/images/launchpad/penguin_bg.png`}
        alt='launchpad footer'
      />
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
const IgloosBannerContainer = styled.div`
  margin-bottom: 32px;

  @media (min-width: 1200px) {
    margin-bottom: 60px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const FooterImage = styled.img`
  width: 100%;
  margin-bottom: -8px;
  max-height: 340px;
  object-fit: cover;
`;

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

  @media (min-width: 968px) {
    font-size: 36px;
    line-height: 54px;
    text-align: left;
  }
`;

export default Launchpad
