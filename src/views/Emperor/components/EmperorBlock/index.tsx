import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useEmperor } from 'state/hooks'
import { getShortenAddress } from 'utils/address'

const CardBlock = styled.div`
  
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 16px;
`

const TitleBgWrapper = styled.div`
  z-index: -1;
  width: 100%;
  text-align: center;
`

const TitleImage = styled.img`
  z-index: -1;
`

const TitleAvatarWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 29px;
`
const TitleAvatar = styled.img`
  width: 80px;
`

const CardBlockContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  position: relative;
  margin-top: -44px;
  text-align:center;
`

const WalletContainer = styled.div`
`

const EmperorInfoContainer = styled.div`
`

const EmperorBlock: React.FC = () => {
    const TranslateString = useI18n()
    const { account } = useWallet()
    const { currentEmperor, topEmperors } = useEmperor()
    const currentEmperorAddress = currentEmperor && currentEmperor.address
    const currentEmperorNickname = currentEmperor && currentEmperor.nickname
    const currentEmperorBidAmount = currentEmperor && currentEmperor.bidAmount || 0


    return (
        <CardBlock >
            <CardBlockHeader>
                <TitleBgWrapper>
                    <TitleImage
                        src={
                            `${process.env.PUBLIC_URL}/images/emperor/emperor_banner.svg`
                        }
                        alt="title banner"
                    />
                </TitleBgWrapper>
                <TitleAvatarWrapper>
                    <TitleAvatar
                        src={
                            `${process.env.PUBLIC_URL}/images/emperor/penguin_red.svg`
                        }
                        alt="title banner"
                    />
                </TitleAvatarWrapper>
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
        </CardBlock >)
}



export default EmperorBlock
