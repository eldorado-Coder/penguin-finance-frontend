import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import useTheme from 'hooks/useTheme'

const AcoomalatingSteps = () => {
  const { isDark } = useTheme()
  const history = useHistory()

  const handleStakePefi = () => {
    history.push('/stake')
  }

  const handleRegisterIDO = () => {
    const upcomingIdosElement = document.getElementById('upcoming-idos')
    if (upcomingIdosElement) {
      upcomingIdosElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  const handleBuyPefi = () => {
    window.open('https://traderjoexyz.com/#/trade?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c', '_blank')
  }

  return (
    <>
      <Label fontSize="40px" lineHeight="60px" mb="180px" fontWeight={500} color="white">
        3 Simple Steps to Start Acoomulating
      </Label>
      <StyledFlexLayout>
        <FCard>
          <IdoLogoContainer>
            <PefiImg src="/images/penguin-finance-logo.svg" alt="pefi" />
          </IdoLogoContainer>
          <Title fontSize="24px" mb="20px">
            1. Get PEFI
          </Title>
          <Description fontSize="16px">
            To participate in the Penguin Launchpad, you’ll need to acquire PEFI first. You can get PEFI from an
            Avalanche DEX or by yield farming on the Igloos.
          </Description>
          <BuyButton onClick={handleBuyPefi} justifyContent="flex-end" alignItems="center" ml="auto" mt="16px">
            <Title fontSize="18px">Buy PEFI</Title>
            <ArrowRightImg src={`/images/launchpad/arrow-${isDark ? 'dark' : 'light'}.png`} alt="arrow-right" />
          </BuyButton>
        </FCard>
        <FCard>
          <IdoLogoContainer>
            <img src="/images/launchpad/ipefi.svg" alt="ipefi" />
          </IdoLogoContainer>
          <Title fontSize="24px" mb="20px">
            2. Stake PEFI for iPEFI
          </Title>
          <Description fontSize="16px">
            Once you have PEFI in your wallet, you’ll want to stake it in the Nest to receive iPEFI. Our staking token
            gives you access to IDOs, the Club, and the Penguin Emperor game.
          </Description>
          <BuyButton onClick={handleStakePefi} justifyContent="flex-end" alignItems="center" ml="auto" mt="16px">
            <Title fontSize="18px">Stake PEFI</Title>
            <ArrowRightImg src={`/images/launchpad/arrow-${isDark ? 'dark' : 'light'}.png`} alt="arrow-right" />
          </BuyButton>
        </FCard>
        <FCard>
          <IdoLogoContainer>
            <img src="/images/launchpad/cyborgpefi.svg" alt="ido" />
          </IdoLogoContainer>
          <Title fontSize="24px" mb="20px">
            3. Register for an IDO
          </Title>
          <Description fontSize="16px">
            By holding iPEFI, you can now register for upcoming IDOs and receive allocations based on your iPEFI amount.
            The more iPEFI you hold, the more allocations you get!
          </Description>
          <BuyButton onClick={handleRegisterIDO} justifyContent="flex-end" alignItems="center" ml="auto" mt="16px">
            <Title fontSize="18px">Register for an IDO</Title>
            <ArrowRightImg src={`/images/launchpad/arrow-${isDark ? 'dark' : 'light'}.png`} alt="arrow-right" />
          </BuyButton>
        </FCard>
      </StyledFlexLayout>
    </>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => (props.theme.isDark ? '#2E264C' : '#fff')};
  border-radius: 16px;
  box-shadow: 4px 4px 32px rgba(165, 165, 165, 0.25);
  backdrop-filter: blur(38px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 110px 24px 25px;
  position: relative;
  text-align: center;
  margin-bottom: 120px;

  @media (min-width: 968px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`

const Description = styled(Text)`
  font-family: 'Fira Code';
  text-align: left;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#474747')};
  min-height: unset;
  line-height: 20px;
  min-height: 150px;

  @media (min-width: 1200px) {
    font-size: 16px;
  }
`

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }

  @media (min-width: 1400px) {
    margin-left: -24px;
    margin-right: -24px;
  }

  @media (max-width: 576px) {
    margin-left: 0px;
    margin-right: 0px;
  }

  & > * {
    height: 360px;
    margin-left: 40px;
    margin-right: 40px;
    min-width: 305px;
    max-width: 26%;
    width: 100%;
    @media (max-width: 576px) {
      margin-left: 0px;
      margin-right: 0px;
      max-width: 100%;
    }
  }
`

const Label = styled(Text)`
  color: white;
  font-size: 24px;
  line-height: 36px;

  @media (min-width: 968px) {
    font-size: 40px;
    line-height: 60px;
    text-align: left;
    margin-top: 0px;
  }
  @media (max-width: 576px) {
    margin-bottom: 120px;
  }
`

const IdoLogoContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  padding: 16;
  background: white;

  img {
    width: 90%;
    margin-top: 10%;
  }
`

const PefiImg = styled.img`
  width: 96% !important;
  margin-top: 2% !important;
`

const ArrowRightImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  cursor: pointer;
`

const Title = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#000')};
  margin-bottom: 10px;
`

const BuyButton = styled(Flex)`
  cursor: pointer;
`

export default AcoomalatingSteps
