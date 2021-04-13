import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Card, CardBody, Heading, Skeleton, Text } from '@penguinfinance/uikit'
import Balance from 'components/Balance'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  background-image: url('/images/Big_Nest_Staked.svg');
  background-repeat: no-repeat;
  background-position: right;
  min-height: 150px;
  align-items: center;
  display: flex;
  flex: 1;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const TotalPefiStakedNests: React.FC<HarvestProps> = ({ pool }) => {
  const {
    totalStaked
  } = pool
  
  const TranslateString = useI18n()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Text color="subtle">
          {TranslateString(762, 'A total of')}
        </Text>
        <StyledDetails>
          <Heading size="md">
              <Balance color="primary" value={getBalanceNumber(totalStaked)} unit=" PEFI" />
          </Heading>
        </StyledDetails>
        <Text color="subtle">
          {TranslateString(764, 'Staked in Penguin Nests')}
        </Text>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`
export default TotalPefiStakedNests
