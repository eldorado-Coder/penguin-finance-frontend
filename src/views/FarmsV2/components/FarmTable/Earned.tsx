import React from 'react'
import styled from 'styled-components'
import { Skeleton } from 'penguinfinance-uikit2'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

export interface EarnedProps {
  earnings: BigNumber
  pid: number
}

interface EarnedPropsWithLoading extends EarnedProps {
  userDataReady: boolean
}

const Earned: React.FunctionComponent<EarnedPropsWithLoading> = ({ earnings, userDataReady }) => {
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  if (userDataReady) {
    return <Amount earned={rawEarningsBalance}>{`${displayBalance} PEFI`}</Amount>
  }
  return (
    <Amount earned={0}>
      <Skeleton width={60} />
    </Amount>
  )
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.textSubtle : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

export default Earned
