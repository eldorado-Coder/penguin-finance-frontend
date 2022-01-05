import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'
import SvgIcon from 'components/SvgIcon'
import UpcomingIDOs from './components/UpcomingIDOs'
import OngoingIDOs from './components/OngoingIDOs'
import CompletedIDOs from './components/CompletedIDOs'
import AcoomalatingSteps from './components/AcoomalatingSteps'

const TOP_TIER_PROJECTS = [
  {
    name: 'apply-project',
    label: 'Apply as a project',
    link: 'https://docs.google.com/forms/u/2/d/e/1FAIpQLSdgM5oq-3shkNQeEhTGHP-JDiRY6Y3URaGnKCf6QVt4qSJVMA/viewform',
  },
  {
    name: 'trader-joe',
    label: 'Buy on trader joe',
    link: 'https://traderjoexyz.com/#/trade?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
  },
  {
    name: 'pangolin',
    label: 'Buy on pangolin',
    link: 'https://app.pangolin.exchange/#/swap?outputCurrency=0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c',
  },
  {
    name: 'lydia',
    label: 'Buy on lydia exchange',
    link: 'https://exchange.lydia.finance/#/swap?inputCurrency=0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
  },
]

const Launchpad: React.FC = () => {
  const { isDark } = useTheme()

  const handleLinkProject = (projectLink) => () => {
    window.open(projectLink, '_blank')
  }

  const handleSignUp = () => {
    window.open('https://t.me/pefi_announcements', '_blank')
  }

  return (
    <div>
      <IgloosBannerContainer justifyContent="center">
        <BannerImage
          src={
            isDark
              ? `${process.env.PUBLIC_URL}/images/launchpad-v2/banners/dark_banner.jpg`
              : `${process.env.PUBLIC_URL}/images/launchpad-v2/banners/light_banner.jpg`
          }
          alt="launchpad banner"
        />
        <HeaderContainer>
          <HeaderTitle fontSize="48px" fontWeight={800} color="white" mb="8px">
            THE FIRST & FAIREST LAUNCHPAD PROTOCOL ON THE AVALANCHE NETWORK
          </HeaderTitle>
          <Description fontSize="24px" lineHeight="31px" color="white">
            Stake iPEFI and earn allocations to invest in top-tier projects.
          </Description>
          <Description fontSize="24px" lineHeight="31px" color="white">
            No KYC required.
          </Description>
          <TopTierProjects mt="32px">
            {TOP_TIER_PROJECTS.map((project) => {
              return (
                <Project
                  justifyContent="center"
                  alignItems="center"
                  key={project.name}
                  onClick={handleLinkProject(project.link)}
                >
                  <SvgIcon
                    width="220px"
                    height="64px"
                    src={`${process.env.PUBLIC_URL}/images/launchpad-v2/button-frame.svg`}
                  />
                  <ProjectTitle color="white" fontSize="18px" textTransform="uppercase">
                    {project.label}
                  </ProjectTitle>
                </Project>
              )
            })}
          </TopTierProjects>
        </HeaderContainer>
      </IgloosBannerContainer>
      <LaunchpadPage>
        <LaunchpadBgContainer />
        <AcoomalatingSteps />
        <IDOsContainer>
          <UpcomingIDOs />
          <OngoingIDOs />
          <CompletedIDOs />
        </IDOsContainer>
        <SignUpContainer>
          <SignUpImage src={`${process.env.PUBLIC_URL}/images/ido/signup_banner.png`} />
          <SignUpDetails justifyContent="space-around" alignItems="center">
            <div className="signup-button">
              <SignUpLabel color="white" fontSize="31px" fontWeight={800}>
                Get Alerts For New Launches
              </SignUpLabel>
              <StyledButton onClick={handleSignUp} mt="20px">
                Sign Up
              </StyledButton>
            </div>
          </SignUpDetails>
        </SignUpContainer>
      </LaunchpadPage>
    </div>
  )
}


const IDOsContainer = styled.div`
  margin-top: -72px;
`;

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
`

const LaunchpadBgContainer = styled.div`
  background-image: url('/images/launchpad-v2/background.svg');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
  background-color: ${({ theme }) => (theme.isDark ? '#2e2152' : '#483692')};
`

// banner
const IgloosBannerContainer = styled(Flex)`
  margin-bottom: 32px;
  position: relative;
  justify-content: flex-start;

  @media (min-width: 1200px) {
    margin-bottom: 0px;
  }

  @media (min-width: 1400px) {
    justify-content: center;
  }

  img {
    max-height: 520px;
    object-fit: cover;
  }
