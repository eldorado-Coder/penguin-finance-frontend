import React from 'react'
import styled from 'styled-components'
import { Button, Flex } from 'penguinfinance-uikit2'
import Input, { InputProps } from 'components/Input'

interface TokenInputProps extends InputProps {
  disabled?: boolean
  tokenSymbol?: string
  hasMaxBtn?: boolean
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({
  disabled,
  value,
  tokenSymbol = 'PEFI',
  hasMaxBtn = true,
  onChange,
  onSelectMax,
}) => {
  return (
    <StyledTokenInput disabled={disabled}>
      <Input className="input" inputClassName="tokenInput" onChange={onChange} placeholder="" value={value} />
      <Wrapper>
        <TokenValueWrapper justifyContent="space-between" alignItems="center">
          <TokenValue>{`${value || '0.00'}`}</TokenValue>
          <Flex>
            {hasMaxBtn && (
              <StyledButton scale="sm" onClick={onSelectMax}>
                MAX
              </StyledButton>
            )}
            <Flex alignItems="center" ml="8px">
              <TokenLogoWrapper>
                <TokenLogo
                  src={`${process.env.PUBLIC_URL}/images/launchpad-v2/kassandra/${tokenSymbol.toLowerCase()}.png`}
                  alt={`${tokenSymbol}-logo`}
                />
              </TokenLogoWrapper>
              <TokenSymbol>{tokenSymbol}</TokenSymbol>
              {/* <ArrowDownImgWrapper>
                <SvgIcon
                  src={`${process.env.PUBLIC_URL}/images/launchpad-v2/kitty/arrow_down.svg`}
                  width="100%"
                  height="10px"
                />
              </ArrowDownImgWrapper> */}
            </Flex>
          </Flex>
        </TokenValueWrapper>
      </Wrapper>
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
  height: 48px;
  padding: 0 8px;
  @media (min-width: 968px) {
    padding: 0 16px;
  }
`

const TokenValue = styled.div`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
  max-width: calc(100% - 150px);
  overflow: hidden;
  @media (min-width: 576px) {
    max-width: calc(100% - 140px);
  }
  @media (min-width: 968px) {
    max-width: calc(100% - 130px);
  }
`

const StyledTokenInput = styled.div<{ disabled?: boolean }>`
  position: relative;

  .input {
    height: 67px;
    border-radius: 8px;
    background: ${({ theme }) => (theme.isDark ? '#604E84' : '#ffffff')};
    pointer-events: ${({ disabled }) => disabled && 'none'};
    padding: 0px 8px;
    @media (min-width: 576px) {
      padding: 0px 8px;
    }
    @media (min-width: 968px) {
      padding: 0px 16px;
    }

    .tokenInput {
      caret-color: ${({ theme }) => (theme.isDark ? 'white' : '#372871')};
      color: transparent;
      z-index: 1;
      margin-right: 150px;
      @media (min-width: 576px) {
        margin-right: 130px;
      }
      @media (min-width: 968px) {
        margin-right: 130px;
      }

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

const TokenLogoWrapper = styled(Flex)`
  border-radius: 50%;
  background: white;
  padding: 2px;
`
const TokenLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`

const TokenSymbol = styled(Flex)`
  font-style: normal;
  font-weight: normal;
  font-size: 14.7309px;
  line-height: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : '#292929')};
  margin-left: 6px;
`

const StyledButton = styled(Button)`
  height: 36px;
  font-weight: normal;
  /* font-size: 9.4449px; */
  font-size: 14px;
  line-height: 20px;
  color: white;
  background-color: #7405aa;
  box-shadow: none;
  border-radius: 8px;
  padding: 4px 10px;
`

export default TokenInput
