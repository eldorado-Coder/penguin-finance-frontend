import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchLaunchpadUserDataAsync } from 'state/actions'
import { boosterRocketAgreeTerms } from 'utils/callHelpers'
import { useBoosterRocket as useBoosterRocketContract } from './useContract'

export const useBoosterRocketActions = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const boosterRocketContract = useBoosterRocketContract()

  const handleAgreeTerms = useCallback(async () => {
    const txHash = await boosterRocketAgreeTerms(boosterRocketContract, account)
    dispatch(fetchLaunchpadUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, boosterRocketContract])

  return { onAgreeTerms: handleAgreeTerms }
}

export const useBoosterRocketActions1 = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const boosterRocketContract = useBoosterRocketContract()

  const handleAgreeTerms = useCallback(async () => {
    const txHash = await boosterRocketAgreeTerms(boosterRocketContract, account)
    dispatch(fetchLaunchpadUserDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, boosterRocketContract])

  const handleAgreeTerms1 = () => {
    console.log('')
  }

  return { onAgreeTerms: handleAgreeTerms1 }
}
