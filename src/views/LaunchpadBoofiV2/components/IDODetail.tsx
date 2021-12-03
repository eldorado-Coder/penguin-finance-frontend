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
        <HeaderTitle fontSize="40px" fontWeight={800} color="white" mt="30px">
          An exciting DeFi project building on Avalanche.
        </HeaderTitle>
        <Description fontSize="14px" lineHeight="18px" color="white" mt='20px'>
          Boo! BooFinance is bringing innovative DeFi tools to users on the Avalanche network. 
        </Description>
        <Description fontSize="14px" lineHeight="18px" color="white" mt='20px'>
          Our main products are The Cauldron, Deflationary NFTs, and the Boo Council (DAO)
        </Description>
        <Flex mt='40px'>
          <Flex onClick={handleViewSite(idoData.siteLink)} mr='16px'>
            <SiteLinkTag>
              <img src={`${process.env.PUBLIC_URL}/images/ido/link.svg`} alt='sitelabel' />
              {idoData.siteLabel}
            </SiteLinkTag>
          </Flex>
          <Flex onClick={handleViewSite(idoData.whitepaperLink)}>
            <SiteLinkTag>
              <img src={`${process.env.PUBLIC_URL}/images/ido/link.svg`} alt='whitepaper' />
              WhitePaper
            </SiteLinkTag>
          </Flex>
        </Flex>
      </IdoDescription>
      <IdoDetailContainer>
        <Flex alignItems='center' mb='28px'>
          <TotalRaisedTag>Total Raised</TotalRaisedTag>
          {idoData.isCompleted ? (
            <Flex ml='16px'>
              <Balance
                fontSize="20px"
                color="white"
                fontWeight="600"
                lineHeight='20px'
                prefix="$"
                decimals={0}
                value={Number(idoData.totalRaised)}
              />
              <Balance
                fontSize="20px"
                color="white"
                fontWeight="600"
                lineHeight='20px'
                prefix=" / "
                decimals={0}
                value={Number(idoData.totalRaised)}
              />
            </Flex>
          ) : (
            <Text ml='16px' fontSize="20px" color="white" fontWeight={600}>
              ??? / ???
            </Text>
          )}
          {!isMobile && 
            <>
              <HeaderDivider />
              <Flex>
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/time-circle.svg`} width="18px" height="18px" />
                <DetailText fontSize="14px" ml='8px'>Launched</DetailText>
              </Flex>
            </>
          }
        </Flex>
        <IDOValues justifyContent="flex-end" flexWrap="wrap" mb="18px">
          <Flex alignItems='flex-end' flexDirection='column'>
            <Flex>
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/user.svg`} width="18px" height="18px" />
              <DetailText fontSize="14px" ml='8px'>Participants</DetailText>
            </Flex>
            <Text fontSize="16px" color="white" fontWeight={600}>
              {idoData.participants}
            </Text>
          </Flex>
          <Flex ml={isMobile ? '16px' : '60px'} alignItems='flex-end' flexDirection='column'>
            <Flex>
              <SvgIcon
                src={`${process.env.PUBLIC_URL}/images/ido/icons/calendar.svg`}
                width="18px"
                height="18px"
              />
              <DetailText fontSize="14px" ml="8px">Start Date</DetailText>
            </Flex>
            <Text fontSize="16px" color="white" fontWeight={600}>
              {idoData.startDate}
            </Text>
          </Flex>
          <Flex ml={isMobile ? '16px' : '60px'} alignItems='flex-end' flexDirection='column'>
            <Flex>
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/wallet.svg`} width="18px" height="18px" />
              <DetailText fontSize="14px" ml="8px">Token Price</DetailText>
            </Flex>
            <Text fontSize="16px" color="white" fontWeight={600}>
              {idoData.tokenPrice > 0 ? `$ ${idoData.tokenPrice}` : '???'}
            </Text>
          </Flex>
        </IDOValues>
        <Flex justifyContent='flex-end' mb='20px' mt={isMobile ? '24px' : '32px'}>
          <Text color='white' fontSize="14px" lineHeight='21px'>Sale Progress:</Text>
        </Flex>
        <ProgressContainer>
          <ProgressWrapper>
            <Progress primaryStep={idoData.saleProgress} />
          </ProgressWrapper>
          <ProgressText color='white' percentage={idoData.saleProgress}>{`${idoData.saleProgress}% `}<span>{`(${100-idoData.saleProgress}% left)`}</span></ProgressText>
        </ProgressContainer>
        <Flex mt='56px' justifyContent='flex-end'>
          <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/graph.svg`} width="18px" height="18px" />
          <Flex alignItems="flex-start" ml="4px">
            <Flex>
              <DetailText fontSize="14px">Tokens Sold:</DetailText>
              <Text fontSize="14px" color="white" ml="4px">
                {idoData.soldTokenAmount}
              </Text>
            </Flex>
            <Flex ml='30px'>
              <DetailText fontSize="14px">Tokens Distribution:</DetailText>
              <Text fontSize="14px" color="white" ml='4px'>
                {idoData.distributedTokenAmount}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Socials justifyContent='flex-end' flexDirection='column' alignItems='flex-end'>
          <DetailText className='social-label' fontSize='12px' mb='16px'>Social Channels</DetailText>
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
  color: ${({ theme }) => (theme.isDark ? '#F3F3F3' : '#B8A7D9')};
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

const SiteLinkTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.86);
  font-size: 12px;
  line-height: 18px;
  color: #1D5AD1;
  border: none;
  height: 28px;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`

const TotalRaisedTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 4px;
  background: #B8A7D9;
  font-size: 14px;
  line-height: 14px;
  color: white;
  border: none;
  height: 28px;
  cursor: pointer;
`

const Description = styled(Text)`
  font-family: 'Fira Code';
  font-size: 14px;
  line-height: 18px;
  text-align: center;

  @media (min-width: 1080px) {
    font-size: 14px;
    line-height: 18px;
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
    font-size: 40x;
    line-height: 47px;
    text-align: left;
  }
`

const DetailText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#B8A7D9' : '#B8A7D9')};
`

const ProgressContainer = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 640px) {
    max-width: 340px;
  }

  @media (min-width: 1080px) {
    margin-left: auto;
  }
`;

const ProgressWrapper = styled.div`
  div {
    height: 5px;
    background: rgba(184, 167, 217, 0.3);
    div {
      border-radius: 28px;
      background: white;;
    }
  }
`

const Socials = styled(Flex)`
  align-items: flex-start;
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
  }
`;

const ProgressText = styled(Text)<{ percentage: number }>`
  position: absolute;
  right: ${({ percentage}) => 100-percentage}%;
  white-space: nowrap;
  top: 12px;
  font-family: 'Fira Code';

  span {
    color: #B8A7D9;
  }
`;

const HeaderDivider = styled.div`
  height: 28px;
  background: #B8A7D9;
  width: 1px;
  margin-left: 40px;
  margin-right: 40px;
`;

const IdoDescription = styled.div`
  padding: 0 16px;
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
  align-items: flex-start;
  width: 100%;

  @media (min-width: 640px) {
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

export default IDODetail
