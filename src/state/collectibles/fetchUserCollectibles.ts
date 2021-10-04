import collectibleABI from 'config/abi/collectible.json'
import multicall from 'utils/multicall'
import nfts from 'config/constants/nfts'

export const fetchUserCollectibles = async account => {
  const calls = nfts.map(nft => ({
    address: nft.address,
    name: 'tokensOfOwner',
    params: [account]
  }));

  const nftIds = await multicall(collectibleABI, calls);
  const yourNftIds = [];
  for (let index=0; index < nfts.length; index++) {
    if (nftIds[index][0].length > 0) {
      yourNftIds.push(nfts[index].bunnyId);
    }
  }
  return yourNftIds;
};

export default fetchUserCollectibles;