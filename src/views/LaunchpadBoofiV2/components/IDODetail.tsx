import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress, useMatchBreakpoints } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import { usePriceAvaxUsdt } from 'state/hooks'
import SvgIcon from 'components/SvgIcon'
import Balance from 'components/Balance'

const SocialLinks = [
  // first row : FooterIconLinks[0]
  [
    // {
    //   name: 'TelegramIcon',
    //   url: 'https://twitter.com/Boo_Finance',
    //   imageUrl: 'images/ido/telegram.svg',
    //   key: 'telegram',
    //   label: 't.me/BooFinance'
    // },
    {
      name: 'DiscordIcon',
      url: 'https://discord.com/invite/A3KbWpsZfE',
      imageUrl: 'images/ido/social_icons/discord.png',
      key: 'discord',
      label: 'discord.com/Boo_Finance'
    },
    {
      name: 'TwittweIcon',
      url: 'https://twitter.com/Boo_Finance',
      imageUrl: 'images/ido/social_icons/twitter.png',
      key: 'twitter',
      label: 'twitter.com/Boo_Finance'
    },
    // {
    //   name: 'MIcon',
    //   url: 'https://twitter.com/Boo_Finance',
    //   imageUrl: 'images/ido/medium.svg',
    //   key: 'medium',
    //   label: 'medium.com/Boo_Finance'
    // },
  ],
]

