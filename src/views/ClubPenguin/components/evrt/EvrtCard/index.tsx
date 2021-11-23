import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, useMatchBreakpoints } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useClubPenguinFarms, usePricePefiUsdt, useV2Pools } from 'state/hooks'
import SvgIcon from 'components/SvgIcon'
import CardValue from 'components/CardValue'
import Balance from 'components/Balance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getApr } from 'utils/apyHelpers'
import useTheme from 'hooks/useTheme'
import { SECONDS_PER_DAY } from 'config'
import useTokenPrice from 'hooks/useTokenPrice'
import Card from '../../Card'
import CountDown from '../../CountDown'
import { getCutdownType } from '../../../utils'
import { useClubPenguinHarvest } from '../../../hooks'

const EvrtCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const [timerEnded, setTimerEnded] = useState(false)
  const { isXl } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { onHarvest } = useClubPenguinHarvest(1)
  const pefiPriceUsd = usePricePefiUsdt().toNumber()
  const v2Pools = useV2Pools(account)
  const { isDark } = useTheme()
  const iPefiPool = v2Pools.length > 0 ? v2Pools[0] : null
  const iPefiToPefiRatio = iPefiPool.currentExchangeRate || 1
  const iPefiPriceUsd = iPefiToPefiRatio * pefiPriceUsd

  const clubFarms = useClubPenguinFarms(account)
  const activeFarm = clubFarms[1]
  const { userData, rewardStartTimestamp, rewardEndTimestamp, tokensPerSecond, totalIPEFIInPool } = activeFarm

  const { evrtPrice: evrtPriceUsd } = useTokenPrice()
  const earningBalance = userData ? getBalanceNumber(new BigNumber(userData.earnings)) : 0
  const earningBalanceInUsd = evrtPriceUsd * earningBalance
  const currentTimestamp = Date.now()
  const rewardStartTime = rewardStartTimestamp ? 1000 * rewardStartTimestamp : 0
  const cutdownType = getCutdownType(currentTimestamp, rewardStartTime)
  const cutdownDate = cutdownType === 'start' ? rewardStartTime : rewardEndTimestamp

  // apr
  const totalLiquidityInUsd = iPefiPriceUsd * getBalanceNumber(new BigNumber(totalIPEFIInPool))
  const rewardPerSec = getBalanceNumber(new BigNumber(tokensPerSecond))
  const rewardPerSecInUsd = evrtPriceUsd * rewardPerSec
  const dailyApr = (SECONDS_PER_DAY * rewardPerSecInUsd) / totalLiquidityInUsd
  const apr = cutdownType === 'start' ? 100 * getApr(dailyApr) : 0

  const isMobile = !isXl
  const canHarvest = account && earningBalance > 0 && !pendingTx

  const handleHarvest = async () => {
    setPendingTx(true)
    try {
      await onHarvest()
      setPendingTx(false)
    } catch {
      setPendingTx(false)
    }
  }

  const handleTimerCompleted = async () => {
    setTimerEnded(true)
  }

  const handleViewWebsite = () => {
    window.open('https://www.evrt.app/', '_blank')
  }

  const renderIcebergInfos = () => {
    return (
      <>
        <FlexContainer
          isMobile={isMobile}
          mt="32px"
          justifyContent="space-between"
          flexWrap={!isMobile ? 'wrap' : 'nowrap'}
        >
          <Flex className="col" flexDirection="column" alignItems="flex-start">
            <Label fontSize={isMobile ? '16px' : '20px'} fontWeight={700} lineHeight={1}>
              EVRT EARNED
            </Label>
            <Balance
              color={isDark ? 'white' : '#00283f'}
              fontSize="22px"
              fontWeight="600"
              value={earningBalance}
              decimals={2}
            />
            <BalanceTextSmall>
              <CardValue
                className="balance"
                fontSize="12px"
                value={earningBalanceInUsd}
                decimals={2}
                lineHeight="1.2"
                prefix="≈ $"
              />
            </BalanceTextSmall>
          </Flex>
          <Flex className="col" flexDirection="column" alignItems="flex-start">
            <Label fontSize={isMobile ? '16px' : '20px'} fontWeight={700} lineHeight={1}>
              CURRENT APR
            </Label>
            <Balance
              color={isDark ? 'white' : '#00283f'}
              fontSize="22px"
              fontWeight="600"
              suffix="%"
              value={apr}
              decimals={2}
            />
            <BalanceTextSmall>
              <CardValue
                className="balance"
                fontSize="12px"
                value={apr / 48}
                decimals={2}
                lineHeight="1.2"
                suffix="% per week"
              />
            </BalanceTextSmall>
          </Flex>
        </FlexContainer>
        <FlexContainer
          isMobile={isMobile}
          mt="16px"
          justifyContent="space-between"
          flexWrap={!isMobile ? 'wrap' : 'nowrap'}
        >
          <Flex className="col">
            <HarvestButton
              isMobile={isMobile}
              id="harvest-all"
              endIcon={<img src="/images/farms/harvest-coin.svg" alt="harvest" width={16} />}
              scale="md"
              disabled={!canHarvest}
              onClick={handleHarvest}
            >
              Harvest All
            </HarvestButton>
          </Flex>
          <Flex className="col" flexDirection="column" alignItems="flex-start">
            <Label fontSize={isMobile ? '16px' : '20px'} fontWeight={700} lineHeight={1}>
              {timerEnded || currentTimestamp > cutdownDate ? (
                'ENDED'
              ) : (
                <>{cutdownType === 'start' ? 'STARTS IN' : 'ENDS IN'}</>
              )}
            </Label>
            <CutdownBalance fontSize="22px" fontWeight={400}>
              {cutdownDate > 0 && (
                <div className="countdown">
                  <CountDown date={timerEnded ? currentTimestamp : cutdownDate} handleComplete={handleTimerCompleted} />
                </div>
              )}
            </CutdownBalance>
          </Flex>
        </FlexContainer>
      </>
    )
  }

  return (
    <Wrapper>
      <StyledCard>
        <CardHeader>
          {isMobile ? (
            <div>
              <Flex alignItems="center" flexWrap="wrap" justifyContent="flex-start">
                <LogoWrapper isMobile mr="32px" alignItems="center">
                  <img src="/images/club/evrt_iceberg.svg" alt="evrt" />
                </LogoWrapper>
                <StyledTitle>
                  <Label
                    whiteSpace="wrap"
                    textAlign="center"
                    fontSize={isMobile ? '36px' : '40px'}
                    fontWeight={600}
                    lineHeight={1}
                  >
                    EVRT ICEBERG
                  </Label>
                </StyledTitle>
              </Flex>
              {renderIcebergInfos()}
            </div>
          ) : (
            <Flex alignItems="flex-start" flexWrap="wrap" justifyContent="space-between">
              <LogoWrapper mt="16px" mr="16px" alignItems="center">
                <img src="/images/club/evrt_iceberg.svg" alt="evrt" />
              </LogoWrapper>
              <StyledTitle>
                <Label whiteSpace="wrap" fontSize="40px" fontWeight={600} lineHeight={1}>
                  EVRT ICEBERG
                </Label>
                {renderIcebergInfos()}
              </StyledTitle>
            </Flex>
          )}
        </CardHeader>
        <CardContent>
          <Text fontWeight={400} fontSize="18px" color="white" mt="24px" mb="16px">
            Everest DAO is an innovation-driven project focused on tackling new and exciting products that range from
            DeFi, DAOs, NFTs, and more.
          </Text>
        </CardContent>
        <CardFooter flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
          <StyledButton mb={isMobile && '16px'} visitSite onClick={handleViewWebsite}>
            Visit Website
          </StyledButton>
          <SocialIconsWrapper>
            <a href="https://t.me/EverestDAO" target="_blank" rel="noreferrer">
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/club/social/telegram.svg`} width="32px" height="32px" />
            </a>
            <a href="https://discord.com/invite/jdfcZU4XCF" target="_blank" rel="noreferrer">
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/club/social/discord.svg`} width="32px" height="32px" />
            </a>
            <a href="https://twitter.com/EverestDAO" target="_blank" rel="noreferrer">
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/club/social/twitter.svg`} width="32px" height="32px" />
            </a>
            <a href="https://everestdao.medium.com" target="_blank" rel="noreferrer">
              <SvgIcon src={`${process.env.PUBLIC_URL}/images/club/social/medium.svg`} width="32px" height="32px" />
            </a>
          </SocialIconsWrapper>
        </CardFooter>
      </StyledCard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 49%;
  }
`

