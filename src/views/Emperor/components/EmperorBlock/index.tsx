import React from 'react'
import styled from 'styled-components'
import { Text } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenAddress, badWordsFilter } from 'utils/address'
import SvgIcon from 'components/SvgIcon'

const CardBlock = styled.div`
  
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
  margin-bottom: -120px;
  margin-top: -80px;
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
  text-align:center;
`

const WalletContainer = styled.div`
  position: relative;
  z-index: 10;
`

const EmperorInfoContainer = styled.div`
  position: relative;
  z-index: 10;
`

const PenguinsImageContainer = styled.div`
  position: relative;
`

const KingPenguinImageWrapper = styled.div`
  position: absolute;
  top: 130px;
  width: 50%;
  right: 25%;
`

const MyPenguinImageWrapper = styled.div`
  position: absolute;
  top: 340px;
  width: 40%;
  left: 320px;
`

const images = [
  { id: '1', kingSrc: 'penguin_top_hat', normalSrc: 'penguin_top_hat' },
  { id: '2', kingSrc: 'penguin_fedora', normalSrc: 'penguin_fedora' },
  { id: '3', kingSrc: 'penguin_eye_patch_with_crown', normalSrc: 'penguin_eye_patch_no_crown' },
  { id: '4', kingSrc: 'penguin_sunglass_with_crown', normalSrc: 'penguin_sunglass_no_crown' }
]

const colors = [
  { name: "pink", color: 'FF81D2' },
  { name: "red", color: 'E74242' },
  { name: "blue", color: '3B44FF' },
  { name: "yellow", color: 'FFF301' },
  { name: "green", color: '53F453' },
  { name: "turquoise", color: '08DED4' },
  { name: "purple", color: '6C3C9A' },
  { name: "orange", color: 'FF970D' },
  { name: "white", color: 'FFFEE7' },
  { name: "black", color: '2D2D2D' },
]

const EmperorBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { currentEmperor, myEmperor } = useEmperor()
  const currentEmperorAddress = currentEmperor && currentEmperor.address
  const currentEmperorNickname = currentEmperor && badWordsFilter(currentEmperor.nickname)
  const currentEmperorBidAmount = currentEmperor && currentEmperor.bidAmount || 0

  const getKingPenguin = (emperor) => {
    const emperorPenguin = images.find((row) => String(row.id) === String(emperor.style))
    if (emperorPenguin) return emperorPenguin.kingSrc;
    if (emperor.style) return images[0].kingSrc;
    return ''
  }

  const getNormalPenguin = (emperor) => {
    const emperorPenguin = images.find((row) => String(row.id) === String(emperor.style))
    if (emperorPenguin) return emperorPenguin.normalSrc;
    if (emperor.style && emperor.style !== '0') return images[0].normalSrc;
    return ''
  }

  const getPenguinColor = (emperor) => {
    if (!emperor.color) return colors[0];

    const penguinColor = colors.find((row) => row.name.toLocaleLowerCase() === emperor.color.toLocaleLowerCase() || row.color.toLocaleLowerCase() === emperor.color.toLocaleLowerCase())
    if (penguinColor) return penguinColor;
    return colors[0];
  }

  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)

  return (
    <CardBlock >
      <CardBlockHeader>
        <TitleBgWrapper color={getPenguinColor(currentEmperor).color}>
          <SvgIcon
            src={
              account
                ? `${process.env.PUBLIC_URL}/images/emperor/banner/emperor_banner_unlocked.svg`
                : `${process.env.PUBLIC_URL}/images/emperor/banner/emperor_banner_locked.svg`
            }
            width="100%"
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
            <Text color="secondary" fontSize="14px">{getShortenAddress(currentEmperorAddress)}</Text>
            <Text bold color="secondary" fontSize="14px">{`Current Bid: ${currentEmperorBidAmount.toFixed(2)} xPEFI`}</Text>
          </EmperorInfoContainer>
        )}
      </CardBlockContent>
      <PenguinsImageContainer>
        <KingPenguinImageWrapper>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${currentEmperorPenguin}_${getPenguinColor(currentEmperor).name}.svg`}
            width="100%"
          />
        </KingPenguinImageWrapper>
        {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
          <MyPenguinImageWrapper>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/emperor/penguins/${myEmperorPenguin}_${getPenguinColor(myEmperor).name}.svg`}
              width="100%"
            />
          </MyPenguinImageWrapper>
        )}
      </PenguinsImageContainer>
    </CardBlock >
  )
}



export default EmperorBlock
