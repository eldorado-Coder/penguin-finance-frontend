import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenuItem, ButtonMenu } from 'penguinfinance-uikit2'
import { useWeb3React } from '@web3-react/core'
import { useV2FarmUser } from 'state/hooks'
import { useERC20 } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { Farm as FarmTypes } from 'state/types'
import { useV2Stake } from 'hooks/useStake'
import { useV2Unstake } from 'hooks/useUnstake'
import { useV2FarmApprove } from 'hooks/useApprove'
import UnstakeLPForm from './UnstakeLPForm'
import StakeLPForm from './StakeLPForm'

const Staked: React.FunctionComponent<FarmTypes> = (farm) => {
  const { pid, lpSymbol, lpAddresses, type } = farm
  const [activeTab, setActiveTab] = useState(0)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWeb3React()
  const { allowance, tokenBalance, stakedBalance } = useV2FarmUser(pid, type)

  const lpAddress = getAddress(lpAddresses)
  const lpContract = useERC20(lpAddress)
  const { onApprove } = useV2FarmApprove(lpContract)
  const { onStake } = useV2Stake(pid)
  const { onUnstake } = useV2Unstake(pid)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex justifyContent="center" pb="8px">
        <TabWrapper>
          <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
            <OptionItem active={activeTab === 0}>Stake</OptionItem>
            <OptionItem active={activeTab === 1}>Unstake</OptionItem>
          </ButtonMenu>
        </TabWrapper>
      </Flex>
      {activeTab === 0 ? (
        <StakeLPForm
          max={tokenBalance}
          onConfirm={onStake}
          tokenName={lpSymbol}
          account={account}
          needsApproval={!isApproved}
          requested={requestedApproval}
          onApprove={handleApprove}
          farm={farm}
          stakingTokenName={lpSymbol.replaceAll(' LP', '')}
        />
      ) : (
        <UnstakeLPForm
          max={stakedBalance}
          onConfirm={onUnstake}
          tokenName={lpSymbol}
          account={account}
          needsApproval={isApproved}
          requested={requestedApproval}
          onApprove={handleApprove}
          stakingTokenName={lpSymbol.replaceAll(' LP', '')}
        />
      )}
    </Flex>
  )
}

// slider
const TabWrapper = styled.div`
  div {
    height: 32px;
    border: 2px solid ${({ theme }) => (theme.isDark ? '#bba6dd' : '#b2b2ce')};
    border: ${({ theme }) => theme.isDark && 'none'};
    background-color: ${({ theme }) => (theme.isDark ? '#604e84' : '#e8e4ef')};
    color: ${({ theme }) => (theme.isDark ? '#bba6dd' : '#b2b2ce')};
    border-radius: 18px;
  }
`
const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 40px;
  background-color: ${({ active, theme }) => active && theme.colors.red};
  color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
  margin: 0px !important;
  height: ${({ theme }) => (theme.isDark ? '32px' : '28px')};
  font-weight: 400;
  font-size: 14px;
`

export default Staked
