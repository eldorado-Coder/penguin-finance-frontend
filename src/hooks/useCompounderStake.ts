import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchCompounderFarmUserDataAsync } from 'state/actions'
import { compounderStake } from 'utils/callHelpers'
import { useStrategyContract } from './useContract'

const useStake = (lpSymbol: string, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const strategyContract = useStrategyContract(lpSymbol, type)

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await compounderStake(strategyContract, amount, account)
      dispatch(fetchCompounderFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, strategyContract],
  )

  return { onStake: handleStake }
}

export default useStake
