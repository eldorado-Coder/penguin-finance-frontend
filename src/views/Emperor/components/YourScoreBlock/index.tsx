import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
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
  top: 28px;
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
                <TitleBgWrapper>
                    <TitleImage
                        src={
                            `${process.env.PUBLIC_URL}/images/emperor/your_score_banner.svg`
                        }
                        alt="title banner"
                    />
                </TitleBgWrapper>
                <TitleAvatarWrapper>
                    {account && (
                        <TitleAvatar
                            src={`${process.env.PUBLIC_URL}/images/emperor/penguin_red.svg`}
                            alt="title banner"
                        />
                    )}
                </TitleAvatarWrapper>
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
