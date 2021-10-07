import React from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import InfoCard from './InfoCard'
import RewardCard from './RewardCard'
import StakeCard from './StakeCard/StakeCard'

const ClubPenguin: React.FC = () => {
  const { isDark } = useTheme()

  return (
    <ClubPenguinPage>
      <ClubPenguinBgContainer />
      <ClubPenguinBannerContainer>
        <BannerImage
          src={
            isDark
              ? `${process.env.PUBLIC_URL}/images/club/banners/club_banner_dark.svg`
              : `${process.env.PUBLIC_URL}/images/club/banners/club_banner_light.svg`
          }
          alt="club penguin banner"
        />
      </ClubPenguinBannerContainer>
      <ClubPenguinContent>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <InfoCard />
          <CardWrapper flexDirection="column">
            <RewardCard />
            <StakeCard />
          </CardWrapper>
        </Flex>
      </ClubPenguinContent>
    </ClubPenguinPage>
  )
}

const ClubPenguinPage = styled(Page)`
  max-width: 1200px;
`

const ClubPenguinBgContainer = styled.div`
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
const ClubPenguinBannerContainer = styled.div`
  margin-bottom: 32px;

  @media (min-width: 1200px) {
    margin-bottom: 60px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

// content
const ClubPenguinContent = styled.div``

const CardWrapper = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

export default ClubPenguin
