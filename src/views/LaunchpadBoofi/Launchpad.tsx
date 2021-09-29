import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Button, Flex } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import StakeCard from './StakeCard/StakeCard'
import TiersCard from './TiersCard/TiersCard'
import PhaseCard from './PhaseCard'
import SherpaCard from './SherpaCard'

const Launchpad: React.FC = () => {
  const [launchStage] = useState(3)
  const { isDark } = useTheme()

  const onClickLaunchToken = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdgM5oq-3shkNQeEhTGHP-JDiRY6Y3URaGnKCf6QVt4qSJVMA/viewform',
      '_blank',
    )
  }

  return (
    <LaunchpadPage>
      <LaunchpadBgContainer />
      <LaunchpadBannerContainer>
        <BannerImage
          src={
            isDark
              ? `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_dark.gif`
              : `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_light.gif`
          }
          alt="launchpad banner"
        />
      </LaunchpadBannerContainer>
      <UpcomingOfferContainer>
        <UpcomingOfferLabel fontWeight={500} fontSize="24px">
          Upcoming Offerings
        </UpcomingOfferLabel>
        <PhaseCard launchStage={launchStage} />
        {launchStage === 1 && (
          <Flex justifyContent="center">
            <MigrationVideo controls>
              <source src="/images/launchpad/boofi-launchpad.mp4" />
            </MigrationVideo>
          </Flex>
        )}
        {launchStage === 2 && (
          <Flex justifyContent="space-between" flexWrap="wrap">
            <TiersCard />
            <StakeCard />
          </Flex>
        )}
      </UpcomingOfferContainer>
      <EndedOfferContainer>
        <EndedOfferLabel fontWeight={500} fontSize="24px" mt="32px">
          Ended
        </EndedOfferLabel>
        <SherpaCard />
      </EndedOfferContainer>
      <FCard>
        <Description textAlign="center">
          The Penguin Launchpad is a fundraising platform built on Avalanche with fairness, decentralization, and
          transparency as core principles. By utilizing iPEFI, we ensure that your token is distributed to a vast and
          committed userbase with thorough DeFi experience.
        </Description>
        <Flex justifyContent="center" mt="32px">
          <NormalButton scale="sm" onClick={onClickLaunchToken}>
            Launch Your Project To Orbit
          </NormalButton>
        </Flex>
      </FCard>
    </LaunchpadPage>
  )
}

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
`

const LaunchpadBgContainer = styled.div`
  background-image: url(/images/launchpad/launchpad_background.png);
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

// banner
const LaunchpadBannerContainer = styled.div`
  margin-bottom: 32px;

  @media (min-width: 1200px) {
    margin-bottom: 60px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 24px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  position: relative;
  padding: 32px 24px;
  margin-top: 16px;

  span {
    color: ${({ theme }) => theme.colors.success};
    font-weight: bold;
  }
`

const Description = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
  font-weight: 500;
`

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 40px;
  height: 40px;
  color: white;
  background: #ea3e3f;
`

// upcoming offer
const UpcomingOfferContainer = styled.div``

const UpcomingOfferLabel = styled(Text)`
  color: #38db93;
`

const EndedOfferContainer = styled.div``

const EndedOfferLabel = styled(Text)`
  color: #f24e4d;
`

const MigrationVideo = styled.video`
  width: 100%;
  border-radius: 16px;
`

export default Launchpad
