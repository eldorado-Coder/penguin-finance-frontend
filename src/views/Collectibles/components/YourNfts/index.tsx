import React, { useMemo } from 'react'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { Flex, Text, Heading } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import nfts from 'config/constants/nfts'
import { useUserCollectibles } from 'state/hooks'
import NftCard from '../NftCard'

const YourNfts = () => {
  const { account } = useWeb3React()
  const { nftCollections } = useUserCollectibles(account)

  const nftCollectionsInDetail = useMemo(() => {
    const collections = []
    const userNfts = nfts.filter((nft) => nftCollections.find((nftCollection) => nftCollection === nft.address))
    // eslint-disable-next-line no-restricted-syntax
    for (const nft of userNfts) {
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
  }, [nftCollections])

  return (
    <>
      {account && nftCollectionsInDetail.length > 0 && (
        <>
          <CardGrid>
            <Text bold fontSize="24px" color="primary">
              Your Collectible NFTs
            </Text>
          </CardGrid>
          {nftCollectionsInDetail.map((nftCollection) => {
            return nftCollection.nftList.length > 0 ? (
              <>
                <CollectionHead alignItems="center">
                  <Heading size="lg" mr="16px">
                    {nftCollection.name}
                  </Heading>
                </CollectionHead>
                <CardGrid key={`your-nft-${nftCollection.name}`}>
                  {orderBy(nftCollection.nftList, 'sortOrder').map((nft) => {
                    return (
                      <div key={`your-nft-${nft.name}`}>
                        <NftCard nft={nft} />
                      </div>
                    )
                  })}
                </CardGrid>
              </>
            ) : (
              <div key={nftCollection.collectionName} />
            )
          })}
        </>
      )}
    </>
  )
}

const CollectionHead = styled(Flex)`
  padding: 12px 24px 0px;

  @media (min-width: 768px) {
    padding: 0 40px 24px;
  }
`

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

export default YourNfts
