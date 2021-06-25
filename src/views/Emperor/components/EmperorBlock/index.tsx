import React from 'react'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import { useEmperor } from 'state/hooks'
import { badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor, getKingPenguin, getNormalPenguin } from '../utils'
import { UnlockButton as Button, CardBlockHeader, CardBlock as Block } from '../UI'

const CardBlock = styled(Block)`
  margin-top: -100px;

  @media (min-width: 1200px) and (max-height: 800px) {
    margin-top: -120px;
  }
`

const TitleBgWrapper = styled.div<{ color: string, account: string }>`
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
    transform: scale(1.3)
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
  margin-top: 25%;
  min-width: 150px;
  max-width: ${props => !props.account && '220px'};
  padding: 8px;
  @media (min-width: 640px) {
    width: 100%;
    margin-top: 25%;
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
    min-width: ${({ account }) => account ? '240px' : '200px'};
    padding: 20px 24px 16px;
    margin-top: 26%;
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    min-width: ${({ account }) => account ? '240px' : '200px'};
    padding: 32px 24px 16px;
  }
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const KingPenguinImageWrapper = styled.div<{ penguin: string; color: string }>`
  z-index: -1;
  position: absolute;
  width: 12.5%;
  left: 44%;
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
  &:hover {
    z-index: 11;
  }

  svg {
    transform: scaleX(-1);
    ${({ penguin, color }) => `.${penguin}-st0 {
          fill: #${color};
        }`}
  }
`

const UnlockButton = styled(Button)`
  margin-top: 4px;
  @media (min-width: 640px) {
    margin-top: 4px;
  }
  @media (min-width: 768px) {
    margin-top: 16px;
  }
  @media (min-width: 1200px) {
    margin-top: 8px;
  }
`

const EmperorBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const currentEmperorNickname = currentEmperor && badWordsFilter(currentEmperor.nickname)
  const currentEmperorBidAmount = (currentEmperor && currentEmperor.bidAmount) || 0
  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)

  return (
    <CardBlock>
      <CardBlockHeader>
        <TitleBgWrapper color={!account && getPenguinColor(currentEmperor)} account={account}>
          <img
            src={`${process.env.PUBLIC_URL}/images/emperor/banner/emperor_blitz_title.svg`}
            width='100%'
            height="120px"
            alt='blitz-title'
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent account={account}>
        {!account && (
          <WalletContainer>
            <UnlockButton />
          </WalletContainer>
        )}
        {account && (
          <EmperorInfoContainer>
            <Text bold color="secondary" fontSize="22px">
              {TranslateString(1074, currentEmperorNickname)}
            </Text>
            {/* <Text color="secondary" fontSize="14px">{getShortenAddress(currentEmperorAddress)}</Text> */}
            <Text bold color="secondary" fontSize="14px">{`Current Bid: ${currentEmperorBidAmount.toFixed(
              2,
            )} xPEFI`}</Text>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
      <KingPenguinImageWrapper penguin={`${currentEmperorPenguin}`} color={getPenguinColor(currentEmperor)}>
        <SvgIcon
          src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}.svg`}
          width="100%"
          height="20px"
        />
      </KingPenguinImageWrapper>
      {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
        <MyPenguinImageWrapper penguin={`${myEmperorPenguin}`} color={getPenguinColor(myEmperor)}>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}.svg`}
            width="100%"
            height="20px"
          />
        </MyPenguinImageWrapper>
      )}
    </CardBlock>
  )
}

export default EmperorBlock