const StyledCard = styled(Card)`
  border-radius: 8px;
  padding: 32px 24px 34px;
  box-shadow: 0px 1px 6px rgb(0 0 0 / 16%);
  background-color: ${({ theme }) => (theme.isDark ? '#30264f' : '#5970F6')};
`

const CardHeader = styled.div``

const LogoWrapper = styled(Flex)<{ isMobile?: boolean }>`
  img {
    height: ${({ isMobile }) => (isMobile ? '96px' : '140px')};
  }
`

const CardContent = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

const StyledButton = styled(Button)`
  height: 44px;
  background: ${({ theme }) => (theme.isDark ? '#614e83' : '#00283f')};
  color: white;
  border-radius: 10px;
  font-weight: 700;
  white-space: nowrap;
  font-size: 16px;

  img {
    margin-left: 8px;
  }
`

const HarvestButton = styled(Button)<{ isMobile?: boolean }>`
  height: 44px;
  background: ${({ theme }) => (theme.isDark ? '#d4444c' : '#00283f')};
  color: white;
  border-radius: 10px;
  font-weight: ${({ isMobile }) => (isMobile ? 500 : 700)};
  white-space: nowrap;
  font-size: 16px;

  padding: ${({ isMobile }) => isMobile && '0 16px'};

  img {
    margin-left: 8px;
  }
`

const CardFooter = styled(Flex)``

const SocialIconsWrapper = styled(Flex)`
  justify-content: flex-end;
  a {
    margin: 0px 10px;
  }
  svg {
    fill: white;
    height: 32px;
    width: 32px;
    &:hover {
      opacity: 0.65;
    }
  }
`

const BalanceTextSmall = styled.div`
  .balance {
    color: white;
    font-weight: 400;
  }
`

const FlexContainer = styled(Flex)<{ isMobile?: boolean }>`
  .col {
    width: 48%;
    min-width: ${({ isMobile }) => (isMobile ? '160px' : '140px')};

    &:first-child {
      margin-right: 8px;
      margin-bottom: 0;

      @media (min-width: 1080px) {
        margin-bottom: 16px;
      }

      @media (min-width: 1450px) {
        margin-bottom: 0;
      }
    }
  }
`

const StyledTitle = styled.div`
  width: calc(100% - 170px);
`

const Label = styled(Text)<{ whiteSpace?: string }>`
  white-space: ${({ whiteSpace }) => whiteSpace || 'nowrap'};
  color: ${({ theme }) => (theme.isDark ? '#bba6dd' : 'white')};
`

const CutdownBalance = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#00283f')};
`

export default EvrtCard
