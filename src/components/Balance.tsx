import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string,
  fontWeight?: string
}

interface BalanceProps extends TextProps {
  value?: number
  decimals?: number
  unit?: string,
  prefix?: string
}

const StyledText = styled(Text)<TextProps>`
  color: ${({ theme }) => theme.isDark ? 'white' : theme.colors.secondary };
  color: ${({ isDisabled, color, theme }) => (isDisabled ? theme.colors.textDisabled : color)};
  display: flex;
  align-items: center;
`

const Balance: React.FC<BalanceProps> = ({ value, fontSize, color, decimals, isDisabled, unit, fontWeight, prefix }) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <StyledText bold color={color} fontSize={fontSize} isDisabled={isDisabled} fontWeight={fontWeight}>
      {prefix}
      {value === 0 ? (
        <>
          <span>0.00</span>
          {unit && <span>{` ${unit}`}</span>}
        </>
      ) : (
        <>
          <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
          {unit && <span>{` ${unit}`}</span>}
        </>
      )}
    </StyledText>
  )
}

Balance.defaultProps = {
  fontSize: '32px',
  isDisabled: false,
  color: 'text',
  decimals: 2,
}

export default Balance
