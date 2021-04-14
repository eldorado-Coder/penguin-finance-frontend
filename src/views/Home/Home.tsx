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
import TotalPefiStakedNests from 'views/Home/components/TotalPefiStakedNests'
import PercentagePefiStakedNests from 'views/Home/components/PercentagePefiStakedNests'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import PoolCard from 'views/Pools/components/PoolCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { BLOCKS_PER_YEAR } from 'config'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax } from 'state/hooks'

const HomeBgImage = styled.img`
  position: sticky;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  width: 100%;
`

const Hero = styled.div`
  position: relative;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;
  height: 165px;

  h1 {
    color:white;
    font-weight: 500;
    font-size: 44px;
    margin-bottom: 10px;
    z-index: 1;
  }
  > div {
    color:white;
    z-index: 1;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: center center;
    height: 165px;
  }
`

const HeroBgImageContainer = styled.div`
  position: absolute;
`

const HeroBgImage = styled.img`
  z-index: -1;
`

const HeroLeftImage = styled.img`
  position: absolute;
  height: 190px;  
  left: -110px;
  top: 35px;
  z-index: 1;
`

const HeroRightImage = styled.img`
  position: absolute;
  height: 300px;
  top: -25px;
  right: -200px;
  z-index: 1;
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
    <>
      <Page>
        <Hero>
          <HeroBgImageContainer>
            <HeroBgImage
              src={`${process.env.PUBLIC_URL}/images/home/title-bg.png`}
              alt="astronaut"
            />
            <HeroLeftImage
              src={`${process.env.PUBLIC_URL}/images/home/PenguinAstronaut.gif`}
              alt="astronaut"
            />
            <HeroRightImage
              src={`${process.env.PUBLIC_URL}/images/home/penguin_astronauts.gif`}
              alt="astronaut"
            />
          </HeroBgImageContainer>
          <Heading as="h1" size="xl" mb="24px" color="primary">
            {TranslateString(576, 'Penguin Finance')}
          </Heading>
          <Text>{TranslateString(578, 'Built for Penguins, by Penguins.')}</Text>
        </Hero>
        <div>
          <Cards>
            <FarmStakingCard />
            <PefiStatsCardWrapper>
              <EarnAPYCard />
              <SpacingWrapper />
              <PercentagePefiStakedNests pool={pefiPool} />
              <SpacingWrapper />
              <TotalPefiStakedNests pool={pefiPool} />
            </PefiStatsCardWrapper>
            <PefiStats />
            {pefiPool && (
              <PoolCard pool={pefiPool} />
            )}
            <SpacingWrapper />
          </Cards>
        </div>
      </Page>
      <HomeBgImage
        src={`${process.env.PUBLIC_URL}/images/home/bg_mountains.png`}
        alt="astronaut"
      />
    </>
  )
}

export default Home
