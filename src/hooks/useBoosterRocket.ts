import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchBoosterRocketUserDataAsync } from 'state/actions'
import { boosterRocketAgreeTerms, boosterRocketPurchaseTokens } from 'utils/callHelpers'
import { useBoosterRocket as useBoosterRocketContract } from './useContract'

export const useBoosterRocketActions = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const boosterRocketContract = useBoosterRocketContract()

  const handleAgreeTerms = useCallback(async () => {
    const txHash = await boosterRocketAgreeTerms(boosterRocketContract, account)
    dispatch(fetchBoosterRocketUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, boosterRocketContract])

  const handlePurchaseToken = useCallback(
    async (amount) => {
      const txHash = await boosterRocketPurchaseTokens(boosterRocketContract, amount, account)
      dispatch(fetchBoosterRocketUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, boosterRocketContract],
  )

  return { onAgreeTerms: handleAgreeTerms, onPurchaseToken: handlePurchaseToken }
}

export const useBoosterRocketActions1 = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const boosterRocketContract = useBoosterRocketContract()

  const handleAgreeTerms = useCallback(async () => {
    const txHash = await boosterRocketAgreeTerms(boosterRocketContract, account)
    dispatch(fetchBoosterRocketUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, boosterRocketContract])

  const handleAgreeTerms1 = () => {
    console.log('')
  }

  return { onAgreeTerms: handleAgreeTerms1 }
}
