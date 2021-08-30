import React, { useState, useCallback, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { SECONDS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import priceToBnb from 'utils/priceToBnb'
import useBlock from 'hooks/useBlock'
import useTokenBalance from 'hooks/useTokenBalance'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import useUserSetting from 'hooks/useUserSetting'
import { useV2NestContract } from 'hooks/useContract'
import { useFarms, usePriceAvaxUsdt, useV2Pools, usePriceEthAvax, useV2NestApy, useV2NestAprPerDay } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import { getFirstStakeTime } from 'subgraph/utils'
import { getPefiAddress } from 'utils/addressHelpers'
import roundDown from 'utils/roundDown'
import CardValue from 'components/CardValue'
import NestCard from './components/NestCard'

const NestV2: React.FC = () => {
  const [userFirstStakeTime, setUserFirstStakeTime] = useState(0)
  const [handsOnPenalty, setHandsOnPenalty] = useState(6)
  const { refreshRate } = useUserSetting()
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const farms = useFarms()
  // const pools = usePools(account)
  const pools = useV2Pools(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const iPefiContract = useV2NestContract()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const displayedNestApy = (useV2NestApy() * 100).toFixed(2)
  const displayedNestDailyApr = useV2NestAprPerDay().toFixed(2)
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // TODO: tmp mulitplier to support ETH farms. Will be removed after the price api
    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    const stakingTokenPriceInAVAX = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    const rewardTokenPriceInAVAX = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
      avaxPriceUSD,
    )

    const totalRewardPricePerYear = rewardTokenPriceInAVAX.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInAVAX.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  const fetchUserFirstStakeTime = useCallback(async () => {
    const firstStakeTime = await getFirstStakeTime(account)

    if (firstStakeTime) {
      setUserFirstStakeTime(firstStakeTime)
    } else {
      setUserFirstStakeTime(0)
    }
  }, [account])

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchUserFirstStakeTime()
    }, refreshRate)
    return () => clearInterval(refreshInterval)
  }, [account, refreshRate, fetchUserFirstStakeTime])

  const fetchHandsOnPenalty = useCallback(async () => {
    const perHandsPenalty = await iPefiContract.methods.paperHandsPenalty().call()
    setHandsOnPenalty(perHandsPenalty)
  }, [iPefiContract])

  const getXPefiToPefiRatio = () => {
    return openPools[0].totalStaked && openPools[0].totalSupply
      ? new BigNumber(openPools[0].totalStaked).div(new BigNumber(openPools[0].totalSupply)).toNumber()
      : 1
  }

  const handleLearnMore = () => {
    window.open('https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection', '_blank')
  }

  useEffect(() => {
    // fetchHandsOnPenalty()
  }, [fetchHandsOnPenalty])

  const xPefiToPefiRatio = getXPefiToPefiRatio()
  const stakedBalance = new BigNumber(openPools[0].userData?.stakedBalance || 0)
  const pefiBalance = useTokenBalance(getPefiAddress())

  return (
    <Flex justifyContent="center">
      <NestDetailsContainer>
        <NestCardsWrapper justifyContent="space-between">
          <LeftCardsContainer>
            <APYCard padding="8px 24px 16px" mb="16px">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" color="white" fontWeight={500}>
                  Staking APY
                </Text>
                <Text fontSize="36px" bold color="white">
                  {getNumberWithCommas(displayedNestApy)}%
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <ViewStatsButton scale="sm" onClick={handleLearnMore}>
                  Learn More
                </ViewStatsButton>
                <APYLabel>{`${Number(handsOnPenalty).toFixed(2)}% Paper Hands Penalty`}</APYLabel>
              </Flex>
            </APYCard>
            <Route exact path={`${path}`}>
              <>
                {orderBy(openPools, ['sortOrder']).map((pool) => (
                  <NestCard key={pool.sousId} pool={pool} isMainPool />
                ))}
              </>
            </Route>
            <Route path={`${path}/history`}>
              {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                <NestCard key={pool.sousId} pool={pool} isMainPool />
              ))}
            </Route>
          </LeftCardsContainer>
          <BalanceCard padding="16px 24px 32px" mb="16px">
            <Flex flexDirection={isMobile ? 'row' : 'column'} justifyContent='space-between'>
              <div>
                <BalanceLabel>Balance</BalanceLabel>
                <Flex mt="4px" alignItems="center">
                  <CardImage isMobile={isMobile} src="/images/pools/iPefi.svg" alt="ipefi logo" width={64} height={64} />
                  <Flex flexDirection="column">
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '22px' : "24px"}
                        value={roundDown(getBalanceNumber(stakedBalance), 2)}
                        decimals={2}
                        lineHeight="1"
                      />
                    </Balance>
                    <BalanceText fontSize={isMobile ? '18px' : "20px"} fontWeight={300} lineHeight="1.4">
                      iPEFI
                    </BalanceText>
                    <BalanceTextSmall>
                      <CardValue
                        className="balance"
                        fontSize="12px"
                        value={roundDown(xPefiToPefiRatio * getBalanceNumber(stakedBalance), 2)}
                        decimals={2}
                        lineHeight="1.2"
                        prefix="≈ "
                        suffix=" PEFI"
                      />
                    </BalanceTextSmall>
                  </Flex>
                </Flex>
              </div>
              <div>
                <BalanceLabel mt={!isMobile && "24px"}>Unstaked</BalanceLabel>
                <Flex mt="4px" alignItems="center">
                  <CardImage isMobile={isMobile} src="/images/penguin-finance-logo.svg" alt="penguin logo" width={64} height={64} />
                  <Flex flexDirection="column">
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '22px' : "24px"}
                        value={account ? roundDown(getBalanceNumber(pefiBalance), 2) : 0}
                        decimals={2}
                        lineHeight="1"
                      />
                    </Balance>
                    <BalanceText fontSize={isMobile ? '18px' : "20px"} fontWeight={300} lineHeight="1.4">
                      PEFI
                    </BalanceText>
                    <BalanceTextSmall>
                      <CardValue
                        className="balance"
                        fontSize="12px"
                        value={account ? roundDown(getBalanceNumber(pefiBalance) / xPefiToPefiRatio, 2) : 0}
                        decimals={2}
                        lineHeight="1.2"
                        prefix="≈ "
                        suffix=" iPEFI"
                      />
                    </BalanceTextSmall>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </BalanceCard>
        </NestCardsWrapper>
      </NestDetailsContainer>
    </Flex>
  )
}

const NestCardsWrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftCardsContainer = styled.div`
  width: 100%;
  margin-right: 16px;
`

const APYCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : theme.colors.secondary)};
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 460px;
  }
`

const BalanceCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : 'white')};
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 260px;
    width: 240px;
    margin-top: 0;
  }
`

const BalanceLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

const NestDetailsContainer = styled.div`
  max-width: 720px;
  width: 100%;
`

const ViewStatsButton = styled(Button)`
  background: white;
  border-radius: 4px;
  font-weight: 400;
  margin-right: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary};
`

const APYLabel = styled(Text)`
  color: #ddd7ff;
  font-weight: 400;
`

const CardImage = styled.img<{ isMobile ?: boolean }>`
  margin-right: ${({ isMobile }) => isMobile ? '8px' : '12px'};
  width: ${({ isMobile }) => isMobile ? '56px' : '72px'};
  height: ${({ isMobile }) => isMobile ? '56px' : '72px'};
`

const Balance = styled.div`
  .balance {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const BalanceText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  line-height: 1.2;
`

const BalanceTextSmall = styled.div`
  .balance {
    color: ${({ theme }) => (theme.isDark ? '#BBA6DD' : '#8F88A0')};
    font-weight: 400;
  }
`

export default NestV2
