import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'
import useWindowSize from 'hooks/useWindowSize'

const DEFAULT_TIMELINES = [
  {
    label: 'Registration Opens',
    date: 'Dec 17th 2021 18:00 UTC',
    timestamp: 1639764000,
    status: 'not-started',
    imageUrl: 'registration_opens',
  },
  {
    label: 'Registration Closes',
    date: 'Dec 21st 2021 23:59 UTC',
    timestamp: 1640131140,
    status: 'not-started',
    imageUrl: 'registration_closes',
  },
  {
    label: 'Distribution Starts',
    date: 'Dec 22nd 2021 18:00 UTC',
    timestamp: 1640196000,
    status: 'not-started',
    imageUrl: 'distribution_starts',
  },
  {
    label: 'Distribution Ends',
    date: 'Dec 27th 2021 23:59 UTC',
    timestamp: 1640649540,
    status: 'not-started',
    imageUrl: 'distribution_ends',
  },
]

const LaunchpadTimeline = () => {
  const windowSize = useWindowSize()

  const getTimelinesWithStatus = () => {
    const currentTime = Math.floor(Date.now() / 1000)
    const _timelines = DEFAULT_TIMELINES
    DEFAULT_TIMELINES.map((row, index) => {
      let status = 'not-started'
      if (row.timestamp < currentTime) {
        status = 'active'
        if (_timelines[index - 1] && _timelines[index - 1].status === 'active') {
          _timelines[index - 1].status = 'passed'
        }
      }
      _timelines[index].status = status
      return {
        ...row,
      }
    })
    return _timelines
  }

  const timelines = getTimelinesWithStatus()

  return (
    <Container>
      <LaunchpadPage>
        <Label fontSize="27px" lineHeight="40px" fontWeight={500}>
          Launchpad Timeline
        </Label>
        {windowSize.width < 900 ? (
          <Flex mt="40px" flexDirection="column">
            {timelines.map((timeline, index) => {
              return (
                <MobileTimeline key={timeline.label} width={windowSize.width}>
                  {index !== 0 && <div className="previous-link" />}
                  <TimelineItem status={timeline.status}>
                    <Flex>
                      <StepWrapper justifyContent="center" alignItems="center" status={timeline.status}>
                        <StepInner justifyContent="center" alignItems="center" status={timeline.status}>
                          <img
                            src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}_${
                              timeline.status === 'active' ? 'active' : 'passed'
                            }.svg`}
                            alt={timeline.label}
                          />
                        </StepInner>
                      </StepWrapper>
                      <Flex flexDirection="column" ml="20px">
                        <TimelineLabel status={timeline.status} fontWeight={500} fontSize="20px">
                          {timeline.label}
                        </TimelineLabel>
                        <TimelineDate status={timeline.status} fontSize="16px" color="#7f7f7f">
                          {timeline.date}
                        </TimelineDate>
                      </Flex>
                    </Flex>
                  </TimelineItem>
                  {index < timelines.length - 1 && <div className="after-link" />}
                </MobileTimeline>
              )
            })}
          </Flex>
        ) : (
          <Flex
            justifyContent="space-between"
            mt="40px"
            flexDirection={windowSize.width < 900 ? 'column' : 'row'}
            alignItems="center"
          >
            {timelines.map((timeline, index) => {
              return (
                <Timeline key={timeline.label} width={windowSize.width}>
                  {index !== 0 && <div className="previous-link" />}
                  <TimelineItem status={timeline.status}>
                    <Flex flexDirection="column" alignItems="center">
                      <StepWrapper justifyContent="center" alignItems="center" status={timeline.status}>
                        <StepInner justifyContent="center" alignItems="center" status={timeline.status}>
                          <img
                            src={`${process.env.PUBLIC_URL}/images/ido/timeline/${timeline.imageUrl}_${
                              timeline.status === 'active' ? 'active' : 'passed'
                            }.svg`}
                            alt={timeline.label}
                          />
                        </StepInner>
                      </StepWrapper>
                      <TimelineLabel mt="8px" mb="8px" status={timeline.status} fontWeight={500} fontSize="16px">
                        {timeline.label}
                      </TimelineLabel>
                      <TimelineDate status={timeline.status} fontSize="14px" color="#7f7f7f">
                        {timeline.date}
                      </TimelineDate>
                    </Flex>
                  </TimelineItem>
                  {index < timelines.length - 1 && <div className="after-link" />}
                </Timeline>
              )
            })}
          </Flex>
        )}
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
`

const LaunchpadPage = styled(Page)`
  max-width: 1200px;
  min-height: unset;
`

const TimelineItem = styled.div<{ status?: string }>`
  opacity: ${({ status }) => status === 'not-started' && '0.6'};
  margin-bottom: 40px;

  @media (min-width: 900px) {
    margin-bottom: 0;
    width: 184px;
  }
`

const TimelineLabel = styled(Text)<{ status?: string }>`
  color: ${({ status, theme }) => !theme.isDark && status === 'active' && '#000000'};
  color: ${({ status, theme }) => !theme.isDark && status !== 'active' && '#4D4D4D'};
  color: ${({ status, theme }) => theme.isDark && status === 'active' && '#5E4AAF'};
  color: ${({ status, theme }) => theme.isDark && status !== 'active' && '#ffffff'};
`

const TimelineDate = styled(Text)<{ status?: string }>`
  color: ${({ status }) => (status === 'active' ? '#7F6FBF' : '#7f7f7f')};
  color: ${({ status, theme }) => theme.isDark && status === 'active' && '#ffffff'};
  font-family: 'Fira Code';
  text-align: center;
`

const Label = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : 'black')};
  font-size: 27px;
  line-height: 40px;
  font-weight: 800;
`

const MobileTimeline = styled.div<{ width: number }>`
  position: relative;
  .after-link {
    border: 1px solid #dcdcdc;
    position: absolute;
    height: 20px;
    left: 27px;
    top: 54px;
  }
  .previous-link {
    border: 1px solid #dcdcdc;
    height: 20px;
    left: 27px;
    width: 1px;
    position: absolute;
    top: -20px;
  }
`

const Timeline = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  position: relative;
  .after-link {
    border: 1px solid #dcdcdc;
    position: absolute;
    height: 21px;
    left: 92px;
    top: 153px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 346) / 6}px;
      left: 119px;
      height: 0px;
      top: 27px;
    }

    @media (min-width: 1200px) {
      width: 135px;
      left: 119px;
      top: 27px;
    }
  }
  .previous-link {
    border: 1px solid #dcdcdc;
    height: 21px;
    left: 92px;
    width: 1px;
    position: absolute;
    top: -20px;

    @media (min-width: 900px) {
      width: ${({ width }) => (width - 346) / 6}px;
      left: -${({ width }) => (width - 346) / 6 - 65}px;
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
`

const StepWrapper = styled(Flex)<{ status?: string }>`
  background: ${({ status }) => (status === 'not-started' ? '#EBEBEB' : 'rgba(94, 74, 175, 0.21)')};
  background: ${({ status }) => status === 'active' && 'rgba(94, 74, 175, 0.41)'};
  border-radius: 50%;
  width: 54px;
  height: 54px;
  filter: ${({ status }) =>
    status === 'active' &&
    'drop-shadow(0px 89px 80px rgba(130, 121, 206, 0.55)) drop-shadow(0px 34.2815px 25.4815px rgba(130, 121, 206, 0.334074)) drop-shadow(0px 7.25185px 6.51852px rgba(130, 121, 206, 0.215926))'};
`

const StepInner = styled(Flex)<{ status?: string }>`
  background: ${({ status }) => (status === 'not-started' ? '#EBEBEB' : 'rgba(94, 74, 175, 0.18)')};
  background: ${({ status }) => status === 'active' && 'rgba(94, 74, 175, 1)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;

  img {
    width: 20px;
    height: 20px;
  }
`

export default LaunchpadTimeline
