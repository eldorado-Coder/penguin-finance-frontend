import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Text, useMatchBreakpoints } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import roundDown from 'utils/roundDown'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  maxBalanceShow?: boolean
  stakeMode?: boolean
  stakedBalance?: number | string
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  max,
  symbol,
  stakeMode,
  stakedBalance,
  maxBalanceShow = true,
  onChange,
  onSelectMax,
}) => {
  const TranslateString = useI18n()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <StyledTokenInput>
      <Input className="input" inputClassName="tokenInput" onChange={onChange} placeholder="" value={value} />
      <Wrapper>
        <TokenValueWrapper justifyContent="space-between" alignItems="center">
          <TokenValue>{`${value || 0} ${symbol}`}</TokenValue>
          <StyledButton scale="sm" onClick={onSelectMax}>
            {TranslateString(452, 'MAX')}
          </StyledButton>
        </TokenValueWrapper>
      </Wrapper>
      <Flex justifyContent={stakeMode ? 'space-between' : 'flex-end'} alignItems="center">
        {stakeMode && (
          <StyledMaxText>
            {`${isMobile ? 'Staked' : `${symbol} Staked`}: ${roundDown(stakedBalance, 2)} ${symbol}`}
          </StyledMaxText>
        )}
        {maxBalanceShow && (
          <StyledMaxText>
            {`${isMobile ? 'Available' : `${symbol} Available`}: ${roundDown(max, 2)} ${symbol}`}
            {Number(max) < 0.1 && <Warning src="/images/launchpad/warning.png" alt="warning" width={16} height={16} />}
          </StyledMaxText>
        )}
      </Flex>
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
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
`

const StyledTokenInput = styled.div`
  .input {
    height: 56px;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ECE8F2')};

    .tokenInput {
      caret-color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
      color: transparent;
      z-index: 1;
      margin-right: 80px;

      ::placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
      }

      :-ms-input-placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
      }

      ::-ms-input-placeholder {
        color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
      }
    }
  }
`

const StyledMaxText = styled(Text)`
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372b70')};
  display: flex;
  font-weight: 300;
  font-size: 16px;
  height: 32px;
  justify-content: flex-end;
`

const StyledButton = styled(Button)`
  height: 36px;
  font-size: 16px;
  font-weight: 400;
  color: white;
  background-color: #37DB92;
  box-shadow: none;
`
const Warning = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`

export default TokenInput
