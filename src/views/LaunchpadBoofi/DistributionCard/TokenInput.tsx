import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Text } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import roundDown from 'utils/roundDown'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  maxBalanceShow?: boolean
  boofiAvailable?: number
  unstakeMode?: boolean
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  max,
  symbol,
  maxBalanceShow = true,
  boofiAvailable = 50000,
  unstakeMode,
  onChange,
  onSelectMax,
}) => {

  console.log('ant : max => ', max);
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <Input className="input" inputClassName="tokenInput" onChange={onChange} placeholder="" value={value} />
      <Wrapper>
        <TokenValueWrapper justifyContent="space-between" alignItems="center">
          <TokenValue>{unstakeMode ? `${value || 0} ${symbol}` : 
              <>
                <span>{`${value || 0} BOOFI`}</span>
                {`for 0 ${symbol}`}
              </>
            }
          </TokenValue>
          <StyledButton scale="sm" onClick={onSelectMax}>
            {TranslateString(452, 'MAX')}
          </StyledButton>
        </TokenValueWrapper>
      </Wrapper>
      {unstakeMode ? 
        <Flex justifyContent='flex-end'>
          <StyledMaxText mr='8px'>
            {TranslateString(526, `${symbol} Available:`)} {roundDown(max, 2)} {symbol}
          </StyledMaxText>
          <img src='/images/launchpad/boo-logo.svg' alt='boo-logo' width={20} />
        </Flex>
        : <Flex justifyContent='space-between' alignItems='center'>
          {maxBalanceShow && (
            <Flex alignItems='center'>
              <StyledMaxText mr='8px'>
                {TranslateString(526, `${symbol} Available:`)} {roundDown(max, 2)} {symbol}
              </StyledMaxText>
              {roundDown(max, 2) === '0' &&
                <Warning src='/images/launchpad/warning.png' alt='warning' width={16} height={16} />
              }
            </Flex>
          )}
          <Flex>
            <BoofiAvailableText bold mr='4px'>BOOFI Available:</BoofiAvailableText>
            <BoofiAvailableBalance bold mr='8px'>{boofiAvailable}</BoofiAvailableBalance>
            <img src='/images/launchpad/boo-logo.svg' alt='boo-logo' width={20} />
          </Flex>
        </Flex>
      }
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

  span {
    font-weight: 500;
    margin-right: 4px;
  }
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

const StyledMaxText = styled(Text)`
  font-weight: 300;
  color: ${({ theme }) => !theme.isDark && '#372871'};
`

const BoofiAvailableText = styled(Text)`
  color: ${({ theme }) => !theme.isDark && '#372871'};
`;

const BoofiAvailableBalance = styled(Text)`
  color: #38db93;
`;

const StyledButton = styled(Button)`
  height: 36px;
  font-size: 16px;
  font-weight: 400;
  color: white;
  background-color: #38db93;
  box-shadow: none;
`

const Warning = styled.img`
  width: 16px;
  height: 16px;
`;

export default TokenInput
