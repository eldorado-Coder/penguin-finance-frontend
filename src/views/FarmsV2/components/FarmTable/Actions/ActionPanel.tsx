import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes, css } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Text, Button, Flex } from 'penguinfinance-uikit2'
import { WEEKS_PER_YEAR } from 'config'
import useAssets from 'hooks/useAssets'
import { useV2Harvest } from 'hooks/useV2Farm'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import roundDown from 'utils/roundDown'
import { usePricePefiUsdt, usePricePngUsdt, usePriceAvaxUsdt, useV2Pools } from 'state/hooks'
import useJoePrice from 'hooks/useJoePrice'
import useTokenPrice from 'hooks/useTokenPrice'

import { FarmCardProps } from '../../types'
import StakePanel from './StakePanel'
import AutoNesting from './AutoNesting'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 8px 0;
  overflow: auto;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    padding: 8px 8px 0;
  }
`

const ActionCard = styled(Card)<{ minWidth?: number }>`
  border-radius: 16px;
  overflow: unset;
  min-width: ${({ minWidth }) => minWidth && `${minWidth}px`};
  box-shadow: 0px 2px 8px rgb(0 0 0 / 16%);
`

const EarningsCard = styled(ActionCard)`
  min-width: 240px;
  margin-right: 0;

  img {
    display: block;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-right: 16px;

    img {
      display: none;
    }
  }

  @media (min-width: 1410px) {
    min-width: 300px;

    img {
      display: block;
    }
  }
`

const StakeCard = styled(ActionCard)`
  margin-right: 0;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-right: 16px;
  }
`

const PendingRewardsCard = styled(ActionCard)`
  @media (min-width: 1350px) {
    min-width: 460px;
  }
`

const PendingRewardsContent = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-around;
`

const RewardImage = styled.img<{ size: number; ml?: number; borderRadius?: string; mt?: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin: 0px 12px;
  margin-left: ${({ ml }) => ml && `${ml}px`};
  margin-top: ${({ mt }) => mt && `${mt}px`};
  border-radius: ${({ borderRadius }) => borderRadius};
`
const CoinImage = styled.img<{ size: number; ml?: number; mt?: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  margin: 0px 12px;
  margin-left: ${({ ml }) => ml && `${ml}px`};
  margin-top: ${({ mt }) => mt && `${mt}px`};
`

const StyledButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  border-radius: 10px;
  height: 38px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;

  img {
    margin-left: 8px;
  }
`

const EarningsWrapper = styled(Flex)`
  height: 49%;
`

const EarningsContainer = styled.div`
  min-width: 160px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.background : '#e8e4ef')};
  height: 3px;
  width: 100%;
`

const Label = styled(Text)`
  white-space: nowrap;
`

const StyledBalance = styled(Balance)`
  margin: auto !important;
  white-space: nowrap;
`

const UsdBalanceWrapper = styled.div`
  div {
    color: ${({ theme }) => (theme.isDark ? '#b2b2ce' : theme.colors.textDisabled)};
  }
`

const BalanceWrapper = styled.div`
  div {
    white-space: nowrap;
    span {
      margin-right: 2px;
    }
  }
`

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
`

const COIN_LIST = [
  { src: '/images/farms-v2/coins/coin1.svg', min: 0 },
  { src: '/images/farms-v2/coins/coin2.svg', min: 100 },
  { src: '/images/farms-v2/coins/coin3.svg', min: 300 },
  { src: '/images/farms-v2/coins/coin4.svg', min: 1000 },
  { src: '/images/farms-v2/coins/coin5.svg', min: 2000 },
  { src: '/images/farms-v2/coins/coin6.svg', min: 9000 },
  { src: '/images/farms-v2/coins/coin7.svg', min: 20000 },
]

