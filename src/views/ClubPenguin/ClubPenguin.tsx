import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import UpcomingIcebergs from './UpcomingIcebergs'
import PreviousIcebergs from './PreviousIcebergs'
import SherpaCard from './SherpaCard'
import SherpaStakeCard from './SherpaStakeCard/StakeCard'

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
        <StyledText fontSize="24px" fontWeight={500}>
          Current Iceberg
        </StyledText>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <SherpaCard />
          <CardWrapper flexDirection="column">
            <SherpaStakeCard />
          </CardWrapper>
        </Flex>
        <UpcomingIcebergs />
        <PreviousIcebergs />
      </ClubPenguinContent>
    </ClubPenguinPage>
  )
}

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.textSubtle : '#372b70')};
`

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
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 49%;
  }
`

export default ClubPenguin
