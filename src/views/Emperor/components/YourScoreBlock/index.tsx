import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import { useEmperor } from 'state/hooks'


const CardBlock = styled.div`
  
`

const CardBlockHeader = styled.div`
  position: relative;  
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 24px;
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
  margin-top: -46px;
  text-align:center;
`

const WalletContainer = styled.div`
  text-align:center;
  button {
    margin-top: 20px;
  }
`


const YourScoreBlock: React.FC = () => {
    const dispatch = useDispatch();
    const TranslateString = useI18n()
    const { account } = useWallet()
    // const { teams, isLoading } = useEmperor()
    const { myEmperor } = useEmperor()

    // console.log('myEmperor--->', myEmperor)


    const getMyStatus = () => {
        let status: string;
        if (!account) {
            status = "not connected"
        } else {
            status = 'connected'
        }
        return status
    }

    const myStatus = getMyStatus()


    return (
        <CardBlock>
            <CardBlockHeader>
                <TitleBgWrapper color={myEmperor.color}>
                    <SvgIcon
                        src={
                            account
                                ? `${process.env.PUBLIC_URL}/images/emperor/banner/your_score_banner_unlocked.svg`
                                : `${process.env.PUBLIC_URL}/images/emperor/banner/your_score_banner_locked.svg`
                        }
                        width="100%"
                    />
                </TitleBgWrapper>
            </CardBlockHeader>
            <CardBlockContent>
                {myStatus === 'not connected' && (
                    <WalletContainer>
                        <Text bold color="secondary" fontSize="22px">
                            {TranslateString(1074, 'Check your Rank')}
                        </Text>
                        <Text fontSize="14px">Connect wallet to view</Text>
                        <UnlockButton />
                    </WalletContainer>
                )}
                {/* {myStatus === 'connected' && (
                    <WalletContainer>
                        <Text bold color="secondary" fontSize="22px">
                            {TranslateString(1074, 'You must register your penguin before attempting to steal the Throne')}
                        </Text>
                        <UnlockButton />
                    </WalletContainer>
                )} */}
            </CardBlockContent>
        </CardBlock>
    )
}



export default YourScoreBlock
