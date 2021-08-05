import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenu, ButtonMenuItem, Button, Text } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import StakeCard from './components/StakeCard/StakeCard'
import YourTierCard from './components/YourTierCard/YourTierCard'
import SherpaCard from './components/SherpaCard/SherpaCard'

const LaunchpadDistribution: React.FC = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState(1)

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  const onClickLaunchToken = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdgM5oq-3shkNQeEhTGHP-JDiRY6Y3URaGnKCf6QVt4qSJVMA/viewform',
      '_blank',
    )
  }

  return (
    <LaunchpadPage>
      <LaunchpadBgContainer />
      <IgloosBannerContainer>
        <BannerImage
          src={
            isDark
              ? `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_dark.gif`
              : `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_light.gif`
          }
          alt="launchpad banner"
        />
      </IgloosBannerContainer>
      <Flex justifyContent="center" pb="40px">
        <TabWrapper>
          <ButtonMenu variant="subtle" activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
            <OptionItem active={activeTab === 0}>Next</OptionItem>
            <OptionItem active={activeTab === 1}>Past</OptionItem>
          </ButtonMenu>
        </TabWrapper>
      </Flex>
      {activeTab === 0 ? (
        <FCard>
          <Text color="text" textAlign="center">
            <span>The Penguin Launchpad</span> is a fundraising platform built on Avalanche with fairness,
            decentralization, and transparency as core principles. By utilizing <span>xPEFI</span>, we ensure that your
            token is distributed to a vast and committed userbase with thorough DeFi experience. If you&apos;d like to
            launch an Avalanche-native project, fill out the form below.
          </Text>
          <Flex justifyContent="center" mt="32px">
            <NormalButton onClick={onClickLaunchToken}>Launch My Token To Space</NormalButton>
          </Flex>
        </FCard>
      ) : (
        <CardLayout>
          <SherpaCard />
          <StakeCard />
          <YourTierCard />
        </CardLayout>
      )}
    </LaunchpadPage>
  )
}

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
`

const LaunchpadBgContainer = styled.div`
  background-image: url(/images/launchpad/launchpad_background.png);
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

// banner
const IgloosBannerContainer = styled.div`
  margin-bottom: 32px;

  @media (min-width: 1200px) {
    margin-bottom: 32px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const CardLayout = styled(FlexLayout)`
  & > * {
    margin: 0 8px;
    margin-bottom: 32px;
    width: 100%;

    @media (min-width: 640px) {
      min-width: 320px;
      max-width: 50%;
      width: unset;
    }
    @media (min-width: 768px) {
      min-width: 320px;
      // max-width: 31.5%;
      max-width: 340px;
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    justify-content: space-around;
  }
  @media (min-width: 1450px) {
    justify-content: space-between;
  }
`

const TabWrapper = styled.div`
  div {
    border: 2px solid ${({ theme }) => (theme.isDark ? '#221b38' : '#b2b2ce')};
    background-color: ${({ theme }) => (theme.isDark ? '#332654' : '#e8e4ef')};
    border-radius: 18px;
  }
`

const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 100px;

  background-color: ${({ active }) => active && '#ec3e3f'};
  color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  padding: 32px 24px;
  margin-top: 16px;

  @media (min-width: 1450px) {
    margin-left: 8px;
    margin-right: 8px;
  }

  span {
    color: ${({ theme }) => (theme.isDark ? theme.colors.success : theme.colors.primaryBright)};
    font-weight: bold;
  }
`

const NormalButton = styled(Button)`
  border-radius: 16px;
  padding: 0 60px;
  color: white;
  font-size: 20px;
  background: ${({ theme }) => (theme.isDark ? '#7645d9' : theme.colors.primaryBright)};
`

export default LaunchpadDistribution
