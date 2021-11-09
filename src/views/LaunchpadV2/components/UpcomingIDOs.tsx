import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import SvgIcon from 'components/SvgIcon';
import { upcomingIcebergs } from '../config'

const UpcomingIDOs = () => {
  const progressStep = 80;
  return (
    <>
      <Label fontSize="36px" lineHeight='54px' mb="16px" fontWeight={500} color='white'>
        Upcoming IDOs
      </Label>
      <StyledFlexLayout>
        {upcomingIcebergs.map((iceberg) => {
          return (
            <FCard key={iceberg.title}>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <IdoLogo src='/images/launchpad/boofi-logo.png' alt={iceberg.title} height={36} />
                <IdoTag variant="primary">In progress</IdoTag>
              </Flex>
              <Flex flexDirection='column' alignItems='flex-start' mb='12px'>
                <Text fontSize='12px' color='#6B6B6B' mb='8px'>1 OH = 0,00113 AVAX</Text>
                <Text fontSize='12px' color='#6B6B6B'>Total Raised</Text>
                <Text fontSize='18px' color='red' fontWeight={600}>$ 600,000/ 600,000</Text>
              </Flex>
              <Flex justifyContent='space-between' mb='18px'>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/user.svg`} width='18px' height='18px' />
                  <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
                    <Text fontSize='12px' color='#6B6B6B'>Participants</Text>
                    <Text fontSize='12px' color='#6B6B6B' fontWeight={600}>9,974</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/calendar.svg`} width='18px' height='18px' />
                  <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
                    <Text fontSize='12px' color='#6B6B6B'>Start Date</Text>
                    <Text fontSize='12px' color='#6B6B6B' fontWeight={600}>10.21.2021</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/wallet.svg`} width='18px' height='18px' />
                  <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
                    <Text fontSize='12px' color='#6B6B6B'>Token Price</Text>
                    <Text fontSize='12px' color='#6B6B6B' fontWeight={600}>$0.081</Text>
                  </Flex>
                </Flex>
              </Flex>
              <ProgressTextContainer progressStep={progressStep}>
                <Text fontSize='12px' color='#6B6B6B'>Sale</Text>
                <Text fontSize='12px' color='#6B6B6B'>AirDrop</Text>
              </ProgressTextContainer>
              <ProgressWrapper>
                <Progress primaryStep={progressStep} />
              </ProgressWrapper>
              <Flex justifyContent='space-between' mt='18px' flexWrap='wrap'>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/time-circle.svg`} width='18px' height='18px' />
                  <Flex flexDirection='column' alignItems='flex-start' ml='4px' mt='2px'>
                    <Text fontSize='9px' color='#6B6B6B'>Time Until Launch</Text>
                    <Text fontSize='9px' color='red'>Launched</Text>
                  </Flex>
                </Flex>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/graph.svg`} width='18px' height='18px' />
                  <Flex flexDirection='column' alignItems='flex-start' ml='4px' mt='2px'>
                    <Flex>
                      <Text fontSize='9px' color='#6B6B6B'>Tokens Sold:</Text>
                      <Text fontSize='9px' color='red' ml='2px'>7.5M</Text>
                    </Flex>
                    <Flex>
                      <Text fontSize='9px' color='#6B6B6B'>Tokens Distribution:</Text>
                      <Text fontSize='9px' color='red' ml='2px'>7.5M</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/scan.svg`} width='18px' height='18px' />
                  <Flex ml='4px' mt='2px'>
                    <Text fontSize='9px' color='#6B6B6B'>Sales Progress:</Text>
                    <Text fontSize='9px' color='red' ml='2px'>90%</Text>
                  </Flex>
                </Flex>
              </Flex>
            </FCard>
          )
        })}
      </StyledFlexLayout>
    </>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 26px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const IdoTag = styled(Tag)`
  border-radius: 6px;
  background: #F5DFC6;
  font-size: 12px;
  line-height: 18px;
  color: #D58E4D;
  border: none;
`;

const StyledFlexLayout = styled(FlexLayout)`
  margin-left: -8px;
  margin-right: -8px;

  @media (min-width: 640px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`

const Label = styled(Text)`
  color: white;
  font-size: 24px;
  line-height: 36px;

  @media (min-width: 968px) {
    font-size: 36px;
    line-height: 54px;
    text-align: left;
  }
`

const IdoLogo = styled.img`
  height: 36px;
`;

const ProgressWrapper = styled.div`
  div {
    height: 18px;
    div {
      border-radius: 2rem;
      background: ${({ theme }) => theme.colors.red};
    }
  }
`

const ProgressTextContainer = styled(Flex)<{ progressStep: number }>`
  position: relative;
  height: 20px;
  div {
    position: absolute;
    &:first-child {
      left: 0;
    }
    &:last-child {
      left: ${({ progressStep }) => progressStep}%;
      transform: translate(-50%, 0);
    }
  }
`;

export default UpcomingIDOs
