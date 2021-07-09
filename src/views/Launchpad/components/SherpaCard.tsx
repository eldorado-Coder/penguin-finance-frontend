
import React from 'react'
import styled from 'styled-components'
import { Image, Text, Flex, Progress, Input, Button } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import SherpaCardFooter from './SherpaCardFooter';

const SherpaCard: React.FC = () => {
  const { account } = useWeb3React()

  return (
    <FCard>
      <CardHeader justifyContent='space-between' alignItems='center' pr='32px' pl='32px' />
      <CardContent>
        <Flex alignItems='center' mb='24px'>
          <Image src='/images/launchpad/sherpalogo.png' width={64} height={64} alt='sherpa' mr='16px' />
          <div>
            <Text fontSize='18px' bold>SHERPA CASH (SHERPA)</Text>
            <Details>
              <Text fontSize='12px'>Homepage</Text>
              <Text fontSize='12px'>Whitepaper</Text>
              <Text fontSize='12px'>Medium</Text>
            </Details>
          </div>
        </Flex>
        <Flex justifyContent='space-between' mb='4px'>
          <Text fontSize='12px'>Launch Time</Text>
          <Text fontSize='14px'>June 21, 13:00 UTC</Text>
        </Flex>
        <Flex justifyContent='space-between' mb='16px'>
          <Text fontSize='12px'>For Sale</Text>
          <Text fontSize='14px'>600.000 SHERPA</Text>
        </Flex>
        <Text fontSize='12px' mb='4px'>Progress</Text>
        <ProgressWrapper>
          <Progress primaryStep={10} />
        </ProgressWrapper>
        <Flex justifyContent='space-between' mt='4px'>
          <Text fontSize='12px'>10.00%</Text>
          <Text fontSize='12px'>600.000</Text>
        </Flex>
        <ClaimsWrapper>
          <Text className='your-token' fontSize='12px' mb='4px'>Your tokens to cliam</Text>
          <div className='claim-container'>
            <StyledInput scale='sm' />
            <ClaimButton height='32px' size='sm'>Claim</ClaimButton>
          </div>
        </ClaimsWrapper>
      </CardContent>
      <CardAction>
        <SherpaCardFooter />
      </CardAction>
    </FCard>
  )
}

const CardContent = styled.div`
  padding: 16px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px 32px 0 0;

  img {
    max-height: 330px;
  }
`

const CardHeader = styled(Flex)`
  height: 96px;
  background-image: url('/images/launchpad/sherpa_banner.png');
  background-size: cover;
  background-position: center center;
  border-radius: 32px 32px 0 0;
  
  div {
    color: white;
  }
`;

const Details = styled(Flex)`
  div {
    margin-right: 16px;
  }
`;

const ProgressWrapper = styled.div`
  div {
    height: 8px;
    div {
      background-color: #53DEE9;
    }
  }
`;

const CardAction = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 0 0 32px 32px;
`;

const ClaimsWrapper = styled.div`
  margin-top: 60px;
  .your-token {
    text-decoration: underline;
  }

  .claim-container {
    position: relative;
  }
`;

const FCard = styled.div`
  align-self: flex-start;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  position: relative;
  min-height: 510px;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 100%;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.input} !important;
  padding: 0 88px 0 12px;
  border-radius: 12px;
  font-size: 14px;

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const ClaimButton = styled(Button)`
  height: 32px;
  border-radius: 12px;
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  background: ${({ theme }) => theme.isDark && theme.colors.textDisabled};
  color: white;
`;

export default SherpaCard
