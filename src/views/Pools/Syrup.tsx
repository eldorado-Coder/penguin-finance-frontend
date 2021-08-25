import React, { useState, useCallback, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button } from 'penguinfinance-uikit2'
import { SECONDS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import priceToBnb from 'utils/priceToBnb'
import useBlock from 'hooks/useBlock'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import useBlockGenerationTime from 'hooks/useBlockGenerationTime'
import useUserSetting from 'hooks/useUserSetting'
import { useXPefi } from 'hooks/useContract'
import { useFarms, usePriceAvaxUsdt, usePools, usePriceEthAvax, useNestApy } from 'state/hooks'
import { PoolCategory } from 'config/constants/types'
import { getAccounts, getFirstStakeTime } from 'subgraph/utils'
import { getPefiAddress } from 'utils/addressHelpers'
import roundDown from 'utils/roundDown'
import Page from 'components/layout/Page'
import CardValue from 'components/CardValue'
import NestCard from './components/NestCard'

const Farm: React.FC = () => {
  const [userHistoricalInfo, setUserHistoricalInfo] = useState({
    stakePefiAmount: '0',
    stakeXPefiAmount: '0',
    unStakePefiAmount: '0',
    unStakeXPefiAmount: '0',
  })
  const [userFirstStakeTime, setUserFirstStakeTime] = useState(0)
  const [handsOnPenalty, setHandsOnPenalty] = useState(0)

  const { refreshRate } = useUserSetting()
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const avaxPriceUSD = usePriceAvaxUsdt()
  const ethPriceBnb = usePriceEthAvax()
  const block = useBlock()
  const AVAX_BLOCK_TIME = useBlockGenerationTime()
  const xPefiContract = useXPefi()
  const displayedNestApy = (useNestApy() * 100).toFixed(2)
  const BLOCKS_PER_YEAR = new BigNumber(SECONDS_PER_YEAR).div(new BigNumber(AVAX_BLOCK_TIME))

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    const tempMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is AVAX
    const stakingTokenPriceInAVAX = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)
    const rewardTokenPriceInAVAX = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
      avaxPriceUSD,
    )

    const totalRewardPricePerYear = rewardTokenPriceInAVAX.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInAVAX.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  const fetchUserHistoricalBalance = useCallback(async () => {
    const accountInfo = await getAccounts(account)

    if (accountInfo) {
      setUserHistoricalInfo(accountInfo)
    } else {
      setUserHistoricalInfo({
        stakePefiAmount: '0',
        stakeXPefiAmount: '0',
        unStakePefiAmount: '0',
        unStakeXPefiAmount: '0',
      })
    }
  }, [account])

  const fetchUserFirstStakeTime = useCallback(async () => {
    const firstStakeTime = await getFirstStakeTime(account)

    if (firstStakeTime) {
      setUserFirstStakeTime(firstStakeTime)
    } else {
      setUserFirstStakeTime(0)
    }
  }, [account])

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchUserHistoricalBalance()
      fetchUserFirstStakeTime()
    }, refreshRate)
    return () => clearInterval(refreshInterval)
  }, [account, refreshRate, fetchUserHistoricalBalance, fetchUserFirstStakeTime])

  const fetchEarlyWithdrawalFee = useCallback(async () => {
    const earlyWithdrawalFee = await xPefiContract.methods.earlyWithdrawalFee().call()
    const maxEarlyWithdrawalFee = await xPefiContract.methods.MAX_EARLY_WITHDRAW_FEE().call()
    const penalty = (earlyWithdrawalFee / maxEarlyWithdrawalFee) * 100
    setHandsOnPenalty(penalty)
  }, [xPefiContract])

  useEffect(() => {
    fetchEarlyWithdrawalFee()
  }, [fetchEarlyWithdrawalFee])

  const getXPefiToPefiRatio = () => {
    return openPools[0].totalStaked && openPools[0].totalSupply
      ? new BigNumber(openPools[0].totalStaked).div(new BigNumber(openPools[0].totalSupply)).toNumber()
      : 1
  }

  const xPefiToPefiRatio = getXPefiToPefiRatio()
  const stakedBalance = new BigNumber(openPools[0].userData?.stakedBalance || 0)
  const pefiBalance = useTokenBalance(getPefiAddress())

  const userTotalPefiEarned =
    xPefiToPefiRatio * getBalanceNumber(stakedBalance) -
    Number(userHistoricalInfo.stakePefiAmount) +
    Number(userHistoricalInfo.unStakePefiAmount)

  const handleLearnMore = () => {
    window.open('https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection', '_blank')
  }

  const currentDateTime = new Date().getTime() / 1000
  const { isDark } = useTheme()

  return (
    <NestPage>
      <BgWrapper>
        <IgloosBgContainer />
      </BgWrapper>
      <NestBannerContainer>
        {/* <StyledCard>
          <Flex justifyContent="center" alignItems="center">
            <Title bold>THE NEST</Title>
          </Flex>
        </StyledCard> */}
        <BannerImage
          src={`${process.env.PUBLIC_URL}/images/pools/${isDark ? 'nest_banner_dark.svg' : 'nest_banner_light.svg'}`}
          alt="nest banner"
        />
      </NestBannerContainer>
      <Flex justifyContent="center">
        <NestDetailsContainer>
          <Text color="primary" mb="12px" fontSize="24px" bold>
            Maximize yield by staking PEFI for xPEFI
          </Text>
          <NestDescription mb="24px">
            PEFI is minted & collected from fees within the Penguin Ecosystem and sent to the Penguin Nest (xPEFI
            holders). When your PEFI is staked into the Penguin Nest, you receive xPEFI, granting access to exclusive
            dApps within Penguin Finance. Your xPEFI is continously compounding, when you unstake you will receive all
            the orginally deposited PEFI and any earned PEFI minus the paper hands penalty (PPL).
          </NestDescription>
          <NestCardsWrapper justifyContent="space-between">
            <LeftCardsContainer>
              <APYCard padding="8px 24px 16px" mb="16px">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="20px" color="white" fontWeight={500}>
                    Staking APY
                  </Text>
                  <Text fontSize="36px" bold color="white">
                    {getNumberWithCommas(displayedNestApy)}%
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <ViewStatsButton scale="sm" onClick={handleLearnMore}>
                    Learn More
                  </ViewStatsButton>
                  <APYLabel>{`${handsOnPenalty.toFixed(2)}% Paper Hands Penalty`}</APYLabel>
                </Flex>
              </APYCard>
              <Route exact path={`${path}`}>
                <>
                  {orderBy(openPools, ['sortOrder']).map((pool) => (
                    <NestCard isNestPage key={pool.sousId} pool={pool} isMainPool />
                  ))}
                </>
              </Route>
              <Route path={`${path}/history`}>
                {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                  <NestCard isNestPage key={pool.sousId} pool={pool} isMainPool />
                ))}
              </Route>
            </LeftCardsContainer>
            <BalanceCard padding="16px 24px 32px" mb="16px">
              <BalanceLabel>Balance</BalanceLabel>
              <Flex mt="4px" alignItems="center">
                <CardImage src="/images/pools/xPefi.png" alt="xpefi logo" width={64} height={64} />
                <Flex flexDirection="column">
                  <Balance>
                    <CardValue
                      className="balance"
                      fontSize="24px"
                      value={roundDown(getBalanceNumber(stakedBalance), 2)}
                      decimals={2}
                      lineHeight="1"
                    />
                  </Balance>
                  <BalanceText fontSize="20px" fontWeight={300} lineHeight="1.4">
                    xPEFI
                  </BalanceText>
                  <BalanceTextSmall>
                    <CardValue
                      className="balance"
                      fontSize="12px"
                      value={roundDown(xPefiToPefiRatio * getBalanceNumber(stakedBalance), 2)}
                      decimals={2}
                      lineHeight="1.2"
                      prefix="≈ "
                      suffix=" PEFI"
                    />
                  </BalanceTextSmall>
                </Flex>
              </Flex>
              <BalanceLabel mt="24px">Unstaked</BalanceLabel>
              <Flex mt="4px" alignItems="center">
                <CardImage src="/images/penguin-finance-logo.svg" alt="penguin logo" width={64} height={64} />
                <Flex flexDirection="column">
                  <Balance>
                    <CardValue
                      className="balance"
                      fontSize="24px"
                      value={account ? roundDown(getBalanceNumber(pefiBalance), 2) : 0}
                      decimals={2}
                      lineHeight="1"
                    />
                  </Balance>
                  <BalanceText fontSize="20px" fontWeight={300} lineHeight="1.4">
                    PEFI
                  </BalanceText>
                  <BalanceTextSmall>
                    <CardValue
                      className="balance"
                      fontSize="12px"
                      value={account ? roundDown(getBalanceNumber(pefiBalance) / xPefiToPefiRatio, 2) : 0}
                      decimals={2}
                      lineHeight="1.2"
                      prefix="≈ "
                      suffix=" xPEFI"
                    />
                  </BalanceTextSmall>
                </Flex>
              </Flex>
              <BalanceLabel mt="24px" mb="8px">
                Your Stats
              </BalanceLabel>
              <Flex alignItems="flex-end">
                <Balance>
                  <CardValue
                    className="balance"
                    fontSize="24px"
                    value={account && userFirstStakeTime ? (currentDateTime - userFirstStakeTime) / 86400 : 0}
                    decimals={0}
                    lineHeight="1.2"
                  />
                </Balance>
              </Flex>
              <BalanceText mb="8px" fontSize="20px" fontWeight={300}>
                Days Since First Deposit
              </BalanceText>
            </BalanceCard>
          </NestCardsWrapper>
        </NestDetailsContainer>
      </Flex>
    </NestPage>
  )
}

