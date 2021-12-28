import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, Progress, useMatchBreakpoints, Button } from 'penguinfinance-uikit2'
import useTheme from 'hooks/useTheme'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import {
  usePriceAvaxUsdt,
  useKittyLaunchpad,
  useClubPenguinFarms,
  useKittyBoosterRocket as useKittyBoosterRocketStore,
} from 'state/hooks'
import SvgIcon from 'components/SvgIcon'
import Balance from 'components/Balance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getIPefiAddress, getKittyAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { addTokenToMetamask } from 'utils/token'
import { useKittyLaunchpadRegister } from '../hooks'

const SocialLinks = [
  // first row : FooterIconLinks[0]
  [
    {
      name: 'TelegramIcon',
      url: 'https://t.me/BinaryCatChat',
      imageUrl: 'images/ido/social_icons/telegram.png',
      key: 'telegram',
      label: 't.me/BinaryCatChat',
    },
    {
      name: 'TwitterIcon',
      url: 'https://twitter.com/BinaryCatApp',
      imageUrl: 'images/ido/social_icons/twitter.png',
      key: 'twitter',
      label: 'twitter.com/BinaryCatApp',
    },
    {
      name: 'MIcon',
      url: 'https://medium.com/@BinaryCat',
      imageUrl: 'images/ido/social_icons/medium.png',
      key: 'medium',
      label: 'medium.com/binary-cat',
    },
  ],
]

