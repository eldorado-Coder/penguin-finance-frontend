import React from 'react'
import Page from 'components/layout/Page'
import NftList from './components/NftList'

const Collectibles = () => {
  return (
    <Page>
      <NftList />
      <img src='/images/nfts/penguin-land.jpg' alt='penguin-land' />
    </Page>
  )
}

export default Collectibles
