import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Flex, ButtonMenuItem, ButtonMenu, useModal, Text } from 'penguinfinance-uikit2'
import { useLocation } from 'react-router-dom'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useV2FarmUser } from 'state/hooks'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { Farm as FarmTypes } from 'state/types'
import { useV2Stake } from 'hooks/useStake'
import { useV2Unstake } from 'hooks/useUnstake'
import { useV2FarmApprove } from 'hooks/useApprove'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import StakeLPForm from './StakeLPForm';
import UnstakeLPForm from './UnstakeLPForm'

interface FarmWithStakedValue extends FarmTypes {
  apy?: BigNumber
}

const Staked: React.FunctionComponent<FarmWithStakedValue> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteTokenAddresses,
  quoteTokenSymbol,
  tokenAddresses,
  type
}) => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useV2FarmUser(pid, type)
  const lpAddress = getAddress(lpAddresses)
  const lpContract = useERC20(lpAddress)
  const { onApprove } = useV2FarmApprove(lpContract)
  const { onStake } = useV2Stake(pid)
  const { onUnstake } = useV2Unstake(pid)
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(0)

  const handleSwitchTab = (tab) => {
    setActiveTab(tab)
  }

  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const handleStake = async (amount: string) => {
    await onStake(amount)
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
  }

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={handleStake} tokenName={lpSymbol} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  return (
    <Flex flexDirection='column' alignItems='center'>
      <Flex justifyContent="center" pb="8px">
        <TabWrapper>
          <ButtonMenu activeIndex={activeTab} onItemClick={handleSwitchTab} scale="sm">
            <OptionItem active={activeTab === 0}>Stake</OptionItem>
            <OptionItem active={activeTab === 1}>Unstake</OptionItem>
          </ButtonMenu>
        </TabWrapper>
      </Flex>
      <Text fontSize='14px' mb='8px'>Deposit fee: 0% | Withdrawal fee: 0%</Text>
      {activeTab === 0 ? (
        <StakeLPForm
          max={tokenBalance}
          onConfirm={onStake}
          tokenName={lpSymbol}
          account={account}
          needsApproval={!isApproved}
          requested={requestedApproval}
          onApprove={handleApprove}
          stakingTokenName={lpSymbol}
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
          stakingTokenName={lpSymbol}
        />
      )}
    </Flex>
  )
}

// slider
const TabWrapper = styled.div`
  div {
    height: 28px;
    border: 2px solid ${({ theme }) => (theme.isDark ? '#221b38' : '#b2b2ce')};
    background-color: ${({ theme }) => (theme.isDark ? '#332654' : '#e8e4ef')};
    border-radius: 18px;
  }
`
const OptionItem = styled(ButtonMenuItem)<{ active: boolean }>`
  min-width: 40px;
  background-color: ${({ active, theme }) => active && theme.colors.red};
  color: ${({ active }) => (active ? 'white' : '#b2b2ce')};
  margin: 0px !important;
  height: 24px;
  font-weight: 400;
  font-size: 14px;
`

export default Staked
