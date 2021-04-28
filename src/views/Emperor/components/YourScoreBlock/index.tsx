import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Text, useModal } from '@penguinfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import SvgIcon from 'components/SvgIcon'
import { useEmperor } from 'state/hooks'
import { useXPefi } from 'hooks/useContract'
import { getXPefiAddress } from 'utils/addressHelpers'
import { useRegister, useStealCrown, useXPefiApprove } from 'hooks/useEmperor'
import RegisterModal from './RegisterModal'
import StealCrownModal from './StealCrownModal'

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
      #Color_1 {
        path {
          fill: ${({ color }) => `#${color}`};
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
  margin-top: -46px;
  text-align:center;
`

const WalletContainer = styled.div`
  text-align:center;
  button {
    margin-top: 20px;
  }
`

const RegisterContainer = styled.div`
    margin-top: 20px;
    text-align:center;
    button {
        margin-top: 20px;
    }
`

const RegisterButtonContainer = styled.div`
    /* margin-top: 20px;
    text-align:center;
    button {
        margin-top: 20px;
    } */
`


const YourScoreBlock: React.FC = () => {
    const dispatch = useDispatch();
    const TranslateString = useI18n()
    const { account } = useWallet()
    const { myEmperor, currentEmperor } = useEmperor()
    const { onRegister } = useRegister()
    const { onSteal } = useStealCrown()
    const { onApproveXPefi } = useXPefiApprove()
    const xPefiContract = useXPefi();


    const getMyStatus = () => {
        if (account) {
            if (myEmperor.isRegistered) {
                if (myEmperor.address === currentEmperor.address) {
                    return 'king';
                }
                return 'registered';
            }
            return "not registered";
        }
        return "not connected";
    }

    const myStatus = getMyStatus()

    const onRegisterPenguin = async (nickName, color, style) => {
        await onRegister(nickName, color, style)
    }

    const fetchXPefiApproveBalance = useCallback(async () => {
        const approveBalance = (await xPefiContract.methods.allowance(account, getXPefiAddress()).call()) / 1e18
        console.log('111--->', approveBalance)
        // setMaxAmount(xPefiBalance.toString())
    }, [account, xPefiContract])

    const onStealCrown = async (amount) => {
        fetchXPefiApproveBalance();
        // call approve function
        // await onApproveXPefi()
        // await onSteal(amount)
    }

    const [onToggleRegister] = useModal(
        <RegisterModal onConfirm={onRegisterPenguin} />
    )

    const [onToggleSteal] = useModal(
        <StealCrownModal onConfirm={onStealCrown} />
    )


    return (
        <CardBlock>
            <CardBlockHeader>
                <TitleBgWrapper color={myEmperor.color}>
                    <SvgIcon
                        src={
                            myStatus === 'registered'
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
                {myStatus === 'not registered' && (
                    <RegisterContainer>
                        <Text bold color="secondary" fontSize="18px">
                            {TranslateString(1074, 'You must register your penguin before attempting to steal the Throne')}
                        </Text>
                        <RegisterButtonContainer>
                            <Button onClick={onToggleRegister}>
                                {TranslateString(292, 'Register')}
                            </Button>
                        </RegisterButtonContainer>
                    </RegisterContainer>
                )}

                {myStatus === 'registered' && (
                    <RegisterContainer>
                        <Text bold color="secondary" fontSize="18px">
                            {TranslateString(1074, 'You have been Emperor for:')}
                        </Text>
                        <Text bold color="primary" fontSize="22px">
                            {`${myEmperor.timeAsEmperor} seconds`}
                        </Text>
                        <RegisterButtonContainer>
                            <Button onClick={onToggleSteal}>
                                {TranslateString(292, 'Steal the crown')}
                            </Button>
                        </RegisterButtonContainer>
                    </RegisterContainer>
                )}
            </CardBlockContent>
        </CardBlock>
    )
}



export default YourScoreBlock
