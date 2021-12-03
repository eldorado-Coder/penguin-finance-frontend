import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import Page from 'components/layout/Page'
import useWindowSize from 'hooks/useWindowSize';

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
  const windowSize = useWindowSize();

  return (
    <Container>
      <LaunchpadPage>
        <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          <Label fontSize="40px" lineHeight="60px" fontWeight={500}>
            Launchpad Timeline
          </Label>
          <Flex alignItems='center'>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/exclude.svg`} width="18px" height="18px" />
            <HistoryText fontSize='14px' ml='4px'>View Launchpad History</HistoryText>
          </Flex>
        </Flex>
        <Flex justifyContent='space-between' mt='56px' flexDirection={windowSize.width < 900 ? 'column' : 'row'} alignItems='center'>
          {TIMELINES.map((timeline, index) => {
            return (
              <Timeline key={timeline.label} completed={timeline.completed} width={windowSize.width} >
                {index !== 0 && <div className='previous-link' />}
                <TimelineItem completed={timeline.completed}>
                  <Flex flexDirection='column' alignItems='center'>
                    <img src={`${process.env.PUBLIC_URL}/images/ido/${timeline.completed ? 'completed' : 'inprogress'}.png`} alt={timeline.label} />
                    <TimelineLabel mt='8px' mb='8px' completed={timeline.completed} fontWeight={500} fontSize='17px' color='#292929'>{timeline.label}</TimelineLabel>
                    <TimelineDate completed={timeline.completed} fontSize='14px' color='#7f7f7f'>{timeline.date}</TimelineDate>
                  </Flex>
                </TimelineItem>
                {index < TIMELINES.length-1 && 
                  <div className='after-link' />
                }
              </Timeline>
            )
          })}
        </Flex>
        <SignUpContainer>
          <SignUpImage src={`${process.env.PUBLIC_URL}/images/ido/signup_banner.png`} />
          <SignUpDetails justifyContent='space-around' alignItems='center'>
            <div>
              <SignUpLabel color='white' fontSize='32px' fontWeight={800}>Get Alerts For New Pools</SignUpLabel>
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
  padding-top: 20px;

  @media (min-width: 640px) {
    padding-top: 30px;
  }

  @media (min-width: 968px) {
    padding-top: 40px;
  }
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
  margin-bottom: 40px;
  @media (min-width: 900px) {
    margin-bottom: 0;
  }
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
  margin-top: 20px;

  @media (min-width: 900px) {
    margin-top: 100px;
  }
`;

const SignUpImage = styled.img`
  width: 100%;
  background: linear-gradient(180deg, #7361BE 0%, #3A258F 100%);
  border-radius: 10px;
  min-height: 200px;
  object-fit: cover;
`;

const PefiLogoContainer = styled.div`
  background: white;
  border-radius: 50%;
  padding: 10px;
  display: none;

  @media (min-width: 640px) {  
    display: block;
  } 

  @media (min-width: 768px) {  
    margin-top: -36px;
  }  

  img {
    width: 100px;

    @media (min-width: 768px) {
      width: 200px;
    }
  }
`;

const SignUpDetails = styled(Flex)`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);

  @media (min-width: 768px) {
    top: 0;
    transform: unset;
  }
`;

const SignUpLabel = styled(Text)`
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 34px;
  }
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

const Timeline = styled.div<{ completed?: boolean, width: number }>`
  display: flex;
  align-items: center;
  position: relative;
  .after-link {
    border: 1px solid ${({ completed }) => completed ? '#DCDCDC' : '#5E4AAF'};
    position: absolute;
    height: 21px;
    left: 92px;
    top: 153px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 784)/6}px;
      left: 184px;
      height: 0px;
      top: unset;
    }

    @media (min-width: 1200px) {
      width: 70px;
    }
  };
  .previous-link {
    border: 1px solid ${({ completed }) => completed ? '#DCDCDC' : '#5E4AAF'};
    height: 21px;
    left: 92px;
    width: 1px;
    position: absolute;
    top: -20px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 784)/6}px;
      left: -${({ width }) => (width - 784)/6}px;
      height: 0px;
      top: unset;
    }

    @media (min-width: 1200px) {
      width: 70px;
      left: -70px;
      height: 0px;
    }
  }
`;

export default LaunchpadTimeline