const IDODetail = ({ idoData }) => {
  const { isDark } = useTheme();
  const avaxPriceInUsd = usePriceAvaxUsdt().toNumber()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm;

  const handleViewSite = link => () => {
    window.open(link, '_blank');
  };

  return (
    <Container justifyContent='space-between'>
      <IdoDescription>
        <Flex alignItems="center" mb="8px">
          <IdoLogo
            src={
              isDark
                ? `/images/ido/${idoData.darkLogo}`
                : `/images/ido/${idoData.darkLogo}`
            }
            alt='boofi'
            height={36}
          />
          <Flex ml='24px'>
            <IdoTag variant="primary" completed={idoData.isCompleted}>
              {idoData.isCompleted ? 'Completed' : 'In Progress'}
            </IdoTag>
          </Flex>
        </Flex>
        {idoData.isCompleted && (
          <PriceText fontSize="14px" mb="8px" lineHeight='18px' fontWeight='bold'>
            1 {idoData.tokenSymbol} = {`${(idoData.tokenPrice / avaxPriceInUsd).toFixed(5)} AVAX`}
          </PriceText>
        )}
        <HeaderTitle fontSize="40px" fontWeight={800} color="white" mt="40px">
          An exciting DeFi project building on Avalanche.
        </HeaderTitle>
        <Description fontSize="16px" lineHeight="21px" color="white" mt='20px'>
          Boo! BooFinance is bringing innovative DeFi tools to users on the Avalanche network. 
        </Description>
        <Description fontSize="16px" lineHeight="21px" color="white" mt='20px'>
          Our main products are The Cauldron, Deflationary NFTs, and the Boo Council (DAO)
        </Description>
        <TokenLinks mt='40px' alignItems='center'>
          <Flex mr='16px'>
            <SiteLinkTag href={idoData.siteLink} target='_blank'>
              <img src={`${process.env.PUBLIC_URL}/images/ido/website.svg`} alt='sitelabel' />
              Website
            </SiteLinkTag>
          </Flex>
          <Divider />
          <Flex ml='16px'>
            <SiteLinkTag href={idoData.whitepaperLink} target='_blank'>
              <img src={`${process.env.PUBLIC_URL}/images/ido/document.svg`} alt='whitepaper' />
              Docs
            </SiteLinkTag>
          </Flex>
        </TokenLinks>
      </IdoDescription>
      <IdoDetailContainer>
        <IdoDetailCard>
          <TotalRaisedContainer justifyContent='flex-end' alignItems='center' mb='28px'>
            <TotalRaisedTag>Total Raised</TotalRaisedTag>
            {idoData.isCompleted ? (
              <Flex ml='16px'>
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight='20px'
                  prefix="$"
                  decimals={0}
                  value={Number(idoData.totalRaised)}
                />
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight='20px'
                  prefix=" / "
                  decimals={0}
                  value={Number(idoData.totalRaised)}
                />
              </Flex>
            ) : (
              <Text ml='16px' fontSize="20px" color="#682298" fontWeight={600}>
                ??? / ???
              </Text>
            )}
            {!isMobile && 
              <>
                <HeaderDivider />
                <Flex alignItems='center'>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/time-circle.svg`} width="18px" height="18px" />
                  <Text color='#682298' fontSize="16px" ml='8px'>Launched</Text>
                </Flex>
              </>
            }
          </TotalRaisedContainer>
          <IDOValues justifyContent="flex-end" flexWrap="wrap" mb="18px">
            <Flex alignItems='flex-end' flexDirection='column'>
              <Flex alignItems='center'>
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/user.svg`} width="18px" height="18px" />
                <DetailText fontSize="16px" ml='7px'>Participants</DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {idoData.participants}
              </Text>
            </Flex>
            <Flex ml={isMobile ? '8px' : '60px'} alignItems='flex-end' flexDirection='column'>
              <Flex alignItems='center'>
                <SvgIcon
                  src={`${process.env.PUBLIC_URL}/images/ido/icons/calendar.svg`}
                  width="18px"
                  height="18px"
                />
                <DetailText fontSize="16px" ml="7px">Start Date</DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {idoData.startDate}
              </Text>
            </Flex>
            <Flex ml={isMobile ? '8px' : '60px'} alignItems='flex-end' flexDirection='column'>
              <Flex alignItems='center'>
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/wallet.svg`} width="18px" height="18px" />
                <DetailText fontSize="16px" ml="7px">{isMobile ? 'Price' : 'Token Price'}</DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {idoData.tokenPrice > 0 ? `$${idoData.tokenPrice}` : '???'}
              </Text>
            </Flex>
          </IDOValues>
          <Flex justifyContent='flex-end' mb='18px' mt='24px'>
            <Text color='#131313' fontSize="16px" lineHeight='21px'>Sale Progress:</Text>
          </Flex>
          <ProgressContainer>
            <ProgressWrapper>
              <Progress primaryStep={idoData.saleProgress} />
            </ProgressWrapper>
            <ProgressText fontWeight={500} color='#131313' percentage={idoData.saleProgress}>{`${idoData.saleProgress}% `}<span>{`(${100-idoData.saleProgress}% left)`}</span></ProgressText>
          </ProgressContainer>
          <Flex mt='56px' justifyContent='flex-end' alignItems='center'>
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/graph.svg`} width="18px" height="18px" />
            <Flex alignItems="flex-start" ml="4px">
              <Flex>
                <DetailText fontSize="16px">{isMobile ? 'Sold:' : 'Tokens Sold:'}</DetailText>
                <Text fontSize="16px" color="#131313" ml="4px">
                  {idoData.soldTokenAmount}
                </Text>
              </Flex>
              <Flex ml='30px'>
                <DetailText fontSize="16px">{isMobile ? 'Distribution:' : 'Tokens Distribution:'}</DetailText>
                <Text fontSize="16px" color="#131313" ml='4px'>
                  {idoData.distributedTokenAmount}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </IdoDetailCard>
        <Socials justifyContent='flex-end' flexDirection='column' alignItems='flex-end'>
          <Flex justifyContent="space-around" alignItems="center">
            {SocialLinks[0].map((item) => {
              return (
                <Flex className='social-item' key={`social-${item.key}`}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <img src={item.imageUrl} alt={item.key} />
                    {/* <SvgIcon src={item.imageUrl} width='24px' height='24px' /> */}
                  </a>
                </Flex>
              )
            })}
          </Flex>
        </Socials>
      </IdoDetailContainer>
    </Container>
  )
}

const Container = styled(Flex)`
  max-width: 1200px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: 968px) {
    align-items: center;
  }

  @media (min-width: 1080px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const IdoLogo = styled.img`
  height: 36px;
`

const PriceText = styled(Text)`
  font-family: 'Fira Code';
  color: #9A70D3;
`

const IdoTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 6px;
  background: ${({ completed }) => (completed ? '#F39FD7' : '#FFD6A6')};
  font-size: 12px;
  line-height: 18px;
  color: ${({ completed }) => (completed ? '#AD4289' : '#EB780F')};
  border: none;
  height: 22px;
`

