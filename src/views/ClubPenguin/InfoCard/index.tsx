import React from 'react'
import styled from 'styled-components'
import { Image, Text, Flex, Button } from 'penguinfinance-uikit2'
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
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  padding: 24px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: ${({ theme }) => theme.colors.red};

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

const CardHeader = styled.div``

const LogoWrapper = styled(Flex)`
  img {
    height: 90px;
  }
`

const CardContent = styled.div`
  margin-top: 36px;
`

const ButtonActions = styled(Flex)`
  flex-direction: row;
  margin-top: 16px;

  @media (min-width: 640px) {
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
  }
`

export default InfoCard
