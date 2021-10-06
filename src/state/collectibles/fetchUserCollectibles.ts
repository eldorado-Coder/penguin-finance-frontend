import collectibleABI from 'config/abi/collectible.json'
import nftDistributorABI from 'config/abi/nftDistributor.json'
import multicall from 'utils/multicall'
import nfts from 'config/constants/nfts'
import nftDistributors from 'config/constants/nftDistributors'
import { getAddress } from 'utils/addressHelpers'

export const fetchUserCollectibles = async (account) => {
  const calls = nfts.map((nft) => ({
    address: nft.address,
    name: 'tokensOfOwner',
    params: [account],
  }))

  const useNftTokens = await multicall(collectibleABI, calls)

  const userNftCollections = []
  for (let index = 0; index < nfts.length; index++) {
    if (useNftTokens[index][0].length > 0) {
      userNftCollections.push(nfts[index].address)
    }
  }
  return userNftCollections
}

export const fetchUserNftClaimStatus = async (account) => {
  const calls = nftDistributors.map((nftDistributor) => ({
    address: getAddress(nftDistributor.address),
    name: 'canClaim',
    params: [account],
  }))

  const _claimStatus = await multicall(nftDistributorABI, calls)

  return nftDistributors.map((row, index) => {
    return { ...row, canClaim: _claimStatus[index][0] }
  })
}

export default fetchUserCollectibles
