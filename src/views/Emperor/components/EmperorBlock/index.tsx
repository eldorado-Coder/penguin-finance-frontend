import React from 'react'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'
import { getPenguinColor, getKingPenguin, getNormalPenguin } from '../utils'

const CardBlock = styled.div``

const CardBlockHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
  margin-bottom: -120px;
  margin-top: -80px;
  min-height: 314px;
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;

  svg {
    #Banner-Avatar {
      path {
        fill: ${({ color }) => `#${color}`};
      }
    }
  }
`

const CardBlockContent = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  padding: 16px;
  position: relative;
  margin-top: -38px;
  text-align: center;
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const KingPenguinImageWrapper = styled.div`
  z-index: -1;
  position: absolute;
  width: 12.5%;
  left: 44%;
  bottom: 33%;
`

const MyPenguinImageWrapper = styled.div`
  position: absolute;
  width: 9.5%;
  right: 26%;
  bottom: 17%;

  svg {
    transform: scaleX(-1);
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
        <TitleBgWrapper color={getPenguinColor(currentEmperor).code}>
          <SvgIcon
            src={
              account
                ? `${process.env.PUBLIC_URL}/images/emperor/banner/emperor_banner_unlocked.svg`
                : `${process.env.PUBLIC_URL}/images/emperor/banner/emperor_banner_locked.svg`
            }
            width="100%"
            height="20px"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent>
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
      <KingPenguinImageWrapper>
        <SvgIcon
          src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}_${
            getPenguinColor(currentEmperor).name
          }.svg`}
          width="100%"
          height="20px"
        />
      </KingPenguinImageWrapper>
      {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
        <MyPenguinImageWrapper>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}_${
              getPenguinColor(myEmperor).name
            }.svg`}
            width="100%"
            height="20px"
          />
        </MyPenguinImageWrapper>
      )}
    </CardBlock>
  )
}

export default EmperorBlock
