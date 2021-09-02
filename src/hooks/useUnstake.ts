import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  fetchPoolsPublicDataAsync,
  fetchLaunchpadUserDataAsync,
  // v2
  updateV2PoolUserStakedBalance,
  updateV2PoolUserBalance,
  fetchV2PoolsPublicDataAsync,
  fetchV2FarmUserDataAsync,
} from 'state/actions'
import {
  unstake,
  sousUnstake,
  sousEmegencyUnstake,
  launchpadUnstake,
  // v2
  v2FarmUnstake,
} from 'utils/callHelpers'
import {
  useLaunchPad,
  useMasterchef,
  useSousChef,
  // v2
  useV2SousChef,
  useV2MasterChef,
} from './useContract'

const useUnstake = (pid: number, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef(type)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const isOldSyrup = false
  const gasPrice = 300000

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account, gasPrice)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account, gasPrice)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(fetchPoolsPublicDataAsync())
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export const useLaunchpadUnstake = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const launchpadContract = useLaunchPad()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await launchpadUnstake(launchpadContract, amount, account)
      dispatch(fetchLaunchpadUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, launchpadContract],
  )

  return { onUnstake: handleUnstake }
}

// v2
export const useV2SousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useV2SousChef(sousId)
  const isOldSyrup = false
  const gasPrice = 300000

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account, gasPrice)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account, gasPrice)
        console.info(txHash)
      }
      dispatch(updateV2PoolUserStakedBalance(sousId, account))
      dispatch(updateV2PoolUserBalance(sousId, account))
      dispatch(fetchV2PoolsPublicDataAsync())
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

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

export default useUnstake
