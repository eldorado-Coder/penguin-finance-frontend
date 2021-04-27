import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenAddress } from 'utils/address'
import SvgIcon from 'components/SvgIcon'

const CardBlock = styled.div`
  
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
`

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;

  svg {
    #Layer_4 {
      g:nth-child(1) {
        g:nth-child(1) {
          path:nth-child(1) {
            fill: ${({ color }) => `#${color}`}; ;
          }
          path:nth-child(6) {
          }
        }
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
`

const EmperorInfoContainer = styled.div`
`

const PenguinsImageContainer = styled.div`
  position: relative;
`

const KingPenguinImageWrapper = styled.div`
  position: absolute;
  top: 110px;
  width: 50%;
  right: 25%;
`

const MyPenguinImageWrapper = styled.div`
  position: absolute;
  top: 300px;
  width: 40%;
  left: 320px;
`



const images = [
  { id: '1', kingSrc: 'penguin_top_hat.svg', normalSrc: 'penguin_top_hat.svg' },
  { id: '2', kingSrc: 'penguin_fedora.svg', normalSrc: 'penguin_fedora.svg' },
  { id: '3', kingSrc: 'penguin_patch_with_crown.svg', normalSrc: 'penguin_patch_without_crown.svg' },
  { id: '4', kingSrc: 'penguin_sunglass_with_crown.svg', normalSrc: 'penguin_sunglass_without_crown.svg' }
]

const EmperorBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { currentEmperor, myEmperor } = useEmperor()
  const currentEmperorAddress = currentEmperor && currentEmperor.address
  const currentEmperorNickname = currentEmperor && currentEmperor.nickname
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

  const currentEmperorPenguin = getKingPenguin(currentEmperor)
  const myEmperorPenguin = getNormalPenguin(myEmperor)

  return (
    <CardBlock >
      <CardBlockHeader>
        <TitleBgWrapper color={currentEmperor.color}>
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
            src={`${process.env.PUBLIC_URL}/images/emperor/king/${currentEmperorPenguin}`}
            width="100%"
          />
        </KingPenguinImageWrapper>
        {currentEmperor.address && myEmperor.address && currentEmperor.address !== myEmperor.address && (
          <MyPenguinImageWrapper>
            <SvgIcon
              src={`${process.env.PUBLIC_URL}/images/emperor/king/${myEmperorPenguin}`}
              width="100%"
            />
          </MyPenguinImageWrapper>
        )}
      </PenguinsImageContainer>
    </CardBlock >
  )
}



export default EmperorBlock