const NestPage = styled(Page)`
  max-width: 1200px;
`

// bg
const BgWrapper = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#1A1028' : '#F9F8F9')};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`
const IgloosBgContainer = styled.div`
  background-image: url('/images/pools/nest_new_bg.png');
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: -8px;
  bottom: -8px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const NestBannerContainer = styled.div`
  /* margin-bottom: 32px; */
  margin-bottom: 24px;

  @media (min-width: 640px) {
    margin-bottom: 64px;
  }
`

const BannerImage = styled.img`
  z-index: -1;
  width: 100%;
`

const StyledCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : theme.colors.secondary)};
  border-radius: 8px;
`

const NestCardsWrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftCardsContainer = styled.div`
  width: 100%;
  margin-right: 16px;
`

const APYCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : theme.colors.secondary)};
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 460px;
  }
`

const BalanceCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : 'white')};
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 260px;
    width: 240px;
    margin-top: 0;
  }
`

const BalanceLabel = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

const Title = styled(Text)`
  color: white;
  font-weight: 800;
  font-size: 64px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 84px;
  }
`

const NestDetailsContainer = styled.div`
  max-width: 720px;
  width: 100%;
`

const NestDescription = styled(Text)`
  max-width: 480px;
  color: ${({ theme }) => (theme.isDark ? '#DDD7ff' : theme.colors.secondary)};
`

const ViewStatsButton = styled(Button)`
  background: white;
  border-radius: 4px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
`

const APYLabel = styled(Text)`
  color: #ddd7ff;
  font-weight: 400;
`

const CardImage = styled.img`
  margin-right: 12px;
  width: 72px;
  height: 72px;
`

const Balance = styled.div`
  .balance {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const BalanceText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  line-height: 1.2;
`

const BalanceTextSmall = styled.div`
  .balance {
    color: ${({ theme }) => (theme.isDark ? '#BBA6DD' : '#8F88A0')};
    font-weight: 400;
  }
`

export default Farm