const getCoinImage = (amount) => {
  let coinImg
  COIN_LIST.map((row) => {
    if (amount >= row.min) {
      coinImg = row.src
    }
    return row
  })
  return coinImg || COIN_LIST[0].src
}

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({ farm, lpPrice, expanded }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { getTokenLogo } = useAssets()
  const { onHarvest } = useV2Harvest(farm.pid)
  const { account } = useWeb3React()
  const v2Pools = useV2Pools(account)
  const v2Nest = v2Pools.length > 0 ? v2Pools[0] : null

  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const pngPriceUsd = usePricePngUsdt().toNumber()
  const joePriceUsd = useJoePrice()
  const avaxPriceUsd = usePriceAvaxUsdt().toNumber()
  const { lydPrice: lydPriceUsd, sushiPrice: sushiPriceUsd, qiPrice: qiPriceUsd } = useTokenPrice()
  const iPefiToPefiRatio = v2Nest.currentExchangeRate || 1
  const iPefiPriceUsd = iPefiToPefiRatio * pefiPriceUsd

  const { pendingTokens, userData, maxBips: maxAutoNestAllocation } = farm
  const userPendingTokens = userData ? userData.userPendingTokens : []
  const userShares = userData ? getBalanceNumber(userData.userShares) : 0
  const userStakedBalance = userData ? getBalanceNumber(userData.stakedBalance) : 0
  const userStakedBalanceInUsd = userData ? userStakedBalance * lpPrice : 0
  const userAutoNestingAllocation = userData ? userData.userIpefiDistributionBips : 0

  const totalShares = getBalanceNumber(farm.totalShares)
  const totalLp = getBalanceNumber(farm.totalLp)
  const liquidity = totalLp ? totalLp * lpPrice : 0

  const userSharePercentage = totalShares > 0 ? (100 * userShares) / totalShares : 0
  const pefiPerYear = getBalanceNumber(farm.pefiPerYear)
  const pefiPerWeek = pefiPerYear / WEEKS_PER_YEAR

  const farmApr = farm.apr ? (100 * Number(farm.apr)).toFixed(2) : 0
  const lpSymbol = farm.lpSymbol.replaceAll(' LP', '')
  const coinImg = getCoinImage(Number(userStakedBalanceInUsd))

  const onClickHarvest = async () => {
    setPendingTx(true)
    try {
      await onHarvest()
      setPendingTx(false)
    } catch (error) {
      setPendingTx(false)
    }
  }

  const getTokenPrice = (address) => {
    const rewardToken = tokens.find((row) => getAddress(row.address).toLowerCase() === address.toLowerCase())
    if (rewardToken && rewardToken.symbol === 'PEFI') return pefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'iPEFI') return iPefiPriceUsd
    if (rewardToken && rewardToken.symbol === 'PNG') return pngPriceUsd
    if (rewardToken && rewardToken.symbol === 'JOE') return joePriceUsd
    if (rewardToken && rewardToken.symbol === 'LYD') return lydPriceUsd
    if (rewardToken && rewardToken.symbol === 'Sushi.e') return sushiPriceUsd
    if (rewardToken && rewardToken.symbol === 'QI') return qiPriceUsd
    if (rewardToken && rewardToken.symbol === 'AVAX') return avaxPriceUsd
    return 1
  }

  const lpDecimals = farm.displayedDecimals || 2

  return (
    <Container expanded={expanded}>
      <StakeCard padding="20px" mb="16px" minWidth={300}>
        <StakePanel {...farm} />
      </StakeCard>
      <EarningsCard mb="16px">
        <EarningsWrapper padding="16px 16px 12px">
          <EarningsContainer>
            <Title fontSize="20px" bold>
              Your Stake
            </Title>
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix=""
              suffix={`${lpSymbol}`}
              isFlexWrap
              decimals={lpDecimals}
              // value={roundDown(Number(Number(userStakedBalance).toFixed(lpDecimals + 1)), lpDecimals)}
              value={roundDown(Number(userStakedBalance), lpDecimals)}
            />
            <UsdBalanceWrapper>
              <Balance fontSize="10px" fontWeight="400" prefix="$" value={Number(userStakedBalanceInUsd)} />
            </UsdBalanceWrapper>
            {userSharePercentage > 4 && (
              <Balance
                fontSize="14px"
                color="textSubtle"
                fontWeight="400"
                prefix=" "
                suffix="% of the Igloo"
                value={Number(userSharePercentage)}
              />
            )}
          </EarningsContainer>
          <CoinImage src={coinImg} alt="pefi-earning" size={80} />
        </EarningsWrapper>
        <Divider />
        <EarningsWrapper padding="12px 16px">
          <EarningsContainer>
            <Title fontSize="20px" bold>
              Igloo Stats
            </Title>
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="APR: "
              suffix="%"
              decimals={2}
              value={Number(farmApr)}
            />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="Liquidity: $"
              value={Number(liquidity)}
            />
            <Balance
              fontSize="14px"
              color="textSubtle"
              fontWeight="400"
              prefix="PEFI Per Week: "
              value={Number(pefiPerWeek)}
            />
          </EarningsContainer>
          <RewardImage
            src={`/images/farms-v2/pools/${lpSymbol.toLowerCase()}.svg`}
            alt="igloo-stats"
            size={72}
            mt={16}
          />
        </EarningsWrapper>
      </EarningsCard>
      <Flex className="pending-panel" flexDirection="column" mb="16px">
        <PendingRewardsCard padding="10px 16px">
          <PendingRewardsContent>
            <Flex alignItems="center" justifyContent="space-around" mr="16px">
              {pendingTokens &&
                pendingTokens.map((pendingToken) => {
                  const rewardTokenInfo = userPendingTokens.find((row) => row.address === pendingToken)
                  const amount = rewardTokenInfo ? Number(rewardTokenInfo.amount) : 0
                  const amountInUsd = getTokenPrice(pendingToken) * amount

                  return (
                    <Flex flexDirection="column" alignItems="center" mr="4px" ml="4px" key={pendingToken}>
                      <RewardImage src={getTokenLogo(pendingToken)} alt="penguin" size={50} borderRadius="50%" />
                      <BalanceWrapper>
                        <StyledBalance
                          fontSize="14px"
                          color="textSubtle"
                          fontWeight="400"
                          value={getBalanceNumber(new BigNumber(amount))}
                        />
                      </BalanceWrapper>
                      <UsdBalanceWrapper>
                        <Balance
                          fontSize="10px"
                          fontWeight="400"
                          prefix="$"
                          value={getBalanceNumber(new BigNumber(amountInUsd))}
                        />
                      </UsdBalanceWrapper>
                    </Flex>
                  )
                })}
            </Flex>
            <Flex flexDirection="column" justifyContent="space-between" pb="4px">
              <Label fontSize="20px" color="textSubtle" bold mt="4px">
                Pending Rewards
              </Label>
              <StyledButton
                color="primary"
                endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
                disabled={!account || pendingTx}
                onClick={onClickHarvest}
              >
                {pendingTx ? 'Pending...' : 'Harvest'}
              </StyledButton>
            </Flex>
          </PendingRewardsContent>
        </PendingRewardsCard>
        <ActionCard padding="12px 16px" mt="16px">
          <AutoNesting
            currentAllocation={account ? userAutoNestingAllocation : (maxAutoNestAllocation * 50) / 100}
            maxAllocation={maxAutoNestAllocation}
          />
        </ActionCard>
      </Flex>
    </Container>
  )
}

export default ActionPanel
