import React from 'react'
import styled from 'styled-components'
import { Button } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import Input, { InputProps } from '../../../components/Input'

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
    <StyledTokenInput>
      <Input
        className="input"
        inputClassName="tokenInput"
        endAdornment={
          <StyledTokenAdornmentWrapper>
            {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
            <StyledSpacer />
            <div>
              <StyledButton scale="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder={`0 ${symbol}`}
        value={value}
      />
      {maxBalanceShow && (
        <StyledMaxText>
          {TranslateString(526, `${symbol} Available:`)} {Number(max).toFixed(3)}
        </StyledMaxText>
      )}
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div`
  .input {
    height: 56px;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};

    .tokenInput {
      color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};

      ::placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      }

      :-ms-input-placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      }

      ::-ms-input-placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      }
    }
  }
`

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #604e84;
  display: flex;
  font-weight: 300;
  font-size: 14px;
  height: 32px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
  font-weight: 700;
`

const StyledButton = styled(Button)`
  height: 36px;
`

export default TokenInput
