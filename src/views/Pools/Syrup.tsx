import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button } from 'penguinfinance-uikit2'
import { SECONDS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import priceToBnb from 'utils/priceToBnb'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax, useNestApy } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import Page from 'components/layout/Page'
import NestCard from './components/NestCard'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const displayedNestApy = (useNestApy() * 100).toFixed(2)
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is AVAX
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

  return (
    <Page>
      <NestBannerContainer>
        <StyledCard>
          <Flex justifyContent='center' alignItems='center'>
            <Title bold>THE NEST</Title>
          </Flex>
        </StyledCard>
      </NestBannerContainer>
      <Flex justifyContent='center'>
        <NestDetailsContainer>
          <Text color='primary' mb='12px' fontSize='24px' bold>Maximize yield by staking PEFI for xPEFI</Text>      
          <NestDescription mb='24px'>PEFI is minted & collected from fees witin the Penguin Ecosystem and sent to the Penguin Nest (xPEFI holders). When your PEFI is staked into the Penguin Nest, you receive xPEFI, granting access to exclusive dApps within Penguin Finance. Your xPEFI is continously compounding, when you unstake you will receive all the orginally deposited PEFI and any earned PEFI minus the paper hands penalty (PPL).</NestDescription>
          <APYCard padding='8px 24px 16px' mb='16px'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Text fontSize='20px' color='white' fontWeight={500}>Staking APY</Text>
              <Text fontSize='36px' color='white'>{getNumberWithCommas(displayedNestApy)}%</Text>
            </Flex>
            <Flex justifyContent='space-between' alignItems='center'>
              <ViewStatsButton scale='sm'>View Stats</ViewStatsButton>
              <APYLabel>Yesterday&apos;s APY</APYLabel>
            </Flex>
          </APYCard>
          <Route exact path={`${path}`}>
            <>
              {orderBy(openPools, ['sortOrder']).map((pool) => (
                <NestCard isNestPage key={pool.sousId} pool={pool} isMainPool />
              ))}
            </>
          </Route>
          <Route path={`${path}/history`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool) => (
              <NestCard isNestPage key={pool.sousId} pool={pool} isMainPool />
            ))}
          </Route>
        </NestDetailsContainer>
      </Flex>
    </Page>
  )
}

const NestBannerContainer = styled.div`
  margin-bottom: 32px;
`

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.isDark ? '#30264F' : theme.colors.secondary};
  border-radius: 8px;
`

const APYCard = styled(Card)`
  background: ${({ theme }) => theme.isDark ? '#30264F' : theme.colors.secondary};
  border-radius: 8px;
  max-width: 480px;
`

const Title = styled(Text)`
  color: white;
  font-weight: 800;
  font-size: 64px;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 84px;
  }
`;

const NestDetailsContainer = styled.div`
  max-width: 720px;
  width: 100%;
`;

const NestDescription = styled(Text)`
  max-width: 480px;
  color: ${({ theme }) => theme.isDark ? '#DDD7ff' : theme.colors.secondary};
`;

const ViewStatsButton = styled(Button)`
  background: white;
  border-radius: 4px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
`;

const APYLabel = styled(Text)`
  color: #DDD7FF;
  font-weight: 400;
`;

export default Farm
