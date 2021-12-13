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

const CardBlock = styled(Block)<{ isMobile?: boolean }>`
  margin-top: ${({ isMobile }) => (isMobile ? '-56px' : '-100px')};

  @media (min-width: 1200px) and (max-height: 800px) {
    margin-top: -120px;
  }

  @media (min-width: 4000px) {
    margin-top: -40px;
  }
`

const TitleBgWrapper = styled.div<{ color: string; account: string; isMobile?: boolean }>`
  /* z-index: -1; */
  z-index: 16;
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

  transform: scale(0.7);
  margin-top: -4px;
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

  @media (min-width: 4000px) {
    transform: scale(1.5);
  }
`

const CardBlockContent = styled.div<{ account?: string }>`
  background: ${(props) => props.theme.card.background};
  border-radius: 8px;
  padding: 24px;
  padding-bottom: 16px;
  position: relative;
  text-align: center;
  margin-top: 22%;
  min-width: 156px;
  max-width: 156px;
  padding: 8px;
  margin-left: auto;
  margin-right: auto;

  // &:hover {
    // z-index: 15;
  // }

  @media (min-width: 640px) {
    width: 100%;
    margin-top: 25%;
    min-width: 220px;
    max-width: 220px;
    padding: 24px 16px 12px;
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

  @media (min-width: 4000px) {
    min-width: 400px;
    max-width: 400px;
    padding: 40px 24px 40px;
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
    margin-top: 8px;
    margin-bottom: 4px;

    @media (min-width: 640px) {
      font-size: 12px;
      padding: 0 12px;
      height: 36px;
      margin-top: 4px;
      margin-bottom: 8px;
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
    @media (min-width: 4000px) {
      margin-top: 8px;
      font-size: 22px;
      padding: 0 24px;
      height: 64px;
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

    @media (min-width: 4000px) {
      height: 32px;
    }
  }
`

const KingPenguinImageWrapper = styled.div<{ penguin: string; color: string; isMobile?: boolean }>`
  z-index: 12;
  position: absolute;
  width: ${({ isMobile }) => (isMobile ? '20%' : '11.5%')};
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 33%;
  svg {
    ${({ penguin, color }) => `.${penguin}-st0 {
          fill: #${color};
        }`}
  }

  @media (min-width: 1450px) {
    width: 9%;
  }
`

const Wrapper = styled.div<{ isMobile?: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: ${({ isMobile }) => isMobile ? '440px' : '100%'};
`

const MyPenguinImageWrapper = styled.div<{ penguin: string; color: string; isMobile?: boolean }>`
  position: absolute;
  width: ${({ isMobile }) => (isMobile ? '20%' : '9.5%')};
  right: ${({ isMobile }) => (isMobile ? '1.5%' : '26%')};
  bottom: 17%;
  z-index: 11;

  svg {
    transform: scaleX(-1);
    ${({ penguin, color }) => `.${penguin}-st0 {
      fill: #${color};
    }`}
  }

  @media (min-width: 1450px) {
    width: 8%;
    right: 27%;
  }
`

const StyledText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.primary : theme.colors.secondary)};
  white-space: nowrap;

  @media (min-width: 1200px) and (max-height: 800px) {
    font-size: 12px;
  }
  @media (max-width: 1080px) {
    font-size: 11px;
  }
  @media (min-width: 4000px) {
    font-size: 24px;
    line-height: 1.3;
  }
`

const NicName = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.primary : theme.colors.secondary)};
  white-space: nowrap;
  font-size: 18px;

  @media (min-width: 1200px) {
    font-size: 22px;
  }

  @media (min-width: 4000px) {
    font-size: 36px;
  }
`;

const EmperorBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const currentEmperorNickname = currentEmperor && badWordsFilter(currentEmperor.nickname)
  const currentEmperorBidAmount = (currentEmperor && currentEmperor.bidAmount) || 0
  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)
  const { isSm, isXs } = useMatchBreakpoints()
  const isMobile = isSm || isXs

  const handleViewStarterGuide = () => {
    window.open(
      'https://penguin-finance.medium.com/the-penguin-emperor-is-back-new-rules-huge-prizes-d4a6b79c3816',
      '_blank',
    )
  }

  const renderPenguins = () => {
    if (!account) return null
    return (
      <>
        <Wrapper isMobile={isMobile}>
          <KingPenguinImageWrapper
            isMobile={isMobile}
            penguin={`${currentEmperorPenguin}`}
            color={getPenguinColor(currentEmperor)}
          >
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}.svg`}
              width="100%"
              height="20px"
            />
          </KingPenguinImageWrapper>
        </Wrapper>
        {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
          <Wrapper isMobile={isMobile}>
            <MyPenguinImageWrapper
              isMobile={isMobile}
              penguin={`${myEmperorPenguin}`}
              color={getPenguinColor(myEmperor)}
            >
              <SvgIcon
                src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}.svg`}
                width="100%"
                height="20px"
              />
            </MyPenguinImageWrapper>
          </Wrapper>
        )}
      </>
    )
  }

  return (
    <CardBlock isMobile={isMobile}>
      <CardBlockHeader>
        <TitleBgWrapper isMobile={isMobile} color={!account && getPenguinColor(currentEmperor)} account={account}>
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
              <NicName bold fontSize="22px">
                {TranslateString(1074, currentEmperorNickname)}
              </NicName>
            </Flex>
            <StyledText bold fontSize="12px">{`Current Bid: ${currentEmperorBidAmount?.toFixed(2)} iPEFI`}</StyledText>
            <StyledText bold fontSize="12px">{`Current Jackpot: ${currentEmperor?.jackpot?.toFixed(
              0,
            )} iPEFI`}</StyledText>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
      {renderPenguins()}
    </CardBlock>
  )
}

export default EmperorBlock
