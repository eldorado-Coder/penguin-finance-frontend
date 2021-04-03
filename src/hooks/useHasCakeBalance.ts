import BigNumber from 'bignumber.js'
import { getPefiAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's PEFI balance is at least the amount passed in
 */
const useHasCakeBalance = (minimumBalance: BigNumber) => {
  const cakeBalance = useTokenBalance(getPefiAddress())
  return cakeBalance.gte(minimumBalance)
}

export default useHasCakeBalance
