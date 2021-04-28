import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchEmperor } from 'state/actions'
import { registerEmperor, stealCrown, approveXPefi } from 'utils/callHelpers'
import { getEmperorAddress } from 'utils/addressHelpers'
import { useEmperor, useXPefi } from './useContract'

const useRegister = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const emperorContract = useEmperor()

  const handleRegister = useCallback(
    async (nickName: string, color: string, style: string,) => {
      const txHash = await registerEmperor(emperorContract, { nickName, color, style }, account)
      dispatch(fetchEmperor(account))
      console.info(txHash)
    },
    [account, dispatch, emperorContract]
  )

  return { onRegister: handleRegister }
}

const useStealCrown = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const emperorContract = useEmperor()

  const handleStealCrown = useCallback(
    async (amount: string) => {

      const txHash = await stealCrown(emperorContract, amount, account)
      dispatch(fetchEmperor(account))
      console.info(txHash)
    },
    [account, dispatch, emperorContract],
  )

  return { onSteal: handleStealCrown }
}

const useXPefiApprove = () => {
  const { account } = useWallet()
  const xPefiContract = useXPefi()

  const handleXPefiApprove = useCallback(
    async () => {
      const txHash = await approveXPefi(xPefiContract, account, getEmperorAddress())
      console.info(txHash)
    },
    [account, xPefiContract],
  )

  return { onApproveXPefi: handleXPefiApprove }
}

export { useRegister, useStealCrown, useXPefiApprove }
