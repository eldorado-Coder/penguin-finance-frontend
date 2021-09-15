import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useERC20 } from 'hooks/useContract'
import { useV2SousApprove } from 'hooks/useApprove'
import { useV2SousStake } from 'hooks/useStake'
import { useV2SousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import Card from './Card'
import CardFooter from './CardFooter'
import StakeForm from './forms/StakeForm'
import UnstakeForm from './forms/UnstakeForm'

const StyledCard = styled(Card)<{ isNestPage?: boolean }>`
  border-radius: 8px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 460px;
  }
`

const XPefiRatioTag = styled(Tag)`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => (theme.isDark ? '#baa7f1' : '#ece6ff')};
  color: ${({ theme }) => (theme.isDark ? 'white' : theme.colors.secondary)};
  padding: 2px 12px;
`

const CardContent = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px 32px 0 0;
`

const CardAction = styled.div`
  background: ${(props) => props.theme.card.background};
  border-radius: 0 0 32px 32px;
`

interface PoolWithApy extends Pool {
  apy?: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const NestCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingTokenName,
    stakingTokenAddress,
    penguinNestsGuideLink,
    tokenDecimals,
    poolCategory,
    totalStaked,
    totalSupply,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  // Pools using native AVAX behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWeb3React()
  const block = useBlock()
  const { onApprove } = useV2SousApprove(stakingTokenContract, sousId)
  const { onStake } = useV2SousStake(sousId, isBnbPool)
  const { onUnstake } = useV2SousUnstake(sousId)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  const getIPefiToPefiRatio = () => {
    return pool.totalStaked && pool.totalSupply
      ? new BigNumber(pool.totalStaked).div(new BigNumber(pool.totalSupply)).toNumber()
      : 1
  }

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const iPefiToPefiRatio = getIPefiToPefiRatio()

  return (
    <StyledCard isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        <TabWrapper>
          <ButtonMenu variant="subtle" activeIndex={activeTab} onItemClick={handleSwitchTab}>
            <OptionItem active={activeTab === 0}>Stake PEFI</OptionItem>
            <OptionItem active={activeTab === 1}>Unstake</OptionItem>
          </ButtonMenu>
        </TabWrapper>
        <Flex mt="12px" mb="8px" justifyContent="space-between" alignItems="center">
          <StakeLabel color="primary" fontWeight="500">
            {activeTab === 0 ? 'Stake PEFI' : 'Unstake iPEFI'}
          </StakeLabel>
          <XPefiRatioTag>1 iPEFI = {Number(iPefiToPefiRatio.toFixed(3))} PEFI</XPefiRatioTag>
        </Flex>
        {activeTab === 0 ? (
          <StakeForm
            max={
              stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance
            }
            onConfirm={onStake}
            tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
            account={account}
            needsApproval={needsApproval}
            requested={isFinished || requestedApproval}
            onApprove={handleApprove}
            stakingTokenName={stakingTokenName}
          />
        ) : (
          <UnstakeForm
            max={stakedBalance}
            onConfirm={onUnstake}
            tokenName={`i${stakingTokenName}`}
            account={account}
            requested={isFinished || requestedApproval}
            onApprove={handleApprove}
            stakingTokenName={stakingTokenName}
          />
        )}
      </CardContent>
      <CardAction>
        <CardFooter
          penguinNestsGuideLink={penguinNestsGuideLink}
          totalPefiStaked={totalStaked}
          totalXPefiBalance={totalSupply}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          poolCategory={poolCategory}
        />
      </CardAction>
    </StyledCard>
  )
}

const TabWrapper = styled.div`
  width: 100%;
  div {
    width: 100%;
    background-color: ${({ theme }) => (theme.isDark ? '#604e84' : '#ece8f2')};
    border-radius: 8px;

    button {
      width: 50%;
      border-radius: 6px;
    }
  }
`

const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 100px;
  font-weight: 500;

  background-color: ${({ active, theme }) => active && (theme.isDark ? 'white' : '#ec3e3f')};
  color: ${({ active }) => (active ? 'white' : '#A79FBC')};
  color: ${({ active, theme }) => theme.isDark && !active && '#BBA6DD'};
  color: ${({ theme, active }) => theme.isDark && active && theme.colors.secondary};
`

const StakeLabel = styled(Text)`
  font-size: 18px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`

export default NestCard
