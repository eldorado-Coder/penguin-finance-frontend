import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'penguinfinance-uikit2'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { usePefiPerBlock, useFarms, usePriceAvaxUsdt, useNestApy } from 'state/hooks'
import { PEFI_POOL_PID, SECONDS_PER_YEAR } from 'config'
import { getNumberWithCommas } from 'utils/formatBalance'

const StyledFarmCard = styled(Card)`
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100%;
  background: #d4444c;
  background: ${({ theme }) => theme.isDark && '#30264F'};

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  color: #ffffff;
`

const Text = styled(Heading)`
  color: #ffffff;
`

const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const pefiPerBlock = usePefiPerBlock()
  const farmsLP = useFarms()
  const avaxPrice = usePriceAvaxUsdt()
  const maxAPY = useRef(Number.MIN_VALUE)
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  const displayedNestApy = (useNestApy() * 100).toFixed(2)

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
        const pefiRewardPerBlock = pefiPerBlock.times(farm.poolWeight)
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
    [BLOCKS_PER_YEAR, pefiPerBlock, avaxPrice, farmsLP],
  )

  return (
    <StyledFarmCard>
      <CardBody>
        <Text size="md">Enjoy a comfy</Text>
        <CardMidContent color="primary">
          {displayedNestApy ? (
            `${getNumberWithCommas(displayedNestApy)}% APY`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Text size="md">by holding xPEFI</Text>
          {/* <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink> */}
        </Flex>
      </CardBody>
    </StyledFarmCard>
  )
}

export default EarnAPYCard
