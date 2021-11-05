import React from 'react'
import styled from 'styled-components'
import { Button, Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  maxBalanceShow?: boolean
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({ value, symbol, onChange, onSelectMax }) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <Input
        className="input"
        inputClassName="tokenInput"
        onChange={onChange}
        placeholder=""
        value={value}
        endAdornment={
          <Flex alignItems="center">
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledButton scale="sm" onClick={onSelectMax}>
              {TranslateString(452, 'Max')}
            </StyledButton>
          </Flex>
        }
      />
    </StyledTokenInput>
  )
}

const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? theme.colors.primary : '#372871')};
  font-weight: 500;
  margin: 0 8px;
  font-size: 14px;
  @media (min-width: 2000px) {
    font-size: 20px;
  }
`

const StyledTokenInput = styled.div`
  .input {
    height: 2.5rem;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};
    font-size: 14px;
    @media (min-width: 2000px) {
      font-size: 20px;
    }

    caret-color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
    color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};

    .tokenInput {
      color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      font-size: 14px;
      @media (min-width: 2000px) {
        font-size: 20px;
      }
    }
  }
`

const StyledButton = styled(Button)`
  height: 24px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
  border-radius: 8px;
  padding: 0 12px;
  @media (min-width: 2000px) {
    height: 29px;
    font-size: 17px;
  }
`

export default TokenInput
