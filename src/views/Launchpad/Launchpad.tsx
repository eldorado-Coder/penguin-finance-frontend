import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Flex } from 'penguinfinance-uikit2';
import { SECONDS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import priceToBnb from 'utils/priceToBnb'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PoolCard from './components/PoolCard'
import YourTierCard from './components/YourTierCard';
import SherpaCard from './components/SherpaCard'

const Launchpad: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
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

  const handleSwitchTab = tab => {
    setActiveTab(tab);
  };

  return (
    <FarmPage>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <Flex justifyContent='center' pb='32px'>
        <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
          <OptionItem>Next</OptionItem>
          <OptionItem>Past</OptionItem>
        </ButtonMenu>
      </Flex>
      <CardLayout>
        <SherpaCard />
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
          </>
        </Route>
        <YourTierCard />
      </CardLayout>
    </FarmPage>
  )
}

const FarmPage = styled(Page)`
  max-width: 1200px;
`

// banner
const IgloosBannerContainer = styled.div`
  margin-bottom: 32px;
`
const BannerImage = styled.img`
  z-index: -1;
`

const OptionItem = styled(ButtonMenuItem)`
  min-width: 100px;
`;

const CardLayout = styled(FlexLayout)`
  & > * {
    margin: 0 8px;
    margin-bottom: 32px;
    width: 100%;

    @media (min-width: 640px) {
      min-width: 320px;
      max-width: 50%;
      width: unset;
    }
    @media (min-width: 768px) {
      min-width: 320px;
      // max-width: 31.5%;
      max-width: 340px;
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    justify-content: space-around;
  }
  @media (min-width: 1450px) {
    justify-content: space-between;
  }
`

export default Launchpad
