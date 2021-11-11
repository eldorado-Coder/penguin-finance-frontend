import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress } from 'penguinfinance-uikit2'
import FlexLayout from 'components/layout/Flex'
import SvgIcon from 'components/SvgIcon';

const IDOCard = ({ idoData }) => {
  const progressStep = 80;
  return (
    <FCard>
      <Flex justifyContent="space-between" alignItems="center" mb="16px">
        <IdoLogo src={`/images/launchpad/${idoData.logo}`} alt={idoData.title} height={36} />
        <IdoTag variant="primary" completed={idoData.completed}>{idoData.completed ? 'Completed' : 'In Progress'}</IdoTag>
      </Flex>
      <Flex flexDirection='column' alignItems='flex-start' mb='12px'>
        <PriceText fontSize='12px' mb='8px'>1 {idoData.tokenSymbol} = 0,00113 AVAX</PriceText>
        <DetailText fontSize='12px'>Total Raised</DetailText>
        <Text fontSize='20px' color='#C0378C' fontWeight={600}>$ 600,000/ 600,000</Text>
      </Flex>
      <Flex justifyContent='space-between' mb='18px'>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/user.svg`} width='18px' height='18px' />
          <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
            <DetailText fontSize='11px'>Participants</DetailText>
            <Text fontSize='14px' color='#C0378C' fontWeight={600}>9,974</Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/calendar.svg`} width='18px' height='18px' />
          <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
            <DetailText fontSize='11px'>Start Date</DetailText>
            <Text fontSize='14px' color='#C0378C' fontWeight={600}>10.21.2021</Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/wallet.svg`} width='18px' height='18px' />
          <Flex flexDirection='column' alignItems='flex-start' ml='4px'>
            <DetailText fontSize='11px'>Token Price</DetailText>
            <Text fontSize='14px' color='#C0378C' fontWeight={600}>$0.081</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <DetailText fontSize='12px'>Sale</DetailText>
      </Flex>
      <ProgressWrapper>
        <Progress primaryStep={progressStep} />
      </ProgressWrapper>
      <Flex justifyContent='space-between' mt='18px' flexWrap='wrap'>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/time-circle.svg`} width='18px' height='18px' />
          <Flex flexDirection='column' alignItems='flex-start' ml='4px' mt='2px'>
            <DetailText fontSize='9px'>Time Until Launch</DetailText>
            <Text fontSize='9px' color='#C0378C'>Launched</Text>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/graph1.svg`} width='18px' height='18px' />
          <Flex flexDirection='column' alignItems='flex-start' ml='4px' mt='2px'>
            <Flex>
              <DetailText fontSize='9px'>Tokens Sold:</DetailText>
              <Text fontSize='9px' color='#C0378C' ml='4px'>7.5M</Text>
            </Flex>
            <Flex>
              <DetailText fontSize='9px'>Tokens Distribution:</DetailText>
              <Text fontSize='9px' color='#C0378C' ml='4px'>7.5M</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/launchpad/icons/scan.svg`} width='18px' height='18px' />
          <Flex ml='4px' mt='2px'>
            <DetailText fontSize='9px' color='#6B6B6B'>Sales Progress:</DetailText>
            <Text fontSize='9px' color='#C0378C' ml='4px'>90%</Text>
          </Flex>
        </Flex>
      </Flex>
    </FCard>
  )
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  box-shadow: 4px 4px 32px rgba(165, 165, 165, 0.25);
  backdrop-filter: blur(38px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const IdoTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 6px;
  background: ${({ completed }) => completed ? '#F39FD7' : '#FFD6A6'};
  font-size: 12px;
  line-height: 18px;
  color: ${({ completed }) => completed ? '#AD4289' : '#EB780F'};
  border: none;
  height: 22px;
`;

const IdoLogo = styled.img`
  height: 36px;
`;

const ProgressWrapper = styled.div`
  div {
    height: 18px;
    background: ${props => props.theme.isDark ? '#B8A7D9' : '#DFDBE9'};
    div {
      border-radius: 28px;
      background: linear-gradient(269.03deg, #483692 17.37%, #E83789 122.39%);
    }
  }
`

const PriceText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#F3F3F3' : '#808080'};
`;

const DetailText = styled(Text)`
  color: ${({ theme }) => theme.isDark ? '#B8A7D9' : '#313131'};
`;

export default IDOCard
