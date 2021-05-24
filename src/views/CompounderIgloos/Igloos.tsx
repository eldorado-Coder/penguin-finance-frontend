import React, { useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { BLOCKS_PER_WEEK, PEFI_PER_BLOCK, PEFI_POOL_PID } from 'config'
import Page from 'components/layout/Page'
import { useFarms, usePriceAvaxUsdt, usePricePefiUsdt, usePriceEthUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'

//
const Igloos: React.FC = () => {
  const { path } = useRouteMatch()
  const farmsLP = useFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const { account } = useWeb3React()
  const ethPriceUsd = usePriceEthUsdt()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const pefiPriceVsAVAX = new BigNumber(farmsLP.find((farm) => farm.pid === PEFI_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const pefiRewardPerBlock = PEFI_PER_BLOCK.times(farm.poolWeight)
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

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm, index) => (
        <FarmCard
          key={farm.pid}
          index={index}
          farm={farm}
          removed={removed}
          avaxPrice={avaxPrice}
          pefiPrice={pefiPrice}
          ethPrice={ethPriceUsd}
          account={account}
        />
      ))
    },
    [farmsLP, avaxPrice, ethPriceUsd, pefiPrice, account],
  )

  return (
    <CompounderIglooPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/compounder-igloos/banner.png`}
          alt="compounder igloos banner"
        />
      </IgloosBannerContainer>
      <IgloosContentContainer>
        <Route exact path={`${path}`}>
          {farmsList(activeFarms, false)}
        </Route>
        <Route exact path={`${path}/history`}>
          {farmsList(inactiveFarms, true)}
        </Route>
      </IgloosContentContainer>
    </CompounderIglooPage>
  )
}

const CompounderIglooPage = styled(Page)`
  max-width: 1200px;
`

// bg
const IgloosBgContainer = styled.div`
  /* background-image: url('/images/farms/IglooBackground${({ theme }) => (theme.isDark ? 'Night' : 'Light')}.png'); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: -8px;
  bottom: -8px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const BgWrapper = styled.div`
  background: ${({ theme }) => !theme.isDark && '#EBEEF7'};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

// banner
const IgloosBannerContainer = styled.div`
  /* position: absolute; */
`

const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
  margin-bottom: 50px;
`

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

export default Igloos
