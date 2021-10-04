import React, { useCallback, useEffect, useState, useMemo } from 'react'
import orderBy from 'lodash/orderBy'
import styled from 'styled-components'
import { Text } from 'penguinfinance-uikit2'
import nfts from 'config/constants/nfts'
import { useWeb3React } from '@web3-react/core'
import { getBunnySpecialContract } from 'utils/contractHelpers'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import makeBatchRequest from 'utils/makeBatchRequest'
import YourNfts from './YourNfts';
import NftCard from './NftCard'
import NftGrid from './NftGrid'

type State = {
  [key: string]: boolean
}

const CardGrid = styled(NftGrid)`
  padding: 24px;

  @media (min-width: 768px) {
    padding: 0 40px 24px;
  }
`

const bunnySpecialContract = getBunnySpecialContract()

const NftList = () => {
  const [claimableNfts, setClaimableNfts] = useState<State>({})
  const { nfts: nftTokenIds, refresh } = useGetWalletNfts()
  const { account } = useWeb3React()

  const fetchClaimableStatuses = useCallback(
    async (walletAddress: string) => {
      try {
        const claimStatuses = (await makeBatchRequest(
          nfts.map((nft) => {
            return bunnySpecialContract.methods.canClaimSingle(walletAddress, nft.bunnyId).call
          }),
        )) as boolean[]

        setClaimableNfts(
          claimStatuses.reduce((accum, claimStatus, index) => {
            return {
              ...accum,
              [nfts[index].bunnyId]: claimStatus,
            }
          }, {}),
        )
      } catch (error) {
        console.error(error)
        // toastError('Error checking NFT claimable status')
      }
    },
    [setClaimableNfts],
  )

  const handleSuccess = () => {
    refresh()
    fetchClaimableStatuses(account)
  }

  useEffect(() => {
    if (account) {
      fetchClaimableStatuses(account)
    }
  }, [account, fetchClaimableStatuses])

  const nftCollections = useMemo(() => {
    const collections = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const nft of nfts) {
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
  }, []);

  return (
    <>
      <YourNfts />
      <CardGrid>
        <Text bold fontSize='24px' color='primary'>All NFTs</Text>
      </CardGrid>
      {nftCollections.map(nftCollection => {
        return (
          <CardGrid key={nftCollection.name}>
            {orderBy(nftCollection.nftList, 'sortOrder').map((nft) => {
              const tokenIds = nftTokenIds[nft.bunnyId] ? nftTokenIds[nft.bunnyId].tokenIds : []

              return (
                <div key={`nft-${nft.name}`}>
                  <NftCard nft={nft} canClaim={claimableNfts[nft.bunnyId]} tokenIds={tokenIds} onSuccess={handleSuccess} />
                </div>
              )
            })}
          </CardGrid>
        )
      })}
    </>
  )
}

export default NftList
