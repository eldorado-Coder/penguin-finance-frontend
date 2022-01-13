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
  { label: 'Hard Cap', value: '100,000,000' },
  { label: 'Launchpad', value: '12,500,000' },
  { label: 'Team', value: '7,500,000' },
  { label: 'Seed/Strategic Sale', value: '5,000,000' },
  { label: 'Private Sale', value: '5,000,000' },
  { label: 'Community Pool', value: '70,000,000' },
];

const ProjectDescription = () => {
  return (
    <Container>
      <MaskBgContainer />
      <MaskBgImageContainer />
      <LaunchpadPage>
        <IntroductionContainer>
          <IntroductionImage src={`${process.env.PUBLIC_URL}/images/ido/introduction_kitty.jpg`} />
          <IdoDetails>
            <HeaderTitle fontSize='34px' color='#313131' fontWeight={800} mb='8px'>About the Kassandra Project</HeaderTitle>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              Kassandra is an audacious project to delegate money management in a decentralized, efficient, and customizable way, working as a marketplace for tokenized and data-driven investment strategies. 
            </Description>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              For managers, Kassandra is a plug-and-earn solution to port complex money management strategies to decentralized ecosystems, saving time and costs when compared to the traditional market, helping managers to raise funds without the need for complex infrastructure.
            </Description>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              With Kassandra, retail investors will be able to delegate money management to professionals without hassle. 
            </Description>
            <Description fontSize='12px' lineHeight='16px' color='#7F7F7F' mt='24px'>
              The first curated tokenized investment fund to be launched by Kassandra will be the Avalanche Social Index, an investment strategy that would automatically invest in the most solid and engaged communities by using social data in partnership with the social data company https://heimdall.land
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
