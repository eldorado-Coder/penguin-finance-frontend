import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import Card from '../Card'

const InfoCard = () => {
  const handleLearnMore = () => {
    window.open(
      'https://penguin-finance.medium.com/penguin-launchpad-allocation-staking-for-boofi-is-live-728f17ceea6c',
      '_blank',
    )
  }

  const handleViewWebsite = () => {
    window.open('https://sherpa.cash/', '_blank')
  }

  return (
    <StyledCard>
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <LogoWrapper alignItems="center">
            <img src="/images/club/sherpa.png" alt="sherpa" />
          </LogoWrapper>
          <Flex flexDirection="column">
            <ButtonActions flexDirection="column">
              <StyledButton onClick={handleLearnMore}>Learn More</StyledButton>
              <StyledButton onClick={handleViewWebsite}>View Website</StyledButton>
            </ButtonActions>
          </Flex>
        </Flex>
      </CardHeader>
      <CardContent>
        <Text fontSize="18px" color="white">
          {`Sherpa Cash is an up-and-coming privacy protocol building on the Avalanche blockchain. By leveraging the Sherpa Cash protocol, users can anonimize transactions to better protect their privacy. `}
        </Text>
      </CardContent>
      <CardFooter>
        <SocialIconsWrapper>
          <a href="https://t.me/sherpa_cash" target="_blank" rel="noreferrer">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/telegram.svg`} width="100%" height="32px" />
          </a>
          <a href="https://discord.com/invite/8bWeGSB4Zx" target="_blank" rel="noreferrer">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/discord.svg`} width="100%" height="32px" />
          </a>
          <a href="https://twitter.com/sherpa_cash" target="_blank" rel="noreferrer">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/twitter.svg`} width="100%" height="32px" />
          </a>
          <a href="https://medium.com/sherpa-cash" target="_blank" rel="noreferrer">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/medium.svg`} width="100%" height="32px" />
          </a>
        </SocialIconsWrapper>
      </CardFooter>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  height: 100%;
  padding: 24px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: ${({ theme }) => theme.colors.red};

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 49%;
  }
`

const CardHeader = styled.div``

const LogoWrapper = styled(Flex)`
  img {
    height: 100px;
  }
`

const CardContent = styled.div`
  margin-top: 8px;
  margin-bottom: 60px;
`

const ButtonActions = styled(Flex)`
  flex-direction: row;
  margin-top: 16px;

  @media (min-width: 640px) {
    flex-direction: column;
    margin-top: 0;
  }

  @media (min-width: 1080px) {
    margin-top: 16px;
    flex-direction: row;
  }

  @media (min-width: 1200px) {
    flex-direction: column;
    margin-top: 0;
  }
`

const StyledButton = styled(Button)`
  height: 32px;
  background: white;
  color: ${({ theme }) => theme.colors.red};
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;

  @media (min-width: 640px) {
    font-size: 16px;
  }

  &:first-child {
    margin-right: 8px;

    @media (min-width: 640px) {
      margin-bottom: 8px;
      margin-right: 0;
    }

    @media (min-width: 1080px) {
      margin-right: 8px;
    }

    @media (min-width: 1200px) {
      margin-right: 0;
    }
  }
`

const CardFooter = styled.div``

const SocialIconsWrapper = styled(Flex)`
  justify-content: flex-end;
  a {
    margin: 0px 10px;
  }
  svg {
    fill: white;
    height: 40px;
    &:hover {
      opacity: 0.65;
    }
  }
`

export default InfoCard
