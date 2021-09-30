import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchBoosterRocketUserDataAsync, fetchBoofiBoosterRocketUserDataAsync } from 'state/actions'
import {
  // launchpad - sherpa
  boosterRocketAgreeTerms,
  boosterRocketPurchaseTokens,
  // launchpad - boofi
  boofiBoosterRocketAgreeTerms,
  boofiBoosterRocketPurchaseTokens,
} from 'utils/callHelpers'
import {
  useBoosterRocket as useBoosterRocketContract,
  useBoofiBoosterRocket as useBoofiBoosterRocketContract,
} from './useContract'

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

export const useBoofiBoosterRocketActions = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const boofiBoosterRocketContract = useBoofiBoosterRocketContract()

  const handleAgreeTerms = useCallback(async () => {
    const txHash = await boofiBoosterRocketAgreeTerms(boofiBoosterRocketContract, account)
    dispatch(fetchBoofiBoosterRocketUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, boofiBoosterRocketContract])

  const handlePurchaseToken = useCallback(
    async (amount) => {
      const txHash = await boofiBoosterRocketPurchaseTokens(boofiBoosterRocketContract, amount, account)
      dispatch(fetchBoofiBoosterRocketUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, boofiBoosterRocketContract],
  )

  return { onAgreeTerms: handleAgreeTerms, onPurchaseToken: handlePurchaseToken }
}
