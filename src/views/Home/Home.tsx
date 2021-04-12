import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Heading, Text, BaseLayout, ArrowForwardIcon } from '@penguinfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import PefiStats from 'views/Home/components/PefiStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import PoolCard from 'views/Pools/components/PoolCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { BLOCKS_PER_YEAR } from 'config'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax } from 'state/hooks'


const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const PoolCardWrapper = styled.div`
  background: white;
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgb(25 19 38 / 10%), 0px 1px 1px rgb(20 19 38 / 5%);
  display: flex;

  > div:first-child {
    width: 80%;
    box-shadow: none;
  }
  > div:last-child {
    width: 20%;
  }
`

const PoolCardNavWrapper = styled.div`
  padding: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`
const PefiStatsCardWrapper = styled.div`
`

const SpacingWrapper = styled.div`
  height: 24px;
`


const Home: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const pools = usePools(account)
  const farms = useFarms()
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'AVAX') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.USDT) {
      return tokenPriceBN.div(avaxPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is AVAX
    const stakingTokenPriceInAVAX = new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    const rewardTokenPriceInAVAX = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )

    const totalRewardPricePerYear = rewardTokenPriceInAVAX.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInAVAX.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      apy: new BigNumber(0)
    }
  })
  const pefiPool = poolsWithApy.length > 0 ? poolsWithApy[0] : null

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="primary">
          {TranslateString(576, 'Penguin Finance')}
        </Heading>
        <Text>{TranslateString(578, 'The #1 Project on AVAX.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <PefiStatsCardWrapper>
            {pefiPool && (
              <PoolCard pool={pefiPool} />
            )}
            <SpacingWrapper />
            <PefiStats />
            {/* <EarnAssetCard /> */}
          </PefiStatsCardWrapper>
          <EarnAPYCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
