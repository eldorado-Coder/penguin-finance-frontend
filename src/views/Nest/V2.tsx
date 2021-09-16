import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, Flex, Text, Button, useMatchBreakpoints } from 'penguinfinance-uikit2'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { getBalanceNumber, getNumberWithCommas } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { useV2Pools, usePricePefiUsdt } from 'state/hooks'
import { getPefiAddress } from 'utils/addressHelpers'
import roundDown from 'utils/roundDown'
import CardValue from 'components/CardValue'
import SvgIcon from 'components/SvgIcon'
import LineChart from 'components/LineChart'
import CHART_DATA from 'views/Info/data'
import NestCard from './components/NestCard'

const NestV2: React.FC = () => {
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()

  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const pools = useV2Pools(account)
  const pefiPrice = usePricePefiUsdt()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const [finishedPools, openPools] = partition(pools, (pool) => pool.isFinished)

  const nestPool = openPools[0]
  const { userData } = nestPool
  const stakedBalance = new BigNumber(nestPool.userData?.stakedBalance || 0)
  const pefiBalance = useTokenBalance(getPefiAddress())
  const displayedNestApy = (nestPool.apy.toNumber() * 100).toFixed(2)
  const iPefiToPefiRatio = nestPool.currentExchangeRate || 1
  const currentExchangeRate = nestPool.currentExchangeRate || 1
  const rateOfYesterday = nestPool.rateOfYesterday || 1
  const paperHandsPenalty = nestPool.paperHandsPenalty || 6
  const distributionPhp = nestPool.distributionPhp || 6
  const avgDailyAprPerWeek = nestPool.avgDailyAprPerWeek || 0
  const avgYearlyApr = avgDailyAprPerWeek * 365 * 100
  const tvl = nestPool.totalSupply
    ? iPefiToPefiRatio * pefiPrice.toNumber() * getBalanceNumber(nestPool.totalSupply)
    : 0
  const totalProfitAmount = account ? roundDown(getBalanceNumber(new BigNumber(userData?.profitAmount || 0)), 2) : 0
  const totalDepositAmount = account ? roundDown(getBalanceNumber(new BigNumber(userData?.depositAmount || 0)), 2) : 0
  const totalWithdrawAmount = account ? roundDown(getBalanceNumber(new BigNumber(userData?.withdrawAmount || 0)), 2) : 0

  const handleLearnMore = () => {
    window.open('https://docs.penguinfinance.io/summary/penguin-nests-staking-and-fee-collection', '_blank')
  }

  return (
    <Flex justifyContent="center">
      <NestDetailsContainer>
        <NestCardsWrapper justifyContent="space-between">
          <LeftCardsContainer>
            <APYCard padding="16px 24px 16px" mb="16px">
              <Flex justifyContent="space-between">
                <Text fontSize="20px" color="white" fontWeight={500}>
                  {`Yesterday's APY `}
                </Text>
                <Text fontSize="36px" bold color="white" lineHeight={1}>
                  {getNumberWithCommas(displayedNestApy)}%
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <ViewStatsButton scale="sm" onClick={handleLearnMore}>
                  Learn More
                </ViewStatsButton>
                <APYLabel>{`${Number(paperHandsPenalty).toFixed(2)}% Paper Hands Penalty`}</APYLabel>
              </Flex>
            </APYCard>
            <Route exact path={`${path}`}>
              <>
                {orderBy(openPools, ['sortOrder']).map((pool) => (
                  <NestCard key={pool.sousId} pool={pool} isMainPool />
                ))}
              </>
            </Route>
            <Route path={`${path}/history`}>
              {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                <NestCard key={pool.sousId} pool={pool} isMainPool />
              ))}
            </Route>
          </LeftCardsContainer>
          <div>
            <RatioCard padding="16px 24px 16px" mb="16px">
              <Flex justifyContent="space-between">
                <Flex flexWrap="wrap">
                  <Flex flexDirection="column" mr="40px">
                    <Text fontSize="20px" color="white" fontWeight={500}>
                      Current Ratio
                    </Text>
                    <Flex alignItems="flex-end" mt="1px">
                      <Text fontSize="36px" bold color="white" lineHeight={1}>
                        {currentExchangeRate.toFixed(4)}
                      </Text>
                      <Text ml="8px" mb="4px" fontSize="14px" color="white" lineHeight={1}>
                        iPEFI/PEFI
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex flexDirection="column">
                    <Label fontSize="20px" color="white" fontWeight={500}>
                      {`Yesterday's Ratio `}
                    </Label>
                    <Flex alignItems="flex-end" mt="1px">
                      <Text fontSize="36px" bold color="white" lineHeight={1}>
                        {rateOfYesterday.toFixed(4)}
                      </Text>
                      <Text ml="8px" mb="4px" fontSize="14px" color="white" lineHeight={1}>
                        iPEFI/PEFI
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <InfoIconWrapper>
                  <SvgIcon src={`${process.env.PUBLIC_URL}/images/home/info.svg`} width="25px" height="25px" />
                </InfoIconWrapper>
              </Flex>
            </RatioCard>
            <StyledCard mb="16px">
              <LineChart
                data={CHART_DATA}
                height={240}
                minHeight={240}
                value={liquidityHover}
                label={leftLabel}
                setValue={setLiquidityHover}
                setLabel={setLeftLabel}
              />
            </StyledCard>
            <BalanceCard mb="16px">
              <BalanceContainer padding="8px 24px 16px">
                <Flex width="100%" flexDirection={isMobile ? 'row' : 'column'} justifyContent="space-between">
                  <div>
                    <BalanceLabel>Balance</BalanceLabel>
                    <Flex mt="4px" alignItems="center">
                      <CardImage
                        isMobile={isMobile}
                        src="/images/pools/iPefi.svg"
                        alt="ipefi logo"
                        width={64}
                        height={64}
                      />
                      <Flex flexDirection="column">
                        <Balance>
                          <CardValue
                            className="balance"
                            fontSize={isMobile ? '22px' : '24px'}
                            value={roundDown(getBalanceNumber(stakedBalance), 2)}
                            decimals={2}
                            lineHeight="1"
                          />
                        </Balance>
                        <BalanceText fontSize={isMobile ? '18px' : '20px'} fontWeight={300} lineHeight="1.4">
                          iPEFI
                        </BalanceText>
                        <BalanceTextSmall>
                          <CardValue
                            className="balance"
                            fontSize="12px"
                            value={roundDown(iPefiToPefiRatio * getBalanceNumber(stakedBalance), 2)}
                            decimals={2}
                            lineHeight="1.2"
                            prefix="≈ "
                            suffix=" PEFI"
                          />
                        </BalanceTextSmall>
                      </Flex>
                    </Flex>
                  </div>
                  <div>
                    <BalanceLabel mt={!isMobile && '24px'}>Unstaked</BalanceLabel>
                    <Flex mt="4px" alignItems="center">
                      <CardImage
                        isMobile={isMobile}
                        src="/images/penguin-finance-logo.svg"
                        alt="penguin logo"
                        width={64}
                        height={64}
                      />
                      <Flex flexDirection="column">
                        <Balance>
                          <CardValue
                            className="balance"
                            fontSize={isMobile ? '22px' : '24px'}
                            value={account ? roundDown(getBalanceNumber(pefiBalance), 2) : 0}
                            decimals={2}
                            lineHeight="1"
                          />
                        </Balance>
                        <BalanceText fontSize={isMobile ? '18px' : '20px'} fontWeight={300} lineHeight="1.4">
                          PEFI
                        </BalanceText>
                        <BalanceTextSmall>
                          <CardValue
                            className="balance"
                            fontSize="12px"
                            value={account ? roundDown(getBalanceNumber(pefiBalance) / iPefiToPefiRatio, 2) : 0}
                            decimals={2}
                            lineHeight="1.2"
                            prefix="≈ "
                            suffix=" iPEFI"
                          />
                        </BalanceTextSmall>
                      </Flex>
                    </Flex>
                  </div>
                </Flex>
              </BalanceContainer>
              <WealthContainer>
                <WealthCard flexDirection="column" padding="4px 16px 16px">
                  <BalanceLabel>Your Wealth</BalanceLabel>
                  <Flex alignItems="flex-end">
                    <BalanceText fontSize="14px" mr="4px">
                      You have generated
                    </BalanceText>
                    <Balance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '22px' : '24px'}
                        value={totalProfitAmount}
                        decimals={2}
                        lineHeight="1"
                        suffix=" PEFI"
                      />
                    </Balance>
                  </Flex>
                  <BalanceText fontSize="14px">
                    in <span>85 days.</span>
                    {`You've deposited `}
                    <span>{`${totalDepositAmount} PEFI`}</span>
                    {' and withdrawn '}
                    <span>{`${totalWithdrawAmount} PEFI`}</span>
                    {` from the iPEFI Nest.`}
                  </BalanceText>
                </WealthCard>
                <Flex flexDirection="column" padding="4px 16px 16px">
                  <BalanceLabel>iPEFI Stats</BalanceLabel>
                  <Flex alignItems="flex-end">
                    <BalanceText bold fontSize="12px" mr="4px" width={120} textAlign="right">
                      iPEFI TVL
                    </BalanceText>
                    <Balance statsBalance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '18px' : '20px'}
                        value={roundDown(tvl, 0)}
                        decimals={0}
                        lineHeight="1"
                        prefix="$ "
                      />
                    </Balance>
                  </Flex>
                  <Flex alignItems="flex-end" mt="4px">
                    <BalanceText bold fontSize="12px" mr="4px" width={120} textAlign="right">
                      PEFI redistributed by Paper Hands Penalty
                    </BalanceText>
                    <Balance statsBalance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '18px' : '20px'}
                        value={roundDown(distributionPhp, 2)}
                        decimals={2}
                        lineHeight="1"
                        suffix=" PEFI"
                      />
                    </Balance>
                  </Flex>
                  <Flex alignItems="flex-end" mt="4px">
                    <BalanceText bold fontSize="12px" mr="4px" width={120} textAlign="right">
                      7 day avg. APR
                    </BalanceText>
                    <Balance statsBalance>
                      <CardValue
                        className="balance"
                        fontSize={isMobile ? '18px' : '20px'}
                        value={roundDown(avgYearlyApr, 2)}
                        decimals={2}
                        lineHeight="1"
                        suffix="% APR"
                      />
                    </Balance>
                  </Flex>
                </Flex>
              </WealthContainer>
            </BalanceCard>
          </div>
        </NestCardsWrapper>
      </NestDetailsContainer>
    </Flex>
  )
}

const NestCardsWrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
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

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 460px;
  }
`

const RatioCard = styled(Card)`
  background: #d4444c;
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 560px;
    margin-top: 0;
  }
`

const Label = styled(Text)`
  white-space: nowrap;
`

const BalanceCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#30264F' : 'white')};
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  height: max-content;
  padding: 0;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 500px;
    width: 240px;
    flex-direction: row;
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

const NestDetailsContainer = styled.div`
  max-width: 960px;
  width: 100%;
`

const ViewStatsButton = styled(Button)`
  background: white;
  border-radius: 4px;
  font-weight: 400;
  margin-right: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary};
`

const APYLabel = styled(Text)`
  color: #ddd7ff;
  font-weight: 400;
  white-space: nowrap;
`

const CardImage = styled.img<{ isMobile?: boolean }>`
  margin-right: ${({ isMobile }) => (isMobile ? '8px' : '12px')};
  width: ${({ isMobile }) => (isMobile ? '56px' : '72px')};
  height: ${({ isMobile }) => (isMobile ? '56px' : '72px')};
`

const Balance = styled.div<{ statsBalance?: boolean }>`
  border-bottom: ${({ theme, statsBalance }) =>
    statsBalance && (theme.isDark ? '1px solid #100C18' : '1px solid #e8e4ef')};
  width: ${({ statsBalance }) => statsBalance && 'calc(100% - 120px)'};
  text-align: ${({ statsBalance }) => statsBalance && 'center'};

  .balance {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 500;
  }
`

const BalanceText = styled(Text)<{ width?: number }>`
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  line-height: 1.2;
  width: ${({ width }) => width && `${width}px`};

  span {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.red};
  }
`

const BalanceTextSmall = styled.div`
  .balance {
    color: ${({ theme }) => (theme.isDark ? '#BBA6DD' : '#8F88A0')};
    font-weight: 400;
  }
`

const InfoIconWrapper = styled.div`
  svg {
    cursor: pointer;
    path {
      fill: white;
    }
  }
`

const StyledCard = styled(Card)`
  border-radius: 8px;
  width: 100%;
  padding: 1rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 500px;
  }
`

const BalanceContainer = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    border-right: 2px solid ${({ theme }) => (theme.isDark ? '#100C18' : '#e8e4ef')};
  }
`

const WealthCard = styled(Flex)`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => (theme.isDark ? '#100C18' : '#e8e4ef')};
  border-top: 2px solid ${({ theme }) => (theme.isDark ? '#100C18' : '#e8e4ef')};
  ${({ theme }) => theme.mediaQueries.md} {
    border-top: none;
  }
`

const WealthContainer = styled.div`
  with: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(100% - 200px);
  }
`

export default NestV2
