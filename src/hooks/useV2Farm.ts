import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchV2FarmUserDataAsync } from 'state/actions'
import { v2FarmUnstake, v2FarmHarvest, v2FarmSetAutoNestAllocation } from 'utils/callHelpers'
import { useV2MasterChef } from './useContract'

export const useV2Unstake = (pid: number, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const v2MasterChefContract = useV2MasterChef(type)

  const handleUnstake = useCallback(
    async (amount: string, to?: string) => {
      const txHash = await v2FarmUnstake(v2MasterChefContract, pid, amount, to, account)
      dispatch(fetchV2FarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, v2MasterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useV2Harvest = (pid: number, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const v2MasterChefContract = useV2MasterChef(type)

  const handleHarvest = useCallback(
    async (to?: string) => {
      if (!account) return
      const txHash = await v2FarmHarvest(v2MasterChefContract, pid, to, account)
      dispatch(fetchV2FarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, v2MasterChefContract, pid],
  )

  return { onHarvest: handleHarvest }
}

export const useV2FarmSetAutoNestAllocation = (type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const v2MasterChefContract = useV2MasterChef(type)

  const handleSetAutoNestAllocation = useCallback(
    async (amount: string) => {
      if (!account) return
      const txHash = await v2FarmSetAutoNestAllocation(v2MasterChefContract, amount, account)
      dispatch(fetchV2FarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, v2MasterChefContract],
  )

  return { onSetAutoNestAllocation: handleSetAutoNestAllocation }
}
