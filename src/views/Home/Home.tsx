import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { BaseLayout, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import NestIglooV2Card from 'views/Home/components/NestIglooV2Card'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import PefiStats from 'views/Home/components/PefiStats'
import IglooCard from 'views/Home/components/IglooCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import PercentagePefiStakedNestV2 from 'views/Home/components/PercentagePefiStakedNestV2'
import V2PoolCard from 'views/Pools/components/V2PoolCard'
import { usePools, useV2Pools } from 'state/hooks'

const Hero = styled.div<{ isMobile?: boolean }>`
  position: relative;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: ${({ isMobile }) => (!isMobile ? '32px' : '16px')};
  text-align: center;
  height: ${({ isMobile }) => (!isMobile ? '165px' : '70px')};

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
  const { isDark } = useTheme()

  return (
    <>
      <Page>
        <Hero isMobile={isMobile}>
          <HeroBgImageContainer>
            <HeroBgImage
              isMobile={isMobile}
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
              <EarnAPYCard apy={iPefiPool.apy} />
              <SpacingWrapper />
              <PercentagePefiStakedNestV2 pool={iPefiPool} />
            </PefiStatsCardWrapper>
            {iPefiPool && (
              <PoolCardWrapper>
                <V2PoolCard pool={iPefiPool} isMainPool={false} isHomePage />
              </PoolCardWrapper>
            )}
            <PefiStats v1Pool={xPefiPool} v2Pool={iPefiPool} />
            <SpacingWrapper />
          </Cards>
        </div>
      </Page>
    </>
  )
}

export default Home
