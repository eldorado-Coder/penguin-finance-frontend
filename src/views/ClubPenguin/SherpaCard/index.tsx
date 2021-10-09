import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import CardValue from 'components/CardValue'
import Card from '../Card'
import CountDown from '../CountDown';

const InfoCard = ({ date }) => {
  const handleLearnMore = () => {
    window.open(
      'https://penguin-finance.medium.com/penguin-launchpad-allocation-staking-for-boofi-is-live-728f17ceea6c',
      '_blank',
    )
  }

  const handleViewWebsite = () => {
    window.open('https://app.sherpa.cash/', '_blank')
  }

  return (
    <StyledCard>
      <CardHeader>
        <Flex alignItems="flex-start" flexWrap="wrap" justifyContent='space-between'>
          <LogoWrapper mt='16px' mr='16px' alignItems="center">
            <img src="/images/club/sherpa_iceberg.svg" alt="sherpa" />
          </LogoWrapper>
          <SherpaIceberg>
            <Text fontSize='40px' color='white' fontWeight={600} lineHeight={1}>SHERPA ICEBERG</Text>
            <FlexContainer mt='32px' justifyContent='space-between'>
              <Flex className='col' flexDirection='column' alignItems='flex-start'>
                <Text fontSize='20px' color='white' fontWeight={700} lineHeight={1}>SHERPA EARNED</Text>
                <Text fontSize='22px' color='#00283f' fontWeight={600}>2358.38</Text>
                <BalanceTextSmall>
                  <CardValue
                    className="balance"
                    fontSize="12px"
                    value={57.58}
                    decimals={2}
                    lineHeight="1.2"
                    prefix="≈ $"
                  />
                </BalanceTextSmall>
              </Flex>
              <Flex className='col' flexDirection='column' alignItems='flex-start'>
                <Text fontSize='20px' color='white' fontWeight={700} lineHeight={1}>CURRENT APR</Text>
                <Text fontSize='22px' color='#00283f' fontWeight={600}>483.38%</Text>
                <BalanceTextSmall>
                  <CardValue
                    className="balance"
                    fontSize="12px"
                    value={10.06}
                    decimals={2}
                    lineHeight="1.2"
                    suffix='% per week'
                  />
                </BalanceTextSmall>
              </Flex>
            </FlexContainer>
            <FlexContainer mt='24px' justifyContent='space-between'>
              <Flex className='col'>
                <StyledButton
                  id="harvest-all"
                  endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
                  scale="md"
                >
                  Harvest All
                </StyledButton>
              </Flex>
              <Flex className='col' flexDirection='column' alignItems='flex-start'>
                <Text fontSize='20px' color='white' fontWeight={700} lineHeight={1}>STARTS IN</Text>
                <Text fontSize='22px' color='#00283f' fontWeight={400}>
                  <CountDown date={date} />
                </Text>
              </Flex>
            </FlexContainer>
          </SherpaIceberg>
        </Flex>
      </CardHeader>
      <CardContent>
        <Text fontWeight={400} fontSize="18px" color="white">
          Sherpa Cash is the first fully decentralized protocol for private transactions on Avalanche. The SHERPA token is the governance token for Sherpa Cash.
        </Text>
      </CardContent>
      <CardFooter justifyContent='space-between' alignItems='center'>
        <StyledButton onClick={handleViewWebsite}>Visit Website</StyledButton>
        <SocialIconsWrapper>
          <a href="https://t.me/sherpa_cash" target="_blank" rel="noreferrer">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/telegram.svg`} width="100%" height="32px" />
          </a>
          <a href="https://discord.gg/MGftjGKD" target="_blank" rel="noreferrer">
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
  padding: 32px 24px 34px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: #f24e4d;

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 49%;
  }
`

const CardHeader = styled.div``

const LogoWrapper = styled(Flex)`
  img {
    height: 140px;
  }
`

const CardContent = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
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
  height: 44px;
  background: #00283f;
  color: white;
  border-radius: 10px;
  font-weight: 700;
  white-space: nowrap;
  font-size: 16px;

  img {
    margin-left: 8px;
  }
`

const CardFooter = styled(Flex)``

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

const BalanceTextSmall = styled.div`
  .balance {
    color: white;
    font-weight: 400;
  }
`

const FlexContainer = styled(Flex)`
  .col {
    min-width: 140px;
  }
`;

const SherpaIceberg = styled.div`
  width: calc(100% - 170px);
`;

export default InfoCard
