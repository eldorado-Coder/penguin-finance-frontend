import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useKittyLaunchPad, useKittyBoosterRocket } from 'hooks/useContract'
import { fetchLaunchpadKittyUserDataAsync, fetchKittyBoosterRocketUserDataAsync } from 'state/actions'
import { kittyLaunchpadRegister, kittyBoosterRocketPurchaseTokens } from 'utils/callHelpers'

export const useKittyLaunchpadRegister = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const kittyLaunchpadContract = useKittyLaunchPad()

  const handleRegister = useCallback(async () => {
    const txHash = await kittyLaunchpadRegister(kittyLaunchpadContract, account)
    dispatch(fetchLaunchpadKittyUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, kittyLaunchpadContract])

  return { onRegister: handleRegister }
}

export const useKittyLaunchpadBoosterRocket = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const kittyBoosterRocketContract = useKittyBoosterRocket()

  const handlePurchase = useCallback(
    async (amount) => {
      const txHash = await kittyBoosterRocketPurchaseTokens(kittyBoosterRocketContract, amount, account)
      dispatch(fetchKittyBoosterRocketUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, kittyBoosterRocketContract],
  )

  return { onPurchase: handlePurchase }
}
