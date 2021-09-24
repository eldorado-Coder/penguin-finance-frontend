import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, Progress, useMatchBreakpoints } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import SvgIcon from 'components/SvgIcon'

const marks = [1, 2, 3, 4]
const stageContents = [
  {
    label: 'Pre-Launch Phase',
  },
  {
    label: 'Staking Phase',
    description: 'September 24th - September 29th',
  },
  {
    label: 'Distribution Phase',
    description: 'September 30th - October 7th',
  },
]

const PhaseCard = ({ launchStage }: { launchStage: number }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  const handleLearnBoofi = () => {
    window.open(
      'https://penguin-finance.medium.com/penguin-launchpad-boofinance-ido-tiers-are-here-29ba4cd90053',
      '_blank',
    )
  }

  const handleViewBoofi = () => {
    window.open('https://www.boofinance.io/', '_blank')
  }

  return (
    <PhaseCardContainer>
      <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <img src="/images/launchpad/boofi-logo.svg" alt="boofi" width={320} />
        <StepDescriptionWrapper alignItems="center" justifyContent="space-between">
          <StepDescription>
            Unique yield farming protocol on Avalanche offering deflationary NFTs and decentralized governance.
          </StepDescription>
          <ButtonActions flexDirection="column">
            <StyledButton onClick={handleLearnBoofi}>Learn More</StyledButton>
            <StyledButton onClick={handleViewBoofi}>View Website</StyledButton>
            {!isMobile && (
              <SocialIconsWrapper justifyContent="space-between" flexWrap="wrap">
                <a href="https://discord.com/invite/A3KbWpsZfE" target="_blank" rel="noreferrer">
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/discord.svg`} width="100%" height="20px" />
                </a>
                <a href="https://t.me/BooFinance" target="_blank" rel="noreferrer">
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/telegram.svg`} width="100%" height="20px" />
                </a>
                <a href="https://twitter.com/Boo_Finance" target="_blank" rel="noreferrer">
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/twitter.svg`} width="100%" height="20px" />
                </a>
              </SocialIconsWrapper>
            )}
          </ButtonActions>
          {isMobile && (
            <SocialIconsWrapper justifyContent="space-between" flexWrap="wrap">
              <a href="https://discord.com/invite/A3KbWpsZfE" target="_blank" rel="noreferrer">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/discord.svg`} width="100%" height="20px" />
              </a>
              <a href="https://t.me/BooFinance" target="_blank" rel="noreferrer">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/telegram.svg`} width="100%" height="20px" />
              </a>
              <a href="https://twitter.com/Boo_Finance" target="_blank" rel="noreferrer">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/twitter.svg`} width="100%" height="20px" />
              </a>
            </SocialIconsWrapper>
          )}
        </StepDescriptionWrapper>
      </Flex>
      {isMobile ? (
        <Flex flexDirection="column">
          <MobileProgressWrapper>
            <Progress primaryStep={22} />
            <MobileProgressMarks flexDirection="column" justifyContent="space-between">
              {marks.map((mark) => {
                return (
                  <Mark isMobile key={mark} isActive={mark <= launchStage}>
                    {mark}
                  </Mark>
                )
              })}
            </MobileProgressMarks>
            <StageDescriptionContainer flexDirection="column" isMobile>
              {stageContents.map((stage) => {
                return (
                  <Stage
                    ml="32px"
                    isMobile
                    flexDirection="column"
                    alignItems="flex-start"
                    key={stage.label}
                    justifyContent="center"
                  >
                    <StageLabel fontWeight={600} fontSize="18px">
                      {stage.label}
                    </StageLabel>
                    {stage.description && (
                      <StageDescription isMobile fontWeight={500} fontSize="14px">
                        {stage.description}
                      </StageDescription>
                    )}
                  </Stage>
                )
              })}
            </StageDescriptionContainer>
          </MobileProgressWrapper>
          <StageLabel fontWeight={600} fontSize="18px" ml="16px" mr="16px" mt="16px">
            PEFI/BOOFI
          </StageLabel>
        </Flex>
      ) : (
        <Flex>
          <ProgressWrapper>
            <Progress primaryStep={28} />
            <Flex justifyContent="space-between">
              {marks.map((mark) => {
                return (
                  <Mark key={mark} isActive={mark <= launchStage}>
                    {mark}
                  </Mark>
                )
              })}
            </Flex>
            <StageDescriptionContainer>
              {stageContents.map((stage) => {
                return (
                  <Stage flexDirection="column" alignItems="center" key={stage.label}>
                    <StageLabel fontWeight={600} fontSize="18px">
                      {stage.label}
                    </StageLabel>
                    {stage.description && (
                      <StageDescription fontWeight={500} fontSize="14px">
                        {stage.description}
                      </StageDescription>
                    )}
                  </Stage>
                )
              })}
            </StageDescriptionContainer>
          </ProgressWrapper>
          <StageLabel fontWeight={600} fontSize="18px" ml="16px" mr="16px" mt="56px">
            PEFI/BOOFI
          </StageLabel>
        </Flex>
      )}
    </PhaseCardContainer>
  )
}