`
const BannerImage = styled.img`
  z-index: 1;
  width: 100%;
  min-height: 400px;

  @media (min-width: 640px) {
    min-height: 320px;
  }

  @media (min-width: 968px) {
    min-height: 480px;
  }
`

const Description = styled(Text)`
  font-family: 'Fira Code';
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-shadow: 2px 2px #000000;

  @media (min-width: 968px) {
    font-size: 20px;
    line-height: 30px;
  }

  @media (min-width: 1080px) {
    font-size: 24px;
    line-height: 36px;
    text-align: left;
  }
`

const HeaderTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  max-width: 1040px;
  text-shadow: 2px 2px #000000;

  @media (min-width: 968px) {
    font-size: 36px;
    line-height: 48px;
  }

  @media (min-width: 1080px) {
    font-size: 48px;
    line-height: 72px;
    text-align: left;
  }
`

const HeaderContainer = styled.div`
  position: absolute;
  margin: 48px 16px 0;
  top: 0;
  z-index: 2;

  @media (min-width: 640px) {
    margin: 60px 32px 0;
  }

  @media (min-width: 968px) {
    margin: 60px 32px 0;
  }

  @media (min-width: 1080px) {
    min-width: calc(100% - 60px);
    margin: 100px 24px 0;
  }

  @media (min-width: 1500px) {
    min-width: 1450px;
    margin: 100px 24px 0;
  }

  @media (min-width: 1720px) {
    min-width: 1600px;
    margin: 100px 64px 0;
  }

  @media (min-width: 2400px) {
    min-width: 2000px;
    margin: 100px 64px 0;
  }
`

const TopTierProjects = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;

  div {
    margin-right: 16px;
    margin-bottom: 16px;

    @media (min-width: 1200px) {
      margin-right: 32px;
      margin-bottom: 32px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (min-width: 1080px) {
    justify-content: flex-start;
  }
`

const ProjectTitle = styled(Text)`
  font-size: 10px;

  @media (min-width: 640px) {
    font-size: 10px;
  }

  @media (min-width: 968px) {
    font-size: 13px;
  }

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const Project = styled(Flex)`
  position: relative;
  width: 140px;
  height: 40px;

  @media (min-width: 968px) {
    width: 165px;
    height: 48px;
  }

  @media (min-width: 1200px) {
    width: 230px;
    height: 65px;
  }

  div {
    &:first-child {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    margin-bottom: 0;
    white-space: nowrap;

    svg {
      width: 140px !important;
      height: 40px;

      @media (min-width: 968px) {
        width: 165px !important;
        height: 48px;
      }

      @media (min-width: 1200px) {
        width: 230px !important;
        height: 65px;
      }
    }
  }

  &:hover {
    svg {
      fill: white;

      .st1 {
        fill: white;
      }
    }
    cursor: pointer;

    div {
      z-index: 1;
      color: black;
    }
  }
`

// sign up container
const SignUpContainer = styled(Page)`
  max-width: 1200px;
  position: relative;
  margin-top: 20px;
  margin: auto;
  min-height: auto;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 900px) {
    margin-top: 0px;
    padding-top: 41px;
    padding-bottom: 41px;
    padding-left: 8px;
    padding-right: 8px;
  }
`

const SignUpImage = styled.img`
  width: 100%;
  background: linear-gradient(180deg, #7361be 0%, #3a258f 100%);
  border-radius: 10px;
  min-height: 200px;
  object-fit: cover;
`

const SignUpDetails = styled(Flex)`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);
  min-height: 200px;

  .signup-button {
    width: 80%;

    @media (min-width: 768px) {
      width: 70%;
    }
  }

  @media (min-width: 768px) {
    top: 0;
    bottom: 0;
    transform: unset;
  }
`

const SignUpLabel = styled(Text)`
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 31px;
  }
`

const StyledButton = styled(Button)`
  box-shadow: none;
  width: 180px;
  height: 48px;
  border-radius: 5px;
  background: white;
  color: #620aa8;
  font-size: 20px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 24px;
    width: 240px;
    height: 54px;
  }

  &:hover:not(:disabled):not(.penguin-button--disabled):not(.penguin-button--disabled):not(:active) {
    opacity: 1;
  }
`

export default Launchpad
