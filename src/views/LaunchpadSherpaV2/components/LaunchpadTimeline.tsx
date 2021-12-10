import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from 'penguinfinance-uikit2'
import SvgIcon from 'components/SvgIcon'
import Page from 'components/layout/Page'
import useWindowSize from 'hooks/useWindowSize';

const TIMELINES = [
  {
    label: 'Registration Opens',
    date: 'Jul 19th 2021 00:00',
    status: 'passed',
    imageUrl: 'registration_opens.svg'
  },
  {
    label: 'Registration Closes',
    date: 'Jul 27th 2021 23:30',
    status: 'passed',
    imageUrl: 'registration_closes.svg'
  },
  {
    label: 'Distribution Starts',
    date: 'Jul 29th 2021 00:00',
    status: 'passed',
    imageUrl: 'distribution_starts.svg'
  },
  {
    label: 'Distribution Ends',
    date: 'Aug 3rd 2021 19:00',
    status: 'passed',
    imageUrl: 'distribution_ends.svg'
  },
];

const LaunchpadTimeline = () => {
  const windowSize = useWindowSize();

  return (
    <Container>
      <LaunchpadPage>
        <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          <Label fontSize="27px" lineHeight="40px" fontWeight={500}>
            Launchpad Timeline
          </Label>
          <Flex alignItems='center'>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/exclude.svg`} width="18px" height="18px" />
            <HistoryText fontSize='14px' ml='4px'>View Launchpad History</HistoryText>
          </Flex>
        </Flex>
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
                          <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}`} width='20px' height='20px' />
                        </StepInner>
                      </StepWrapper>
                      <Flex flexDirection='column' ml='20px'>
                        <TimelineLabel status={timeline.status} fontWeight={500} fontSize='20px' color='#292929'>{timeline.label}</TimelineLabel>
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
                          <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}`} width='20px' height='20px' />
                        </StepInner>
                      </StepWrapper>
                      <TimelineLabel mt='8px' mb='8px' status={timeline.status} fontWeight={500} fontSize='17px' color='#292929'>{timeline.label}</TimelineLabel>
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
            <div>
              <SignUpLabel color='white' fontSize='31px' fontWeight={800}>Get Alerts For New Pools</SignUpLabel>
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

const TimelineItem = styled.div<{ status?: string }>`
  opacity: ${({ status }) => status === 'not-started' && '0.6'};
  margin-bottom: 40px;

  @media (min-width: 900px) {
    margin-bottom: 0;
    width: 184px;
  }
`;

const TimelineLabel = styled(Text)<{ status?: string }>`
  color: ${({ status }) => status === 'active' ? '#5E4AAF' : '#292929'};
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
  background: linear-gradient(180deg, rgba(114, 36, 36, 0) 0%, #722B92 100%);
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
    font-size: 31px;
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
  font-size: 27px;
  line-height: 40px;
  font-weight: 800;
`

const HistoryText = styled(Text)`
  font-family: 'Fira Code';
  color: ${({ theme }) => theme.isDark ? 'white' : '#1D5AD1'};
`;

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
`;

const StepInner = styled(Flex)<{ status ?: string }>`
  background: ${({ status }) => status === 'not-started' ? '#EBEBEB' :  'rgba(94, 74, 175, 0.18)'};
  background: ${({ status }) => status === 'active' && 'rgba(94, 74, 175, 1)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;

  svg {
    .step {
      fill: ${({ status }) => status === 'active' ? 'white' : '#5E4AAF'};
    }
  }
`;

export default LaunchpadTimeline
