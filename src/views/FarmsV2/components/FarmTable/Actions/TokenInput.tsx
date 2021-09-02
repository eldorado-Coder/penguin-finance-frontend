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

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  onSelectMax,
}) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <Input className="input" inputClassName="tokenInput" onChange={onChange} placeholder="" value={value} />
      <Wrapper>
        <TokenValueWrapper justifyContent="space-between" alignItems="center">
          <TokenValue>{`${value || 0} LP`}</TokenValue>
          <StyledButton scale="sm" onClick={onSelectMax}>
            {TranslateString(452, 'Max')}
          </StyledButton>
        </TokenValueWrapper>
      </Wrapper>
    </StyledTokenInput>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  bottom: 2.5rem;
`

const TokenValueWrapper = styled(Flex)`
  height: 2.5rem;
  padding: 0 16px;
`

const TokenValue = styled.div`
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
`

const StyledTokenInput = styled.div`
  .input {
    height: 2.5rem;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};
    font-size: 16px;

    .tokenInput {
      caret-color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      color: transparent;
      z-index: 1;
      margin-right: 80px;
      height: 2.5rem;
      font-size: 16px;

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

const StyledButton = styled(Button)`
  height: 28px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.isDark && '#30264f'};
`

export default TokenInput
