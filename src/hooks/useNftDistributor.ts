import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchUserCollectiblesDataAsync } from 'state/actions'
import { nftDistributorClaim } from 'utils/callHelpers'
import { useNftDistributor as useNftDistributorContract } from './useContract'

export const useNftDistributor = (type) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const nftDistributorContract = useNftDistributorContract(type)

  const handleClaim = useCallback(async () => {
    const txHash = await nftDistributorClaim(nftDistributorContract, account)
    dispatch(fetchUserCollectiblesDataAsync(account))
    console.info(txHash)
  }, [account, dispatch, nftDistributorContract])

  return { onClaim: handleClaim }
}

export default useNftDistributor
