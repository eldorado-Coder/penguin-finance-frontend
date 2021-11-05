import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string
  fontWeight?: string
  isFlexWrap?: boolean
}

interface BalanceProps extends TextProps {
  value?: number
  decimals?: number
  unit?: string
  prefix?: string
  suffix?: string
  isFlexWrap?: boolean
}

const StyledText = styled(Text)<TextProps>`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  color: ${({ isDisabled, color, theme }) => (isDisabled ? theme.colors.textDisabled : color)};
  display: flex;
  align-items: center;
  white-space: break-spaces;
  flex-wrap: ${({ isFlexWrap }) => isFlexWrap && 'wrap'};
  @media (min-width: 2000px) {
    font-size: 24px !important;
  }
`

const BalanceWrapper = styled.span<{ isFlexWrap?: boolean }>`
  margin-right: ${({ isFlexWrap }) => isFlexWrap && '5px'};
`

const Balance: React.FC<BalanceProps> = ({
  value,
  fontSize,
  color,
  decimals,
  isDisabled,
  unit,
  fontWeight,
  prefix,
  suffix,
  isFlexWrap,
}) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <StyledText
      bold
      color={color}
      fontSize={fontSize}
      isDisabled={isDisabled}
      fontWeight={fontWeight}
      isFlexWrap={!!isFlexWrap}
    >
      {prefix}
      {value === 0 ? (
        <>
          <BalanceWrapper isFlexWrap={!!isFlexWrap}>0.00</BalanceWrapper>
          {unit && <span>{` ${unit}`}</span>}
        </>
      ) : (
        <>
          <BalanceWrapper isFlexWrap={!!isFlexWrap}>
            <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
          </BalanceWrapper>
          {unit && <span>{` ${unit}`}</span>}
        </>
      )}
      {suffix}
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
