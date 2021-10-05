import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { BaseLayout, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import ArtworkCard from 'views/Home/components/ArtworkCard'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import IglooCard from 'views/Home/components/IglooCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EmperorInfoCard from 'views/Home/components/EmperorInfoCard'
import PercentagePefiStakedNestV2 from 'views/Home/components/PercentagePefiStakedNestV2'
import V2PoolCard from 'views/Pools/components/V2PoolCard'
import PefiStats from 'views/Home/components/PefiStats'
import ComingSoonCard from 'views/Home/components/ComingSoonCard'
import { usePools, useV2Pools, usePricePefiUsdt } from 'state/hooks'

const Hero = styled.div<{ isMobile?: boolean }>`
  position: relative;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: ${({ isMobile }) => (!isMobile ? '40px' : '16px')};
  text-align: center;
  height: 80px;

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

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 180px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: center center;
    height: 200px;
  }
`

const HeroBgImageContainer = styled.div`
  position: absolute;
  width: 103%;
`

const HeroBgImage = styled.img<{ isMobile?: boolean }>`
  z-index: -1;
  object-fit: ${({ isMobile }) => !isMobile && 'cover'};
  min-height: ${({ isMobile }) => !isMobile && '140px'};
  border-radius: 20px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  grid-gap: 24px;

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
  height: 24px;
`

const PoolCardWrapper = styled.div`
  > div {
    > div {
      background: ${({ theme }) => theme.isDark && '#30264F'};
    }
  }
`

const HomeBgContainer = styled.div`
  background-image: ${({ theme }) =>
    theme.isDark ? `url('/images/home/home_background_dark.png')` : `url('/images/home/home_background_light.png')`};
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
  const v1Pools = usePools(account)
  const v2Pools = useV2Pools(account)
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const v1PoolsWithApy = v1Pools.map((pool) => {
    return {
      ...pool,
      apy: new BigNumber(0),
    }
  })

  const v2PoolsWithApy = v2Pools.map((pool) => {
    return {
      ...pool,
    }
  })
  const xPefiPool = v1PoolsWithApy.length > 0 ? v1PoolsWithApy[0] : null
  const iPefiPool = v2PoolsWithApy.length > 0 ? v2PoolsWithApy[0] : null
  const iPefiToPefiRatio = iPefiPool.currentExchangeRate || 1
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const iPefiPriceUsd = iPefiToPefiRatio * pefiPriceUsd
  const { isDark } = useTheme()

  return (
    <>
      <Page>
        <Hero isMobile={isMobile}>
          <HeroBgImageContainer>
            <HeroBgImage
              isMobile={isMobile}
              src={`${process.env.PUBLIC_URL}/images/home/${isDark ? 'banner_dark.svg' : 'banner_light.svg'}`}
              alt="astronaut"
            />
          </HeroBgImageContainer>
        </Hero>
        <HomeBgContainer />
        <div>
          <Cards>
            <FarmStakingCardWrapper>
              <ArtworkCard />
            </FarmStakingCardWrapper>
            <PefiStatsCardWrapper>
              <IglooCard />
              <SpacingWrapper />
              <EarnAPYCard apy={iPefiPool.apy} />
              {/* <EmperorInfoCard iPefiPrice={iPefiPriceUsd} /> */}
              {/* <PercentagePefiStakedNestV2 pool={iPefiPool} /> */}
            </PefiStatsCardWrapper>
            <FarmStakingCard />
            {iPefiPool && (
              <PoolCardWrapper>
                <V2PoolCard pool={iPefiPool} isMainPool={false} isHomePage />
              </PoolCardWrapper>
            )}
            <PefiStats v1Pool={xPefiPool} v2Pool={iPefiPool} />
            <ComingSoonCard />
            <SpacingWrapper />
          </Cards>
        </div>
      </Page>
    </>
  )
}

export default Home
