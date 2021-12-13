import React from 'react'
import styled from 'styled-components'
import { Card, useMatchBreakpoints } from 'penguinfinance-uikit2'

const ArtworkCard = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl
  const onClickArtworkV2Card = () => {
    window.open('https://docs.penguinfinance.io/', '_blank')
  }

  return (
    <StyledArtworkCard isMobile={isMobile}>
      <ArtworkImg
        onClick={onClickArtworkV2Card}
        src={`${process.env.PUBLIC_URL}/images/home-v2/welcome_pefi.png`}
        loading="lazy"
        alt="hero"
      />
      {/* <StyledArtworkCardBg onClick={onClickArtworkV2Card} /> */}
    </StyledArtworkCard>
  )
}

const StyledArtworkCard = styled(Card)<{ isMobile?: boolean }>`
  // height: ${({ isMobile }) => (isMobile ? 'calc(50vw - 16px)' : '380px')};
  // /* margin-bottom: 24px; */
  // background: ${({ theme }) => theme.isDark && '#30264F'};

  height: calc(50vw - 16px);
  background: ${({ theme }) => theme.isDark && '#30264F'};

  @media (min-width: 968px) {
    height: 300px;
  }

  @media (min-width: 1080px) {
    height: 310px;
  }

  @media (min-width: 1200px) {
    height: 344px;
  }
`

const ArtworkImg = styled.img`
  width: 100%;
  background-size: cover;
  background-position: left center;
  background-image: url('/images/home-v2/launchpad.png');
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100%;
  }
`

// const StyledArtworkCardBg = styled.div`
//   height: 100%;
//   background-size: cover;
//   background-position: center center;
//   background-image: url('/images/home/launchpad.jpg');
//   cursor: pointer;
// `

export default ArtworkCard
