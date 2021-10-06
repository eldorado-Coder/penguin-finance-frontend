import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  fetchPoolsPublicDataAsync,
  fetchLaunchpadUserDataAsync,
  fetchLaunchpadBoofiUserDataAsync,
  // v2
  updateV2PoolUserStakedBalance,
  updateV2PoolUserBalance,
  fetchV2PoolsPublicDataAsync,
  fetchV2FarmsPublicDataAsync,
  fetchV2FarmUserDataAsync,
} from 'state/actions'
import {
  stake,
  sousStake,
  sousStakeBnb,
  launchpadStake,
  // v2
  v2FarmStake,
  clubPenguinStake,
} from 'utils/callHelpers'
import {
  useLaunchPad,
  useBoofiLaunchPad,
  useMasterchef,
  useSousChef,
  useV2SousChef,
  useV2MasterChef,
  useClubPenguinMasterChef, // club penguin
} from './useContract'

const useStake = (pid: number, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef(type)

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(fetchPoolsPublicDataAsync())
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export const useLaunchpadStake = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const launchpadContract = useLaunchPad()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await launchpadStake(launchpadContract, amount, account)
      dispatch(fetchLaunchpadUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, launchpadContract],
  )

  return { onStake: handleStake }
}

export const useBoofiLaunchpadStake = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const launchpadContract = useBoofiLaunchPad()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await launchpadStake(launchpadContract, amount, account)
      dispatch(fetchLaunchpadBoofiUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, launchpadContract],
  )

  return { onStake: handleStake }
}

// v2
export const useV2SousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  // const sousChefContract = useSousChef(sousId)
  const sousChefContract = useV2SousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateV2PoolUserStakedBalance(sousId, account))
      dispatch(updateV2PoolUserBalance(sousId, account))
      dispatch(fetchV2PoolsPublicDataAsync())
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

// v2 igloos
export const useV2Stake = (pid: number, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const v2MasterChefContract = useV2MasterChef(type)

  const handleStake = useCallback(
    async (amount: string, to?: string) => {
      const txHash = await v2FarmStake(v2MasterChefContract, pid, amount, to, account)
      dispatch(fetchV2FarmsPublicDataAsync())
      dispatch(fetchV2FarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, v2MasterChefContract, pid],
  )

  return { onStake: handleStake }
}

// club penguin
export const useClubPenguinStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await clubPenguinStake(clubPenguinMasterChefContract, pid, amount, account)
      // TODO: should be changed
      dispatch(fetchLaunchpadBoofiUserDataAsync(account))
      console.info(txHash)
    },
    [account, pid, dispatch, clubPenguinMasterChefContract],
  )

  return { onStake: handleStake }
}

export default useStake
