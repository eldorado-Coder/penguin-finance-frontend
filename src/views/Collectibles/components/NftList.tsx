import React, { useMemo } from 'react'
import orderBy from 'lodash/orderBy'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import nfts from 'config/constants/nfts'
import YourNfts from './YourNfts'
import NftCard from './NftCard'

const NftList = () => {
  const nftCollections = useMemo(() => {
    const collections = []

    // eslint-disable-next-line no-restricted-syntax
    for (const nft of nfts) {
      const collectionIndex = collections.findIndex((collection) => collection.name === nft.collection)

      if (collectionIndex > -1) {
        collections[collectionIndex].nftList.push(nft)
      } else {
        collections.push({
          name: nft.collection,
          nftList: [nft],
        })
      }
    }

    return collections
  }, [])

  return (
    <>
      <YourNfts />
      <CardGrid>
        <Text bold fontSize="24px" color="primary">
          All NFTs
        </Text>
      </CardGrid>
      {nftCollections.map((nftCollection) => {
        return (
          <CardGrid key={nftCollection.name}>
            {orderBy(nftCollection.nftList, 'sortOrder').map((nft) => {
              return (
                <div key={`nft-${nft.name}`}>
                  <NftCard nft={nft} />
                </div>
              )
            })}
          </CardGrid>
        )
      })}
    </>
  )
}

const CardGrid = styled.div`
  padding: 24px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    padding: 0 40px 24px;
  }
`

export default NftList
