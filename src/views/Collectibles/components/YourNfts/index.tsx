import React, { useMemo } from 'react'
import orderBy from 'lodash/orderBy'
import { Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import nfts from 'config/constants/nfts'
import { useWeb3React } from '@web3-react/core'
import { useUserCollectibles } from 'state/hooks'
import NftCard from '../NftCard'
import NftGrid from '../NftGrid'

const CardGrid = styled(NftGrid)`
  padding: 24px;

  @media (min-width: 768px) {
    padding: 0 40px 24px;
  }
`

const NftList = () => {
  const { account } = useWeb3React()
  const userCollectibles = useUserCollectibles(account);
  
  const nftCollections = useMemo(() => {
    const collections = [];
    const userNfts = nfts.filter(nft => userCollectibles.nftIds.find(nftId => nftId === nft.bunnyId));
    // eslint-disable-next-line no-restricted-syntax
    for (const nft of userNfts) {
      const collectionIndex = collections.findIndex(collection => collection.name === nft.collection);

      if (collectionIndex > -1) {
        collections[collectionIndex].nftList.push(nft);
      } else {
        collections.push({
          name: nft.collection,
          nftList: [nft]
        });
      }
    }

    return collections;
  }, [userCollectibles]);

  return (
    <>
      {account && nftCollections.length > 0 &&
        <>
          <CardGrid>
            <Text bold fontSize='24px' color='primary'>Your Collectible NFTs</Text>
          </CardGrid>
          {nftCollections.map(nftCollection => {
            return (nftCollection.nftList.length > 0 ?
              <CardGrid key={`your-nft-${nftCollection.name}`}>
                {orderBy(nftCollection.nftList, 'sortOrder').map((nft) => {
                  return (
                    <div key={`your-nft-${nft.name}`}>
                      <NftCard nft={nft} />
                    </div>
                  )
                })}
              </CardGrid>
              : <div key={nftCollection.collectionName} />
            )
          })}
        </>
      }
    </>
  )
}

export default NftList
