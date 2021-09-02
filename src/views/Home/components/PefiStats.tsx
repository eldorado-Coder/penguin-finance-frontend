import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardBody, Heading, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useXPefi } from 'hooks/useContract'
import { getPefiAddress } from 'utils/addressHelpers'
import {
  usePefiPerBlock,
  useFarms,
  usePriceAvaxUsdt,
  usePricePefiUsdt,
  usePriceEthUsdt,
  usePricePngUsdt,
  usePriceLinkUsdt,
  usePriceLydUsdt,
  useCompounderFarms,
  usePools,
} from 'state/hooks'
import { Pool } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import { PEFI_MAX_SUPPLY } from 'config'
import roundDown from 'utils/roundDown'
import useTheme from 'hooks/useTheme'
import CardValue from './CardValue'

const StyledPefiStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.isDark && '#30264F'};
`

const StyledHeading = styled(Heading)`
  font-weight: 800;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  v1Pool: PoolWithApy
  v2Pool: PoolWithApy
}

const PefiStats: React.FC<HarvestProps> = ({ v1Pool, v2Pool }) => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const pools = usePools(null)
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const xPefiContract = useXPefi()
  const pefiPerBlock = usePefiPerBlock()
  const farmsLP = useFarms()
  const compounderFarms = useCompounderFarms()
  const pefiPrice = usePricePefiUsdt()
  const avaxPrice = usePriceAvaxUsdt()
  const ethPriceUsd = usePriceEthUsdt()
  const pngPriceUsd = usePricePngUsdt()
  const linkPriceUsd = usePriceLinkUsdt()
  const lydPriceUsd = usePriceLydUsdt()
  const [handsOnPenalty, setHandsOnPenalty] = useState(0)
  const { isDark } = useTheme()

  const fetchEarlyWithdrawalFee = useCallback(async () => {
    const earlyWithdrawalFee = await xPefiContract.methods.earlyWithdrawalFee().call()
    const maxEarlyWithdrawalFee = await xPefiContract.methods.MAX_EARLY_WITHDRAW_FEE().call()
    const penalty = (earlyWithdrawalFee / maxEarlyWithdrawalFee) * 100
    setHandsOnPenalty(penalty)
  }, [xPefiContract])

  useEffect(() => {
    fetchEarlyWithdrawalFee()
  }, [fetchEarlyWithdrawalFee])

  const getXPefiToPefiRatio = () => {
    return v1Pool.totalStaked && v1Pool.totalSupply
      ? new BigNumber(v1Pool.totalStaked).div(new BigNumber(v1Pool.totalSupply)).toNumber()
      : 1
  }

  const getIPefiToPefiRatio = () => {
    return v2Pool.totalStaked && v2Pool.totalSupply
      ? new BigNumber(v2Pool.totalStaked).div(new BigNumber(v2Pool.totalSupply)).toNumber()
      : 1
  }

  const getTokenPrice = (tokenSymbol: string) => {
    if (tokenSymbol === QuoteToken.PEFI) return pefiPrice
    if (tokenSymbol === QuoteToken.AVAX) return avaxPrice
    if (tokenSymbol === QuoteToken.ETH) return ethPriceUsd
    return new BigNumber(1)
  }

  // calculate TVL in igloos
  const getIgloosTVL = () => {
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
    if (v2Pool.totalSupply) return getIPefiToPefiRatio() * pefiPrice.toNumber() * getBalanceNumber(v2Pool.totalSupply)
    return 0
  }

  // get pefi marketcap
  const getPefiMarketcap = () => {
    if (totalSupply) return pefiPrice.toNumber() * (getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance))
    return 0
  }

  const tvl = getIgloosTVL() + getCompounderFarmsTVL() + getV1NestTVL() + getV2NestTVL()
  const xPefiToPefiRatio = getXPefiToPefiRatio()
  const pefiMarketcap = getPefiMarketcap()
  const totalStakedBalanceInV1 = new BigNumber(v1Pool.totalStaked) || new BigNumber(0)
  const totalStakedBalanceInV2 = new BigNumber(v2Pool.totalStaked) || new BigNumber(0)
  const totalStakedBalance = totalStakedBalanceInV1.plus(totalStakedBalanceInV2)
  const burnedBalanceRatio = (100 * getBalanceNumber(burnedBalance)) / getBalanceNumber(totalSupply)
  const totalStakedBalanceRatio = (100 * getBalanceNumber(totalStakedBalance)) / getBalanceNumber(totalSupply)

  return (
    <StyledPefiStats>
      <CardBody>
        <StyledHeading size="xl" mb="24px" color="primary">
          {TranslateString(534, 'PEFI Stats')}
        </StyledHeading>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(538, 'PEFI Market Capitalization:')}
          </Text>
          {pefiMarketcap && (
            <CardValue
              color="textSubtle"
              fontSize="14px"
              prefix="$"
              bold={false}
              value={pefiMarketcap}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(536, 'Circulating PEFI Supply:')}
          </Text>
          {totalSupply && (
            <CardValue
              color="textSubtle"
              fontSize="14px"
              suffix=" PEFI"
              bold={false}
              value={getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance)}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(538, 'Total Value Locked:')}
          </Text>
          {tvl && (
            <CardValue
              color="textSubtle"
              fontSize="14px"
              prefix="$"
              decimals={0}
              bold={false}
              value={tvl || 0}
              updateInterval={30000}
            />
          )}
        </Row>
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(538, 'Total PEFI Burned:')}
          </Text>
          {burnedBalance && (
            <CardValue
              color="textSubtle"
              fontSize="14px"
              suffix={` PEFI (${burnedBalanceRatio.toFixed(0)}%)`}
              bold={false}
              value={getBalanceNumber(burnedBalance)}
              decimals={0}
              updateInterval={30000}
            />
          )}
        </Row>
        {/* <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(538, 'Total PEFI Staked (iPEFI):')}
          </Text>
          {burnedBalance && (
            <CardValue
              color="textSubtle"
              fontSize="14px"
              suffix={` PEFI (${totalStakedBalanceRatio.toFixed(0)}%)`}
              bold={false}
              decimals={0}
              value={getBalanceNumber(totalStakedBalance)}
              updateInterval={30000}
            />
          )}
        </Row> */}
        {/* <Row>
          <Text color="primary" fontSize="14px">
            {TranslateString(540, 'XPEFI to PEFI ratio:')}
          </Text>
          <CardValue color="textSubtle" fontSize="14px" decimals={3} value={xPefiToPefiRatio} updateInterval={30000} />
        </Row> */}
        <Row>
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(540, 'PEFI Emission Rate:')}
          </Text>
          <CardValue
            color="textSubtle"
            fontSize="14px"
            decimals={2}
            suffix=" PEFI/block"
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
          <Text bold color={isDark ? 'red' : 'textSubtle'} fontSize="14px">
            {TranslateString(538, 'Max PEFI Supply:')}
          </Text>
          <CardValue color="textSubtle" fontSize="14px" suffix=" PEFI" bold={false} value={PEFI_MAX_SUPPLY} />
        </Row>
      </CardBody>
    </StyledPefiStats>
  )
}

export default PefiStats
