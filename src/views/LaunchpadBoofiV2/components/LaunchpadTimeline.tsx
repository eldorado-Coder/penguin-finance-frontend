import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'
import useWindowSize from 'hooks/useWindowSize';

const TIMELINES = [
  {
    label: 'Registration Opens',
    date: 'Sep 24th 2021 00:00',
    status: 'passed',
    imageUrl: 'registration_opens'
  },
  {
    label: 'Registration Closes',
    date: 'Sep 29th 2021 23:59',
    status: 'passed',
    imageUrl: 'registration_closes'
  },
  {
    label: 'Distribution Starts',
    date: 'Sep 30th 2021 20:00',
    status: 'passed',
    imageUrl: 'distribution_starts'
  },
  {
    label: 'Distribution Ends',
    date: 'Oct 7th 2021 20:00',
    status: 'active',
    imageUrl: 'distribution_ends'
  },
];

const LaunchpadTimeline = () => {
  const windowSize = useWindowSize();

  const handleSignUp = () => {
    window.open('https://t.me/pefi_announcements', '_blank');
  };

  return (
    <Container>
      <LaunchpadPage>
        <Label fontSize="27px" lineHeight="40px" fontWeight={500}>
          Launchpad Timeline
        </Label>
        {windowSize.width < 900 ?
          <Flex mt='40px' flexDirection='column'>
            {TIMELINES.map((timeline, index) => {
              return (
                <MobileTimeline key={timeline.label} width={windowSize.width} >
                  {index !== 0 && <div className='previous-link' />}
                  <TimelineItem status={timeline.status}>
                    <Flex >
                      <StepWrapper justifyContent='center' alignItems='center' status={timeline.status}>
                        <StepInner justifyContent='center' alignItems='center' status={timeline.status}>
                          <img src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}_${timeline.status === 'active' ? 'active' : 'passed'}.svg`} alt={timeline.label} />                          
                        </StepInner>
                      </StepWrapper>
                      <Flex flexDirection='column' ml='20px'>
                        <TimelineLabel status={timeline.status} fontWeight={500} fontSize='20px'>{timeline.label}</TimelineLabel>
                        <TimelineDate status={timeline.status} fontSize='16px' color='#7f7f7f'>{timeline.date}</TimelineDate>
                      </Flex>
                    </Flex>
                  </TimelineItem>
                  {index < TIMELINES.length-1 && 
                    <div className='after-link' />
                  }
                </MobileTimeline>
              )
            })}
          </Flex>
          : <Flex justifyContent='space-between' mt='40px' flexDirection={windowSize.width < 900 ? 'column' : 'row'} alignItems='center'>
            {TIMELINES.map((timeline, index) => {
              return (
                <Timeline key={timeline.label} width={windowSize.width} >
                  {index !== 0 && <div className='previous-link' />}
                  <TimelineItem status={timeline.status}>
                    <Flex flexDirection='column' alignItems='center'>
                      <StepWrapper justifyContent='center' alignItems='center' status={timeline.status}>
                        <StepInner justifyContent='center' alignItems='center' status={timeline.status}>
                          <img src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}_${timeline.status === 'active' ? 'active' : 'passed'}.svg`} alt={timeline.label} />
                        </StepInner>
                      </StepWrapper>
                      <TimelineLabel mt='8px' mb='8px' status={timeline.status} fontWeight={500} fontSize='16px'>{timeline.label}</TimelineLabel>
                      <TimelineDate status={timeline.status} fontSize='14px' color='#7f7f7f'>{timeline.date}</TimelineDate>
                    </Flex>
                  </TimelineItem>
                  {index < TIMELINES.length-1 && 
                    <div className='after-link' />
                  }
                </Timeline>
              )
            })}
          </Flex>
        }
        <SignUpContainer>
          <SignUpImage src={`${process.env.PUBLIC_URL}/images/ido/signup_banner.png`} />
          <SignUpDetails justifyContent='space-around' alignItems='center'>
            <div className='signup-button'>
              <SignUpLabel color='white' fontSize='31px' fontWeight={800}>Get Alerts For New Launches</SignUpLabel>
              <StyledButton onClick={handleSignUp} mt='20px'>Sign Up</StyledButton>
            </div>
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

const TimelineItem = styled.div<{ status?: string }>`
  opacity: ${({ status }) => status === 'not-started' && '0.6'};
  margin-bottom: 40px;

  @media (min-width: 900px) {
    margin-bottom: 0;
    width: 184px;
  }
`;

const TimelineLabel = styled(Text)<{ status?: string }>`
  color: ${({ status }) => status === 'active' ? '#000000' : '#4D4D4D'};
`;

const TimelineDate = styled(Text)<{ status?: string }>`
  color: ${({ status }) => status === 'active' ? '#7F6FBF' : '#7f7f7f'};
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
    transform: unset;
  }
`;

const SignUpLabel = styled(Text)`
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 31px;
  }
`;

const StyledButton = styled(Button)`
  box-shadow: none;
  width: 180px;
  height: 48px;
  border-radius: 5px;
  background: white;
  color: #620AA8;
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

const Label = styled(Text)`
  color: ${({ theme }) => theme.isDark ? 'white' : 'black'};
  font-size: 27px;
  line-height: 40px;
  font-weight: 800;
`

const MobileTimeline = styled.div<{ width: number }>`
  position: relative;
  .after-link {
    border: 1px solid #DCDCDC;
    position: absolute;
    height: 20px;
    left: 27px;
    top: 54px;
  };
  .previous-link {
    border: 1px solid #DCDCDC;
    height: 20px;
    left: 27px;
    width: 1px;
    position: absolute;
    top: -20px;
  }
`;

const Timeline = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  position: relative;
  .after-link {
    border: 1px solid #DCDCDC;
    position: absolute;
    height: 21px;
    left: 92px;
    top: 153px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 346)/6}px;
      left: 119px;
      height: 0px;
      top: 27px;
    }

    @media (min-width: 1200px) {
      width: 135px;
      left: 119px;
      top: 27px;
    }
  };
  .previous-link {
    border: 1px solid #DCDCDC;
    height: 21px;
    left: 92px;
    width: 1px;
    position: absolute;
    top: -20px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 346)/6}px;
      left: -${({ width }) => (width - 346)/6 - 65}px;
      height: 0px;
      top: 27px;
    }

    @media (min-width: 1200px) {
      width: 135px;
      left: -70px;
      height: 0px;
      top: 27px;
    }
  }
`;

const StepWrapper = styled(Flex)<{ status ?: string }>`
  background: ${({ status }) => status === 'not-started' ? '#EBEBEB' :  'rgba(94, 74, 175, 0.21)'};
  background: ${({ status }) => status === 'active' && 'rgba(94, 74, 175, 0.41)'};
  border-radius: 50%;
  width: 54px;
  height: 54px;
  filter: ${({ status }) => status === 'active' && 'drop-shadow(0px 89px 80px rgba(130, 121, 206, 0.55)) drop-shadow(0px 34.2815px 25.4815px rgba(130, 121, 206, 0.334074)) drop-shadow(0px 7.25185px 6.51852px rgba(130, 121, 206, 0.215926))'};
`;

const StepInner = styled(Flex)<{ status ?: string }>`
  background: ${({ status }) => status === 'not-started' ? '#EBEBEB' :  'rgba(94, 74, 175, 0.18)'};
  background: ${({ status }) => status === 'active' && 'rgba(94, 74, 175, 1)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default LaunchpadTimeline;

