import React from 'react'
import { Card, CardBody, Heading, Text } from '@penguinfinance/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
import { usePricePefiUsdt } from 'state/hooks'
import { Pool } from 'state/types'
import { BLOCKS_PER_YEAR, PEFI_PER_BLOCK, PEFI_POOL_PID } from 'config'
import CardValue from './CardValue'

const StyledPefiStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
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
  pool: PoolWithApy
}

const PefiStats: React.FC<HarvestProps> = ({ pool }) => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const pefiSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const pefiPriceUsd = usePricePefiUsdt()
  const pefiMarketcap = pefiPriceUsd.toNumber() * getBalanceNumber(totalSupply)

  const getXPefiToPefiRatio = () => {
    return pool.totalStaked && pool.totalSupply ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toJSON() : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio()

  return (
    <StyledPefiStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'PEFI Stats')}
        </Heading>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(536, 'Total PEFI Supply')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} />}
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(538, 'Total PEFI Burned')}</Text>
          {burnedBalance && <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} />}
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(538, 'Total TVL')}</Text>
          <CardValue fontSize="14px" value={265654.43} />
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(538, 'PEFI marketcap')}</Text>
          {pefiMarketcap && <CardValue fontSize="14px" value={pefiMarketcap} />}
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(540, 'XPEFI to PEFI ratio')}</Text>
          <CardValue fontSize="14px" decimals={2} value={Number(Number(xPefiToPefiRatio).toFixed(2))} />
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(540, 'PEFI/block')}</Text>
          <CardValue fontSize="14px" decimals={2} value={6.15} />
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(540, 'Paper Hands Penalty')}</Text>
          <Text fontSize="14px"><b>17.36%</b></Text>
        </Row>
      </CardBody>
    </StyledPefiStats>
  )
}

export default PefiStats
