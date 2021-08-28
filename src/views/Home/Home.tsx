import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, BaseLayout, Flex } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import NestIglooV2Card from 'views/Home/components/NestIglooV2Card'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import PefiStats from 'views/Home/components/PefiStats'
import IglooCard from 'views/Home/components/IglooCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import PercentagePefiStakedNestV1 from 'views/Home/components/PercentagePefiStakedNestV1'
import PercentagePefiStakedNestV2 from 'views/Home/components/PercentagePefiStakedNestV2'
import V2PoolCard from 'views/Pools/components/V2PoolCard'
import { usePools, useV2Pools } from 'state/hooks'

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
    color: white;
    font-weight: 500;
    font-size: 44px;
    margin-bottom: 10px;
    z-index: 1;
  }
  > div {
    color: white;
    z-index: 1;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: center center;
    height: 165px;
  }
`

const HeroBgImageContainer = styled.div`
  position: absolute;
  width: 100%;
`

const HeroBgImage = styled.img`
  z-index: -1;
  object-fit: cover;
  min-height: 140px;
  border-radius: 20px;
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

const FarmStakingCardWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`

const PefiStatsCardWrapper = styled.div``

const SpacingWrapper = styled.div`
  height: 36px;
`

const PoolCardWrapper = styled.div`
  > div {
    > div {
      background: ${({ theme }) => theme.isDark && '#30264F'};
    }
  }
`

const HomeBgContainer = styled.div`
  background-image: url('/images/home/HomePageBackground.png');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const Home: React.FC = () => {
  const { account } = useWeb3React()
  const v2Pools = useV2Pools(account)
  // const AVAX_BLOCK_TIME = useBlockGenerationTime()
  // const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  // const farms = useFarms()
  // const avaxPriceUSD = usePriceAvaxUsdt()
  // const ethPriceBnb = usePriceEthAvax()

  const v2PoolsWithApy = v2Pools.map((pool) => {
    // const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    // const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    // const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is AVAX
    // const stakingTokenPriceInAVAX = new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    // const rewardTokenPriceInAVAX = priceToBnb(
    //   pool.tokenName,
    //   rewardTokenFarm?.tokenPriceVsQuote,
    //   rewardTokenFarm?.quoteTokenSymbol,
    //   avaxPriceUSD,
    // )

    // const totalRewardPricePerYear = rewardTokenPriceInAVAX.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInAVAX.times(getBalanceNumber(pool.totalStaked))
    // const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      apy: new BigNumber(0),
    }
  })
  const iPefiPool = v2PoolsWithApy.length > 0 ? v2PoolsWithApy[0] : null
  const { isDark } = useTheme()

  return (
    <>
      <Page>
        <Hero>
          <HeroBgImageContainer>
            <HeroBgImage
              src={`${process.env.PUBLIC_URL}/images/home/${isDark ? 'new_banner_dark.svg' : 'new_banner_light.svg'}`}
              alt="astronaut"
            />
          </HeroBgImageContainer>
        </Hero>
        <HomeBgContainer />
        <div>
          <Cards>
            <FarmStakingCardWrapper>
              <NestIglooV2Card />
              <FarmStakingCard />
            </FarmStakingCardWrapper>
            <PefiStatsCardWrapper>
              <IglooCard />
              <SpacingWrapper />
              <EarnAPYCard />
              <SpacingWrapper />
              {/* <PercentagePefiStakedNestV1 pool={xPefiPool} /> */}
              <PercentagePefiStakedNestV2 pool={iPefiPool} />
            </PefiStatsCardWrapper>
            {iPefiPool && (
              <PoolCardWrapper>
                <V2PoolCard pool={iPefiPool} isMainPool={false} isHomePage />
              </PoolCardWrapper>
            )}
            <PefiStats pool={iPefiPool} />
            <SpacingWrapper />
          </Cards>
        </div>
      </Page>
    </>
  )
}

export default Home
