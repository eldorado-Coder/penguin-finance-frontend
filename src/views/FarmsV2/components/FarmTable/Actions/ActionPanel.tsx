import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Card, Text, Button, Flex } from 'penguinfinance-uikit2'
import { ASSET_CONTENT_URL } from 'config'
import { FarmCardProps } from '../../types';
import StakePanel from './StakePanel';

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.isDark ? '#121021' : theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 16px 16px 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 16px 0;
  }
`

const ActionCard = styled(Card)`
  border-radius: 16px;
`;

const RewardImage = styled.img<{ size: number, ml?: number }>`
  height: ${({ size }) => size}px;
  margin-left: ${({ ml }) => ml && `${ml}px`};
`;

const StyledButton = styled(Button)`
  font-weight: 400;
  height: 28px;
  font-size: 14px;
`;

const EarningsContainer = styled.div`
  min-width: 180px;
`;

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 2px;
  margin: 16px auto 8px;
  width: 100%;
`

const ActionPanel: React.FunctionComponent<FarmCardProps> = ({
  farm,
  expanded,
}) => {
  return (
    <Container expanded={expanded}>
      <Flex flexDirection='column' mr='8px' mb='16px'>
        <ActionCard padding='10px 16px'>
          <Flex>
            <Flex flexDirection='column' justifyContent='space-between'>
              <Text fontSize="20px" color='textSubtle' bold>Your Rewards</Text>
              <StyledButton color='primary' scale='sm'>Harvest</StyledButton>
            </Flex>
            <Flex alignItems='center' ml='40px'>
              <Flex flexDirection='column'>
                <RewardImage src='/images/penguin-finance-logo.svg' alt='penguin' size={64} />
                <Text fontSize='14px' color='textSubtle'>18.24 PEFI</Text>
              </Flex>
              <Flex flexDirection='column' ml='32px' mt='4px'>
                <RewardImage src="/images/pools/iPefi.svg" alt='iPefi' size={56} />
                <Text mt='4px' fontSize='14px' color='textSubtle'>4.39 iPEFI</Text>
              </Flex>
              <Flex flexDirection='column' ml='40px' mt='4px'>
                <RewardImage src={`${ASSET_CONTENT_URL}/project/pangolin/logo.png`} alt='pangolin' size={56} />
                <Text mt='4px' fontSize='14px' color='textSubtle'>3.24 PNG</Text>
              </Flex>
            </Flex>
          </Flex>
        </ActionCard>
        <ActionCard padding='10px 16px' mt='8px'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text fontSize="20px" color='textSubtle' bold>iPEFI Auto-Nesting</Text>
            <Text fontSize="12px" color='textDisabled'>Current Allocation: 50%</Text>
            <StyledButton color='primary' scale='sm'>Modify</StyledButton>
          </Flex>
        </ActionCard>
      </Flex>
      <ActionCard padding='10px 16px' mr='8px' mb='16px'>
        <Flex>
          <EarningsContainer>
            <Text fontSize="20px" color='textSubtle' bold lineHeight={1} mb='8px'>Your PEFI Earnings</Text>
            <Text color='textSubtle' fontSize='14px'>Balance: 500 LP</Text>
            <Text color='textSubtle' fontSize='14px'>Share of Igloo: 15 %</Text>
          </EarningsContainer>
          <RewardImage src='/images/farms/pefi-dai.svg' alt='pefi-earning' size={56} />
        </Flex>
        <Divider />
        <Flex> 
          <EarningsContainer>
            <Text fontSize="20px" color='textSubtle' bold lineHeight={1} mb='8px'>Igloo Stats</Text>
            <Text color='textSubtle' fontSize='14px'>PEFI/week: 50,000</Text>
            <Text color='textSubtle' fontSize='14px'>PEFI/month: 100,000</Text>
            <Text color='textSubtle' fontSize='14px'>PEFI/year: 200,000</Text>
          </EarningsContainer>
          <RewardImage src='/images/farms/pefi-dai.svg' alt='igloo-stats' size={56} />
        </Flex>
      </ActionCard>
      <ActionCard padding='10px 16px' mb='16px'>
        <StakePanel {...farm} />
      </ActionCard>
    </Container>
  )
}

export default ActionPanel
