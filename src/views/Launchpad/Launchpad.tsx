import React from 'react'
import styled from 'styled-components'
import { Text, Button, Flex } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import StakeCard from './components/StakeCard/StakeCard'
import YourTierCard from './components/YourTierCard/YourTierCard'
import SherpaCard from './components/SherpaCard/SherpaCard'

const Launchpad: React.FC = () => {
  const { isDark } = useTheme()

  //   const [activeTab, setActiveTab] = useState(0)

  //   const handleSwitchTab = (tab) => {
  //     setActiveTab(tab)
  //   }

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
              ? `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_dark.png`
              : `${process.env.PUBLIC_URL}/images/launchpad/banners/launchpad_banner_light.png`
          }
          alt="launchpad banner"
        />
      </IgloosBannerContainer>
      {/* <Flex justifyContent="center" pb="32px">
        <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
          <OptionItem>Next</OptionItem>
          <OptionItem>Past</OptionItem>
        </ButtonMenu>
      </Flex> */}
      <CardLayout>
        <SherpaCard />
        <StakeCard />
        <YourTierCard />
      </CardLayout>
      <FCard>
        <Text color="text" textAlign="center">
          <span>The Penguin Launchpad</span> is a fundraising platform built on Avalanche with fairness,
          decentralization, and transparency as core principles. By utilizing <span>xPEFI</span>, we ensure that your
          token is distributed to a vast and committed userbase with through DeFi experience. If you&apos;d like to
          launch an Avalanche-native project, fill out the form below.
        </Text>
        <Flex justifyContent="center" mt="32px">
          <NormalButton scale="sm" onClick={onClickLaunchToken}>
            Launch My Token To Space
          </NormalButton>
        </Flex>
      </FCard>
    </LaunchpadPage>
  )
}

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
`

const LaunchpadBgContainer = styled.div`
  background-image: url(/images/launchpad/launchpad_background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
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
    margin-bottom: 60px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

// const OptionItem = styled(ButtonMenuItem)`
//   min-width: 100px;
// `

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
    color: ${({ theme }) => theme.colors.success};
    font-weight: bold;
  }
`

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 40px;
  color: white;
  background: #7645d9;
`

export default Launchpad
