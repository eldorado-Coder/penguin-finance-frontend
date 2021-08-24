import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Tag, ButtonMenu, ButtonMenuItem } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import Card from './Card'
import CardFooter from './CardFooter'
import StakePefiForm from './StakePefiForm';
import UnstakeXPefiForm from './UnstakeXPefiForm';

const StyledCard = styled(Card)<{ isNestPage?: boolean }>`
  border-radius: 8px;
  width: 100%;
  @media (min-width: 640px) {
    margin-bottom: ${(props) => props.isNestPage && '60px'};
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 460px;
  }
`

const XPefiRatioTag = styled(Tag)`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.isDark ? '#baa7f1' : '#ece6ff'};
  color: ${({ theme }) => theme.isDark ? 'white' : theme.colors.secondary};
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
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
  isMainPool: boolean
  isNestPage?: boolean
  isHomePage?: boolean
}

const NestCard: React.FC<HarvestProps> = ({ pool, isNestPage }) => {
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
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)

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

  const getXPefiToPefiRatio = () => {
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

  const xPefiToPefiRatio = getXPefiToPefiRatio()

  return (
    <StyledCard isNestPage={isNestPage} isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      <CardContent>
        <TabWrapper>
          <ButtonMenu variant="subtle" activeIndex={activeTab} onItemClick={handleSwitchTab}>
            <OptionItem active={activeTab === 0}>Stake PEFI</OptionItem>
            <OptionItem active={activeTab === 1}>Unstake</OptionItem>
          </ButtonMenu>
        </TabWrapper>
        <Flex mt='12px' mb='8px' justifyContent='space-between' alignItems='center'>
          <StakeLabel color='primary' fontWeight='500'>{activeTab === 0 ? 'Stake PEFI' : 'Unstake xPEFI'}</StakeLabel>
          <XPefiRatioTag>1 xPEFI = {Number(xPefiToPefiRatio.toFixed(3))} PEFI</XPefiRatioTag>
        </Flex>
        {activeTab === 0 ? 
          <StakePefiForm
            max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
            onConfirm={onStake}
            tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
            account={account}
            needsApproval={needsApproval}
            requested={isFinished || requestedApproval}
            onApprove={handleApprove}
            stakingTokenName={stakingTokenName}
          />
          :
          <UnstakeXPefiForm
            max={stakedBalance} onConfirm={onUnstake} tokenName={`x${stakingTokenName}`}
            account={account}
            needsApproval={needsApproval}
            requested={isFinished || requestedApproval}
            onApprove={handleApprove}
            stakingTokenName={stakingTokenName}
          />
        }
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
  color: ${({ active }) => active ? 'white' : '#A79FBC'};
  color: ${({ active, theme }) => (theme.isDark && !active) && '#BBA6DD'};
  color: ${({ theme, active }) => theme.isDark && active && theme.colors.secondary};
`

const StakeLabel = styled(Text)`
  font-size: 18px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
  }
`;

export default NestCard
