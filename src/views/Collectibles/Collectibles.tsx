import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import NftList from './components/NftList'

const PageBgContainer = styled.div`
  background-image: ${({ theme }) =>
    theme.isDark ? `url('/images/nfts/dark-mode-pattern.png')` : `url('/images/nfts/light-mode-pattern.png')`};
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: -1;
`

const NFTPage = styled(Page)`
  max-width: 1200px;
  padding: 0 0 24px;
`

const Collectibles = () => {
  const { isDark } = useTheme()
  return (
    <NFTPage>
      <PageBgContainer />
      <img
        src={`${process.env.PUBLIC_URL}/images/nfts/${isDark ? 'nft-banner-dark' : 'nft-banner-light'}.svg`}
        alt="ntf banner"
      />
      <NftList />
    </NFTPage>
  )
}

export default Collectibles