const IDODetail = ({ idoData, isEnded }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { registrationPeriodOngoing, isRegistered, registeredPenguins } = useKittyLaunchpad(account)
  const { totalTokensSold } = useKittyBoosterRocketStore(account)
  const totalTokensSoldInUsd = Number(totalTokensSold) * 0.045
  const saleProgress = isEnded ? 100 : (100 * totalTokensSoldInUsd) / idoData.totalRaised

  const { onRegister } = useKittyLaunchpadRegister()
  const { isDark } = useTheme()
  const avaxPriceInUsd = usePriceAvaxUsdt().toNumber()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const launchDate = new Date(`${idoData.startDate} GMT`).getTime()
  const currentDate = new Date().getTime()

  // iPefi balance in wallet
  const iPefiBalanceInWallet = useTokenBalance(getIPefiAddress())
  // iPefi staked balance in clubs
  const clubFarms = useClubPenguinFarms(account)
  const getIPefiStakedBalanceInClubs = () => {
    let _iPefiStakedBalanceInClubs = new BigNumber(0)
    clubFarms.map((clubFarm) => {
      const { userData } = clubFarm
      if (userData) {
        _iPefiStakedBalanceInClubs = _iPefiStakedBalanceInClubs.plus(new BigNumber(userData.stakedBalance))
      }
      return clubFarm
    })
    return _iPefiStakedBalanceInClubs
  }
  const staked = iPefiBalanceInWallet.plus(getIPefiStakedBalanceInClubs())
  const launchpadStaked = getBalanceNumber(new BigNumber(staked))
  const hasTier = launchpadStaked >= 250

  const handleRegister = async () => {
    setPendingTx(true)
    await onRegister()
    setPendingTx(false)
  }

  const handleAddToken = async () => {
    await addTokenToMetamask(getKittyAddress(), 'KITTY', 18)
  }

  const registerDisabled = !hasTier || !registrationPeriodOngoing || pendingTx || isRegistered

  return (
    <Container justifyContent="space-between">
      <IdoDescription>
        <Flex alignItems="center" mb="8px">
          <IdoLogo
            src={isDark ? `/images/ido/${idoData.darkLogo}` : `/images/ido/${idoData.darkLogo}`}
            alt="kitty"
            height={36}
          />
          <Flex ml="24px">
            <IdoTag variant="primary" completed={isEnded}>
              {isEnded ? 'Completed' : 'In Progress'}
            </IdoTag>
          </Flex>
        </Flex>
        {isEnded && (
          <PriceText fontSize="14px" mb="8px" lineHeight="18px" fontWeight="bold">
            1 {idoData.tokenSymbol} = {`${(idoData.tokenPrice / avaxPriceInUsd).toFixed(5)} AVAX`}
          </PriceText>
        )}
        <HeaderTitle fontSize="40px" fontWeight={800} color="white" mt="40px">
          Revolutionizing the world of decentralized betting
        </HeaderTitle>
        <Description fontSize="16px" lineHeight="21px" color="white" mt="20px">
          Binary Cat is a decentralized platform powered by Avalanche where users can bet on the price of crypto-assets
          and the relationship between them.
        </Description>
        <Description fontSize="16px" lineHeight="21px" color="white" mt="20px">
          Offering a unique reward structure and awesome user interface, this project will be the leading betting
          platform on the network.
        </Description>
        <TokenLinks mt="40px" alignItems="center">
          {isEnded ? (
            <RegisterButton onClick={handleAddToken}>Add KITTY to Metamask</RegisterButton>
          ) : (
            <RegisterButton
              disabled={registerDisabled}
              isRegistered={!pendingTx && isRegistered}
              onClick={handleRegister}
            >
              {pendingTx && 'Registering...'}
              {!pendingTx && !isRegistered && 'Register'}
              {!pendingTx && isRegistered && 'Registered'}
            </RegisterButton>
          )}

          <SocialsContainer justifyContent="flex-end" flexDirection="column" alignItems="flex-end">
            <Flex justifyContent="space-around" alignItems="center">
              {SocialLinks[0].map((item) => {
                return (
                  <Flex className="social-item" key={`social-${item.key}`}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <img src={item.imageUrl} alt={item.key} />
                    </a>
                  </Flex>
                )
              })}
            </Flex>
          </SocialsContainer>
        </TokenLinks>
      </IdoDescription>
      <IdoDetailContainer>
        <IdoDetailCard>
          <TotalRaisedContainer justifyContent="flex-end" alignItems="center" mb="28px">
            <TotalRaisedTag>Total Raised</TotalRaisedTag>
            {isEnded ? (
              <Flex ml="16px">
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight="20px"
                  prefix="$"
                  decimals={0}
                  value={Number(idoData.totalRaised)}
                />
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight="20px"
                  prefix=" / "
                  decimals={0}
                  value={Number(idoData.totalRaised)}
                />
              </Flex>
            ) : (
              <Flex ml="16px">
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight="20px"
                  prefix="$"
                  decimals={0}
                  value={Number(totalTokensSoldInUsd)}
                />
                <Balance
                  fontSize="20px"
                  color="#682298"
                  fontWeight="600"
                  lineHeight="20px"
                  prefix=" / $"
                  decimals={0}
                  value={Number(idoData.totalRaised)}
                />
              </Flex>
            )}
            {!isMobile && (
              <>
                <HeaderDivider />
                <Flex alignItems="center">
                  <SvgIcon
                    src={`${process.env.PUBLIC_URL}/images/ido/icons/time-circle.svg`}
                    width="18px"
                    height="18px"
                  />
                  <Text color="#682298" fontSize="16px" ml="8px">
                    {launchDate >= currentDate
                      ? `${Math.ceil((launchDate - currentDate) / 86400000)} days`
                      : 'Launched'}
                  </Text>
                </Flex>
              </>
            )}
          </TotalRaisedContainer>
          <IDOValues justifyContent="flex-end" flexWrap="wrap" mb="18px">
            <Flex alignItems="flex-end" flexDirection="column">
              <Flex alignItems="center">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/user.svg`} width="18px" height="18px" />
                <DetailText fontSize="16px" ml="7px">
                  Participants
                </DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {registeredPenguins}
              </Text>
            </Flex>
            <Flex ml={isMobile ? '8px' : '60px'} alignItems="flex-end" flexDirection="column">
              <Flex alignItems="center">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/calendar.svg`} width="18px" height="18px" />
                <DetailText fontSize="16px" ml="7px">
                  Start Date
                </DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {idoData.startDate}
              </Text>
            </Flex>
            <Flex ml={isMobile ? '8px' : '60px'} alignItems="flex-end" flexDirection="column">
              <Flex alignItems="center">
                <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/wallet.svg`} width="18px" height="18px" />
                <DetailText fontSize="16px" ml="7px">
                  {isMobile ? 'Price' : 'Token Price'}
                </DetailText>
              </Flex>
              <Text fontSize="18px" color="#131313" fontWeight={500}>
                {idoData.tokenPrice > 0 ? `$${idoData.tokenPrice}` : '???'}
              </Text>
            </Flex>
          </IDOValues>
          <Flex justifyContent="flex-end" mb="18px" mt="24px">
            <Text color="#131313" fontSize="16px" lineHeight="21px">
              Sale Progress:
            </Text>
          </Flex>
          <ProgressContainer>
            <ProgressWrapper>
              <Progress primaryStep={saleProgress} />
            </ProgressWrapper>
            <ProgressText fontWeight={500} color="#131313" percentage={saleProgress}>
              {`${saleProgress.toFixed(2)}% `}
              <span>{`(${(100 - saleProgress).toFixed(2)}% left)`}</span>
            </ProgressText>
          </ProgressContainer>
          <Flex mt="56px" justifyContent="flex-end" alignItems="center">
            <SvgIcon src={`${process.env.PUBLIC_URL}/images/ido/icons/graph.svg`} width="18px" height="18px" />
            <Flex alignItems="flex-start" ml="4px">
              <Flex>
                <DetailText fontSize="16px">{isMobile ? 'Sold:' : 'Tokens Sold:'}</DetailText>
                <Text fontSize="16px" color="#131313" ml="4px">
                  {`${(totalTokensSold / 1000000).toFixed(2)}M`}
                </Text>
              </Flex>
              <Flex ml="30px">
                <DetailText fontSize="16px">{isMobile ? 'Distribution:' : 'Token Distribution:'}</DetailText>
                <Text fontSize="16px" color="#131313" ml="4px">
                  {idoData.distributedTokenAmount}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </IdoDetailCard>
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
`

const IdoLogo = styled.img`
  height: 36px;
`

const PriceText = styled(Text)`
  font-family: 'Fira Code';
  color: #9a70d3;
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

const TotalRaisedTag = styled(Tag)<{ completed?: boolean }>`
  border-radius: 4px;
  background: linear-gradient(270deg, #9d74d7 22.16%, #64228f 71.32%);
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
  color: #9a70d3;
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
`

const ProgressWrapper = styled.div`
  div {
    height: 7px;
    background: rgba(184, 167, 217, 0.3);
    div {
      border-radius: 28px;
      background: linear-gradient(270deg, #9d74d7 22.16%, #64228f 71.32%);
    }
  }
`

const ProgressText = styled(Text)<{ percentage: number }>`
  position: absolute;
  right: ${({ percentage }) => percentage >= 50 && 100 - percentage}%;
  left: ${({ percentage }) => percentage < 50 && percentage}%;
  white-space: nowrap;
  top: 12px;
  font-family: 'Fira Code';

  span {
    color: #9a70d3;
  }
`

const HeaderDivider = styled.div`
  height: 28px;
  background: #b8a7d9;
  width: 1px;
  margin-left: 20px;
  margin-right: 20px;
`

const IdoDescription = styled.div`
  padding: 0 16px;

  @media (min-width: 968px) {
    max-width: 840px;
  }

  @media (min-width: 1080px) {
    margin-right: 60px;
    max-width: 560px;
  }
`

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
`

const IDOValues = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  @media (min-width: 640px) {
    justify-content: flex-end;
    width: unset;
  }
`

const IdoDetailCard = styled.div`
  background: linear-gradient(164.28deg, #ffffff 4.93%, #d9c5e7 131.9%);
  box-shadow: 0px 121px 174px rgba(33, 6, 49, 0.1), 0px 61.2562px 75.8531px rgba(33, 6, 49, 0.0675),
    0px 24.2px 28.275px rgba(33, 6, 49, 0.05), 0px 5.29375px 10.0594px rgba(33, 6, 49, 0.0325);
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
`

const TokenLinks = styled(Flex)`
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1080px) {
    justify-content: flex-start;
  }
`

const TotalRaisedContainer = styled(Flex)`
  justify-content: flex-start;

  @media (min-width: 968px) {
    justify-content: flex-end;
  }
`

const RegisterButton = styled(Button)<{ isRegistered?: boolean }>`
  background: white;
  background: ${({ isRegistered }) => isRegistered && '#37DB92 !important'};
  color: ${({ isRegistered }) => isRegistered && '#ffffff !important'};

  box-shadow: 0px 121px 174px rgba(33, 6, 49, 0.1), 0px 61.2562px 75.8531px rgba(33, 6, 49, 0.0675),
    0px 24.2px 28.275px rgba(33, 6, 49, 0.05), 0px 5.29375px 10.0594px rgba(33, 6, 49, 0.0325);
  border-radius: 6px;
  height: 48px;
  color: #620aa8;
  font-size: 18px;
  font-weight: 500;
  width: 234px;
  white-space: nowrap;
  letter-spacing: 0.1px;
`

const SocialsContainer = styled(Flex)`
  align-items: flex-start;
  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  @media (min-width: 1080px) {
    align-items: flex-end;
  }

  .social-item {
    margin-left: 24px;

    &:first-child {
      margin-left: 0;

      @media (min-width: 768px) {
        margin-left: 24px;
      }
    }

    img {
      width: 38px;
    }
  }
`

export default IDODetail
