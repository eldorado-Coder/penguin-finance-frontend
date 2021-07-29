import React from 'react'
import styled from 'styled-components'
import { Button } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  maxBalanceShow?: boolean
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  max,
  symbol,
  maxBalanceShow = true,
  onChange,
  onSelectMax,
}) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInputWrapper>
      {maxBalanceShow && (
        <StyledMaxText>
          {max.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
        </StyledMaxText>
      )}
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInputWrapper>
  )
}

const StyledTokenInputWrapper = styled.div`
  > div {
    background: ${({ theme }) => theme.isDark && '#604284'};
  }
  input {
    color: ${({ theme }) => (theme.isDark ? '#D8CFE2' : '#373566')};
    font-weight: 700;
    font-size: 24px;
    font-family: 'Poppins';
  }
`

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  padding-left: 10px;
  button {
    background: ${({ theme }) => (theme.isDark ? '#ffffff' : '#d2464e')};
    color: ${({ theme }) => theme.isDark && '#30264f'};
    height: 40px;
    border-radius: 8px;
    font-weight: 600;
  }
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? '#D8CFE2' : '#373566')};
  font-weight: 700;
  font-size: 24px;
  font-family: 'Poppins';
`

export default TokenInput
