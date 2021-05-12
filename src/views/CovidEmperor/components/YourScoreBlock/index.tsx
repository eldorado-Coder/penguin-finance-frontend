import React from 'react'
import styled from 'styled-components'
import { useModal } from 'penguinfinance-uikit2'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import SvgIcon from 'components/SvgIcon'
import { useEmperor } from 'state/hooks'
import { useXPefi } from 'hooks/useContract'
import { getEmperorAddress } from 'utils/addressHelpers'
import { badWordsFilter } from 'utils/address'
import { useEmperorActions, useXPefiApprove } from 'hooks/useEmperor'
import RegisterModal from './RegisterModal'
import StealCrownModal from './StealCrownModal'
import CustomStyleModal from './CustomStyleModal'
import { getPenguinColor } from '../utils'
import { UnlockButton, Title, SubTitle, Caption, PGButton, CardBlockHeader, CardBlock } from '../UI'

const TitleBgWrapper = styled.div<{ color: string }>`
  z-index: -1;
  width: 100%;
  text-align: center;
  margin-top: 12%;
  position: absolute;

  svg {
    width: 300px;
  }

  transform: scale(1.8);
  @media (min-width: 640px) {
    transform: scale(1.5);
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    transform: scale(1.8);
  }
`

const CardBlockContent = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  padding: 16px;
  position: relative;
  text-align: center;
  margin-top: 30%;
  min-width: 150px;
  padding: 16px 8px 8px;
  @media (min-width: 640px) {
    width: 100%;
    margin-top: 22%;
    padding: 32px 16px 12px;
  }
  @media (min-width: 768px) {
    width: 100%;
    padding: 40px 20px 16px;
    margin-top: 28%;
  }
  @media (min-width: 1200px) {
    width: 100%;
    border-radius: 16px;
    padding: 40px 24px 16px;
    margin-top: 35%;
  }
  @media (min-width: 1450px) {
    min-width: 240px;
    padding: 40px 24px 16px;
    margin-top: 37%;
  }
  @media (min-width: 1200px) and (max-height: 800px) {
    padding-top: 16px;
  }
`

const WalletContainer = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
  margin-top: 10px;
  button {
    margin-top: 20px;
    @media (max-width: 640px) {
      margin-top: 10px;
    }
  }
`

const RegisterContainer = styled.div`
  margin-top: 10px;
  text-align: center;
  position: relative;
  z-index: 10;
  button {
    margin-top: 10px;
  }
`

const RegisterButtonContainer = styled.div`
  button {
    width: 200px;
    border-radius: 30px;
  }
`
const CustomizeStyleButtonContainer = styled.div`
  button {
    width: 200px;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 30px;
  }
`

const YourScoreBlock: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { myEmperor, currentEmperor } = useEmperor()
  const { onRegister, onSteal, onChangeStyle, onChangeColor } = useEmperorActions()
  const { onApproveXPefi } = useXPefiApprove()
  const xPefiContract = useXPefi()

  const getMyStatus = () => {
    if (account) {
      if (myEmperor.isRegistered) {
        if (myEmperor.address === currentEmperor.address) {
          return 'king'
        }
        return 'registered'
      }
      return 'not registered'
    }
    return 'not connected'
  }

  const myStatus = getMyStatus()

  const onRegisterPenguin = async (nickName, color, style) => {
    await onRegister(nickName, color, style)
  }

  const onStealCrown = async (amount: string) => {
    const allowanceBalance = (await xPefiContract.methods.allowance(account, getEmperorAddress()).call()) / 1e18
    if (allowanceBalance === 0) {
      // call approve function
      await onApproveXPefi()
    }
    await onSteal(amount)
  }

  const onChangeEmperorStyle = async (style: string) => {
    await onChangeStyle(style)
  }

  const onChangeEmperorColor = async (color: string) => {
    await onChangeColor(color)
  }

  const [onToggleRegister] = useModal(<RegisterModal onConfirm={onRegisterPenguin} />)

  const [onToggleStealModal] = useModal(<StealCrownModal onConfirm={onStealCrown} />)

  const [onToggleCustomModal] = useModal(
    <CustomStyleModal onConfirmChangeStyle={onChangeEmperorStyle} onConfirmChangeColor={onChangeEmperorColor} />,
  )

  return (
    <CardBlock>
      <CardBlockHeader>
        <TitleBgWrapper color={getPenguinColor(myEmperor).code}>
          <SvgIcon
            src={`${process.env.PUBLIC_URL}/images/covid-emperor/banner/your_penguin.svg`}
            width="100%"
            height="20px"
          />
        </TitleBgWrapper>
      </CardBlockHeader>
      <CardBlockContent>
        {myStatus === 'not connected' && (
          <WalletContainer>
            <Title bold color="secondary">
              {TranslateString(1074, 'Check your Rank')}
            </Title>
            <Caption>Connect wallet to view</Caption>
            <UnlockButton />
          </WalletContainer>
        )}
        {myStatus === 'not registered' && (
          <RegisterContainer>
            <SubTitle bold color="secondary">
              {TranslateString(1074, 'You must register your penguin before attempting to steal the Throne')}
            </SubTitle>
            <RegisterButtonContainer>
              <PGButton onClick={onToggleRegister}>{TranslateString(292, 'Register')}</PGButton>
            </RegisterButtonContainer>
          </RegisterContainer>
        )}

        {myStatus === 'registered' && (
          <RegisterContainer>
            <Title bold color="primary">
              {TranslateString(1074, myEmperor && badWordsFilter(myEmperor.nickname))}
            </Title>
            <SubTitle bold color="secondary">
              {TranslateString(1074, 'You have been Emperor for:')}
            </SubTitle>
            <SubTitle bold color="primary">
              {`${myEmperor.timeAsEmperor} seconds`}
            </SubTitle>
            <RegisterButtonContainer>
              <PGButton onClick={onToggleStealModal} endIcon={<div>{` `}</div>}>
                {TranslateString(292, 'Steal the Crown')}
              </PGButton>
            </RegisterButtonContainer>
            <CustomizeStyleButtonContainer>
              <PGButton onClick={onToggleCustomModal}>{TranslateString(292, 'Customize Penguin')}</PGButton>
            </CustomizeStyleButtonContainer>
          </RegisterContainer>
        )}

        {myStatus === 'king' && (
          <RegisterContainer>
            <Title bold color="secondary">
              {TranslateString(1074, myEmperor && badWordsFilter(myEmperor.nickname))}
            </Title>
            <SubTitle bold color="secondary">
              {TranslateString(1074, 'You have been Emperor for:')}
            </SubTitle>
            <Title bold color="primary">
              {`${myEmperor.timeAsEmperor} seconds`}
            </Title>
          </RegisterContainer>
        )}
      </CardBlockContent>
    </CardBlock>
  )
}

export default YourScoreBlock
