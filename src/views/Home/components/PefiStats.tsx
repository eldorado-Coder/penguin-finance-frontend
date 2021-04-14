import React from 'react'
import { Card, CardBody, Heading, Text } from '@penguinfinance/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getPefiAddress } from 'utils/addressHelpers'
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

const PefiStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getPefiAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledPefiStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'PEFI Stats')}
        </Heading>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(536, 'Total PEFI Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(538, 'Total PEFI Burned')}</Text>
          <Text fontSize="14px"><b>125,000+</b></Text>
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(540, 'PEFI/block')}</Text>
          <CardValue fontSize="14px" decimals={2} value={6.15} />
        </Row>
        <Row>
          <Text color="primary" fontSize="14px">{TranslateString(540, 'Paper Hands Penalty')}</Text>
          <Text fontSize="14px"><b>20.83%</b></Text>
        </Row>
      </CardBody>
    </StyledPefiStats>
  )
}

export default PefiStats
