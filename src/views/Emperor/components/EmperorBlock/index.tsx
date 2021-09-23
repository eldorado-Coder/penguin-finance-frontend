import React from 'react'
import styled from 'styled-components'
import { Text, Button, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import { useEmperor } from 'state/hooks'
import { badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor, getKingPenguin, getNormalPenguin } from '../utils'
import { UnlockButton, CardBlockHeader, CardBlock as Block } from '../UI'

const CardBlock = styled(Block)`
  margin-top: -100px;

  @media (min-width: 1200px) and (max-height: 800px) {
    margin-top: -120px;
  }
`

const TitleBgWrapper = styled.div<{ color: string; account: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;
  position: absolute;

  svg {
    #Banner-Avatar {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }

  transform: scale(1);
  @media (min-width: 640px) {
    transform: scale(1.3);
  }
  @media (min-width: 768px) {
    margin-top: -5%;
  }
  @media (min-width: 1200px) {
    transform: scale(1.5);
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    transform: scale(1.5);
    margin-top: 16px;
  }
`

const CardBlockContent = styled.div<{ account?: string }>`
  background: ${(props) => props.theme.card.background};
  border-radius: 8px;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  text-align: center;
  margin-top: 23%;
  min-width: 150px;
  max-width: ${(props) => !props.account && '220px'};
  padding: 8px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    width: 100%;
    margin-top: 25%;
    padding: 24px 16px 12px;
  }
  @media (max-width: 640px) {
    min-width: 122px;
    max-width: 122px;
  }
  @media (min-width: 768px) {
    width: 100%;
    border-radius: 8px;
    margin-top: 25%;
    padding: 8px 20px 16px;
  }
  @media (min-width: 1200px) {
    width: 100%;
    max-width: 280px;
    margin-top: 25%;
    padding: 24px 24px 16px;
  }
  @media (min-width: 1450px) {
    min-width: 200px;
    padding: 20px 24px 16px;
    margin-top: 26%;
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    min-width: 200px;
    padding: 32px 24px 16px;
  }
`

const WalletContainer = styled(Flex)`
  position: relative;
  z-index: 10;

  .starter-button {
    background: #f5c83b;
    font-size: 10px;
    padding: 0 8px;
    height: 28px;
    margin-top: 4px;
    margin-bottom: 8px;

    @media (min-width: 640px) {
      font-size: 12px;
      padding: 0 12px;
      height: 36px;
    }
    @media (min-width: 768px) {
      font-size: 14px;
      padding: 0 24px;
      height: 48px;
    }
    @media (min-width: 1200px) {
      margin-top: 8px;
      font-size: 16px;
      padding: 0 24px;
      height: 48px;
    }
  }
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const ShieldContainer = styled.div`
  height: 22px;
  margin-right: 4px;

  svg {
    fill: ${({ theme }) => theme.colors.secondary};
    height: 22px;
  }
`

const KingPenguinImageWrapper = styled.div<{ penguin: string; color: string, isSm: boolean }>`
  z-index: -1;
  position: absolute;
  width: ${({ isSm }) => isSm ? "21.5% " : "12.5%"};
  left: ${({ isSm }) => isSm ? "39%" : "44%"};
  bottom: 33%;
  svg {
    ${({ penguin, color }) => `.${penguin}-st0 {
          fill: #${color};
        }`}
  }
`

const MyPenguinImageWrapper = styled.div<{ penguin: string; color: string }>`
  position: absolute;
  width: 9.5%;
  right: 26%;
  bottom: 17%;
  z-index: 11;

  svg {
    transform: scaleX(-1);
    ${({ penguin, color }) => `.${penguin}-st0 {
          fill: #${color};
        }`}
  }
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.primary : theme.colors.secondary)};
`

const EmperorBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const currentEmperorNickname = currentEmperor && badWordsFilter(currentEmperor.nickname)
  const currentEmperorBidAmount = (currentEmperor && currentEmperor.bidAmount) || 0
  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)
  const { isSm } = useMatchBreakpoints()

  const handleViewStarterGuide = () => {
    window.open('https://medium.com/@boofinance2021/introducing-boofinance-innovative-yield-farms-deflationary-nfts-on-avalanche-5f285835a317', '_blank')
  }

  const renderPenguins = () => {
    if (!account) return null
    return (
      <>
        <KingPenguinImageWrapper isSm={isSm} penguin={`${currentEmperorPenguin}`} color={getPenguinColor(currentEmperor)}>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}.svg`}
            width="100%"
            height="50px"
          />
        </KingPenguinImageWrapper>
        {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
          <MyPenguinImageWrapper penguin={`${myEmperorPenguin}`} color={getPenguinColor(myEmperor)}>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}.svg`}
              width="100%"
              height="50px"
            />
          </MyPenguinImageWrapper>
        )}
      </>
    )
  }

  return (
    <CardBlock>
      <CardBlockHeader>
        <TitleBgWrapper color={!account && getPenguinColor(currentEmperor)} account={account}>
          <img
            src={`${process.env.PUBLIC_URL}/images/emperor/banner/emperor_banner.svg`}
            width="100%"
            height="120px"
            alt="emperor-banner"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent account={account}>
        {!account && (
          <WalletContainer flexDirection="column" alignItems="center">
            <Button className="starter-button" onClick={handleViewStarterGuide}>
              Starter Guide
            </Button>
            <UnlockButton />
          </WalletContainer>
        )}
        {account && (
          <EmperorInfoContainer>
            <Flex alignItems="center" justifyContent="center">
              {currentEmperor.nickname && !currentEmperor.canBePoisoned && (
                <ShieldContainer>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/emperor/shield.svg`} width="22px" height="22px" />
                </ShieldContainer>
              )}
              <StyledText bold fontSize={isSm ? "12px" : "22px"}>
                {TranslateString(1074, currentEmperorNickname)}
              </StyledText>
            </Flex>
            <StyledText bold fontSize={isSm ? "8px" : "14px"}>{`Current Bid: ${currentEmperorBidAmount.toFixed(2)} iPEFI`}</StyledText>
            <StyledText bold fontSize={isSm ? "8px" : "14px"}>{`Current Jackpot: ${currentEmperor.jackpot.toFixed(0)} iPEFI`}</StyledText>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
      {renderPenguins()}
    </CardBlock>
  )
}

export default EmperorBlock
