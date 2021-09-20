import React from 'react'
import styled from 'styled-components'
import { Text, Button, Flex, Progress } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import Page from 'components/layout/Page'

const Launchpad: React.FC = () => {
  const { isDark } = useTheme()

  const onClickLaunchToken = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdgM5oq-3shkNQeEhTGHP-JDiRY6Y3URaGnKCf6QVt4qSJVMA/viewform',
      '_blank',
    )
  }

  const handleViewWebs = () => {
    window.open('https://sherpa.cash/', '_blank');
  };

  const handleBuySherpa = () => {
    window.open('https://app.pangolin.exchange/#/swap?outputCurrency=0xa5E59761eBD4436fa4d20E1A27cBa29FB2471Fc6', '_blank');
  };

  const handleLearnBoofi = () => {
    return null;
  };

  const handleViewBoofi = () => {
    window.open('https://www.boofinance.io/', '_blank');
  };

  const marks = [1, 2, 3, 4]
  const launchStage = 1;
  const stageContents = [
    { 
      label: 'Pre-Launch Phase'
    },
    { 
      label: 'Staking Phase',
      description: 'September 22nd - September 29th'
    },
    { 
      label: 'Distribution Phase',
      description: 'September 30th - October 7th'
    }
  ]

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
      <BoofiLabel fontWeight={500} fontSize='24px'>Upcoming Offerings</BoofiLabel>
      <BoofiCard>
        <Flex alignItems='center' justifyContent='space-between' flexWrap='wrap'>
          <img src='/images/launchpad/boofi-logo.svg' alt='boofi' width={320} />
          <BoofiDescription>Unique yield farming protocol on Avalanche offering deflationary NFTs and decentralized governance.</BoofiDescription>
          <Flex flexDirection='column'>
            <BoofiButton onClick={handleLearnBoofi}>Learn More</BoofiButton>
            <BoofiButton onClick={handleViewBoofi}>View Website</BoofiButton>
          </Flex>
        </Flex>
        <Flex>
          <ProgressWrapper>
            <Progress primaryStep={30} />
            <Flex justifyContent='space-between'>
              {marks.map(mark => {
                return (
                  <Mark key={mark} isActive={mark <= launchStage}>
                    {mark}
                  </Mark>
                )
              })}
            </Flex>
            <StageDescriptionContainer>
              {stageContents.map(stage => {
                return (
                  <Stage flexDirection='column' alignItems='center' key={stage.label}>
                    <StageLabel fontWeight={600} fontSize='18px'>{stage.label}</StageLabel>
                    {stage.description && 
                      <StageDescription fontWeight={500} fontSize='14px'>{stage.description}</StageDescription>
                    }
                  </Stage>
                )
              })}
            </StageDescriptionContainer>
          </ProgressWrapper>
          <StageLabel fontWeight={600} fontSize='18px' ml='16px' mr='16px' mt='56px'>PEFI/BOOFI</StageLabel>
        </Flex>
      </BoofiCard>
      <MigrationVideo controls>
        <source src='/images/launchpad/boofi-launchpad.mp4' />
      </MigrationVideo>
      <EndedLabel fontWeight={500} fontSize='24px' mt='32px'>Ended</EndedLabel>
      <SherpaCard>
        <Flex>
          <Flex mr='100px'>
            <SherpaLogo src='/images/launchpad/sherpalogo.png' alt='sherpa' width={80} />
          </Flex>
          <SherpaDetailWrapper justifyContent='space-between'>
            <Flex flexDirection='column' alignItems='center' mt='4px' mr='16px'>
              <SherpaText fontWeight={600} fontSize='32px' lineHeight={1}>$0.15</SherpaText>
              <SherpaText fontWeight={500} fontSize='18px' lineHeight={1.5}>Listing Price</SherpaText>
            </Flex>
            <Flex flexDirection='column' alignItems='center' mt='4px' mr='16px'>
              <SherpaText fontWeight={600} fontSize='32px' lineHeight={1}>$4.70</SherpaText>
              <SherpaText fontWeight={500} fontSize='18px' lineHeight={1.5}>All Time High</SherpaText>
            </Flex>
            <Flex flexDirection='column' alignItems='center' mt='4px' mr='16px'>
              <SherpaText fontWeight={600} fontSize='32px' lineHeight={1}>31x</SherpaText>
              <SherpaText fontWeight={500} fontSize='18px' lineHeight={1.5}>Return to ATH</SherpaText>
              <ATHPercentage lineHeight={1}>+3100%</ATHPercentage>
            </Flex>
          </SherpaDetailWrapper>
        </Flex>
        <Flex flexDirection='column'>
          <WebViewButton onClick={handleViewWebs}>View Website</WebViewButton>
          <BuySherpaButton onClick={handleBuySherpa}>Buy SHERPA</BuySherpaButton>
        </Flex>
      </SherpaCard>
      <FCard>
        <Description textAlign="center">
          The Penguin Launchpad is a fundraising platform built on Avalanche with fairness,
          decentralization, and transparency as core principles. By utilizing iPEFI, we ensure that your
          token is distributed to a vast and committed userbase with thorough DeFi experience.
        </Description>
        <Flex justifyContent="center" mt="32px">
          <NormalButton scale="sm" onClick={onClickLaunchToken}>
            Launch Your Project To Orbit
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
    margin-bottom: 60px;
  }
