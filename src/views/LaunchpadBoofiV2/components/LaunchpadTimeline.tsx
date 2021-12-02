import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import Page from 'components/layout/Page'

const TIMELINES = [
  {
    label: 'Registration Opens',
    date: 'Nov 2nd 2021 17:00',
    completed: true
  },
  {
    label: 'Registration Closes',
    date: 'Nov 2nd 2021 17:00',
    completed: true
  },
  {
    label: 'Staking Round',
    date: 'Nov 2nd 2021 17:00',
    completed: true
  },
  {
    label: 'Sale Ends',
    date: 'Nov 2nd 2021 17:00',
    completed: false
  },
]
const LaunchpadTimeline = () => {
  return (
    <Container>
      <LaunchpadPage>
        <Flex mt='40px' justifyContent='space-between' alignItems='center'>
          <Label fontSize="40px" lineHeight="60px" mb="16px" fontWeight={500}>
            Launchpad Timeline
          </Label>
          <Flex alignItems='center'>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/exclude.svg`} width="18px" height="18px" />
            <HistoryText fontSize='14px' ml='4px'>View Launchpad History</HistoryText>
          </Flex>
        </Flex>
        <Flex justifyContent='space-between' mt='40px'>
          {TIMELINES.map(timeline => {
            return (
              <TimelineItem completed={timeline.completed} key={timeline.label}>
                <Flex flexDirection='column' alignItems='center'>
                  <img src={`${process.env.PUBLIC_URL}/images/ido/${timeline.completed ? 'completed' : 'inprogress'}.png`} alt={timeline.label} />
                  <TimelineLabel mt='8px' mb='8px' completed={timeline.completed} fontWeight={500} fontSize='17px' color='#292929'>{timeline.label}</TimelineLabel>
                  <TimelineDate completed={timeline.completed} fontSize='14px' color='#7f7f7f'>{timeline.date}</TimelineDate>
                </Flex>
              </TimelineItem>
            )
          })}
        </Flex>
        <SignUpContainer>
          <SignUpImage src={`${process.env.PUBLIC_URL}/images/ido/signup_banner.png`} />
          <SignUpDetails justifyContent='space-around' alignItems='center'>
            <div>
              <Text color='white' fontSize='32px' fontWeight={800}>Get Alerts For New Pools</Text>
              <FiraText color='white' fontSize='14px'>You are not authorized yet</FiraText>
              <StyledButton mt='20px'>Sign Up</StyledButton>
            </div>
            <PefiLogoContainer>
              <img src={`${process.env.PUBLIC_URL}/images/penguin-finance-logo.svg`} alt='penguin-logo' />
            </PefiLogoContainer>
          </SignUpDetails>
        </SignUpContainer>
      </LaunchpadPage>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => !theme.isDark && 'white'};
  padding-bottom: 60px;
`;

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
  min-height: unset;
`;

const TimelineItem = styled.div<{ completed?: boolean }>`
  border: ${({ completed }) => !completed ? '1px solid #5E4AAF' : '1px solid #DCDCDC'};
  background: ${({ completed }) => !completed ? '#CBC5E4' : '#E8E6F2'};
  border-radius: 10px;
  padding: 16px;
  width: 184px;
`;

const TimelineLabel = styled(Text)<{ completed?: boolean }>`
  color: ${({ completed}) => !completed ? '#5E4AAF' : '#292929'};
`;

const TimelineDate = styled(Text)<{ completed?: boolean }>`
  color: ${({ completed}) => !completed ? '#7F6FBF' : '#7f7f7f'};
  font-family: 'Fira Code';
  text-align: center;
`;

const SignUpContainer = styled.div`
  position: relative;
  margin-top: 100px;
`;

const SignUpImage = styled.img`
  width: 100%;
  background: linear-gradient(180deg, #7361BE 0%, #3A258F 100%);
  border-radius: 10px;
`;

const PefiLogoContainer = styled.div`
  background: white;
  border-radius: 50%;
  padding: 10px;
  margin-top: -36px;

  img {
    width: 200px;
  }
`;

const SignUpDetails = styled(Flex)`
  position: absolute;
  top: 0;
  width: 100%;
`;

const FiraText = styled(Text)`
  font-family: 'Fira Code';
`;

const StyledButton = styled(Button)`
  box-shadow: none;
  width: 180px;
  height: 40px;
  border-radius: 5px;
`

const Label = styled(Text)`
  color: ${({ theme }) => theme.isDark ? 'white' : 'black'};
  font-size: 24px;
  line-height: 36px;
  font-weight: 800;
`

const HistoryText = styled(Text)`
  font-family: 'Fira Code';
  color: ${({ theme }) => theme.isDark ? 'white' : '#1D5AD1'};
`;

export default LaunchpadTimeline
