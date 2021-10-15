import React from 'react'
import styled from 'styled-components'
import { Flex } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import UpcomingIcebergs from './UpcomingIcebergs'
import PreviousIcebergs from './PreviousIcebergs'
import VersoCard from './VersoCard'
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
        <Flex justifyContent="space-between" flexWrap="wrap">
          <VersoCard />
          <SherpaCard />
          <CardWrapper>
            {/* banner section */}
            <StyledImage src={`${process.env.PUBLIC_URL}/images/club/banners/club_penguin.jpg`} alt='club' />
          </CardWrapper>
          <CardWrapper>
            <SherpaStakeCard />
          </CardWrapper>
        </Flex>
        <UpcomingIcebergs />
        <PreviousIcebergs />
      </ClubPenguinContent>
    </ClubPenguinPage>
  )
};

const ClubPenguinPage = styled(Page)`
  max-width: 1200px;
`

const StyledImage = styled.img`
  margin-top: 16px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
`;

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
