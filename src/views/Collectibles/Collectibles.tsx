import React from 'react'
import styled from 'styled-components';
import Page from 'components/layout/Page'
import NftList from './components/NftList'

const PageBgContainer = styled.div`
  background-image: url('/images/nfts/NFTPattern.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const Collectibles = () => {
  return (
    <Page>
      <PageBgContainer />
      <img src={`${process.env.PUBLIC_URL}/images/nfts/nft-banner.png`} alt="ntf banner" />
      <NftList />
      {/* <img src='/images/nfts/penguin-land.jpg' alt='penguin-land' /> */}
    </Page>
  )
}

export default Collectibles
