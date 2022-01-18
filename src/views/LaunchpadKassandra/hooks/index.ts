import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useKassandraLaunchPad, useKassandraBoosterRocket } from 'hooks/useContract'
import { fetchLaunchpadKassandraUserDataAsync, fetchKassandraBoosterRocketUserDataAsync } from 'state/actions'
import { kassandraLaunchpadRegister, kassandraBoosterRocketPurchaseTokens } from 'utils/callHelpers'

export const useKassandraLaunchpadRegister = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const kassandraLaunchpadContract = useKassandraLaunchPad()

  const handleRegister = useCallback(async () => {
    const txHash = await kassandraLaunchpadRegister(kassandraLaunchpadContract, account)
    dispatch(fetchLaunchpadKassandraUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, kassandraLaunchpadContract])

  return { onRegister: handleRegister }
}

export const useKassandraLaunchpadBoosterRocket = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const kassandraBoosterRocketContract = useKassandraBoosterRocket()

  const handlePurchase = useCallback(
    async (amount) => {
      const txHash = await kassandraBoosterRocketPurchaseTokens(kassandraBoosterRocketContract, amount, account)
      dispatch(fetchKassandraBoosterRocketUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, kassandraBoosterRocketContract],
  )

  return { onPurchase: handlePurchase }
}
