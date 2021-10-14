import React from 'react'
import { Card, CardBody, Heading, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getPefiAddress } from 'utils/addressHelpers'
import {
  useV2FarmPefiPerSecond,
  useFarms,
  useV2Farms,
  usePriceAvaxUsdt,
  usePricePefiUsdt,
  usePriceEthUsdt,
  usePricePngUsdt,
  usePriceLinkUsdt,
  usePriceLydUsdt,
  useCompounderFarms,
} from 'state/hooks'
import { Pool } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import { PEFI_MAX_SUPPLY } from 'config'
import useTheme from 'hooks/useTheme'
import CardValue from './CardValue'

const StyledPefiStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => (theme.isDark ? '#272044' : '#342C6D')};
  border-radius: 26px;
  box-shadow: 0px 1px 8px rgb(0 0 0 / 24%);
`

const StyledHeading = styled(Heading)`
  color: white;
  font-weight: 800;

  @font-face {
    font-family: 'GothamUltra Font';
    src: url(${process.env.PUBLIC_URL}/fonts/GothamUltra.otf) format('truetype');
    font-display: swap;
  }
  font-family: 'GothamUltra Font';

  @media (min-width: 1200px) {
    font-size: 58px;
    line-height: 70px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0px;
  }
`

const StyledCardValue = styled(CardValue)`
  color: white;
  font-weight: 300;
  font-size: 14px;
  text-align: right;

  @font-face {
    font-family: 'Telegraf Bold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Bold.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf Bold Font';

  @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 25px;
  }
`

const StyledCardBody = styled(CardBody)`
  @media (min-width: 1200px) {
    padding: 24px 40px;
  }
`

const StyledText = styled(Text)`
  font-weight: 300;
  font-size: 14px;

  @font-face {
    font-family: 'Telegraf Regular Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Regular.ttf) format('truetype');
    font-display: swap;
  }
  font-family: 'Telegraf Regular Font';

  @media (min-width: 1200px) {
    font-size: 20px;
    line-height: 25px;
  }
