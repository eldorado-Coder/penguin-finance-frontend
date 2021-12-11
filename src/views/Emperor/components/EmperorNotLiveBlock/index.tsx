import React from 'react'
import styled from 'styled-components'
import { Text, Button, Flex, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useEmperor } from 'state/hooks'
import { getPenguinColor } from '../utils'
import { UnlockButton } from '../UI'

const TitleBgWrapper = styled.div<{ color: string; account: string; isMobile?: boolean }>`
  z-index: 20;
  max-height: 200px;

  img {
    @media (min-width: 768px) {
      height: 180px;
    }
    @media (min-width: 1200px) {
      height: 200px;
    }
  }
`

const CardBlockContent = styled.div<{ account?: string }>`
  background: #603721;
  border: 4px solid black;
  border-radius: 20px;
  padding: 12px;
  position: relative;
  text-align: center;
  margin-top: -70px;
  max-width: 75%;

  @media (min-width: 640px) {
    margin-top: -100px;
  }
`

const WalletContainer = styled.div`
  background: #F7E1BC;
  border: 4px solid black;
  border-radius: 20px;
  padding: 32px 16px 16px;
  position: relative;

  @media (min-width: 640px) {
    padding: 64px 20px 20px;
  }
  @media (min-width: 968px) {
    padding: 64px 32px 32px;
  }
`

const StarterButton = styled(Button)`
  background: linear-gradient(0deg, #FF7648 -36.22%, #FFE129 156.82%);
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  width: 160px;
  height: 40px;
  font-weight: 500;

  @media (min-width: 640px) {
    margin-right: 16px;
    margin-bottom: 0;
    font-size: 20px;
    width: 180px;
    height: 48px;
  }

  @media (min-width: 768px) {
    font-size: 22px;
    width: 190px;
    height: 48px;
  }

  @media (min-width: 1200px) {
    font-size: 25px;
    width: 212px;
    height: 60px;
  }
`;

const LastRoundButton = styled(Button)`
  background: linear-gradient(0deg, #FF7648 -36.22%, #FFE129 156.82%);
  border-radius: 8px;
  font-size: 16px;
  width: 160px;
  height: 40px;
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 640px) {
    margin-left: 16px;
    font-size: 20px;
    width: 180px;
    height: 48px;
  }

  @media (min-width: 768px) {
    font-size: 22px;
    width: 190px;
    height: 48px;
  }

  @media (min-width: 1200px) {
    font-size: 25px;
    width: 212px;
    height: 60px;
  }
`;

const StyledUnlockButton = styled(UnlockButton)`
  background: linear-gradient(0deg, #FF7648 -36.22%, #FFE129 156.82%);
  border-radius: 8px;
  font-size: 16px;
  width: 160px;
  height: 40px;
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 640px) {
    margin-left: 16px;
    font-size: 20px;
    width: 180px;
    height: 48px;
  }

  @media (min-width: 768px) {
    font-size: 22px;
    width: 190px;
    height: 48px;
  }

  @media (min-width: 1200px) {
    font-size: 25px;
    width: 212px;
    height: 60px;
  }
`;

const AlertContainer = styled.div`
  background: rgba(214, 144, 73, 0.5);
  border-radius: 22px;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledText = styled(Text)`
  font-size: 18px;
  -webkit-text-stroke: 1px black;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

  span {
    color: #fcffc5;
  }

  @media (min-width: 640px) {
    font-size: 20px;
  }
  @media (min-width: 968px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    font-size: 26px;
  }
`;

const CardBlock = styled.div`
  margin-top: 8%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const Actions = styled(Flex)`
  flex-direction: column;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const EmperorNotLiveBlock = ({ onShowLastRound }) => {
  const { currentEmperor } = useEmperor()
  const { isSm, isXs } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const isMobile = isSm || isXs

  const handleViewStarterGuide = () => {
    window.open(
      'https://penguin-finance.medium.com/the-penguin-emperor-is-back-new-rules-huge-prizes-d4a6b79c3816',
      '_blank',
    )
  }

  return (
    <CardBlock>
      <Flex flexDirection='column' alignItems='center'>
        <TitleBgWrapper isMobile={isMobile} color={!account && getPenguinColor(currentEmperor)} account={account}>
          <img
            src={`${process.env.PUBLIC_URL}/images/emperor/banner/not_live_emperor.svg`}
            height="200px"
            alt="emperor-banner"
          />
        </TitleBgWrapper>
        <CardBlockContent account={account}>
          <WalletContainer>
            <AlertContainer>
              <StyledText color='#FFFFFF' fontWeight='bold'>
                The Emperor Game <span>is currently not live.</span>
              </StyledText>
              <StyledText color='#FFFFFF' fontWeight='bold'>
                A new round will start soon
              </StyledText>
            </AlertContainer>
            <Actions justifyContent='center' alignItems="center">
              <StarterButton className="starter-button" onClick={handleViewStarterGuide}>
                Starter Guide
              </StarterButton>
              {account ?
                <LastRoundButton onClick={onShowLastRound}>
                  Last Round
                </LastRoundButton>
                : <StyledUnlockButton />
              }
            </Actions>
          </WalletContainer>
        </CardBlockContent>
      </Flex>
    </CardBlock>
  )
}

export default EmperorNotLiveBlock
