import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import SvgIcon from 'components/SvgIcon'
import Balance from 'components/Balance'
import {
  useBoofiLaunchpadTierHurdles,
  useBoofiLaunchpad,
  useBoofiBoosterRocket as useBoofiBoosterRocketStore,
} from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { TIERS, PRICE_PER_BOOFI } from '../utils'
import Card from '../Card'

const TiersCard = () => {
  const { account } = useWeb3React()
  const { stakedBalance: staked, yourPenguinTier, allocation } = useBoofiLaunchpad(account)
  const launchpadStaked = getBalanceNumber(new BigNumber(staked))
  const hasTier = launchpadStaked > 0
  const tierHurdles = useBoofiLaunchpadTierHurdles()
  const { tokensLeftToDistribute, totalTokensSold } = useBoofiBoosterRocketStore(account)

  const handleInfoIconClick = () => {
    window.open(
      'https://penguin-finance.medium.com/penguin-launchpad-allocation-staking-for-boofi-is-live-728f17ceea6c',
      '_blank',
    )
  }

  return (
    <StyledCard>
      <CardContent>
        <TierContent>
          <Wrapper justifyContent="space-between" alignItems="center">
            <Label fontSize="32px" bold mr="16px" lineHeight={1.2}>
              Tiers
            </Label>
            <InfoIconWrapper onClick={handleInfoIconClick}>
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/info.svg`} width="25px" height="25px" />
            </InfoIconWrapper>
          </Wrapper>
          <CurrentTiersWrapper flexDirection="column" alignItems="center">
            {TIERS.map((penguinTier, index) => (
              <Wrapper justifyContent="space-between" key={`label-${penguinTier.label}`}>
                <Text fontSize="18px" fontWeight={400} className={penguinTier.label.toLowerCase()}>
                  {penguinTier.label}
                </Text>
                <Text key={`value-${penguinTier}`} fontSize="18px" bold className={penguinTier.label.toLowerCase()}>
                  {`(+${tierHurdles[index]} iPEFI)`}
                </Text>
              </Wrapper>
            ))}
          </CurrentTiersWrapper>
          <Wrapper justifyContent="space-between">
            <Label textAlign="right">Your Stake:</Label>
            <Balance fontSize="16px" value={Math.floor(launchpadStaked * 100) / 100} decimals={2} />
          </Wrapper>
          <Wrapper justifyContent="space-between">
            <Label textAlign="right">Your Allocation:</Label>
            <Balance fontSize="16px" value={getBalanceNumber(new BigNumber(allocation))} decimals={2} suffix=" AP" />
          </Wrapper>
          <Wrapper justifyContent="space-between">
            <Label textAlign="right">Price per BOOFI:</Label>
            <Balance fontSize="16px" value={PRICE_PER_BOOFI[yourPenguinTier]} decimals={3} prefix="$" />
          </Wrapper>
          <Wrapper justifyContent="space-between">
            <Label textAlign="right">BOOFI remaining:</Label>
            <Balance fontSize="16px" value={tokensLeftToDistribute} decimals={2} />
          </Wrapper>
          <Wrapper justifyContent="space-between" mb="16px">
            <Label textAlign="right">BOOFI distributed:</Label>
            <Balance fontSize="16px" value={totalTokensSold} decimals={2} />
          </Wrapper>
        </TierContent>
        {hasTier ? (
          <TierWrapper>
            <img src={`${process.env.PUBLIC_URL}/images/launchpad/${TIERS[yourPenguinTier].label}.svg`} alt="my-tier" />
          </TierWrapper>
        ) : (
          <NoneTierWrapper>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/launchpad/boofi_none_tier.svg`}
              width="100%"
              height="20px"
            />
          </NoneTierWrapper>
        )}
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 49%;
  }
`

const CardContent = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  img {
    max-height: 260px;
    margin: 0 auto;

    @media (min-width: 640px) {
      margin: unset;
    }
  }

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const CurrentTiersWrapper = styled(Flex)`
  margin-bottom: 24px;
  margin-top: 16px;
  width: 100%;
  .reaper {
    color: #ffc200;
  }
  .ghoul {
    color: #55ff45;
  }
  .demonlord {
    color: #bc00d0;
  }
`

const TierContent = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    width: calc(100% - 216px);
    margin-right: 16px;
    min-width: 220px;
  }
`

const Wrapper = styled(Flex)`
  width: 100%;
`

const InfoIconWrapper = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
    }
  }
`

const Label = styled(Text)<{ minWidth?: number }>`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
`

const NoneTierWrapper = styled.div`
  margin-top: 32px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;

  svg {
    width: 100%;
    max-width: 200px;
    .none-tier-st1 {
      fill: ${({ theme }) => !theme.isDark && 'black!important'};
    }
    .none-tier-st3 {
      fill: ${({ theme }) => !theme.isDark && 'white!important'};
    }
  }
`

const TierWrapper = styled(Flex)`
  max-width: 200px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
  }
`

export default TiersCard
