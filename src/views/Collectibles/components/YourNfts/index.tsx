import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, Text } from 'penguinfinance-uikit2'
import styled from 'styled-components'
import Select from 'components/Select/Select'
import nfts from 'config/constants/nfts'
import { useUserCollectibles } from 'state/hooks'
import NftCard from '../NftCard'

const YourNfts = () => {
  const [sortType, setSortType] = useState('Penguins without Borders')

  const { account } = useWeb3React()
  const { nftCollections } = useUserCollectibles(account)

  const userNfts = nftCollections.map((nftCollection) => {
    const _nft = nfts.find((nft) => nft.address === nftCollection.address)
    if (_nft) return { ...nftCollection, ..._nft }
    return nftCollection
  })
  const sortedNfts = userNfts.sort((a) => (a.collection === sortType ? -1 : 1))

  const renderSort = () => (
    <Flex flexDirection="column">
      <SelectWrapper>
        <Select
          value={sortType}
          options={[
            { label: 'Penguins without Borders', value: 'Penguins without Borders' },
            { label: 'Sherpa Launchpad', value: 'Sherpa Launchpad' },
            { label: 'BooFinance Launchpad', value: 'BooFinance Launchpad' },
          ]}
          onChange={setSortType}
        />
      </SelectWrapper>
    </Flex>
  )

  return (
    <>
      {account && sortedNfts.length > 0 && (
        <>
          <StyledHeader flexWrap="wrap">
            <Text bold fontSize="24px" color="primary" mr="16px">
              My NFTs
            </Text>
            {renderSort()}
          </StyledHeader>
          <CardGrid>
            {sortedNfts.map((nft) => {
              return nft.tokenIds.map((tokenId) => {
                return (
                  <div key={`your-nft-${nft.name}`}>
                    <NftCard nft={nft} tokenId={String(tokenId)} />
                  </div>
                )
              })
            })}
          </CardGrid>
        </>
      )}
    </>
  )
}

const StyledHeader = styled(Flex)`
  padding: 24px;
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
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 768px) {
    padding: 0 40px 24px;
  }
`

// sort option
const SelectWrapper = styled.div`
  div {
    width: 270px;
    color: ${({ theme }) => theme.isDark && '#372871'};
    > div:first-child {
      > div {
        background: ${({ theme }) => theme.isDark && '#bba6dd'};
      }
    }
    > div:last-child {
      background: ${({ theme }) => theme.isDark && '#bba6dd'};
    }
  }
`

export default YourNfts
