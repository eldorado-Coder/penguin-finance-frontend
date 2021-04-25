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
  background: white;
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

const EmperorBlock: React.FC = () => {
    const TranslateString = useI18n()
    const { account } = useWallet()
    const { currentEmperor } = useEmperor()
    const currentEmperorAddress = currentEmperor && currentEmperor.address
    const currentEmperorNickname = currentEmperor && currentEmperor.nickname
    const currentEmperorBidAmount = currentEmperor && currentEmperor.bidAmount || 0

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
        </CardBlock >)
}



export default EmperorBlock
