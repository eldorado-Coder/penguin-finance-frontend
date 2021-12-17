import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useKittyLaunchPad } from 'hooks/useContract'
import { fetchLaunchpadKittyUserDataAsync } from 'state/actions'
import { kittyLaunchpadRegister } from 'utils/callHelpers'

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

export const useKittyLaunchpadRegister1 = () => {
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