const SiteLinkTag = styled.a<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: #EBE6F0;
  border: none;
  height: 28px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
`

const Divider = styled.div`
  height: 16px;
  border-right: 1px solid #9A70D3;
`;

const TotalRaisedTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 4px;
  background: linear-gradient(270deg, #9D74D7 22.16%, #64228F 71.32%);
  font-size: 16px;
  line-height: 22px;
  color: white;
  border: none;
  height: 24px;
  cursor: pointer;
  padding-left: 12px;
  padding-right: 12px;
`

const Description = styled(Text)`
  font-family: 'Fira Code';
  font-size: 16px;
  line-height: 21px;
  text-align: center;

  @media (min-width: 1080px) {
    text-align: left;
  }
`

const HeaderTitle = styled(Text)`
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  max-width: 1040px;
  text-shadow: 1px 1px #858585;

  @media (min-width: 968px) {
    font-size: 36px;
    line-height: 40px;
  }

  @media (min-width: 1080px) {
    font-size: 40px;
    line-height: 47px;
    text-align: left;
  }
`

const DetailText = styled(Text)`
  color: #9A70D3;
`

const ProgressContainer = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 640px) {
    max-width: 400px;
  }

  @media (min-width: 968px) {
    margin-left: auto;
  }
`;

const ProgressWrapper = styled.div`
  div {
    height: 7px;
    background: rgba(184, 167, 217, 0.3);
    div {
      border-radius: 28px;
      background: linear-gradient(270deg, #9D74D7 22.16%, #64228F 71.32%);
    }
  }
`

const Socials = styled(Flex)`
  align-items: flex-start;
  margin-top: 32px;
  @media (min-width: 1080px) {
    align-items: flex-end;
  }

  .social-label {
    margin-top: 32px;
    @media (min-width: 1080px) {
      margin-top: 48px;
    }
  }
  .social-item {
    margin-right: 32px;

    img {
      width: 24px;
    }

    @media (min-width: 1080px) {
      margin-left: 32px;
      margin-right: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ProgressText = styled(Text)<{ percentage: number }>`
  position: absolute;
  right: ${({ percentage}) => 100-percentage}%;
  white-space: nowrap;
  top: 12px;
  font-family: 'Fira Code';

  span {
    color: #9A70D3;
  }
`;

const HeaderDivider = styled.div`
  height: 28px;
  background: #B8A7D9;
  width: 1px;
  margin-left: 20px;
  margin-right: 20px;
`;

const IdoDescription = styled.div`
  padding: 0 16px;
  
  @media (min-width: 968px) {
    max-width: 840px;
  }

  @media (min-width: 1080px) {
    margin-right: 80px;
    max-width: 560px;
  }
`;

const IdoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  padding: 0 16px;
  align-items: center;
  width: 100%;

  @media (min-width: 968px) {
    width: unset;
  }
  
  @media (min-width: 1080px) {
    align-items: flex-end;
    max-width: unset;
    width: unset;
    margin-top: 0;
  }
`;

const IDOValues = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  @media (min-width: 640px) {
    justify-content: flex-end;
    width: unset;
  }
`;

const IdoDetailCard = styled.div`
  background: linear-gradient(164.28deg, #FFFFFF 4.93%, #D9C5E7 131.9%);
  box-shadow: 0px 121px 174px rgba(33, 6, 49, 0.1), 0px 61.2562px 75.8531px rgba(33, 6, 49, 0.0675), 0px 24.2px 28.275px rgba(33, 6, 49, 0.05), 0px 5.29375px 10.0594px rgba(33, 6, 49, 0.0325);
  border-radius: 20px;
  padding: 16px;

  @media (min-width: 640px) {
    padding: 20px;
  }

  @media (min-width: 968px) {
    padding: 24px;
  }

  @media (min-width: 1080px) {
    min-width: 500px;
    padding: 24px 24px 24px 40px;
  }
`;

const TokenLinks = styled(Flex)`
  justify-content: center;

  @media (min-width: 968px) {
    justify-content: flex-start;
  }
`;

const TotalRaisedContainer = styled(Flex)`
  justify-content: flex-start;

  @media (min-width: 968px) {
    justify-content: flex-end;
  }
`;

export default IDODetail
