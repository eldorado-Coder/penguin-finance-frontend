import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'penguinfinance-uikit2'
import Page from 'components/layout/Page'

// const TOKEN_SALES_ECONOMICS = [
//   { label: 'Hard Cap', value: 'Hard Cap' },
//   { label: 'Total Token Supply', value: 'Total Token Supply' },
//   { label: 'Initial Circulating Supply', value: 'Initial Circulating Supply' },
//   { label: 'Public Sale Token Price', value: 'Public Sale Token Price' },
//   { label: 'Tokens Offered', value: 'Tokens Offered' },
//   { label: 'Hard Cap Per User', value: 'Hard Cap Per User' },
//   { label: 'Token Sale Vesting Period', value: 'Token Sale Vesting Period' },
//   { label: 'Token Type', value: 'Token Type' },
//   { label: 'Token Distribution', value: 'Token Distribution' },
// ];

const TOKEN_SALES_ECONOMICS = [
  { label: 'Hard Cap', value: '10,000,000' },
  { label: 'Farming & Staking Rewards', value: '5,100,000' },
  { label: 'Initial Token Sale', value: '2,000,000' },
  { label: 'Strategic Partnerships & Advisors', value: '500,000' },
  { label: 'Development & Bug Bounties', value: '500,000' },
  { label: 'Marketing & Community Growth', value: '500,000' },
  { label: 'Foundation ', value: '1,400,000' }
];

const ProjectDescription = () => {
  return (
    <Container>
      <MaskBgContainer />
      <MaskBgImageContainer />
      <LaunchpadPage>
        <IntroductionContainer>
          <IntroductionImage src={`${process.env.PUBLIC_URL}/images/ido/introduction_boofi.png`} />
          <IdoDetails>
            <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mb='8px'>About the BooFinance Project</HeaderTitle>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              Boo Finance is pioneering DeFi 3.0 with an exciting, gamified yield farming platform built for user competition. Users can enter the Haunted House of dApps through the Cauldron, where you earn zBOOFI rewards by staking your LP or single-asset, interest-bearing tokens. The Stake allows you to &quot;zombify&quot; your BOOFI on the spot for zBOOFI (single-asset staking)! zBOOFI is your ticket to adventure in the Haunted House, and it&apos;s always growing in value.
            </Description>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              &quot;Ghosts&quot; use the Cauldron and the Stake to maximize their zBOOFI over time, competing for the highest score on the Well of Souls leaderboard. By staking a lot of zBOOFI for a long period of time, you&apos;ll earn additional BOOFI rewards. Ghosts who harvest the most rewards ascend their way to the top of the leaderboard and gain the title of Top Necromancers! Not only do Top Necromancers get fame, glory, and BOOFI rewards, they also get unique additional rewards. Airdrops, bonus tokens, and NFTs are just a few things possible for the most dedicated users!
            </Description>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              Just like Penguin Finance, Boo Finance is a community-oriented protocol, with no venture capital, pre-mine, or private sales. Boo Finance aims to maximize its impact on Avalanche through a fun and innovative wealth-generation machine.
            </Description>
            <Text fontSize='24px' color='#292929' fontWeight={800} mt='32px'>Token Sale and Economics</Text>
            <TokenSalesEconomics>
              {TOKEN_SALES_ECONOMICS.map((tokenEconomic, index) => {
                return (
                  <TokenEconomic index={index} key={tokenEconomic.label}>
                    <Text color='#9A70D3' fontSize='14px' lineHeight='32px' fontWeight={600}>{tokenEconomic.label}</Text>
                    <Text color='#292929' fontSize='14px' lineHeight='32px' fontWeight={600}>{tokenEconomic.value}</Text>
                  </TokenEconomic>
                )
              })}
            </TokenSalesEconomics>
          </IdoDetails>
        </IntroductionContainer>
      </LaunchpadPage>
    </Container>
  )
}

const TokenEconomic = styled(Flex)<{ index: number }>`
  border-bottom: 1px solid #DCDCDC;
  text-transform: uppercase;
  padding-top: 8px;
  padding-bottom: 8px;

  div {
    width: 50%;
    padding-left: 0;
    line-height: 14px;
    line-height: 16px;

    &:last-child {
      padding-left: 16px;
    }

    @media (min-width: 640px) {
      padding-left: 16px;
    }
  }
`;

const TokenSalesEconomics = styled.div`
  max-width: 600px;
  border-radius: 6px;
  margin-top: 20px;
`;

const IntroductionImage = styled.img`
  width: 100%;
  border-radius: 16px 16px 0 0;
`;

const Description = styled(Text)`
  font-family: 'Fira Code';
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 60px;
  max-height: 1140px;
`;

const HeaderTitle = styled(Text)`
  font-size: 26px;
  line-height: 1;
  @media (min-width: 640px) {
    font-size: 34px;
    line-height: 1.5;
  }
`;

const LaunchpadPage = styled(Page)`
  max-width: 940px;
  padding-top: 40px;

  @media (min-width: 640px) {
    padding-top: 60px;
  }

  @media (min-width: 968px) {
    padding-top: 100px;
  }
`;

const MaskBgContainer = styled.div`
  background-size: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
  background: linear-gradient(204.54deg, #2A2844 39.75%, #1F2426 139.73%);
`;

const MaskBgImageContainer = styled.div`
  background-image: url('/images/ido/mask.png');
  background-size: cover;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`;

const IntroductionContainer = styled.div`
  background: white;
  box-shadow: 0px 121px 174px rgba(33, 6, 49, 0.1), 0px 61.2562px 75.8531px rgba(33, 6, 49, 0.0675), 0px 24.2px 28.275px rgba(33, 6, 49, 0.05), 0px 5.29375px 10.0594px rgba(33, 6, 49, 0.0325);
  border-radius: 20px;
`;

const IdoDetails = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    padding: 32px;
  }
  @media (min-width: 968px) {
    padding: 50px;
  }
`;

export default ProjectDescription
