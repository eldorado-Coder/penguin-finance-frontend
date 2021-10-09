import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useClubPenguinMasterChef } from 'hooks/useContract'
import { fetchClubPenguinFarmUserDataAsync } from 'state/actions'
import { clubPenguinStake, clubPenguinUnstake, clubPenguinHarvest } from 'utils/callHelpers'

export const useClubPenguinStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await clubPenguinStake(clubPenguinMasterChefContract, pid, amount, account)
      dispatch(fetchClubPenguinFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, pid, dispatch, clubPenguinMasterChefContract],
  )

  return { onStake: handleStake }
}

export const useClubPenguinUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await clubPenguinUnstake(clubPenguinMasterChefContract, pid, amount, account)
      dispatch(fetchClubPenguinFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, pid, dispatch, clubPenguinMasterChefContract],
  )

  return { onUnstake: handleUnstake }
}

export const useClubPenguinHarvest = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const clubPenguinMasterChefContract = useClubPenguinMasterChef()

  const handleHarvest = useCallback(async () => {
    const txHash = await clubPenguinHarvest(clubPenguinMasterChefContract, pid, account)
    dispatch(fetchClubPenguinFarmUserDataAsync(account))
    console.info(txHash)
  }, [account, pid, dispatch, clubPenguinMasterChefContract])

  return { onHarvest: handleHarvest }
}