`
const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 24px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  position: relative;
  padding: 32px 24px;
  margin-top: 16px;

  span {
    color: ${({ theme }) => theme.colors.success};
    font-weight: bold;
  }
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.isDark ? 'white' : '#372b70' };
  font-weight: 500;
`;

const NormalButton = styled(Button)`
  border-radius: 10px;
  padding: 0 40px;
  height: 40px;
  color: white;
  background: #ea3e3f;
`

const MigrationVideo = styled.video`
  width: 100%;
  border-radius: 16px;

  @media (min-width: 640px) {
    width: 100%;
    margin-right: 16px;
  }
`;

const EndedLabel = styled(Text)`
  color: #f24e4d;
`;

const SherpaCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  background: #f24e4d;
  color: white;
  border-radius: 8px;
  position: relative;
  padding: 24px;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const SherpaText = styled(Text)`
  color: white;
`;

const WebViewButton = styled(Button)`
  background: white;
  color: #f24e4d;
  height: 32px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const BuySherpaButton = styled(Button)`
  background: #32283d;
  color: #f24e4d;
  height: 32px;
  white-space: nowrap;
  font-weight: 500;
  border-radius: 6px;
`;

const BoofiButton = styled(Button)`
  height: 32px;
  background: white;
  color: #38db93;
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;

  &:first-child {
    margin-bottom: 8px;
  }
`;

const ATHPercentage = styled(Text)`
  color: #32283d;
`;

const BoofiCard = styled.div`
  background: #38db93;
  color: white;
  border-radius: 12px;
  position: relative;
  padding: 24px;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const BoofiLabel = styled(Text)`
  color: #38db93;
`;

const BoofiDescription = styled(Text)`
  color: white;
  max-width: 400px;
`

const SherpaLogo = styled.img`
  height: 72px;
  width: 72px;
`;

const SherpaDetailWrapper = styled(Flex)`
  min-width: 400px;

  @media (min-width: 992px) {
    min-width: 400px;
  }
  @media (min-width: 1200px) {
    min-width: 500px;
  }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 64px;

  > div:first-child {
    color: white;
    width: calc(100% - 40px);
    margin-left: 20px;
    div {
      background: white;
    }
  }
`;

const Mark = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive }) => isActive ? 'white' : '#eeeaf4'};
  color: #38db93;
  width: 40px;
  height: 40px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-top: -28px;
  z-index: 2;
`;

const Stage = styled(Flex)`
  color: white;
  width: 33.33%;
  margin-top: -64px;
`;

const StageLabel = styled(Text)`
  color: white;
`;

const StageDescriptionContainer = styled(Flex)`
  width: calc(100% - 40px);
  margin-left: 20px;
`;

const StageDescription = styled(Text)`
  color: #22b67f;
  margin-top: 32px;
`;

export default Launchpad
