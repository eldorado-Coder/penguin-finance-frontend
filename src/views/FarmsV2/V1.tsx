import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { SECONDS_PER_YEAR, WEEKS_PER_YEAR, PEFI_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import FarmCard from 'views/FarmsV2/V1/FarmCard'
import { usePefiPerBlock, useFarms, usePriceAvaxUsdt, usePricePefiUsdt, usePriceEthUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { Farm } from 'state/types'
import MigrationCard from './V1/MigrationCard'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  totalValue?: BigNumber
}

interface V1FarmProps {
  searchTerm: string
  showStakedOnly: boolean
  activeProjects: any[]
  sortType: string
}

const CustomLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 32px;
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
      max-width: 31.5%;
      width: 100%;
    }
  }
`

const V1Farms: React.FC<V1FarmProps> = ({ searchTerm, showStakedOnly, activeProjects, sortType }) => {
  const pefiPerBlock = usePefiPerBlock()
  const farmsLP = useFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const { account } = useWeb3React()
  const ethPriceUsd = usePriceEthUsdt()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))
  const BLOCKS_PER_WEEK = BLOCKS_PER_YEAR.div(new BigNumber(WEEKS_PER_YEAR))

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')

  const farms = useMemo(() => {
    const pefiPriceVsAVAX = new BigNumber(
      activeFarms.find((farm) => farm.pid === PEFI_POOL_PID)?.tokenPriceVsQuote || 0,
    )
    const farmsToDisplayWithAPY: FarmWithStakedValue[] = activeFarms.map((farm) => {
      if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        return farm
      }
      const pefiRewardPerBlock = pefiPerBlock.times(farm.poolWeight)
      const rewardPerWeek = pefiRewardPerBlock.times(BLOCKS_PER_WEEK)

      // pefiPriceInQuote * rewardPerWeek / lpTotalInQuoteToken
      let apy = pefiPriceVsAVAX.times(rewardPerWeek).div(farm.lpTotalInQuoteToken)

      if (farm.quoteTokenSymbol === QuoteToken.USDT || farm.quoteTokenSymbol === QuoteToken.UST) {
        apy = pefiPriceVsAVAX.times(rewardPerWeek).div(farm.lpTotalInQuoteToken).times(avaxPrice)
      } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
        apy = pefiPrice.div(ethPriceUsd).times(rewardPerWeek).div(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.PEFI) {
        apy = rewardPerWeek.div(farm.lpTotalInQuoteToken)
      } else if (farm.dual) {
        const pefiApy =
          farm && pefiPriceVsAVAX.times(pefiRewardPerBlock).times(BLOCKS_PER_WEEK).div(farm.lpTotalInQuoteToken)
        const dualApy =
          farm.tokenPriceVsQuote &&
          new BigNumber(farm.tokenPriceVsQuote)
            .times(farm.dual.rewardPerBlock)
            .times(BLOCKS_PER_WEEK)
            .div(farm.lpTotalInQuoteToken)

        apy = pefiApy && dualApy && pefiApy.plus(dualApy)
      }

      let totalValue = null
      if (!farm.lpTotalInQuoteToken) {
        totalValue = null
      } else if (farm.quoteTokenSymbol === QuoteToken.AVAX) {
        totalValue = avaxPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.PEFI) {
        totalValue = pefiPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
        totalValue = ethPriceUsd.times(farm.lpTotalInQuoteToken)
      } else {
        totalValue = farm.lpTotalInQuoteToken
      }

      return { ...farm, apy, totalValue }
    })

    let filteredFarms = [...farmsToDisplayWithAPY]

    // filter
    if (searchTerm) {
      filteredFarms = filteredFarms.filter((farm) => farm.lpSymbol.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (account && showStakedOnly) {
      filteredFarms = filteredFarms.filter((farm) => farm.userData && getBalanceNumber(farm.userData.stakedBalance) > 0)
    }
    filteredFarms = filteredFarms.filter((farm) => farm.type && activeProjects.includes(farm.type))

    // sort
    if (sortType === 'liquidity') {
      filteredFarms = filteredFarms.sort((a, b) => Number(b.totalValue) - Number(a.totalValue))
    }
    if (sortType === 'multiplier') {
      filteredFarms = filteredFarms.sort(
        (a, b) => Number(b.multiplier.replace('X', '')) - Number(a.multiplier.replace('X', '')),
      )
    }
    if (sortType === 'earned') {
      filteredFarms = filteredFarms.sort(
        (a, b) => getBalanceNumber(b.userData?.earnings) - getBalanceNumber(a.userData?.earnings),
      )
    }
    if (sortType === 'apr') {
      filteredFarms = filteredFarms.sort((a, b) => Number(b.apy) - Number(a.apy))
    }

    return filteredFarms
  }, [
    BLOCKS_PER_WEEK,
    pefiPerBlock,
    activeFarms,
    avaxPrice,
    ethPriceUsd,
    pefiPrice,
    searchTerm,
    account,
    showStakedOnly,
    sortType,
    activeProjects,
  ])

  return (
    <FarmsContainer>
      <FlexLayout>
        <MigrationCard />
        <CustomLayout>
          {farms.map((farm) => {
            return (
              <FarmCard
                key={farm.pid}
                farm={farm}
                removed={false}
                avaxPrice={avaxPrice}
                pefiPrice={pefiPrice}
                ethPrice={ethPriceUsd}
                account={account}
              />
            )
          })}
        </CustomLayout>
      </FlexLayout>
    </FarmsContainer>
  )
}

const FarmsContainer = styled.div`
  margin-top: 16px;
`

export default V1Farms