`

interface PoolWithApy extends Pool {
  apy?: BigNumber
}

interface HarvestProps {
  v1Pool: PoolWithApy
  v2Pool: PoolWithApy
}

const PefiStats: React.FC<HarvestProps> = ({ v1Pool, v2Pool }) => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const pefiPerBlock = useV2FarmPefiPerSecond()
  const farmsLP = useFarms()
  const v2Farms = useV2Farms()
  const compounderFarms = useCompounderFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const ethPriceUsd = usePriceEthUsdt()
  const pngPriceUsd = usePricePngUsdt()
  const linkPriceUsd = usePriceLinkUsdt()
  const lydPriceUsd = usePriceLydUsdt()
  const { isDark } = useTheme()
  const iPefiToPefiRatio = v2Pool.currentExchangeRate || 1

  const getXPefiToPefiRatio = () => {
    return v1Pool.totalStaked && v1Pool.totalSupply
      ? new BigNumber(v1Pool.totalStaked).div(new BigNumber(v1Pool.totalSupply)).toNumber()
      : 1
  }

  const getTokenPrice = (tokenSymbol: string) => {
    if (tokenSymbol === QuoteToken.PEFI) return pefiPrice
    if (tokenSymbol === QuoteToken.AVAX) return avaxPrice
    if (tokenSymbol === QuoteToken.ETH) return ethPriceUsd
    return new BigNumber(1)
  }

  // calculate TVL in old farms
  const getFarmsTVL = () => {
    let igloosTVL = new BigNumber(0)
    farmsLP.map((farmLP) => {
      const farmQuoteTokenPrice = getTokenPrice(farmLP.quoteTokenSymbol)
      if (farmLP.quoteTokenAmount) {
        const iglooTVL = farmQuoteTokenPrice.times(new BigNumber(farmLP.quoteTokenAmount)).times(new BigNumber(2))
        if (iglooTVL) igloosTVL = igloosTVL.plus(iglooTVL)
      }
      return igloosTVL
    })
    return igloosTVL.toNumber()
  }

  // calculate TVL in v2 farms
  const getV2FarmsTVL = () => {
    let v2FarmTvl = 0
    v2Farms.map((farm) => {
      v2FarmTvl += farm.totalLiquidityInUsd || 0
      return farm
    })
    return v2FarmTvl
  }

  // calculate TVL in compounder farms
  const getCompounderFarmsTVL = () => {
    let compounderFarmsTVL = 0
    compounderFarms.map((compounderFarm) => {
      let totalValue = null
      if (!compounderFarm.lpTotalInQuoteToken) {
        totalValue = new BigNumber(0)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.AVAX) {
        totalValue = avaxPrice.times(compounderFarm.lpTotalInQuoteToken)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.PEFI) {
        totalValue = pefiPrice.times(compounderFarm.lpTotalInQuoteToken)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.ETH) {
        totalValue = ethPriceUsd.times(compounderFarm.lpTotalInQuoteToken)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.PNG) {
        totalValue = pngPriceUsd.times(compounderFarm.lpTotalInQuoteToken)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.LYD) {
        totalValue = lydPriceUsd.times(compounderFarm.lpTotalInQuoteToken)
      } else if (compounderFarm.quoteTokenSymbol === QuoteToken.LINK) {
        totalValue = linkPriceUsd.times(compounderFarm.lpTotalInQuoteToken)
      } else {
        totalValue = compounderFarm.lpTotalInQuoteToken
      }

      if (compounderFarm.strategyRatio) {
        compounderFarmsTVL += totalValue.times(compounderFarm.strategyRatio).toNumber()
      }

      return compounderFarm
    })
    return compounderFarmsTVL
  }

  // calculate TVL in v1 pefi nest
  const getV1NestTVL = () => {
    if (v1Pool.totalSupply) return getXPefiToPefiRatio() * pefiPrice.toNumber() * getBalanceNumber(v1Pool.totalSupply)
    return 0
  }

  // calculate TVL in v2 pefi nest
  const getV2NestTVL = () => {
    if (v2Pool.totalSupply) return iPefiToPefiRatio * pefiPrice.toNumber() * getBalanceNumber(v2Pool.totalSupply)
    return 0
  }

  // get pefi marketcap
  const getPefiMarketcap = () => {
    if (totalSupply) return pefiPrice.toNumber() * (getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance))
    return 0
  }

  const tvl = getFarmsTVL() + getV2FarmsTVL() + getCompounderFarmsTVL() + getV1NestTVL() + getV2NestTVL()
  const pefiMarketcap = getPefiMarketcap()
  const totalStakedBalanceInV1 = new BigNumber(v1Pool.totalStaked) || new BigNumber(0)
  const totalStakedBalanceInV2 = new BigNumber(v2Pool.totalStaked) || new BigNumber(0)
  const totalStakedBalance = totalStakedBalanceInV1.plus(totalStakedBalanceInV2)
  const burnedBalanceRatio = (100 * getBalanceNumber(burnedBalance)) / getBalanceNumber(totalSupply)
  const totalStakedBalanceRatio = (100 * getBalanceNumber(totalStakedBalance)) / getBalanceNumber(totalSupply)

  return (
    <StyledPefiStats>
      <StyledCardBody>
        <StyledHeading size="xl" mb="8px" color="primary">
          {TranslateString(534, 'PEFI Stats')}
        </StyledHeading>
        <Row>
          <StyledText color="white">{TranslateString(538, 'PEFI Market Capitalization:')}</StyledText>
          {pefiMarketcap && (
            <StyledCardValue fontSize="20px" prefix="$" bold={false} value={pefiMarketcap} updateInterval={30000} />
          )}
        </Row>
        <Row>
          <StyledText color="white">{TranslateString(536, 'Circulating PEFI Supply:')}</StyledText>
          {totalSupply && (
            <StyledCardValue
              fontSize="20px"
              suffix=" PEFI"
              bold={false}
              value={getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance)}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <StyledText color="white">{TranslateString(538, 'Total Value Locked:')}</StyledText>
          {tvl && (
            <StyledCardValue
              fontSize="20px"
              prefix="$"
              decimals={0}
              bold={false}
              value={tvl || 0}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <StyledText color="white">{TranslateString(538, 'Total PEFI Burned:')}</StyledText>
          {burnedBalance && (
            <StyledCardValue
              fontSize="20px"
              suffix={` PEFI (${burnedBalanceRatio.toFixed(0)}%)`}
              bold={false}
              value={getBalanceNumber(burnedBalance)}
              decimals={0}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <StyledText color="white">{TranslateString(538, 'Total PEFI Staked (iPEFI):')}</StyledText>
          {totalStakedBalance && (
            <StyledCardValue
              fontSize="20px"
              suffix={` PEFI (${totalStakedBalanceRatio.toFixed(0)}%)`}
              bold={false}
              decimals={0}
              value={getBalanceNumber(totalStakedBalance)}
              updateInterval={30000}
            />
          )}
        </Row>
        {/* <Row>
          <Text color="primary" fontSize="14px">
            {TranslateString(540, 'XPEFI to PEFI ratio:')}
          </Text>
          <CardValue color="textSubtle" fontSize="14px" decimals={3} value={xPefiToPefiRatio} updateInterval={30000} />
        </Row> */}
        <Row>
          <StyledText color="white">{TranslateString(540, 'PEFI Emission Rate:')}</StyledText>
          <StyledCardValue
            fontSize="20px"
            decimals={2}
            suffix=" PEFI/SECOND"
            bold={false}
            value={pefiPerBlock.toNumber()}
            updateInterval={30000}
          />
        </Row>
        {/* <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(540, 'Paper Hands Penalty:')}
          </Text>
          <CardValue color="textSubtle" fontSize="14px" decimals={2} suffix=" %" value={Number(handsOnPenalty)} updateInterval={30000} />
        </Row> */}
        <Row>
          <StyledText color="white">{TranslateString(538, 'Max PEFI Supply:')}</StyledText>
          <StyledCardValue fontSize="20px" suffix=" PEFI" bold={false} value={PEFI_MAX_SUPPLY} />
        </Row>
      </StyledCardBody>
    </StyledPefiStats>
  )
}

export default PefiStats