const PhaseCardContainer = styled.div`
  background: #38db93;
  color: white;
  border-radius: 12px;
  position: relative;
  padding: 24px;
  margin-top: 8px;
  margin-bottom: 24px;
`

const StepDescription = styled(Text)`
  color: white;
  max-width: 400px;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`

const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 64px;

  > div:first-child {
    background-color: #c3e2d2;
    width: calc(100% - 40px);
    margin-left: 20px;
    height: 12px;
    div {
      height: 12px;
      background: white;
      border-radius: 50px;
    }
  }
`

const Mark = styled.div<{ isActive?: boolean; isMobile?: boolean }>`
  background: ${({ isActive }) => (isActive ? 'white' : '#c3e2d2')};
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
`

const Stage = styled(Flex)<{ isMobile?: boolean }>`
  color: white;
  width: ${({ isMobile }) => (isMobile ? '100%' : '33.33%')};
  height: ${({ isMobile }) => (isMobile ? '33.33%' : 'unset')};
  margin-top: ${({ isMobile }) => !isMobile && '-56px'};
`

const StageLabel = styled(Text)`
  color: white;
`

const StageDescriptionContainer = styled(Flex)<{ isMobile?: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : 'calc(100% - 40px)')};
  margin-left: 20px;
  height: ${({ isMobile }) => isMobile && '300px'};
  margin-top: ${({ isMobile }) => isMobile && '-310px'};
`

const StageDescription = styled(Text)<{ isMobile?: boolean }>`
  color: #22b67f;
  margin-top: ${({ isMobile }) => (isMobile ? '0' : '24px')};
  padding: ${({ isMobile }) => !isMobile && '0 16px'};
  text-align: ${({ isMobile }) => !isMobile && 'center'};
`

const StepDescriptionWrapper = styled(Flex)`
  min-width: 100%;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  @media (min-width: 1200px) {
    min-width: 60%;
  }
`

const ButtonActions = styled(Flex)`
  flex-direction: row;
  margin-top: 16px;

  @media (min-width: 640px) {
    flex-direction: column;
    margin-top: 0;
  }
`

const StyledButton = styled(Button)`
  height: 32px;
  background: white;
  color: #38db93;
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;

  @media (min-width: 640px) {
    font-size: 16px;
  }

  &:first-child {
    margin-right: 8px;

    @media (min-width: 640px) {
      margin-bottom: 8px;
      margin-right: 0;
    }
  }
`

const MobileProgressWrapper = styled.div`
  width: 100%;
  margin-top: 64px;

  > div:first-child {
    background-color: #c3e2d2;
    transform: rotate(90deg);
    width: 300px;
    margin-left: -130px;
    margin-top: 120px;
    height: 12px;
    div {
      height: 12px;
      border-radius: 32px;
      background: white;
    }
  }
`

const MobileProgressMarks = styled(Flex)`
  height: 300px;
  margin-top: -150px;
`

const SocialIconsWrapper = styled(Flex)`
  margin-top: 8px;

  @media (max-width: 968px) {
    svg {
      padding: 0 8px;
    }
  }

  svg {
    fill: white;

    &:hover {
      opacity: 0.65;
    }
  }
`

export default PhaseCard
