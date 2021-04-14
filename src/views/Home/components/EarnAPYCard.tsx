import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@penguinfinance/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceAvaxUsdt } from 'state/hooks'
import { BLOCKS_PER_YEAR, PEFI_PER_BLOCK, PEFI_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/Big_Igloo_EarnUp.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 150px;

  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const avaxPrice = usePriceAvaxUsdt()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const pefiPriceVsAVAX = new BigNumber(farmsLP.find((farm) => farm.pid === PEFI_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const pefiRewardPerBlock = PEFI_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = pefiRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = pefiPriceVsAVAX.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.USDT) {
          apy = pefiPriceVsAVAX.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(avaxPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.PEFI) {
          apy = cakeRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const pefiApy =
            farm && pefiPriceVsAVAX.times(pefiRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = pefiApy && dualApy && pefiApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [avaxPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="md">
          Earn up to
        </Heading>
        <CardMidContent color="primary">
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APR')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="md">
            in Farms
          </Heading>
          {/* <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink> */}
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
