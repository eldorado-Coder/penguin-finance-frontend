import React, { useEffect, useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { Text } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { BLOCKS_PER_WEEK, PEFI_POOL_PID } from 'config'
import useTheme from 'hooks/useTheme';
import Page from 'components/layout/Page'
import { usePefiPerBlock, useFarms, usePriceAvaxUsdt, usePricePefiUsdt, usePriceEthUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import Select from 'components/Select/Select';
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'

//
const Igloos: React.FC = () => {
  const { path } = useRouteMatch()
  const pefiPerBlock = usePefiPerBlock()
  const farmsLP = useFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const { account } = useWeb3React()
  const ethPriceUsd = usePriceEthUsdt()
  const { isDark } = useTheme();

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
    [pefiPerBlock, farmsLP, avaxPrice, ethPriceUsd, pefiPrice, account],
  )

  return (
    <CompounderIglooPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <BannerImage
        src={`${process.env.PUBLIC_URL}/images/compounder-igloos/Compounder${isDark ? 'Night' : 'Day'}.gif`}
        alt="compounder igloos banner"
      />
      <CompounderContent>
        <FilterContainer>
          <LabelWrapper>
            <Text textTransform="uppercase">Sort by</Text>
            <Select options={[
              { label: 'Farm TVL', value: 'farm-tvl'},
              { label: 'APY', value: 'apy'}
            ]}/>
          </LabelWrapper>
        </FilterContainer>
        <IgloosContentContainer>
          <Route exact path={`${path}`}>
            {farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </IgloosContentContainer>
      </CompounderContent>
    </CompounderIglooPage>
  )
}

const CompounderIglooPage = styled(Page)`
  max-width: 1200px;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
`

// bg
const IgloosBgContainer = styled.div`
  background-image: url('/images/compounder-igloos/CompounderPattern.png');
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
  background: ${({ theme }) => theme.isDark ? '#1A1028' : '#F9F8F9'};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

// content
const IgloosContentContainer = styled.div`
  position: relative;
`

const FilterContainer = styled.div`
  margin-bottom: 1rem;
`;

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const CompounderContent = styled.div`
  padding: 0 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 40px;
  }
`;

export default Igloos
