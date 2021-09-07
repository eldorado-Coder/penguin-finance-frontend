import React from 'react'
import styled from 'styled-components'
import { Button, Flex } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import roundDown from 'utils/roundDown'
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
      <Input className="input" inputClassName="tokenInput" onChange={onChange} placeholder="" value={value} />
      <Wrapper>
        <TokenValueWrapper justifyContent="space-between" alignItems="center">
          <TokenValue>{`${value || 0} ${symbol}`}</TokenValue>
          <StyledButton scale="sm" onClick={onSelectMax}>
            {TranslateString(452, 'Max')}
          </StyledButton>
        </TokenValueWrapper>
      </Wrapper>
      {maxBalanceShow && (
        <StyledMaxText>
          {TranslateString(526, `${symbol} Available:`)} {roundDown(max, 2)}
          {/* {TranslateString(526, `${symbol} Available:`)} {Number(max).toFixed(2)} */}
        </StyledMaxText>
      )}
    </StyledTokenInput>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  bottom: 3.5rem;
`

const TokenValueWrapper = styled(Flex)`
  height: 3.5rem;
  padding: 0 16px;
`

const TokenValue = styled.div`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
`

const StyledTokenInput = styled.div`
  .input {
    height: 56px;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};

    .tokenInput {
      caret-color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      color: transparent;
      z-index: 1;
      margin-right: 80px;

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

const StyledMaxText = styled.div`
  align-items: center;
  color: #604e84;
  display: flex;
  font-weight: 300;
  font-size: 14px;
  height: 32px;
  justify-content: flex-end;
`

const StyledButton = styled(Button)`
  height: 36px;
  color: ${({ theme }) => theme.isDark && '#30264f'};
`

export default TokenInput
