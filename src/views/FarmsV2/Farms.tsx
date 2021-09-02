import React, { useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { SECONDS_PER_WEEK, WEEKS_PER_YEAR, PEFI_POOL_PID } from 'config'
import Page from 'components/layout/Page'
import { usePefiPerBlock, useFarms, useV2Farms, usePriceAvaxUsdt, usePricePefiUsdt, usePriceEthUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
// import tokenList from 'https://github.com/pangolindex/tokenlists/blob/main/defi.tokenlist.json'
import FarmTable from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const pefiPerBlock = usePefiPerBlock()
  const v2FarmsLP = useV2Farms()
  // const v2FarmsLP = useFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const { account } = useWeb3React()
  const ethPriceUsd = usePriceEthUsdt()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchV2FarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const activeFarms = v2FarmsLP.filter((farm) => farm.type === 'Penguin' && farm.multiplier !== '0X')

  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const pefiPriceVsAVAX = new BigNumber(
        v2FarmsLP.find((farm) => farm.pid === PEFI_POOL_PID)?.tokenPriceVsQuote || 0,
      )
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        // const pefiRewardPerSec = pefiPerBlock.times(farm.poolWeight)
        const pefiRewardPerSec = new BigNumber(1)
        const rewardPerWeek = pefiRewardPerSec.times(SECONDS_PER_WEEK)

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
            farm && pefiPriceVsAVAX.times(pefiRewardPerSec).times(SECONDS_PER_WEEK).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(SECONDS_PER_WEEK)
              .div(farm.lpTotalInQuoteToken)

          apy = pefiApy && dualApy && pefiApy.plus(dualApy)
        }

        return { ...farm, apy }
      })

      return (
        <FarmTable
          data={farmsToDisplayWithAPY.map((farm) => ({
            farm,
            removed,
            avaxPrice,
            pefiPrice,
            ethPrice: ethPriceUsd,
          }))}
        />
      )
    },
    [v2FarmsLP, avaxPrice, ethPriceUsd, pefiPrice],
  )

  return (
    <FarmPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <IgloosBannerContainer>
        <BannerImage src={`${process.env.PUBLIC_URL}/images/farms/IglooHeader.gif`} alt="igloos banner" />
      </IgloosBannerContainer>
      <IgloosContentContainer>
        <Route exact path={`${path}`}>
          {farmsList(activeFarms, false)}
        </Route>
      </IgloosContentContainer>
    </FarmPage>
  )
}

const FarmPage = styled(Page)`
  max-width: 1200px;
`

// bg
const IgloosBgContainer = styled.div`
  background-image: url('/images/farms/igloo_background_${({ theme }) => (theme.isDark ? 'dark' : 'Light')}.png');
  background-repeat: repeat;
  background-size: contain;
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
  margin-bottom: 24px;

  @media (min-width: 640px) {
    margin-bottom: 64px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
`

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

export default Farms
