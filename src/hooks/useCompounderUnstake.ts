import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchCompounderFarmUserDataAsync } from 'state/actions'
import { compounderUnstake } from 'utils/callHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { useStrategyContract } from './useContract'

const useUnstake = (lpSymbol: string, type?: string) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const strategyContract = useStrategyContract(lpSymbol, type)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const realAmount = await strategyContract.methods
        .getSharesForDepositTokens(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
        .call()

      const txHash = await compounderUnstake(strategyContract, getBalanceNumber(realAmount), account)
      dispatch(fetchCompounderFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, strategyContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
