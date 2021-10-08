import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import orderBy from 'lodash/orderBy'
import styled from 'styled-components'
import { Flex, Text, Heading, Button } from 'penguinfinance-uikit2'
import nfts from 'config/constants/nfts'
import { useUserCollectibles } from 'state/hooks'
import { useNftDistributor } from 'hooks/useNftDistributor'
import YourNfts from './YourNfts'
import NftCard from './NftCard'

const NftCollection = ({ canClaim, nftCollection }) => {
  const { onClaim } = useNftDistributor(nftCollection.name)

  return (
    <>
      <CollectionHead alignItems="center">
        <Heading size="lg" mr="16px">
          {`${nftCollection.name} Collection`}
        </Heading>
        {canClaim && (
          <Button scale="md" onClick={onClaim}>
            Claim
          </Button>
        )}
      </CollectionHead>
      <CardGrid key={nftCollection.name}>
        {orderBy(nftCollection.nftList, 'sortOrder').map((nft) => {
          return (
            <div key={`nft-${nft.name}`}>
              <NftCard nft={nft} />
            </div>
          )
        })}
      </CardGrid>
    </>
  )
}

const NftList = () => {
  const { account } = useWeb3React()
  const { nftClaimStatus } = useUserCollectibles(account)

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
      {nftCollections.map((nftCollection, index) => {
        const canClaim = nftClaimStatus[index]?.canClaim || false
        return <NftCollection key={`${nftCollection.name}`} nftCollection={nftCollection} canClaim={canClaim} />
      })}
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

export default NftList
